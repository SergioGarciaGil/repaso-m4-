const express = require("express");
const { Character, Episode } = require("../models/index"); // me traigo los modelos
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  Character.findAll({
    include: Episode,
  }).then((characters) => {
    res.json(characters);
  });
});
router.get("/all", (req, res) => {
  var apiCharactersPromise = axios.get(
    "https://rickandmortyapi.com/api/character"
  );
  var dbCharactersPromise = Character.findAll({
    include: Episode,
  });
  return Promise.all([apiCharactersPromise, dbCharactersPromise]).then(
    (resultados) => {
      var apiCharacter = resultados[0].data.results; //personajes de la api (position 0 osera primera posicion)
      var dbCharacters = resultados[1]; //mis personajes (posicion 1 osea segunda posicion para mis personajes)
      var allCharacters = apiCharacter.concat(dbCharacters);
      res.send(allCharacters);
    }
  );
});
router.post("/", (req, res) => {
  const { name, image } = req.body;
  Character.create({
    id: uuidv4(), //tenemos que installa uuid4 y importarlo
    name,
    image,
  })
    .then((createCharacter) => {
      res.json(createCharacter);
    })
    .catch((err) => res.sendStatus(404));
  // res.send("soy la ruta Post de Character");
});
module.exports = router;
