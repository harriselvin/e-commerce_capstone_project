import express from 'express';
import { fetchFaq } from '../controller/faqFunctions.js'

const faqRouter = express.Router()

faqRouter.get('/faq', fetchFaq)

export default faqRouter