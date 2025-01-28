<template>
    <div class="popup-form">
      <div class="popup-content">
        <h2>Criar Nota</h2>
        <form @submit.prevent="submitForm">
          <div v-if="step === 1">
            <div class="form-group">
              <label for="goalName">Nome da Nota:</label>
              <input
                type="text"
                id="goalName"
                v-model="goalName"
                required
                placeholder="Digite o nome da nota"
              />
            </div>
            <div class="form-group">
              <label for="goalValue">Descrição:</label>
              <input
                type="text"
                id="goalValue"
                v-model="goalValue"
                required
                placeholder="Digite a descrição da nota"
              />
            </div>
            <div class="button-group">
              <button type="button" class="close-button" @click="$emit('close')">Fechar</button>
              <button type="submit" class="submit-button" :disabled="isSubmitting">Criar Nota</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { criarNota } from '@/services/notaService';
  
  export default {
    data() {
      return {
        step: 1,
        goalName: '',
        goalValue: '',
        isSubmitting: false,
        successMessage: '', // Adicionando uma propriedade para armazenar mensagens de sucesso
      };
    },
    methods: {
      // Submete o formulário
      async submitForm() {
        if (this.isSubmitting) return; // Previne múltiplas submissões
        this.isSubmitting = true;
        const goalData = {
          name: this.goalName,
          descricao: this.goalValue,
        };
        try {
          await criarNota(goalData);
          this.successMessage = 'Nota criada com sucesso!'; // Mensagem de sucesso
          this.$emit('close'); // Fecha o popup após a criação
          this.$emit('notaCreated'); // Emite um evento para atualizar a lista de notas
        } catch (error) {
          console.error('Erro ao criar nota:', error);
          alert('Erro ao criar nota: ' + (error.response?.data?.error || 'Erro desconhecido'));
        } finally {
          this.isSubmitting = false;
        }
      },
  
      // Reseta o formulário
      resetForm() {
        this.step = 1;
        this.goalName = '';
        this.goalValue = '';
        this.successMessage = ''; // Reseta a mensagem de sucesso
      },
    },
  };
  </script>  
  
  <style scoped>
  .popup-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7); /* Leve aumento na opacidade */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup-content {
    background-color: var(--binance-black3);
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    width: 90%;
    max-width: 400px;
  }
  
  h2 {
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: var(--binance-white);
    margin-bottom: 20px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    color: var(--binance-white);
  }
  
  input {
    background-color: var(--binance-black-input);
    width: 100%;
    padding: 12px;
    border: 1px solid var(--binance-black-input);
    border-radius: 6px;
    font-size: 16px;
    color: var(--binance-white);
    transition: border-color 0.3s;
  }
  
  input:focus {
    border-color: var(--binance-white);
    outline: none;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
  }
  
  .submit-button,
  .close-button {
    border: none;
    border-radius: 8px;
    padding: 10px 15px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s ease;
  }
  
  .submit-button {
    background-color: var(--binance-blue);
    color: var(--binance-white);
  }
  
  .submit-button:hover {
    background-color: var(--binance-blue-hover);
  }
  
  .close-button {
    background-color: var(--binance-red);
    color: var(--binance-white);
  }
  
  .close-button:hover {
    background-color: var(--binance-red-hover);
  }
  </style>