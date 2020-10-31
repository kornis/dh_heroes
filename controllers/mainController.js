//Método que nos devuelve la vista Créditos con un texto.
let controller = {
    creditos: function(req, res, next) {
      return res.render("creditos");
    }
}

module.exports = controller;