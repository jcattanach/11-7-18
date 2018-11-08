'use strict';
module.exports = (sequelize, DataTypes) => {
  const items = sequelize.define('items', {
    item: DataTypes.STRING
  }, {});
  items.associate = function(models) {
    // associations can be defined here
    items.belongsTo(models.Grocery,{ as : 'grocery', foreignKey : 'storelistid'})
  };
  return items;
};
