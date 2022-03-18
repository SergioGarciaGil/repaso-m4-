const { Character, Episode } = require("../Models/index");
const { v4: uuidv4 } = require("uuid");

const createCharacter = async (req, res, next) => {
  const { name, image, episodes } = req.body;
  Character.create({
    id: uuidv4(), //tenemos que installa uuid4 y importarlo
    name,
    image,
  })
    // .then((createCharacter) => {
    //   res.json(createCharacter);
    // })
    .then((character) => {
      // agregamos character mas episodios
      return character.setEpisodes(episodes); //para argregar arreglo de episodios agregamos un s al final de set+nombre(s)
    })
    .then((characterWithEpisodes) => {
      res.json(characterWithEpisodes);
    })
    .catch((error) => next(error));
};
const createCharacter2 = async (req, res, next) => {
  const { characterId, episodeId } = req.params;
  try {
    var personaje = await Character.findByPk(characterId);
    var episodio = await Episode.findByPk(episodeId);

    var resultado = await personaje.addEpisode(episodio);
    res.send(resultado);
  } catch (error) {
    next(error);
  }
};
module.exports = { createCharacter, createCharacter2 };
