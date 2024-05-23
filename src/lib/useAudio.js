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
  playing,
} = mediaControls;

// Captures the requested play state as opposed to the
// actual. Used to continue playing once a track ended.
let shouldBePlaying = false;

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
  if (playing.value) {
    shouldBePlaying = false;
    audioRef.value.pause();
  } else {
    shouldBePlaying = true;
    audioRef.value.play();
  }
}

//------------------------------------------------------------------------------
function play() {
  if (!audioRef.value) {
    return;
  }
  shouldBePlaying = true;
  audioRef.value.play();
}

//------------------------------------------------------------------------------
function pause() {
  if (!audioRef.value) {
    return;
  }
  shouldBePlaying = false;
  audioRef.value.pause();
}

watch(waiting, (isWaiting) => {
  if (!isWaiting && shouldBePlaying && audioRef.value) {
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
