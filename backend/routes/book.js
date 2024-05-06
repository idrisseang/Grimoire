const express = require("express")
const bookCtrl = require("../controllers/book")
const router = express.Router()
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

router.get("/", bookCtrl.getAllBooks)

router.get("/bestrating", bookCtrl.getBestRatingBooks)

router.get("/:id", bookCtrl.getOneBook)

router.post("/", auth, multer,multer.resizeImage, bookCtrl.addBook)

router.delete("/:id", auth, bookCtrl.deleteBook)

router.put("/:id", auth, multer,multer.resizeImage, bookCtrl.updateBook)

router.post("/:id/rating",auth, bookCtrl.rateBook)


module.exports = router