<template>
  <q-select
    :options="book.tracks"
    option-value="id"
    emit-value
    map-options
    :modelValue="currentTrack.id"
    behavior="dialog"
  >
    <template v-slot:option="scope">
      <TrackListItem
        v-bind="scope.itemProps"
        :track="scope.opt"
        :index="scope.index"
      />
    </template>
    <template v-slot:selected-item="scope">
      <div class="text-center text-caption">
        {{scope.opt.title}} ({{currentTrack.index + 1}}/{{book.tracks.length}})
      </div>
    </template>
  </q-select>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';

import TrackListItem from 'components/TrackListItem.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'TrackSelect',

  components: {
    TrackListItem,
  },

  props: {
    book: {
      type: Object,
      required: true,
    },

    timestamp: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    const currentTrack = computed(
      () => props.book.findTrack(props.timestamp),
    );

    return {
      currentTrack,
    };
  },
});
</script>
