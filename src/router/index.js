import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/user/user-login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/user/user-register.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home/home-index.vue"),
  },
  {
    path: "/shop-cart",
    name: "shopCart",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/shop/shop-cart.vue"),
  },
  {
    path: "/address",
    name: "address",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/address/address-list.vue"
      ),
  },
  {
    path: "/address-edit",
    name: "address-edit",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/address/address-edit.vue"
      ),
  },
  {
    path: "/address-add",
    name: "address-add",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/address/address-add.vue"
      ),
  },
  {
    path: "/shop-info",
    name: "shop-info",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/shop/shop-info.vue"),
  },
  {
    path: "/order-list",
    name: "order-list",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/order/order-list.vue"),
  },

  {
    // path: '/about',
    // name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../viewss/Aboutviews.vue')
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
