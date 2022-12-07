import express from "express"
import { createPendaftar, deletePendaftar, getAllPendaftar, getPendaftarById, updatePendaftar } from '../controllers/PendaftarController.js'
import { VerifyJWT } from "../middlewares/VerifyJWT.js"
import { VerifyRoles } from "../middlewares/VerifyRoles.js"
import AuthRoles from "../config/AuthRoles.js"
import PendaftarValidation from "../validations/PendaftarValidation.js"
import ValidationResult from "../validations/ValidationResult.js"

const PendaftarRoutes = express.Router()

PendaftarRoutes.get('/', getAllPendaftar)
PendaftarRoutes.get('/:id', getPendaftarById)
PendaftarRoutes.post('/', PendaftarValidation, ValidationResult, VerifyJWT, VerifyRoles(AuthRoles.admin), createPendaftar)
PendaftarRoutes.put('/:id', PendaftarValidation, ValidationResult, updatePendaftar)
PendaftarRoutes.delete('/:id', deletePendaftar)
export default PendaftarRoutes