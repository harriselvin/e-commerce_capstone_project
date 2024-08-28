import express from 'express'
import cors from 'cors'
import userRouter from './routes/usersRoute.js'
import prodRouter from './routes/productsRoute.js'

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

app.listen(port, () => {
    console.log('http://localhost:'+port);
})
