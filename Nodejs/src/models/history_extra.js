"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History_Extra extends Model {
    /**
    
     */
    static associate(models) {
      // define association here
    
    }
  }
  History_Extra.init(
    {
        history_id: DataTypes.INTEGER,
       
        description_usage: DataTypes.STRING,
        unit: DataTypes.INTEGER,
        amount: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "History_Extra",
    }
  );
  return History_Extra;
};
