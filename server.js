// Incluímos las dependencias que vamos a usar
var express = require('express');
var mongoose = require('mongoose');
var app = express();

// Configuramos la app para que pueda realizar métodos REST
app.configure(function() {
	app.use(express.bodyParser()); // JSON parsing
	app.use(express.methodOverride()); // HTTP PUT and DELETE support
	app.use(app.router); // simple route management
});

// petición GET del root que sólo muestre "Hello world!"
app.get('/', function(req, res){
  res.send('hello world');
});

require('./routes')(app);

// Conexión
mongoose.connect('mongodb://localhost/seriestv', function(err,res) {
	if (err) console.log('error de conexion' + err);
	else console.log('conexion exitosa');
});

// El servidor escucha en el puerto 5000
app.listen(5000);