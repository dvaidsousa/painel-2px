<template>
  <section>
    <div class="box">
      <Headers />
      <div class="flex-container">
        <Sidebar class="sidebar" />
        <div class="container">
          <h1>Dashboard</h1>
          <br>
          <FinanceForm @novaEntrada="manipularTabela" :atualizarTabela="manipularTabela" />
          <FinanceTable
            :tabelaDados="tabelaDados" 
            @atualizar-tabela="manipularTabela" 
            :linhaId="tabelaDados.map(item => item.id)" 
            :atualizarTabela="manipularTabela"
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

<script>
import { ref, onMounted } from 'vue';
import Headers from "../components/Global/Headers.vue";
import Sidebar from "../components/Global/Sidebar.vue";
import FinanceForm from "../components/Dashboard/FinanceForm.vue";
import FinanceTable from "../components/Dashboard/FinanceTable.vue";
import ButtonScroll from "../components/Global/ButtonScroll.vue";
import Footers from "../components/Global/Footers.vue";
import { listarFinancas } from '../services/financasService';

export default {
  components: {
    Headers,
    Sidebar,
    FinanceForm,
    FinanceTable,
    ButtonScroll,
    Footers,
  },
  setup() {
    const tabelaDados = ref([]);
    const erroCarregamento = ref(null);

    const carregarDados = async () => {
      try {
        const response = await listarFinancas();
        tabelaDados.value = response;
        erroCarregamento.value = null;
      } catch (error) {
        erroCarregamento.value = error.message;
        console.error('Erro de conexão:', error);
      }
    };

    const manipularTabela = (entrada) => {
      if (!entrada || !entrada.id) {
        return;
      }

      const index = tabelaDados.value.findIndex(item => item.id === entrada.id);
      if (index !== -1) {
        // Atualiza o item existente
        tabelaDados.value[index] = entrada;
      } else {
        // Adiciona novo item
        tabelaDados.value.push(entrada);
      }

      // Recarregar a tabela após adicionar uma nova entrada
      carregarDados(); // Chama a função para recarregar as finanças
    };

    onMounted(carregarDados);

    return {
      tabelaDados,
      erroCarregamento,
      manipularTabela,
    };
  },
};
</script>

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
