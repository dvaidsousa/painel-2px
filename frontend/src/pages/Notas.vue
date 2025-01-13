<template>
    <section>
      <div class="box">
        <Headers />
        <div class="flex-container">
          <Sidebar class="sidebar" />
          <div class="container">
            <h1>Notas</h1>
            <div class="container-notas">
              <div class="goals-horizontal">
                <CardButton class="CardButton" @openPopup="openPopup" />
                <GoalDisplay v-if="goalData" :goalData="goalData" @notaDeleted="removeNota" />
                <GoalDisplay
                  v-for="(nota, index) in notas.slice(1)" 
                  :key="nota.id || index" 
                  :goalData="nota" 
                  @notaDeleted="removeNota"
                />
              </div>
              <PopupForm v-if="isPopupOpen" @close="closePopup" @submit="handleSubmit" @notaCreated="fetchNotas" />
              <div v-if="notas.length > 2" class="goals-horizontal">
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
  import CardButton from "../components/Notas/cardButton.vue";
  import PopupForm from "../components/Notas/PopupForm.vue";
  import GoalDisplay from "../components/Notas/GoalDisplay.vue";
  import ButtonScroll from "../components/Global/ButtonScroll.vue";
  import Footers from "../components/Global/Footers.vue";
  import { criarNota, listarNotas } from '../services/notaService';
  
  export default {
    components: {
      Headers,
      Sidebar,
      CardButton,
      PopupForm,
      GoalDisplay,
      ButtonScroll,
      Footers
    },
    data() {
      return {
        isPopupOpen: false,
        goalData: null,
        notas: [],
        errorMessage: null, // Adicionando uma propriedade para armazenar mensagens de erro
      };
    },
    methods: {
      // Abre o PopupForm
      openPopup() {
        this.isPopupOpen = true;
      },
  
      // Fecha o PopupForm
      closePopup() {
        this.isPopupOpen = false;
      },
  
      // Busca todas as notas do serviço
      async fetchNotas() {
        try {
          this.notas = await listarNotas();
          this.goalData = this.notas[0] || null;
          this.errorMessage = null; // Limpa a mensagem de erro ao buscar com sucesso
        } catch (error) {
          this.errorMessage = error.response?.data?.error || 'Erro inesperado'; // Armazena a mensagem de erro
          console.error('Erro ao listar notas:', this.errorMessage);
        }
      },
  
      // Remove a nota da lista
      removeNota(notaId) {
        this.notas = this.notas.filter(nota => nota.id !== notaId); // Remove a nota da lista
        if (this.goalData && this.goalData.id === notaId) {
          this.goalData = this.notas[0] || null; // Atualiza goalData se a nota excluída era a atual
        }
      }
    },
    mounted() {
      this.fetchNotas();
    }
  };
  </script>
  
  <style scoped>
  .flex-container {
    display: flex;
    flex-direction: row;
  }
  
  .container {
    padding: 20px;
    max-width: 100%;
    background-color: var(--binance-black);
  }

  .CardButton {
    margin: 50px 70px 0px 50px;
  }
  
  h1 {
    font-family: 'Lato', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--binance-white);
    padding-left: 30px;
  }
  
  .goals-horizontal {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  @media (min-width: 768px) {
    .flex-container {
      flex-direction: row;
    }
    .sidebar {
      height: 86vh;
      flex: 0 0 250px;
    }
    .container {
      padding: 20px 40px;
    }
  }
  </style>