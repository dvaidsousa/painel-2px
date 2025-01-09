<script>
export default {
  data() {
    return {
      // Exemplos de etiquetas pré-definidas
      exemplos: [
        { name: 'Mercado', color: '#4caf50' },
        { name: 'Transporte', color: '#ff9800' },
        { name: 'Saúde', color: '#f44336' },
        { name: 'Viagem', color: '#2196f3' }
      ]
    };
  }
};
</script>

<template>
  <div>
    <h2>Exemplos de Etiquetas</h2>
    <ul class="etiquetas-list-horizontal">
      <li
        v-for="(exemplo, index) in exemplos"
        :key="'ex-' + index"
        :style="{ backgroundColor: exemplo.color }"
        class="etiqueta-item-horizontal"
      >
        <span class="etiqueta-name">{{ exemplo.name }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.etiqueta-item-horizontal {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  color: white;
  width: 150px;
}

.etiquetas-list-horizontal {
  list-style: none;
  padding: 0;
  display: flex; /* Alinha os itens na horizontal */
  gap: 10px; /* Espaçamento entre os itens */
  flex-wrap: wrap; /* Permite que os itens quebrem linha se necessário */
}

h2 {
  font-family: 'Lato', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: var(--binance-white);
  margin-bottom: 10px;
  margin-left: 20px;
}
</style>
