
import express from "express"
import booksRoutes from "../api/private/books/routes/books"


const privateRouter = express.Router()

privateRouter.use("/books/", booksRoutes)

export default privateRouter
