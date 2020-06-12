# vue-hackernews-3.0

HackerNews clone built with Vue 3.0 + vue-router + vuex.

## Features

> Note: in practice, it is unnecessary to code-split for an app of this size (where each async chunk is only a few kilobytes), nor is it optimal to extract an extra CSS file (which is only 1kb) -- they are used simply because this is a demo app showcasing all the supported features.

- Progressive Web App
  - App manifest
  - 100/100 Lighthouse score
- Single-file Vue Components
  - Hot-reload in development
  - CSS extraction for production
- Animation
  - Effects when switching route views
  - Real-time list updates with FLIP Animation

## A Note on Performance

This demo uses the Firebase-based HN API to showcase real-time updates, but the Firebase API also comes with a larger bundle, more JavaScript to parse on the client, and doesn't offer an efficient way to batch-fetch pages of items, so it impacts performance quite a bit on a cold start or cache miss.

## Build Setup

**Requires Node.js 12+**

``` bash
# install dependencies
npm i # or yarn

# serve in dev mode, with hot reload at localhost:8080
npm run dev

# build for production
npm run build
```

## License

MIT
