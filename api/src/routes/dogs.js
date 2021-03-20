const { Router } = require("express");
const { Dog, Temperament } = require("../db.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { YOUR_API_KEY } = process.env;

const fetch = require("node-fetch");

const app = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

app.get("/dogs", async function (req, res) {
  var { name } = req.query;
  if (name) {
    fetch(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
      .then((data) => data.json())
      .then(async (json) => {
        let breed = await Dog.findAll({
          include: [
            {
              model: Temperament,
              required: true,
            },
          ],
        });

        breed.forEach((dato) => {
          if (dato.dataValues.name.includes(name)) {
            let temperament = dato.dataValues.temperamentos.map((temp) => {
              return temp.dataValues.nameT;
            });
            dato.dataValues.temperamentos = temperament[0];
            json.push(dato.dataValues);
          }
        });

        if (json.length > 0) {
          let razaEnc = [];

          for (let i = 0; i < json.length; i++) {
            let raza1 = {
              id: json[i].id,
              name: json[i].name,
              img:
                `https://cdn2.thedogapi.com/images/${json[i].reference_image_id}.jpg` ||
                "https://us.123rf.com/450wm/bestpetphotos/bestpetphotos1712/bestpetphotos171200177/91448764-perrito-dogloval-triste-lindo-del-perro-del-perro-de-aguas-de-rey-charles-en-fondo-blanco-aislado-de.jpg?ver=6",
              temperament: json[i].temperament || json[i].temperamentos,
            };
            razaEnc.push(raza1);
          }
          res.json(razaEnc);
        }
      });
  } else {
    fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${YOUR_API_KEY}`)
      .then((data) => data.json())
      .then(async (json) => {
        let razasCr = await Dog.findAll({
          include: Temperament,
        });

        razasCr.forEach((dato) => {
          let temperament = dato.dataValues.temperamentos.map((temp) => {
            return temp.dataValues.nameT;
          });
          dato.dataValues.temperamentos = temperament[0];
          json.push(dato.dataValues);
        });

        let raza2 = json.map((dato) => {
          return {
            id: dato.id,
            img:
              (dato.image && dato.image.url) ||
              "https://us.123rf.com/450wm/bestpetphotos/bestpetphotos1712/bestpetphotos171200177/91448764-perrito-dogloval-triste-lindo-del-perro-del-perro-de-aguas-de-rey-charles-en-fondo-blanco-aislado-de.jpg?ver=6",
            name: dato.name,
            temperament: dato.temperament || dato.temperamentos,
          };
        });

        raza2.sort((a, b) => (a.name > b.name ? 1 : -1));

        res.json(raza2);
      });
  }
});
///////////////////////////////////////////////////////////////////////////////

app.get("/dogs/:idBreed", async function (req, res) {
  var { idBreed } = req.params;
  fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${YOUR_API_KEY}`)
    .then((data) => data.json())
    .then(async (json) => {
      let breed = json.find((dato) => dato.id === parseInt(idBreed));
      if (breed) {
        return res.json({
          img:
            (breed.image && breed.image.url) ||
            "https://us.123rf.com/450wm/bestpetphotos/bestpetphotos1712/bestpetphotos171200177/91448764-perrito-dogloval-triste-lindo-del-perro-del-perro-de-aguas-de-rey-charles-en-fondo-blanco-aislado-de.jpg?ver=6",
          name: breed.name || "No Encontrado",
          temperament:
            breed.temperament || breed.temperamentos || "No Encontrado",
          weight: breed.weight.metric || "No Encontrado",
          height: breed.height.metric || "No Encontrado",
          life_span: breed.life_span || "No Encontrado",
        });
      } else {
        let razaC = await Dog.findAll({
          include: [
            {
              model: Temperament,
              required: true,
            },
          ],
        });

        let creadaR = razaC.find(
          (dato) => dato.dataValues.id === parseInt(idBreed)
        );
        if (creadaR) {
          return res.json({
            img:
              creadaR.dataValues.img ||
              "https://us.123rf.com/450wm/bestpetphotos/bestpetphotos1712/bestpetphotos171200177/91448764-perrito-dogloval-triste-lindo-del-perro-del-perro-de-aguas-de-rey-charles-en-fondo-blanco-aislado-de.jpg?ver=6",
            name: creadaR.dataValues.name || "No Encontrado",
            temperament:
              creadaR.dataValues.temperamentos[0].nameT || "No Encontrado",
            weight: creadaR.dataValues.weight || "No Encontrado",
            height: creadaR.dataValues.height || "No Encontrado",
            life_span: creadaR.dataValues.life_span || "No Encontrado",
          });
        }
        return res.status(404).json({ message: "No Encontrado" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//Creacion de un perro

let idDog = 200;
app.post("/dogs", async (req, res) => {
  if (req.body) {
    idDog++;
    const { name, height, weight, lifespan, image } = req.body;
    const dog = await Dog.create({
      id: idDog,
      name,
      height,
      weight,
      lifespan,
      image,
    });
    return res.json(dog);
  }
});

module.exports = app;
