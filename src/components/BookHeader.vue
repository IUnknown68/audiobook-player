<template>
  <div class="column items-center">
    <div class="text-subtitle1 text-center">
      {{book.author}}
    </div>
    <div class="text-h5 text-center">
      {{book.title}}
    </div>
    <TrackSelect
      :book="book"
      :timestamp="timestamp"
      borderless
      dense
      hide-bottom-space
      color="teal"
      options-selected-class="text-primary"
    />
    <q-img
      v-if="book.cover"
      :src="book.cover.href"
      class="q-mt-sm q-mb-md"
      fit="contain"
      style="height: 220px;"
    >
      <template v-slot:error>
        <div class="absolute-full flex flex-center bg-transparent">
          <q-icon name="hide_image" size="4em" style="color: rgba(128,128,128,0.2)" />
        </div>
      </template>
    </q-img>
  </div>
</template>

<script>
import {
  defineComponent,
} from 'vue';

import TrackSelect from 'components/TrackSelect.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'BookHeader',

  components: {
    TrackSelect,
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
});
</script>
