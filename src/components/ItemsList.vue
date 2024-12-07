<template>
  <div>
    <h1>Les virus</h1>
    <p>{{basket}}</p>
    <CheckedList
        :data="viruses"
        :fields="['name', 'price', 'promotion']"
        :item-check="true"
        :checked="[]"
        :itemButton="{ show: true, text: 'Ajouter au panier' }"
        :listButton="{ show: true, text: 'Ajouter tous au panier' }"
        :itemAmount="true"
        @item-button-clicked="handleAddItemToBasket"
        @list-button-clicked="handleAddSelectedItemsToBasket"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CheckedList from './CheckedList.vue';

export default {
  name: 'ItemsList',
  components: {
    CheckedList
  },
  computed: {
    ...mapState({
      viruses: state => state.shop.viruses,
      basket: state => state.shop.basket,
      currentUser: state => state.shop.shopUser
    })
  },
  methods: {
    ...mapActions('shop', ['addItemToBasket', 'removeItemFromBasket']),
    async handleAddItemToBasket({index, amount}) {
      let response = await this.addItemToBasket({login: this.currentUser, item: this.viruses[index], quantity: amount});
      if (response && response.error) {
        alert(response.data);
      }
    },
    handleAddSelectedItemsToBasket(selectedItems) {
      selectedItems.forEach(({index, amount}) => {
        this.handleAddItemToBasket({login: this.currentUser, item: this.viruses[index], amount});
      });
    }
  }
};
</script>

<style scoped>
</style>