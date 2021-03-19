const axios = require("axios")
const app = require('express').Router()
const { Dog, Temperament } = require('../db');
const {
    YOUR_API_KEY
  } = process.env;


  function filtro(arr,value){    
    var a = arr.filter(element=>{
        return element.name.toLowerCase().includes(value.toLowerCase()) || (element.temperament && element.temperament.toLowerCase().includes(value.toLowerCase()))    
    })
     return a
}

  function parserArray (array){
    let string = "";
    array.forEach(element => {
        return string += `${element.name}, `	
    });
    return string.substring(0, string.length - 2);
}
// - Obtener un listado de las primeras 8 razas de perro
// - Debe devolver solo los datos necesarios para la ruta principal
app.get('/dogs' , (req, res) => {
    Promise.all([axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`),
    Dog.findAll({
      include:{
        model:Temperament
      },
    })])   
    .then(resp => {
        var principal_caract = [];
        resp[0].data.forEach(element => {
            var datos_key = {
                id : element.id,
                name: element.name,
                img: element.image.url,
                temperament: element.temperament,
                weight: element.weight.metric
            }
            principal_caract.push(datos_key)
        })
        resp[1].forEach(element => {
            var datos_key = {
                id: element.id,
                name: element.name,
                temperament: parserArray(element.temperament),
                img: element.img
            }
            principal_caract.push(datos_key)
        })
        if(req.query.name){
            var filterByName = filtro(principal_caract,req.query.name)
           
            return res.json(filterByName)
          }
           return res.json(principal_caract)
          
            }) 
    .catch(err => {
        console.log(err)
    })
})

  

module.exports = app