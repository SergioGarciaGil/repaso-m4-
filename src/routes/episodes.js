const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("soy la ruta de episodes");
});
router.post("/", (req, res) => {
  res.send("soy la ruta Post de Episodios");
});
module.exports = router;
