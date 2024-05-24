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
    <q-toolbar-title>
      {{$t('appTitle')}}
    </q-toolbar-title>

    <q-btn
      dense
      flat
      round
      icon="pause"
      class="q-mx-md q-electron-drag--exception"
      @click="pause"
    />

    <SelectLocale />

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
import { useI18n } from 'vue-i18n';

import { useMediaControls } from 'lib/useAudio';
import { useCurrentBook } from 'lib/useBooks';
import SelectLocale from 'components/SelectLocale.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'MainNavbar',

  components: {
    SelectLocale,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const { t } = useI18n();
    const darkmode = useLocalStorage('darkmode', false);
    const title = useTitle();
    const q = useQuasar();
    const currentBook = useCurrentBook();

    // eslint-disable-next-line no-multi-assign
    const appTitle = title.value = t('appTitle');
    const notAtHome = computed(() => (route.name !== 'home'));
    const {
      playing,
      pause,
    } = useMediaControls();

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

    watch(darkmode, () => {
      q.dark.set(darkmode.value);
    });

    return {
      darkmode,
      appTitle,
      title,
      playing,
      notAtHome,

      pause,
      navBack,
    };
  },
});
</script>
