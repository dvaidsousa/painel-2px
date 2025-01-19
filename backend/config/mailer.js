const nodemailer = require('nodemailer');

// Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
  host: 'smtp.titan.email',
  port: 465,
  secure: true,
  auth: {
    user: 'suporte@2pxdigital.com',
    pass: '2pxdigital@2p13',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verificar o transporte de e-mail
transporter.verify((error, success) => {
  if (error) {
    console.error('Erro ao configurar o transporte de e-mail:', error);
  } else {
    console.log('Transporte de e-mail configurado com sucesso:', success);
  }
});

// Função genérica para envio de e-mail
const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: '"2px Digital" <suporte@2pxdigital.com>',
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso para:', to);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw new Error('Erro ao enviar e-mail.');
  }
};

// Função específica para envio de e-mail de redefinição de senha
const sendPasswordResetEmail = async (email, resetLink) => {
  const subject = 'Recuperação de Senha';
  const html = `
    <p>Olá, esse é um email automático, da 2px Digital.</p>
    <p>Recebemos um pedido para redefinir sua senha. Para continuar, clique no link abaixo:</p>
    <p><a href="${resetLink}">Clique aqui</a></p>
    <p>Se você não solicitou essa redefinição, pode ignorar este e-mail.</p>
    <p>Atenciosamente,<br>Equipe Painel2px</p>
  `;
  await sendEmail(email, subject, html);
};

module.exports = { transporter, sendPasswordResetEmail };
