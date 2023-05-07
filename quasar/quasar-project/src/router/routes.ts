import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/concentrates',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/ConcentratesPage.vue') }],
  },
  {
    path: '/jspreadsheet',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/JspreadsheetPage.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
