import {
  ref,
  watch,
} from 'vue';
import { useMediaControls as umc } from '@vueuse/core';

const audioRef = ref();
const mediaControls = umc(audioRef);

const {
  currentTime,
  duration,
  waiting,
  // seeking,
  // ended,
  // stalled,
  // buffered,
  playing,
  // rate,
} = mediaControls;

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

    replay10,
    forward10,
    play,
    togglePlay,
    setAudioSrc,
  };
}

//------------------------------------------------------------------------------
function replay10() {
  currentTime.value = Math.max(0, currentTime.value - 10);
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
  audioRef.value.play();
}

//------------------------------------------------------------------------------
function forward10() {
  currentTime.value = Math.min(duration.value, currentTime.value + 10);
}

//------------------------------------------------------------------------------
function setAudioSrc(url) {
  if (!audioRef.value) {
    return;
  }
  audioRef.value.src = url;
}

watch(waiting, (isWaiting) => {
  if (!isWaiting && shouldBePlaying && audioRef.value) {
    audioRef.value.play();
  }
});

//------------------------------------------------------------------------------
export default useAudio;
