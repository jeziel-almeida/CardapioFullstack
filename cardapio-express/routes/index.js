var express = require('express');
var router = express.Router();
var cors = require('cors')
var mongodb = require('../dados/GestorDB')

router.use(cors())

/* GET home page. */
router.get('/food', async (req, res, next) => {
  try {
    const docs = await mongodb.findAll();
    let valores = docs.map((item) => {return {id:item._id, title:item.title, price:item.price, image:item.image}});
    res.send(valores);
  } catch (error) {
    res.send({resultado:'Erro ao Listar', mensagem: err});
  }
});

router.post('/food', async (req, res, next) => {
  //const _id = parseInt(req.body.id);
  const title = req.body.title;
  const price = parseInt(req.body.price);
  const image = req.body.image;
  try {
    const result = await mongodb.insert({title, price, image});
    res.send({resultado:'Inserido'});
  } catch (err) {
    res.send({resultado:'Erro ao Inserir', mensagem: err});
  }
});

module.exports = router;
