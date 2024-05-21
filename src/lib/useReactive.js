import { reactive } from 'vue';

const reactives = new Map();

//------------------------------------------------------------------------------
function useReactive(name, defaultValue) {
  let r = reactives.get(name);
  if (!r) {
    r = reactive(defaultValue);
    reactives.set(name, r);
  }
  return r;
}

export default useReactive;
