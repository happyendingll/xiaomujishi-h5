<template>
  <van-sticky>
    <van-nav-bar
        title="商店"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        @click="testClick"
    />
  </van-sticky>
  <van-skeleton title avatar :row="2" :loading="loading">
    <van-config-provider :theme-vars="themeVars">
      <van-card
          :desc="`月售${shopInfo.monthlySale}  起送${shopInfo.sendOff}  运费${shopInfo.baseShippingCosts}`"
          :title="shopInfo.shopName"
          :thumb="`http://localhost:3000/images${shopInfo.imgUrl}`"
          centered=centered
          class="my-card__shop"
      >
        <template v-slot:tags>
          <div>{{ shopInfo.slogan }}</div>
        </template>
      </van-card>
    </van-config-provider>
  </van-skeleton>
  <div class="products">
    <van-sticky offset-top="3.83rem">
      <van-sidebar v-model="active" @change="onChange" ref="box">
        <van-sidebar-item title="全部商品" tag="all"/>
        <van-sidebar-item title="秒杀" tag="secKill"/>
        <van-sidebar-item title="新鲜水果" tag="freshFruit"/>
        <van-sidebar-item title="休闲食品"/>
        <van-sidebar-item title="时令蔬菜"/>
        <van-sidebar-item title="肉蛋家禽"/>
      </van-sidebar>
    </van-sticky>
    <div class="products_content">
      <div v-for="item in productList" :key="item._id">
        <van-card
            :desc="`月售:${item.monthlySale}`"
            :price="item.price"
            :origin-price="item.originalPrice"
            :title="item.name"
            :thumb="`http://localhost:3000/images${item.imgUrl}`"
            class="my-card__product"
        >
          <template #num>
            <van-stepper v-model="productsQuantity[item._id]" theme="round" button-size="22" disable-input
                         min="0" default-value="0" @plus="handlePlus(item)" @minus="handleMinus(item)"
            />
          </template>
        </van-card>
      </div>
    </div>
  </div>
  <van-popup v-model:show="show" position="bottom">
    <div class="shop__cart">
      <van-sticky offset-top="35.6rem">
        <div class="cart-header">
          <div class="shop__clearCart" @click="clearCart()">清空购物车</div>
        </div>
      </van-sticky>
      <div class="products_content">
        <div v-for="item in products" :key="item._id">
          <van-card
              :price="item.price"
              :origin-price="item.originalPrice"
              :title="item.name"
              :thumb="`http://localhost:3000/images${item.imgUrl}`"
              class="my-card__cart"
          >
            <template #num>
              <van-stepper v-model="productsQuantity[item._id]" theme="round" button-size="22" disable-input
                           min="0" default-value="0" @plus="handlePlus(item)" @minus="handleMinus(item)"
              />
            </template>
          </van-card>
        </div>
      </div>
    </div>
  </van-popup>
  <van-action-bar style="z-index: 9999">
    <van-action-bar-icon icon="cart-o" text="购物车" @click="showPopup"/>
    <div style="width: 40vw;display: flex;justify-content:center;">总计:{{ total }}</div>
    <van-action-bar-button type="danger" text="立即购买" @click="onClickButton"/>
  </van-action-bar>
</template>
<script>
import {onMounted, ref, computed} from 'vue';
import {Toast} from 'vant';
import {get} from "@/utils/request";
import {useRoute} from "vue-router";
import {useStore} from 'vuex';

