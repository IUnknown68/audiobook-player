<template>
  <router-view v-if="app.loaded" />
  <BootLayout v-else />
  <audio ref="audio" :src="trackPlaying" />
</template>

<script>
import {
  defineComponent,
  ref,
  watch,
} from 'vue';
import { useQuasar } from 'quasar';
import { useLocalStorage } from '@vueuse/core';

import useReactive from 'lib/useReactive';
import BootLayout from 'layouts/BootLayout.vue';
import useBooks from 'lib/useBooks';
import useAudio from 'lib/useAudio';
import useCurrentBookAndTrack from 'lib/useCurrentBookAndTrack';

const APP_DEFAULTS = {
  loaded: false,
  error: null,
  load: async () => {
    const { loadBook } = useBooks();
    // eslint-disable-next-line no-console
    console.log('Loading app...');

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

    const {
      currentTrack,
    } = useCurrentBookAndTrack();

    // Cache currently playing track from selected track.
    // Continues playing when navigating away from player,
    // and prevent reloading the track if not changed.
    const trackPlaying = ref('');
    watch(currentTrack, (newValue) => {
      const url = newValue?.url?.href;
      if (url && (url !== trackPlaying.value)) {
        trackPlaying.value = url;
      }
    });

    return {
      app,
      audio,
      trackPlaying,
    };
  },
});
</script>
