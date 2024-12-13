<template>
  <div class="bank-operation">
    <h1><slot>Débit / Virement</slot></h1>
    <input type="number" v-model="amount" placeholder="Somme" min="0" class="input-field"/>
    <label class="checkbox-label">
      <input type="checkbox" v-model="isTransfer" />
      Destinataire
    </label>
    <input v-if="isTransfer" v-model="recipientAccount" placeholder="Numéro de compte destinataire" class="input-field"/>
    <button @click="validateTransfer" class="validate-button">Valider</button>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { bankaccounts } from "@/datasource/data";

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
          response = await this.createWithdrawal({ number: this.bankAccount._id, amount: this.amount });
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
.bank-operation {
  font-family: 'Arial', sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
}

.input-field {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  margin-bottom: 15px;
}

.checkbox-label {
  font-size: 1rem;
  color: #333;
  display: block;
  margin-bottom: 15px;
}

.validate-button {
  width: 100%;
  padding: 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
}

.validate-button:hover {
  background-color: #45a049;
}

.validate-button:active {
  background-color: #3e8e41;
}

.success-message {
  color: green;
  font-size: 1rem;
  text-align: center;
  margin-top: 20px;
}
</style>