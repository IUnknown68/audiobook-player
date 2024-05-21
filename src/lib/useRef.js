import { ref } from 'vue';

const refs = new Map();

//------------------------------------------------------------------------------
function useRef(name, defaultValue) {
  let r = refs.get(name);
  if (!r) {
    r = ref(defaultValue);
    refs.set(name, r);
  }
  return r;
}

export default useRef;
