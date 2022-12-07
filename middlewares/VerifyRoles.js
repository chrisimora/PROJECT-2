export const VerifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.role) return res.sendStatus(401)
        const rolesArray = [...allowedRoles]
        if (!rolesArray.find(x => x.id == req.role)) {
            return res.sendStatus(403)
        }
        next()
    }
}