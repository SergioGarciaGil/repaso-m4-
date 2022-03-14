const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("soy la ruta de Characters");
});
router.post("/", (req, res) => {
  res.send("soy la ruta Post de Character");
});
module.exports = router;
