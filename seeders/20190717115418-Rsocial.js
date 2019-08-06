'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

    */
      return queryInterface.bulkInsert('Rsocials', [{
        nome: 'facebook',
        icon: 'fab fa-facebook-f',
        link: 'https://dqsqsdqdqdqdd.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        nome: 'instagram',
        icon: 'fab fa-instagram',
        link: 'https://dqsqsdqdqdqdd.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        nome: 'twitter',
        icon: 'fab fa-twitter',
        link: 'https://dqsqsdqdqdqdd.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
      return queryInterface.bulkDelete('Rsocials', null, {});
    
  }
};
