<template>
  <div v-if="found" class="container-340">
    <BookHeader
      :book="currentBook"
      :timestamp="currentTimestamp"
    />

    <PlayerControls
      :book="currentBook"
      :timestamp="currentTimestamp"
      class="q-mb-xs"
      @seek="handleSeek"
      @ended="handleEnded"
      @paused="handlePaused"
      @pause="handlePause"
      @play="handlePlay"
    />
    <div class="flex no-wrap justify-end items-center gap-md q-mb-md">
      <BookmarkList
        flat
        round
        color="primary"
        icon="bookmarks"
      />
    </div>
  </div>

  <q-banner v-else-if="currentBook" class="text-white bg-red container-340">
    <template v-slot:avatar>
      <q-icon name="subtitles_off" color="white" />
    </template>
    {{$t('trackNotFound')}}
  </q-banner>

  <q-banner v-else class="text-white bg-red container-340">
    <template v-slot:avatar>
      <q-icon name="tv_off" />
    </template>
    {{$t('bookNotFound')}}
  </q-banner>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';
import {
  useRoute,
  useRouter,
} from 'vue-router';

import { useCurrentBook } from 'lib/useBooks';
import { useMediaControls } from 'lib/useAudio';

import PlayerControls from 'components/PlayerControls.vue';
import BookHeader from 'components/BookHeader.vue';
import BookmarkList from 'components/BookmarkList.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'AudioPlayer',

  components: {
    PlayerControls,
    BookHeader,
    BookmarkList,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const {
      play,
      pause,
      shouldBePlaying,
      currentTime,
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

    function saveLastRead(position) {
      if (currentBook.value) {
        currentBook.value.bookmarks.lastRead = position.toFixed();
      }
    }

    function handleSeek(newPosition) {
      if (shouldBePlaying.value) {
        saveLastRead(newPosition);
      }
      navigateTimestamp(newPosition);
    }

    function handlePaused(newPosition) {
      navigateTimestamp(newPosition);
    }

    function handleEnded(newPosition) {
      if (newPosition < currentBook.value.length) {
        navigateTimestamp(newPosition);
        saveLastRead(newPosition);
      } else {
        pause();
        navigateTimestamp(0);
        saveLastRead(0);
      }
    }

    function handlePlay() {
      saveLastRead(currentTrack.value.start + currentTime.value);
      play();
    }

    function handlePause() {
      saveLastRead(currentTrack.value.start + currentTime.value);
      pause();
    }

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
