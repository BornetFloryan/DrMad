<template>
  <div class="nav-bar">
    <button
        v-for="(link, index) in links"
        :key="index"
        :style="{ backgroundColor: link.color || '#444' }"
        @click="handleClick(link)"
    >
      <slot name="nav-button" :label="link.label">{{ link.label }}</slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleClick(link) {
      if (link.action === 'logout') {
        this.$emit('logout');
      } else if (this.$route.path !== link.to) {
        this.$router.push(link.to);
      }
    },
  },
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin: 0 5px;
  background-color: #444;
}

button:hover {
  background-color: #555;
}
</style>