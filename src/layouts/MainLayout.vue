<template>
  <q-layout view="hHh lpR lFr">
    <q-header>
      <MainNavbar @toggleside="toggleLeftDrawer"/>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      :width="250"
      bordered
      content-class="bg-grey-2"
    >
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';
import { useLocalStorage } from '@vueuse/core';

import MainNavbar from './MainNavbar.vue';

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'MainLayout',

  components: {
    MainNavbar,
  },

  setup() {
    const leftDrawerOpen = useLocalStorage('leftDrawerOpen', false);

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    return {
      leftDrawerOpen,

      toggleLeftDrawer,
    };
  },
});
</script>
