const express = require('express')
require('dotenv').config();
require('./db')

const cors = require('cors');

const userRouter = require('./routes/user')
const app = express()

const PORT = process.env.PORT || 8000

app.use(cors())

app.use(express.json());

app.use('/api/user', userRouter)

app.post('/api/user/create', (req, res) => {

    const { name, email, password } = req.body
    const newUser = new User({
        name,
        email,
        password,
    })
    res.send(newUser)
})

app.listen(8000, () => {
    console.log(`server runs on ${PORT}`)
})