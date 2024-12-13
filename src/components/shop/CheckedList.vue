<template>
  <div class="checked-list">
    <ul class="list">
      <li v-for="(item, index) in data" :key="index" class="list-item">
        <div class="item-header">
          <input v-if="itemCheck" type="checkbox" :checked="checked[index]" @change="checkedChanged(index)" class="checkbox"/>
          <div v-for="field in fields" :key="field" class="item-field">
            {{ item[field] }}
          </div>
        </div>
        <div class="item-actions">
          <input
              v-if="itemAmount"
              type="number"
              v-model.number="inputValues[index]"
              placeholder="Quantité"
              min="1"
              class="quantity-input"
          />
          <button v-if="itemButton.show" @click="itemButtonClicked(index, inputValues[index])" class="item-button">
            {{ itemButton.text }}
          </button>
        </div>
      </li>
    </ul>
    <button v-if="listButton.show" @click="listButtonClicked()" class="list-button">
      {{ listButton.text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CheckedList',
  props: {
    data: Array,
    fields: Array,
    itemCheck: Boolean,
    checked: Array,
    itemButton: Object,
    listButton: Object,
    itemAmount: Boolean,
  },
  data: () => {
    return {
      inputValues: {},
    }
  },

  methods: {
    checkedChanged(index) {
      this.$emit('checked-changed', index);
    },
    itemButtonClicked(index, amount) {
      this.$emit('item-button-clicked', { index, amount });
    },
    listButtonClicked() {
      const selectedViruses = this.data
          .map((item, index) => ({
            index,
            amount: this.inputValues[index] ? this.inputValues[index] : undefined }))
          .filter((item, index) => this.checked[index]);
      this.$emit('list-button-clicked', selectedViruses);
    },
  }
}
</script>

<style scoped>
.checked-list {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
}

.list {
  list-style: none;
  padding: 0;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
}

.item-header {
  flex-grow: 1;
}

.checkbox {
  margin-right: 10px;
}

.item-field {
  display: inline-block;
  margin-right: 15px;
  font-size: 14px;
}

.item-actions {
  display: flex;
  align-items: center;
}

.quantity-input {
  width: 70px;
  padding: 5px;
  margin-right: 10px;
  font-size: 14px;
}

.item-button {
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
}

.item-button:hover {
  background-color: #45a049;
}

.list-button {
  width: 100%;
  padding: 10px;
  background-color: #008CBA;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;
  border-radius: 4px;
}

.list-button:hover {
  background-color: #007bb5;
}
</style>
