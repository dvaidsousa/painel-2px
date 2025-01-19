<template>
  <section class="section-container">
    <div class="container">
      <img src="../assets/logo-nof.png" alt="Logo" class="logo">
      <div class="header">
        <h2 class="title">Redefinir Senha</h2>
        <p class="subtitle">Digite sua nova senha abaixo</p>
      </div>
      <div class="form-wrapper">
        <div class="form-container">
          <div class="form-content">
            <form @submit.prevent="resetPassword">
              <div class="form-group">
                <div>
                  <label for="newPassword" class="label"> Nova Senha </label>
                  <div class="input-wrapper">
                    <input
                      v-model="newPassword"
                      type="password"
                      id="newPassword"
                      placeholder="Digite sua nova senha"
                      class="input"
                      required
                    />
                  </div>
                </div>
                <div>
                  <button type="submit" class="submit-button">
                    Redefinir Senha
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { redefinirSenha } from '../services/senhaService';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      newPassword: '',
    };
  },
  methods: {
    async resetPassword() {
      const token = this.$route.params.token; // Captura o token da rota
      if (this.newPassword.length < 6) {
        this.showToast('A nova senha deve ter pelo menos 6 caracteres.', 'error');
        return;
      }
      try {
        await redefinirSenha(token, this.newPassword);
        this.showToast('Senha redefinida com sucesso!');
        this.$router.push('/'); // Redireciona para a página de login
      } catch (error) {
        this.showToast(error.message, 'error');
      }
    },
    showToast(message, type = 'success') {
      const toast = useToast();
      toast[type](message, {
        position: 'top-right',
        timeout: 3000,
      });
    },
  },
};
</script>

<style scoped>
.section-container {
  padding: 2.5rem 0;
  margin: 0 auto;
  height: 100vh;
  background-color: var(--binance-black);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 90px;
  margin: 0 auto;
}

.header {
  padding-top: 1rem;
  margin: 0 auto;
  text-align: center;
}

.title {
  font-size: 2.2rem;
  font-family: 'Lato', sans-serif;
  font-weight: bold;
  color: var(--binance-white);
}

.subtitle {
  font-family: 'Lato', sans-serif;
  max-width: 480px;
  margin: 0 auto;
  font-size: 1.25rem;
  color: var(--binance-white);
}

.form-wrapper {
  position: relative;
  max-width: 448px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 0.3px solid #5d5d5d;
  margin: 1.5rem auto 0;
  border-radius: 0.5rem;
}

.form-container {
  overflow: hidden;
  background-color: var(--binance-black);
  border-radius: 0.5rem;
  border: 1px solid #f8f8f868;
}

.form-content {
  padding: 2rem 1.5rem;
}

.form-group {
  display: grid;
  gap: 1.5rem;
}

.label {
  font-size: 1rem;
  font-weight: 500; 
  color: var(--binance-white);
  font-family: 'Lato', sans-serif;
}

.input-wrapper {
  position: relative;
  color: var(--binance-white);
}

.input {
  font-family: 'Lato', sans-serif;
  width: 100%;
  padding: 1rem 0.75rem;
  color: var(--binance-white);
  background-color: var(--binance-black3);
  border: 1px solid #474D57;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.input:focus {
  outline: none;
  border-color: var(--binance-yellow);
  caret-color: var(--binance-yellow);
}

.submit-button {
  display: block;
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  color: var(--binance-black);
  background-color: var(--binance-red);
  border: none;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.submit-button:hover,
.submit-button:focus {
  background-color: var(--binance-red-hover);
}

.text-base {
  font-family: 'Lato', sans-serif;
  color: var(--binance-white);
}

.link {
  color: #e03d3d;
  text-decoration: none;
}
</style>
