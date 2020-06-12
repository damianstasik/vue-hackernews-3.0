<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import UserView from '../views/UserView.vue';

export default {
  name: 'UserRoute',

  components: {
    UserView,
  },

  async setup() {
    const { state, dispatch } = useStore();
    const { params } = useRoute();
    const user = computed(() => state.users[params.id]);

    onMounted(() => {
      document.title = user.value
        ? user.value.id
        : 'User not found';
    });

    await dispatch('FETCH_USER', { id: params.id });

    return {
      user,
    };
  },
};
</script>

<template>
  <template v-if="user">
    <UserView :user="user" />
  </template>
  <template v-else-if="user === false">
    <h1>User not found.</h1>
  </template>
</template>
