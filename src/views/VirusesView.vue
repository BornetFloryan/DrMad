<template>
  <div>
    <h1>Les virus</h1>
    <p>Le tableau dans le store : {{ viruses }}</p>
    <p>sous forme de liste avec certains champs</p>
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
        :data="filteredViruses"
        :fields="['name', 'price']"
        :item-check="true"
        :checked="checked"
        :itemButton="{ show: true, text: 'Details' }"
        :listButton="{ show: true, text: 'Show Selected' }"
        :itemAmount="false"
        @item-button-clicked="showItemDetails"
        @list-button-clicked="showSelectedItems"
        @checked-changed="updateChecked"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import CheckedList from "@/components/shop/CheckedList.vue";

export default {
  name: 'VirusesView',
  components: {CheckedList},
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
    ...mapState('shop', ['viruses']),
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
  },
  methods: {
    showItemDetails({index, amount}) {
      const virus = this.filteredViruses[index];
      let message = `Id: ${virus._id}\n Nom: ${virus.name}\nStock: ${virus.stock}\nEn vente: ${virus.stock > 0 ? 'Oui' : 'Non'}`;
      if (amount !== null && amount !== undefined) {
        message += `\nQuantité: ${amount}`;
      }
      alert(message);
    },
    showSelectedItems(selectedViruses) {
      const index = selectedViruses.map(v => v.index);
      const amount = selectedViruses.map(v => v.amount).filter(a => a !== undefined);
      let message = `Index: ${index}`;
      if (amount.length > 0) {
        message += `\nAmount: ${amount}`;
      }
      alert(message);
      this.checked = new Array(this.filteredViruses.length).fill(false);
    },
    updateChecked(index) {
      this.$set(this.checked, index, !this.checked[index]);
    }
  },
  watch: {
    filteredViruses() {
      this.checked = new Array(this.filteredViruses.length).fill(false);
    }
  }
}
</script>
