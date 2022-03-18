const { Character, Episode } = require("../Models/index");
const axios = require("axios");

const getAllCharacters = async (req, res, next) => {
  var apiCharactersPromise = axios.get(
    "https://rickandmortyapi.com/api/character"
  );
  var dbCharactersPromise = await Character.findAll({
    include: Episode,
  });
  return Promise.all([apiCharactersPromise, dbCharactersPromise])
    .then((resultados) => {
      var apiCharacter = resultados[0].data.results; //personajes de la api (position 0 osera primera posicion)
      var dbCharacters = resultados[1]; //mis personajes (posicion 1 osea segunda posicion para mis personajes)
      //aca los normalizo
      var apiCharacter = apiCharacter.map((character) => {
        return {
          id: character.id,
          name: character.name,
          image: character.image,
        };
      });
      //aca los uno
      var allCharacters = apiCharacter.concat(dbCharacters);
      res.send(allCharacters);
    })
    .catch((error) => next(error));
};

module.exports = getAllCharacters;
