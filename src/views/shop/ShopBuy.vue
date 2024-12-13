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
  gap: 20px;
  padding: 20px;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 5vh auto;
  background-color: #f9f9f9;
}

.left {
  width: 100%;
  max-width: 45%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.right {
  width: 100%;
  max-width: 45%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
