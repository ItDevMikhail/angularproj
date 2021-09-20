import Books from './books.js';
import userBooks from './userBooks.js';
import fileService from './fileService.js';
import { verifyJWT } from './token.js';

class BooksController {
    async create(req, res) {
        try {
            let newBook = {
                name: req.body.name,
                description: req.body.description,
            }
            const library = await Books.findOne({ name: newBook.name })
            if (library) {
                res.status(400).json({ msg: 'Такая книга уже есть' })
            }
            const book = await Books.create(newBook)
            res.json(book)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getAll(req, res) {
        try {
            const book = await Books.find();
            return res.json(book);
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getToFavorite(req, res) {
        try {
            const { login } = req.params
            if (!login) {
                res.json()
            } else {
                const favorite = await userBooks.findOne({ login: login })
                return res.json(favorite)
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                res.status(400).json({ message: 'Id не указан' })
            }
            const book = await Books.findById(id);
            return res.json(book);
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async addToFavorite(req, res) {
        try {
            const token = verifyJWT(req.body.token)
            const login = token.data.login
            console.log(token.data.login)  
            console.log(req.body.books)    
            const checkUser = await userBooks.findOne({ login: login })
            console.log(checkUser)
            if (checkUser) {
                const updateUser = await userBooks.findOneAndUpdate({ login: login }, { books : req.body.books }, { returnOriginal: false })
                res.json(updateUser)
            } else {
                const addUser = await userBooks.create({ login: login, books : req.body.books })
                res.json(addUser)
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getToDashboard(req, res) {
        try {
            const checkUser = await userBooks.findOne({ login: req.body.login })             
            if (checkUser) {
                const books = JSON.parse(checkUser.books)
                const book = await Books.find({name: books});
                res.json(book)
            } else {
                res.json({ message: 'Not Found'})
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async createBooks(req, res) {
        try {
            console.log(req)
            let newBook = {
                name: req.body.books.name,
                description: req.body.books.description,
            }
            const library = await Books.findOne({ name: newBook.name })
            if (library) {
                res.status(400).json({ msg: 'Такая книга уже есть' })
            }
            const fileName = fileService.saveFile(req.files.picture)
            const book = await Books.create({...newBook, picture: fileName})
            res.json(book)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new BooksController();