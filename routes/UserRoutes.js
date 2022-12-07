import express from "express"
import { getAllUsers } from "../controllers/UserController.js"
import { VerifyJWT } from "../middlewares/VerifyJWT.js"
import { VerifyRoles } from "../middlewares/VerifyRoles.js"
import AuthRoles from "../config/AuthRoles.js"

const UserRoutes = express.Router()

UserRoutes.get('/', VerifyJWT, VerifyRoles(AuthRoles.admin), getAllUsers)
export default UserRoutes