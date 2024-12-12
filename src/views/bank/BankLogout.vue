<template>
  <div>
    <h1>Déconnexion du compte</h1>
  </div>
</template>

<script>
export default {
  name: 'BankLogout',
  created() {
    setTimeout(() => {
      // Clear store and redirect to bank home
    }, 1000);
  }
};
</script>