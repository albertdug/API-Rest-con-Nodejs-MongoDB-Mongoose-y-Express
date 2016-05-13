var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var seriestv = new Schema({
	titulo:String,
	temporadas:Number,
	pais:String,
	genero: {
		type:String,
		enum: ['comedia', 'terror', 'accion', 'fantasia']
	}
});
	
module.exports = mongoose.model('SerieTV',seriestv);