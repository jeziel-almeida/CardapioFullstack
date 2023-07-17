const mongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const url = process.env.MONGODB_URL;

mongoClient.connect(url,
    {useUnifiedTopology: true})
    .then(conn => connCardapio = conn.db('cardapio'))
    .catch(err => console.log(err))

function findAll() {
    return connCardapio.collection('comida').find().toArray();
}

function insert(comida) {
    return connCardapio.collection('comida').insertOne(comida);
}

module.exports = { findAll, insert }