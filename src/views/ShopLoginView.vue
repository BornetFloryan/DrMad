<template>
  <div class="login-container">
    <h1>Login</h1>

    <span>login</span><input type="text" v-model="login">
    <span>password</span><input type="password" v-model="password">
    <button @click="submitLogin">Login</button>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <p v-if="shopUser">{{shopUser}}</p>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

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
        const response = await this.shopLogin({login: this.login, password: this.password});
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
}
</style>