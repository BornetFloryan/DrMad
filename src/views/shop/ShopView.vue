<template>
  <div class="shop-view">
    <h1 class="shop-title">Boutique</h1>
    <NavBar :links="navLinks" @logout="handleLogout">
      <template v-slot:nav-button="{ label }">
        <strong v-if="label === 'Accueil'" class="highlighted-nav-button">{{ label }}</strong>
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
          {label: "Déconnexion", to: "/shop", color: "#FF6347", action: "logout"},
          {label: "Acheter", to: "/shop/buy", color: "#FF69B4"},
          {label: "Payer", to: "/shop/pay", color: "#1E90FF"},
          {label: "Mes commandes", to: "/shop/orders", color: "#9370DB"},
        ];
      }
      return [
        {label: "Connexion", to: "/shop/login", color: "#4682B4"},
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
.shop-view {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f9;
}

.shop-title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  padding: 20px 0;
  margin-top: 0;
}

nav {
  margin-top: 20px;
  padding: 10px 0;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-links a {
  text-decoration: none;
  color: #333;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-links a:hover {
  color: white;
  background-color: #333;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ff4081;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #e0376d;
}

button:focus {
  outline: none;
}
</style>
