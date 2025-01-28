import axios from 'axios';

// URL base da API  
const API_URL = process.env.VUE_APP_API_URL; // Utiliza a variável de ambiente para a URL da API

// Função para obter o dashboard do usuário autenticado
export const getDashboard = async () => {
  try {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    const response = await axios.get(`${API_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.data || !response.data.data) {
      throw new Error('Dashboard não encontrado'); // Lança um erro se o dashboard não existir
    }

    return response.data.data.iframeCode; // Retorna apenas o código do iframe
  } catch (error) {
    console.error('Erro ao buscar o dashboard:', error.message); // Exibe apenas a mensagem de erro
    throw new Error('Erro ao buscar o dashboard. Verifique se o servidor está ativo e a URL está correta.'); // Lança um erro mais amigável
  }
};

// Função para criar um novo dashboard
export const createDashboard = async (iframeCode) => {
  try {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    const response = await axios.post(`${API_URL}/dashboard`, { iframeCode }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.iframeCode; // Retorna apenas o código do iframe criado
  } catch (error) {
    console.error('Erro ao criar o dashboard:', error.message); // Exibe apenas a mensagem de erro
    throw new Error('Erro ao criar o dashboard. Verifique se o servidor está ativo e a URL está correta.'); // Lança um erro mais amigável
  }
};

// Função para verificar se já existe um dashboard para o usuário
export const checkExistingDashboard = async () => {
  try {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    const response = await axios.get(`${API_URL}/dashboard/existing`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.exists; // Retorna true se existir, false caso contrário
  } catch (error) {
    console.error('Erro ao verificar se o dashboard existe:', error.message); // Exibe apenas a mensagem de erro
    throw new Error('Erro ao verificar se o dashboard existe. Verifique se o servidor está ativo e a URL está correta.'); // Lança um erro mais amigável
  }
};

// Função para deletar todos os dashboards do usuário
export const deleteAllDashboards = async () => {
  try {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    const response = await axios.delete(`${API_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('Erro ao excluir todos os dashboards: ' + response.statusText);
    }
    return response.data; // Retorna a resposta da exclusão dos dashboards
  } catch (error) {
    console.error('Erro ao excluir todos os dashboards:', error.message); // Exibe apenas a mensagem de erro
    throw new Error('Erro ao excluir todos os dashboards. Verifique se o servidor está ativo e a URL está correta.'); // Lança um erro mais amigável
  }
};
