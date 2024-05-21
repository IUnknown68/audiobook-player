<template>
  <q-toolbar class="q-electron-drag">
    <q-btn
      v-if="notAtHome"
      dense
      flat
      round
      icon="arrow_back"
      class="q-electron-drag--exception"
      @click="navBack"
    />
    <q-toolbar-title
      class="title flex-auto"
      style="position: relative;"
    >
      {{title}}
    </q-toolbar-title>

    <q-space />

    <div class="q-electron-drag--exception" style="display: contents;">
      <q-btn
        v-if="playing"
        dense
        flat
        icon="stop"
        label="Stop"
        class="q-ml-md q-electron-drag--exception"
        @click="stop"
      />

      <q-toggle
        v-model="darkmode"
        color="secondary"
      >
        <q-tooltip>{{$t('darkMode')}}</q-tooltip>
      </q-toggle>

      <q-btn
        v-if="isElectron"
        dense
        flat
        icon="minimize"
        class="q-ml-md q-electron-drag--exception"
        @click="minimize"
      />
      <q-btn
        v-if="isElectron"
        dense
        flat
        icon="crop_square"
        @click="toggleMaximize"
      />
      <q-btn
        v-if="isElectron"
        dense
        flat
        icon="close"
        @click="closeApp"
      />
    </div>
  </q-toolbar>
</template>

<script>
import {
  defineComponent,
  ref,
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

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'MainNavbar',

  setup(props, { emit }) {
    const route = useRoute();
    const router = useRouter();
    const darkmode = useLocalStorage('darkmode', false);
    const title = useTitle();
    const q = useQuasar();
    const menu = ref();
    const notAtHome = computed(() => (route.name !== 'home'));

    const {
      playing,
    } = useMediaControls();

    watch(darkmode, () => {
      q.dark.set(darkmode.value);
    });

    function minimize() {
      if (process.env.MODE === 'electron') {
        window.WAPI.minimize();
      }
    }

    function toggleMaximize() {
      if (process.env.MODE === 'electron') {
        window.WAPI.toggleMaximize();
      }
    }

    function closeApp() {
      if (process.env.MODE === 'electron') {
        window.WAPI.close();
      }
    }

    function toggleSide() {
      emit('toggleside');
    }

    function stop() {
      playing.value = false;
    }

    function navBack() {
      router.back();
    }

    return {
      isElectron: !!window.WAPI,
      darkmode,
      title,
      playing,
      notAtHome,

      menu,

      minimize,
      toggleMaximize,
      closeApp,
      toggleSide,
      stop,
      navBack,
    };
  },
});
</script>
