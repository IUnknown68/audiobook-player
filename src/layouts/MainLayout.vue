<template>
  <q-layout view="hHh lpR lFr">
    <q-header class="main-navbar">
      <MainNavbar />
    </q-header>
    <q-page-container>
      <router-view />

<!--
      <router-view v-slot="{ Component }">
        <transition name="fade"><keep-alive>
          <component :is="Component" />
        </keep-alive></transition>
      </router-view>
-->

    </q-page-container>
    <q-footer
      v-if="currentBook"
      class="row items-center justify-center"
      style="color:unset;background-color: unset"
    >
      <div class="container-340 q-py-md">
        <BookFooter
          :book="currentBook"
        />
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';

import { useCurrentBook } from 'lib/useBooks';

import BookFooter from 'components/BookFooter.vue';

import MainNavbar from './MainNavbar.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'MainLayout',

  components: {
    MainNavbar,
    BookFooter,
  },

  setup() {
    const currentBook = useCurrentBook();
    return {
      currentBook,
    };
  },
});
</script>
