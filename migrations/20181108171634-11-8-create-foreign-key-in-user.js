'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

  return queryInterface.addColumn(
      'items',
      'storelistid',{
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {  // foreign key part
          model : 'Groceries',  // references posts table
          key : 'id'  // primary key in the posts table
        }
      }
    )

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn(
      'items',
      'storelistid'
    )

  }
};
