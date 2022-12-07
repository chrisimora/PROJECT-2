import User from '../models/UserModel.js'
import dotenv from 'dotenv'
dotenv.config()

export const getAllUsers = async (req, res) => {
    try {
        const data = await User.findAll()
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
}