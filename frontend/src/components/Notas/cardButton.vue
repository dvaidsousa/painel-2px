<template>
    <div class="card-button">
      <button class="card-button-item" @click="$emit('openPopup')" aria-label="Adicionar nota">
        <p class="plus-sign">+</p>
      </button>
    </div>
  </template>
  
  <style scoped>
  .card-button {
    border: 1px dashed #fafafa86; /* Borda pontilhada */
    border-radius: 12px;
    width: 200px; /* Tamanho do botão */
    height: 200px;
    padding: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--binance-black3);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .card-button-item {
    width: 100%;
    height: 100%;
    font-size: 3rem; /* Tamanho do símbolo '+' */
    color: #ffffff;
    background: transparent;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .plus-sign {
    margin: 0; /* Remove margens */
    line-height: 1; /* Centraliza verticalmente */
  }
  
  .card-button-item:hover {
    transform: scale(1.05); /* Efeito de zoom ao passar o mouse */
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
  
  .card-button-item:focus {
    outline: none; /* Remove o contorno padrão ao focar */
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.4); /* Adiciona um foco visível */
  }
  </style>
  