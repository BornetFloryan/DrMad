<template>
  <div class="orders">
    <h1 class="title">Mes Commandes</h1>
    <ul class="orders-list">
      <li v-for="order in orders" :key="order.uuid" class="order-item">
        <div class="order-details">
          <p><strong>Date :</strong> {{order.date.$date}}</p>
          <p><strong>Montant :</strong> {{ order.total }}</p>
          <p><strong>État :</strong> {{ order.status }}</p>
        </div>
        <div class="order-actions">
          <button v-if="order.status === 'waiting_payment'" @click="payOrder(order.uuid)" class="pay-button">Payer</button>
          <button v-if="order.status === 'waiting_payment'" @click="cancelOrderHandler(order.uuid)" class="cancel-button">Annuler</button>
        </div>
      </li>
    </ul>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ShopOrders',
  data() {
    return {
      errorMessage: ''
    };
  },
  computed: {
    ...mapState('shop', ['shopUser']),
    orders() {
      return this.shopUser.orders || [];
    }
  },
  methods: {
    ...mapActions('shop', ['fetchOrders', 'cancelOrder']),
    async payOrder(orderId) {
      this.$router.push(`/shop/pay/${orderId}`);
    },
    async cancelOrderHandler(orderId) {
      try {
        await this.cancelOrder({orderId, userId: this.shopUser._id});
      } catch (error) {
        this.errorMessage = 'Une erreur est survenue lors de l\'annulation de la commande.';
        console.error(error);
      }
    }
  },
  async created() {
    try {
      await this.fetchOrders(this.shopUser._id);
    } catch (error) {
      this.errorMessage = 'Une erreur est survenue lors de la récupération des commandes.';
      console.error(error);
    }
  }
};
</script>

<style scoped>
.orders {
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

.orders-list {
  list-style-type: none;
  padding: 0;
}

.order-item {
  background-color: #f9f9f9;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-details {
  margin-bottom: 15px;
}

.order-actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 15px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  outline: none;
}

.pay-button {
  background-color: #4CAF50;
  color: white;
}

.pay-button:hover {
  background-color: #45a049;
}

.pay-button:active {
  background-color: #3e8e41;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

.cancel-button:hover {
  background-color: #e53935;
}

.cancel-button:active {
  background-color: #d32f2f;
}

.error {
  color: red;
  text-align: center;
  margin-top: 20px;
  font-size: 1.2rem;
}
</style>
