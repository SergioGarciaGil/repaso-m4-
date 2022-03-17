const express = require("express");
const { Character, Episode } = require("../models/index"); // me traigo los modelos
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const axios = require("axios");

// router.get("/", (req, res, next) => {
//   Character.findAll({
//     include: Episode,
//   })
//     .then((characters) => {
//       res.json(characters);
//     })
//     .catch((error) => next(error));
// });
router.get("/", (req, res, next) => {
  var apiCharactersPromise = axios.get(
    "https://rickandmortyapi.com/api/character"
  );
  var dbCharactersPromise = Character.findAll({
    include: Episode,
  });
  return Promise.all([apiCharactersPromise, dbCharactersPromise])
    .then((resultados) => {
      var apiCharacter = resultados[0].data.results; //personajes de la api (position 0 osera primera posicion)
      var dbCharacters = resultados[1]; //mis personajes (posicion 1 osea segunda posicion para mis personajes)
      //aca los normalizo
      var apiCharacter = apiCharacter.map((character) => {
        return {
          id: character.id,
          name: character.name,
          image: character.image,
        };
      });
      //aca los uno
      var allCharacters = apiCharacter.concat(dbCharacters);
      res.send(allCharacters);
    })
    .catch((error) => next(error));
});

//por testa ruta traemos un pesonaje
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!id) {
      return next({ msg: "No me mandaste el id", status: 500 });
    }
    if (typeof id === "string" && id.length > 10) {
      var character = await Character.findByPk(id, {
        include: Episode,
      });
    } else {
      var character = await axios.get(
        "https://rickandmortyapi.com/api/character/" + id
      );
    }

    return res.json(character.data);
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res, next) => {
  const { name, image, episodes } = req.body;
  Character.create({
    id: uuidv4(), //tenemos que installa uuid4 y importarlo
    name,
    image,
  })
    // .then((createCharacter) => {
    //   res.json(createCharacter);
    // })
    .then((createCharacter) => {
      // agregamos character mas episodios
      return createCharacter.setEpisodes(episodes); //para argregar arreglo de episodios agregamos un s al final de set+nombre(s)
    })
    .then((characterWithEpisodes) => {
      res.json(characterWithEpisodes);
    })
    .catch((error) => next(error));
  // res.send("soy la ruta Post de Character");
});

router.post("/:characterId/episode/:episodeId", async (req, res, next) => {
  const { characterId, episodeId } = req.params;
  try {
    var personaje = await Character.findByPk(characterId);
    var episodio = await Episode.findByPk(episodeId);

    var resultado = await personaje.addEpisode(episodio);
    res.send(resultado);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
