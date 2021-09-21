import Router from "express";
import BooksController from "./booksController.js";

const booksRouter = new Router()

booksRouter.post('/add', BooksController.create)
booksRouter.post('/addFavorite', BooksController.addToFavorite)
booksRouter.get('/addFavorite/:token', BooksController.getToFavorite)
booksRouter.get('/dashboard/:token', BooksController.getToDashboard)
booksRouter.get('', BooksController.getAll)
booksRouter.get('/detail/:id', BooksController.getOne)

export default booksRouter;