import Pendaftar from '../models/PendaftarModel.js'
import dotenv from 'dotenv'
dotenv.config()

export const getAllPendaftar = async (req, res) => {
    try {
        const data = await Pendaftar.findAll()
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
}

export const getPendaftarById = async (req, res) => {
    try {
        const data = await Pendaftar.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
}

export const createPendaftar = async (req, res) => {
    const { nama, id_event, nama_event, link_dokumen, no_hp, email, alasan } = req.body
    try {
        const pendaftar = await Pendaftar.create({
            nama,
            id_event,
            nama_event,
            link_dokumen,
            no_hp,
            email,
            alasan
        })
        res.json({ msg: 'Berhasil tambah data', data: pendaftar })
    } catch (error) {
        console.log(error);
    }
}

export const updatePendaftar = async (req, res) => {
    const { nama, id_event, nama_event, link_dokumen, no_hp, email, alasan } = req.body
    try {
        await Pendaftar.update({
            nama: nama,
            id_event: id_event,
            nama_event: nama_event,
            link_dokumen: link_dokumen,
            no_hp: no_hp,
            email: email,
            alasan: alasan
        }, {
            where: {
                id: req.params.id
            }
        })
        res.json({ msg: 'Berhasil update data' })
    } catch (error) {
        console.log(error);
    }
}

export const deletePendaftar = async (req, res) => {
    try {
        await Pendaftar.destroy({ where: { id: req.params.id } })
        res.json({ msg: 'Berhasil hapus data' })
    } catch (error) {
        console.log(error);
    }
}