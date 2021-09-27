import Auth from './auth.js';
import Hashing from './hash.js';
import { generateJWT } from './token.js';
import { verifyJWT } from './token.js';

class AuthController {
    async createUser(req, res) {
        try {
            let newUser = {
                login: req.body.login,
                email: req.body.email,
                password: req.body.password,
            }
            const user = await Auth.findOne({ login: newUser.login })
            if (user) {
                res.status(400).json({ msg: 'Логин занят' })
            } else {
                newUser.password = Hashing(newUser.password)
                const reg = await Auth.create(newUser);
                res.json(reg.login)
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getUser(req, res) {
        try {
            let authUser = {
                login: req.body.login,
                password: req.body.password
            }
            const auth = await Auth.findOne({ login: authUser.login })
            const pass = Hashing(authUser.password)
            if (!auth) {
                res.status(400).json({ msg: 'пользователь не найден' })
            } else {
                if (pass === auth.password) {
                    const token = generateJWT(authUser);
                    res.json({ login: auth.login, token: token });
                } else {
                    res.status(401).json({ msg: 'Не верный пароль' })
                }
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getUserName(req, res) {
        try {
            const token = req.params
            if (!token) {
                res.status(401)
            } else {
                const loginToken = verifyJWT(token.token)
                const login = loginToken.data.login
                const favorite = await Auth.findOne({ login: login })
                if (favorite) {
                    res.json({ login: favorite.login })
                } else {
                    res.status(401).json({ message: 'invalid token' });
                }
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getValidToken(req, res) {
        try {
            const token = req.params
            if (!token){
                res.status(401)
            } else {
                const loginToken = verifyJWT(token.token)
                const login = loginToken.data.login
                const favorite = await Auth.findOne({ login: login })
                if (favorite) {
                    res.cookie('token', login, { maxAge: 3000 * 300 })
                    res.json({ message: 'token is valid' })
                } else {
                    res.status(401).json({ message: 'invalid token' });
                }
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new AuthController();