import { DataTypes } from "sequelize";
import sequelize from "../config/db.config";

const Book = sequelize.define(
  "books",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING
      },
    author: {
        allowNull: false,
        type: DataTypes.STRING
    },
    genre: {
      allowNull: false,
      type: DataTypes.STRING
    },
    publishedDate: {
      field: "published_date",
      allowNull: true,
      type: DataTypes.STRING
    },
    isbn: {
      allowNull: true,
      type: DataTypes.STRING
    },
    createdAt: {
      field: "created_at",
      allowNull: false,
      defaultValue: new Date(),
      type: DataTypes.DATE
    },
  updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  {
    underscored: true,
    createdAt: true,
    updatedAt: true
  }
)

Book.sync({alter: true})

export default Book
