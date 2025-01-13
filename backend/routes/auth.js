const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Certifique-se de que o modelo User está exportado corretamente
const rateLimit = require('express-rate-limit');
const multer = require('multer'); // Importando multer para upload de arquivos

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

// Configuração do multer para upload de imagens
const storage = multer.memoryStorage(); // Armazena o arquivo como buffer na memória
const upload = multer({ storage });

// Função para validar entrada de dados
const validateInput = (fields) => {
  return fields.every((field) => field && field.trim() !== '');
};

// Rota para atualizar a imagem de perfil do usuário
router.put('/user/:id/upload', upload.single('perfilImagem'), async (req, res) => {
  const perfilImagem = req.file ? req.file.buffer : null; // Obtendo o buffer da imagem (pode ser nulo)

  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    if (!perfilImagem) {
      return res.status(400).json({ error: 'Nenhuma imagem foi enviada.' });
    }

    user.perfilImagem = perfilImagem; // Atualiza a imagem de perfil
    await user.save(); // Salva as alterações no banco de dados

    res.json({
      message: 'Imagem de perfil atualizada com sucesso!',
      perfilImagem: user.perfilImagem,
    });
  } catch (error) {
    console.error('Erro ao atualizar imagem de perfil:', error);
    res.status(500).json({ error: 'Erro ao atualizar imagem de perfil.' });
  }
});

// Registro de usuário
router.post('/register', upload.single('perfilImagem'), async (req, res) => {
  const { responsavel, nomeEmpresa, email, telefone, password } = req.body;
  const perfilImagem = req.file ? req.file.buffer : null; // Obtendo o buffer da imagem (pode ser nulo)

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
      password: hashedPassword,
      perfilImagem, // Permite que seja nulo
    });

    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      user: { id: newUser.id, responsavel: newUser.responsavel, nomeEmpresa: newUser.nomeEmpresa, email: newUser.email, perfilImagem: newUser.perfilImagem ? newUser.perfilImagem.toString('base64') : null },
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário.' });
  }
});

// Rota para obter dados do usuário, incluindo a imagem de perfil
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    res.json({
      id: user.id,
      responsavel: user.responsavel,
      nomeEmpresa: user.nomeEmpresa,
      email: user.email,
      telefone: user.telefone,
      perfilImagem: user.perfilImagem ? user.perfilImagem.toString('base64') : null,
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
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
      user: { id: user.id, responsavel: user.responsavel, nomeEmpresa: user.nomeEmpresa, email: user.email, perfilImagem: user.perfilImagem ? user.perfilImagem.toString('base64') : null },
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});

module.exports = router;
