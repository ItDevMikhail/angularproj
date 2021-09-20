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
    async addFavorite(req, res) {
        try {
            const checkBook = await userBooks.findOne({ login: req.body.login })
            if (checkBook) {
                const updateBook = await userBooks.findOneAndUpdate({ login: req.body.login, ...req.body })
                return res.json(updateBook)
            } else {
                const addBook = await userBooks.create({ ...req.body })
                return res.json(addBook)
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async addToFavorite(req, res) {
        try {
            const checkUser = await userBooks.findOne({ login: req.body.login })
            if (checkUser) {
                const updateUser = await userBooks.findOneAndUpdate({ login: req.body.login, ...req.body })
                return res.json(updateUser)
            } else {
                const addUser = await userBooks.create({ ...req.body })
                return res.json(addUser)
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new BooksController();