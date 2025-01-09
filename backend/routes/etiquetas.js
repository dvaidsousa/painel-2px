const express = require('express');
const router = express.Router();
const { Etiqueta } = require('../models');
const authenticateToken = require('../middleware/auth');

// Listar todas as etiquetas
router.get('/etiquetas', authenticateToken, async (req, res) => {
  try {
    const etiquetas = await Etiqueta.findAll({
      where: { userId: req.user.id }, // Filtrando por userId
    });
    
    res.json({
      message: 'Etiquetas carregadas com sucesso',
      data: etiquetas
    });
  } catch (err) {
    res.status(500).json({ 
      error: 'Erro ao listar etiquetas',
      detalhes: err.message 
    });
  }
});

// Criar uma nova etiqueta
router.post('/etiquetas', authenticateToken, async (req, res) => {
  const { name, color } = req.body; // Corrigido para extrair name e color do corpo da requisição

  try {
    const etiqueta = await Etiqueta.create({ 
      name, 
      color, 
      userId: req.user.id // Adicionando userId ao criar uma nova etiqueta
    });
    
    res.status(201).json({
      message: 'Etiqueta criada com sucesso',
      data: etiqueta
    });
  } catch (err) {
    const status = err.name === 'SequelizeUniqueConstraintError' ? 409 : 500;
    res.status(status).json({ 
      error: err.message,
      campo: status === 409 ? 'name' : null
    });
  }
});

// Deletar uma etiqueta
router.delete('/etiquetas/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCount = await Etiqueta.destroy({
      where: { id: Number(id) }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ 
        error: 'Etiqueta não encontrada' 
      });
    }

    res.status(200).json({ 
      message: 'Etiqueta excluída com sucesso' 
    });
  } catch (err) {
    res.status(500).json({ 
      error: err.message 
    });
  }
});

module.exports = router;