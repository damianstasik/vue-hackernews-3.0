<template>
  <div class="news-view">
    <div class="news-list-nav">
      <router-link
        v-if="page > 1"
        :to="{ name: type, params: { page: page - 1 } }"
      >
        &lt; prev
      </router-link>
      <a
        v-else
        class="disabled"
      >&lt; prev</a>
      <span>{{ page }}/{{ maxPage }}</span>
      <router-link
        v-if="hasMore"
        :to="{ name: type, params: { page: page + 1 } }"
      >
        more &gt;
      </router-link>
      <a
        v-else
        class="disabled"
      >more &gt;</a>
    </div>
    <transition :name="transition">
      <div
        v-if="page > 0"
        :key="page"
        class="news-list"
      >
        <transition-group
          tag="ul"
          name="item"
        >
          <item
            v-for="item in displayedItems"
            :key="item.id"
            :item="item"
          />
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  ref, computed, watch, onBeforeUnmount,
} from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { watchList } from '../api';
import Item from '../components/Item.vue';

export default {
  name: 'ItemList',

  components: {
    Item,
  },

  async setup() {
    const route = useRoute();
    const { replace } = useRouter();
    const transition = ref('slide-right');
    const page = computed(() => Number(route.params.page) || 1);

    const {
      state, dispatch, getters, commit,
    } = useStore();

    const displayedItems = computed(() => getters.activeItems);
    const type = computed(() => route.meta.type);
    const maxPage = computed(() => Math.ceil(state.lists[type.value].length / state.itemsPerPage) || 1);
    const hasMore = computed(() => page.value < maxPage.value);

    const unwatchList = watchList(type.value, (ids) => {
      commit('SET_LIST', { type: type.value, ids });
      dispatch('ENSURE_ACTIVE_ITEMS');
    });

    onBeforeUnmount(() => unwatchList());

    watch(page, (to = page.value, from = -1) => {
      dispatch('FETCH_LIST_DATA', {
        type: type.value,
      }).then(() => {
        if (page.value < 0 || page.value > maxPage.value) {
          replace({
            name: type.value,
            params: { page: 1 },
          });
          return;
        }
        // eslint-disable-next-line no-nested-ternary
        transition.value = from === -1
          ? null
          : to > from ? 'slide-left' : 'slide-right';
      });
    });

    await dispatch('FETCH_LIST_DATA', { type: type.value });

    return {
      transition,
      page,
      displayedItems,
      hasMore,
      maxPage,
      type,
    };
  },
};
</script>

<style lang="scss">
.news-view {
  padding-top: 45px;
}

.news-list-nav, .news-list {
  background-color: #fff;
  border-radius: 2px;
}

.news-list-nav {
  padding: 15px 30px;
  position: fixed;
  text-align: center;
  top: 55px;
  left: 0;
  right: 0;
  z-index: 998;
  box-shadow: 0 1px 2px rgba(0,0,0,.1);
  a {
    margin: 0 1em;
  }
  .disabled {
    color: #ccc;
  }
}

.news-list {
  position: absolute;
  margin: 30px 0;
  width: 100%;
  transition: all .5s cubic-bezier(.55,0,.1,1);
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
}

.slide-left-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
}

.slide-left-leave-to, .slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
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

@media (max-width: 600px) {
  .news-list {
    margin: 10px 0;
  }
}
</style>
