<template>
  <div>
    <h1>Number</h1>

    <span>Number</span>
    <input v-model="number">
    <button @click="getAccountAmount({number})" :disabled="!isValidAccountNumber">Get Amount</button>
    <button @click="getAccountTransaction({number})" :disabled="!isValidAccountNumber">Get Transactions</button>
    <button v-if="number" @click="reset()">Reset</button>

    <p v-if="accountAmount && accountNumberError === 1">{{accountAmount}}</p>
    <ul v-if="accountTransactions && accountTransactions.length && accountNumberError === 1">
      <li v-for="(transaction, index) in accountTransactions" :key="index">
        Account: {{ transaction.account }}<br>
        Amount: {{ transaction.amount }}<br>
        Date: {{ formatDate(transaction.date.$date) }}<br>
        UUID: {{ transaction.uuid }}
      </li>
    </ul>
    <p v-if="accountNumberError === -1">Numéro de compte erroné</p>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
  name: 'BankAccountView',
  data: () => ({
    number: '',
  }),
  computed: {
    ...mapState('bank', ['accountAmount', 'accountTransactions', 'accountNumberError']),
    isValidAccountNumber() {
      const regex = /^[a-zA-Z0-9]{22}-\d{7}$/;
      return regex.test(this.number);
    }
  },
  methods: {
    ...mapActions('bank', ['getAccountAmount', 'getAccountTransaction']),
    ...mapMutations('bank', ['updateAccountAmount', 'updateAccountTransactions', 'updateAccountNumberError']),
    formatDate(dateString){
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${day}/${month}/${year} at ${hours}:${minutes}:${seconds}`;
    },
    reset(){
      this.number = '';
      this.updateAccountNumberError(0);
      this.updateAccountAmount(null);
      this.updateAccountTransactions(null);
    }
  }
}
</script>