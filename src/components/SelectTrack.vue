<template>
  <q-select
    :options="tracks"
    option-value="id"
    emit-value
    map-options
    :modelValue="trackId"
    behavior="dialog"
  >
    <template v-slot:option="scope">
      <ListItemTrack
        v-bind="scope.itemProps"
        :track="scope.opt"
        :index="scope.index"
      />
    </template>
    <template v-slot:selected-item="scope">
      <div class="text-center text-caption">
        {{scope.opt.title}} ({{trackIndex + 1}}/{{trackCount}})
      </div>
    </template>
  </q-select>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';

import useBookAndTrackFromProps from 'lib/useBookAndTrackFromProps';

import ListItemTrack from 'components/ListItemTrack.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'SelectTrack',

  components: {
    ListItemTrack,
  },

  props: {
    bookId: {
      type: String,
      default: '',
    },

    trackId: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const {
      currentBook,
      trackIndex,
    } = useBookAndTrackFromProps(props);

    const tracks = computed(() => (currentBook.value ? currentBook.value.tracks : []));
    const trackCount = computed(() => currentBook.value.tracks.length);

    return {
      tracks,
      trackIndex,
      trackCount,
    };
  },
});
</script>
