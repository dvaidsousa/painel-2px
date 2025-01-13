<script>
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
    document.title = "Cursos Online - Painel 2px";
  },
};
</script>

<template>
  <section>
    <div class="box">
      <Headers />
      <div style="display: flex;">
        <Sidebar style="height: 84vh;" />
        <div class="container">
          <h1>CURSOS ONLINE E GUIAS</h1>
          <br>
        </div>
      </div>
      <Footers />
    </div>
  </section>
</template>

<style scoped>
.container {
  background-color: var(--binance-black);
  padding: 20px 70px;
}

h1 {
  font-family: 'Lato', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--binance-white);
  margin-bottom: 20px;
}

h3 {
  font-family: 'Lato', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: var(--binance-red);
  margin-bottom: 5px;
  margin-top: 25px;
}

h6 {
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  font-weight: 400;
  font-style: italic;
  color: #e2e2e2;
  margin-left: 10px;
}

a {
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: var(--binance-white);
  transition: color 0.3s ease; /* Efeito de transição suave na cor */
}
</style>
