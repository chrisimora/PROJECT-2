import { check } from 'express-validator'
const PendaftarValidation = [
    check('nama', 'nama harus diisi')
        .notEmpty()
        .trim(),
    check('nama_event', 'nama event harus diisi')
        .notEmpty()
        .trim(),
    check('link_dokumen', 'link dokumen harus diisi')
        .notEmpty()
        .trim(),
    check('no_hp', 'no_hp harus diisi')
        .notEmpty()
        .trim(),
    check('email', 'email harus diisi')
        .notEmpty()
        .trim()
        .isEmail().withMessage("Email tidak valid").normalizeEmail(),
    check('alasan', 'alasan harus diisi')
        .notEmpty()
        .trim(),
]

export default PendaftarValidation