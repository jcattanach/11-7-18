'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

  return queryInterface.addColumn(
      'Groceries',
      'userID',{
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {  // foreign key part
          model : 'users',  // references posts table
          key : 'id'  // primary key in the posts table
        }
      }
    )

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn(
      'Groceries',
      'userID'
    )

  }
};
