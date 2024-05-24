<template>
  <q-expansion-item
    expand-icon-toggle
    group="books"
    :to="itemRoute"
  >
    <template v-slot:header>
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
          {{book.tracks.length}} {{$t('chapters')}}, <AudioDuration :length="book.length" />
        </q-item-label>
      </q-item-section>
    </template>
    <div class="q-pb-md q-pt-sm q-pl-lg">
      {{book.description}}
      <BookFooter
        :book="book"
        class="q-mt-sm"
      />
    </div>
  </q-expansion-item>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';

import AudioDuration from 'components/AudioDuration.vue';
import BookFooter from 'components/BookFooter.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'BookListItem',

  components: {
    AudioDuration,
    BookFooter,
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
        timestamp: props.book.lastRead,
      },
    }));

    return {
      itemRoute,
    };
  },
});
</script>
