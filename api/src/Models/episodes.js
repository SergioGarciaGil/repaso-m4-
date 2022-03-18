const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("Episode", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
//para borrar en la consola 'drop database (tabla a borrR);
