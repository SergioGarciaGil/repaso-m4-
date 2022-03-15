const { Sequelize } = require("sequelize");
// const { dbUser, dbPassword, dbHost, dbName } = require("./../../utils/config");
const characterFactory = require("./characters");
const episodesFactory = require("./episodes");

const sequelize = new Sequelize(
  "postgres://postgres:admin@localhost:5432/repasoft15a",
  {
    logging: false,
  }
);

const Character = characterFactory(sequelize);
const Episode = episodesFactory(sequelize);

Character.belongsToMany(Episode, { through: "Character_Episode" });
Episode.belongsToMany(Character, { through: "Character_Episode" });

module.exports = {
  conn: sequelize,
  Character,
  Episode,
};
