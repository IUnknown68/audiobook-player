<template>
  <div class="position-relative">
    <div class="q-mx-sm row gap-xs">
      <q-slider
        :min="0"
        :max="durationSeconds - 1"
        v-model="currentTime"
        @change="handleSliderRelease"
      />
    </div>
    <div class="flex justify-between">
      <AudioDuration :length="currentTimeSeconds" />
      <AudioDuration :length="remainingSeconds" />
    </div>

    <div class="flex no-wrap justify-between items-center gap-md">
      <q-btn
        v-bind="allButtonProps"
        icon="skip_previous"
        @click="handleSkipPrevious"
      />
      <q-btn
        v-bind="allButtonProps"
        icon="replay_10"
        @click="handleReplay10"
      />
      <q-btn
        round
        unelevated
        color="primary"
        size="lg"
        :loading="busy"
        :icon="currentPlayIcon"
        @click="handleTogglePlay"
      />
      <q-btn
        v-bind="allButtonProps"
        icon="forward_10"
        @click="handleForward10"
      />
      <q-btn
        v-bind="allButtonProps"
        icon="skip_next"
        @click="handleSkipNext"
      />
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  watch,
  onMounted,
} from 'vue';

import AudioDuration from 'components/AudioDuration.vue';

import { useMediaControls } from 'lib/useAudio';

// Number of seconds that has to have passed to consider
// the track as started:
const MIN_TIME_IN_TRACK = 1;

const allButtonProps = {
  round: true,
  outline: true,
  color: 'primary',
};

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'PlayerControls',

  components: {
    AudioDuration,
  },

  props: {
    book: {
      type: Object,
      required: true,
    },

    timestamp: {
      type: Number,
      default: 0,
    },
  },

  setup(props, { emit }) {
    const {
      playing,
      seeking,
      waiting,
      currentTime,
      duration,
      ended,
      audioSource,
    } = useMediaControls();

    const busy = computed(() => (waiting.value || seeking.value));

    const durationSeconds = computed(() => Math.ceil(duration.value));
    const currentTimeSeconds = computed(() => Math.floor(currentTime.value));

    const currentPlayIcon = computed(() => (playing.value ? 'pause' : 'play_arrow'));
    const remainingSeconds = computed(() => durationSeconds.value - currentTimeSeconds.value);

    const currentTrack = computed(() => props.book.findTrack(props.timestamp));

    function handleSkipPrevious() {
      if (currentTime.value <= MIN_TIME_IN_TRACK) {
        const prevTrack = props.book.tracks[currentTrack.value.index - 1];
        if (prevTrack) {
          emit('seek', prevTrack.start);
          return;
        }
      }
      if (currentTrack.value.start === props.timestamp) {
        currentTime.value = 0;
        return;
      }
      emit('seek', currentTrack.value.start);
    }

    function handleSkipNext() {
      const nextTrack = props.book.tracks[currentTrack.value.index + 1];
      if (nextTrack) {
        emit('seek', nextTrack.start);
      }
    }

    function handleReplay10() {
      emit('seek', currentTrack.value.start + Math.floor(currentTime.value) - 10);
    }

    function handleTogglePlay() {
      if (playing.value) {
        emit('pause');
      } else {
        emit('play');
      }
    }

    function handleForward10() {
      emit('seek', currentTrack.value.start + Math.floor(currentTime.value) + 10);
    }

    function handleSliderRelease(newPos) {
      emit('seek', currentTrack.value.start + newPos);
    }

    watch(ended, () => {
      if (ended.value) {
        emit('ended', currentTrack.value.start + currentTrack.value.length);
      }
    });

    watch(playing, () => {
      if (!playing.value) {
        // Simple fix for the fact that "playing" changes
        // before "ended". Ugly, but works.
        setTimeout(() => {
          if (!playing.value && !ended.value) {
            emit('paused', currentTrack.value.start + Math.floor(currentTime.value));
          }
        });
      }
    });

    watch(
      () => props.timestamp,
      () => {
        currentTime.value = props.timestamp - currentTrack.value.start;
      },
    );

    watch(currentTrack, () => {
      audioSource.value = currentTrack.value.url.href;
    });

    onMounted(() => {
      audioSource.value = currentTrack.value.url.href;
      currentTime.value = props.timestamp - currentTrack.value.start;
    });

    return {
      allButtonProps,

      busy,
      currentPlayIcon,
      currentTimeSeconds,
      currentTime, // Slider has to use currentTime as it also sets the value.
      durationSeconds,
      remainingSeconds,

      handleSliderRelease,
      handleSkipPrevious,
      handleSkipNext,
      handleReplay10,
      handleForward10,
      handleTogglePlay,
    };
  },
});
</script>
