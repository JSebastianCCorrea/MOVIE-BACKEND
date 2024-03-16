const { Router } = require('express');
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();

//CREAR TIPO
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').isIn(['Activo', 'Inactivo']),
], async function(req, res){

    try{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        let tipo = new Tipo();
            tipo.nombre = req.body.nombre;
            tipo.descripcion = req.body.descripcion;
            tipo.fechaCreacion = new Date();
            tipo.fechaActualizacion = new Date();

            tipo = await tipo.save();
            res.send(tipo);
        
    }catch(error){
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }

});

module.exports = router;