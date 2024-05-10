const connection = require("../config");

class book {
    constructor () {
        this.db = connection
    }

    get () {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM books', (err, res) => {
                if (err) return reject(err)
                resolve(res)
            })
        })
    }

    getLoans () {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM loans_book', (err, res) => {
                if (err) return reject(err)
                resolve(res)
            })
        })
    }

    borrow (data) {
        return new Promise((resolve, reject) => {
            this.db.query('INSERT INTO loans_book SET ?', data, (err, res) => {
                if (err) return reject(err)
                resolve(res)
            })
        })
    }
    returnBook ({id, member_code}) {
        return new Promise((resolve, reject) => {
            this.db.query('DELETE FROM loans_book WHERE id = ? AND member_code = ?', [id, member_code], (err, res) => {
                if (err) return reject(err)
                resolve(res)
            })
        })
    }
}

module.exports = book