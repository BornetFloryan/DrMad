<template>
  <div class="shop-buy">
    <div class="left">
      <ItemsList />
    </div>
    <div class="right">
      <BasketList />
    </div>
  </div>
</template>

<script>
import ItemsList from '@/components/shop/ItemsList.vue';
import BasketList from '@/components/shop/BasketList.vue';

export default {
  name: 'ShopBuy',
  components: {
    ItemsList,
    BasketList
  }
};
</script>

<style scoped>
.shop-buy {
  display: flex;
  justify-content: space-between;
}

.left, .right {
  width: 45%;
}
</style>