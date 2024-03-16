const { Router } = require('express');
const Genero = require('../models/Genero');
const { validationResult, check } = require('express-validator');

const router = Router();

//CREAR GENERO
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
], async function(req, res){

    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let genero = new Genero();
            genero.nombre = req.body.nombre;
            genero.estado = req.body.estado;
            genero.descripcion = req.body.descripcion;
            genero.fechaCreacion = new Date();
            genero.fechaActualizacion = new Date();

            genero = await genero.save();
            res.send(genero);
        
    }catch(error){
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }

});
//LISTAR GENERO
router.get('/', async function (req, res) {

    try {

        const generos = await Genero.find();
        res.send(generos);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }

});
//ACTUALIZAR GENERO
router.put('/:generoId', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }


        let genero = await genero.findById(req.params.generoId);
        if(!genero){
            return res.status(400).send('genero no existe');
        }


        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.descripcion = req.body.descripcion;
        genero.fechaActualizacion = new Date;

        genero = await genero.save();

        res.send(genero);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al actualizar genero');
    }

});

module.exports = router;