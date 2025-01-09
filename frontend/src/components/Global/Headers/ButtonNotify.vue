<template>
  <div class="notification-container" @mouseenter="showDropdown" @mouseleave="hideDropdown">
    <i class="notification fa-solid fa-bell text-white"></i>
    <div v-if="dropdownVisible" class="dropdown">
      <!-- Aqui você pode adicionar a lógica para listar as notificações -->
      <p>Nenhuma notificação</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownVisible: false,
    };
  },
  methods: {
    showDropdown() {
      this.dropdownVisible = true;
    },
    hideDropdown() {
      this.dropdownVisible = false;
    }
  }
}
</script>

<style scoped>
.notification-container {
    position: relative;
}

.notification {
    font-size: 1.3rem;
    color: var(--binance-white);
    cursor: pointer;
}
  
.notification:hover {
    color: var(--binance-yellow);
}

.dropdown {
    position: absolute;
    background-color: var(--binance-black);
    color: var(--binance-white);
    margin-top: 0.5rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    padding: 0.5rem;
    z-index: 10;
    width: 200px; /* Ajuste conforme necessário */
}
</style>