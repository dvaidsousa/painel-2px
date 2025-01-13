<template>
  <router-link to="/profile">
    <i class="profile-icon fa-solid fa-user text-white"></i>
  </router-link>
</template>

<style scoped>
.profile-icon {
  font-size: 1.3rem;
  color: var(--binance-white);
  cursor: pointer;
  margin-right: 0rem;
}

.profile-icon:hover {
  color: var(--binance-red);
}
</style>