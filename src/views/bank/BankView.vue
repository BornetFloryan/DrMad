<template>
  <div>
    <NavBar :links="navLinks" />
    <div class="container">
      <VerticalMenu :items="menuItems">
        <template v-slot:menu-title="{ label }">
          <div><strong><u>{{ label }}</u></strong></div>
        </template>
      </VerticalMenu>
      <router-view name="bankmain"></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import VerticalMenu from "@/components/bank/VerticalMenu.vue";

export default {
  name: 'BankView',
  components: {NavBar, VerticalMenu},
  data() {
    return {
      navLinks: [{label: "Mon compte", to: "/bank/account"}],
      menuItems: [
        {type: "title", label: "Opérations"},
        {type: "link", label: "Solde", to: "/bank/amount"},
        {type: "link", label: "Débit/Virement", to: "/bank/operation"},
        {type: "title", label: "États"},
        {type: "link", label: "Historique", to: "/bank/history"}
      ]
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
}
</style>