<template>
  <section>
    <div class="box">
      <Headers />
      <div style="display: flex;">
        <Sidebar style="height: 84vh;" />
        <div class="container">
          <h1>PERFIL DO USUÁRIO</h1>
          <p><strong>Nome do Responsável:</strong> {{ userData.responsavel || 'Não disponível' }}</p>
          <p><strong>Nome da Empresa:</strong> {{ userData.nomeEmpresa || 'Não disponível' }}</p>
          <p><strong>Email:</strong> {{ userData.email || 'Não disponível' }}</p>
          <p><strong>Telefone:</strong> {{ userData.telefone || 'Não disponível' }}</p>
          <br />
          <h2>O dashboard aceita somente 1 código, para adicionar outro, clique em excluir.</h2>
          <div class="iframe-container">
            <label for="iframeInput" class="iframe-label"><strong>Código do Dashboard:</strong></label>
            <input type="text" id="iframeInput" v-model="iframeCode" placeholder="Cole o código do iframe aqui" class="iframe-input" />
            <button @click="addDashboard" class="submit-button">Adicionar</button>
            <button @click="deleteAllDashboards" class="delete-button">Excluir</button>
          </div>
        </div>
      </div>
      <Footers />
    </div>
  </section>
</template>

<script>
import Headers from "../components/Global/Headers.vue";
import Sidebar from "../components/Global/Sidebar.vue";
import Footers from "../components/Global/Footers.vue";
import { getUserData } from '../services/userService'; // Importando a função do serviço
import { createDashboard, checkExistingDashboard, deleteAllDashboards } from '../services/dashboard'; // Removendo deleteDashboard
import { useToast } from 'vue-toastification'; // Importando a função correta

export default {
  components: {
    Headers,
    Sidebar,
    Footers,
  },
  data() {
    return {
      userData: {
        responsavel: null,
        nomeEmpresa: null,
        email: null,
        telefone: null,
      },
      iframeCode: '', // Adicionando a propriedade iframeCode
    };
  },
  async mounted() {
    document.title = "Perfil - Painel 2px";
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token não encontrado.');
        return;
      }

      // Chama o endpoint sem precisar do ID
      this.userData = await getUserData(token);
    } catch (error) {
      console.error('Erro ao buscar os dados do usuário:', error);
    }
  },
  methods: {
    async addDashboard() {
      const Toast = useToast(); // Inicializando o Toast
      try {
        // Verifica se já existe um iframe para o usuário
        const existingDashboard = await checkExistingDashboard(this.userData.id); // Função para verificar o banco de dados
        if (existingDashboard) {
          Toast.error('Você já adicionou um dashboard.'); // Notificação de erro
          return;
        }

        await createDashboard(this.iframeCode);
        Toast.success('Dashboard adicionado com sucesso!'); // Notificação de sucesso
      } catch (error) {
        Toast.error('Erro ao adicionar o dashboard.'); // Notificação de erro
      }
    },
    async deleteAllDashboards() {
      const Toast = useToast(); // Inicializando o Toast
      try {
        await deleteAllDashboards(this.userData.id); // Atualizando para usar deleteAllDashboards
        Toast.success('Dashboard deletados com sucesso!'); // Notificação de sucesso
      } catch (error) {
        console.error('Erro ao deletar os dashboards:', error); // Log do erro
        Toast.error('Erro ao deletar os dashboards.'); // Notificação de erro
      }
    },
  },
};
</script>

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

p {
  font-size: 16px;
  font-weight: 200;
  color: var(--binance-white);
  margin-bottom: 10px;
}

.upload-container {
  margin-bottom: 20px;
}

.upload-label {
  cursor: pointer;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.iframe-label {
  font-size: 16px;
  font-weight: 200;
  color: var(--binance-white);
  margin-bottom: 10px;
}

.iframe-input {
  width: 30%;
  padding: 10px;
  border: 1px solid var(--binance-white);
  border-radius: 5px;
  background-color: #f1f1f1;
  color: var(--binance-black);
  font-size: 16px;
  margin-left: 20px;
}

.iframe-input::placeholder {
  color: var(--binance-light-gray);
}

h2 {
  font-size: 16px;
  font-weight: 200;
  color: var(--binance-white);
  margin-bottom: 10px;
}

.submit-button {
  margin-left: 20px;
  padding: 10px 15px;
  background-color: var(--binance-blue);
  color: var(--binance-white);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: var(--binance-blue-hover);
}

.delete-button {
  margin-left: 20px;
  padding: 10px 15px;
  background-color: var(--binance-red);
  color: var(--binance-white);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: var(--binance-red-hover);
}
</style>
