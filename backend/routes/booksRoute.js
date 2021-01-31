const express = require("express");
const router = express.Router();
const regex = require("../helpers/regex");
const { ErrorHandler } = require("../helpers/errorsHelper");

module.exports = ({
  getBooks,
  createBook,
  getBookById,
  deleteBookById,
  getBookstoresForBookById,
}) => {
  router.get("/", (req, res, next) => {
    getBooks()
      .then((books) => {
        if (books.length) {
          res.json(books);
        } else {
          throw new ErrorHandler(404, "Not found");
        }
      })
      .catch((err) => next(err));
  });

  router.post("/", (req, res, next) => {
    const { title, author, summary } = req.body;

    if (!title || !author || !summary) {
      next(new ErrorHandler(400, "Missing field(s)"));
    } else {
      createBook(title, author, summary)
        .then((result) => {
          if (result.length) {
            res.status(201).json(result[0]);
          } else {
            throw new ErrorHandler(403, "Already existing resource");
          }
        })
        .catch((err) => next(err));
    }
  });

  router.get(`/:id(${regex.id})`, (req, res, next) => {
    const { id } = req.params;
    getBookById(id)
      .then((result) => {
        if (result.length) {
          res.json(result[0]);
        } else {
          throw new ErrorHandler(404, "Not found");
        }
      })
      .catch((err) => next(err));
  });

  router.delete(`/:id(${regex.id})`, (req, res, next) => {
    const { id } = req.params;
    deleteBookById(id)
      .then((result) => {
        if (result.length) {
          res.status(202).json(result[0]);
        } else {
          throw new ErrorHandler(404, "Not found");
        }
      })
      .catch((err) => next(err));
  });

  router.get(`/:id(${regex.id})/bookstores`, (req, res, next) => {
    const { id } = req.params;
    getBookstoresForBookById(id)
      .then((result) => {
        if (result.length) {
          res.json(result);
        } else {
          throw new ErrorHandler(404, "Not found");
        }
      })
      .catch((err) => next(err));
  });

  return router;
};
