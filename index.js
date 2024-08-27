import express from 'express'

const port = process.env.PORT 
const app = express()

app.use()

app.listen(port, () => {
    console.log('http://localhost:'+port);
})