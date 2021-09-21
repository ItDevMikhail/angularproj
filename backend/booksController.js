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
    async getToFavorite(req, res) {
        try {
            const token = req.params
            if (!token) {
                res.json()
            } else {
                const loginToken = verifyJWT(token.token)
                const login = loginToken.data.login
                const favorite = await userBooks.findOne({ login: login })
                return res.json({ books: favorite.books })
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getToDashboard(req, res) {
        try {
            const token = req.params
            if (!token) {
                res.json()
            } else {
                const loginToken = verifyJWT(token.token)
                const login = loginToken.data.login
                const favorite = await userBooks.findOne({ login: login })
                if (favorite) {
                    const books = JSON.parse(favorite.books)
                    const book = await Books.find({ _id: books });
                    res.json(book)
                } else {
                    res.json({ message: 'Not Found' })
                }
                return res.json({ books: favorite.books })
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async addToFavorite(req, res) {
        try {
            const token = verifyJWT(req.body.token)
            const login = token.data.login
            const book = req.body.book
            const checkUser = await userBooks.findOne({ login: login })
            let parseUserBooks;
            if (checkUser) {
                parseUserBooks = JSON.parse(checkUser.books)
                if (parseUserBooks.includes(book)) {
                    parseUserBooks = parseUserBooks.filter((remove) => remove != book)
                } else {
                    parseUserBooks.push(book)
                }
                const updateBooks = JSON.stringify(parseUserBooks)
                const updateUser = await userBooks.findOneAndUpdate({ login: login }, { books: updateBooks }, { returnOriginal: false })
                res.json({ books: updateUser.books })
            } else {
                const addUser = await userBooks.create({ login: login, books: `["${req.body.book}"]` })
                res.json({ books: addUser.books })
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async createBooks(req, res) {
        try {
            let newBook = {
                name: req.body.books.name,
                description: req.body.books.description,
            }
            const library = await Books.findOne({ name: newBook.name })
            if (library) {
                res.status(400).json({ msg: 'Такая книга уже есть' })
            }
            const fileName = fileService.saveFile(req.files.picture)
            const book = await Books.create({ ...newBook, picture: fileName })
            res.json(book)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new BooksController();