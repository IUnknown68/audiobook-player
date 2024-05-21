<template>
  <q-layout view="hHh lpR lFr">
    <q-header>
      <MainNavbar />
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';

import MainNavbar from './MainNavbar.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'MainLayout',

  components: {
    MainNavbar,
  },
});
</script>
