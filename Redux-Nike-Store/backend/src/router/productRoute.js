const express = require('express');
const { getProducts, getProduct } = require('../db/product')
const router = express.Router();

router.get('/', async (req, res) => {
    const products = await getProducts();
    // console.log(products)
    res.status(200).send({ data: products })
})

router.get('/:productId', async (req, res) => {
    try {
        const product = await getProduct(req.params.productId);

        if (!product) {
            res.status(401).send({ error: 'No Product Found' })
            return;
        }

        res.status(200).send({ data: product })
    } catch (error) {
        res.status(401).send({ error: error.message })
    }
})

module.exports = router;