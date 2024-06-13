<template>
  <q-select
    ref="select"
    :options="book.tracks"
    :modelValue="currentTrack.id"
    option-value="id"
    emit-value
    map-options
    behavior="dialog"
    @click="handleClick"
    @popup-hide="handlePopupHide"
  >
    <template v-slot:option="scope">
      <TrackListItem
        v-bind="scope.itemProps"
        :track="scope.opt"
        :index="scope.index"
      />
    </template>
    <template v-slot:selected-item="scope">
      <div class="text-center text-subtitle1 text-weight-light">
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

import { useRouterSelect } from 'lib/useRouterPopup.js';
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

    const [
      select,
      handleClick,
      handlePopupHide,
    ] = useRouterSelect('tracksel');

    return {
      select,
      currentTrack,

      handleClick,
      handlePopupHide,
    };
  },
});
</script>
