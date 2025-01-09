<template>
  <section>
    <div class="box">
      <Headers />
      <div class="flex-container">
        <Sidebar class="sidebar" />
        <div class="container">
          <h1>Dashboard</h1>
          <div class="date-filter">
            <label for="startDate" class="filter-label">Data Inicial:</label>
            <input type="date" id="startDate" v-model="startDate" class="date-input" />
            <label for="endDate" class="filter-label">Data Final:</label>
            <input type="date" id="endDate" v-model="endDate" class="date-input" />
            <button @click="filterData" class="filter-button">Filtrar</button>
          </div>
          <div class="container-dashboard">
            <div class="charts-row">
              <ChartSection
                title="Facebook Ads"
                :chart-data="filteredFacebookAdsData"
                chart-component="bar"
              />
              <ChartSection
                title="Usuários de Redes Sociais"
                :chart-data="filteredSocialMediaUsersData"
                chart-component="pie"
              />
            </div>
            <div class="charts-row">
              <ChartSection
                title="Google Ads"
                :chart-data="filteredGoogleAdsData"
                chart-component="bar"
              />
            </div>
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
import ChartSection from "../components/Dashboard/ChartSection.vue";
import { ref } from "vue";

export default {
  components: {
    Headers,
    Sidebar,
    ButtonScroll,
    Footers,
    ChartSection,
  },
  setup() {
    const startDate = ref('');
    const endDate = ref('');
    
    const facebookAdsData = ref({
      labels: ["investimento", "Leads", "Custo por Lead", "CPM", "Impressões"],
      datasets: [
        {
          label: "Valores",
          data: [30, 5, 6, 10, 100],
          backgroundColor: "#42A5F5",
        },
      ],
    });

    const socialMediaUsersData = ref({
      labels: ["Instagram", "Facebook", "TikTok", "Youtube"],
      datasets: [
        {
          label: "Valores",
          data: [30, 5, 6, 10, 100],
          backgroundColor: "#FFA000", // Laranja mais escuro
        },
      ],
    });

    const googleAdsData = ref({
      labels: ["investimento", "Leads", "Custo por Lead", "CPM", "Impressões"],
      datasets: [
        {
          label: "Valores",
          data: [20, 5, 6, 10, 100],
          backgroundColor: "#66BB6A",
        },
      ],
    });

    const filterData = () => {
      // Lógica para filtrar os dados com base nas datas selecionadas
      // Atualizar os dados filtrados conforme necessário
    };

    const filteredFacebookAdsData = ref(facebookAdsData.value);
    const filteredSocialMediaUsersData = ref(socialMediaUsersData.value);
    const filteredGoogleAdsData = ref(googleAdsData.value);

    return {
      startDate,
      endDate,
      filteredFacebookAdsData,
      filteredSocialMediaUsersData,
      filteredGoogleAdsData,
      filterData,
    };
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: row; /* Alterado para row para que o sidebar e o conteúdo fiquem lado a lado */
  align-items: stretch;
}

.container {
  padding: 20px;
  max-width: 100%;
  flex-grow: 1;
  background-color: var(--binance-black);
}

.sidebar {
  height: 145vh;
  flex: 0 0 250px; /* Largura fixa para a sidebar */
}

h1 {
  font-family: "Lato", sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--binance-white);
  padding-left: 30px;
}

.charts-row {
  display: flex;
  justify-content: space-between;
}

.date-filter {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.filter-label {
  color: var(--binance-white);
  margin-right: 10px;
}

.date-input {
  padding: 5px;
  border-radius: 5px;
  margin-right: 10px;
  background-color: #616161;
  color: var(--binance-white);
}

.filter-button {
  padding: 5px 10px;
  background-color: var(--binance-yellow);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: var(--binance-black);
  font-weight: bold;
}

.filter-button:hover {
  background-color: var(--binance-white);
  color: var(--binance-black);
}
</style>
