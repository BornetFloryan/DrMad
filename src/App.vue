<template>
  <div id="app">
    <NavBar :links="navLinks">
      <template v-slot:nav-button="{ label }">
        <strong v-if="label === 'Boutique'">{{ label }}</strong>
      </template>
    </NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import {mapActions} from "vuex";

export default {
  name: "App",
  components: {NavBar},
  data: () => ({
    navLinks: [
      {label: "Boutique", to: "/shop", color: "blue"},
      {label: "Banque", to: "/bank", color: "green"},
    ],
  }),
  methods: {
    ...mapActions("shop", ["getAllViruses"]),
  },
  mounted() {
    this.getAllViruses();
  }
};
</script>
