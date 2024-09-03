import { compare } from "bcrypt";
import jwt from 'jsonwebtoken';
import { config } from "dotenv";
import { loginUserDB } from "../model/usersDB.js";
import { nextTick } from "vue";

config()

const checkUser = async (req, res, next) => {
    const { email, password } = req.body
    let hashedPassword = (await loginUserDB(email)).password

    let result = await compare(password, hashedPassword)
    try {
        if (result == true) {
            let token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '1h' })

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
    let { cookie } = req.headers

    let token = cookie && cookie.split('=')[1]

    console.log(cookie);
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            res.json({ message: 'Token has expired' })
            return
        }
        req.body.user = decoded.userProfile
        next()
    })
}

const authenticateToken = (req, res, next) => {
    const token = req.headers('Authorization')

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided' })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(400).send({ error: 'Invalid token' })
    }
}

export { checkUser, verifyToken, authenticateToken }