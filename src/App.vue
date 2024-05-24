<template>
  <router-view v-if="app.loaded" />
  <BootLayout v-else />
  <audio ref="audio" />
</template>

<script>
import {
  defineComponent,
  watch,
  onMounted,
} from 'vue';
import {
  useQuasar,
  setCssVar,
} from 'quasar';
import { useLocalStorage } from '@vueuse/core';

import useReactive from 'lib/useReactive';
import BootLayout from 'layouts/BootLayout.vue';
import useBooks, {
  useCurrentBook,
} from 'lib/useBooks';
import useAudio from 'lib/useAudio';

const PRIMARY_DEFAULT = '#54830f';

const BOOKS_TO_LOAD = [
  'trisolaris/1',
  'trisolaris/2',
  'trisolaris/3',
  'das_schloss',
  'frankenstein',
];

const APP_DEFAULTS = {
  loaded: false,
  error: null,
  load: async () => {
    const { loadBook } = useBooks();
    // eslint-disable-next-line no-console
    console.log('Loading books...');

    //await Promise.all(BOOKS_TO_LOAD.map((book) => loadBook(book)));
    // Want to keep the sort order:
    for (const book of BOOKS_TO_LOAD) {
      // eslint-disable-next-line no-await-in-loop
      await loadBook(book);
    }

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

    const currentBook = useCurrentBook();

    function setBookColor() {
      setCssVar('primary', currentBook.value?.color || PRIMARY_DEFAULT);
    }

    watch(currentBook, setBookColor);
    onMounted(setBookColor);

    useQuasar().dark.set(darkmode.value);

    return {
      app,
      audio,
    };
  },
});
</script>
