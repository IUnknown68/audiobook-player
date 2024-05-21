import {
  computed,
} from 'vue';

import useBooks from 'lib/useBooks';
import useTracks from 'lib/useTracks';

//------------------------------------------------------------------------------
function useBookAndTrackFromProps(props) {
  const { getBook } = useBooks();
  const { getTrack } = useTracks();

  const bookId = computed(() => props.bookId);
  const trackId = computed(() => props.trackId);

  const currentBook = computed(() => getBook(bookId.value));
  const currentTrack = computed(() => getTrack(trackId.value));

  const trackIndex = computed(() => {
    if (currentBook.value) {
      return currentBook.value.tracks.findIndex((t) => (t.id === trackId.value));
    }
    return -1;
  });

  return {
    bookId,
    trackId,
    currentBook,
    currentTrack,
    trackIndex,
  };
}

export default useBookAndTrackFromProps;
