const {Schema, model } = require('mongoose');

const MediaSchema = new Schema({

    serial: {
        type: String,
        required:true,
        unique: true
    },
    titulo: {
        type: String,
        required:true
    },
    sinopsis: { 
        type: String,
        required: true
    },
    urlPelicula: {
        type: String,
        required: true
    },
    fotoPortada: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        required: true
    },
    fechaActualizacion: {
        type: Date,
        required: true
    },
    añoEstreno: {
        type: String,
        required: true
    },
    genero: {
        type: Schema.Types.ObjectId,
        ref: 'Genero',
        required: true
    },
    director: {
        type: Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },
    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Productora',
        required: true
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo',
        required: true
    },
  
});

module.exports = model('Media', MediaSchema);