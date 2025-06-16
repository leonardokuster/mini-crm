'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clientes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(36)
      },
      nome: {
        type: Sequelize.STRING(245),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(245),
        allowNull: false
      },
      telefone: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      empresa: {
        type: Sequelize.STRING(245),
        allowNull: false
      },
      cargo: {
        type: Sequelize.STRING(245),
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('clientes');
  }
};