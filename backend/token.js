import jwt from 'jsonwebtoken'

export function generateJWT(user) {
    const data = {
        login: user.login,
        id: Date.now()
    }
    const time = '2h';
    const secret = 'Dahotchtoto';
    return jwt.sign({ data }, secret, { expiresIn: time });
}

export function verifyJWT(token) {
    const secret = 'Dahotchtoto';
    return jwt.verify(token, secret)
}