import Books from './books.js';
import userBooks from './userBooks.js';

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
            const checkUser = await userBooks.findOne({ login: req.body.login })
            if (checkUser) {
                const updateUser = await userBooks.findOneAndUpdate({ login: req.body.login }, { ...req.body }, { returnOriginal: false })
                res.json(updateUser)
            } else {
                const addUser = await userBooks.create({ ...req.body })
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
}

export default new BooksController();