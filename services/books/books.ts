import { Model, Op } from "sequelize";
import sequelize from "../../config/db.config";
import Book from "../../models/Book";

export const createBook = async (complaintDetails: any) => {
  try {
    let book: any;
    const { title, author, genre, published_date } = complaintDetails;
    book = await Book.create({
      title: title,
      author: author,
      genre: genre,
      published_date: published_date,
    });

    return book;
  } catch (error) {
    throw error;
  }
};

export const getAllBooks = async (
  sortBy: any,
  filterBy: any,
  keyword: any,
  offset: any,
  limit: any
) => {
  let books: {
    rows: Model<any, any>[];
    count: number;
  } = { rows: [], count: 0 };
  try {
    console.log("keyword ", keyword)
    console.log("filterBy ", filterBy)
    console.log("sortBy ", sortBy)
    // if (keyword != "")
    // {
      switch (filterBy) {
        case "title":
          books = await Book.findAndCountAll({
            where: {
              title: {
                [Op.like]: "%" + keyword + "%",
              },
            },
            order: [[sortBy, "asc"]],
            offset: offset,
            limit: limit
          });
          break
        case "genre":
          books = await Book.findAndCountAll({
            where: {
              genre: {
                [Op.like]: "%" + keyword + "%",
              },
            },
            order: [[sortBy, "asc"]],
            offset: offset,
            limit: limit
          });
          break
        case "author":
    console.log("author keyword ", keyword)
          
          books = await Book.findAndCountAll({
            where: {
              author: {
                [Op.like]: "%" + keyword + "%",
              },
            },
            order: [[sortBy, "asc"]],
            offset: offset,
            limit: limit
          });
          break
        case "published_date":
          books = await Book.findAndCountAll({
            where: {
              published_date: {
                [Op.like]: "%" + keyword + "%",
              },
            },
            order: [[sortBy, "asc"]],
            offset: offset,
            limit: limit
          });
          break;
        default:
          books = await Book.findAndCountAll({
            where: {
              title: {
                [Op.like]: "%" + keyword + "%",
              },
            },
            order: [[sortBy, "asc"]],
            offset: offset,
            limit: limit
          });
          break;
      }
    return books;
  } catch (error) {
    console.error(error);
  }
};

const booksService = {
  createBook,
  getAllBooks,
};

export default booksService;
