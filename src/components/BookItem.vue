<template>
  <q-item
    :to="itemRoute"
  >
    <q-item-section avatar>
      <q-avatar square>
        <img :src="book.cover.href">
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label caption>
        {{book.author}}
      </q-item-label>
      <q-item-label class="text-subtitle1">
        {{book.title}}
      </q-item-label>
      <q-item-label caption>
        {{book.tracks.length}} Chapters, <TrackLength :length="book.length" />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';

import TrackLength from 'components/TrackLength.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'BookItem',

  components: {
    TrackLength,
  },

  props: {
    book: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const itemRoute = computed(() => ({
      name: 'player',
      params: {
        bookId: props.book.id,
        trackId: '',
      },
    }));

    return {
      itemRoute,
    };
  },
});
</script>
