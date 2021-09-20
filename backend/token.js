import jwt from 'jsonwebtoken'

export function generateJWT(user) {
    const data = {
        login: user.login
    }
    const time = '6h';
    const secret = 'Dahotchtoto';
    return jwt.sign({ data }, secret, { expiresIn: time });
}

export function verifyJWT(token) {
    const secret = 'Dahotchtoto';
    return jwt.verify(token, secret)
}