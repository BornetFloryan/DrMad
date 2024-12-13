<template>
  <div>
    <h1>Les virus</h1>
    <span>Filtres :</span>
    <br>
    <label for="filterpriceactive">par prix</label>
    <input type="checkbox" v-model="filterPriceActive" id="filterpriceactive">
    <br>
    <label for="filternameactive">par nom</label>
    <input type="checkbox" v-model="filterNameActive" id="filternameactive">
    <br>
    <label for="filterstockactive">par stock</label>
    <input type="checkbox" v-model="filterStockActive" id="filterstockactive">
    <br>
    <hr/>

    <div v-if="filterPriceActive">
      <label for="filterprice">prix inférieur à : </label>
      <input v-model="priceFilter" id="filterprice">
    </div>

    <div v-if="filterNameActive">
      <label for="filtername">Nom : </label>
      <input v-model="nameFilter" id="filtername">
    </div>

    <div v-if="filterStockActive">
      <label for="filterstock">En stock : </label>
      <input type="checkbox" v-model="stockFilter" id="filterstock">
    </div>
    <CheckedList
        :data="formattedViruses"
        :fields="['name', 'price', 'formattedPromotions']"
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
import {mapActions, mapState} from 'vuex';
import CheckedList from './CheckedList.vue';

export default {
  name: 'ItemsList',
  components: {
    CheckedList
  },
  data: () => ({
    priceFilter: 0,
    nameFilter: "",
    stockFilter: false,
    filterPriceActive: false,
    filterNameActive: false,
    filterStockActive: false,
    checked: [],
  }),
  computed: {
    ...mapState({
      viruses: state => state.shop.viruses,
      basket: state => state.shop.basket,
      currentUser: state => state.shop.shopUser
    }),
    filteredViruses() {
      let filtered = [...this.viruses];
      if (this.filterPriceActive && this.priceFilter > 0)
        filtered = filtered.filter(v => v.price < this.priceFilter);
      if (this.filterNameActive && this.nameFilter)
        filtered = filtered.filter(v => v.name.toLowerCase().includes(this.nameFilter.toLowerCase()));
      if (this.filterStockActive && this.stockFilter)
        filtered = filtered.filter(v => v.stock > 0);
      return filtered;
    },
    formattedViruses() {
      return this.filteredViruses.map(virus => ({
        ...virus,
        formattedPromotions: virus.promotion.map(promo => `${promo.discount}% pour ${promo.amount}`).join(' | ')
      }));
    }
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
        quantity: amount
      });
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
h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

span {
  font-size: 1.2rem;
  font-weight: 600;
  color: #555;
}

label {
  font-size: 1rem;
  margin-right: 10px;
}

input[type="checkbox"], input[type="text"], input[type="number"] {
  margin-bottom: 10px;
  margin-top: 5px;
  padding: 5px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type="text"]:focus, input[type="number"]:focus, input[type="checkbox"]:focus {
  outline: none;
  border-color: #007bff;
}

hr {
  margin: 20px 0;
  border-top: 1px solid #ccc;
}
</style>
