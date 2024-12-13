<template>
  <div class="shop-pay">
    <h1 class="title">Paiement</h1>
    <div class="order-info">
      <label for="orderId">ID de Commande:</label>
      <input type="text" v-model="localOrderId" id="orderId" class="input-field" />
    </div>

    <div v-if="localOrderId" class="order-details">
      <p>Date: {{ orderDetails.date }}</p>
      <p>Total: {{ orderDetails.total }}</p>
    </div>

    <div class="transaction-info">
      <label for="transactionId">UUID de transaction bancaire:</label>
      <input v-model="transactionId" placeholder="UUID de transaction bancaire" id="transactionId" class="input-field" />
    </div>

    <button @click="payOrder" class="pay-button">Payer</button>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
import ShopService from "@/services/shop.service";
import {mapActions, mapState} from "vuex";

export default {
  name: 'ShopPay',
  props: {
    orderId: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      localOrderId: this.orderId || '',
      transactionId: '',
      errorMessage: ''
    };
  },
  computed: {
    ...mapState('shop', ['shopUser']),
    ...mapState('bank', ['accountTransactions']),
    orderDetails() {
      if (!this.shopUser || !this.shopUser.orders) {
        return {date: '', total: ''};
      }
      const order = this.shopUser.orders.find(order => order.uuid === this.localOrderId);
      return order ? {date: order.date.$date, total: order.total} : {date: '', total: ''};
    }
  },
  methods: {
    ...mapActions('bank', ['getAccountTransactions']),
    async payOrder() {
      this.errorMessage = '';
      try {
        const transaction = this.accountTransactions.find(t => t.uuid === this.transactionId || t.recipientTransactionUuid === this.transactionId);
        if (!transaction) {
          this.errorMessage = 'Transaction not found.';
          return;
        }
        const response = await ShopService.finalizeOrder(this.localOrderId, transaction, this.shopUser._id);
        if (response.error === 0) {
          this.localOrderId = '';
          this.$router.push('/shop/orders');
        } else {
          this.errorMessage = response.data;
        }
      } catch (error) {
        this.errorMessage = 'An error occurred during payment.';
        console.error(error);
      }
    },
  },
  mounted() {
    this.getAccountTransactions();
  }
};
</script>

<style scoped>
.shop-pay {
  font-family: 'Arial', sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
}

.order-info,
.transaction-info {
  margin-bottom: 20px;
}

label {
  font-size: 1rem;
  color: #333;
  display: block;
  margin-bottom: 5px;
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

.pay-button {
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

.pay-button:hover {
  background-color: #45a049;
}

.pay-button:active {
  background-color: #3e8e41;
}

.order-details p {
  font-size: 1rem;
  color: #333;
}

.error {
  color: red;
  font-size: 1rem;
  text-align: center;
  margin-top: 20px;
}
</style>
