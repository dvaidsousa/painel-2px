// URL base da API  
const API_URL = 'http://localhost:3000/api';

// Função para listar todas as finanças
export const listarFinancas = async () => {
  // Obtém o token de autenticação do localStorage
  const token = localStorage.getItem('token');
  // Faz uma requisição GET para listar as finanças
  const response = await fetch('http://localhost:3000/api/financas/listar', {
    headers: {
      'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
      'Authorization': `Bearer ${token}`, // Adiciona o token no cabeçalho
    },
  });
  
  // Verifica se a resposta não é OK
  if (!response.ok) throw new Error('Erro ao carregar os dados.'); // Lança um erro se a resposta não for bem-sucedida
  
  return await response.json(); // Retorna a resposta convertida para JSON
};

// ------------------------------------------------------------------------------------------------
// Função para editar uma linha de dados financeiros
export async function editarLinha(id, dados) {
  try {
    // Faz uma requisição PUT para editar a linha com o ID especificado
    const response = await fetch(`http://localhost:3000/api/financas/editar/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }, // Define o tipo de conteúdo como JSON
      body: JSON.stringify(dados), // Converte os dados para JSON e os envia no corpo da requisição
    });

    // Verifica se a resposta não é OK
    if (!response.ok) {
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
    const response = await fetch(`http://localhost:3000/api/financas/deletar/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
        'Authorization': `Bearer ${token}`, // Adiciona o token no cabeçalho
      },
    });

    // Verifica se a resposta não é OK
    if (!response.ok) {
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
    // Obtém o token de autenticação do localStorage
    const token = localStorage.getItem('token');
    // Faz uma requisição POST para adicionar uma nova entrada
    const response = await fetch('http://localhost:3000/api/financas/adicionar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
        'Authorization': `Bearer ${token}`, // Adiciona o token no cabeçalho
      },
      body: JSON.stringify({
        ...dados, // Espalha os dados recebidos
        valor: Number(dados.valor.toFixed(2)), // Formata o valor para duas casas decimais
      }),
    });

    console.log('Resposta bruta:', response); // Loga a resposta bruta no console

    // Verifica se a resposta não é OK
    if (!response.ok) {
      const errorBody = await response.text(); // Converte o corpo do erro para texto
      console.error('Corpo do erro:', errorBody); // Loga o corpo do erro no console
      throw new Error(`Erro ao adicionar entrada: ${response.statusText}`); // Lança um erro com a mensagem apropriada
    }

    // Converte a resposta para JSON
    const data = await response.json();

    // Verifica se há um erro nos dados retornados
    if (data.error) {
      throw new Error(data.error); // Lança um erro com a mensagem apropriada
    }

    return data; // Retorna os dados da entrada adicionada

  } catch (error) {
    console.error('Erro completo ao adicionar entrada:', error); // Loga o erro completo no console
    throw error; // Lança o erro para ser tratado externamente
  }
}