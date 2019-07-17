'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      */
      return queryInterface.bulkInsert('Categories', [{
        photo: 'ddqsqsdqdqsd.png',
        nomept: 'GERAL',
        nomeen: 'GENERAL',
        nomefr: 'GENERAL',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        photo: 'ddqsqs.png',
        nomept: 'Geraldff',
        nomeen: 'Generalsfs',
        nomefr: 'Generalsdfs',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      */
      return queryInterface.bulkDelete('Categories', null, {});
    
  }
};
