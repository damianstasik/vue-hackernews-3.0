<script>
import Skeleton from '../components/Skeleton.vue';
import { timeAgo } from '../util/filters';

export default {
  name: 'UserView',

  components: {
    Skeleton,
  },

  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },

  setup() {
    return {
      timeAgo,
    };
  },
};
</script>

<template>
  <div class="user-view">
    <h1>
      User:
      <Skeleton
        :active="!user.id"
        style="width: 100px"
      >
        {{ user.id }}
      </Skeleton>
    </h1>
    <ul class="meta">
      <li>
        <span class="label">Created:</span>
        <Skeleton
          :active="!user.id"
          style="width: 90px"
        >
          {{ timeAgo(user.created) }} ago
        </Skeleton>
      </li>
      <li>
        <span class="label">Karma:</span>
        <Skeleton
          :active="!user.id"
          style="width: 50px"
        >
          {{ user.karma }}
        </Skeleton>
      </li>
      <li
        v-if="user.about"
        class="about"
        v-html="user.about"
      />
    </ul>
    <p
      v-if="user.id"
      class="links"
    >
      <a :href="'https://news.ycombinator.com/submitted?id=' + user.id">submissions</a> |
      <a :href="'https://news.ycombinator.com/threads?id=' + user.id">comments</a>
    </p>
    <p
      v-else
      class="links"
    >
      <Skeleton style="width: 80px" /> | <Skeleton style="width: 80px" />
    </p>
  </div>
</template>

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
