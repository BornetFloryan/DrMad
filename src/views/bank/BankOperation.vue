<template>
  <div>
    <h1><slot>Débit / Virement</slot></h1>
    <input v-model="amount" placeholder="Somme" />
    <label>
      <input type="checkbox" v-model="isTransfer" />
      Destinataire
    </label>
    <input v-if="isTransfer" v-model="recipientAccount" placeholder="Numéro de compte destinataire" />
    <button @click="validateTransfer">Valider</button>
    <p v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'BankOperation',
  data() {
    return {
      amount: '',
      isTransfer: false,
      recipientAccount: '',
      successMessage: ''
    };
  },
  computed: {
    ...mapState('bank', ['bankAccount', 'accountTransactions'])
  },
  methods: {
    ...mapActions('bank', ['createWithdrawal', 'createPayment', 'getAccountTransactions']),
    async validateTransfer() {
      try {
        let response;
        if (this.isTransfer) {
          console.log("oui")
          response = await this.createPayment({ number: this.bankAccount.number, amount: this.amount, recipient: this.recipientAccount });
        } else {
          console.log("non")
          response = await this.createWithdrawal({ number: this.bankAccount.number, amount: this.amount });
        }
        if (response && response.error !== 0) {
          alert(`Erreur: ${response.data}`);
        } else {
          this.successMessage = `L'opération est validée avec le n° : ${response.uuid}. Vous pouvez la retrouver dans l'historique.`;
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        }
      } catch (error) {
        alert(`Une erreur est survenue lors de l'opération: ${error.message}`);
      }
    }
  },
  mounted() {
    this.getAccountTransactions(this.bankAccount);
  }
};
</script>

<style scoped>
</style>