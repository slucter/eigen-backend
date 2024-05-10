const MMember = require('../model/member.model')
const model = new MMember()
class member {

    async get (req, res) {
        try {
            const result = await model.get()
            res.status(200).json({
                data: result
            })
        } catch (error) {
            res.status(400).json({
                msg: 'Something error',
                error
            })
        }
    }
}

module.exports = member