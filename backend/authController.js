import Auth from './auth.js';
import Hashing from './hash.js';
import generateJWT from './token.js';
import * as jwt from 'jsonwebtoken'

class AuthController {
    async createUser(req, res) {
        try {
            let newUser = {
                login: req.body.login,
                email: req.body.email,
                password: req.body.password,
            }
            const user = await Auth.findOne({login: newUser.login})
            if(user){
                res.status(400).json({msg: 'Логин занят'})
            }
            newUser.password = Hashing(newUser.password)
            const reg = await Auth.create(newUser);
            res.json(reg.login)
        } catch (e) {
            res.status(500).json({ success: false, msg: "Пользователь не был добавлен" })
        }
    }
    async getUser(req, res) {
        try {
            let authUser = {
                login: req.body.login,
                password: req.body.password
            }            
            const auth = await Auth.findOne({login: authUser.login})
            const pass = Hashing(authUser.password)
            if(!auth){
                res.status(400).json({ msg: 'пользователь не найден' })
            } else {
                if(pass === auth.password){
                    const token = generateJWT(authUser);
                    res.json({ login: auth.login, token: token}); 
                } else{
                res.status(401).json({ msg: 'Не верный пароль' })
                }
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new AuthController();