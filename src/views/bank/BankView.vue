<template>
  <div class="bank-view">
    <h1 class="title">Banque</h1>
    <NavBar :links="navLinks" class="navbar" />
    <div class="container">
      <VerticalMenu :items="menuItems" class="sidebar" />
      <div class="content">
        <router-view name="bankmain"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import VerticalMenu from "@/components/bank/VerticalMenu.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "BankView",
  components: { NavBar, VerticalMenu },
  computed: {
    ...mapState("bank", ["bankAccount"]),
    navLinks() {
      return [
        {
          label: this.bankAccount ? "Déconnexion" : "Mon compte",
          to: this.bankAccount ? "/bank/logout" : "/bank/account",
          color: this.bankAccount ? "#FF6347" : "#4682B4",
        },
      ];
    },
  },
  data() {
    return {
      menuItems: [
        { type: "title", label: "Opérations" },
        { type: "link", label: "Solde", to: "/bank/amount" },
        { type: "link", label: "Débit/Virement", to: "/bank/operation" },
        { type: "title", label: "États" },
        { type: "link", label: "Historique", to: "/bank/history" },
      ],
    };
  },
  methods: {
    ...mapActions("bank", ["getAccountTransactions"]),
  },
};
</script>

<style scoped>
.bank-view {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f9;
  min-height: 100vh;
  padding: 20px;
}

.title {
  text-align: center;
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 30px;
  margin-left: 270px;
}

.navbar {
  margin-left: 270px;
  margin-bottom: 5vh;
}

.container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.sidebar {
  width: 250px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 60px;
}

.content {
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-left: 270px;
}
</style>