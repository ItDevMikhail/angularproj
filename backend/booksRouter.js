import Router from "express";
import BooksController from "./booksController.js";

const booksRouter = new Router()

booksRouter.post('/add', BooksController.create)
booksRouter.get('', BooksController.getAll)
booksRouter.get('/detail/:id', BooksController.getOne)

export default booksRouter;