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
      {{title}}
    </q-toolbar-title>

    <q-space />

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

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'MainNavbar',

  setup() {
    const route = useRoute();
    const router = useRouter();
    const darkmode = useLocalStorage('darkmode', false);
    const title = useTitle();
    const q = useQuasar();
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
      router.back();
    }

    return {
      darkmode,
      title,
      playing,
      notAtHome,

      stop,
      navBack,
    };
  },
});
</script>
