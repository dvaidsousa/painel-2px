// URL base da API
const API_URL = 'http://localhost:3000/api';

// ------------------------------------------------------------------------------------------------
// Função para listar etiquetas
export async function listarEtiquetas() {
  try {
    // Obtém o token de autenticação do localStorage
    const token = localStorage.getItem('token');
    // Faz uma requisição GET para listar etiquetas
    const response = await fetch(`${API_URL}/etiquetas`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Adiciona o token no cabeçalho
      },
    });
    
    // Verifica se a resposta não é OK
    if (!response.ok) {
      throw new Error('Erro ao carregar etiquetas'); // Lança um erro se a resposta não for bem-sucedida
    }

    // Converte a resposta para JSON
    const resultado = await response.json();
    return resultado.data; // Retorna os dados das etiquetas
  } catch (error) {
    console.error('Erro no serviço de etiquetas:', error); // Loga o erro no console
    throw error; // Lança o erro para ser tratado externamente
  }
}

// ------------------------------------------------------------------------------------------------
// Função para criar uma nova etiqueta
export async function criarEtiqueta(etiqueta) {
  try {
    // Verifica se os campos obrigatórios estão presentes
    if (!etiqueta.name || !etiqueta.color) {
      throw new Error('Os campos name e color são obrigatórios');
    }

    // Obtém o token de autenticação do localStorage
    const token = localStorage.getItem('token');
    // Adiciona o userId ao objeto etiqueta
    const userId = JSON.parse(atob(token.split('.')[1])).id;
    etiqueta.userId = userId;

    // Faz uma requisição POST para criar uma nova etiqueta
    const response = await fetch(`${API_URL}/etiquetas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Adiciona o token no cabeçalho
      },
      body: JSON.stringify(etiqueta) // Adiciona o corpo da requisição
    });

    // Verifica se a resposta não é OK
    if (!response.ok) {
      const errorData = await response.json(); // Converte a resposta de erro para JSON
      throw new Error(errorData.error || 'Erro ao criar etiqueta'); // Lança um erro com a mensagem apropriada
    }

    // Converte a resposta para JSON
    const resultado = await response.json();
    return resultado.data; // Retorna os dados da etiqueta criada
  } catch (error) {
    console.error('Erro no serviço de etiquetas:', error); // Loga o erro no console
    throw error; // Lança o erro para ser tratado externamente
  }
}

// ------------------------------------------------------------------------------------------------
// Função para excluir uma etiqueta
export async function excluirEtiqueta(id) {
  try {
    // Obtém o token de autenticação do localStorage
    const token = localStorage.getItem('token');
    // Faz uma requisição DELETE para excluir uma etiqueta
    const response = await fetch(`${API_URL}/etiquetas/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Adiciona o token no cabeçalho
      },
    });

    // Verifica se a resposta não é OK
    if (!response.ok) {
      const errorData = await response.json(); // Converte a resposta de erro para JSON
      throw new Error(errorData.error || 'Erro ao excluir etiqueta'); // Lança um erro com a mensagem apropriada
    }

    return true; // Retorna true se a exclusão for bem-sucedida
  } catch (error) {
    console.error('Erro no serviço de etiquetas:', error); // Loga o erro no console
    throw error; // Lança o erro para ser tratado externamente
  }
}