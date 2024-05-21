import {
  ref,
} from 'vue';
import { useMediaControls as umc } from '@vueuse/core';

const audioRef = ref();
const mediaControls = umc(audioRef);

//------------------------------------------------------------------------------
function useAudio() {
  return audioRef;
}

//------------------------------------------------------------------------------
export function useMediaControls() {
  return {
    ...mediaControls,
    audioRef,
  };
}

//------------------------------------------------------------------------------
export default useAudio;
