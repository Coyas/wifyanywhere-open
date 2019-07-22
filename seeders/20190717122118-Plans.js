'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      */
      return queryInterface.bulkInsert('Plans', [{
        nome: 'PLAFONDE BASE',
        qtd_megas: 3000,
        preco: 850,
        txdownload: 2,
        txupload: 1,
        descricao: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        nome: 'PLAFONDE BRONZE',
        qtd_megas: 6000,
        preco: 1650,
        txdownload: 7,
        txupload: 3,
        descricao: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        nome: 'PLAFONDE OURO',
        qtd_megas: 10000,
        preco: 2500,
        txdownload: 7,
        txupload: 3,
        descricao: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      */
      return queryInterface.bulkDelete('Plans', null, {});
    
  }
};
