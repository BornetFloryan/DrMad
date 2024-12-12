<template>
  <div>
    <h1><slot>Opérations passées</slot></h1>
    <div>
      <input type="checkbox" v-model="filterByPeriod" id="filterByPeriod" />
      <label for="filterByPeriod">Filtrer par période</label>
    </div>
    <div v-if="filterByPeriod">
      <label for="startDate">Du</label>
      <input type="date" v-model="startDate" @change="validateDates" id="startDate" />
      <label for="endDate">Au</label>
      <input type="date" v-model="endDate" @change="validateDates" id="endDate" />
    </div>
    <DataTable :headers="headers" :items="filteredTransactions" itemCheck itemButton tableButton @itemClicked="showDetails" @tableClicked="showSelectedDetails">
      <template #itemButton>Détails</template>
      <template #tableButton>Voir</template>
    </DataTable>
    <p>{{accountTransactions}}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import DataTable from '@/components/bank/DataTable.vue';

export default {
  name: 'BankHistory',
  components: { DataTable },
  data() {
    return {
      filterByPeriod: false,
      startDate: '',
      endDate: '',
      headers: [
        {label: "Montant", name: "amount"},
        {label: "Date", name: "date"},
        {label: "S/D", name: "sourceDestination"}
      ]
    };
  },
  computed: {
    ...mapState('bank', ['bankAccount', 'accountTransactions']),
    filteredTransactions() {
      let transactions = this.accountTransactions.slice().sort((a, b) => new Date(b.date['$date']) - new Date(a.date['$date']));
      if (this.filterByPeriod) {
        if (this.startDate) {
          transactions = transactions.filter(t => new Date(t.date['$date']) >= new Date(this.startDate));
        }
        if (this.endDate) {
          transactions = transactions.filter(t => new Date(t.date['$date']) <= new Date(this.endDate));
        }
      }
      return transactions.map(transaction => ({
        ...transaction,
        date: this.formatDate(transaction.date['$date']),
        sourceDestination: transaction.amount < 0 ? 'S' : 'D'
      }));
    }
  },
  methods: {
    ...mapActions('bank', ['getAccountTransactions']),
    validateDates() {
      if (this.startDate && this.endDate && new Date(this.startDate) > new Date(this.endDate)) {
        this.endDate = '';
      }
      if (this.endDate && this.startDate && new Date(this.endDate) < new Date(this.startDate)) {
        this.startDate = '';
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    showDetails(item) {
      alert(`Transaction UUID: ${item.uuid}`);
    },
    showSelectedDetails(selectedItems) {
      const selectedUuids = selectedItems.map(t => t.uuid);
      alert(`Selected Transactions UUIDs: ${selectedUuids.join(', ')}`);
    }
  },
  mounted() {
    this.getAccountTransactions(this.bankAccount);
  }
};
</script>

<style scoped>
</style>