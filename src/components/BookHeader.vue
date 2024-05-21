<template>
  <div class="column items-center">
    <div class="text-subtitle1 text-center">
      {{currentBook.author}}
    </div>
    <div class="text-h6 text-center">
      {{currentBook.title}}
    </div>
    <SelectTrack
      :bookId="bookId"
      :trackId="trackId"
      borderless
      dense
      hide-bottom-space
      color="teal"
      options-selected-class="text-primary"
    />
    <q-img
      v-if="currentBook.cover"
      :src="currentBook.cover.href"
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
  computed,
} from 'vue';

import useBookAndTrackFromProps from 'lib/useBookAndTrackFromProps';
import SelectTrack from 'components/SelectTrack.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'BookHeader',

  components: {
    SelectTrack,
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
      currentTrack,
      trackIndex,
    } = useBookAndTrackFromProps(props);

    const trackCount = computed(() => currentBook.value.tracks.length);

    return {
      currentBook,
      currentTrack,
      trackIndex,
      trackCount,
    };
  },
});
</script>
