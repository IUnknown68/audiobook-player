<template>
  <q-page class="q-pa-md row items-start justify-center">
    <AudioPlayer />
  </q-page>
</template>

<script>
import {
  defineComponent,
} from 'vue';

import AudioPlayer from 'components/AudioPlayer.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'PlayerPage',

  components: {
    AudioPlayer,
  },
});
</script>
