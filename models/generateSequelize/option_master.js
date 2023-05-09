"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Option_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Option_master.belongsTo(models.Select_master, { foreignKey: "selectId" });
    }
  }
  Option_master.init(
    {
      selectId: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Option_master",
    }
  );
  return Option_master;
};
