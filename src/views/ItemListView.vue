<template>
  <transition-group
    name="item"
    class="news-list"
  >
    <Item
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </transition-group>
</template>

<script>
import Item from '../components/Item.vue';

export default {
  name: 'ItemListView',

  components: {
    Item,
  },

  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.news-list {
  background-color: #fff;
  position: absolute;
  margin: 30px 0;
  width: 100%;
  transition: all .5s cubic-bezier(.55,0,.1,1);
  @media (max-width: 600px) {
    margin: 10px 0;
  }
}

.item-move, .item-enter-active, .item-leave-active {
  transition: all .5s cubic-bezier(.55,0,.1,1);
}

.item-enter {
  opacity: 0;
  transform: translate(30px, 0);
}

.item-leave-active {
  position: absolute;
  opacity: 0;
  transform: translate(30px, 0);
}
</style>
