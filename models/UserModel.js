import { Sequelize } from "sequelize"
import db from "../config/Database.js"

const { DataTypes } = Sequelize

const User = db.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    role: DataTypes.INTEGER,
    refresh_token: DataTypes.TEXT
}, {
    freezeTableName: true
})

export default User