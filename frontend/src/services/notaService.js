import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL + '/notas';

// Função para criar uma nova nota
export const criarNota = async (notaData) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token não encontrado. Usuário não autenticado.');
    }

    // Verificação de campos obrigatórios
    if (!notaData.name) {
        throw new Error('O campo "name" é obrigatório.');
    }

    try {
        const response = await axios.post(`${API_URL}/criar`, notaData, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Erro ao criar nota';
        console.error('Erro ao criar nota:', errorMessage);
        throw new Error(errorMessage);
    }
};

// Função para listar todas as notas
export const listarNotas = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token não encontrado. Usuário não autenticado.');
    }
    try {
        const response = await axios.get(`${API_URL}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Erro ao listar notas';
        console.error('Erro ao listar notas:', errorMessage);
        throw new Error(errorMessage);
    }
};

// Função para obter uma nota específica por ID
export const obterNotaPorId = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token não encontrado. Usuário não autenticado.');
    }
    try {
        const response = await axios.get(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Erro ao obter nota';
        console.error('Erro ao obter nota:', errorMessage);
        throw new Error(errorMessage);
    }
};

// Função para editar uma nota existente
export const editarNota = async (id, notaData) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token não encontrado. Usuário não autenticado.');
    }

    // Verificação de campos obrigatórios
    if (!notaData.name) {
        throw new Error('O campo "name" é obrigatório.');
    }

    try {
        const response = await axios.put(`${API_URL}/${id}`, notaData, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Erro ao editar nota';
        console.error('Erro ao editar nota:', errorMessage);
        throw new Error(errorMessage);
    }
};

// Função para deletar uma nota
export const deletarNota = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token não encontrado. Usuário não autenticado.');
    }
    try {
        await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Erro ao deletar nota';
        console.error('Erro ao deletar nota:', errorMessage);
        throw new Error(errorMessage);
    }
};
