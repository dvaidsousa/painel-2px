'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Criação da tabela 'Users'
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      responsavel: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      nomeEmpresa: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      telefone: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      lastLoginAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      resetToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      resetTokenExpire: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Adicionar índice único ao campo 'email'
    await queryInterface.addIndex('Users', ['email'], {
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remover índice único do campo 'email'
    await queryInterface.removeIndex('Users', ['email']);

    // Remover a tabela 'Users'
    await queryInterface.dropTable('Users');
  },
};
