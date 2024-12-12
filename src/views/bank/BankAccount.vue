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
      accountNumber: null,
    };
  },
  methods: {
    ...mapActions('bank', ['getAccount']),
    async validateAccount() {
      try {
        let response = await this.getAccount({ number: this.accountNumber });
        if (response && response.error) {
          alert(response.data);
        } else {
          this.$router.push({ name: 'bankamount' });
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    },
  },
};
</script>