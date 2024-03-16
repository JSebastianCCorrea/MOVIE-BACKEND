const { Router } = require('express');
const Media = require('../models/Media');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check('urlPelicula', 'invalid.urlPelicula').not().isEmpty(),
    check('fotoPortada', 'invalid.fotoPortada').not().isEmpty(),
    check('añoEstreno', 'invalid.añoEstreno').not().isEmpty(),
    check('genero', 'invalid.genero').not().isEmpty(),
    check('director', 'invalid.director').not().isEmpty(),
    check('productora', 'invalid.productora').not().isEmpty(),
    check('tipo', 'invalid.tipo').not().isEmpty(),
], async function (req, res) {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() });
        }

        const existePeliculaPorSerial = await Media.findOne({ serial: req.body.serial });
        if (existePeliculaPorSerial) {
            return res.status(400).send('Ya existe el serial para otro equipo')
        }

        let media = new Media();
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.urlPelicula = req.body.urlPelicula;
        media.fotoPortada = req.body.fotoPortada;
        media.añoEstreno = req.body.añoEstreno;
        media.precio = req.body.precio;
        media.usuario = req.body.usuario._id;
        media.genero = req.body.genero._id;
        media.director = req.body.director._id;
        media.productora = req.body.productora._id;
        media.productora = req.body.tipo._id;
        media.fechaCreacion = new Date();
        media.fechaActualizacion = new Date();

        media = await media.save();
        res.send(media);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al crear media');
    }
});

module.exports = router;