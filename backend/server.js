require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const passwordRoutes = require('./routes/password');
const { sequelize } = require('./models');
const authenticateToken = require('./middleware/auth');

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/password', passwordRoutes);

async function initializeDatabase() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Banco de dados sincronizado!');
  } catch (error) {
    console.error('Erro ao sincronizar banco de dados:', error);
    process.exit(1);
  }
}

initializeDatabase().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
});

app.use((err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: 'Erro de validação', details: err.errors });
  }
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  console.error('Erro interno:', err);
  res.status(500).json({ error: 'Algo deu errado!', message: err.message });
});
