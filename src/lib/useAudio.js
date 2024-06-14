import {
  ref,
  watch,
} from 'vue';
import { useMediaControls as umc } from '@vueuse/core';

const audioRef = ref();
const mediaControls = umc(audioRef);

const audioSource = ref('');

const {
  waiting,
} = mediaControls;

// Captures the requested play state as opposed to the
// actual. Used to continue playing once a track ended.
const shouldBePlaying = ref(false);

watch(shouldBePlaying, () => {
  if (shouldBePlaying.value) {
    audioRef.value.play();
  } else {
    audioRef.value.pause();
  }
});

//------------------------------------------------------------------------------
function useAudio() {
  return audioRef;
}

//------------------------------------------------------------------------------
export function useMediaControls() {
  return {
    ...mediaControls,
    audioRef,
    audioSource,
    shouldBePlaying,

    play,
    pause,
    togglePlay,
  };
}

//------------------------------------------------------------------------------
function togglePlay() {
  if (!audioRef.value) {
    return;
  }
  shouldBePlaying.value = !shouldBePlaying.value;
}

//------------------------------------------------------------------------------
function play() {
  if (!audioRef.value) {
    return;
  }
  shouldBePlaying.value = true;
}

//------------------------------------------------------------------------------
function pause() {
  if (!audioRef.value) {
    return;
  }
  shouldBePlaying.value = false;
}

watch(waiting, (isWaiting) => {
  if (!isWaiting && shouldBePlaying.value && audioRef.value) {
    audioRef.value.play();
  }
});

watch(audioSource, (newSource) => {
  if (!audioRef.value) {
    return;
  }
  const href = (typeof newSource === 'object')
    ? newSource.href
    : newSource;
  //console.log('SET AUDIO', href);
  audioRef.value.src = href;
});

//------------------------------------------------------------------------------
export default useAudio;
