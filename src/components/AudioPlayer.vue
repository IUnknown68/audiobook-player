<template>
  <div v-if="found" class="container-340">
    <BookHeader
      :book="currentBook"
      :timestamp="currentTimestamp"
    />

    <PlayerControls
      :book="currentBook"
      :timestamp="currentTimestamp"
      @seek="handleSeek"
      @ended="handleEnded"
      @paused="handlePaused"
      @pause="handlePause"
      @play="handlePlay"
    />

    <BookFooter
      :book="currentBook"
    />
  </div>

  <q-banner v-else-if="currentBook" class="text-white bg-red container-340">
    <template v-slot:avatar>
      <q-icon name="subtitles_off" color="white" />
    </template>
    $t('trackNotFound')
  </q-banner>

  <q-banner v-else class="text-white bg-red container-340">
    <template v-slot:avatar>
      <q-icon name="tv_off" />
    </template>
    $t('bookNotFound')
  </q-banner>
</template>

<script>
import {
  defineComponent,
  computed,
  watch,
} from 'vue';
import {
  useRoute,
  useRouter,
} from 'vue-router';

import { useCurrentBook } from 'lib/useBooks';
import { useMediaControls } from 'lib/useAudio';

import PlayerControls from 'components/PlayerControls.vue';
import BookHeader from 'components/BookHeader.vue';
import BookFooter from 'components/BookFooter.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'AudioPlayer',

  components: {
    PlayerControls,
    BookHeader,
    BookFooter,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const {
      play,
      pause,
    } = useMediaControls();

    const currentBook = useCurrentBook();
    const currentTimestamp = computed(() => parseInt(route.params.timestamp, 10) || 0);
    const currentTrack = computed(() => currentBook.value?.findTrack(currentTimestamp.value));

    const found = computed(() => currentBook.value && currentTrack.value);

    function navigateTimestamp(newPosition) {
      const timestamp = Math.floor(newPosition);
      router.replace({
        name: 'player',
        params: {
          bookId: currentBook.value.id,
          timestamp,
        },
      });
    }

    function handleSeek(newPosition) {
      navigateTimestamp(newPosition);
    }

    function handlePaused(newPosition) {
      navigateTimestamp(newPosition);
    }

    function handleEnded(newPosition) {
      if (newPosition < currentBook.value.length) {
        navigateTimestamp(newPosition);
      } else {
        pause();
        navigateTimestamp(0);
      }
    }

    function handlePlay() {
      play();
    }

    function handlePause() {
      pause();
    }

    watch(route, () => {
      if (currentBook.value) {
        currentBook.value.lastRead = currentTimestamp.value;
      }
    });

    return {
      currentBook,
      currentTimestamp,
      found,

      handleSeek,
      handlePaused,
      handleEnded,
      handlePlay,
      handlePause,
    };
  },
});
</script>
