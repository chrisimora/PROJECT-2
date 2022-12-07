import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const VerifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403)
        req.userId = decoded.userId
        req.username = decoded.username
        req.fullname = decoded.fullname
        req.role = decoded.role
        next()
    })
}