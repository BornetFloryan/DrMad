<template>
  <div>
    <h1>Banque</h1>
    <NavBar :links="navLinks" />
    <div class="container">
      <VerticalMenu :items="menuItems" />
      <router-view name="bankmain"></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import VerticalMenu from "@/components/bank/VerticalMenu.vue";
import {mapActions, mapState} from 'vuex';

export default {
  name: 'BankView',
  components: { NavBar, VerticalMenu },
  computed: {
    ...mapState('bank', ['bankAccount']),
    navLinks() {
      return [
        { label: this.bankAccount ? "Déconnexion" : "Mon compte", to: this.bankAccount ? "/bank/logout" : "/bank/account" }
      ];
    }
  },
  data() {
    return {
      menuItems: [
        { type: "title", label: "Opérations" },
        { type: "link", label: "Solde", to: "/bank/amount" },
        { type: "link", label: "Débit/Virement", to: "/bank/operation" },
        { type: "title", label: "États" },
        { type: "link", label: "Historique", to: "/bank/history" }
      ]
    };
  },
  methods:{
    ...mapActions('bank', ['getAccountTransactions'])
  },
};
</script>

<style scoped>
.container {
  display: flex;
}
</style>