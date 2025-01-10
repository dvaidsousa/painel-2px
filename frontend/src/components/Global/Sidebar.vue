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
                  class="flex items-center px-4 py-2.5 text-sm font-medium group"
                  :class="[isActive('/dashboard') ? 'active-item' : 'inactive-item']"
                  style="transition: background-color 0.2s ease-in-out;"
                >
                  DASHBOARD
                </router-link>

                <!-- Ferramentas -->
                <router-link
                  to="/ferramentas"
                  class="flex items-center px-4 py-2.5 text-sm font-medium group"
                  :class="[isActive('/ferramentas') ? 'active-item' : 'inactive-item']"
                  style="transition: background-color 0.2s ease-in-out;"
                >
                  FERRAMENTAS
                </router-link>

                <!-- links úteis -->
                <router-link
                  to="/links-uteis"
                  class="flex items-center px-4 py-2.5 text-sm font-medium group"
                  :class="[isActive('/links-uteis') ? 'active-item' : 'inactive-item']"
                  style="transition: background-color 0.2s ease-in-out;"
                >
                  LINKS ÚTEIS
                </router-link>

                <!-- Cursos Online -->
                <router-link
                  to="/cursos-online"
                  class="flex items-center px-4 py-2.5 text-sm font-medium group"
                  :class="[isActive('/cursos-online') ? 'active-item' : 'inactive-item']"
                  style="transition: background-color 0.2s ease-in-out;"
                >
                  CURSOS ONLINE
                </router-link>

                <!-- Eventos -->
                <router-link
                  to="/eventos"
                  class="flex items-center px-4 py-2.5 text-sm font-medium group"
                  :class="[isActive('/eventos') ? 'active-item' : 'inactive-item']"
                  style="transition: background-color 0.2s ease-in-out;"
                >
                  EVENTOS
                </router-link>

                <!-- Notas -->
                <router-link
                  to="/notas"
                  class="flex items-center px-4 py-2.5 text-sm font-medium group"
                  :class="[isActive('/notas') ? 'active-item' : 'inactive-item']"
                  style="transition: background-color 0.2s ease-in-out;"
                >
                  NOTAS
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
