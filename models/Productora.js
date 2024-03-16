const{Schema, model} = require('mongoose');

const ProductoraSchema = new Schema({
    nombre: { type: String, required: true },
    estado: { type: String, required: true, enum: ['Activo', 'Inactivo'] },
    slogan: { type: String, required: true },
    descripcion: { type: String, required: true },
    fechaCreacion: { type: Date, required: true },
    fechaActualizacion: { type: Date, required: true },
  });

  module.exports = model('Productora', ProductoraSchema);