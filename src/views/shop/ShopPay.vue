<template>
  <div>
    <h1>ShopPay</h1>
    <div>
      <label for="orderId">Order ID:</label>
      <input type="text" v-model="localOrderId" id="orderId">
    </div>
    <div>
      <label for="orderId">Order ID:</label>
      <input v-model="transactionId" placeholder="UUID de transaction bancaire" id="transactionId" />
    </div>
    <button @click="payOrder">Payer</button>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
import ShopService from "@/services/shop.service";
import {mapState} from "vuex";

export default {
  name: 'ShopPay',
  props: {
    orderId: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      localOrderId: this.orderId,
      transactionId: '',
      errorMessage: ''
    };
  },
  computed: {
    ...mapState('shop', ['shopUser'])
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
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>