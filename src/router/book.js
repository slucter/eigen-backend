const express = require('express')
const Router = express.Router()
const Cbook = require('../controller/book.controller')
const book = new Cbook()

/**
 * @swagger
 * /api/book:
 *   get:
 *     summary: Mendapatkan semua data buku dan stock
 *     description: 
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_stock:
 *                   type: integer
 *                   description: Total data.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         description: ID buku.
 *                       title:
 *                         type: string
 *                         description: Judul Buku.
 *                       author:
 *                         type: string
 *                         description: Nama author.
 *                       stock: 
 *                          type: integer
 *                          description: Jumlah stock
 *     tags:
 *       - Book
 * /api/book/borrow/{book_code}:
 *   post:
 *     summary: Mendapatkan data
 *     description: Mendapatkan data yang membutuhkan token pada header request.
 *     parameters:
 *       - in: header
 *         name: authMember
 *         description: Masukan member code
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: book_code
 *         description: Masukan book code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK. Data berhasil diambil.
 *       401:
 *         description: Unauthorized. Token tidak valid atau tidak ada token yang disertakan.
 *     security:
 *       - ApiKeyAuth: []
 *     tags:
 *       - Book
 * /api/book/borrow/return/{id}:
 *   post:
 *     summary: Mendapatkan data
 *     description: Mendapatkan data yang membutuhkan token pada header request.
 *     parameters:
 *       - in: header
 *         name: authMember
 *         description: Masukan member code
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         description: Masukan book code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK. Data berhasil diambil.
 *       401:
 *         description: Unauthorized. Token tidak valid atau tidak ada token yang disertakan.
 *     security:
 *       - ApiKeyAuth: []
 *     tags:
 *       - Book
 */
Router
    .get('/', book.get)
    .post('/borrow/:book_code', book.borrow)
    .post('/borrow/return/:id', book.returnBook)

module.exports = Router