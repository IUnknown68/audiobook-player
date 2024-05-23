import MainLayout from 'layouts/MainLayout.vue';

import PlayerPage from 'pages/PlayerPage.vue';
import IndexPage from 'pages/IndexPage.vue';

import ErrorNotFound from 'pages/ErrorNotFound.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/play/:bookId/:timestamp?',
        name: 'player',
        component: PlayerPage,
      },
      {
        path: '/',
        name: 'home',
        component: IndexPage,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
  },
];

export default routes;
