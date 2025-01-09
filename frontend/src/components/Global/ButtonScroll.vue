<script>
export default {
  data() {
    return {
      showButton: false,
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Scroll suave até o topo
      });
    },
    handleScroll() {
      // Exibe o botão quando o scroll for maior que 300px
      this.showButton = window.scrollY > 300;
    },
  },
  mounted() {
    // Adiciona o listener para monitorar o scroll
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    // Remove o listener ao desmontar o componente
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<template>
  <div>
    <!-- Seu conteúdo aqui -->

    <!-- Botão para voltar ao topo -->
    <button v-if="showButton" @click="scrollToTop" class="scroll-to-top">
      Voltar ao topo
    </button>
  </div>
</template>

<style scoped>

.scroll-to-top {
    position: fixed;
    font-size: 16px;
    bottom: 20px;
    left: 50%; /* Posiciona o botão no meio da tela */
    transform: translateX(-50%); /* Ajusta o botão para estar perfeitamente centralizado */
    padding: 5px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

</style>