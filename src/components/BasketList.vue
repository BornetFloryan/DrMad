<template>
  <div>
    <h1>Panier</h1>
    <div v-for="item in basket" :key="item.item._id" class="basket-item">
      <span>{{ item.item.name }} x {{ item.amount }}</span>
    </div>
    <div class="total">
      <span>Total: {{ totalAmount }}</span>
    </div>
    <button @click="createOrder">Acheter</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'BasketList',
  computed: {
    ...mapState('shop', ['basket']),
    totalAmount() {
      return this.basket.reduce((total, item) => total + item.item.price * item.amount, 0);
    }
  },
  methods: {
    ...mapActions('shop', ['createOrder']),
    async createOrder() {
      const order = await this.createOrder();
      alert(`Commande créée avec l'UUID: ${order.uuid}`);
    }
  }
};
</script>

<style scoped>
.basket-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.total {
  margin-top: 20px;
  font-weight: bold;
}
</style>