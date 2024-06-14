import {
  computed,
  reactive,
  watch,
} from 'vue';

const bookmarksByBookId = new Map();

export const ID_LAST_READ = 'lastRead';
export const ID_FURTHEST_READ = 'furthestRead';

//------------------------------------------------------------------------------
function createBookmark(records, bookId, id, ts, title, date = new Date()) {
  const bookmark = reactive({
    id,
    bookId,
    ts,
    date,
    title,
  });
  let unwatch;
  bookmark.delete = () => {
    records.delete(id);
    localStorage.removeItem(`bookmarks:${bookId}:${id}`);
    unwatch();
  };
  unwatch = watch(bookmark, () => storeBookmark(bookmark));
  records.set(id, bookmark);
  return bookmark;
}

//------------------------------------------------------------------------------
function storeBookmark(bookmark) {
  const {
    id,
    bookId,
    ts,
    date,
    title,
  } = bookmark;
  localStorage.setItem(`bookmarks:${bookId}:${id}`, JSON.stringify({
    ts, title, date,
  }));
}

//------------------------------------------------------------------------------
function loadBookmark(records, bookId, id) {
  const s = localStorage.getItem(`bookmarks:${bookId}:${id}`);
  if (!s) {
    return null;
  }
  const {
    ts,
    date,
    title,
  } = JSON.parse(s);
  return createBookmark(records, bookId, id, ts, title, new Date(date));
}

//------------------------------------------------------------------------------
function listLocalStorageItems(matcher) {
  const matchFn = (typeof matcher === 'function')
    ? matcher
    : (key) => (matcher === key);

  const ret = [];
  for (let n = 0; n < localStorage.length; ++n) {
    const key = localStorage.key(n);
    if (matchFn(key)) {
      ret.push(key);
    }
  }
  return ret;
}

//------------------------------------------------------------------------------
function createBookmarks(bookId) {
  const baseId = `bookmarks:${bookId}:`;
  const records = reactive(new Map());

  listLocalStorageItems((key) => {
    if (key.startsWith(baseId)) {
      const id = key.split(':').pop();
      loadBookmark(records, bookId, id);
    }
  });

  if (!records.has(ID_LAST_READ)) {
    createBookmark(records, bookId, ID_LAST_READ, 0, ID_LAST_READ);
  }

  if (!records.has(ID_FURTHEST_READ)) {
    createBookmark(records, bookId, ID_FURTHEST_READ, 0, ID_FURTHEST_READ);
  }

  const bookmarks = {};

  bookmarks.get = (id) => records.get(id);

  bookmarks.lastRead = computed({
    get() {
      return records.get(ID_LAST_READ);
    },

    set(newValue) {
      const ts = parseInt(newValue, 10);
      const lastRead = records.get(ID_LAST_READ);
      const furthestRead = records.get(ID_FURTHEST_READ);
      lastRead.ts = ts;
      lastRead.date.setTime(Date.now());
      if (lastRead.ts > furthestRead.ts) {
        furthestRead.ts = ts;
        furthestRead.date.setTime(lastRead.date.getTime());
      }
    },
  });

  bookmarks.furthestRead = computed(() => records.get(ID_FURTHEST_READ));

  bookmarks.entries = computed(() => [
    ...records.values(),
  ]);

  bookmarks.add = (ts, title) => {
    const id = crypto.randomUUID();
    storeBookmark(createBookmark(records, bookId, id, ts, title));
  };

  bookmarksByBookId.set(bookId, bookmarks);

  return bookmarks;
}

//------------------------------------------------------------------------------
function useBookmarks(bookId) {
  return bookmarksByBookId.get(bookId) ?? createBookmarks(bookId);
}

//------------------------------------------------------------------------------
export default useBookmarks;
