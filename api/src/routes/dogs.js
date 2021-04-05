const { Router } = require("express");
const { Dog, Temperament } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { YOUR_API_KEY } = process.env;
const fetch = require("node-fetch");
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// el id 300 es por seguridad
let idDog = 300;
router.post("/dogs", async (req, res) => {
  if (req.body) {
    idDog++;
    const { name, height, weight, lifespan, temperaments, image } = req.body;
    const dog = await Dog.create({
      id: idDog,
      name,
      height,
      weight,
      lifespan,
      image: `${image}` || "Error al cargar la imagen",
    });
    if (temperaments) {
      const temperament = await Temperament.findAll({
        where: { name: temperaments },
      });
      await dog.addTemperament(temperament);
      return res.json(dog);
    }
    return res.json(dog);
  }
});

router.get("/dogs", async function (req, res) {
  var { name } = req.query;
  /// Si me pasan un nombre, hago un fetch a la api con el nombre para traer ese perro en especifico, creo un array para guardar esos perros llamado json
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
        //Si existe un perro en la base de datos con el mismo nombre, entonces lo traigo tambien, y lo pusheo al array json
        breed.forEach((dato) => {
          if (dato.dataValues.name.includes(name)) {
            let temperament = dato.dataValues.temperaments;
            dato.dataValues.temperaments = temperament[0].name;
            json.push(dato.dataValues);
          }
        });

        if (json.length > 0) {
          let crBreed = [];
          for (let i = 0; i < json.length; i++) {
            //breed reference guarda todos los datos que voy a mostrar de los perros
            let breedReference = {
              id: json[i].id,
              name: json[i].name,
              img:
                json[i].image ||
                `https://cdn2.thedogapi.com/images/${json[i].reference_image_id}.jpg`,
              temperament: json[i].temperament || json[i].temperaments,
            };
            //guardo a los perros de la api, y a los de la base de datos en un arreglo llamado crbreed
            crBreed.push(breedReference);
          }
          res.json(crBreed);
        }
      });
    ///si no hay un nombre, entonces hago una peticion general a la api para que me traiga todos los perros
  } else {
    fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${YOUR_API_KEY}`)
      .then((data) => data.json())
      .then(async (json) => {
        let DogCr = await Dog.findAll({
          include: Temperament,
        });
        //traigo los perros de la base de datos, junto con sus temperamentos asignados
        DogCr.forEach((dato) => {
          let temperament = dato.dataValues.temperaments.map((temp) => {
            return temp.dataValues.name;
          });
          dato.dataValues.temperaments = temperament[0];
          json.push(dato.dataValues);
        });
        //creo un array para juntar a los perros de la api y los de la base de datos para que aparezcan juntos
        let breedReference2 = json.map((data) => {
          return {
            id: data.id,
            img: data.image.url || data.image,
            name: data.name,
            temperament: data.temperaments || data.temperament,
          };
        });
        breedReference2.sort((a, b) => (a.name > b.name ? 1 : -1));
        res.json(breedReference2);
      });
  }
});

router.get("/dogs/:idBreed", async function (req, res) {
  var { idBreed } = req.params;
  fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${YOUR_API_KEY}`)
    .then((data) => data.json())
    .then(async (json) => {
      //Filtro a los perros por el id que se me pasa por params, esto para los perros de la api
      let breed = json.find((data) => data.id === parseInt(idBreed));
      if (breed) {
        return res.json({
          img: breed.image && breed.image.url,
          name: breed.name || "error",
          temperament: breed.temperament || breed.temperamentos || "error",
          weight: breed.weight.metric || "error",
          height: breed.height.metric || "error",
          lifespan: breed.life_span || "error",
        });
        //para los perros de la base de datos
      } else {
        let createDog = await Dog.findAll({
          include: [
            {
              model: Temperament,
            },
          ],
        });
        //busco el perro en la base de datos por el id
        let createDoggy = createDog.find(
          (dato) => dato.dataValues.id === parseInt(idBreed)
        );
        //si existe entonces lo muestra
        if (createDoggy) {
          return res.json({
            img: createDoggy.dataValues.image || "error al cargar la imagen!",
            name: createDoggy.dataValues.name || " Error al cargar el nombre",
            temperament:
              createDoggy.dataValues.temperaments[0].name ||
              " Error al mostrar los temperamentos",
            weight:
              createDoggy.dataValues.weight || " Error al mostrar el peso",
            height: createDoggy.dataValues.height || "Error al mostrar altura",
            lifespan:
              createDoggy.dataValues.lifespan ||
              " Error al mostrar la esperanza de vida",
          });
        }
        return res.status(404).json({ message: " error" });
      }
    })
    .catch((err) => {
      console.error(err);
      return;
    });
});

///creo un array de temperamentos

let temp = [];
fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${YOUR_API_KEY}`)
  .then((response) => response.json())
  .then((json) => {
    json?.forEach((b) => {
      // traigo todos los temperemantos de la api
      let temps = b.temperament?.split(", ");
      temps?.forEach((t) => {
        if (!temp.find((tp) => tp.name === t)) {
          temp.push({ name: t });
        }
      });
    });
  })
  .then(() => {
    //creo los temperamentos en la base de datos
    temp.forEach((t) => {
      Temperament.findOrCreate({
        where: {
          name: t.name,
        },
      });
    });
  })
  .catch((err) => console.error(err));

router.get("/temperament", async function (req, res) {
  await Temperament.findAll().then((result) => res.json(result));
});
///////////////////////////////////////////////////////////////////////////////

module.exports = router;
