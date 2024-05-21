import {
  reactive,
  computed,
} from 'vue';

const seriesMap = reactive(new Map());
const seriesList = computed(() => [...seriesMap.values()]);

//------------------------------------------------------------------------------
function useSeries() {
  return {
    series: seriesList,
    getSeries,
    setSeries,
  };
}

//------------------------------------------------------------------------------
export function getSeries(id, createIfNotFond = false) {
  return seriesMap.get(id)
    || (createIfNotFond && setSeries(id));
}

//------------------------------------------------------------------------------
export function setSeries(id, data = { id, books: [] }) {
  seriesMap.set(id, data);
  return seriesMap.get(id);
}

//------------------------------------------------------------------------------
export default useSeries;
