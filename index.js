import express from 'express'
import cors from 'cors'
import userRouter from './routes/usersRoute.js'
import prodRouter from './routes/productsRoute.js'
import faqRouter from './routes/faqRoute.js'
import sellerRoute from './routes/bestSellersRoute.js'
import cartRouter from './routes/cartRoute.js'

const port = process.env.PORT || 2000
const app = express()

app.use(cors({
    origin: '*',
    credentials: true
}))


app.use(express.static('public'))
app.use(express.json())

app.use('/', userRouter)
app.use('/', prodRouter)
app.use('/', faqRouter)
app.use('/', sellerRoute)
app.use('/', cartRouter)

app.listen(port, () => {
    console.log('http://localhost:'+port);
})