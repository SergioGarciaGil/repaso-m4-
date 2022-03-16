const express = require("express");
const { Character, Episode } = require("../models/index"); // me traigo los modelos
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res, next) => {
  Character.findAll({
    include: Episode,
  })
    .then((characters) => {
      res.json(characters);
    })
    .catch((error) => next(error));
});
router.get("/all", (req, res, next) => {
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
      var allCharacters = apiCharacter.concat(dbCharacters);
      res.send(allCharacters);
    })
    .catch((error) => next(error));
});
router.post("/", (req, res, next) => {
  const { name, image } = req.body;
  Character.create({
    id: uuidv4(), //tenemos que installa uuid4 y importarlo
    name,
    image,
  })
    .then((createCharacter) => {
      res.json(createCharacter);
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
