const app = require("./app");
const { conn, Episode } = require("./models/index");
const axios = require("axios");

conn
  .sync({
    force: true,
  }) //ahora vamos a precargar en BD los episodios por nombre y id
  .then(async () => {
    const apiEpisodesResponse = await axios.get(
      "https://rickandmortyapi.com/api/episode"
    );
    let apiEpisodes = apiEpisodesResponse.data.results;
    apiEpisodes = apiEpisodes.map((episode) => {
      return {
        name: episode.name,
      };
    });
    console.log(apiEpisodes);
    await Episode.bulkCreate(apiEpisodes);
    app.listen(3001, () => {
      console.log("Servidor Escuchando el puerto 3001");
    });
  });

//characters hasMany episodes
//episodes hasMany characters
