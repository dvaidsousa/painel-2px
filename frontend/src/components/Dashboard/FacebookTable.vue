<template>
    <div class="table-container">
      <div v-if="isLoading" class="spinner-container">
        <div class="spinner"></div>
      </div>
      <div class="header-container">
        <div class="items-per-page-selector">
          <label for="itemsPerPage">Itens por página:</label>
          <select v-model="itemsPerPage" id="itemsPerPage">
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <div class="saldo-container">
          <label>Saldo:</label>
          <span> R$ </span>
          <span :style="{ color: saldo > 0 ? '#3cca3c' : saldo < 0 ? '#ec1b1b' : 'white' }">{{ saldo }}</span>
        </div>
        <div class="date-filter">
          <label for="startDate">De:</label>
          <input type="date" v-model="startDate" id="startDate" @change="filtrarPorData" />
          <label for="endDate">Até:</label>
          <input type="date" v-model="endDate" id="endDate" @change="filtrarPorData" />
        </div>
      </div>
      <table class="facebook-table" v-if="!isLoading">
        <thead>
          <tr>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Data de Entrada</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in paginatedData"
            :key="item.id || index"
            :class="{
              'entrada': item.tipo === 'entrada',
              'saida': item.tipo === 'saida'
            }"
          >
            <td :style="{ color: item.tipo === 'saida' ? '#ec1b1b' : '#3cca3c' }">{{ item.tipo === 'saida' ? '-' : '' }}R$ {{ item.valor }}</td>
            <td>{{ item.tipo === 'entrada' ? 'Entrada' : 'Saída' }}</td>
            <td>{{ item.dataEntrada }}</td>
            <td>{{ item.descricao }}</td>
            <td>
              <button class="icon-button" @click="abrirPopup(item)" title="Editar">
                <i class="fa fa-edit"></i>
              </button>
              <button class="icon-button" @click="abrirModalConfirmacao(item.id)" title="Excluir">
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Atrás</button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Próx</button>
      </div>
  
      <ConfirmModal 
        :visible="modalVisivel" 
        @confirm="deletarLinha" 
        @cancel="fecharModalConfirmacao" 
      />
  
      <EditTable
        :linha="linhaEditada"
        :isVisible="popupVisivel"
        @salvar-edicao="salvarEdicao"
        @fechar-popup="fecharPopup"
        @atualizar-tabela="atualizarTabela"
      />
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import EditTable from './EditButtonTable.vue';
  import ConfirmModal from '../Dashboard/ConfirmModal.vue';
  import { editarLinha, deletarLinha as deletarLinhaAPI, listarFacebook } from '../../services/facebookService';
  import { useToast } from 'vue-toastification';
  
  export default {
    components: {
      EditTable,
      ConfirmModal,
    },
    props: {
      tabelaDados: {
        type: Array,
        default: () => [],
        required: true,
      },
      atualizarTabela: {
        type: Function,
        required: true,
      },
      linhaId: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      const toast = useToast();
      const isLoading = ref(false);
      const popupVisivel = ref(false);
      const linhaEditada = ref(null);
      const modalVisivel = ref(false);
      const linhaParaDeletar = ref(null);
      const currentPage = ref(1);
      const itemsPerPage = ref(15);
      const startDate = ref('');
      const endDate = ref('');
  
      const totalPages = computed(() => {
        return Math.ceil(filtradosPorData.value.length / itemsPerPage.value);
      });
  
      const filtradosPorData = computed(() => {
        return props.tabelaDados.filter(item => {
          const dataEntrada = new Date(item.dataEntrada);
          const dataInicio = new Date(startDate.value);
          const dataFim = new Date(endDate.value);
          return (!startDate.value || dataEntrada >= dataInicio) && (!endDate.value || dataEntrada <= dataFim);
        });
      });
  
      const paginatedData = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return filtradosPorData.value.slice(start, end);
      });
  
      const saldo = computed(() => {
        const entradas = props.tabelaDados
          .filter(item => item.tipo === 'entrada')
          .reduce((acc, item) => acc + parseFloat(item.valor), 0);
        const saidas = props.tabelaDados
          .filter(item => item.tipo === 'saida')
          .reduce((acc, item) => acc + parseFloat(item.valor), 0);
        return entradas - saidas;
      });
  
      const nextPage = () => {
        if (currentPage.value < totalPages.value) {
          currentPage.value++;
        }
      };
  
      const prevPage = () => {
        if (currentPage.value > 1) {
          currentPage.value--;
        }
      };
  
      const abrirPopup = (linha) => {
        if (!linha?.id) {
          console.error('Erro: linha ou linha.id está indefinido', linha);
          return;
        }
        linhaEditada.value = { ...linha };
        popupVisivel.value = true;
      };
  
      const fecharPopup = () => {
        popupVisivel.value = false;
        linhaEditada.value = null;
      };
  
      const salvarEdicao = async (linhaEditada) => {
        if (!linhaEditada?.id) {
          toast.error('Erro: Dados inválidos.');
          return;
        }
  
        const { valor, dataEntrada, descricao } = linhaEditada;
  
        if (!valor || !dataEntrada || !descricao) {
          toast.warning('Por favor, preencha todos os campos.');
          return;
        }
  
        if (isNaN(valor)) {
          toast.error('O valor deve ser numérico.');
          return;
        }
  
        try {
          isLoading.value = true;
          const response = await editarLinha(linhaEditada.id, linhaEditada);
  
          if (response.ok) {
            const dadosAtualizados = await response.json();
            props.atualizarTabela(dadosAtualizados);
            toast.success('Dados atualizados com sucesso!');
          } else {
            toast.error('Erro ao atualizar os dados.');
          }
        } catch (error) {
          console.error('Erro ao salvar edição:', error);
          toast.error('Erro ao conectar ao servidor.');
        } finally {
          isLoading.value = false;
          fecharPopup();
        }
      };
  
      const abrirModalConfirmacao = (id) => {
        linhaParaDeletar.value = id;
        modalVisivel.value = true;
      };
  
      const fecharModalConfirmacao = () => {
        modalVisivel.value = false;
        linhaParaDeletar.value = null;
      };
  
      const deletarLinha = async () => {
        if (!linhaParaDeletar.value) {
          toast.error('Erro: ID inválido.');
          return;
        }
  
        try {
          const index = props.tabelaDados.findIndex((item) => item.id === linhaParaDeletar.value);
          if (index !== -1) {
            const idRemovido = linhaParaDeletar.value;
  
            props.tabelaDados.splice(index, 1);
            toast.success('Linha removida com sucesso.');
            await deletarLinhaAPI(idRemovido);
          }
        } catch (error) {
          console.error('Erro ao excluir linha:', error);
          toast.error('Erro ao excluir do banco de dados.');
        } finally {
          fecharModalConfirmacao();
        }
      };
  
      const fetchFacebook = async () => {
        try {
          isLoading.value = true;
          const dados = await listarFacebook();
          props.atualizarTabela(dados);
        } catch (error) {
          console.error('Erro ao buscar facebook:', error);
          toast.error('Erro ao buscar dados.');
        } finally {
          isLoading.value = false;
        }
      };
  
      const filtrarPorData = () => {
        currentPage.value = 1; // Resetar para a primeira página ao filtrar
      };
  
      onMounted(fetchFacebook);
  
      return {
        isLoading,
        popupVisivel,
        linhaEditada,
        modalVisivel,
        linhaParaDeletar,
        abrirPopup,
        fecharPopup,
        salvarEdicao,
        abrirModalConfirmacao,
        fecharModalConfirmacao,
        deletarLinha,
        currentPage,
        totalPages,
        paginatedData,
        nextPage,
        prevPage,
        itemsPerPage,
        saldo,
        startDate,
        endDate,
        filtrarPorData,
      };
    },
  };
  </script>
  
  <style scoped>
  .table-container {
    overflow-x: auto;
    width: 80%;
    margin: 20px 0px 0px 25px;
    border-radius: 12px;
  }
  
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 20px;
  }
  
  .items-per-page-selector {
    display: flex;
    align-items: center;
  }
  
  .items-per-page-selector label {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    color: var(--binance-white);
  }
  
  #itemsPerPage {
    margin-left: 5px;
    border-radius: 3px;
  }
  
  .saldo-container {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    color: var(--binance-white);
  }
  
  .date-filter {
    display: flex;
    align-items: center;
  }
  
  .date-filter label {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    color: var(--binance-white);
    margin-left: 15px;
  }
  
  .date-filter input {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    margin-left: 5px;
    border-radius: 3px;
    padding: 2px 5px;
  }
  
  select {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
  }
  
  option {
    font-size: 12px;
  }
  
  .facebook-table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--binance-white);
    border-radius: 12px;
    overflow: hidden;
  }
  
  .facebook-table thead {
    background-color: var(--binance-black2);
    color: var(--binance-white);
  }
  
  th {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: 700;
  }
  
  .facebook-table th, .facebook-table td {
    padding: 8px 17px; /* Diminuir a altura das listas da coluna */
    text-align: left;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
  }
  
  .facebook-table tbody tr {
    transition: background-color 0.3s ease;
  }
  
  .facebook-table th {
    font-weight: 600;
    letter-spacing: 0.01rem;
  }
  
  /* Estilos para a linha de entrada */
  .facebook-table tbody tr {
    background-color: var(--binance-black3);
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    color: var(--binance-white);
    border-bottom: 1px solid #585858;
  }
  
  .icon-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 18px;
    transition: transform 0.2s;
  }
  
  .icon-button:hover {
    transform: scale(1.1);
  }
  
  .icon-button .fa-trash {
    color: #ff4c4c;
    margin-left: 40px;
  }
  
  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  
  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  .pagination button {
    background-color: var(--binance-blue);
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    color: var(--binance-white);
    border: none;
    padding: 5px 10px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .pagination button:disabled {
    background-color: #8d8d8d;
    cursor: not-allowed;
  }
  
  .pagination span {
    margin: 0 10px;
    color: var(--binance-white);
    font-family: 'Lato', sans-serif;
    font-size: 14px;
  }
  </style>