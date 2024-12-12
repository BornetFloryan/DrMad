<template>
  <div>
    <ul>
      <li v-for="(item, index) in data" :key="index">
        <input v-if="itemCheck" type="checkbox" :checked="checked[index]" @change = "checkedChanged(index)"/>
        <div v-for="field in fields" :key="field">
            {{ item[field] }}
        </div>
        <input
            v-if="itemAmount"
            type="number"
            v-model.number="inputValues[index]"
            placeholder="Quantité"
            min="1"
        />
        <button v-if="itemButton.show" @click="itemButtonClicked(index, inputValues[index])">{{ itemButton.text }}</button>
      </li>
    </ul>
      <button v-if="listButton.show" @click = "listButtonClicked()">{{ listButton.text }}</button>
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
</style>