const express = require("express");
const { getEpisodes, postEpisodes } = require("../Controllers/episodes");
const router = express.Router();

//la ruta de episode la hacemos con async
router.get("/", getEpisodes);
router.post("/", postEpisodes);

module.exports = router;
