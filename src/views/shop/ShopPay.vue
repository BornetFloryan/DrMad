<template>
  <div>
    <h1>ShopPay</h1>
    <div>
      <label for="orderId">Order ID:</label>
      <input type="text" v-model="localOrderId" id="orderId">
    </div>
    <p>Date: {{ orderDetails.date }}</p>
    <p>Total: {{ orderDetails.total }}</p>
    <div>
      <label for="transactionId">UUID de transaction bancaire:</label>
      <input v-model="transactionId" placeholder="UUID de transaction bancaire" id="transactionId" />
    </div>
    <button @click="payOrder">Payer</button>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
import ShopService from "@/services/shop.service";
import { mapState } from "vuex";

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
    orderDetails() {
      if (!this.shopUser || !this.shopUser.orders) {
        return { date: '', total: '' };
      }
      const order = this.shopUser.orders.find(order => order.uuid === this.localOrderId);
      return order ? { date: order.date.$date, total: order.total } : { date: '', total: '' };
    }
  },
  methods: {
    async payOrder() {
      this.errorMessage = '';
      try {
        const response = await ShopService.finalizeOrder(this.localOrderId, this.transactionId, this.shopUser._id);
        if (response.error === 0) {
          this.$router.push('/shop/orders');
        } else {
          this.errorMessage = response.data;
        }
      } catch (error) {
        this.errorMessage = 'An error occurred during payment.';
        console.error(error);
      }
      this.localOrderId = '';
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>