<script>
import Headers from "../components/Global/Headers.vue";
import Sidebar from "../components/Global/Sidebar.vue";
import Footers from "../components/Global/Footers.vue";
import axios from 'axios'; // Importando axios para requisições HTTP

export default {
  components: {
    Headers,
    Sidebar,
    Footers,
  },
  data() {
    return {
      nomeResponsavel: '',
      nomeEmpresa: '',
      email: '',
      telefone: '',
      imagemPerfil: null, // Adicionando a variável para a imagem de perfil
      imagemFile: null, // Variável para armazenar o arquivo da imagem
      userId: this.$route.params.id // Armazenando o ID do usuário
    };
  },
  mounted() {
    document.title = "Perfil - Painel 2px";
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get(`/api/auth/user/${this.userId}`); // Buscando dados do usuário
        const userData = response.data;
        this.nomeResponsavel = userData.responsavel;
        this.nomeEmpresa = userData.nomeEmpresa;
        this.email = userData.email;
        this.telefone = userData.telefone;
        this.imagemPerfil = userData.perfilImagem; // Definindo a imagem de perfil
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.imagemFile = file; // Armazena o arquivo da imagem para upload
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagemPerfil = e.target.result; // Pré-visualização local
        };
        reader.readAsDataURL(file); // Lê o arquivo como URL de dados
      }
    },
    async uploadImage() {
      if (!this.userId) {
        console.error('ID do usuário não encontrado.'); // Adicionando verificação para userId
        return;
      }

      const formData = new FormData();
      formData.append('perfilImagem', this.imagemFile); // Adiciona o arquivo da imagem ao FormData

      try {
        const response = await axios.put(`/api/auth/user/${this.userId}/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('Imagem de perfil atualizada com sucesso!');
        this.imagemPerfil = response.data.perfilImagem; // Atualiza o estado com a imagem salva
      } catch (error) {
        console.error('Erro ao atualizar imagem de perfil:', error);
      }
    }
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
          <h1>PERFIL DO USUÁRIO</h1>
          <div class="upload-container" style="display: flex; justify-content: center; align-items: center;">
            <label class="upload-label">
              <input type="file" @change="handleImageUpload" accept="image/*" class="upload-input" />
              <span class="upload-icon">📷</span>
            </label>
          </div>
          <div v-if="imagemPerfil" style="display: flex; justify-content: center;">
            <img 
              :src="imagemPerfil.startsWith('data:image') ? imagemPerfil : 'data:image/jpeg;base64,' + imagemPerfil" 
              alt="Imagem de Perfil" 
              class="profile-image" 
            />
          </div>
          <p><strong>Nome do Responsável:</strong> {{ nomeResponsavel }}</p>
          <p><strong>Nome da Empresa:</strong> {{ nomeEmpresa }}</p>
          <p><strong>Email:</strong> {{ email }}</p>
          <p><strong>Telefone:</strong> {{ telefone }}</p>
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

p {
  font-size: 16px;
  font-weight: 200;
  color: var(--binance-white);
  margin-bottom: 10px;
}

.upload-container {
  border: 2px dashed #9f9f9f;
  border-radius: 5px;
  width: 130px;
  height: 130px;
  padding: 10px;
  margin-bottom: 20px;
}

.upload-container:hover {
  border-color: var(--binance-white);
}

.upload-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: var(--binance-gray);
}

.upload-input {
  display: none; /* Esconde o input original */
