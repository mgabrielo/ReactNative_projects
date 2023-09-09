const { ObjectId } = require('mongodb');
const db = require('./db');

const getProducts = async () => {
    const products = await db.products.find().toArray();
    // console.log(products)
    return products;
}

const getProduct = async (id) => {
    const product = await db.products.findOne({ _id: new ObjectId(id) });
    return product;
}

module.exports = { getProducts, getProduct }