<template>
  <div>
    <CheckedList
        :data="processedData"
        :fields="['name', 'amount']"
        :itemCheck="false"
        :checked="checked"
        :itemButton="{ show: true, text: 'Supprimer' }"
        :listButton="{ show: true, text: 'Vider le panier' }"
        :itemAmount="false"
        @item-button-clicked="removeItem"
        @list-button-clicked="handleClearBasket"
    />
    <div>Total Price: {{ totalPrice }}</div>
    <button @click="createOrder">Acheter</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CheckedList from './CheckedList.vue';
import ShopService from "@/services/shop.service";

export default {
  name: 'BasketList',
  components: {
    CheckedList,
  },
  data: () => ({
    checked: [],
  }),
  computed: {
    ...mapState('shop', ['basket', 'shopUser']),
    processedData() {
      return this.basket.items.map(item => ({
        name: item.item.name,
        amount: item.amount,
        price: item.item.price,
        ...item
      }));
    },
    totalPrice() {
      return this.basket.items.reduce((total, item) => {
        const applicablePromotion = item.item.promotion
            .filter(promo => item.amount >= promo.amount)
            .sort((a, b) => b.amount - a.amount)[0];
        const discount = applicablePromotion ? applicablePromotion.discount : 0;
        return total + (item.item.price * item.amount) * (1 - discount / 100);
      }, 0);
    }
  },
  methods: {
    ...mapActions('shop', ['getBasket', 'removeItemFromBasket', 'clearBasket']),
    removeItem({index}) {
      const item = this.basket.items[index];
      this.removeItemFromBasket({login: this.shopUser, item: item});
    },
    handleClearBasket() {
      this.clearBasket();
    },
    async createOrder() {
      const userId = this.shopUser._id;
      const orderData = {
        userId,
        items: this.basket.items,
      };
      const response = await ShopService.createOrder(orderData);
      if (response.error === 0) {
        this.clearBasket();
        let orderId = response.data.uuid;
        this.$router.push({ name: 'shoppay', params: { orderId } });
      } else {
        console.error('Failed to place order:', response.data);
      }
    },
  },
  created() {
    this.getBasket(this.shopUser);
  },
};
</script>

<style scoped>
</style>