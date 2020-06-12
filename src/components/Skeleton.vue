<script>
export default {
  name: 'Skeleton',

  inheritAttrs: false,

  props: {
    active: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<template>
  <span
    v-if="active"
    class="root"
    v-bind="$attrs"
  />
  <slot v-else />
</template>

<style lang="scss">
// Although heavily simplified, styles originally copied from Buefy
$skeleton-color: #dbdbdb;

@keyframes loading {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}

.root {
  display: inline-block;
  background: linear-gradient(
    90deg,
    $skeleton-color 25%,
    rgba($skeleton-color, 0.5) 50%,
    $skeleton-color 75%
  );
  background-size: 400% 100%;
  line-height: inherit;
  border-radius: 3px;
  animation: loading 1s infinite;

  &::after {
    content: "\00a0";
  }
}
</style>
