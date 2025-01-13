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
</style>
