const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { sendPasswordResetEmail } = require('../config/mailer');
const { User } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

// Rota para solicitar redefinição de senha
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: 'E-mail é obrigatório.' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpire = Date.now() + 3600000; // 1 hora
    user.resetToken = resetToken;
    user.resetTokenExpire = resetTokenExpire;
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendPasswordResetEmail(email, resetLink);

    res.status(200).json({ message: 'E-mail de redefinição de senha enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao processar solicitação de redefinição de senha:', error);
    res.status(500).json({ message: 'Erro ao processar a solicitação.' });
  }
});

// Rota para exibir a página de redefinição de senha
router.get('/reset-password/:token', (req, res) => {
  const { token } = req.params;

  // Redirecionar para o frontend com o token
  const resetPasswordPage = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  res.redirect(resetPasswordPage);
});

// Rota para redefinir a senha
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        message: 'A nova senha deve ter pelo menos 6 caracteres.',
      });
    }

    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpire: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Token inválido ou expirado.' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpire = null;
    await user.save();

    res.status(200).json({ message: 'Senha redefinida com sucesso!' });
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    res.status(500).json({ message: 'Erro ao redefinir a senha.' });
  }
});

module.exports = router;
