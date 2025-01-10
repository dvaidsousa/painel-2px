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
};
</script>

<template>
  <section>
    <div class="box">
      <Headers />
      <div style="display: flex;">
        <Sidebar style="height: 84vh;" />
        <div class="container">
          <h1>CURSOS ONLINE</h1>
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
</style>
