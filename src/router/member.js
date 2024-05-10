const express = require('express')
const Router = express.Router()
const Cmember = require('../controller/member.controller')
const member = new Cmember()
Router
/** 
 * @swagger
 * /api/member:
 *    get:
 *      summary: Mendapatkan semua data member
 *      descripton:
 *      tags:
 *        - Member
 *      responses: 
 *        200:
 *          description: success
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    code: 
 *                      type: string
 *                      description: id member
 *                    name:
 *                      type: string
 *                      description: name
 *                    total_loans:
 *                      type: integer
 *                      description: total loan
*/
.get('/', member.get)

module.exports = Router