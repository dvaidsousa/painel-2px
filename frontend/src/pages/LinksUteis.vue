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
          <h1>LINKS ÚTEIS</h1>
          <br>
          <h2 style="margin-bottom: 30px;">SUMÁRIO</h2>
          <h3>1 - IA QUE EXECUTA TAREFAS EM TEXTO</h3>
          <a href="https://chatgpt.com/" target="_blank">https://chatgpt.com/</a>
          <br>
          <a href="https://gemini.google.com/app" target="_blank">https://gemini.google.com/</a>
          <br>
          <h3>2 - MARCA E LOGOTIPO GRÁTIS</h3>
          <a href="https://www.hipsterlogogenerator.com/" target="_blank">https://www.hipsterlogogenerator.com/</a>
          <br>
          <a href="https://www.squarespace.com/logo/" target="_blank">https://www.squarespace.com/logo/</a>
          <br>
          <a href="https://www.logomaker.com/" target="_blank">https://www.logomaker.com/</a>
          <br>
          <a href="https://www.logos.com/" target="_blank">https://www.logos.com/</a>
          <br>
          <a href="https://signature-maker.net/" target="_blank">https://signature-maker.net/</a>
          <br>
          <h3>3 - GERADOR DE NOMES PARA EMPRESAS</h3>
          <a href="http://www.naminum.com/" target="_blank">http://www.naminum.com/</a>
          <br>
          <a href="https://shortdomainsearch.com/" target="_blank">https://shortdomainsearch.com/</a>
          <br>
          <a href="https://www.hipsterbusiness.name" target="_blank">https://www.hipsterbusiness.name</a>
          <br>
          <a href="https://leandomainsearch.com/" target="_blank">https://leandomainsearch.com/</a>
          <br>
          <h3>4 - COPY E IDÉIAS</h3>
          <a href="https://www.grammarly.com/" target="_blank">https://www.grammarly.com/</a>
          <br>
          <a href="https://shortdomainsearch.com/" target="_blank">https://shortdomainsearch.com/</a>
          <br>
          <a href="https://www.hipsterbusiness.name" target="_blank">https://www.hipsterbusiness.name</a>
          <br>
          <a href="https://leandomainsearch.com/" target="_blank">https://leandomainsearch.com/</a>
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

h2 {
  display: flex;
  justify-content: center;
  font-family: 'Lato', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--binance-white);
}

h3 {
  font-family: 'Lato', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--binance-red);
  margin-bottom: 5px;
  margin-top: 25px;
}

a {
  font-family: 'Lato', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: var(--binance-white);
  transition: color 0.3s ease; /* Efeito de transição suave na cor */
}

a:hover {
  color: var(--binance-red);
}
</style>
