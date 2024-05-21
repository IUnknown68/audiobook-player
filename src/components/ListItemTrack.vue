<template>
  <q-item
    :to="itemRoute"
    replace
  >
    <q-item-section>
      <q-item-label>
        {{track.title}}
      </q-item-label>
      <q-item-label caption>
        <AudioDuration :length="track.length" />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';
import {
  useRoute,
} from 'vue-router';

import AudioDuration from 'components/AudioDuration.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'ListItemTrack',

  components: {
    AudioDuration,
  },

  props: {
    track: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const route = useRoute();
    const itemRoute = computed(() => ({
      ...route.value,
      params: {
        ...route.params,
        trackId: props.track.id,
      },
    }));

    return {
      itemRoute,
    };
  },
});
</script>
