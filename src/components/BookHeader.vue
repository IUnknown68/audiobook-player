<template>
  <div>
    <div class="text-subtitle1 text-center">
      {{currentBook?.author}}
    </div>
    <div class="text-h6 text-center">
      {{currentBook?.title}}
    </div>
    <div class="text-caption text-center">
      {{currentTrack.title}} ({{trackIndex + 1}}/{{trackCount}})
    </div>

    <q-img
      v-if="currentBook.cover"
      :src="currentBook.cover.href"
      class="q-my-md"
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

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'BookHeader',

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
