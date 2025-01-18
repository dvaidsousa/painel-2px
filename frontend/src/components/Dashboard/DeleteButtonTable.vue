<template>
    <div>
      <button class="delete-button" @click="confirmarExclusao">
        Excluir
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      linhaId: {
        type: Number,
        required: true,
      },
      onConfirmarExclusao: {
        type: Function,
        required: true
      }
    },
    methods: {
      async confirmarExclusao() {
        try {
          const response = await fetch(`http://localhost:3000/api/financas/deletar/${this.linhaId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Erro ao excluir no banco de dados');
          }
  
          if (response.status === 204) {
            this.onConfirmarExclusao(this.linhaId);
            this.$toast.success('Linha deletada com sucesso.');
          }
        } catch (error) {
          console.error('Erro ao excluir:', error);
          this.$toast.error('Erro ao excluir a linha.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .delete-button {
    background-color: #ff4c4c;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .delete-button:hover {
    background-color: #ff2d2d;
  }
  </style>