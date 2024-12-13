<template>
  <div class="account-balance">
    <h1>Solde du compte courant</h1>
    <div class="balance-container">
      <label>Solde actuel : </label>
      <input v-model="accountAmount" :class="amountClass" disabled>€
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'AccountBalance',
  computed: {
    ...mapState('bank', ['accountAmount', 'bankAccount']),
    amountClass() {
      return this.accountAmount >= 0 ? 'positive' : 'negative';
    }
  },
  methods: {
    ...mapActions('bank', ['getAccountAmount', 'getAccountTransactions']),
  },
  mounted() {
    this.getAccountAmount(this.bankAccount);
  }
};
</script>
<style scoped>
.account-balance {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f9;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin: 0 auto;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.balance-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

input {
  font-size: 1.5rem;
  text-align: right;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 150px;
  background-color: #f9f9f9;
}

.positive {
  color: green;
}

.negative {
  color: red;
}
</style>