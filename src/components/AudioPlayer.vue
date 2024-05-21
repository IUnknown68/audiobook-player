<template>
  <div class="position-relative">
    <div class="q-mx-sm">
      <q-slider
        :min="0"
        :max="durationSeconds - 1"
        v-model="currentTime"
      />
    </div>
    <div class="flex justify-between">
      <AudioDuration :length="currentTimeSeconds" />
      <AudioDuration :length="remainingSeconds" />
    </div>

    <div class="flex no-wrap justify-between items-center gap-md q-mb-md">
      <q-btn
        v-bind="allButtonProps"
        icon="skip_previous"
        @click="skipPrevious"
      />
      <q-btn
        v-bind="allButtonProps"
        icon="replay_10"
        @click="replay10"
      />
      <q-btn
        round
        unelevated
        color="primary"
        size="lg"
        :loading="busy"
        :icon="currentPlayIcon"
        @click="togglePlay"
      />
      <q-btn
        v-bind="allButtonProps"
        icon="forward_10"
        @click="forward10"
      />
      <q-btn
        v-bind="allButtonProps"
        icon="skip_next"
        @click="skipNext"
      />
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  watch,
} from 'vue';
import {
  useRouter,
} from 'vue-router';

import AudioDuration from 'components/AudioDuration.vue';

import useBookAndTrackFromProps from 'lib/useBookAndTrackFromProps';
import { useMediaControls } from 'lib/useAudio';

// Number of seconds that has to have passed to jump to beginning of
// chapter instead of previous chapter:
const MIN_TIME_IN_CHAPTER = 1;

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'AudioPlayer',

  components: {
    AudioDuration,
  },

  props: {
    bookId: {
      type: String,
      default: '',
    },

    trackId: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const router = useRouter();

    const {
      playing,
      seeking,
      currentTime,
      duration,
      waiting,
      ended,

      replay10,
      forward10,
      togglePlay,
      // setAudioSrc,
    } = useMediaControls();

    const {
      bookId,
      currentBook,
      trackIndex,
    } = useBookAndTrackFromProps(props);

    const busy = computed(() => (waiting.value || seeking.value));

    const durationSeconds = computed(() => Math.ceil(duration.value));
    const currentTimeSeconds = computed(() => Math.floor(currentTime.value));

    const currentPlayIcon = computed(() => (playing.value ? 'pause' : 'play_arrow'));
    const remainingSeconds = computed(() => durationSeconds.value - currentTimeSeconds.value);

    const allButtonProps = {
      round: true,
      outline: true,
      color: 'primary',
    };

    function navigateTrack(track) {
      if (!track) {
        return;
      }
      router.replace({
        name: 'player',
        params: {
          bookId: bookId.value,
          trackId: track.id,
        },
      });
    }

    function skipPrevious() {
      if (currentTime.value > MIN_TIME_IN_CHAPTER) {
        currentTime.value = 0;
      } else {
        navigateTrack(currentBook.value.tracks[trackIndex.value - 1]);
      }
    }

    function skipNext() {
      navigateTrack(currentBook.value.tracks[trackIndex.value + 1]);
    }

    watch(ended, (hasEnded) => {
      if (hasEnded) {
        skipNext();
      }
    });

    return {
      allButtonProps,

      currentPlayIcon,
      currentTimeSeconds,
      currentTime, // Slider has to use currentTime as it also sets the value.
      durationSeconds,
      remainingSeconds,
      busy,

      skipPrevious,
      replay10,
      togglePlay,
      forward10,
      skipNext,
    };
  },
});
</script>
