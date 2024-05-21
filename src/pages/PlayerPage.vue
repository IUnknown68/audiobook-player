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

      <SelectTrack
        :bookId="bookId"
        :trackId="trackId"
        outlined
        color="teal"
        label="Chapter"
        class="q-mt-md"
        options-selected-class="text-primary"
      />
    </div>
    <q-banner v-else class="text-white bg-red container-320">
      <span v-if="currentBook">Track not found.</span>
      <span v-else>Book not found.</span>
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
import SelectTrack from 'components/SelectTrack.vue';
import BookHeader from 'components/BookHeader.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'PlayerPage',

  components: {
    AudioPlayer,
    SelectTrack,
    BookHeader,
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
