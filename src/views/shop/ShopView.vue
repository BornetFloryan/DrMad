<template>
  <div>
    <NavBar :links="navLinks" @logout="handleLogout">
      <template v-slot:nav-button="{ label }">
        <strong v-if="label === 'Accueil'">{{ label }}</strong>
        <span v-else>{{ label }}</span>
      </template>
    </NavBar>
    <h1>Boutique</h1>
    <router-view name="shopmain"></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "ShopView",
  components: { NavBar },
  computed: {
    ...mapState("shop", ["shopUser"]),
    navLinks() {
      if (this.shopUser) {
        return [
          {label: "Accueil", to: "/shop", color: "yellow"},
          {label: "Logout", to: "/shop", color: "green", action: "logout"},
          {label: "Acheter", to: "/shop/buy", color: "pink"},
          {label: "Payer", to: "/shop/pay", color: "yellow"},
          {label: "Mes commandes", to: "/shop/orders", color: "purple"},
        ];
      }
      return [
        {label: "Accueil", to: "/shop", color: "yellow"},
        {label: "Login", to: "/shop/login", color: "red"},
      ];
    },
  },
  methods: {
    ...mapActions("shop", ["shopLogout"]),
    handleLogout() {
      this.shopLogout().then(() => {
        this.$router.push({name: "shophome"});
      });
    },
  },
};
</script>

<style scoped>
</style>