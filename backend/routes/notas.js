const express = require('express');
const router = express.Router();
const { Notas } = require('../models');
const authenticateToken = require('../middleware/auth');

// Função auxiliar para tratar erros
const handleError = (res, error, statusCode = 500) => {
    return res.status(statusCode).json({ error: error.message });
};

// Rota para criar uma nova nota
router.post('/criar', authenticateToken, async (req, res) => {
    const { name, descricao } = req.body;

    try {
        const novaNota = await Notas.create({
            name: name || null,
            descricao: descricao || null,
            userId: req.user.id,
        });
        return res.status(201).json({ message: 'Nota criada com sucesso!', data: novaNota });
    } catch (error) {
        return handleError(res, new Error('Erro ao criar nota: ' + error.message), 400);
    }
});

// Rota para obter todas as notas
router.get('/', authenticateToken, async (req, res) => {
    try {
        const notas = await Notas.findAll({ where: { userId: req.user.id } });
        return res.status(200).json(notas);
    } catch (error) {
        return handleError(res, error);
    }
});

// Rota para obter uma nota específica
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const nota = await Notas.findByPk(req.params.id);
        if (!nota) {
            return res.status(404).json({ error: 'Nota não encontrada' });
        }
        return res.status(200).json(nota);
    } catch (error) {
        return handleError(res, error);
    }
});

// Rota para editar uma nota
router.put('/:id', authenticateToken, async (req, res) => {
    const { name, descricao } = req.body;

    try {
        const [updated] = await Notas.update({
            name: name || null,
            descricao: descricao || null,
        }, {
            where: { id: req.params.id, userId: req.user.id }
        });

        if (!updated) {
            return res.status(404).json({ error: 'Nota não encontrada' });
        }

        const updatedNota = await Notas.findByPk(req.params.id);
        return res.status(200).json(updatedNota);
    } catch (error) {
        return handleError(res, new Error('Erro ao editar nota: ' + error.message), 400);
    }
});

// Rota para deletar uma nota
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const deleted = await Notas.destroy({
            where: { id: req.params.id, userId: req.user.id }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Nota não encontrada' });
        }

        return res.status(204).send();
    } catch (error) {
        return handleError(res, error);
    }
});

module.exports = router;
