const express = require('express');
const router = express.Router();
const { Investimentos } = require('../models'); // Importando o modelo Investimentos
const authenticateToken = require('../middleware/auth');

// Rota POST para adicionar um novo investimento
router.post('/adicionar', authenticateToken, async (req, res) => {
  const { tipo, name, dataEntrada, saldo } = req.body; // Alterado de 'valor' para 'saldo'
  
  try {
    // Cria uma nova entrada no banco de dados com o tipo
    const novoInvestimento = await Investimentos.create({
      tipo,
      name,
      dataEntrada,
      saldo,
      userId: req.user.id, // Associando a entrada ao usuário autenticado
    });
    res.status(201).json({ message: 'Investimento adicionado com sucesso!', data: novoInvestimento });
  } catch (err) {
    console.error('Erro ao salvar o investimento:', err); // Loga o erro real
    res.status(500).json({ message: 'Erro ao salvar o investimento', error: err.message });
  }
});

// Rota para listar todos os investimentos
router.get('/listar', authenticateToken, async (req, res) => {
  try {
    const investimentos = await Investimentos.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json(investimentos);
  } catch (error) {
    console.error('Erro ao buscar os investimentos:', error);
    res.status(500).json({ message: 'Erro ao buscar os investimentos.', error: error.message });
  }
});

// Rota PUT para editar um investimento existente
router.put('/editar/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { tipo, name, dataEntrada, saldo } = req.body;

  try {
    // Verificar se o investimento existe no banco de dados
    const investimento = await Investimentos.findByPk(id);
    if (!investimento) {
      return res.status(404).json({ message: 'Investimento não encontrado' });
    }

    // Verificar se o investimento pertence ao usuário autenticado
    if (investimento.userId !== req.user.id) {
      return res.status(403).json({ message: 'Você não tem permissão para editar este investimento' });
    }

    // Atualizar o investimento com os novos dados
    await investimento.update({ tipo, name, dataEntrada, saldo }); // Alterado de 'valor' para 'saldo'

    // Retornar o investimento atualizado
    res.status(200).json({
      message: 'Investimento atualizado com sucesso',
      data: investimento, // Retorna o investimento atualizado
    });
  } catch (error) {
    console.error('Erro ao atualizar o investimento:', error);
    res.status(500).json({ message: 'Erro ao atualizar o investimento', error: error.message });
  }
});

// Rota DELETE para excluir um investimento
router.delete('/deletar/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar se o investimento existe no banco de dados
    const investimento = await Investimentos.findByPk(id);
    if (!investimento) {
      return res.status(404).json({ message: 'Investimento não encontrado' });
    }

    // Verificar se o investimento pertence ao usuário autenticado
    if (investimento.userId !== req.user.id) {
      return res.status(403).json({ message: 'Você não tem permissão para excluir este investimento' });
    }

    // Excluir o investimento
    await investimento.destroy();
    res.json({ message: 'Investimento excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir o investimento:', error);
    res.status(500).json({ message: 'Erro ao excluir o investimento', error: error.message });
  }
});

module.exports = router;
