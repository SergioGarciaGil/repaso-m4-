const express = require("express");
const { Episode } = require("../models/index"); //me traigo episodios de model
const router = express.Router();

//la ruta de episode la hacemos con async
router.get("/", async (req, res, next) => {
  try {
    Episode.findAll().then((episode) => {
      res.json(episode);
    });
  } catch (error) {
    next(error);
  }
  // res.send("soy la ruta de episodes");
});
router.post("/", async (req, res, next) => {
  const { name } = req.body;
  try {
    const createdEpisode = await Episode.create({
      name,
    });
    res.json(createdEpisode);
  } catch (error) {
    next(error);
  }
  // res.send("soy la ruta Post de Episodios");
});
module.exports = router;
