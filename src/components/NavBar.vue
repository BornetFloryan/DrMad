<template>
  <div class="nav-bar">
    <div v-if="!shopUser">
      <button @click="menuClicked(index)" v-for="(title, index) in titles" :key="index" :style="{ backgroundColor: title.color }">
        {{ title.text }}
      </button>
    </div>
    <div v-else>
      <button @click="menuClicked(index)" v-for="(title, index) in loggedTitles" :key="index" :style="{ backgroundColor: title.color }">
        {{ title.text }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'NavBar',
  props: {
    titles: Array,
    loggedTitles: Array,
  },
  computed: {
    ...mapState('shop', ['shopUser']),
  },
  methods: {
    menuClicked(index) {
      this.$emit('menu-clicked', index);
    },
  },
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: lightgray;
}

button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>