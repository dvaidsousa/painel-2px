<template>
  <div class="table-container">
    <div v-if="isLoading" class="spinner-container">
      <div class="spinner"></div>
    </div>
    <div class="header-container">
      <div class="items-per-page-selector">
        <label for="itemsPerPage">Itens por página:</label>
        <select v-model="itemsPerPage" id="itemsPerPage">
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
    </div>

    <div class="tables-container">
      <div class="table-receber">
        <h2>Contas a Receber</h2>
        <table class="contas-table" v-if="!isLoading">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor</th>
              <th>Data de Vencimento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in contasReceber"
              :key="item.id || index"
            >
              <td>{{ item.nome }}</td>
              <td :style="{ color: '#3cca3c' }">R$ {{ formatarValor(item.valor) }}</td>
              <td>{{ item.dataVencimento }}</td>
              <td>
                <button class="icon-button" @click="abrirPopup(item)" title="Editar">
                  <i class="fa fa-edit"></i>
                </button>
                <button class="icon-button" @click="abrirModalConfirmacao(item.id)" title="Excluir">
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button @click="prevPageReceber" :disabled="currentPageReceber === 1">Atrás</button>
          <span>Página {{ currentPageReceber }} de {{ totalPagesReceber }}</span>
          <button @click="nextPageReceber" :disabled="currentPageReceber === totalPagesReceber">Próx</button>
        </div>
      </div>

      <div class="table-pagar">
        <h2>Contas a Pagar</h2>
        <table class="contas-table" v-if="!isLoading">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor</th>
              <th>Data de Vencimento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in contasPagar"
              :key="item.id || index"
            >
              <td>{{ item.nome }}</td>
              <td :style="{ color: '#ec1b1b' }">R$ {{ formatarValor(item.valor) }}</td>
              <td>{{ item.dataVencimento }}</td>
              <td>
                <button class="icon-button" @click="abrirPopup(item)" title="Editar">
                  <i class="fa fa-edit"></i>
                </button>
                <button class="icon-button" @click="abrirModalConfirmacao(item.id)" title="Excluir">
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button @click="prevPagePagar" :disabled="currentPagePagar === 1">Atrás</button>
          <span>Página {{ currentPagePagar }} de {{ totalPagesPagar }}</span>
          <button @click="nextPagePagar" :disabled="currentPagePagar === totalPagesPagar">Próx</button>
        </div>
      </div>
    </div>

    <ConfirmModal 
      :visible="modalVisivel" 
      @confirm="deletarLinha" 
      @cancel="fecharModalConfirmacao" 
    />

    <EditTable
      :linha="linhaEditada"
      :isVisible="popupVisivel"
      @salvar-edicao="salvarEdicao"
      @fechar-popup="fecharPopup"
      @atualizar-tabela="atualizarTabela"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import EditTable from './EditButtonTable.vue';
import ConfirmModal from '../ControleContas/ConfirmModal.vue';
import { editarLinha, deletarLinha as deletarLinhaAPI, listarContas } from '../../services/contasService';
import { useToast } from 'vue-toastification';

