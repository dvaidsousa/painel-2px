<template>
  <section class="section-container">
    <div class="container">
      <img src="../assets/logo-nof.png" alt="Logo" class="logo">
      <div class="header">
        <h2 class="title">Painel do cliente</h2>
      </div>

      <div class="form-wrapper">
        <div class="form-container">
          <div class="form-content">
            <form @submit.prevent="login">
              <div class="form-group">
                <div>
                  <label for="email" class="label"> Endereço de Email </label>
                  <div class="input-wrapper">
                    <div class="icon">
                      <i class="fa-solid fa-at"></i>
                    </div>
                    <input
                      v-model="email"
                      type="email"
                      id="email"
                      placeholder="Digite seu email para começar"
                      class="input"
                      required
                      autocomplete="email"
                    />
                  </div>
                </div>

                <div>
                  <div class="flex-container">
                    <label for="password" class="label"> Senha </label>
                    <a href="/recuperar-senha" title="" class="link"> Esqueceu a senha? </a>
                  </div>
                  <div class="input-wrapper">
                    <div class="icon">
                      <i class="fa-solid fa-unlock"></i>
                    </div>
                    <input
                      v-model="password"
                      type="password"
                      id="password"
                      placeholder="Digite sua senha"
                      class="input"
                      required
                      autocomplete="current-password"
                    />
                  </div>
                </div>

                <div>
                  <button type="submit" class="submit-button">
                    Acessar
                  </button>
                </div>

                <div class="text-center">
                  <p class="text-base">Não tem uma conta? <a href="/register" title="" class="link">Criar minha conta</a></p>
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
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return { email: '', password: '' };
  },
  methods: {
    showToast(message, type = 'success') {
      const toast = useToast();
      toast[type](message, {
        position: 'top-right',
        timeout: 3000,
      });
    },
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('token', response.data.token);
        this.showToast('Login realizado com sucesso!');
        this.$router.push('/dashboard');
      } catch (error) {
        this.showToast('Erro ao fazer login.', 'error');
      }
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

.input-wrapper:focus-within {
  color: var(--binance-white);
}

.icon {
  position: absolute;
  inset-y: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding-left: 0.75rem;
  pointer-events: none;
  top: 33%;
  font-size: 1.2rem; /* Aumenta o tamanho do ícone */
}

.input {
  font-family: 'Lato', sans-serif;
  width: 100%;
  padding: 1rem 0.75rem 1rem 2.5rem;
  color: var(--binance-white); /* Preto Binance */
  background-color: var(--binance-black3); /* Cinza Escuro */
  border: 1px solid #474D57; /* Cinza Médio */
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.input:focus {
  outline: none;
  border-color: var(--binance-red);
  caret-color: var(--binance-red);
}

.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #bdbec0;
  transition: all 0.2s;
}

.link:hover,
.link:focus {
  color: #bdbec0;
  text-decoration: underline;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 0.6rem;
  font-size: 1rem;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  color: var(--binance-white); /* Preto Binance */
  background-color: var(--binance-red); /* Amarelo Binance */
  border: none;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.submit-button:hover,
.submit-button:focus {
  background-color: var(--binance-red);
}

.text-base {
  font-family: 'Lato', sans-serif;
  color: var(--binance-white);
}
</style>
