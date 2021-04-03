const { Router } = require("express");
const { Dog, Temperament } = require("../db.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { YOUR_API_KEY } = process.env;

const fetch = require("node-fetch");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//------------------------------------------------------------
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
///////////////////////////////////////////////////////////////////////////////

router.get("/dogs", async function (req, res) {
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
            let temperament = dato.dataValues.temperaments;
            console.log("temperament", temperament[0].name);
            dato.dataValues.temperaments = temperament[0].name;
            json.push(dato.dataValues);
          }
        });

        if (json.length > 0) {
          let crBreed = [];

          for (let i = 0; i < json.length; i++) {
            console.log(json[i]);
            let breedReference = {
              id: json[i].id,
              name: json[i].name,
              img:
                json[i].image ||
                `https://cdn2.thedogapi.com/images/${json[i].reference_image_id}.jpg`,
              temperament: json[i].temperament || json[i].temperaments,
            };
            crBreed.push(breedReference);
          }
          res.json(crBreed);
        }
      });
  } else {
    fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${YOUR_API_KEY}`)
      .then((data) => data.json())
      .then(async (json) => {
        let DogCr = await Dog.findAll({
          include: Temperament,
        });

        DogCr.forEach((dato) => {
          let temperament = dato.dataValues.temperaments.map((temp) => {
            return temp.dataValues.name;
          });
          dato.dataValues.temperaments = temperament[0];
          json.push(dato.dataValues);
        });
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
///////////////////////////////////////////////////////////////////////////////

router.get("/dogs/:idBreed", async function (req, res) {
  var { idBreed } = req.params;
  fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${YOUR_API_KEY}`)
    .then((data) => data.json())
    .then(async (json) => {
      let breed = json.find((dato) => dato.id === parseInt(idBreed));
      if (breed) {
        return res.json({
          img: breed.image && breed.image.url,
          name: breed.name || "error",
          temperament: breed.temperament || breed.temperamentos || "error",
          weight: breed.weight.metric || "error",
          height: breed.height.metric || "error",
          lifespan: breed.life_span || "error",
        });
      } else {
        let createDog = await Dog.findAll({
          include: [
            {
              model: Temperament,
            },
          ],
        });
        let createDoggy = createDog.find(
          (dato) => dato.dataValues.id === parseInt(idBreed)
        );
        if (createDoggy) {
          return res.json({
            img: createDoggy.dataValues.image || "error al cargar la imagen!",
            name: createDoggy.dataValues.name || " error",
            temperament:
              createDoggy.dataValues.temperaments[0].name || " error",
            weight: createDoggy.dataValues.weight || " error",
            height: createDoggy.dataValues.height || "No Enerrcontrado",
            lifespan: createDoggy.dataValues.lifespan || " error",
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

///////////////////////////////////////////////////////////////////////////////

let temp = [];
fetch(`https://api.thedogapi.com/v1/breeds/?api_key=${YOUR_API_KEY}`)
  .then((response) => response.json())
  .then((json) => {
    json?.forEach((b) => {
      let temps = b.temperament?.split(", ");
      temps?.forEach((t) => {
        if (!temp.find((tp) => tp.name === t)) {
          temp.push({ name: t });
        }
      });
    });
  })
  .then(() => {
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
