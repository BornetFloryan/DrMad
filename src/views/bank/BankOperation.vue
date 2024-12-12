<template>
  <div>
    <h1>Débit/Virement</h1>
    <input v-model="amount" placeholder="Somme" />
    <label>
      <input type="checkbox" v-model="isTransfer" />
      Destinataire
    </label>
    <input v-if="isTransfer" v-model="recipientAccount" placeholder="Numéro de compte destinataire" />
    <button @click="validateTransfer">Valider</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'BankOperation',
  data() {
    return {
      amount: '',
      isTransfer: false,
      recipientAccount: ''
    };
  },
  methods: {
    ...mapActions('bank', ['createWithdrawal', 'createPayment']),
    async validateTransfer() {
      if (this.isTransfer) {
        await this.createPayment({number: this.recipientAccount, amount: this.amount});
      } else {
        await this.createWithdrawal({number: this.accountNumber, amount: this.amount});
      }
    }
  }
};
</script>