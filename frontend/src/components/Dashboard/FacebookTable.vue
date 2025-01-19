<template>
  <h1 class="title-facebook">Gestão de anúncios do Facebook</h1>
  <div class="somas-container">
    <span class="total-investment">Total Investido: {{ totalInvestimento ? totalInvestimento.toFixed(2) : '0.00' }}</span>
    <span class="total-leads">Total de Leads: {{ totalLeads || 0 }}</span>
    <span class="total-impressao">Total de Impressões: {{ totalImpressao || 0 }}</span>
  </div>
    <div class="table-container">
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
            <th>Investimento</th>
            <th>Leads</th>
            <th>CPL (Média)</th>
            <th>Impressões</th>
            <th>Contas</th>
            <th>Criado Em</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in paginatedData"
            :key="item.id || index"
          >
            <td :style="{ color: item.tipo }">{{ item.investimento ? parseFloat(item.investimento).toFixed(2) : '0.00' }}</td>
            <td>{{ item.leads || 0 }}</td>
            <td>{{ item.custoPorLead ? parseFloat(item.custoPorLead).toFixed(2) : '0.00' }}</td>
            <td>{{ item.impressao || 0 }}</td>
            <td>{{ item.contas || 0 }}</td>
            <td>{{ new Date(item.createdAt).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
  
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Atrás</button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Próx</button>
      </div>
    </div>
  </template>  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import { listarFacebook } from '../../services/facebookService';
  import { useToast } from 'vue-toastification';
  import BarChartFacebook from '../Dashboard/BarChartFacebook.vue';

  export default {
    components: {
      BarChartFacebook
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
      const modalVisivel = ref(false);
      const currentPage = ref(1);
      const itemsPerPage = ref(15);
      const startDate = ref('');
      const endDate = ref('');
  
      const totalPages = computed(() => {
        return Math.ceil(filtradosPorData.value.length / itemsPerPage.value);
      });
  
      const filtradosPorData = computed(() => {
        return props.tabelaDados.filter(item => {
          const dataEntrada = new Date(item.createdAt);
          const dataInicio = new Date(startDate.value);
          const dataFim = new Date(endDate.value);
          return (!startDate.value || dataEntrada >= dataInicio) && (!endDate.value || dataEntrada <= dataFim);
        });
      });

      const totalInvestimento = computed(() => {
        return filtradosPorData.value.reduce((acc, item) => acc + (parseFloat(item.investimento) || 0), 0);
      });

      const totalLeads = computed(() => {
        return filtradosPorData.value.reduce((acc, item) => acc + (item.leads || 0), 0);
      });

      const totalImpressao = computed(() => {
        return filtradosPorData.value.reduce((acc, item) => acc + (parseFloat(item.impressao) || 0), 0);
      });
  
      const paginatedData = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return filtradosPorData.value.slice(start, end);
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
        currentPage.value = 1;
      };
  
      onMounted(fetchFacebook);
  
      return {
        isLoading,
        modalVisivel,
        currentPage,
        totalPages,
        paginatedData,
        nextPage,
        prevPage,
        itemsPerPage,
        startDate,
        endDate,
        filtrarPorData,
        totalInvestimento,
        totalLeads,
        totalImpressao,
      };
    },
  };
  </script>
  
  <style scoped>
  .table-container {
    overflow-x: auto;
    width: 75%;
    margin: 20px 0px 0px 25px;
    border-radius: 3px;
  }
  
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 20px;
  }

  .title-facebook {
    margin: 5px 20px 0px 45px;
    font-family: 'Lato', sans-serif;
    font-size: 18px;
    color: var(--binance-white);
    font-weight: 600;
    letter-spacing: 0.01rem;
  }

  .somas-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 20px 0px 25px;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    color: var(--binance-white);
    font-weight: 600;
    letter-spacing: 0.01rem;
    border-radius: 3px;
    width: 50%;
    background-color: var(--binance-black3);
    padding: 10px 10px;
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

  .total-investment {
    margin-left: 10px;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    color: var(--binance-white);
  }

  .total-leads {
    margin-left: 10px;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    color: var(--binance-white);
  }

  .total-impressao {
    margin-left: 10px;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
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
    background-color: var(--binance-white);
    border-radius: 8px;
    overflow: hidden;
  }
  
  .facebook-table thead {
    background-color: #973636;
    color: var(--binance-white);
  }
  
  th {
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-weight: 700;
  }
  
  .facebook-table th, .facebook-table td {
    padding: 8px 17px;
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
    background-color: #8d8d8d00;
    border: 1px solid #8d8d8d;
    cursor: not-allowed;
  }
  
  .pagination span {
    margin: 0 10px;
    color: var(--binance-white);
    font-family: 'Lato', sans-serif;
    font-size: 14px;
  }
  </style>
