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

<template>
  <div class="news-list">
    <transition-group name="item">
      <Item
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </transition-group>
  </div>
</template>

<style lang="scss">
.news-list {
  background-color: #fff;
  position: absolute;
  margin: 30px 0;
  width: 100%;
  transition: all .5s cubic-bezier(.55, 0, .1, 1);

  @media (max-width: 600px) {
    margin: 10px 0;
  }
}

.item-move,
.item-enter-active,
.item-leave-active {
  transition: all .5s cubic-bezier(.55, 0, .1, 1);
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
