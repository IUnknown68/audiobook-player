<template>
  <span>{{prefix}}{{formatted}}</span>
</template>

<script>
import {
  defineComponent,
  computed,
} from 'vue';

//------------------------------------------------------------------------------
function fm2(val) {
  return (`00${val}`).slice(-2);
}

//------------------------------------------------------------------------------
function formatTrackLength(time) {
  const hours = Math.floor(time / 3600);
  time %= 3600;
  const minutes = Math.floor(time / 60);
  time %= 60;
  return (hours > 0)
    ? `${hours}:${fm2(minutes)}:${fm2(time)}`
    : `${fm2(minutes)}:${fm2(time)}`;
}

//------------------------------------------------------------------------------
export default defineComponent({
  name: 'TrackLength',

  props: {
    length: {
      type: [Number, String],
      default: 0,
    },

    prefix: {
      type: String,
      default: '',
    },
  },

  setup(props) {
    const formatted = computed(() => formatTrackLength(parseInt(props.length, 10)));
    return {
      formatted,
    };
  },
});
</script>
