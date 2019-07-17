'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      */
      return queryInterface.bulkInsert('Contacts', [{
        phone: '788 45 78',
        email: 'geral@wifianywhere.com',
        fax: '532 31 45',
        zip_code: '12 3 54',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      */
      return queryInterface.bulkDelete('Contacts', null, {});
    
  }
};
