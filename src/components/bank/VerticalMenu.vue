<template>
  <div class="vertical-menu">
    <div v-for="item in items" :key="item.label" class="menu-item">
      <div v-if="item.type === 'title'" class="menu-title">
        <strong><u>{{ item.label }}</u></strong>
      </div>
      <button v-else
              :disabled="!bankAccount"
              @click="navigate(item.to)"
              class="menu-button">
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
.vertical-menu {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 1000;
  overflow-y: auto;
}

.menu-item {
  display: flex;
  flex-direction: column;
}

.menu-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #444;
  margin-bottom: 10px;
}

.menu-button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-bottom: 10px;
}

.menu-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.menu-button:hover:not(:disabled) {
  background-color: #0056b3;
  transform: scale(1.05);
}

.menu-button:active:not(:disabled) {
  background-color: #004085;
}
</style>
