'use strict'

var mongoose = require('mongoose');
var app=require('./app');
var port =3700;
mongoose.Promise= global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/Portafolio', { useNewUrlParser: true })
.then(() =>{
    console.log("conexion a la base de datos establecida con exito");


//Creacion del servidor
app.listen(port,() => {
    console.log("servidor corriendo perfectamente puerto 3700");
});

}).catch(err => console.log(err) );


