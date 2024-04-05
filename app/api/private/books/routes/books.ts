import { Router } from 'express';
import booksController from "../controllers/books"

const complaintRouter = Router();


complaintRouter.post(
  "/create",
  booksController.createBook
)

complaintRouter.get(
  "/get/all",
  booksController.getAllBooks
)

export default complaintRouter
