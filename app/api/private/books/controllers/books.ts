import complaintService from "../../../../../services/books/books"
import responses from "../../../../../constants/Responses"
import { RequestHandler } from "express";
import { serverErrorResponse, successResponse } from "../../../../../services/Response/Response";


export const createBook: RequestHandler = async (req, res, next) => {
  try {
    console.log("req...", req.body);
    const { title, author, genre, published_date} = req.body
    // console.log("customer_number ", customer_number, "complaint_number ", complaint_number, "description ", description, staff_id, "department_id ", department_id, "complaint_status_id", complaint_status_id)
    const book = await complaintService.createBook({title, author, genre, published_date})
    if (!book) {
      return serverErrorResponse(res, responses.BOOK_NOT_CREATED);
    }

    return successResponse(res, {book});
  } catch (error) {
    next(error)
  }
};

export const getAllBooks: RequestHandler = async (req, res, next) => {
  try {
    const { keyword, sortBy, filterBy, offset, limit } = req.query;
    const books = await complaintService.getAllBooks(sortBy, filterBy, keyword, Number(offset), Number(limit))
    console.log("books ==> ", books)
    if (!books) {
      return serverErrorResponse(res, responses.NO_BOOKS_FOUND);
    }
    else if (books.count == 0)
    {
      return successResponse(res, {books});
    }
    return successResponse(res, {books});

  } catch (error) {
    next(error)
  }
};

const booksController = {
    createBook,
    getAllBooks
}

export default booksController
