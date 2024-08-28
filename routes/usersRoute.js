import express from 'express';
import { fetchUsers, fetchUser } from '../controller/usersFunctions.js'

const userRouter = express.Router()

userRouter.get('/users', fetchUsers)
userRouter.get('/user/:id', fetchUser)

export default userRouter
