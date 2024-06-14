<template>
  <q-item>
    <q-item-section avatar>
      <q-icon :name="language.icon" color="primary" />
    </q-item-section>
    <q-item-section>
      {{language.label}}
    </q-item-section>
    <q-item-section side>
      <q-icon name="keyboard_arrow_right" />
    </q-item-section>
    <q-menu anchor="bottom right" self="top right">
      <q-list style="min-width: 100px">
        <q-item
          v-for="lang of LANG_OPTIONS"
          :key="lang.value"
          clickable
          v-close-popup
          @click="() => selectLocale(lang.value)"
        >
          <q-item-section>
            <q-item-label>{{ lang.label }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon :name="lang.icon" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-item>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useLocalStorage } from '@vueuse/core';

const LANG_OPTIONS = [
  {
    label: 'English',
    value: 'en',
    icon: 'img:/icons/us.svg',
  },
  {
    label: 'Deutsch',
    value: 'de',
    icon: 'img:/icons/de.svg',
  },
];

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'SelectLocale',

  setup() {
    const { locale } = useI18n();
    const localeStored = useLocalStorage('locale');

    function selectLocale(newLocale) {
      // eslint-disable-next-line no-multi-assign
      localeStored.value = locale.value = newLocale;
    }

    const language = computed(
      () => LANG_OPTIONS.find((lang) => lang.value === locale.value),
    );

    return {
      LANG_OPTIONS,
      language,
      selectLocale,
    };
  },
});
</script>
