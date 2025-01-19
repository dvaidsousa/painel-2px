'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Facebook', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      investimento: {
        type: Sequelize.DECIMAL(10, 2), // Alterado para INTEGER
        allowNull: false,
      },
      leads: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      custoPorLead: {
        type: Sequelize.DECIMAL(10, 2), // Alterado para INTEGER
        allowNull: false,
      },
      impressao: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      contas: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Facebook');
  },
};