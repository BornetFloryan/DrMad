<template>
  <div>
    <h1><slot>Débit / Virement</slot></h1>
    <input type="number" v-model="amount" placeholder="Somme"  min="0"/>
    <label>
      <input type="checkbox" v-model="isTransfer" />
      Destinataire
    </label>
    <input v-if="isTransfer" v-model="recipientAccount" placeholder="Numéro de compte destinataire" />
    <button @click="validateTransfer">Valider</button>
    <p v-if="successMessage">{{ successMessage }}</p>
    <p>{{accountAmount}}</p>
  </div>
</template>

<script>
import { mapActions, mapState} from 'vuex';
import {bankaccounts} from "@/datasource/data";

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
    ...mapState('bank', ['bankAccount', 'accountTransactions', 'accountAmount'])
  },
  methods: {
    ...mapActions('bank', ['createWithdrawal', 'createPayment', 'getAccountTransactions']),
    async validateTransfer() {
      try {
        if (this.amount <= 0) {
          alert('La somme doit être positive.');
          return;
        }

        let response;
        if (this.isTransfer) {
          const recipient = bankaccounts.find(e => e.number === this.recipientAccount);
          if (!recipient) {
            alert('Compte destinataire incorrect');
            return;
          }
          response = await this.createPayment({
            number: this.bankAccount._id,
            amount: this.amount,
            recipient: recipient._id
          });
        } else {
          response = await this.createWithdrawal({number: this.bankAccount._id, amount: this.amount});
        }
        if (response && response.error !== 0) {
          alert(`Erreur: ${response.data}`);
        } else {
          if (response.data.transaction.recipientTransactionUuid) {
            this.successMessage = `L'opération est validée avec le n° : ${response.data.transaction.recipientTransactionUuid}. Vous pouvez la retrouver dans l'historique.`;
          } else {
            this.successMessage = `L'opération est validée avec le n° : ${response.data.transaction.uuid}. Vous pouvez la retrouver dans l'historique.`;
          }
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
    this.getAccountTransactions();
  }
};
</script>

<style scoped>
</style>