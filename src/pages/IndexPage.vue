<template>
  <q-page class="flex justify-center">
    <div class="container-340">
      <div class="text-h5 text-center q-my-md">
        {{$t('myBooks')}}
      </div>
      <q-list separator>
        <BookListItem
          v-for="book of books"
          :key="book.id"
          :book="book"
        />
      </q-list>
    </div>
  </q-page>
</template>

<script>
import {
  defineComponent,
} from 'vue';

import useBooks from 'lib/useBooks';

import BookListItem from 'components/BookListItem.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'IndexPage',

  components: {
    BookListItem,
  },

  setup() {
    const { books } = useBooks();
    return {
      books,
    };
  },
});
</script>
