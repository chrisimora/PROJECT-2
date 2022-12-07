import { check } from 'express-validator'
import User from '../models/UserModel.js'
const RegisterValidation = [
    check('username', 'username harus diisi')
        .notEmpty().trim()
        .isAlphanumeric().withMessage('username harus berupa karakter dan angka')
        .custom(async username => {
            const existingUsername = await User.findOne({ where: { username: username.toLowerCase() } })
            if (existingUsername) throw new Error('username telah digunakan')
        }),
    check('password', 'password harus diisi')
        .notEmpty()
        .trim()
        .isLength({ min: 8, max: 16 }).withMessage('password harus memiliki minimal 8 karakter dan maksimal 16 karakter'),
    check('confirm_password', 'konfirmasi password harus diisi')
        .notEmpty().trim()
        .custom(async (confirm_password, { req }) => {
            if (confirm_password != req.body.password) throw new Error('konfirmasi password salah')
        }),
    check('fullname', 'nama lengkap harus diisi')
        .notEmpty()
        .trim(),
    check('role', 'role harus diisi')
        .notEmpty()
        .trim(),
]

export default RegisterValidation