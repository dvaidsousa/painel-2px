<template>
    <div class="goal-display">
      <h3>{{ goalData.name || 'Nota sem nome' }}</h3>
      <div class="goal-details">
        <p>
          <strong>Descrição: </strong>
          <span class="goal-description">{{ goalData.descricao || 'Descrição não disponível' }}</span>
        </p>
      </div>
      <div class="button-group">
        <button class="icon-button" @click="openConfirmModal" title="Excluir">
          <i class="fa fa-trash" style="color: red; font-size: 20px; margin-left: 5px; margin-top: 15px;"></i>
        </button>
      </div>
    </div>
    <ConfirmModal
        :visible="isConfirmModalVisible"
        @confirm="handleDeleteConfirm"
        @cancel="handleDeleteCancel"
      />
</template>

<script>
import ConfirmModal from './ConfirmModal.vue';
import { deletarNota } from '@/services/notaService';

export default {
  props: {
    goalData: {
      type: Object,
      required: true,
    },
  },
  components: {
    ConfirmModal,
  },
  data() {
    return {
      isConfirmModalVisible: false,
    };
  },
  methods: {
    openConfirmModal() {
      this.isConfirmModalVisible = true;
    },
    async handleDeleteConfirm() {
      try {
        await deletarNota(this.goalData.id);
        this.$emit('notaDeleted', this.goalData.id);
        this.isConfirmModalVisible = false;
      } catch (error) {
        console.error('Erro ao deletar nota:', error);
        alert('Erro ao deletar nota: ' + (error.response?.data?.error || 'Erro desconhecido'));
      }
    },
    handleDeleteCancel() {
      this.isConfirmModalVisible = false;
    },
  },
};
</script>

<style scoped>
.goal-display {
  border: 2px solid #fafafa86;
  border-radius: 12px;
  background-color: var(--binance-black3);
  padding: 20px;
  width: 100%;
  max-width: 300px;
  margin: 60px 20px 40px 0px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
  animation: fadeIn 0.5s ease;
}

h3 {
  font-family: 'Lato', sans-serif;
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.goal-details {
  border: 1px solid #fafafa47;
  border-radius: 8px;
  padding: 15px;
  margin-top: 10px;
  background-color: var(--binance-black);
}

p {
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  color: #e8e8e8;
  margin-bottom: 8px;
}

.goal-description {
  font-weight: 500;
  color: #ffffff;
}

.goal-display:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.5);
}
</style>