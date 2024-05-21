<template>
  <q-page class="flex justify-center">
    <div>
      <div class="text-h5 text-center q-my-md">My Books</div>
      <q-list separator>
        <BookItem
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

import BookItem from 'components/BookItem.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'IndexPage',

  components: {
    BookItem,
  },

  setup() {
    const { books } = useBooks();
    return {
      books,
    };
  },
});
</script>
