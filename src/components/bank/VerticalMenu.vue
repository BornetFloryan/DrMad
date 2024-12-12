<template>
  <div>
    <div v-for="item in items" :key="item.label">
      <div v-if="item.type === 'title'">
        <strong><u>{{ item.label }}</u></strong>
      </div>
      <button v-else :disabled="!bankAccount" @click="navigate(item.to)">
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'VerticalMenu',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState('bank', ['bankAccount']),
  },
  methods: {
    navigate(to) {
      if (this.$route.path !== to) {
        this.$router.push(to);
      }
    },
  },
};
</script>

<style scoped>
</style>