import { compare } from "bcrypt";
import jwt from 'jsonwebtoken';
import { config } from "dotenv";
import { loginUserDB } from "../model/usersDB.js";
import { loginAdminUserDB } from "../model/adminUsersDB.js";

config()

const checkUser = async (req, res, next) => {
    const { email, password } = req.body
    let hashedPassword = (await loginUserDB(email)).password

    let result = await compare(password, hashedPassword)
    try {
        if (result == true) {
            let token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '1h' })

            res.cookie('token', token, { httpOnly: true })

            req.body.token = token
            next()
            return
        } else {
            res.status(400).json({ message: "Invalid email or password" })
        }
    } catch (error) {

    }
}

const checkAdminUser = async (req, res, next) => {
    const { email, password } = req.body
    let hashedPassword = (await loginAdminUserDB(email)).password

    let result = await compare(password, hashedPassword)
    try {
        if (result == true) {
            let token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '1h' })

            res.cookie('token', token, { httpOnly: true })

            req.body.token = token
            next()
            return
        } else {
            res.status(400).json({ message: "Invalid email or password" })
        }
    } catch (error) {

    }
}

const verifyToken = (req, res, next) => {    
    const cookie = req.cookies.token

    let token = cookie // && cookie.split('=')[1]

    if (!token) {
        res.status(401).json({ message: "Unauthorized" })
        return
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            res.json({ message: 'Token has expired' })
            return
        }
        req.body.user = decoded.userProfile
        next()
    })
}

export { checkUser, checkAdminUser, verifyToken }