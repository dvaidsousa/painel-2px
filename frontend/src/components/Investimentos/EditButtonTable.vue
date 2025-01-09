<template>
  <div v-if="popupVisivel" class="popup">
    <!-- Conteúdo do popup editável -->
    <div class="popup-content">
      <div class="form-group">
        <label>Tipo:</label>
        <select v-model="linhaEditada.tipo" class="input-field">
          <option value="renda fixa">Renda Fixa</option>
          <option value="renda variável">Renda Variável</option>
          <option value="fundos">Fundos</option>
          <option value="criptos">Criptos</option>
          <option value="outros">Outros</option>
        </select>
      </div>
      <div class="form-group">
        <label>Nome:</label>
        <input v-model="linhaEditada.name" type="text" class="input-field" />
      </div>
      <div class="form-group">
        <label>Data de Entrada:</label>
        <input v-model="linhaEditada.dataEntrada" type="date" class="input-field" />
      </div>
      <div class="form-group">
        <label>Saldo:</label>
        <input v-model="linhaEditada.saldo" type="text" class="input-field" />
      </div>
      <div class="button-group">
        <button @click="salvarEdicao" class="action-button-salvar" :disabled="loading">Salvar</button>
        <button @click="fecharPopup" class="action-button-fechar">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';

export default {
  props: {
    linha: Object,
    isVisible: Boolean,
    atualizarTabela: Function,
  },
  setup(props, { emit }) {
    const toast = useToast();
    const linhaEditada = ref({ ...props.linha });
    const popupVisivel = ref(props.isVisible);
    const loading = ref(false);

    const fecharPopup = () => {
      emit('fechar-popup');
    };

    const salvarEdicao = async () => {
      if (!linhaEditada.value.id) {
        toast.error('ID da linha não está definido.');
        return;
      }

      loading.value = true;

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/investimentos/editar/${linhaEditada.value.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(linhaEditada.value),
        });

        if (response.ok) {
          const dadosAtualizados = await response.json();
          emit('atualizar-tabela', dadosAtualizados.data); // Atualiza a tabela com os dados retornados
          fecharPopup();
          toast.success('Dados atualizados com sucesso!');
        } else {
          const errorData = await response.json();
          toast.error(`Erro ao editar os dados: ${errorData.error || 'Erro desconhecido'}`);
        }
      } catch (error) {
        toast.error('Erro de conexão: ' + (error.message || 'Erro desconhecido'));
      } finally {
        loading.value = false;
      }
    };

    watch(() => props.isVisible, (newVal) => {
      popupVisivel.value = newVal;
    });

    watch(() => props.linha, (newVal) => {
      linhaEditada.value = { ...newVal };
    });

    return {
      linhaEditada,
      popupVisivel,
      loading,
      salvarEdicao,
      fecharPopup,
    };
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--binance-black3);
  color: var(--binance-white);
  padding: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  width: 300px;
  backdrop-filter: blur(10px);
}

.popup-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.input-field {
  padding: 10px;
  box-shadow: 0 1px 1px rgba(141, 141, 141, 0.233);
  border-radius: 8px;
  background-color: var(--binance-black-input);
  color: var(--binance-white);
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: var(--binance-green);
  outline: none;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.action-button-salvar {
  background-color: var(--binance-blue);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-button-salvar:hover {
  background-color: var(--binance-blue-hover);
}

.action-button-fechar {
  background-color: var(--binance-red);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-button-fechar:hover {
  background-color: var(--binance-red-hover);
}

.action-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
