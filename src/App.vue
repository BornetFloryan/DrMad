<template>
  <div id="app">
    <NavBar :titles="navTitles" :loggedTitles="loggedTitles" @menu-clicked = "handleMenuClicked"/>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'App',
  components: { NavBar },
  data: () => ({
    navTitles: [
      { text: "Accueil", color: "yellow" },
      { text: "Login", color: "red" },
    ],
    loggedTitles: [
      { text: "Accueil", color: "yellow" },
      { text: "Logout", color: "green" },
      { text: "Acheter", color: "pink" },
      { text: "Payer", color: "yellow" },
      { text: "Mes commandes", color: "purple" },
    ]
  }),
  computed: {
    ...mapState('shop', ['shopUser']),
  },
  methods: {
    ...mapActions('shop', ['getAllViruses', 'shopLogout']),
    handleMenuClicked(index) {
      let routes = ['shophome', 'shoplogin'];
      if (this.shopUser) {
        routes = ['shophome', 'shophome', 'shopbuy', 'shoppay', 'shoporders'];
        if (index === 1) {
          this.shopLogout();
          if(this.$route.name !== 'shophome')
            this.$router.push({ name: 'shophome' });
          return;
        }
      }

      const targetRoute = routes[index];
      if (this.$route.name !== targetRoute) {
        this.$router.push({ name: targetRoute });
      }
    }
  },
  mounted() {
    this.getAllViruses();
  }
};
</script>
