<template>
  <div>
    <h1>Relevé de compte</h1>
    <ul>
      <li v-for="transaction in accountTransactions" :key="transaction.uuid">
        {{ transaction.date }} - {{ transaction.amount }}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'BankHistory',
  computed: {
    ...mapState('bank', ['accountTransactions'])
  }
};
</script>