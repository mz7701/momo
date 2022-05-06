const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const sequelize = require('./models').sequelize;
sequelize.sync();

//
const path = require("path");
app.use(express.static(path.join_dirname, "cilent","build"));

//
//sequelize.sync({ force: true });
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const {
    Teacher,
    Sequelize: { Op }
  } = require('./models');
sequelize.query('SET NAMES utf8;');

app.post('/add/data', (req, res) => {
    console.log(req.body)

      Teacher.create({
          name : req.body.data
      })
      .then( result => {
          res.send(result)
      })
      .catch( err => {
          console.log(err)
          throw err;
      })
}) 
//
app.post('/add/data', (req, res) => {
    console.log(req.body)
})//

app.get('/get/data', (req, res) => {
    Teacher.findAll()
    .then( result => { res.send(result) })
    .catch( err => { throw err })
}) 
app.post('/modify/data', (req, res) => {
    Teacher.update({ name : req.body.modify.name }, {
        where : { id : req.body.modify.id }
    })
    .then( result => { res.send(result) })
    .catch( err => { throw err })
})

app.post('/delete/data', (req, res) => {
    Teacher.destroy({
        where : { id : req.body.delete.id }
    })
    .then( res.sendStatus(200) )
    .catch( err => { throw err })
})
//
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})