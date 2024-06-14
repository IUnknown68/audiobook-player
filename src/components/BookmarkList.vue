<template>
  <q-btn>
    <q-menu
      anchor="bottom end"
      self="bottom end"
      auto-close
    >
      <BookmarkListItem
        v-for="(bookmark) of bookmarks"
        :key="bookmark.id"
        :bookmark="bookmark"
        :label="bookmark.title"
      />
      <BookmarkListItem
        :bookmark="bookmarkLast"
        icon="last_page"
        :label="$t(ID_LAST_READ)"
        readonly
      />
      <BookmarkListItem
        :bookmark="bookmarkFurthest"
        icon="schedule"
        :label="$t(ID_FURTHEST_READ)"
        readonly
      />
      <q-separator />
      <q-item
        clickable
        color="primary"
        @click="addBookmark"
      >
        <q-item-section avatar>
          <q-icon name="add" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{$t('addBookmark')}}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-menu>
  </q-btn>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';
import {
  useRoute,
} from 'vue-router';

import { useCurrentBook } from 'lib/useBooks';
import { useMediaControls } from 'lib/useAudio';
import {
  ID_LAST_READ,
  ID_FURTHEST_READ,
} from 'lib/useBookmarks';

import BookmarkListItem from 'components/BookmarkListItem.vue';

//------------------------------------------------------------------------------
function userEntriesFilter(entry) {
  return entry.id !== ID_LAST_READ && entry.id !== ID_FURTHEST_READ;
}

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'BookmarkList',

  components: {
    BookmarkListItem,
  },

  setup() {
    const route = useRoute();
    const { currentTime } = useMediaControls();
    const currentBook = useCurrentBook();

    const bookmarks = computed(
      () => currentBook.value.bookmarks.entries.filter(userEntriesFilter)
        .sort((a, b) => a.ts - b.ts),
    );

    const bookmarkLast = computed(() => currentBook.value.bookmarks.lastRead);
    const bookmarkFurthest = computed(() => currentBook.value.bookmarks.furthestRead);

    function addBookmark() {
      const currentTrack = currentBook.value?.findTrack(parseInt(route.params.timestamp, 10));
      if (currentTrack) {
        currentBook.value.bookmarks.add(
          currentTrack.start + currentTime.value,
          currentTrack.title,
        );
      }
    }

    return {
      ID_LAST_READ,
      ID_FURTHEST_READ,
      bookmarks,
      addBookmark,
      bookmarkLast,
      bookmarkFurthest,
    };
  },
});
</script>
