'use strict'
var express = require('express');
var bodyParser=require('body-parser');

var app=express();

// cargar archivos de ruta



// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors


//rutas
app.get('/',(req,res) => {
    res.status(200).send(
        "<h1>pagina de inicio<h1>"
    );
});
app.get('/test',(req,res) => {
    res.status(200).send({
        menssage:"hola mundo desde mi api node js"
    });
});
//exportar
module.exports=app;