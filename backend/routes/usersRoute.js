import express from 'express';
import { fetchUsers } from '../controller/usersFunctions.js'

const userRouter = express.Router()

userRouter.get('/', fetchUsers)

export default userRouter