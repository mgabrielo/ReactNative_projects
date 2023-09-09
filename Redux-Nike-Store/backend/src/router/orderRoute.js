const express = require('express');
const { createOrder, getOrder } = require('../db/order');
const router = express.Router();

router.get('/:reference', async (req, res) => {
    const order = await getOrder(req.params.reference);
    if (!order) {
        res.status(404).send(`error : order not found`);
        return
    }
    res.status(200).send({ status: 'success', data: order });
})

router.post('/', async (req, res) => {
    const orderData = req.body;
    const ref = (Math.random() + 1).toString(36).substring(7);
    orderData.ref = ref;
    const newOrder = await createOrder(orderData)

    res.status(201).send({ status: 'success', data: newOrder })
})

module.exports = router