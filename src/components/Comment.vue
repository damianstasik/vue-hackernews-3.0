<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { timeAgo } from '../util/filters';

export default {
  name: 'Comment',

  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const open = ref(true);
    const { state } = useStore();
    const comment = computed(() => state.items[props.id]);
    const pluralize = (n) => n + (n === 1 ? ' reply' : ' replies');
    const toggleLabel = computed(() => (
      open.value
        ? '[-]'
        : `[+] ${pluralize(comment.value.kids.length)} collapsed`
    ));

    return {
      open,
      comment,
      timeAgo,
      toggleLabel,
    };
  },
};
</script>

<template>
  <li
    v-if="comment"
    class="comment"
  >
    <div class="by">
      <router-link :to="{ name: 'user', params: { id: comment.by } }">
        {{ comment.by }}
      </router-link>
      {{ timeAgo(comment.time) }} ago
    </div>
    <div
      class="text"
      v-html="comment.text"
    />
    <div
      v-if="comment.kids && comment.kids.length"
      class="toggle"
      :class="{ open }"
    >
      <a @click="open = !open">
        {{ toggleLabel }}
      </a>
    </div>
    <ul
      v-show="open"
      class="comment-children"
    >
      <Comment
        v-for="commentId in comment.kids"
        :id="commentId"
        :key="commentId"
      />
    </ul>
  </li>
</template>

<style lang="scss">
.comment-children {
  .comment-children {
    margin-left: 1.5em;
  }
}

.comment {
  border-top: 1px solid #eee;
  position: relative;

  .by,
  .text,
  .toggle {
    font-size: .9em;
    margin: 1em 0;
  }

  .by {
    color: #828282;

    a {
      color: #828282;
      text-decoration: underline;
    }
  }

  .text {
    overflow-wrap: break-word;

    a:hover {
      color: #ff6600;
    }

    pre {
      white-space: pre-wrap;
    }
  }

  .toggle {
    background-color: #fffbf2;
    padding: .3em .5em;
    border-radius: 4px;

    a {
      color: #828282;
      cursor: pointer;
    }

    &.open {
      padding: 0;
      background-color: transparent;
      margin-bottom: -0.5em;
    }
  }
}
</style>
