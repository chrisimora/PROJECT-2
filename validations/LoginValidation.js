import { check } from 'express-validator'
const LoginValidation = [
    check('username', 'username harus diisi')
        .notEmpty().trim(),
    check('password', 'password harus diisi')
        .notEmpty()
        .trim()
]

export default LoginValidation