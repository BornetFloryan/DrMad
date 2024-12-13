<template>
  <div class="home">
    <div class="welcome-card">
      <h1>Bienvenue Dans La Boutique De DrMad</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
  margin: 0;
  font-family: 'Arial', sans-serif;
}

.welcome-card {
  background-color: #fff;
  padding: 40px;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 80%;
  animation: fadeIn 1s ease-in;
}

.welcome-card h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin: 0;
  line-height: 1.3;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>