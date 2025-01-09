<script>
import { ref, onMounted } from 'vue';
import Headers from "../components/Global/Headers.vue";
import Sidebar from "../components/Global/Sidebar.vue";
import InvestForm from "../components/Investimentos/InvestForm.vue";
import InvestTable from "../components/Investimentos/InvestTable.vue";
import ButtonScroll from "../components/Global/ButtonScroll.vue";
import Footers from "../components/Global/Footers.vue";
import { listarInvestimentos } from '../services/investService';

export default {
  components: {
    Headers,
    Sidebar,
    InvestForm,
    InvestTable,
    ButtonScroll,
    Footers,
  },
  setup() {
    const tabelaDados = ref([]);
    const erroCarregamento = ref(null);

    const carregarDados = async () => {
      try {
        const response = await listarInvestimentos();
        tabelaDados.value = response;
        erroCarregamento.value = null;
      } catch (error) {
        erroCarregamento.value = 'Erro ao carregar os dados.';
        console.error('Erro de conexão:', error);
      }
    };

    const atualizarTabela = async () => {
      await carregarDados();
    };

    onMounted(carregarDados);

    return {
      tabelaDados,
      erroCarregamento,
      atualizarTabela,
    };
  },
};
</script>

<template>
  <section>
    <div class="box">
      <Headers />
      <div class="flex-container">
        <Sidebar class="sidebar" />
        <div class="container">
          <h1>Investimentos</h1>
          <br>
          <InvestForm @novaEntrada="atualizarTabela" :atualizarTabela="atualizarTabela" @salvar-edicao="atualizarTabela" />
          <InvestTable
            :tabelaDados="tabelaDados" 
            :atualizarTabela="atualizarTabela" 
            :linhaId="tabelaDados.map(item => item.id)" 
            class="table-container"
          />
          <div v-if="erroCarregamento" class="error-message">
            {{ erroCarregamento }}
          </div>
        </div>
      </div>
      <ButtonScroll />
      <Footers />
    </div>
  </section>
</template>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.sidebar {
  height: 86vh; /* Ajusta a altura da sidebar para ser responsiva */
  flex: 0 0 250px; /* Largura fixa para a sidebar */
}

.container {
  background-color: var(--binance-black);
  padding: 20px; /* Ajusta o padding para melhor responsividade */
  flex-grow: 1; /* Permite que o container cresça */
}

h1 {
  font-family: 'Lato', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--binance-white);
  padding: 0 0 0 40px; /* Remove padding lateral */
}

.error-message {
  color: var(--binance-red);
  font-weight: bold;
  margin-top: 10px;
}

.table-container {
  margin-bottom: 30px;
}

@media (min-width: 768px) {
  .flex-container {
    flex-direction: row; /* Muda para row em telas maiores */
  }
}
</style>
