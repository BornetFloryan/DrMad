<template>
  <div>
    <h1>Les virus</h1>
    <CheckedList
        :data="viruses"
        :fields="['name', 'price', 'promotion']"
        :item-check="true"
        :checked="checked"
        :itemButton="{ show: true, text: 'Ajouter au panier' }"
        :listButton="{ show: true, text: 'Ajouter tous au panier' }"
        :itemAmount="true"
        @item-button-clicked="handleAddItemToBasket"
        @list-button-clicked="handleAddSelectedItemsToBasket"
        @checked-changed="updateChecked"
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
  data: () => ({
    checked: [],
  }),
  computed: {
    ...mapState({
      viruses: state => state.shop.viruses,
      basket: state => state.shop.basket,
      currentUser: state => state.shop.shopUser
    })
  },
  methods: {
    ...mapActions('shop', ['addItemToBasket', 'removeItemFromBasket']),
    updateChecked(index) {
      this.$set(this.checked, index, !this.checked[index]);
    },
    async handleAddItemToBasket({index, amount}) {
      let response = await this.addItemToBasket({
        login: this.currentUser,
        item: this.viruses[index],
        quantity: amount});
      if (response && response.error) {
        alert(response.data);
      }
    },
    async handleAddSelectedItemsToBasket(selectedItems) {
      for (const {index, amount} of selectedItems) {
        let response = await this.handleAddItemToBasket({
          index: index,
          amount: amount
        });
        if (response && response.error) {
          alert(response.data);
        }
      }
    },
  }
};
</script>

<style scoped>
</style>