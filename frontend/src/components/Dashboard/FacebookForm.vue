<template>
    <div class="form-container">
      <div class="form-row">
        <input
          class="input-field small-input"
          v-model="valor"
          :placeholder="tipo === 'entrada' ? 'R$ Entrada' : 'R$ Saída'"
          @blur="valor = formatarValor(valor)"
          @keypress="bloquearLetras"
          aria-label="Valor"
        />

        <select v-model="tipo" class="input-field-tipo small-input" aria-label="Tipo de entrada ou saída">
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>

        <input
          class="input-field small-input"
          type="date"
          v-model="dataEntrada"
          placeholder="Data de Entrada"
          aria-label="Data de Entrada"
        />
        
        <button class="icon-button" @click="mostrarDescricao = !mostrarDescricao" aria-label="Adicionar descrição" title="Adicionar descrição">
          <i class="fa-regular fa-newspaper" style="font-size: 22px; padding: 0 10px;"></i>
        </button>
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
      <div v-if="mostrarDescricao" class="popup">
        <div class="popup-content">
          <textarea
            class="textarea-field"
            v-model="descricao"
            placeholder="Adicione uma descrição"
            rows="3"
            aria-label="Descrição"
            maxlength="15"
          ></textarea>
          <div class="popup-actions">
            <button class="action-button" @click="mostrarDescricao = false" aria-label="Adicionar descrição">Adicionar</button>
            <button class="action-button-fechar" @click="mostrarDescricao = false" aria-label="Fechar popup">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useToast } from 'vue-toastification';
  import { adicionarEntrada } from '@/services/facebookService';
  
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
      const valor = ref('');
      const descricao = ref('');
      const dataEntrada = ref('');
      const tipo = ref('entrada');
      const mostrarDescricao = ref(false);
      const entradaEditada = ref(null);

      const exibirMensagem = (mensagem, sucesso = true) => {
        sucesso ? toast.success(mensagem) : toast.error(mensagem);
      };

      const validarCampos = () => {
        if (!valor.value) {
          exibirMensagem('O valor é obrigatório!', false);
          return null;
        }

        if (!dataEntrada.value) {
          exibirMensagem('A data é obrigatória!', false);
          return null;
        }

        const valorNumerico = parseFloat(
          valor.value
            .replace('R$', '')     // Remove o símbolo de Real
            .replace('.', '')      // Remove pontos de milhar
            .replace(',', '.')     // Converte vírgula para ponto decimal
            .trim()
        );

        if (isNaN(valorNumerico) || valorNumerico <= 0) {
          exibirMensagem('Valor inválido!', false);
          return null;
        }

        const dataFormatada = new Date(dataEntrada.value).toISOString().split('T')[0];

        return {
          descricao: descricao.value || 'Sem descrição',
          valor: valorNumerico,
          dataEntrada: dataFormatada,
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

          props.atualizarTabela(response.data);

          exibirMensagem(response.message || 'Entrada adicionada com sucesso!');

          limparCampos();

        } catch (error) {
          console.error('Erro ao adicionar entrada:', error);

          exibirMensagem(
            error.message || 'Erro ao adicionar a entrada', 
            false
          );
        }
      };

      const limparCampos = () => {
        valor.value = '';
        descricao.value = '';
        dataEntrada.value = '';
        tipo.value = 'entrada';
        entradaEditada.value = null;
      };

      return {
        valor,
        descricao,
        dataEntrada,
        tipo,
        mostrarDescricao,
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
    padding: 8px 10px 8px 10px;
    border: none;
    border-radius: 8px;
    background-color: var(--binance-black-input);
    color: var(--binance-white);
    box-shadow: 0 1px 1px rgba(141, 141, 141, 0.233);
    transition: box-shadow 0.3s ease;
    width: 20%;
    max-width: 250px;
  }
  
  .input-field:focus {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    outline: none;
  }

  .input-field-tipo {
    padding: 10px 10px 10px 10px;
    border: none;
    border-radius: 8px;
    background-color: var(--binance-black-input);
    color: var(--binance-white);
    box-shadow: 0 1px 1px rgba(141, 141, 141, 0.233);
    transition: box-shadow 0.3s ease;
    width: 15%;
    max-width: 250px;
  }
  
  .input-field-tipo:focus {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    outline: none;
  }

  .small-input {
    color: var(--binance-white);
    max-width: 150px;
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
  
  .popup {
    position: absolute;
    width: 40%;
    top: 210px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--binance-black3);
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    z-index: 10;
  }
  
  .popup-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .textarea-field {
    width: 100%;
    border: none;
    border-radius: 8px;
    padding: 10px;
    background-color: var(--binance-black-input);
    color: var(--binance-white);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
  }
  
  .textarea-field:focus {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    outline: none;
  }
  
  .popup-actions {
    display: flex;
    justify-content: space-between;
  }
  
  .action-button {
    background-color: var(--binance-blue);
    color: var(--binance-white);
    border: none;
    border-radius: 8px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .action-button:hover {
    background-color: var(--binance-blue-hover);
  }

  .action-button-fechar {
    background-color: var(--binance-red);
    color: var(--binance-white);
    border: none;
    border-radius: 8px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .action-button-fechar:hover {
    background-color: var(--binance-red-hover);
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
      width: 90%;
      margin-left: 0;
    }

    .input-field {
      width: 100% !important;
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