<template>
  <div>
    <h1>Mon compte</h1>
    <input v-model="accountNumber" placeholder="Numéro de compte" />
    <button @click="validateAccount">Valider</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'BankAccount',
  data() {
    return {
      accountNumber: ''
    };
  },
  methods: {
    ...mapActions('bank', ['getAccount']),
    async validateAccount() {
      await this.getAccount({number: this.accountNumber});
    }
  }
};
</script>