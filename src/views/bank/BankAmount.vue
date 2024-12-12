<template>
  <div>
    <h1>Solde du compte</h1>
    <p>{{ accountAmount }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BankAmount',
  computed: {
    ...mapState('bank', ['accountAmount'])
  }
};
</script>