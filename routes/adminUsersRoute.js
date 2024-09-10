import express from 'express';
import { fetchAdminUsers, fetchAdminUser, addAdminUser, loginAdminUser, updateAdminUser, deleteAdminUser } from '../controller/adminUsersFunctions.js'
import { checkUser, checkAdminUser } from '../middleware/authenticate.js';

const adminUserRouter = express.Router()

adminUserRouter.get('/admins', fetchAdminUsers)
        .get('/admin/:id', fetchAdminUser)  
        .post('/registerAdmin', addAdminUser)
        .post('/loginAdmin', checkAdminUser, loginAdminUser)
        .patch('/admin/:id', updateAdminUser)
        .delete('/admin/:id', deleteAdminUser)

export default adminUserRouter
