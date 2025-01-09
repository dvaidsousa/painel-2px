import api from './api';

// Função para solicitar redefinição de senha
export const solicitarRedefinicaoSenha = async (email) => {
  try {
    const response = await api.post('/password/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Erro ao solicitar redefinição de senha.');
  }
};

// Função para redefinir a senha
export const redefinirSenha = async (token, novaSenha) => {
  try {
    const response = await api.post(`/password/reset-password/${token}`, { newPassword: novaSenha });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Erro ao redefinir a senha.');
  }
};