const getProductsEffect = () => {
  const store = useStore()
  const route = useRoute()
  const productList = ref([])
  const getProducts = async (tag = '') => {
    const {data} = await get(`/api/shop/${route.params.id}/products?tag=${tag}`)
    productList.value = data
    store.dispatch('products/getAllProducts', productList.value)
  }
  return {productList, getProducts}
}
export default {
  setup() {
    const active = ref(0);
    const onClickIcon = () => Toast('点击图标');
    const onClickButton = () => Toast('点击按钮');
    const onClickLeft = () => history.back();
    const route = useRoute()
    const shopInfo = ref({})
    const loading = ref(true)
    !(async () => {
      const {data} = await get(`/api/shop/${route.params.id}`)
      shopInfo.value = data
      loading.value = false
    })()
    const {productList, getProducts} = getProductsEffect()
    getProducts()
    const {handlePlus, handleMinus, handleClearCart} = useCartEffect()
    const onChange = function (index) {
      //根据ref拿到bom节点的方式获取tag
      // Toast(`${box.value.$el.children[index].attributes.tag.value}`);
      //根据把值列出来再按照index做处理
      const tags = ['all', 'secKill', 'freshFruit']
      console.log(tags[index])
      getProducts(tags[index])
    }
    const box = ref(null)
    onMounted(() => {
      // console.log(this.$refs.test.innerHTML)//vue2的写法
      // console.log(box.value.$el.children[index].attributes.tag.value)
    })
    const themeVars = {
      // cardThumb:'4rem'
    };
    const show = ref(false);
    const showPopup = () => {
      show.value = !show.value;
    };
    const {
      checkoutStatus,
      products,
      total,
      productsQuantity,
      checkout
    } = shopCartEffect()
    const testClick = () => {
      console.log(productsQuantity.value)
    }
    const clearCart = () => {
      productsQuantity.value = []
      handleClearCart()
    }
    return {
      active,
      onClickIcon,
      onClickButton,
      onClickLeft,
      productList,
      shopInfo,
      loading, onChange, box, getProducts, themeVars,
      show,
      showPopup, handlePlus, handleMinus,
      checkoutStatus,
      products,
      total,
      checkout,
      productsQuantity,
      testClick,
      clearCart, handleClearCart
    };
  },
};
const useCartEffect = () => {
  const store = useStore()
  const handlePlus = (item) => {
    console.log(item)
    store.dispatch('cart/addProductToCart', item)
  }
  const handleMinus = (item) => {
    store.dispatch('cart/removeProductFromCart', item)
  }
  const handleClearCart = () => {
    store.dispatch('cart/clearProductsFromCart')
  }
  return {handlePlus, handleMinus, handleClearCart}
}
const shopCartEffect = () => {
  const store = useStore()

  const checkoutStatus = computed(() => store.state.cart.checkoutStatus)
  const products = computed(() => store.getters['cart/cartProducts'])
  const total = computed(() => store.getters['cart/cartTotalPrice'])
  const productsQuantity = computed(() => store.getters['cart/productsQuantity'])
  const checkout = (products) => store.dispatch('cart/checkout', products)

  return {
    checkoutStatus,
    products,
    total,
    productsQuantity,
    checkout
  }
}
</script>
<style lang="scss">
.products {
  display: flex;

  .products_content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}

.shopImg {
  width: 4.7rem;
  height: 4.7rem;
  object-fit: cover;
}

.productImg {
  width: 5.7rem;
  height: 5.7rem;
  object-fit: cover;
}

.my-card__shop {
  .van-image {
    display: flex;
    justify-content: center;
    align-items: center;

    .van-image__img {
      width: 4.7rem;
      height: 4.7rem;
    }
  }
}

.my-card__product {
  .van-image {
    display: flex;
    justify-content: center;
    align-items: center;

    .van-image__img {
      width: 5.7rem;
      height: 5.7rem;
    }
  }
}

.my-card__cart {
  height: 4.5rem;

  .van-card__thumb {
    height: 4.0rem;
  }

  .van-card__content {
    justify-content: flex-start;
  }

  .van-image {
    display: flex;
    justify-content: center;
    align-items: center;

    .van-image__img {
      width: 3.8rem;
      height: 3.8rem;
    }
  }
}

.shop__cart {
  height: 20rem;

  .cart-header {
    height: 3.3rem;
    border-bottom: #ccc solid 0.1rem;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    z-index: 9999;

    .shop__clearCart {
      width: 6rem;
      height: 1.3rem;
      font-family: PingFangSC-Regular, serif;
      font-size: 1.2rem;
      color: #333333;
      margin-right: 1.5rem;
    }
  }
}

</style>