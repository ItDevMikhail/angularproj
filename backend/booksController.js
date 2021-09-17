import Books from './books.js';

class BooksController {
    async create(req, res) {
        try {
            let newBook = {
                name: req.body.name,
                description: req.body.description,
            }
            const library = await Books.findOne({ name: newBook.name })
            if(library){
                res.status(400).json({msg: 'Такая книга уже есть'})
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
}

export default new BooksController();