<template>
  <div class="row">
    <div class="">
      {{currentBook.copyright}}
    </div>
    <q-space />
    <div class="">
      <a :href="currentBook.source.url" target="blank">{{currentBook.source.text}}</a>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';

import useBooks from 'lib/useBooks';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'BookFooter',

  props: {
    bookId: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const { getBook } = useBooks();
    const currentBook = computed(() => getBook(props.bookId));

    return {
      currentBook,
    };
  },
});
</script>
