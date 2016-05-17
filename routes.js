module.exports = function(app) {

	var SerieTV = require('./seriestv');
	var http = require('http');
	var urlParser = require('url');


	//GET All
	findAllSeriesTV = function(req, res) {
		SerieTV.find(function(err,seriestv) {
			if(!err) res.send(seriestv);
			else console.log('ERROR: ' + err);
		});
	};

	//GET One
	findById = function(req, res) {
		SerieTV.findById(req.params.id, function(err,seriestv) {
			if(!err) res.send(seriestv);
			else console.log('ERROR: ' + err);
		});
	};

	//POST
	addSerieTV = function(req,res) {
		console.log('POST');
		console.log(req.body);

		var seriestv = new SerieTV({
			titulo: req.body.titulo,
			temporadas: req.body.temporadas,
			pais: req.body.pais,
			genero: req.body.genero
		});

		seriestv.save(function(err){
			if(!err) console.log('Serie Guardada');
			else console.log('ERROR: ' + err);
		});

		res.send(seriestv);
	};

	//PUT update
	updateSerieTV = function(req,res) {
		SerieTV.findById(req.params.id, function(err, seriestv) {
			seriestv.titulo = req.body.titulo;
			seriestv.temporadas = req.body.temporadas;
			seriestv.pais = req.body.pais;
			seriestv.genero = req.body.genero;

			seriestv.save(function(err){
				if(!err) console.log('Serie Actualizada');
				else console.log('ERROR: ' + err);
			});
		});
	};

	//DELETE
	deleteSerieTV = function(req,res) {
		SerieTV.findById(req.params.id, function(err, seriestv){
			seriestv.remove(function(err){
				if(!err) console.log('Serie Borrada');
				else console.log('ERROR: ' + err);
			});
		});
	};

	otro = function(callback) {
		var uri = urlParser.parse('http://api.sandbox.gosocket.net/api/gadget/getuser');
		var data ="";
		var options = {
			hostname: uri.hostname,
			port: uri.port,
			path: uri.path,
			auth: 'ba9830a4-774d-4f2e-abaa-349a7954f5bb:572f7db6'
		};
		console.log(options);


		http.get(options, function(res) {
		  console.log("Got response: " + res.statusCode);
		  console.log(res);
		  res.on("data", function(chunk) {
		    console.log("BODY: " + chunk);
		    console.log(typeof chunk),
		    data = chunk;
		    callback(null, data.toString());
		  });
		  
		}).on('error', function(e) {
		  console.log("Got error: " + e.message);
		  callback(e.message, null)
		});


	};

	//Call
	getVendors = function(req, res) {
		otro(function(err, data) {
			console.log('IF FFF');
			if (!err) {
				res.json({data:data});
			} 
			else {
				res.status(500).json({err:err,data:data});
				console.log(err);
			}
		});

	};

	//API Routes
	app.get('/seriestv', findAllSeriesTV);
	app.get('/seriestv/:id', findById);
	app.post('/seriestv', addSerieTV);
	app.put('/seriestv/:id',updateSerieTV);
	app.delete('/seriestv/:id', deleteSerieTV);
	app.get('/call', getVendors);
};