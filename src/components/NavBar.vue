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
  top: 0;
  z-index: 1000;
}

button {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease;
  margin: 0 10px;
  background-color: #444;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

button:hover {
  transform: scale(1.05);
  filter: brightness(1.2);
}

button:active {
  transform: scale(0.95);
  box-shadow: none;
}
</style>
