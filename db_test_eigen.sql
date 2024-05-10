CREATE DEFINER=`root`@`localhost` TRIGGER `loan_update` AFTER INSERT ON `loans_book` FOR EACH ROW BEGIN
    UPDATE member
    SET count_loan_book = count_loan_book + 1
    WHERE code = NEW.member_code;

    UPDATE books
    SET stock = stock - 1
    WHERE code = NEW.book_code;
END;

CREATE DEFINER=`root`@`localhost` TRIGGER `return_book` AFTER DELETE ON `loans_book` FOR EACH ROW BEGIN
    DECLARE current_timez TIMESTAMP;
    DECLARE borrow_timez TIMESTAMP;

    SET current_timez = NOW();
    SET borrow_timez = OLD.borrowed_time;
   
   	UPDATE books
    SET stock = stock + 1
    WHERE code = OLD.book_code;
   
    UPDATE member
    SET count_loan_book = count_loan_book - 1
    WHERE code = OLD.member_code;

    IF TIMESTAMPDIFF(DAY, borrow_timez, current_timez) >= 7 THEN
        UPDATE member
        SET is_penalty = 1, penalty_date = current_timestamp
        WHERE code = OLD.member_code; 
    END IF;
END;

CREATE DEFINER=`root`@`localhost` TRIGGER `loans_check` BEFORE INSERT ON `loans_book` FOR EACH ROW BEGIN
    DECLARE penalty TINYINT(1);
    DECLARE penalty_time TIMESTAMP;
    DECLARE count_loan INT;
   	DECLARE count_stock INT;
    DECLARE current_timez TIMESTAMP;

    SET current_timez = NOW();

    SELECT member.is_penalty INTO penalty
    FROM member WHERE code = NEW.member_code;
   
    SELECT member.penalty_date INTO penalty_time
    FROM member WHERE code = NEW.member_code;

    SELECT member.count_loan_book INTO count_loan
    FROM member WHERE code = NEW.member_code;
   
    SELECT books.stock INTO count_stock
    FROM books WHERE code = NEW.book_code;

    IF penalty = 1 AND TIMESTAMPDIFF(DAY, penalty_time, current_timez) >= 3 THEN
        UPDATE member set is_penalty = 0, penalty_date = NULL
        WHERE code = NEW.member_code;
    ELSEIF penalty = 1 AND TIMESTAMPDIFF(DAY, penalty_time, current_timez) <= 3 THEN
    	SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Tidak dapat meminjam karena status penalty';
    ELSEIF count_loan >= 2 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Tidak dapat meminjam karena maksimum 2x pinjam';
    ELSEIF count_stock = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Tidak dapat meminjam karena stock buku kosong';
    END IF;
END;

CREATE DEFINER=`root`@`localhost` TRIGGER `return_book_check` BEFORE DELETE ON `loans_book` FOR EACH ROW BEGIN
    DECLARE count_data INT;
	
   	SELECT COUNT(*) INTO count_data
    FROM loans_book
    WHERE id = OLD.id AND member_code = OLD.member_code;

    IF count_data = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Member tidak meminjam buku tersebut';
    END IF;
END;