import express from 'express'
import cors from 'cors'
import userRouter from './routes/usersRoute.js'
import prodRouter from './routes/productsRoute.js'
import faqRouter from './routes/faqRoute.js'
import sellerRoute from './routes/bestSellersRoute.js'
import cartRouter from './routes/cartRoute.js'
import adminUserRouter from './routes/adminUsersRoute.js'
import cookieParser from 'cookie-parser'

const port = process.env.PORT || 2000
const app = express()

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}))

app.use(cookieParser())

app.use(express.static('public'))
app.use(express.json())

app.use('/', userRouter)
app.use('/', prodRouter)
app.use('/', faqRouter)
app.use('/', sellerRoute)
app.use('/', cartRouter)
app.use('/', adminUserRouter)

app.listen(port, () => {
    console.log('http://localhost:'+port);
})
