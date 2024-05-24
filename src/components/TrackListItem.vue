<template>
  <q-item
    :to="itemRoute"
    replace
  >
    <q-item-section>
      <q-item-label>
        {{index + 1}}. {{track.title}}
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
  name: 'TrackListItem',

  components: {
    AudioDuration,
  },

  props: {
    track: {
      type: Object,
      required: true,
    },

    index: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const route = useRoute();
    const itemRoute = computed(() => ({
      ...route.value,
      params: {
        ...route.params,
        timestamp: props.track.start,
      },
    }));

    return {
      itemRoute,
    };
  },
});
</script>
