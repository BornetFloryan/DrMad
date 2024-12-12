<template>
  <div class="vertical-menu">
    <div v-for="item in items" :key="item.label">
      <template v-if="item.type === 'title'">
        <slot name="menu-title" :label="item.label">
          <div class="menu-title">{{ item.label }}</div>
        </slot>
      </template>
      <template v-else-if="item.type === 'link'">
        <router-link :to="item.to" class="menu-link">
          <slot name="menu-link" :label="item.label">
            <button>{{ item.label }}</button>
          </slot>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerticalMenu',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.vertical-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.menu-title {
  font-weight: bold;
  text-decoration: underline;
}
.menu-link {
  text-decoration: none;
}
</style>