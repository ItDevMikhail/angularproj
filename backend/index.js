import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'
import booksRouter from './booksRouter.js'

const PORT = process.env.PORT || 5000

const app = express();

const mongoUrl = 'mongodb+srv://user:user@cluster0.1cstu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use(express.json())


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next();
});
app.use('/users', router)
app.use('/library', booksRouter)


async function start() {
    try {
        await mongoose.connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true })
        app.listen(PORT, () => {
            console.log(`Server has benn started on port ${PORT}`)
        })
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}
start()

