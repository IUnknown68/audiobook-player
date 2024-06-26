import {
  reactive,
  computed,
} from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

import {
  getSeries,
} from './useSeries';

import {
  getTrack,
} from './useTracks';

import useBookmarks from './useBookmarks';

const BASE_URL = new URL('/audiobooks/', window.location.href);

const booksMap = reactive(new Map());
const booksList = computed(() => [...booksMap.values()]);

const seriesMap = reactive(new Map());
const seriesList = computed(() => [...seriesMap.values()]);

//------------------------------------------------------------------------------
function useBooks() {
  return {
    books: booksList,
    seriesList,

    getBook,
    getTrack: getBookTrack,
    loadBook,
  };
}

//------------------------------------------------------------------------------
export function useCurrentBook() {
  const route = useRoute();
  return computed(() => getBook(route.params.bookId));
}

//------------------------------------------------------------------------------
async function loadBook(relUrl, force = false) {
  relUrl = (relUrl.endsWith('/')) ? relUrl : `${relUrl}/`;
  const url = new URL(relUrl, BASE_URL);
  const { data } = await axios.get(`${url}/manifest.json`);
  if (!data.id) {
    throw new Error('Invalid Manifest');
  }

  let book = booksMap.get(data.id);
  if (force || !book) {
    book = bookFromJson(data, url);
    booksMap.set(book.id, book);
  }
  return book;
}

//------------------------------------------------------------------------------
function findTrack(book, timestamp) {
  return book.tracks.find((track) => {
    if ((track.start <= timestamp) && (track.start + track.length > timestamp)) {
      return true;
    }
    return false;
  });
}

//------------------------------------------------------------------------------
function getBook(id) {
  return booksMap.get(id);
}

//------------------------------------------------------------------------------
function getBookTrack(book, idOrIndex) {
  if (!idOrIndex) {
    return book.tracks[0];
  }
  if (typeof idOrIndex === 'number') {
    return book.tracks[idOrIndex];
  }
  return getTrack(idOrIndex);
}

//------------------------------------------------------------------------------
function parseLength(length) {
  if (typeof length === 'number') {
    return length;
  }
  const ar = length.split(':').slice(0, 3).map((v) => parseInt(v, 10));
  if (ar.length < 3) {
    ar.unshift(0);
  }
  if (ar.length < 3) {
    ar.unshift(0);
  }
  return ar[2] + (ar[1] * 60) + (ar[0] * 3600);
}

//------------------------------------------------------------------------------
function bookFromJson(data, bookUrl) {
  const book = reactive(data);

  book.created = new Date(book.created);
  book.url = bookUrl;
  book.cover = new URL(book.cover, book.url);

  book.bookmarks = useBookmarks(book.id);

  if (book.series) {
    getSeries(book.series, true).books.push(book.id);
  }

  book.length = 0;
  // Side effect: Calculate book.length.
  book.tracks = book.tracks.map((trackData, index) => {
    const {
      id,
      url,
      length,
      ...trackDataRest
    } = trackData;

    const track = getTrack(id, true);

    trackDataRest.url = new URL(url, book.url);
    trackDataRest.start = book.length;
    trackDataRest.length = parseLength(length);
    trackDataRest.index = index;
    Object.assign(track, trackDataRest);

    book.length += track.length;
    return track;
  });

  book.getTrack = getBookTrack.bind(null, book);
  book.findTrack = findTrack.bind(null, book);

  return book;
}

//------------------------------------------------------------------------------
export default useBooks;
