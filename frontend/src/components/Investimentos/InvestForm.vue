<template>
    <div class="form-container">
      <div class="form-row">
        <!-- Seletor de tipo -->
        <select v-model="tipo" class="input-field small-input" aria-label="Tipo">
          <option value="" disabled selected>Tipo</option>
          <option value="renda fixa">Renda Fixa</option>
          <option value="renda variável">Renda Variável</option>
          <option value="fundos">Fundos</option>
          <option value="criptos">Criptos</option>
          <option value="outros">Outros</option>
        </select>
        
        <input
          class="input-field small-input"
          v-model="name"
          placeholder="Nome"
          aria-label="Nome"
        />

        <input
          class="input-field small-input"
          type="date"
          v-model="dataEntrada"
          placeholder="Data de Entrada"
          aria-label="Data de Entrada"
        />

        <input
          class="input-field small-input"
          v-model="saldo"
          placeholder="R$ saldo"
          @blur="saldo = formatarValor(saldo)"
          @keypress="bloquearLetras"
          aria-label="Saldo"
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
          :disabled="!name || !saldo || !dataEntrada || !tipo"
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
  import { adicionarEntrada } from '@/services/investService';
  
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
      const saldo = ref('');
      const dataEntrada = ref('');
      const tipo = ref('');
      const name = ref('');
      const entradaEditada = ref(null);

      const exibirMensagem = (mensagem, sucesso = true) => {
        sucesso ? toast.success(mensagem) : toast.error(mensagem);
      };

      const validarCampos = () => {
        if (!name.value) {
          exibirMensagem('O nome é obrigatório!', false);
          return null;
        }

        if (!saldo.value) {
          exibirMensagem('O saldo é obrigatório!', false);
          return null;
        }

        if (!dataEntrada.value) {
          exibirMensagem('A data é obrigatória!', false);
          return null;
        }

        const valorNumerico = parseFloat(saldo.value.replace(',', '.'));
        if (isNaN(valorNumerico)) {
          exibirMensagem('O saldo deve ser um número válido!', false);
          return null;
        }

        return {
          tipo: tipo.value,
          name: name.value,
          saldo: valorNumerico,
          dataEntrada: dataEntrada.value,
        };
      };

      const adicionarTabela = async () => {
        const novaEntrada = validarCampos();
        if (!novaEntrada) return;

        try {
          await adicionarEntrada(novaEntrada);
          exibirMensagem('Entrada adicionada com sucesso!');
          props.atualizarTabela();
          saldo.value = '';
          dataEntrada.value = '';
          tipo.value = '';
          name.value = '';
        } catch (error) {
          exibirMensagem('Erro ao adicionar entrada: ' + error.message, false);
        }
      };

      return {
        saldo,
        dataEntrada,
        tipo,
        name,
        entradaEditada,
        adicionarTabela,
        exibirMensagem,
        validarCampos,
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
    padding: 5px 8px 5px 8px;
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