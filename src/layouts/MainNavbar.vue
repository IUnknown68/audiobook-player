<template>
  <q-toolbar>
    <q-btn
      v-if="notAtHome"
      dense
      flat
      round
      icon="arrow_back"
      @click="navBack"
    />
    <q-toolbar-title
      class="title flex-auto position-relative"
    >
      {{appTitle}}
    </q-toolbar-title>

    <q-space />

    <q-btn
      dense
      flat
      round
      icon="stop"
      class="q-ml-md q-electron-drag--exception"
      @click="stop"
    />

    <q-toggle
      v-model="darkmode"
      color="yellow"
    >
      <q-tooltip>{{$t('darkMode')}}</q-tooltip>
    </q-toggle>
  </q-toolbar>
</template>

<script>
import {
  defineComponent,
  watch,
  computed,
} from 'vue';
import {
  useRoute,
  useRouter,
} from 'vue-router';
import { useQuasar } from 'quasar';
import {
  useTitle,
  useLocalStorage,
} from '@vueuse/core';

import { useMediaControls } from 'lib/useAudio';
import useBooks from 'lib/useBooks';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'MainNavbar',

  setup() {
    const route = useRoute();
    const router = useRouter();
    const darkmode = useLocalStorage('darkmode', false);
    const title = useTitle();
    const q = useQuasar();
    const { getBook } = useBooks();

    const appTitle = title.value;
    const currentBook = computed(() => getBook(route.params.bookId));
    const notAtHome = computed(() => (route.name !== 'home'));
    const {
      playing,
    } = useMediaControls();

    watch(darkmode, () => {
      q.dark.set(darkmode.value);
    });

    function stop() {
      playing.value = false;
    }

    function navBack() {
      if (router.options.history.state.position > 1) {
        router.back();
      } else {
        router.replace({ name: 'home' });
      }
    }

    watch(currentBook, (newBook) => {
      if (newBook) {
        title.value = `${newBook.title} - ${appTitle}`;
      } else {
        title.value = appTitle;
      }
    });

    return {
      darkmode,
      appTitle,
      title,
      playing,
      notAtHome,

      stop,
      navBack,
    };
  },
});
</script>
