<template>
  <div>
    <h1>Solde du compte courant</h1>
    <label>Solde actuel : </label>
    <input v-model="accountAmount" :class="amountClass" disabled>€
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

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
.positive {
  color: green;
}

.negative {
  color: red;
}
</style>