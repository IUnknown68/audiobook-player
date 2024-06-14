import {
  ref,
  watch,
  onMounted,
} from 'vue';
import {
  useRoute,
  useRouter,
} from 'vue-router';

//------------------------------------------------------------------------------
function isActive(paramName, route) {
  return route.query[paramName] === '1';
}

//------------------------------------------------------------------------------
function handleToggle(route, router, paramName) {
  if (isActive(paramName, route)) {
    router.back();
    return;
  }
  router.push({
    ...route,
    query: {
      ...route.query,
      [paramName]: '1',
    },
  });
}

//------------------------------------------------------------------------------
function useRouterPopup({ paramName, handleShow, handleHide = null }) {
  const element = ref();
  const route = useRoute();
  const router = useRouter();

  //------------------------------------------------------------------------------
  function fromRoute() {
    if (isActive(paramName, route)) {
      handleShow(element);
    } else if (handleHide) {
      handleHide(element);
    }
  }

  watch(route, fromRoute);
  onMounted(fromRoute);

  return [
    element,
    () => handleToggle(route, router, paramName),
  ];
}

//------------------------------------------------------------------------------
export function useRouterSelect(paramName) {
  const element = ref();
  const route = useRoute();
  const router = useRouter();

  //------------------------------------------------------------------------------
  function fromRoute() {
    if (isActive(paramName, route)) {
      element.value.showPopup();
    }
  }

  watch(route, fromRoute);
  onMounted(fromRoute);

  return [
    element,

    (evt) => {
      evt.preventDefault();
      evt.cancelBubble = true;
      handleToggle(route, router, paramName);
    },

    () => {
      if (isActive(paramName, route)) {
        // Bug: Cancels navigation by BookListItem
        router.back();
      }
    },
  ];
}

export default useRouterPopup;
