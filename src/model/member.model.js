const connection = require("../config");
class book {
    constructor () {
        this.db = connection
    }

    get () {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT count_loan_book AS total_loans, code, name, is_penalty FROM member', (err, res) => {
                if (err) return reject(err)
                resolve(res)
            })
        })
    }
}

module.exports = book