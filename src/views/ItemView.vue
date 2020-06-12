<script>
import Spinner from '../components/Spinner.vue';
import Comment from '../components/Comment.vue';
import { timeAgo, getHost } from '../util/filters';

// recursively fetch all descendent comments
// eslint-disable-next-line consistent-return
function fetchComments(store, item) {
  if (item && item.kids) {
    return store.dispatch('FETCH_ITEMS', {
      ids: item.kids,
    }).then(() => Promise.all(item.kids.map((id) => fetchComments(store, store.state.items[id]))));
  }
}

export default {
  name: 'ItemView',

  components: { Spinner, Comment },

  data: () => ({
    loading: true,
  }),

  computed: {
    item() {
      return this.$store.state.items[this.$route.params.id] || {};
    },
  },

  // refetch comments if item changed
  watch: {
    item: 'fetchComments',
  },

  async mounted() {
    const { params: { id } } = this.$route;
    await this.$store.dispatch('FETCH_ITEMS', { ids: [id] });

    document.title = this.item.title;

    this.fetchComments();
  },

  methods: {
    fetchComments() {
      if (!this.item || !this.item.kids) {
        return;
      }

      this.loading = true;
      fetchComments(this.$store, this.item).then(() => {
        this.loading = false;
      });
    },
    timeAgo,
    getHost,
  },
};
</script>

<template>
  <div
    v-if="item"
    class="item-view"
  >
    <template v-if="item">
      <div class="item-view-header">
        <a
          :href="item.url"
          target="_blank"
        >
          <h1>{{ item.title }}</h1>
        </a>
        <span
          v-if="item.url"
          class="host"
        >
          ({{ getHost(item.url) }})
        </span>
        <p class="meta">
          {{ item.score }} points
          | by
          <router-link :to="{ name: 'user', params: { id: item.by } }">
            {{ item.by }}
          </router-link>
          {{ timeAgo(item.time) }} ago
        </p>
      </div>
      <div class="item-view-comments">
        <p class="item-view-comments-header">
          {{ item.kids ? item.descendants + ' comments' : 'No comments yet.' }}
          <spinner :show="loading" />
        </p>
        <ul
          v-if="!loading"
          class="comment-children"
        >
          <Comment
            v-for="id in item.kids"
            :id="id"
            :key="id"
          />
        </ul>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.item-view-header {
  background-color: #fff;
  padding: 1.8em 2em 1em;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .1);

  h1 {
    display: inline;
    font-size: 1.5em;
    margin: 0;
    margin-right: .5em;

    @media (max-width: 600px) {
      font-size: 1.25em;
    }
  }

  .host,
  .meta,
  .meta a {
    color: #828282;
  }

  .meta a {
    text-decoration: underline;
  }
}

.item-view-comments {
  background-color: #fff;
  margin-top: 10px;
  padding: 0 2em .5em;
}

.item-view-comments-header {
  margin: 0;
  font-size: 1.1em;
  padding: 1em 0;
  position: relative;

  .spinner {
    display: inline-block;
    margin: -15px 0;
  }
}

.comment-children {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
