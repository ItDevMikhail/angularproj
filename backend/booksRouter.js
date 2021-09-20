import Router from "express";
import BooksController from "./booksController.js";

const booksRouter = new Router()

booksRouter.post('/add', BooksController.create)
booksRouter.post('/addFavorite', BooksController.addToFavorite)
booksRouter.get('/addFavorite/:login', BooksController.getToFavorite)
booksRouter.post('/dashboard', BooksController.getToDashboard)
booksRouter.get('', BooksController.getAll)
booksRouter.get('/detail/:id', BooksController.getOne)

export default booksRouter;