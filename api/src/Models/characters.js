const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("Character", {
    id: {
      type: DataTypes.UUID, // para que no se repitan las ID Y ADICONAL SE DEBE COLAR ID : EN POST PARA QUE NO SE ROMPA
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
