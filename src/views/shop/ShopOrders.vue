<template>
  <div>
    <h1>Mes Commandes</h1>
    <ul>
      <li v-for="order in orders" :key="order.uuid">
        <p>Date : {{order.date.$date}}</p>
        <p>Montant: {{ order.total }}</p>
        <p>État: {{ order.status }}</p>
        <button v-if="order.status === 'waiting_payment'" @click="payOrder(order.uuid)">Payer</button>
        <button v-if="order.status === 'waiting_payment'" @click="cancelOrderHandler(order.uuid)">Annuler</button>
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
.error {
  color: red;
}
</style>