import express from 'express'
import userRouter from './routes/usersRoute.js'
import prodRouter from './routes/productsRoute.js'

const port = process.env.PORT || 2000
const app = express()

app.use(express.static('public'))
app.use(express.json())

app.use('/users', userRouter)
app.use('/products', prodRouter)

app.listen(port, () => {
    console.log('http://localhost:'+port);
})
