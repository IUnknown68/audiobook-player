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
        <TrackLength :length="track.length" />
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

import TrackLength from 'components/TrackLength.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'TrackItem',

  components: {
    TrackLength,
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
