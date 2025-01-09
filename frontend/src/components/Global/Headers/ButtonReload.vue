<template>
  <button class="reload-button" @click="reloadPage">
    <i class="fa fa-refresh"></i>
  </button>
</template>

<script>
export default {
  methods: {
    reloadPage() {
      window.location.reload(); // Recarrega a página
    }
  }
}
</script>

<style scoped>
.reload-button {
  color: var(--binance-white);
  font-size: 1.4rem;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.reload-button:hover {
  color: var(--binance-yellow);
}

</style>

