<script>
import { ref, onMounted } from 'vue';
import Headers from "../components/Global/Headers.vue";
import Sidebar from "../components/Global/Sidebar.vue";
import Footers from "../components/Global/Footers.vue";
import { listarFinancas } from '../services/financasService';

export default {
  components: {
    Headers,
    Sidebar,
    Footers,
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
          <h1>FERRAMENTAS</h1>
          <br>
          <h2>- Canva Pro</h2>
          <button @click="window.open('https://www.exemplo.com', '_blank')" class="access-button canva-button">Acessar Canva Pro</button>
          <hr class="divider" />
          <br>
          <h2>- CapCut Pro</h2>
          <button @click="window.open('https://www.exemplo.com', '_blank')" class="access-button capcut-button">Acessar CapCut Pro</button>
          <hr class="divider" />
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

.access-button {
  color: white; /* Cor do texto do botão */
  border: none; /* Remove borda */
  border-radius: 5px;
  padding: 10px 20px; /* Padding do botão */
  cursor: pointer; /* Cursor de ponteiro ao passar o mouse */
  margin-left: 40px; /* Margem lateral para alinhar com o texto */
  margin-top: 20px;
}

.canva-button {
  background: linear-gradient(90deg, #07a7d3, #0072ff); /* Azul degradê */
}

.capcut-button {
  background-color: white; /* Fundo branco para o botão do CapCut */
  color: black; /* Texto preto para o botão do CapCut */
}

.access-button:hover {
  opacity: 0.8; /* Efeito de hover */
}

.divider {
  border: none;
  border-top: 1px solid #cacacac5; /* Linha traçada em cima */
  margin: 40px 40px 0px 40px; /* Margem para alinhar com o botão */
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
