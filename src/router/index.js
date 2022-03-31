import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login/Register.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home/Home.vue"),
  },
  {
    path: "/shopCart",
    name: "ShopCart",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/shop/ShopCart.vue"),
  },
  {
    path: "/addressList",
    name: "AddressList",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/address/AddressList.vue"
      ),
  },
  {
    path: "/addressEdit",
    name: "AddressEdit",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/address/AddressEdit.vue"
      ),
  },
  {
    path: "/addressAdd",
    name: "AddressAdd",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/address/AddressAdd.vue"
      ),
  },
  {
    path: "/shop",
    name: "Shop",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/shop/Shop.vue"),
  },
  {
    path: "/order",
    name: "Order",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/order/Order.vue"),
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
