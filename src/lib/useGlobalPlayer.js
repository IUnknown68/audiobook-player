import {
  computed,
  ref,
  watch,
  onMounted,
} from 'vue';

import {
  useRoute,
  useRouter,
} from 'vue-router';

import useBooks from 'lib/useBooks';

//------------------------------------------------------------------------------
function useGlobalPlayer() {
  const { getBook } = useBooks();
  const route = useRoute();
  const router = useRouter();

  const currentBook = computed(() => getBook(route.params.bookId));
  const currentTimestamp = ref(parseInt(route.params.timestamp, 10) || 0);
  const currentTrack = computed(() => currentBook.value?.findTrack(currentTimestamp.value));

  const found = computed(() => currentBook.value && currentTrack.value);

  function handleSeek(newPosition) {
    if (!currentBook.value) {
      return;
    }
    const timestamp = Math.floor(newPosition);
    router.replace({
      name: 'player',
      params: {
        bookId: currentBook.value.id,
        timestamp,
      },
    });
  }

  function handlePaused(newPosition) {
    const timestamp = Math.floor(newPosition);
    currentBook.value.lastRead = timestamp;
    router.replace({
      name: 'player',
      params: {
        bookId: currentBook.value.id,
        timestamp,
      },
    });
  }

  function handleEnded() {
    const nextTrack = currentBook.value?.tracks[currentTrack.value.index + 1];
    if (nextTrack) {
      handleSeek(nextTrack.start);
    } else {
      handleSeek(0);
    }
  }
  watch(
    () => route.params.timestamp,
    () => {
      if (!currentBook.value) {
        return;
      }
      currentTimestamp.value = parseInt(route.params.timestamp, 10) || 0;
      if (currentTimestamp.value >= currentBook.value.length) {
        currentTimestamp.value = 0;
      }
      currentBook.value.lastRead = currentTimestamp.value;
    },
  );

  onMounted(() => {
    currentTimestamp.value = parseInt(route.params.timestamp, 10) || 0;
  });

  return {
    found,
    currentBook,
    currentTimestamp,
    handleSeek,
    handleEnded,
    handlePaused,
  };
}

//------------------------------------------------------------------------------
export default useGlobalPlayer;
