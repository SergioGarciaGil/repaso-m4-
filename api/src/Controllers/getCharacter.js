const { Character, Episode } = require("../Models/index");
const axios = require("axios");

const getCharacter = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!id) {
      return next({ msg: "No me mandaste el id", status: 500 });
    }
    if (typeof id === "string" && id.length > 10) {
      var character = await Character.findByPk(id, {
        include: Episode,
      });
      character = {
        id: character.id,
        name: character.name,
        image: character.image,
        episodes: character.Episodes.map((episode) => {
          return {
            id: episode.id,
            name: episode.name,
          };
        }),
      };
    } else {
      var characterResponse = await axios.get(
        "https://rickandmortyapi.com/api/character/" + id
      );
      characterResponse = characterResponse.data;
      let episodesList = characterResponse.episode.map((episode) => {
        return episode.split("/").pop();
      });
      episodesList = episodesList.join(",");
      console.log(episodesList);
      var episodes = await axios.get(
        "https://rickandmortyapi.com/api/episode/" + episodesList
      );

      episodes = episodes.data.map((episode) => {
        return {
          id: episode.id,
          name: episode.name,
        };
      });

      character = {
        id: characterResponse.id,
        name: characterResponse.name,
        image: characterResponse.image,
        episodes: episodes,
      };
    }

    return res.json(character);
  } catch (error) {
    next(error);
  }
};
module.exports = getCharacter;
