<template>
  <div class="data-table">
    <table>
      <thead>
      <tr>
        <th v-if="itemCheck">Select</th>
        <th v-for="header in headers" :key="header.name">{{ header.label }}</th>
        <th v-if="itemButton">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item.id">
        <td v-if="itemCheck"><input type="checkbox" v-model="item.selected" /></td>
        <td v-for="header in headers" :key="header.name" :class="amountClass(item[header.name])">{{ item[header.name] }}</td>
        <td v-if="itemButton">
          <button @click="$emit('itemClicked', item)">
            <slot name="itemButton">Button</slot>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <button v-if="tableButton" @click="emitTableClicked">
      <slot name="tableButton">Voir</slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    itemCheck: {
      type: Boolean,
      default: false
    },
    itemButton: {
      type: Boolean,
      default: false
    },
    tableButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    emitTableClicked() {
      const selectedItems = this.items.filter(item => item.selected);
      this.$emit('tableClicked', selectedItems);
    },
    amountClass(amount) {
      if (typeof amount === 'number') {
        return amount < 0 ? 'negative' : 'positive';
      }
      return '';
    }
  }
};
</script>

<style scoped>
.data-table {
  font-family: 'Arial', sans-serif;
  margin: 20px auto;
  max-width: 1200px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

table th, table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

table th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

table tr:nth-child(even) {
  background-color: #f9f9f9;
}

table tr:hover {
  background-color: #f1f1f1;
}

table input[type="checkbox"] {
  width: 20px;
  height: 20px;
  margin: 0;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #0056b3;
}

.positive {
  color: green;
}

.negative {
  color: red;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
