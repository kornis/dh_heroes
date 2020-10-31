var express = require('express');
var router = express.Router();

const path = require('path');
const {readFileSync} = require('fs');

let datosJson = readFileSync(path.resolve(__dirname,"../data/heroes.json"),"utf-8");
let datosHeroes = JSON.parse(datosJson);

const heroController = require(path.resolve(__dirname,'../controllers/heroController'));

//Ruta /heroes que muestra el contenido del archivo JSON (Punto 2 del ejercicio)
router.get('/', heroController.index);

//Ruta que muestra los datos de un Heroe segun su id (Punto 3 del ejercicio)
router.get('/:id/profesion/', heroController.profesion); 

//Ruta que muestra datos del Heroe y su reseña (Punto 4 del ejercicio)
router.get('/:id/resenia/:tipo?', heroController.resenia);

module.exports = router;