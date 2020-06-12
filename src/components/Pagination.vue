<script>
export default {
  name: 'Pagination',

  props: {
    page: {
      type: Number,
      default: 1,
    },
    maxPage: {
      type: Number,
      default: 1,
    },
    hasMore: {
      type: Boolean,
      default: false,
    },
    routeName: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<template>
  <nav class="news-list-nav">
    <router-link
      v-if="page > 1"
      :to="{ name: routeName, params: { page: page - 1 } }"
    >
      &lt; prev
    </router-link>
    <a
      v-else
      class="disabled"
    >
      &lt; prev
    </a>
    <span>{{ page }}/{{ maxPage }}</span>
    <router-link
      v-if="hasMore"
      :to="{ name: routeName, params: { page: page + 1 } }"
    >
      more &gt;
    </router-link>
    <a
      v-else
      class="disabled"
    >
      more &gt;
    </a>
  </nav>
</template>

<style lang="scss">
.news-list-nav {
  background-color: #fff;
  padding: 15px 30px;
  position: fixed;
  text-align: center;
  top: 55px;
  left: 0;
  right: 0;
  z-index: 998;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .1);

  a {
    margin: 0 1em;
  }

  .disabled {
    color: #ccc;
  }
}
</style>
