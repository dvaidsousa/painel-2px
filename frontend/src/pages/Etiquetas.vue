<script>
import Headers from "../components/Global/Headers.vue";
import Sidebar from "../components/Global/Sidebar.vue";
import ExampleEtiqueta from "../components/Etiquetas/ExampleEtiqueta.vue";
import ButtonScroll from "../components/Global/ButtonScroll.vue";
import Footers from "../components/Global/Footers.vue";
import ConfirmModalEtiqueta from "../components/Etiquetas/ConfirmModalEtiqueta.vue";
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { listarEtiquetas, criarEtiqueta, excluirEtiqueta } from '@/services/etiquetasService';

export default {
  components: {
    Headers,
    Sidebar,
    ExampleEtiqueta,
    ButtonScroll,
    Footers,
    ConfirmModalEtiqueta,
  },
  setup() {
    const toast = useToast();
    const etiquetas = ref([]);
    const newEtiqueta = ref('');
    const selectedColor = ref('#FFA500'); // Cor laranja
    const isEtiquetaValid = ref(false);
    const isModalVisible = ref(false);
    const selectedEtiquetaIndex = ref(null);

    const fetchEtiquetas = async () => {
      try {
        etiquetas.value = await listarEtiquetas();
      } catch (error) {
        toast.error('Erro ao carregar etiquetas');
      }
    };

    const addEtiqueta = async () => {
      if (etiquetas.value.length >= 20) {
        toast.error('Você atingiu o limite máximo de 20 etiquetas');
        return;
      }
      try {
        const token = localStorage.getItem('token');
        const userId = JSON.parse(atob(token.split('.')[1])).id;
        const novaEtiqueta = await criarEtiqueta({
          name: newEtiqueta.value,
          color: selectedColor.value,
          userId: userId
        });

        etiquetas.value.push(novaEtiqueta);
        toast.success('Etiqueta criada com sucesso');
        
        // Limpar campos
        newEtiqueta.value = '';
        selectedColor.value = '#FFA500'; // Cor laranja
      } catch (error) {
        toast.error(error.message);
      }
    };

    const confirmDelete = (index) => {
      selectedEtiquetaIndex.value = index;
      isModalVisible.value = true;
    };

    const deleteEtiqueta = async () => {
      try {
        const etiquetaId = etiquetas.value[selectedEtiquetaIndex.value].id;
        await excluirEtiqueta(etiquetaId);
        
        etiquetas.value.splice(selectedEtiquetaIndex.value, 1);
        toast.success('Etiqueta excluída com sucesso');
        isModalVisible.value = false;
      } catch (error) {
        toast.error(error.message);
      }
    };

    const validateEtiqueta = () => {
      const value = newEtiqueta.value;
      const hasValidLength = value.length <= 12;
      const uppercaseCount = (value.match(/[A-Z]/g) || []).length;
      const hasValidUppercase = uppercaseCount <= 2;

      isEtiquetaValid.value = hasValidLength && hasValidUppercase;
    };

    const handleInput = (event) => {
      let value = event.target.value;
      const uppercaseCount = (value.match(/[A-Z]/g) || []).length;
      if (uppercaseCount > 2) {
        value = value.slice(0, -1);
      }
      event.target.value = value;
      newEtiqueta.value = value;
      validateEtiqueta();
    };

    onMounted(fetchEtiquetas);

    return {
      etiquetas,
      newEtiqueta,
      selectedColor,
      addEtiqueta,
      deleteEtiqueta,
      isEtiquetaValid,
      validateEtiqueta,
      handleInput,
      isModalVisible,
      confirmDelete,
      selectedEtiquetaIndex,
    };
  }
};
</script>

<template>
  <section>
    <div class="box">
      <Headers />
      <div style="display: flex;">
        <Sidebar style="height: 84vh;" />
        <div class="container">
          <h1>Etiquetas / Categorias</h1>
          <div class="container-etiquetas">
            <!-- Formulário para criar etiquetas -->
            <div class="etiqueta-form">
              <input
                v-model="newEtiqueta"
                type="text"
                placeholder="Nome da etiqueta"
                class="input-field"
                maxlength="12"
                @input="handleInput"
              />
              <div class="color-picker-container">
                <input
                  v-model="selectedColor"
                  type="color"
                  class="color-picker"
                />
              </div>
              <button @click="addEtiqueta" class="action-button" :disabled="!isEtiquetaValid || etiquetas.length >= 20">
                Criar Etiqueta
              </button>
            </div>

            <!-- Mostrar etiquetas criadas -->
            <div>
              <h2>Etiquetas Criadas</h2>
              <ul class="etiquetas-list-horizontal">
                <li v-if="etiquetas.length === 0" class="etiqueta-item">
                  <h6>Crie sua primeira etiqueta</h6>
                </li>
                <li
                  v-for="(etiqueta, index) in etiquetas"
                  :key="index"
                  :style="{ backgroundColor: etiqueta.color }"
                  class="etiqueta-item-horizontal"
                >
                  <span class="etiqueta-name-created">{{ etiqueta.name }}</span>
                  <div class="delete-button-container">
                    <button @click="confirmDelete(index)" class="delete-button">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Modal de confirmação -->
            <ConfirmModalEtiqueta 
              :visible="isModalVisible" 
              @confirm="deleteEtiqueta" 
              @cancel="isModalVisible = false" 
            />

            <!-- Exemplos de etiquetas -->
            <ExampleEtiqueta />
          </div>
        </div>
      </div>
      <ButtonScroll />
      <Footers />
    </div>
  </section>
</template>

<style scoped>
.container {
  background-color: var(--binance-black);
  padding: 20px 70px;
}

.container-etiquetas {
  margin-left: -20px;
}

h1 {
  font-family: 'Lato', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--binance-white);
  margin-bottom: 20px;
}

h2 {
  font-family: 'Lato', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: var(--binance-white);
  margin-bottom: 10px;
  margin-left: 20px;
}

h6 {
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: var(--binance-white);
  font-style: italic;
}

span {
  font-size: 16px;
  font-weight: 400;
  color: var(--binance-white);
  font-style: italic;
}

.etiqueta-form {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  width: 40%;
}

.input-field {
  flex: 1;
  padding: 8px 10px;
  background-color: var(--binance-black-input);
  color: var(--binance-white);
  box-shadow: 0 1px 1px rgba(141, 141, 141, 0.233);
  border-radius: 4px;
}

.color-picker-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.color-picker {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
}

.color-picker::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-picker::-webkit-color-swatch {
  border: none;
  border-radius: 50%;
}

.color-picker-label {
  font-size: 14px;
  color: var(--binance-white);
}

.action-button {
  background-color: var(--binance-blue);
  color: var(--binance-white);
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 5px;
  transition: background-color 0.3s ease;
}

.etiquetas-list-horizontal {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 30px;
  width: 60%;
}

.etiqueta-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  color: var(--binance-white);
}

.etiqueta-item-horizontal {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  color: var(--binance-white);
  width: 150px;
  position: relative;
}

.etiqueta-name-created {
  position: relative;
  right: 20px;
}

.delete-button-container {
  position: absolute;
  top: 5px;
  right: 10px;
}

.delete-button {
  font-size: 20px;
  cursor: pointer;
  color: var(--binance-red);
}
</style>
