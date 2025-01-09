'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Configuração do Sequelize usando variáveis de ambiente
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306, // Porta padrão para MySQL
    dialect: process.env.DB_DIALECT || 'mysql', // Alterar se necessário
    logging: false, // Define false para desativar logs SQL no console
    define: {
      timestamps: true, // Garante `createdAt` e `updatedAt` por padrão
    },
  }
);

const db = {};

// Função para carregar modelos dinamicamente
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Executar associações (se existirem)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Adicionar `sequelize` e `Sequelize` ao objeto `db`
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
