<template>
  <section>
    <div class="box">
      <Headers />
      <div class="flex-container">
        <Sidebar class="sidebar" />
        <div class="container">
          <h1>Dashboard</h1>
          <br>
          <div v-if="dashboardCode" v-html="dashboardCode"></div> <!-- Renderiza o código do iframe se disponível -->
          <div v-else> <!-- Mensagem de erro se o código do dashboard não estiver disponível -->
            <p>Nenhum dashboard encontrado.</p>
          </div>
        </div>
      </div>
      <ButtonScroll />
      <Footers />
    </div>
  </section>
</template>

<script>
import Headers from "../components/Global/Headers.vue";
import Sidebar from "../components/Global/Sidebar.vue";
import ButtonScroll from "../components/Global/ButtonScroll.vue";
import Footers from "../components/Global/Footers.vue";
import { getDashboard } from '../services/dashboard'; // Importando a função para obter o dashboard

export default {
  components: {
    Headers,
    Sidebar,
    ButtonScroll,
    Footers,
  },
  data() {
    return {
      dashboardCode: null, // Propriedade para armazenar o código do iframe
    };
  },
  async mounted() {
    try {
      this.dashboardCode = await getDashboard(); // Atribuindo o código do iframe diretamente
    } catch (error) {
      console.error('Erro ao carregar o dashboard:', error.message); // Exibe a mensagem de erro detalhada
      this.dashboardCode = null; // Garantindo que dashboardCode seja nulo em caso de erro
    }
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
  height: 86vh;
  flex: 0 0 250px;
}

.container {
  background-color: var(--binance-black);
  padding: 20px;
  flex-grow: 1;
}

h1 {
  font-family: 'Lato', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--binance-white);
  padding: 0 0 0 40px;
}

p {
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: var(--binance-white);
  padding: 0 0 0 40px;
}

@media (min-width: 768px) {
  .flex-container {
    flex-direction: row;
  }
}
</style>
