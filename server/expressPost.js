const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use( bodyParser.urlencoded({extended: true}) );

app.get('/saludo', function(req, res){
    res.send(`Hola ${req.query.name}`); // Para peticiones GET se utiliza req.query.name esto funciona solo en este caso con express otros frameworks no diferencias entre query y body 
});

app.post('/', function(req, res){
    res.send(`Hola ${req.body.name}`); // Para peticiones POST se utiliza req.body.name esto funciona solo en este caso con express otros frameworks no diferencias entre query y body
});

app.listen(3000);