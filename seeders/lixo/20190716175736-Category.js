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
        nomept: 'USO',
        nomeen: 'USAGE',
        nomefr: 'USAGE',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        photo: 'ddqsqs.png',
        nomept: 'PAGAMENTO E RESERVA',
        nomeen: 'BOOKING AND PAYMANET',
        nomefr: 'USAGE',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        photo: 'ddqsqs.png',
        nomept: 'PICKUP OU ENVIO',
        nomeen: 'PICKUP OR SHIPPING',
        nomefr: 'USAGE',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        photo: 'ddqsqs.png',
        nomept: 'DEVOLUCAO',
        nomeen: 'RETURN',
        nomefr: 'USAGE',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        photo: 'ddqsqs.png',
        nomept: 'MODIFICACAO E CANCELAMENTO',
        nomeen: 'MODIFICATION AND CANCELLATION',
        nomefr: 'USAGE',
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
