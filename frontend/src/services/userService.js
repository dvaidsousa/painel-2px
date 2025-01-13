import api from './api';

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || 'Erro ao registrar usuário.');
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error || 'Erro ao fazer login.');
  }
};

export const getUserData = async (token) => {
  try {
    const response = await api.get(`/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error) {
    throw new Error(error.response.data.error || 'Erro ao buscar dados do usuário.');
  }
};
