import { EventBus } from 'quasar';

const bus = new EventBus();

function useGlobalEvents() {
  return bus;
}

export default useGlobalEvents;
