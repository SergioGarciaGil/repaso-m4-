const express = require("express");
const { Character, Episode } = require("../Models/index"); // me traigo los modelos

const router = express.Router();
const getAllCharacter = require("../Controllers/getAllCharacter");
const getCharacter = require("../Controllers/getCharacter");
const { createCharacter } = require("../Controllers/createCharacter");
const { createCharacter2 } = require("../Controllers/createCharacter");
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

//por testa ruta traemos un pesonaje
router.get("/", getAllCharacter);
router.post("/", createCharacter);
router.get("/:id", getCharacter);
router.post("/:characterId/episode/:episodeId", createCharacter2);

module.exports = router;
