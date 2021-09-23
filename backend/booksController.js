import Books from './books.js';
import userBooks from './userBooks.js';
import { verifyJWT } from './token.js';
import { unlink } from 'fs';

class BooksController {
    async getAll(req, res) {
        try {
            const book = await Books.find();
            if (book.length > 0) {
                res.json(book);
            } else {
                res.status(404).json({ message: 'Библиотека книг пуста' })
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
            } else {
                const book = await Books.findById(id);
                res.json(book);
            }
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
                const favorite = await userBooks.find({ userName: login })
                return res.json(favorite)
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getToDashboard(req, res) {
        try {
            const token = req.params
            if (!token) {
                res.status(401)
            } else {
                const loginToken = verifyJWT(token.token)
                const login = loginToken.data.login
                const favorite = await userBooks.find({ userName: login })
                if (favorite.length > 0) {
                    let booksId = [];
                    for(let i = 0; i < favorite.length; i++) {
                       booksId[i] = favorite[i]._id
                    }
                    const getFav = await Books.find({_id: booksId})
                    res.json(getFav)
                } else {
                    res.json({ message: 'Not Found' })
                }
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async addToFavorite(req, res) {
        try {
            const token = verifyJWT(req.body.token)
            const login = token.data.login
            const bookId = req.body.bookId
            const deleteFavorite = await userBooks.findOneAndDelete({ userName: login, _id: bookId })
            if (!deleteFavorite) {
                const addFavorite = await userBooks.create({ userName: login, _id: bookId })
                res.json({ bookId: addFavorite.bookId, message: 'Successfully added to favorites' })
            } else {
                res.send(`bookId: ${bookId} was deleted`)
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async createBook(req, res) {
        try {
            let filedata = req.file;
            const books = JSON.parse(req.body.books)
            const library = await Books.findOne({ name: books.name })
            if (library) {
                res.status(400).json({ msg: 'Такая книга уже есть' })
            } else if (!filedata) {
                const book = await Books.create(books)
                res.json(book)
            } else {
                const book = await Books.create({ ...books, picture: filedata.filename })
                res.json(book)
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async deleteBook(req, res) {
        try {
            const bookId = req.body.id
            const deleteBook = await Books.findByIdAndDelete(bookId)
            const f = await userBooks.find()
            if (deleteBook.picture) {
                unlink(`backend/static/${deleteBook.picture}`, (err) => {
                    if (err) throw err;
                    console.log(`picture: ${deleteBook.picture} was deleted`);
                })
            }
            res.json(deleteBook)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new BooksController();