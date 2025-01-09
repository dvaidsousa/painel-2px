<script>
import { ref, onMounted } from 'vue';
import Headers from "../components/Global/Headers.vue";
import Sidebar from "../components/Global/Sidebar.vue";
import ContasForm from "../components/ControleContas/ContasForm.vue";
import ContasTable from "../components/ControleContas/ContasTable.vue";
import ButtonScroll from "../components/Global/ButtonScroll.vue";
import Footers from "../components/Global/Footers.vue";
import { listarContas } from '../services/contasService';

export default {
  components: {
    Headers,
    Sidebar,
    ContasForm,
    ContasTable,
    ButtonScroll,
    Footers,
  },
  setup() {
    const tabelaDados = ref([]);
    const erroCarregamento = ref(null);

    const fetchContas = async () => {
      try {
        const dados = await listarContas();
        tabelaDados.value = dados;
        erroCarregamento.value = null;
      } catch (error) {
        erroCarregamento.value = 'Erro ao carregar os dados. Verifique suas permissões ou se a API está rodando.';
        console.error('Erro ao buscar contas:', error.message);
      }
    };

    onMounted(fetchContas);

    return {
      tabelaDados,
      erroCarregamento,
      fetchContas,
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
          <h1>Contas a Pagar / Receber</h1>
          <br>
          <ContasForm :atualizarTabela="fetchContas" />
          <ContasTable
            :tabelaDados="tabelaDados" 
            :atualizarTabela="fetchContas"
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
  flex-wrap: wrap;
}

.sidebar {
  height: 86vh;
  flex: 0 0 250px; /* Largura fixa para a sidebar */
}

.container {
  background-color: var(--binance-black);
  padding: 20px;
  flex: 1; /* Permite que a container ocupe o espaço restante */
  min-width: 300px; /* Largura mínima para responsividade */
}

h1 {
  font-family: 'Lato', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--binance-white);
  padding: 0 0 0 40px;
}
.error-message {
  color: var(--binance-red);
  font-weight: bold;
  margin-top: 10px;
}

.table-container {
  margin-bottom: 30px;
  width: 100%; /* Garante que a tabela ocupe toda a largura disponível */
}

@media (max-width: 768px) {
  .flex-container {
    flex-direction: column; /* Alinha as tabelas uma embaixo da outra em telas menores */
  }
}
</style>
