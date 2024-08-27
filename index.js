import express from 'express'

const port = process.env.PORT || 2000
const app = express()

app.use(express.static('public'))
app.use(express.json())

app.listen(port, () => {
    console.log('http://localhost:'+port);
})