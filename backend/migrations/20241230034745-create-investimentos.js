'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Investimentos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tipo: {
        type: Sequelize.ENUM('renda fixa', 'renda variável', 'fundos', 'criptos', 'outros'),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      dataEntrada: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      saldo: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
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
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Investimentos');
  }
};
