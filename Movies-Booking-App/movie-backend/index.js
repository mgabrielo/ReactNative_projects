require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('stripe secret key');
const app = express();
const Port = 8080;
app.use(express.json());
app.use(cors());
app.post('/payment', async (req, res) => {

    try {
        const { amount } = req.body

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'INR',
            payment_method_types: ['card']
        });

        const clientSecret = paymentIntent.client_secret;
        res.json({
            clientSecret: clientSecret,
            merchantDisplayName: 'Merchant Name',
        })

    } catch (error) {
        console.log(error)
    }
})
app.listen(Port, () => {
    console.log("listening to port 8080")
})

