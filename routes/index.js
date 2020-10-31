var express = require('express');
var router = express.Router();
const path = require('path');
const mainController = require("../controllers/mainController");


//Ruta que muestra el index con texto (Punto 1 del ejercicio)
router.get('/', (req,res)=>
{
  return res.render("index");
});

//Ruta para mostrar la vista de Creditos... (PUNTO 5 del ejercicio)
router.get("/creditos", mainController.creditos);

module.exports = router;
