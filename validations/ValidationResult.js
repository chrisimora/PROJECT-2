import { validationResult } from 'express-validator'
const ValidationResult = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json({
            status: false,
            errors: errors.errors
        })
    }
    next()

}
export default ValidationResult