<script>
import { ref, onMounted } from 'vue';
import Headers from "../components/Global/Headers.vue";
import Sidebar from "../components/Global/Sidebar.vue";
import Footers from "../components/Global/Footers.vue";

export default {
  components: {
    Headers,
    Sidebar,
    Footers,
  },
  mounted() {
    document.title = "Eventos - Painel 2px"; // Colocando o texto na aba do navegador
  }
};
</script>

<template>
  <section>
    <div class="box">
      <Headers />
      <div class="flex-container">
        <Sidebar class="sidebar" />
        <div class="container">
          <h1>EVENTOS</h1>
          <br>
          <p>Em breve...</p>
        </div>
      </div>
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

h2 {
  font-family: 'Lato', sans-serif;
  font-size: 22px;
  color: var(--binance-white);
  padding: 0 0 0 40px; /* Padding lateral para o subtítulo */
}

span {
  font-size: 18px;
  font-style: italic;
  color: var(--binance-white);
}

p {
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  color: var(--binance-white);
  padding: 0 0 0 40px; /* Padding lateral para o subtítulo */
}

.error-message {
  color: var(--binance-red);
  font-weight: bold;
  margin-top: 10px;
}

@media (min-width: 768px) {
  .flex-container {
    flex-direction: row; /* Muda para row em telas maiores */
  }
}
</style>
