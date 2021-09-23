import Router from "express";
import BooksController from "./booksController.js";
import multer from "multer";

const booksRouter = new Router()

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "backend/static");
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + '.jpg');
    }
});
const fileFilter = (req, file, cb) => {
  
    if(file.mimetype === "image/png" || 
    file.mimetype === "image/jpg"|| 
    file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
 }

booksRouter.post('/add', multer({storage:storageConfig, fileFilter: fileFilter}).single("picture"), BooksController.createBook)
booksRouter.post('/addFavorite', BooksController.addToFavorite)
booksRouter.get('/addFavorite/:token', BooksController.getToFavorite)
booksRouter.get('/dashboard/:token', BooksController.getToDashboard)
booksRouter.get('', BooksController.getAll)
booksRouter.get('/search/:search', BooksController.getSearch)
booksRouter.get('/detail/:id', BooksController.getOne)
booksRouter.delete('', BooksController.deleteBook)

export default booksRouter;