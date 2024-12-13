<template>
  <div class="account-container">
    <h1 class="title">Mon compte</h1>
    <input v-model="accountNumber" class="account-input" placeholder="Numéro de compte" />
    <button @click="validateAccount" class="validate-button">Valider</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'BankAccount',
  data() {
    return {
      accountNumber: null,
    };
  },
  methods: {
    ...mapActions('bank', ['getAccount']),
    async validateAccount() {
      try {
        let response = await this.getAccount({number: this.accountNumber});
        if (response && response.error) {
          alert(response.data);
        } else {
          this.$router.push({name: 'bankamount'});
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    },
  },
};
</script>

<style scoped>
.account-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.account-input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
}

.account-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.validate-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.validate-button:hover {
  background-color: #0056b3;
}

.validate-button:active {
  background-color: #004085;
}
</style>
  