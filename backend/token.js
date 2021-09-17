import jwt from 'jsonwebtoken'

export default function generateJWT(user) {
    const data = {
        login: user.login
    }
    const secret = 'Dahotchtoto';
    const time = '6h';
    return jwt.sign({data}, secret, {expiresIn: time});
}