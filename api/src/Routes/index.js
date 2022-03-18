const express = require("express");
const characterRoutes = require("./characters");
const episodesRoutes = require("./episodes");

const router = express.Router();

router.use("/characters", characterRoutes);
router.use("/episodes", episodesRoutes);

module.exports = router;
