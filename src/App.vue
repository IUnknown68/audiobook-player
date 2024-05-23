<template>
  <router-view v-if="app.loaded" />
  <BootLayout v-else />
  <audio ref="audio" />
</template>

<script>
import {
  defineComponent,
} from 'vue';
import { useQuasar } from 'quasar';
import { useLocalStorage } from '@vueuse/core';

import useReactive from 'lib/useReactive';
import BootLayout from 'layouts/BootLayout.vue';
import useBooks from 'lib/useBooks';
import useAudio from 'lib/useAudio';

const APP_DEFAULTS = {
  loaded: false,
  error: null,
  load: async () => {
    const { loadBook } = useBooks();
    // eslint-disable-next-line no-console
    console.log('Loading books...');

    await loadBook('trisolaris/1');
    await loadBook('trisolaris/2');
    await loadBook('trisolaris/3');

    // eslint-disable-next-line no-console
    console.log('OK.');
  },
};

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'App',

  components: {
    BootLayout,
  },

  setup() {
    const audio = useAudio();
    const app = useReactive('app', APP_DEFAULTS);
    const darkmode = useLocalStorage('darkmode', false);
    useQuasar().dark.set(darkmode.value);

    return {
      app,
      audio,
    };
  },
});
</script>
