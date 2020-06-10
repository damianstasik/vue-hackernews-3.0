<template>
  <li class="news-item">
    <span class="score">{{ item.score }}</span>
    <span class="title">
      <template v-if="item.url">
        <a
          :href="item.url"
          target="_blank"
          rel="noopener"
        >{{ item.title }}</a>
        <span class="host"> ({{ host(item.url) }})</span>
      </template>
      <template v-else>
        <router-link :to="{ name: 'item', params: { id: item.id } }">{{ item.title }}</router-link>
      </template>
    </span>
    <br>
    <span class="meta">
      <span
        v-if="item.type !== 'job'"
        class="by"
      >
        by <router-link :to="{ name: 'user', params: { id: item.by } }">{{ item.by }}</router-link>
      </span>
      <span class="time">
        {{ timeAgo(item.time) }} ago
      </span>
      <span
        v-if="item.type !== 'job'"
        class="comments-link"
      >
        | <router-link :to="{ name: 'item', params: { id: item.id } }">{{ item.descendants }} comments</router-link>
      </span>
    </span>
    <span
      v-if="item.type !== 'story'"
      class="label"
    >{{ item.type }}</span>
  </li>
</template>

<script>
import { timeAgo, host } from '../util/filters'

export default {
  name: 'NewsItem',
  props: ['item'],
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: ({ item: { id, __lastUpdated, time }}) => {
    return `${id}::${__lastUpdated}::${timeAgo(time)}`
  },
  methods: {
    timeAgo,
    host
  }
}
</script>

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
  .meta, .host {
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
