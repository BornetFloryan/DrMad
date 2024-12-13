<template>
  <div class="login-container">
    <h1 class="login-title">Connexion</h1>

    <label for="login" class="input-label">Nom d'Utilisateur</label>
    <input id="login" type="text" v-model="login" class="input-field" placeholder="Entrez votre nom d'utilisateur">

    <label for="password" class="input-label">Mot de passe</label>
    <input id="password" type="password" v-model="password" class="input-field" placeholder="Entrez votre mot de passe">

    <button @click="submitLogin" class="login-button">Se connecter</button>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <p v-if="shopUser" class="user-info">{{ shopUser }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ShopLoginView',
  data() {
    return {
      login: '',
      password: '',
      errorMessage: ''
    }
  },
  computed: {
    ...mapState('shop', ['shopUser'])
  },
  methods: {
    ...mapActions('shop', ['shopLogin']),
    async submitLogin() {
      try {
        const response = await this.shopLogin({ login: this.login, password: this.password });
        if (response && response.error) {
          this.errorMessage = response.data;
        } else {
          this.$router.push('/shop/buy');
        }
      } catch (error) {
        this.errorMessage = 'An error occurred during login.';
        console.error(error);
      }
    },
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.login-title {
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.input-label {
  font-size: 16px;
  font-weight: 500;
  color: #555;
  margin-bottom: 8px;
  align-self: flex-start;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
}

.input-field:focus {
  border-color: #007bff;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #0056b3;
}

.login-button:active {
  background-color: #004085;
}

.error {
  color: #d9534f;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}

.user-info {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-top: 10px;
}
</style>
