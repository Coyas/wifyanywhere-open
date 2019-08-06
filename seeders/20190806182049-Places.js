'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkInsert('Places', [{
        nome: 'Aeroporto Nelson Mandela',
        latitude: '12',
        longitude: '54',
        contato: '456555',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        nome: 'Aeroporto Cesaria Evora',
        latitude: '12',
        longitude: '54',
        contato: '456555',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkDelete('Places', null, {});
    
  }
};
