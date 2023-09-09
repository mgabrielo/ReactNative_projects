const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://greycoinz:grey123@cluster0.mug9svk.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(uri);

const database = client.db('nikestore');
const products = database.collection('products');
const orders = database.collection('orders');

module.exports = {
    products, orders
}