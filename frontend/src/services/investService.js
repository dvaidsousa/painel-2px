// URL base da API  
const API_URL = 'http://localhost:3000/api';

// Função para listar todos os investimentos
export const listarInvestimentos = async () => {
  // Obtém o token de autenticação do localStorage
  const token = localStorage.getItem('token');
  // Faz uma requisição GET para listar os investimentos
  const response = await fetch('http://localhost:3000/api/investimentos/listar', {
    headers: {
      'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
      'Authorization': `Bearer ${token}`, // Adiciona o token no cabeçalho
    },
  });
  
  // Verifica se a resposta não é OK
  if (!response.ok) {
    const errorBody = await response.text(); // Converte o corpo do erro para texto
    console.error('Corpo do erro:', errorBody); // Loga o corpo do erro no console
    throw new Error(`Erro ao carregar os dados: ${response.statusText}`); // Lança um erro se a resposta não for bem-sucedida
  }
  
  return await response.json(); // Retorna a resposta convertida para JSON
};

// ------------------------------------------------------------------------------------------------
// Função para editar uma linha de dados financeiros
export async function editarLinha(id, dados) {
  try {
    // Faz uma requisição PUT para editar a linha com o ID especificado
    const response = await fetch(`http://localhost:3000/api/investimentos/editar/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }, // Define o tipo de conteúdo como JSON
      body: JSON.stringify(dados), // Converte os dados para JSON e os envia no corpo da requisição
    });

    // Verifica se a resposta não é OK
    if (!response.ok) {
      const errorBody = await response.text(); // Converte o corpo do erro para texto
      console.error('Corpo do erro:', errorBody); // Loga o corpo do erro no console
      throw new Error(`Erro ao editar no banco de dados: ${response.statusText}`); // Lança um erro se a resposta não for bem-sucedida
    }

    // Converte a resposta para JSON
    const data = await response.json();

    // Verifica se há um erro nos dados retornados
    if (data.error) {
      throw new Error(data.error); // Lança um erro com a mensagem apropriada
    }

    return data; // Retorna os dados editados

  } catch (error) {
    console.error('Erro ao editar no banco de dados:', error); // Loga o erro no console
    throw error; // Lança o erro para ser tratado externamente
  }
}

// ------------------------------------------------------------------------------------------------
// Função para deletar uma linha de dados financeiros
export async function deletarLinha(id) {
  try {
    // Obtém o token de autenticação do localStorage
    const token = localStorage.getItem('token');
    // Faz uma requisição DELETE para excluir a linha com o ID especificado
    const response = await fetch(`http://localhost:3000/api/investimentos/deletar/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
        'Authorization': `Bearer ${token}`, // Adiciona o token no cabeçalho
      },
    });

    // Verifica se a resposta não é OK
    if (!response.ok) {
      const errorBody = await response.text(); // Converte o corpo do erro para texto
      console.error('Corpo do erro:', errorBody); // Loga o corpo do erro no console
      throw new Error(`Erro ao excluir no banco de dados: ${response.statusText}`); // Lança um erro se a resposta não for bem-sucedida
    }

    return await response.json(); // Retorna a resposta convertida para JSON
  } catch (error) {
    console.error('Erro ao excluir no banco de dados:', error); // Loga o erro no console
    throw error; // Lança o erro para ser tratado externamente
  }
}

// ------------------------------------------------------------------------------------------------
// Função para adicionar uma nova entrada de dados financeiros
export async function adicionarEntrada(dados) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/investimentos/adicionar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...dados,
        saldo: Number(dados.saldo.toFixed(2)),
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Corpo do erro:', errorBody);
      throw new Error(`Erro ao adicionar entrada: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro completo ao adicionar entrada:', error);
    throw error;
  }
}