import {
  computed,
} from 'vue';

import {
  useRoute,
} from 'vue-router';

import useBooks from 'lib/useBooks';
import useTracks from 'lib/useTracks';

//------------------------------------------------------------------------------
function useCurrentBookAndTrack() {
  const { getBook } = useBooks();
  const { getTrack } = useTracks();
  const route = useRoute();

  const bookId = computed(() => route.params.bookId);

  const currentBook = computed(() => getBook(bookId.value));

  const trackId = computed(() => {
    if (route.params.trackId) {
      return route.params.trackId;
    }
    if (currentBook.value) {
      return currentBook.value.tracks[0].id;
    }
    return '';
  });

  const currentTrack = computed(() => getTrack(trackId.value));

  const trackIndex = computed(() => {
    if (currentBook.value) {
      return currentBook.value.tracks.find((t) => (t.id === trackId.value));
    }
    return -1;
  });

  return {
    bookId,
    currentBook,
    trackId,
    currentTrack,
    trackIndex,
  };
}

export default useCurrentBookAndTrack;
