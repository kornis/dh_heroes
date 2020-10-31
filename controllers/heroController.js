const path = require('path');
const {readFileSync} = require('fs');
let datosJson = readFileSync(path.resolve(__dirname,"../data/heroes.json"),"utf-8");
let datosHeroes = JSON.parse(datosJson);

let controller = {

  //Método que muestra los datos de todos los heroes en pantalla.
  index: (req, res, next) =>{
    return res.send(datosHeroes);
  },
  
  //Método que devuelve Nombre y profesión de un heroe buscado por ID
  profesion:(req, res, next) => {
    //Guardamos la variable id que recibimos por la URL
    let id = req.params.id;
    let heroe = {};
    
    //Dejamos comentado como buscar por medio del ID un heroe en el array de objetos
    /* for(let i = 0; i<datosHeroes.length; i++){
      if(datosHeroes[i].id == id){
        heroe  = datosHeroes[i];
        return res.render("heroe", { 
          nombre: heroe.nombre,
          profesion: heroe.profesion,
          error:""
        });
      }
    } */
    
    //Buscamos el heroe por medio del ID usando el método FIND própio de los arrays.
    let hero = datosHeroes.find(heroe => heroe.id == id);
    
    let obj = { 
      nombre: hero.nombre,
      profesion: hero.profesion,
      error:""
    }
    let error = {
      error: "no existe un heroe con el id: ",
      id  
    }
    //Usamos IF ternario para renderizar los datos del heroe si estos fueron encontrados 
    //Renderizamos la misma vista pero enviando un mensaje de error si el heroe no fue encontrado
    hero ? (res.render("heroe",obj)) : res.render("heroe", error)
  },
  //Dejamos comentado el condicional de arriba pero en formato normal.
  /* if(hero){
    return res.render("heroe", { 
      nombre: hero.nombre,
      profesion: hero.profesion,
      error:""
    }); */
    
    // Método que devuelve los datos del héroe incluyendo la reseña
    resenia: (req, res) => {
      //Usamos destructuring para obtener las variables de la URL   
      let { id, tipo } = req.params;
      
      //Ciclo for para buscar en nuestro array de heroes segun el ID
      for(let i = 0; i<datosHeroes.length; i++){
        if(datosHeroes[i].id == id && tipo === "completa"){
          heroe  = datosHeroes[i];
          return res.render("resenia", { 
            nombre: heroe.nombre,
            resenia: heroe.resenia,
            error:""
          });
        }else if(datosHeroes[i].id == id){
          heroe  = datosHeroes[i];
          //Si por URL no recibimos la palabra "completa", no enviamos la reseña completa.
          //Usamos el método split para separar una cadena de texto en partes para que queden separadas en un array.
          //Split va a separar nuestro string cada vez que encuentre un espacio en blanco y cuando llegue a las 30 palabras termina.
          //Usamos el método JOIN de los arrays para concatenar cada parte de nuestro array. Usamos un espacio en blanco para unir cada parte.
          let reseniaCortada = heroe.resenia.split(" ", 30).join(" ") + "...";
          
          return res.render("resenia", { 
            nombre: heroe.nombre,
            resenia: reseniaCortada,
            error:""
          });
        }
      }
      return res.render("resenia", {
        error: "no existe un heroe con el id: ",
        id  }); 
      },
    }
    
    module.exports = controller;