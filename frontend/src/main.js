import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import { createPinia } from 'pinia';
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

// Importando o Chart.js se necessário
import { Chart as ChartJS, registerables } from 'chart.js';

// Registrando os componentes do Chart.js
ChartJS.register(...registerables);

import './styles/index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

const app = createApp(App);

app.use(router);
app.use(createPinia());

const options = {
  position: POSITION.TOP_RIGHT,
};

app.use(Toast, options);

app.mount('#app');
