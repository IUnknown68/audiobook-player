<template>
  <q-page class="q-pa-md flex justify-center">
    <div>
      <BookHeader
        :bookId="bookId"
        :trackId="trackId"
      />

      <AudioPlayer
        :bookId="bookId"
        :trackId="trackId"
      />

      <TrackList
        :bookId="bookId"
        :trackId="trackId"
        outlined
        color="teal"
        label="Chapter"
        class="q-mt-md"
        options-selected-class="text-primary"
      />
    </div>
  </q-page>
</template>

<script>
import {
  defineComponent,
} from 'vue';

import useCurrentBookAndTrack from 'lib/useCurrentBookAndTrack';

import AudioPlayer from 'components/AudioPlayer.vue';
import TrackList from 'components/TrackList.vue';
import BookHeader from 'components/BookHeader.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'PlayerPage',

  components: {
    AudioPlayer,
    TrackList,
    BookHeader,
  },

  setup() {
    const {
      bookId,
      trackId,
      currentBook,
    } = useCurrentBookAndTrack();

    return {
      bookId,
      trackId,
      currentBook,
    };
  },
});
</script>
