const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Certifique-se de que o modelo User está exportado corretamente
const rateLimit = require('express-rate-limit');

const router = express.Router();
const secret = process.env.JWT_SECRET;
const tokenExpiry = process.env.JWT_EXPIRY || '1h'; // Tempo de expiração configurável

if (!secret) {
  throw new Error('JWT_SECRET não está definido nas variáveis de ambiente.');
}

// Configuração do rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  message: 'Muitas requisições vindas deste IP, tente novamente mais tarde.',
});

// Aplicar o rate limiter às rotas de autenticação
router.use(limiter);

// Função para validar entrada de dados
const validateInput = (fields) => {
  return fields.every((field) => field && field.trim() !== '');
};

// Registro de usuário
router.post('/register', async (req, res) => {
  const { responsavel, nomeEmpresa, email, telefone, password } = req.body;

  if (!validateInput([responsavel, nomeEmpresa, email, telefone, password])) {
    return res.status(400).json({ error: 'Preencha todos os campos!' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12); // Hashear a senha
    const newUser = await User.create({
      responsavel,
      nomeEmpresa,
      email,
      telefone,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      user: { id: newUser.id, responsavel: newUser.responsavel, nomeEmpresa: newUser.nomeEmpresa, email: newUser.email },
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!validateInput([email, password])) {
    return res.status(400).json({ error: 'Preencha todos os campos!' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciais inválidas!' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, iat: Math.floor(Date.now() / 1000) },
      secret,
      { expiresIn: tokenExpiry }
    );

    res.json({
      token,
      user: { id: user.id, responsavel: user.responsavel, nomeEmpresa: user.nomeEmpresa, email: user.email },
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido.' });

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Inclui o ID do usuário no objeto de requisição
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};

// Nova rota para buscar dados do usuário autenticado
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.json({
      user: { id: user.id, responsavel: user.responsavel, nomeEmpresa: user.nomeEmpresa, email: user.email, telefone: user.telefone },
    });
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar dados do usuário.' });
  }
});

module.exports = router;
