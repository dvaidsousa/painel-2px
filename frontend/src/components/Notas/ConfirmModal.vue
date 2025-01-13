<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal">
        <h3>Confirmação</h3>
        <p>Você tem certeza que deseja excluir esta nota?</p>
        <div class="button-group">
          <button @click="handleConfirm" class="confirm-button">Confirmar</button>
          <button @click="handleCancel" class="cancel-button">Cancelar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
    },
    emits: ['confirm', 'cancel'],
    setup(props, { emit }) {
      const handleConfirm = () => {
        emit('confirm');
      };
  
      const handleCancel = () => {
        emit('cancel');
      };
  
      return {
        handleConfirm,
        handleCancel,
      };
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
  }
  
  .modal {
    background: #F8F8F8;
    color: #1f1f1f;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    text-align: center;
    max-width: 400px;
    width: 90%;
  }
  
  .button-group {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  
  .confirm-button, .cancel-button {
    background: transparent;
    border: 2px solid #a3a3a3;
    color: #1f1f1f;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .confirm-button:hover {
    background: #58b95c;
    border-color: #58b95c;
  }
  
  .cancel-button:hover {
    background: #df4b4b;
    border-color: #df4b4b;
  }
  </style>
  