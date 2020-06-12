<script>
import { timeAgo, getHost } from '../util/filters';
import Skeleton from './Skeleton.vue';

export default {
  name: 'NewsItem',

  components: {
    Skeleton,
  },

  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  setup() {
    return {
      timeAgo,
      getHost,
    };
  },
};
</script>

<template>
  <article class="news-item">
    <span class="score">
      <Skeleton
        :active="!item.id"
        style="width: 20px;"
      >
        {{ item.score }}
      </Skeleton>
    </span>
    <span class="title">
      <Skeleton
        :active="!item.id"
        style="width: 290px;"
      >
        <template v-if="item.url">
          <a
            :href="item.url"
            target="_blank"
            rel="noopener"
          >
            {{ item.title }}
          </a>
          <span class="host">
            ({{ getHost(item.url) }})
          </span>
        </template>
        <template v-else>
          <router-link :to="{ name: 'item', params: { id: item.id } }">
            {{ item.title }}
          </router-link>
        </template>
      </Skeleton>
    </span>
    <br>
    <Skeleton
      :active="!item.id"
      style="width: 150px;"
    >
      <span class="meta">
        <span
          v-if="item.type !== 'job'"
          class="by"
        >
          by
          <router-link :to="{ name: 'user', params: { id: item.by } }">
            {{ item.by }}
          </router-link>
        </span>
        <span class="time">
          {{ timeAgo(item.time) }} ago
        </span>
        <span
          v-if="item.type !== 'job'"
          class="comments-link"
        >
          |
          <router-link :to="{ name: 'item', params: { id: item.id } }">
            {{ item.descendants }} comments
          </router-link>
        </span>
      </span>
      <span
        v-if="item.type !== 'story'"
        class="label"
      >
        {{ item.type }}
      </span>
    </Skeleton>
  </article>
</template>

<style lang="scss">
.news-item {
  background-color: #fff;
  padding: 20px 30px 20px 80px;
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 20px;

  .score {
    color: #ff6600;
    font-size: 1.1em;
    font-weight: 700;
    position: absolute;
    top: 50%;
    left: 0;
    width: 80px;
    text-align: center;
    margin-top: -10px;
  }

  .time {
    margin-left: 5px;
  }

  .meta,
  .host {
    font-size: .85em;
    color: #828282;

    a {
      color: #828282;
      text-decoration: underline;

      &:hover {
        color: #ff6600;
      }
    }
  }
}
</style>
