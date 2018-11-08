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
    Grocery.hasMany(models.items, { as : 'items', foreignKey : 'storelistid'})
    Grocery.belongsTo(models.user,{ as : 'user', foreignKey : 'userID'})
  };
  return Grocery;
};
