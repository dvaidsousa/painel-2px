<template>
  <section class="h-full">
    <div class="flex flex-1 h-full">
      <div class="hidden md:flex md:w-64 md:flex-col h-full">
        <div class="flex flex-col flex-grow pt-5 h-full">
          <div class="flex flex-col flex-1 px-3 mt-6">
            <div class="space-y-4">
              <nav class="flex-1 space-y-2">
                <!-- Dashboard -->
                <router-link
                  to="/dashboard"
                  class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg group"
                  :class="[isActive('/dashboard') ? 'active-item' : 'inactive-item']"
                  style="transition: background-color 0.2s ease-in-out;"
                >
                  <i
                    class="fa-solid fa-square-poll-vertical flex-shrink-0 w-5 h-5 mr-4"
                    :class="isActive('/dashboard') ? 'text-white' : 'text-white'"
                  ></i>
                  Dashboard
                </router-link>

                <!-- Finança Pessoal -->
                <router-link
                  to="/ferramentas"
                  class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg group"
                  :class="[isActive('/ferramentas') ? 'active-item' : 'inactive-item']"
                  style="transition: background-color 0.2s ease-in-out;"
                >
                  <i class="fa-solid fa-coins flex-shrink-0 w-5 h-5 mr-4" :class="isActive('/ferramentas') ? 'text-white' : 'text-white'"></i>
                  Ferramentas
                </router-link>

                <!-- Etiquetas -->
                <router-link
                  to="/etiquetas"
                  class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg group"
                  :class="[isActive('/etiquetas') ? 'active-item' : 'inactive-item']"
                  style="transition: background-color 0.2s ease-in-out;"
                >
                  <i class="fa-solid fa-clipboard-check flex-shrink-0 w-5 h-5 mr-4" :class="isActive('/etiquetas') ? 'text-white' : 'text-white'"></i>
                  Cursos Online
                </router-link>

                <!-- Controle de Contas -->
                <router-link
                  to="/controle-contas"
                  class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg group"
                  :class="[isActive('/controle-contas') ? 'active-item' : 'inactive-item']"
                  style="transition: background-color 0.2s ease-in-out;"
                >
                  <i
                    class="fa-solid fa-mug-hot flex-shrink-0 w-5 h-5 mr-4"
                    :class="isActive('/controle-contas') ? 'text-white' : 'text-white'"
                  ></i>
                  Eventos
                </router-link>

                <!-- Investimentos -->
                <router-link
                  to="/investimentos"
                  class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg group"
                  :class="[isActive('/investimentos') ? 'active-item' : 'inactive-item']"
                  style="transition: background-color 0.2s ease-in-out;"
                >
                  <i
                    class="fa-solid fa-seedling flex-shrink-0 w-5 h-5 mr-4"
                    :class="isActive('/investimentos') ? 'text-white' : 'text-white'"
                  ></i>
                  Notas
                </router-link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script scoped>
export default {
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
    resolveRoute(route) {
      return this.$router.resolve(route).href;
    }
  }
}
</script>

<style>
section {
  background-color: var(--binance-black);
  border-right: 1px solid #414147;
}

.active-item {
  background-color: #973636;
  color: var(--binance-white);
}

.inactive-item {
  background-color: var(--binance-black-button);
  color: var(--binance-white);
}

.inactive-item:hover {
  background-color: var(--binance-black-button-hover);
  color: var(--binance-white);
}

.shadow-right-full-height {
  height: 100vh;
  box-shadow: 3px 0 5px -2px rgba(0, 0, 0, 0.2);
}
</style>
