<template>
  <q-item
    clickable
    :to="itemRoute"
    replace
    exact
  >
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{label}}
      </q-item-label>
      <q-item-label caption>
        <AudioDuration
          :length="bookmark.ts"
        />
      </q-item-label>
    </q-item-section>
    <q-item-section
      v-if="!readonly"
      side
    >
      <q-btn
        padding="xs"
        outline
        round
        icon="remove"
        @click="deleteBookmark"
      />
    </q-item-section>
  </q-item>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';

import { useCurrentBook } from 'lib/useBooks';

import AudioDuration from 'components/AudioDuration.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'BookmarkListItem',

  props: {
    bookmark: {
      type: Object,
      required: true,
    },

    label: {
      type: String,
      default: '?',
    },

    icon: {
      type: String,
      default: 'sym_o_bookmark',
    },

    readonly: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    AudioDuration,
  },

  setup(props) {
    const currentBook = useCurrentBook();

    const itemRoute = computed(() => ({
      name: 'player',
      params: {
        bookId: currentBook.value.id,
        timestamp: props.bookmark.ts,
      },
    }));

    function deleteBookmark(evt) {
      evt.preventDefault();
      evt.cancelBubble = true;
      props.bookmark.delete();
    }

    return {
      itemRoute,

      deleteBookmark,
    };
  },
});
</script>