export default {
  components: {
    EditTable,
    ConfirmModal,
  },
  props: {
    tabelaDados: {
      type: Array,
      default: () => [],
      required: true,
    },
    atualizarTabela: {
      type: Function,
      required: true,
    },
    linhaId: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const toast = useToast();
    const isLoading = ref(false);
    const popupVisivel = ref(false);
    const linhaEditada = ref(null);
    const modalVisivel = ref(false);
    const linhaParaDeletar = ref(null);
    const currentPageReceber = ref(1);
    const currentPagePagar = ref(1);
    const itemsPerPage = ref(15);

    const contasReceber = computed(() => {
      return props.tabelaDados.filter(item => item.tipo === 'Receber');
    });

    const contasPagar = computed(() => {
      return props.tabelaDados.filter(item => item.tipo === 'Pagar');
    });

    const totalPagesReceber = computed(() => {
      return Math.ceil(contasReceber.value.length / itemsPerPage.value);
    });

    const totalPagesPagar = computed(() => {
      return Math.ceil(contasPagar.value.length / itemsPerPage.value);
    });

    const nextPageReceber = () => {
      if (currentPageReceber.value < totalPagesReceber.value) {
        currentPageReceber.value++;
      }
    };

    const prevPageReceber = () => {
      if (currentPageReceber.value > 1) {
        currentPageReceber.value--;
      }
    };

    const nextPagePagar = () => {
      if (currentPagePagar.value < totalPagesPagar.value) {
        currentPagePagar.value++;
      }
    };

    const prevPagePagar = () => {
      if (currentPagePagar.value > 1) {
        currentPagePagar.value--;
      }
    };

    const abrirPopup = (linha) => {
      if (!linha?.id) {
        console.error('Erro: linha ou linha.id está indefinido', linha);
        return;
      }
      linhaEditada.value = { ...linha };
      popupVisivel.value = true;
    };

    const fecharPopup = () => {
      popupVisivel.value = false;
      linhaEditada.value = null;
    };

    const salvarEdicao = async (linhaEditada) => {
      if (!linhaEditada?.id) {
        toast.error('Erro: Dados inválidos.');
        return;
      }

      const { valor, dataVencimento, descricao } = linhaEditada;

      if (!valor || !dataVencimento || !descricao) {
        toast.warning('Por favor, preencha todos os campos.');
        return;
      }

      if (isNaN(valor)) {
        toast.error('O valor deve ser numérico.');
        return;
      }

      try {
        isLoading.value = true;
        const response = await editarLinha(linhaEditada.id, linhaEditada);

        if (response.ok) {
          const dadosAtualizados = await response.json();
          if (props.atualizarTabela) { // Verifica se a função existe antes de chamar
            props.atualizarTabela(dadosAtualizados);
          }
          toast.success('Dados atualizados com sucesso!');
        } else {
          toast.error('Erro ao atualizar os dados.');
        }
      } catch (error) {
        console.error('Erro ao salvar edição:', error);
        toast.error('Erro ao conectar ao servidor.');
      } finally {
        isLoading.value = false;
        fecharPopup();
      }
    };

    const abrirModalConfirmacao = (id) => {
      linhaParaDeletar.value = id;
      modalVisivel.value = true;
    };

    const fecharModalConfirmacao = () => {
      modalVisivel.value = false;
      linhaParaDeletar.value = null;
    };

    const deletarLinha = async () => {
      if (!linhaParaDeletar.value) {
        toast.error('Erro: ID inválido.');
        return;
      }

      try {
        const index = props.tabelaDados.findIndex((item) => item.id === linhaParaDeletar.value);
        if (index !== -1) {
          const idRemovido = linhaParaDeletar.value;
          await deletarLinhaAPI(idRemovido);
          // Atualiza a tabela após a exclusão
          props.atualizarTabela();
          toast.success('Linha removida com sucesso.');
        }
      } catch (error) {
        console.error('Erro ao excluir linha:', error);
        toast.error('Erro ao excluir do banco de dados.');
      } finally {
        fecharModalConfirmacao();
      }
    };

    const fetchContas = async () => {
      try {
        isLoading.value = true;
        const dados = await listarContas();
        if (props.atualizarTabela) { // Verifica se a função existe antes de chamar
          props.atualizarTabela(dados);
        }
      } catch (error) {
        console.error('Erro ao buscar contas:', error);
        toast.error('Erro ao carregar os dados.'); // Mensagem de erro atualizada
      } finally {
        isLoading.value = false;
      }
    };

    const formatarValor = (valor) => {
      const valorNumerico = parseFloat(valor);
      return !isNaN(valorNumerico) ? `${valorNumerico.toFixed(2)}` : 'R$ 0.00';
    };

    onMounted(fetchContas);

    return {
      isLoading,
      popupVisivel,
      linhaEditada,
      modalVisivel,
      linhaParaDeletar,
      abrirPopup,
      fecharPopup,
      salvarEdicao,
      abrirModalConfirmacao,
      fecharModalConfirmacao,
      deletarLinha,
      currentPageReceber,
      currentPagePagar,
      contasReceber,
      contasPagar,
      itemsPerPage,
      formatarValor,
      totalPagesReceber,
      totalPagesPagar,
      nextPageReceber,
      prevPageReceber,
      nextPagePagar,
      prevPagePagar,
    };
  },
};
</script>

<style scoped>
.tables-container {
  display: flex;
  margin: 20px;
}

h2 {
  font-size: 18px;
  font-family: 'Lato', sans-serif; /* Corrigido para incluir aspas */
  margin-bottom: 15px;
  margin-left: 20px;
  color: var(--binance-white);
}

.items-per-page-selector {
  display: flex;
  align-items: center;
}

.items-per-page-selector label {
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  margin: 20px 0px 0px 40px;
  color: var(--binance-white);
}

#itemsPerPage {
  margin: 20px 0px 0px 5px;
  border-radius: 3px;
}

select {
  font-size: 14px;
}

option {
  font-size: 12px;
}

.contas-table {
  width: 520px;
  margin-right: 40px;
  margin-bottom: 10px;
  border-collapse: collapse;
  background-color: var(--binance-white);
  border-radius: 12px;
  overflow: hidden;
}

.contas-table thead {
  background-color: var(--binance-black2);
  color: var(--binance-white);
}

th {
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 14px;
}

.contas-table th, .contas-table td {
  padding: 8px 17px; /* Diminuir a altura das listas da coluna */
  text-align: left;
}

.contas-table tbody tr {
  transition: background-color 0.3s ease;
}

.contas-table th {
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.01rem;
}

/* Estilos para a linha de entrada */
.contas-table tbody tr {
  background-color: var(--binance-black3);
  font-family: 'Lato', sans-serif;
  font-size: 15px;
  color: var(--binance-white);
  border-bottom: 1px solid #585858;
}

.icon-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  transition: transform 0.2s;
}

.icon-button:hover {
  transform: scale(1.1);
}

.icon-button .fa-trash {
  color: #ff4c4c;
  margin-left: 40px;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
}

.pagination button {
  background-color: var(--binance-blue);
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  color: var(--binance-white);
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.pagination button:disabled {
  background-color: #8d8d8d;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
  color: var(--binance-white);
  font-family: 'Lato', sans-serif;
  font-size: 14px;
}
</style>
