<template>
  <div class="row">
    <div>
      {{book.copyright}}
    </div>
    <q-space />
    <div class="">
      <a :href="book.source.url" target="blank">{{book.source.text}}</a>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
} from 'vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'BookFooter',

  props: {
    book: {
      type: Object,
      required: true,
    },
  },
});
</script>
