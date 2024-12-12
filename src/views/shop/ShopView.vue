<template>
  <div>
    <h1>Boutique</h1>
    <NavBar :links="navLinks" @logout="handleLogout">
      <template v-slot:nav-button="{ label }">
        <strong v-if="label === 'Accueil'">{{ label }}</strong>
        <span v-else>{{ label }}</span>
      </template>
    </NavBar>
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
          {label: "Logout", to: "/shop", color: "red", action: "logout"},
          {label: "Acheter", to: "/shop/buy", color: "pink"},
          {label: "Payer", to: "/shop/pay", color: "blue"},
          {label: "Mes commandes", to: "/shop/orders", color: "purple"},
        ];
      }
      return [
        {label: "Login", to: "/shop/login", color: "blue"},
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