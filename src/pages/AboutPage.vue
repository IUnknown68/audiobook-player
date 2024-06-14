<template>
  <q-page class="flex justify-center q-pt-md">
    <div class="container-340">
      <div class="text-h5 q-py-md">
        {{PRODUCTNAME}}
      </div>
      <p>{{DESCRIPTION}}</p>
      <q-card flat bordered>
        <q-card-section class="flex">
          {{$t('version')}}:
          <q-space />
          {{VERSION}}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import {
  defineComponent,
} from 'vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'AboutPage',

  components: {
  },

  setup() {
    return {
      VERSION: process.env.VERSION,
      PRODUCTNAME: process.env.PRODUCTNAME,
      DESCRIPTION: process.env.DESCRIPTION,
      AUTHOR: process.env.AUTHOR,
    };
  },
});
</script>
