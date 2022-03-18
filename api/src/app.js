const express = require("express");
const cors = require("cors"); //es un mecanismo basado en el encabezado HTTP que permite que un servidor indique cualquier origen (dominio, esquema o puerto) que no sea el suyo desde el cual un navegador debería permitir la carga de recursos
const routes = require("./routes/index");
const app = express();

app.use(
  //CORS va hacer que solo acepte estos metodos get put post y delete
  cors({
    origin: "*",
    method: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-type", "Aurorization"], //sino se agrega esto arroja error
  })
);
app.use(express.json());
app.use("/api", routes);

//Aqui vamos hacer un control centralizado de errores con un middelware
app.use((err, req, res, next) => {
  var error = {};
  error.msg = err.msg || err;
  error.status = err.status || 500;
  res.json.send(error);
});

module.exports = app;
