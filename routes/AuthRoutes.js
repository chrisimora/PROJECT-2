import express from "express"
import { login, logout, refreshToken, register } from '../controllers/AuthController.js'
import LoginValidation from "../validations/LoginValidation.js"
import RegisterValidation from "../validations/RegisterValidation.js"
import ValidationResult from "../validations/ValidationResult.js"

const AuthRoutes = express.Router()

AuthRoutes.post('/register', RegisterValidation, ValidationResult, register)
AuthRoutes.post('/login', LoginValidation, ValidationResult, login)
AuthRoutes.post('/refresh', refreshToken)
AuthRoutes.post('/logout', logout)

export default AuthRoutes