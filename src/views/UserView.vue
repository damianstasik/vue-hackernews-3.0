<template>
  <div class="user-view">
    <template v-if="user">
      <h1>User : {{ user.id }}</h1>
      <ul class="meta">
        <li><span class="label">Created:</span> {{ timeAgo(user.created) }} ago</li>
        <li><span class="label">Karma:</span> {{ user.karma }}</li>
        <li
          v-if="user.about"
          class="about"
          v-html="user.about"
        />
      </ul>
      <p class="links">
        <a :href="'https://news.ycombinator.com/submitted?id=' + user.id">submissions</a> |
        <a :href="'https://news.ycombinator.com/threads?id=' + user.id">comments</a>
      </p>
    </template>
    <template v-else-if="user === false">
      <h1>User not found.</h1>
    </template>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { timeAgo } from '../util/filters'

export default {
  name: 'UserView',

  setup() {
    const { state, dispatch } = useStore()
    const { params } = useRoute()
    const user = computed(() => state.users[params.id])

    onMounted(() => {
      dispatch('FETCH_USER', { id: params.id })
    })

    return {
      timeAgo,
      user
    }
  },

  title () {
    return this.user
      ? this.user.id
      : 'User not found'
  }
}
</script>

<style lang="scss">
.user-view {
  background-color: #fff;
  box-sizing: border-box;
  padding: 2em 3em;
  h1 {
    margin: 0;
    font-size: 1.5em;
  }
  .meta {
    list-style-type: none;
    padding: 0;
  }
  .label {
    display: inline-block;
    min-width: 4em;
  }
  .about {
    margin: 1em 0;
  }
  .links a {
    text-decoration: underline;
  }
}
</style>
