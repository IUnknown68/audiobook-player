<template>
  <q-select
    :options="tracks"
    option-value="id"
    emit-value
    map-options
    :modelValue="trackId"
  >
    <template v-slot:option="scope">
      <TrackItem
        v-bind="scope.itemProps"
        :track="scope.opt"
      />
    </template>
    <template v-slot:selected-item="scope">
      <div>{{scope.opt.title}}</div>
    </template>
  </q-select>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';

import useBookAndTrackFromProps from 'lib/useBookAndTrackFromProps';

import TrackItem from 'components/TrackItem.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'TrackList',

  components: {
    TrackItem,
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
