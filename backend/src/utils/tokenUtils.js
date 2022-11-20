import * as jwt from 'jsonwebtoken';

const TOKEN_SECRET = 'mytoken'

function generateAccessToken(username) {
    return jwt.sign(username, TOKEN_SECRET, {
        expiresIn: '1800s'
    });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403)
        }
        req.user = user

        next()
    })
}
export {
    generateAccessToken,
    authenticateToken
}