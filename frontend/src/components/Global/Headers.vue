<script>
import { useToast } from 'vue-toastification';
import ButtonReload from './Headers/ButtonReload.vue';
import ButtonNotify from './Headers/ButtonNotify.vue';
import ButtonProfile from './Headers/ButtonProfile.vue';

export default {
  data() {
    return {
      loading: false,
    };
  },
  components: {
    ButtonReload,
    ButtonNotify,
    ButtonProfile
  },
  methods: {
    sendLead() {
      const phoneNumber = '13997669909';
      const message = 'Olá, gostaria de saber mais sobre a 2p Digital e como ela pode ajudar meu negócio.';
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    },
    logout() {
      localStorage.removeItem('token');
      this.showToast('Você saiu com sucesso!');
      this.$router.push('/');
    },
    showToast(message, type = 'success') {
      const toast = useToast();
      toast[type](message, {
        position: 'top-right',
        timeout: 3000,
      });
    }
  },
  mounted() {
    const navToggle = document.getElementById('nav-toggle');
    const navContent = document.getElementById('nav-content');
    if (navToggle && navContent) {
      navToggle.onclick = () => {
        navContent.classList.toggle('hidden');
      };
    }
  }
}
</script>

<template>
  <section>
    <nav id="nav" class="flex items-center justify-between flex-wrap p-6 w-full top-0">
      <div class="flex items-center flex-shrink-0">
        <a href="/dashboard">
          <img id="logos" src="/src/assets/logo-nof.png" alt="Image description" class="w-32 rounded-lg" />
        </a>
      </div>

      <!-- Icone hamburguer -->
      <div class="block lg:hidden">
        <button id="nav-toggle" class="flex items-center px-3 py-1 border rounded text-white border-gray-800 hover:text-white hover:border-white">
          <svg class="fill-current h-8 w-8" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </button>
      </div>

      <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden pt-2 lg:pt-0" id="nav-content">
        <ul class="list-reset lg:flex justify-end flex-1 items-center">
          <ButtonReload style="margin-right: 0.5rem;" />
          <ButtonNotify style="margin-right: 1rem; margin-top: 0.2rem;" />
          <ButtonProfile style="margin-left: 0.5rem; margin-top: -0.1rem;" />
          <li class="flex items-center">
            <button class="button-suporte">
              <span class="suporte">Suporte</span>
            </button>
          </li>
          <li>
            <button class="button-sair" @click="logout">
              <span class="sair">Sair</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
    <hr>
  </section>
</template>

<style scoped>

section {
  background-color: var(--binance-black);
}

#nav {
  padding: 3px 8vw;
}

hr {
  border: none;
  height: 2px;
  background: linear-gradient(to right, #ff7f5f00, #a30909, #ff7f5f00); /* Amarelo Binance */
}

#logos {
  width: 5vw;
  padding: 9px 5px;
}

.button-suporte {
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  color: #ffffff;
  font-weight: bold;
}

.suporte {
  padding: 0.30rem 0.85rem;
  border-radius: 0.375rem;
}

.suporte:hover {
  color: #e2e2e2;
}

.button-sair {
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem; 
  color: var(--binance-white); 
  font-weight: bold;
}

.sair {
  background-color: var(--binance-red);
  padding: 0.30rem 0.85rem;
  border-radius: 0.375rem;
}

.sair:hover {
  background-color: var(--binance-red-hover);
}

li {
  margin-left: 1.5rem;
}

@media (max-width: 768px) {
  #nav-toggle {
    width: 50px;
  }

  #logos {
    width: 10vw;
    padding: 15px 3px;
  }

  .button-style {
    font-size: 1.2rem;
  }
}
</style>