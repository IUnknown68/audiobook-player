<template>
  <q-page class="q-pa-md row items-start justify-center">
    <div v-if="found" class="container-340">
      <BookHeader
        :bookId="bookId"
        :trackId="trackId"
      />

      <AudioPlayer
        :bookId="bookId"
        :trackId="trackId"
      />

      <BookFooter
        :bookId="bookId"
      />
    </div>

    <q-banner v-else-if="currentBook" class="text-white bg-red container-340">
      <template v-slot:avatar>
        <q-icon name="subtitles_off" color="white" />
      </template>
      Track not found.
    </q-banner>

    <q-banner v-else class="text-white bg-red container-340">
      <template v-slot:avatar>
        <q-icon name="tv_off" />
      </template>
      Book not found
    </q-banner>
  </q-page>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';

import useCurrentBookAndTrack from 'lib/useCurrentBookAndTrack';

import AudioPlayer from 'components/AudioPlayer.vue';
import BookHeader from 'components/BookHeader.vue';
import BookFooter from 'components/BookFooter.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'PlayerPage',

  components: {
    AudioPlayer,
    BookHeader,
    BookFooter,
  },

  setup() {
    const {
      bookId,
      trackId,
      currentBook,
      currentTrack,
    } = useCurrentBookAndTrack();

    const found = computed(() => currentBook.value && currentTrack.value);

    return {
      found,
      bookId,
      trackId,
      currentBook,
    };
  },
});
</script>
