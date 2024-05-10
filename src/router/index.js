const express = require('express')
const Router = express.Router()
const RBook = require('./book.js')
const RMember = require('./member.js')
Router
    .use('/book', RBook)
    .use('/member', RMember)

module.exports = Router