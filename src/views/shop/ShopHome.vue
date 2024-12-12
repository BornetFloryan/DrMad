<template>
  <div>
    <h1>Bienvenue à la boutique</h1>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'ShopHome',
  components: {},
  data: () => ({
  }),
  computed: {
    ...mapState('', ['']),
  },
  methods: {
  },
  watch: {
  }
}
</script>

<style scoped>
  h1 {
    text-align: center;
  }

</style>