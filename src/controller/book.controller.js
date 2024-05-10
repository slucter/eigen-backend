const MBook = require('../model/book.model')
const model = new MBook()

class book {

    async get (req, res) {
        try {
            const result = await model.get()
            res.status(200).json({
                total_stock: result.reduce((a, b) => a + b.stock, 0),
                data: result
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                msg: error?.sqlMessage ?? error
            })
        }
    }

    async getLoans (req, res) {
        try {
            const result = await model.getLoans()
            if(!result.length) throw 'Tidak ada data'
            res.status(200).json({
                data: result
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                msg: (error?.sqlMessage ?? error)
            })
        }
    }
    async borrow (req, res) {
        const authMember = req.headers['authmember']
        const bookCode = req.params['book_code']
        try {
            await model.borrow({book_code: bookCode, member_code: authMember})
            res.status(200).json({
                msg: 'success',
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                msg: error?.sqlMessage ?? error
            })
        }
    }

    async returnBook (req, res) {
        const authMember = req.headers['authmember']
        const bookId = req.params['id']
        const data = {member_code: authMember, id: bookId}
        try {
            await model.returnBook(data)
            res.status(200).json({
                msg: 'success',
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                msg: error?.sqlMessage ?? error
            })
        }
    }
}

module.exports = book