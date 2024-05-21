<template>
  <q-select
    :options="tracks"
    option-value="id"
    option-label="title"
    emit-value
    map-options
    :modelValue="trackId"
    behavior="dialog"
  >
    <template v-slot:option="scope">
      <ListItemTrack
        v-bind="scope.itemProps"
        :track="scope.opt"
      />
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
    } = useBookAndTrackFromProps(props);

    const tracks = computed(() => (currentBook.value ? currentBook.value.tracks : []));

    return {
      tracks,
    };
  },
});
</script>
