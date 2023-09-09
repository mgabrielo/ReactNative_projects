const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const productRoute = require('../src/router/productRoute')
const orderRoute = require('../src/router/orderRoute')
app.use(bodyParser.json())
app.use('/products', productRoute);
app.use('/orders', orderRoute);

app.get('/', (req, res) => {
    res.send('helloo !!!! ')
})
const PORT = 3000;


app.listen(PORT, 'ipaddress', () => {
    console.log('api running on port : ', PORT)
})