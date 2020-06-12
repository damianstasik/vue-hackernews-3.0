<script>
import { defineAsyncComponent } from 'vue';

const UserView = defineAsyncComponent(() => import('./views/UserView.vue'));
const Pagination = defineAsyncComponent(() => import('./components/Pagination.vue'));
const Item = defineAsyncComponent(() => import('./components/Item.vue'));

export default {
  name: 'App',

  components: {
    UserView,
    Pagination,
    Item,
  },
};
</script>

<template>
  <header class="header">
    <nav class="inner">
      <router-link
        to="/"
        exact
      >
        <img
          class="logo"
          src="/logo-48.png"
          alt="logo"
        >
      </router-link>
      <router-link :to="{ name: 'top' }">
        Top
      </router-link>
      <router-link :to="{ name: 'new' }">
        New
      </router-link>
      <router-link :to="{ name: 'show' }">
        Show
      </router-link>
      <router-link :to="{ name: 'ask' }">
        Ask
      </router-link>
      <router-link :to="{ name: 'job' }">
        Jobs
      </router-link>
      <a
        class="github"
        href="https://github.com/visualfanatic/vue-hackernews-3.0"
        target="_blank"
        rel="noopener"
      >
        Built with Vue.js
      </a>
    </nav>
  </header>
  <div class="view">
    <transition
      name="fade"
      mode="out-in"
    >
      <Suspense>
        <template #default>
          <router-view />
        </template>
        <template #fallback>
          <template v-if="$route.meta.type === 'user'">
            <UserView />
          </template>
          <template v-if="$route.meta.type === 'top'">
            <Pagination />
            <div class="list">
              <Item
                v-for="n in 20"
                :key="n"
              />
            </div>
          </template>
          <template v-else>
            <p class="loading">
              Loading {{ $route.meta.type }}...
            </p>
          </template>
        </template>
      </Suspense>
    </transition>
  </div>
</template>

<style lang="scss">
body {
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    sans-serif;
  font-size: 15px;
  background-color: lighten(#eceef1, 30%);
  margin: 0;
  padding-top: 55px;
  color: #34495e;
  overflow-y: scroll;
}

.list {
  padding-top: 45px;
  margin: 30px 0;
}

.loading {
  text-align: center;
}

a {
  color: #34495e;
  text-decoration: none;
}

.header {
  background-color: #ff6600;
  position: fixed;
  z-index: 999;
  height: 55px;
  top: 0;
  left: 0;
  right: 0;

  .inner {
    max-width: 800px;
    box-sizing: border-box;
    margin: 0px auto;
    padding: 15px 5px;

    @media (max-width: 600px) {
      padding: 15px;
    }

    @media (max-width: 860px) {
      padding: 15px 30px;
    }
  }

  a {
    color: rgba(255, 255, 255, .8);
    line-height: 24px;
    transition: color .15s ease;
    display: inline-block;
    vertical-align: middle;
    font-weight: 300;
    letter-spacing: .075em;
    margin-right: 1.8em;

    @media (max-width: 600px) {
      margin-right: 1em;
    }

    &:hover {
      color: #fff;
    }

    &.router-link-active {
      color: #fff;
      font-weight: 400;
    }

    &:nth-child(6) {
      margin-right: 0;
    }
  }

  .github {
    color: #fff;
    font-size: .9em;
    margin: 0;
    float: right;

    @media (max-width: 600px) {
      display: none;
    }
  }
}

.logo {
  width: 24px;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
}

.view {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
