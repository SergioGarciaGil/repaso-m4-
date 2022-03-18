const { Episode } = require("../Models/index");

const getEpisodes = async (req, res, next) => {
  try {
    Episode.findAll().then((episode) => {
      res.json(episode);
    });
  } catch (error) {
    next(error);
  }
};

const postEpisodes = async (req, res, next) => {
  const { name } = req.body;
  try {
    const createdEpisode = await Episode.create({
      name,
    });
    res.json(createdEpisode);
  } catch (error) {
    next(error);
  }
};
module.exports = { getEpisodes, postEpisodes };
