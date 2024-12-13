<template>
  <div class="logout-view">
    <h1>Déconnexion du compte</h1>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'BankLogout',
  created() {
    this.logout();
  },
  methods: {
    ...mapActions('bank', ['bankLogout']),
    logout() {
      this.bankLogout();
      setTimeout(() => {
        this.$router.push('/bank');
      }, 1000);
    }
  }
};
</script>

<style scoped>
.logout-view {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f9;
  display: flex;
  justify-content: center;
  text-align: center;
}

h1 {
  color: #333;
  font-size: 2.5rem;
}
</style>