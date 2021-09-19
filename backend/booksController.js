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
            const deleteBook = await userBooks.findOne({ name: req.body.name, login: req.body.login })
            if (deleteBook) {
                const deletBook = await userBooks.deleteOne({name: req.body.name,})
                return res.json({deletBook, msg: 'This book is delete' })
            }
            const findBook = await Books.findOne({ name: req.body.name })
            if (findBook) {
                const addBook = await userBooks.create({ ...req.body })
                res.json({ name: addBook.name, message: 'Add to Favorite' })
            }
            res.status(500).json({ msg: 'Server error' })
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new BooksController();