import {
  reactive,
  computed,
} from 'vue';

const trackMap = reactive(new Map());
const trackList = computed(() => [...trackMap.values()]);

//------------------------------------------------------------------------------
function useTracks() {
  return {
    tracks: trackList,
    getTrack,
    setTrack,
  };
}

//------------------------------------------------------------------------------
export function getTrack(id, createIfNotFond = false) {
  return trackMap.get(id)
    || (createIfNotFond && setTrack(id));
}

//------------------------------------------------------------------------------
export function setTrack(id, data = { id }) {
  trackMap.set(id, data);
  return trackMap.get(id);
}

//------------------------------------------------------------------------------
export default useTracks;
