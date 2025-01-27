const express = require('express');
const router = express.Router();
const { Dashboard } = require('../models'); // Importando o modelo Dashboard
const authenticateToken = require('../middleware/auth'); // Middleware de autenticação

// Rota GET para obter o dashboard do usuário autenticado
router.get('/', authenticateToken, async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({
      where: { userId: req.user.id },
    });

    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard não encontrado' });
    }

    res.status(200).json({ data: { iframeCode: dashboard.iframeCode } }); // Retornando apenas o código do iframe
  } catch (error) {
    console.error('Erro ao buscar o dashboard:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Rota POST para criar um novo dashboard
router.post('/', authenticateToken, async (req, res) => {
  const { iframeCode } = req.body; // Obtendo o código do iframe do corpo da requisição

  try {
    const novoDashboard = await Dashboard.create({
      iframeCode,
      userId: req.user.id, // Associando o dashboard ao usuário autenticado
    });
    res.status(201).json({ message: 'Dashboard criado com sucesso!', data: { iframeCode: novoDashboard.iframeCode } }); // Retornando o código do iframe criado
  } catch (error) {
    console.error('Erro ao criar o dashboard:', error);
    res.status(500).json({ message: 'Erro ao criar o dashboard' });
  }
});

// Rota para verificar se já existe um dashboard para o usuário
router.get('/existing', authenticateToken, async (req, res) => { // Alterado para não exigir userId na URL
  try {
    const existingDashboard = await Dashboard.findOne({
      where: { userId: req.user.id }, // Usando req.user.id diretamente
    });

    if (existingDashboard) {
      return res.status(200).json({ exists: true });
    }

    res.status(200).json({ exists: false });
  } catch (error) {
    console.error('Erro ao verificar se o dashboard existe:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Rota DELETE para excluir todos os dashboards do usuário
router.delete('/', authenticateToken, async (req, res) => {
  try {
    const deletedCount = await Dashboard.destroy({
      where: { userId: req.user.id },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Nenhum dashboard encontrado para excluir.' });
    }

    res.status(200).json({ message: 'Todos os dashboards excluídos com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir os dashboards:', error);
    res.status(500).json({ message: 'Erro ao excluir os dashboards' });
  }
});

module.exports = router;
