module.exports = function(app) {

	var SerieTV = require('./seriestv');

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

	//API Routes
	app.get('/seriestv', findAllSeriesTV);
	app.get('/seriestv/:id', findById);
	app.post('/seriestv', addSerieTV);
	app.put('/seriestv/:id',updateSerieTV);
	app.delete('/seriestv/:id', deleteSerieTV);
};