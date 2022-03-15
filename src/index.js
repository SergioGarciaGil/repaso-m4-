const app = require("./app");
const { conn } = require("./models/index");

conn
  .sync({
    force: true,
  })
  .then(() => {
    app.listen(3001, () => {
      console.log("Servidor Escuchando el puerto 3001");
    });
  });

//characters hasMany episodes
//episodes hasMany characters
