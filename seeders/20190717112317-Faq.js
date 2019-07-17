'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
      return queryInterface.bulkInsert('Faqs', [{
        title: 'John Doe',
        descricao: 'dfdsfsdfsdfsfdssdfdsf',
        lingua: 'pt',
        utilidade: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1
      },{
        title: 'John Dodsqdqse',
        descricao: 'dfqsdqsdsdqsddsfsdfsdfsfdssdfdsf',
        lingua: 'pt',
        utilidade: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1
      },{
        title: 'John Doe qfffq',
        descricao: 'dfd dsfdfdsf sfsdfsdfsfdssdfdsf',
        lingua: 'en',
        utilidade: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 2
      }], {});
 
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
      return queryInterface.bulkDelete('Faqs', null, {});
    
  }
};
