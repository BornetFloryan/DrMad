<template>
  <div>
    <table>
      <thead>
      <tr>
        <th v-if="itemCheck">Select.</th>
        <th v-for="header in headers" :key="header.name">{{ header.label }}</th>
        <th v-if="itemButton">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item.id">
        <td v-if="itemCheck"><input type="checkbox" v-model="item.selected" /></td>
        <td v-for="header in headers" :key="header.name" :class="amountClass(item[header.name])">{{ item[header.name] }}</td>
        <td v-if="itemButton"><button @click="$emit('itemClicked', item)"><slot name="itemButton">Button</slot></button></td>
      </tr>
      </tbody>
    </table>
    <button v-if="tableButton" @click="emitTableClicked"><slot name="tableButton">Voir</slot></button>
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
.negative {
  color: red;
}

.positive {
  color: green;
}
</style>