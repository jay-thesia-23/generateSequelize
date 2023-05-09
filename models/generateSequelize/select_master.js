"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Select_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Select_master.hasMany(
        models.Option_master,
        { foreignKey: "selectId" },
        { onDelete: "CASCADE" }
      );
    }
  }
  Select_master.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Select_master",
    }
  );
  return Select_master;
};
