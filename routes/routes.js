import express from "express"
import AuthRoutes from "./AuthRoutes.js"
import UserRoutes from './UserRoutes.js'
import PendaftarRoutes from "./PendaftarRoutes.js"

const routers = express.Router()

routers.use('/auth', AuthRoutes)
routers.use('/users', UserRoutes)
routers.use('/pendaftar', PendaftarRoutes)

export default routers