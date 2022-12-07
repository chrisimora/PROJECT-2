import User from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

export const register = async (req, res) => {
    const { username, password, fullname, role } = req.body

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        const user = await User.create({
            username,
            password: hashPassword,
            fullname,
            role
        })
        res.json({ msg: 'register berhasil', data: user })
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({
            where: {
                username: username
            }
        })
        if (!user) {
            return res.status(404).json({ mgs: 'Username atau password salah!' })
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(404).json({ mgs: 'Username atau password salah!' })
        }

        const accessToken = jwt.sign({ userId: user.id, username: user.username, fullname: user.fullname, role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })

        const refreshToken = jwt.sign({ userId: user.id, username: user.username, fullname: user.fullname, role: user.role }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })

        await User.update({ refresh_token: refreshToken }, {
            where: {
                id: user.id
            }
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.json({ accessToken })
    } catch (error) {
        res.status(404).json({ mgs: 'Username atau password salah!' })
    }
}

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.sendStatus(204)
        const user = await User.findOne({
            where: {
                refresh_token: refreshToken
            }
        })
        if (!user) return res.sendStatus(204)
        await User.update({ refresh_token: null }, {
            where: {
                id: user.id
            }
        })
        res.clearCookie('refreshToken')

        return res.sendStatus(200)
    } catch (error) {
        console.log(error);
    }
}

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.sendStatus(401)
        const user = await User.findOne({
            where: {
                refresh_token: refreshToken
            }
        })
        if (!user) return res.sendStatus(403)

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403)

            req.userId = decoded.userId
            req.username = decoded.username
            req.fullname = decoded.fullname
            req.role = decoded.role

            const accessToken = jwt.sign({ userId: user.id, username: user.username, fullname: user.fullname, role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '20s'
            })
            res.json({ accessToken })
        })
    } catch (error) {
        console.log(error);
    }
}