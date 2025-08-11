import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    alias: ['/'],
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/index',
    component: () => import('layouts/BelkaLayout.vue'),
    children: [{ path: '', component: () => import('pages/WelcomePage.vue') }],
  },
  {
    path: '/tablemode',
    component: () => import('layouts/BelkaLayout.vue'),
    children: [{ path: '', component: () => import('pages/TableMode.vue') }],
  },
  {
    path: '/excelmode',
    component: () => import('layouts/BelkaLayout.vue'),
    children: [{ path: '', component: () => import('pages/JspreadsheetPage.vue') }],
  },
  {
    path: '/users',
    component: () => import('layouts/BelkaLayout.vue'),
    children: [{ path: '', component: () => import('pages/UsersPage.vue') }],
  },
  {
    path: '/jspreadsheet',
    component: () => import('layouts/BelkaLayout.vue'),
    children: [{ path: '', component: () => import('pages/JspreadsheetPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
