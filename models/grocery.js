'use strict';
module.exports = (sequelize, DataTypes) => {
  const Grocery = sequelize.define('Grocery', {
    name: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING
  }, {});
  Grocery.associate = function(models) {
    // associations can be defined here
  };
  return Grocery;
};