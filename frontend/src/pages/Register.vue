<template>
  <section class="section-container">
    <div class="container">
      <img src="../assets/logo-nof.png" alt="Logo" class="logo">
      <div class="header">
        <h2 class="title">Criar minha conta</h2>
        <p class="subtitle">Cadastre-se na <span style="color: #e03d3d;">Painel2px</span> em 2 minutos</p>
      </div>

      <div class="form-wrapper">
        <div class="form-container">
          <div class="form-content">
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <div v-if="step === 1">
                  <label for="email" class="label">Endereço de Email</label>
                  <div class="input-wrapper">
                    <div class="icon">
                      <i class="fa-solid fa-at"></i>
                    </div>
                    <input
                      v-model="email"
                      type="email"
                      id="email"
                      placeholder="Digite seu email"
                      class="input"
                      required
                    />
                  </div>
                  <button type="button" @click="nextStep" class="next-button">Próximo</button>
                  <div class="checkbox-group">
                    <input type="checkbox" v-model="agree" name="agree" id="agree" class="checkbox" />
                    <label for="agree" class="checkbox-label">
                      Eu concordo com os <a href="#" title="" class="link">Termos de Serviço</a> e a <a href="#" title="" class="link">Política de Privacidade</a>
                    </label>
                  </div>
                </div>
                <div class="login-link">
                    <p>Já tem uma conta? <a href="/" class="link">Faça login aqui</a></p>
                  </div>

                <div v-if="step === 2">
                  <div>
                    <label for="username" class="label">Nome de Usuário</label>
                    <div class="input-wrapper">
                      <div class="icon">
                        <i class="fa-solid fa-user"></i>
                      </div>
                      <input
                        v-model="username"
                        id="username"
                        placeholder="Digite seu nome de usuário"
                        class="input"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label for="telefone" class="label">Telefone</label>
                    <div class="input-wrapper">
                      <div class="icon">
                        <i class="fa-solid fa-phone"></i>
                      </div>
                      <input
                        v-model="telefone"
                        type="tel"
                        id="telefone"
                        placeholder="Digite seu telefone"
                        class="input"
                        required
                      />
                    </div>
                  </div>
                  <button type="button" @click="nextStep" class="next-button">Próximo</button>
                  <button type="button" @click="prevStep" class="prev-button">Voltar</button>
                </div>

                <div v-if="step === 3">
                  <div>
                    <label for="password" class="label">Senha</label>
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
                      />
                    </div>
                  </div>

                  <div>
                    <label for="confirmPassword" class="label">Confirme a Senha</label>
                    <div class="input-wrapper">
                      <div class="icon">
                        <i class="fa-solid fa-unlock"></i>
                      </div>
                      <input
                        v-model="confirmPassword"
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirme sua senha"
                        class="input"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <button type="submit" class="submit-button">
                      Criar conta
                    </button>
                  </div>
                  <button type="button" @click="prevStep" class="prev-button">Voltar</button>

                  <p v-if="passwordMismatch" class="error-message">As senhas não coincidem.</p>
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

const toast = useToast();

export default {
  data() {
    return {
      step: 1,
      username: '',
      email: '',
      password: '',
      telefone: '',
      confirmPassword: '',
      passwordMismatch: false,
      errors: {},
      agree: false,
    };
  },
  methods: {
    showToast(message, type = 'success') {
      toast[type](message, {
        position: 'top-right',
        timeout: 3000,
      });
    },
    validatePhone(phone) {
      const phoneRegex = /^\d{10,11}$/; // Exemplo: 10 ou 11 dígitos
      return phoneRegex.test(phone);
    },
    nextStep() {
      if (this.step === 1 && !this.agree) {
        this.showToast('Você deve aceitar os termos de serviço.', 'error');
        return;
      }
      this.step++;
    },
    prevStep() {
      this.step--;
    },
    handleSubmit() {
      if (this.step === 1) {
        this.nextStep();
      } else if (this.step === 2) {
        this.nextStep();
      } else {
        this.register();
      }
    },
    async register() {
      if (!this.validatePhone(this.telefone)) {
        this.showToast('Número de telefone inválido.', 'error');
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.passwordMismatch = true;
        return;
      }

      this.passwordMismatch = false;

      try {
        const response = await axios.post('http://localhost:3000/api/auth/register', {
          username: this.username,
          email: this.email,
          telefone: this.telefone,
          password: this.password,
        });
        this.showToast('Usuário registrado com sucesso!');
        this.$router.push('/');
      } catch (error) {
        if (error.response?.data?.errors) {
          this.errors = error.response.data.errors;
        } else {
          this.showToast('Erro ao registrar usuário.', 'error');
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  margin: 0 auto;
  height: 100vh;
  background-color: var(--binance-black);
}

.logo {
  width: 90px;
  padding-bottom: 15px;
  margin: 0 auto;
}

.header {
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
  font-size: 1.25rem;
  color: var(--binance-white);
}

.form-wrapper {
  width: 90%; /* Ajuste para responsividade */
  max-width: 448px; /* Limite máximo */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 1.5rem auto 0;
  border-radius: 0.5rem;
  border: 0.3px solid #5d5d5d;
  background-color: var(--binance-black3);
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
  font-size: 1.2rem;
}

.input {
  font-family: 'Lato', sans-serif;
  width: 100%;
  padding: 1rem 0.75rem 1rem 2.5rem;
  color: var(--binance-white);
  background-color: var(--binance-black3); /* Cinza Escuro */
  border: 1px solid #474D57; /* Cinza Médio */
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.input:focus {
  outline: none;
  border-color: #F0B90B; /* Amarelo Binance */
  caret-color: #F0B90B; /* Amarelo Binance */
}

.checkbox-group {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  font-family: 'Lato', sans-serif;
}

.checkbox {
  width: 1.25rem;
  height: 1.25rem;
  color: #10b981;
  background-color: var(--binance-black3); /* Cinza Escuro */
  border: 1px solid #474D57; /* Cinza Médio */
  border-radius: 0.375rem;
}

.checkbox-label {
  margin-left: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--binance-white);
  font-family: 'Lato', sans-serif;
}

.link {
  color: #bdbec0;
  text-decoration: none;
  transition: all 0.2s;
}

.link:hover {
  color: #bdbec0;
  text-decoration: underline;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 0.8rem;
  font-size: 1.125rem;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  color: var(--binance-black);
  background-color: var(--binance-red);
  border: none;
  border-radius: 0.5rem;
  transition: all 0.2s;
  margin-top: 1rem;
}

.submit-button:hover,
.submit-button:focus {
  background-color: var(--binance-red);
}

.login-link {
  text-align: center;
  color: var(--binance-white);
}

.error-message {
  color: var(--binance-red);
}

.next-button {
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
  margin-top: 1rem;
}

.next-button:hover,
.next-button:focus {
  background-color: var(--binance-red);
}

.prev-button {
  display: block;
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  color: var(--binance-white);
}

.prev-button:hover,
.prev-button:focus {
  color: var(--binance-white);
}
</style>