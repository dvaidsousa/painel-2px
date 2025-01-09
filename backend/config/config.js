require('dotenv').config();

module.exports = {
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '010203',
  database: process.env.DB_DATABASE || 'painel2px',
  host: process.env.DB_HOST || 'localhost',
  dialect: process.env.DB_DIALECT || 'postgres',
};