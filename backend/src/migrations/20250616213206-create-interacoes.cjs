'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('interacoes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(36)
      },
      cliente_id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'id'  
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tipo: {
        type: Sequelize.ENUM('reuniao', 'ligacao', 'e-mail', 'outro'),
        allowNull: false
      },
      data: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      observacoes: {
        type: Sequelize.TEXT('medium'),
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('interacoes');
  }
};
