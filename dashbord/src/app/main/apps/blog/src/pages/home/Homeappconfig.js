import { lazy } from 'react';

const Homeappconfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/blog/blog-home',
      component: lazy(() => import('./Home.jsx')),
    },
  ],
};

export default Homeappconfig;
