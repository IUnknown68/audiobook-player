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
      <TrackLength :length="currentTimeSeconds" />
      <TrackLength :length="remainingSeconds" />
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
        :disabled="disabled"
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

    <q-inner-loading :showing="waiting">
      <q-spinner-tail size="50px" color="secondary" />
    </q-inner-loading>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  computed,
  watch,
  onMounted,
} from 'vue';
import {
  useRouter,
} from 'vue-router';

import TrackLength from 'components/TrackLength.vue';

import useBookAndTrackFromProps from 'lib/useBookAndTrackFromProps';
import { useMediaControls } from 'lib/useAudio';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'AudioPlayer',

  components: {
    TrackLength,
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

  setup(props, { emit }) {
    const router = useRouter();

    const {
      playing,
      currentTime,
      duration,
      waiting,
      ended,
      audioRef,
    } = useMediaControls();

    const {
      bookId,
      currentTrack,
      currentBook,
      trackIndex,
    } = useBookAndTrackFromProps(props);

    const disabled = computed(() => !currentTrack.value);

    const durationSeconds = computed(() => Math.ceil(duration.value));
    const currentTimeSeconds = computed(() => Math.floor(currentTime.value));

    const currentPlayIcon = computed(() => (playing.value ? 'pause' : 'play_arrow'));
    const remainingSeconds = computed(() => durationSeconds.value - currentTimeSeconds.value);

    const allButtonProps = reactive({
      round: true,
      outline: true,
      color: 'primary',
      disabled,
    });

    let wasPlaying = false;

    function navigateTrack(track) {
      router.replace({
        name: 'player',
        params: {
          bookId,
          trackId: track.id,
        },
      });
    }

    function skipPrevious() {
      if (currentTime.value) {
        currentTime.value = 0;
        return;
      }
      const previousTrack = currentBook.value.tracks[trackIndex.value - 1];
      if (previousTrack) {
        navigateTrack(previousTrack);
      }
    }

    function replay10() {
      currentTime.value = Math.max(0, currentTime.value - 10);
    }

    function togglePlay() {
      if (playing.value) {
        audioRef.value.pause();
      } else {
        audioRef.value.play();
      }
    }

    function forward10() {
      currentTime.value = Math.min(duration.value, currentTime.value + 10);
    }

    function skipNext() {
      const nextTrack = currentBook.value.tracks[trackIndex.value + 1];
      if (nextTrack) {
        navigateTrack(nextTrack);
      }
    }

    async function setAudioSrc(track) {
      wasPlaying = playing.value;
      audioRef.value.src = track.url;
    }

    watch(ended, (newValue) => {
      if (newValue) {
        emit('ended');
      }
    });

    watch(currentTrack, (newValue) => {
      setAudioSrc(newValue);
    });

    watch(waiting, (newValue) => {
      if (!newValue && wasPlaying) {
        audioRef.value.play();
      }
    });

    onMounted(() => {
      setAudioSrc(currentTrack.value);
    });

    return {
      allButtonProps,

      currentPlayIcon,
      currentTimeSeconds,
      currentTime, // Slider has to use currentTime as it also sets the value.
      durationSeconds,
      remainingSeconds,
      waiting,
      ended,
      disabled,

      skipPrevious,
      replay10,
      togglePlay,
      forward10,
      skipNext,
    };
  },
});
</script>
