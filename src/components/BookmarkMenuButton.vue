<template>
  <q-btn
    :icon="icon"
    @click="dialog = !dialog"
  >
    <q-dialog
      v-model="dialog"
    >
      <q-card class="container-340">
        <div
          class="text-subtitle1 text-weight-light q-py-sm q-px-md"
          style="background: rgba(0, 0, 0, 0.05);"
        >
          {{$t('bookmarks')}}
        </div>
        <q-list>
          <BookmarkListItem
            v-for="(bookmark) of bookmarks"
            :key="bookmark.id"
            :bookmark="bookmark"
            :label="bookmark.title"
            v-close-popup
          />
          <BookmarkListItem
            :bookmark="bookmarkLast"
            icon="last_page"
            :label="$t(ID_LAST_READ)"
            v-close-popup
            readonly
          />
          <BookmarkListItem
            :bookmark="bookmarkFurthest"
            icon="schedule"
            :label="$t(ID_FURTHEST_READ)"
            v-close-popup
            readonly
          />
          <q-separator />
          <q-item
            clickable
            color="primary"
            @click="addBookmark"
            v-close-popup
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
        </q-list>
      </q-card>
    </q-dialog>
  </q-btn>
</template>

<script>
import {
  defineComponent,
  computed,
  ref,
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
  name: 'BookmarkMenuButton',

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

    const dialog = ref(false);
    const bookmarkLast = computed(() => currentBook.value.bookmarks.lastRead);
    const bookmarkFurthest = computed(() => currentBook.value.bookmarks.furthestRead);
    const icon = computed(() => (bookmarks.value.length ? 'bookmarks' : 'sym_o_bookmarks'));

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
      dialog,
      icon,
      bookmarks,
      addBookmark,
      bookmarkLast,
      bookmarkFurthest,
    };
  },
});
</script>
