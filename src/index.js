const express = require("express");
const routes = require("./routes/index");
const app = express();

app.use(express.json());
app.use("/api", routes);

app.listen(3001, () => {
  console.log("Servidor Escuchando el puerto 3001");
});

//characters hasMany episodes
//episodes hasMany characters
