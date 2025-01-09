<template>
    <div class="form-container">
      <div class="form-row">
        <input
          class="input-field small-input"
          v-model="nome"
          placeholder="Nome"
          aria-label="Nome"
        />

        <input
          class="input-field small-input"
          v-model="valor"
          placeholder="Valor"
          @blur="valor = formatarValor(valor)"
          @keypress="bloquearLetras"
          aria-label="Valor"
        />

        <select v-model="tipo" class="input-field-tipo small-input" aria-label="Tipo de entrada ou saída">
          <option value="Receber">Receber</option>
          <option value="Pagar">Pagar</option>
        </select>

        <input
          class="input-field small-input"
          type="date"
          v-model="dataVencimento"
          placeholder="Data de Vencimento"
          aria-label="Data de Vencimento"
        />
        
        <button
          v-if="entradaEditada"
          class="icon-button-add"
          @click="salvarEdicao"
          title="Salvar edição"
          aria-label="Salvar edição"
        >
          Salvar
        </button>
        <button
          v-else
          class="icon-button-add"
          @click="adicionarTabela"
          title="Adicionar à Tabela"
          aria-label="Adicionar à Tabela"
        >
          Adicionar
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useToast } from 'vue-toastification';
  import { adicionarEntrada } from '@/services/contasService';
  
  export default {
    props: {
      atualizarTabela: {
        type: Function,
        required: true
      },
      formatarValor: {
        type: Function,
        default: (valor) => valor,
      },
    },
    setup(props) {
      const toast = useToast();
      const nome = ref('');
      const valor = ref('');
      const dataVencimento = ref('');
      const tipo = ref('Receber');
      const entradaEditada = ref(null);

      const exibirMensagem = (mensagem, sucesso = true) => {
        sucesso ? toast.success(mensagem) : toast.error(mensagem);
      };

      const validarCampos = () => {
        if (!nome.value || !valor.value || !dataVencimento.value) {
          exibirMensagem('Todos os campos são obrigatórios!', false);
          return null;
        }

        const valorNumerico = parseFloat(valor.value.replace('R$', '').replace('.', '').replace(',', '.').trim());
        if (isNaN(valorNumerico) || valorNumerico <= 0) {
          exibirMensagem('Valor inválido!', false);
          return null;
        }

        return {
          nome: nome.value,
          valor: valorNumerico,
          dataVencimento: new Date(dataVencimento.value).toISOString().split('T')[0],
          tipo: tipo.value,
        };
      };

      const adicionarTabela = async () => {
        const novaEntrada = validarCampos();
        if (!novaEntrada) return;

        try {
          console.group('Nova Entrada');
          console.log('Dados:', JSON.stringify(novaEntrada, null, 2));
          console.groupEnd();

          const response = await adicionarEntrada(novaEntrada);

          console.group('Resposta do Servidor');
          console.log('Dados recebidos:', response);
          console.groupEnd();

          if (!response || !response.data) {
            throw new Error('Resposta do servidor inválida');
          }

          // Atualiza a tabela imediatamente após adicionar a entrada
          props.atualizarTabela(response.data);

          exibirMensagem(response.message || 'Entrada adicionada com sucesso!');

          limparCampos();

        } catch (error) {
          console.error('Erro ao adicionar entrada:', error);

          exibirMensagem(
            error.response?.data?.message || 'Erro ao adicionar a entrada', 
            false
          );
        }
      };

      const limparCampos = () => {
        nome.value = '';
        valor.value = '';
        dataVencimento.value = '';
        tipo.value = 'Receber';
        entradaEditada.value = null;
      };

      return {
        nome,
        valor,
        dataVencimento,
        tipo,
        entradaEditada,
        adicionarTabela,
        limparCampos,
      };
    },
  };
  </script>
  
  <style scoped>

  .form-container {
    display: flex;
    width: 90%;
    margin-left: 2%;
    flex-direction: column;
    align-items: center;
    background-color: var(--binance-black3);
    padding: 10px;
    border-radius: 12px;
  }
  
  .form-row {
    display: flex;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
  }
  
  .input-field {
    padding: 8px 10px;
    border: none;
    border-radius: 8px;
    background-color: var(--binance-black-input);
    color: var(--binance-white);
    box-shadow: 0 1px 1px rgba(141, 141, 141, 0.233);
    transition: box-shadow 0.3s ease;
    flex: 1; /* Permite que os campos se expandam */
    min-width: 150px; /* Largura mínima para responsividade */
    max-width: 250px; /* Largura máxima para evitar excessos */
  }
  
  .input-field:focus {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    outline: none;
  }

  .input-field-tipo {
    padding: 10px;
    border: none;
    border-radius: 8px;
    background-color: var(--binance-black-input);
    color: var(--binance-white);
    box-shadow: 0 1px 1px rgba(141, 141, 141, 0.233);
    transition: box-shadow 0.3s ease;
    flex: 1; /* Permite que o select se expanda */
    min-width: 150px; /* Largura mínima para responsividade */
    max-width: 250px; /* Largura máxima para evitar excessos */
  }
  
  .input-field-tipo:focus {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    outline: none;
  }

  .small-input {
    color: var(--binance-white);
  }
  
  .icon-button-add {
    background-color: var(--binance-blue);
    color: var(--binance-white);
    border: none;
    border-radius: 8px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .icon-button-add:hover {
    background-color: var(--binance-blue-hover);
  }

  .icon-button {
    color: var(--binance-white);
  }
  
  /* Mensagens de sucesso/erro */
  .success-message {
    color: var(--binance-green);
    margin-top: 10px;
  }
  
  .error-message {
    color: var(--binance-red);
    margin-top: 10px;
  }

  /* Regras de mídia para responsividade */
  @media (max-width: 768px) {
    .form-container {
      width: 95%; /* Ajusta a largura em telas menores */
      margin: 0 auto; /* Centraliza o container */
    }

    .form-row {
      flex-direction: column;
      gap: 20px;
    }

    .icon-button, .icon-button-add {
      width: 100%;
    }
  }

  @media (min-width: 1200px) {
    .form-container {
      width: 80%;
    }

    .input-field {
      max-width: 300px;
    }
  }
  </style>