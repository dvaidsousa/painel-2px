'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Financas', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      valor: {
        type: Sequelize.DECIMAL(10, 2), // Definindo tipo DECIMAL com precisão
        allowNull: false,
      },
      tipo: {
        type: Sequelize.ENUM('entrada', 'saida'), // Tipo ENUM, com as opções 'entrada' e 'saida'
        allowNull: false,
      },
      dataEntrada: {
        type: Sequelize.DATEONLY, // Garantindo que a data seja sem horário
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING(255), // Aumentando o tamanho do campo descricao
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Define o valor padrão como a data atual
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Define o valor padrão como a data atual
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
      etiquetaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Etiquetas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Financas');
  },
};