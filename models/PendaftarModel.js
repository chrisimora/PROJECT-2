import { Sequelize } from "sequelize"
import db from "../config/Database.js"

const { DataTypes } = Sequelize

const Pendaftar = db.define('pendaftar', {
    nama: DataTypes.STRING,
    id_event: DataTypes.INTEGER,
    nama_event: DataTypes.STRING,
    link_dokumen: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    email: DataTypes.STRING,
    alasan: DataTypes.TEXT
}, {
    freezeTableName: true
})

export default Pendaftar