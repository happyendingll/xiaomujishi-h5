import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () =>
            import(/* webpackChunkName: "home" */ "../views/home/Home"),
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/login/Login"),
        beforeEnter:(to,from,next) =>{
            const {isLogin}=sessionStorage
            if (isLogin){
                next({name:'Home'})
            }else {
                next()
            }
        }
    },
    {
        path: "/register",
        name: "Register",
        component: () =>
            import(/* webpackChunkName: "register" */ "../views/login/Register.vue"),
    },

    {
        path: "/shopCart",
        name: "ShopCart",
        component: () =>
            import(/* webpackChunkName: "shopCart" */ "../views/shop/ShopCart.vue"),
    },
    {
        path: "/addressList",
        name: "AddressList",
        component: () =>
            import(
                /* webpackChunkName: "addressList" */ "../views/address/AddressList.vue"
                ),
    },
    {
        path: "/addressEdit/:id",
        name: "AddressEdit",
        component: () =>
            import(
                /* webpackChunkName: "addressEdit" */ "../views/address/AddressEdit.vue"
                ),
    },
    {
        path: "/addressAdd",
        name: "AddressAdd",
        component: () =>
            import(
                /* webpackChunkName: "addressAdd" */ "../views/address/AddressAdd.vue"
                ),
    },
    {
        path: "/shop/:id",
        name: "Shop",
        component: () =>
            import(/* webpackChunkName: "shop" */ "../views/shop/Shop.vue"),
    },
    {
        path: "/order",
        name: "Order",
        component: () =>
            import(/* webpackChunkName: "order" */ "../views/order/Order.vue"),
    },
    {
        path: "/confirmOrder",
        name: "ConfirmOrder",
        component: () =>
            import(/* webpackChunkName: "order" */ "../views/order/ConfirmOrder.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    const {isLogin} = sessionStorage;
    const {name} =to;
    // console.log(isLogin)
    // // 如果登录了
    // if (isLogin||to.name==='Login'){
    //     next()//访问原有路径地址
    // }else{//没有登录的话跳转到登录页面
    //     next({name:'Login'})
    // }
    isLogin||name==='Login'||name==='Register' ? next():next({name:'Login'})
})

export default router;
