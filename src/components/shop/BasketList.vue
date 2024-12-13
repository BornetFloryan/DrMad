<template>
  <div class="basket-list">
    <h1>Votre Panier</h1>
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
    <div class="total-price">
      Total : {{ totalPrice }}
    </div>
    <button @click="createOrder" class="buy-button">Acheter</button>
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
        this.$router.push({name: 'shoppay', params: {orderId}});
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
.basket-list {
  font-family: 'Arial', sans-serif;
  width: 100%;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  box-sizing: border-box;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
}

.total-price {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
}

.buy-button {
  width: 100%;
  padding: 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 30px;
}

.buy-button:hover {
  background-color: #45a049;
}

.buy-button:active {
  background-color: #3e8e41;
}
</style>
