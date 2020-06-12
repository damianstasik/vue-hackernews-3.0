<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { watchList } from '../api';
import ItemListView from '../views/ItemListView.vue';
import Pagination from '../components/Pagination.vue';

export default {
  name: 'ItemListRoute',

  components: {
    ItemListView,
    Pagination,
  },

  async setup() {
    const route = useRoute();
    const { replace } = useRouter();

    const {
      state, dispatch, getters, commit,
    } = useStore();

    const transition = ref('slide-right');
    const items = computed(() => getters.activeItems);
    const type = computed(() => route.meta.type);

    const page = computed(() => Number(route.params.page) || 1);
    const maxPage = computed(() => Math.ceil(state.lists[type.value].length / state.itemsPerPage) || 1);
    const hasMore = computed(() => page.value < maxPage.value);

    watch([page, type], async ([to, currentType], [from = -1], onInvalidate) => {
      const unwatchList = watchList(currentType, (ids) => {
        commit('SET_LIST', { type: currentType, ids });
        dispatch('ENSURE_ACTIVE_ITEMS');
      });

      await dispatch('FETCH_LIST_DATA', {
        type: currentType,
      });

      if (page.value < 0 || page.value > maxPage.value) {
        replace({
          name: currentType,
          params: { page: 1 },
        });
        return;
      }

      // eslint-disable-next-line no-nested-ternary
      transition.value = from === -1
        ? null
        : to > from
          ? 'slide-left'
          : 'slide-right';

      onInvalidate(() => unwatchList());
    });

    await dispatch('FETCH_LIST_DATA', { type: type.value });

    return {
      transition,
      page,
      items,
      hasMore,
      maxPage,
      type,
    };
  },
};
</script>

<template>
  <Pagination
    :page="page"
    :maxPage="maxPage"
    :hasMore="hasMore"
    :routeName="type"
  />
  <div class="news-view">
    <transition :name="transition">
      <ItemListView
        :key="page"
        :items="items"
      />
    </transition>
  </div>
</template>

<style lang="scss">
.news-view {
  padding-top: 45px;
}

.slide-left-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
}

.slide-left-leave-to,
.slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}
</style>
