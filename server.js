var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/seriestv', function(err,res) {
	if (err) console.log('error de conexion' + err);
	else console.log('conexion exitosa');
});

app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
});

app.get('/', function(req, res){
  res.send('hello world');
});

require('./routes')(app);

app.listen(5000);