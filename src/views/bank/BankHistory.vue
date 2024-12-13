<template>
  <div class="bank-history">
    <h1><slot>Opérations passées</slot></h1>
    <div class="filter-section">
      <input type="checkbox" v-model="filterByPeriod" id="filterByPeriod" />
      <label for="filterByPeriod">Filtrer par période</label>
    </div>
    <div v-if="filterByPeriod" class="date-filters">
      <label for="startDate">Du</label>
      <input type="date" v-model="startDate" @change="validateDates" id="startDate" />
      <label for="endDate">Au</label>
      <input type="date" v-model="endDate" @change="validateDates" id="endDate" />
    </div>
    <DataTable :headers="headers" :items="filteredTransactions" itemCheck itemButton tableButton @itemClicked="showDetails" @tableClicked="showSelectedDetails">
      <template #itemButton>Détails</template>
      <template #tableButton>Voir</template>
    </DataTable>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import DataTable from '@/components/bank/DataTable.vue';

export default {
  name: 'BankHistory',
  components: {DataTable},
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
      let transactions = this.accountTransactions
          .filter(t => t.account === this.bankAccount._id)
          .slice()
          .sort((a, b) => new Date(b.date['$date']) - new Date(a.date['$date']));

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
    },
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
      if (item.recipientTransactionUuid) {
        alert(`Transaction UUID: ${item.recipientTransactionUuid}`);
      } else {
        alert(`Transaction UUID: ${item.uuid}`);
      }
    },
    showSelectedDetails(selectedItems) {
      const selectedUuids = selectedItems.map(t => t.recipientTransactionUuid || t.uuid);
      alert(`Selected Transactions UUIDs: ${selectedUuids.join(', ')}`);
    }
  },
  mounted() {
    this.getAccountTransactions();
  }
};
</script>

<style scoped>
.bank-history {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f9;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.filter-section {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-section input {
  margin-right: 10px;
}

.date-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.date-filters label {
  font-weight: bold;
}

.date-filters input {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
