<template>
  <van-nav-bar
      title="商店"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
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
        <div >{{ shopInfo.slogan }}</div>
      </template>
    </van-card>
    </van-config-provider>
  </van-skeleton>
  <div class="products">
    <van-sidebar v-model="active" @change="onChange" ref="box">
      <van-sidebar-item  title="全部商品" tag="all" />
      <van-sidebar-item title="秒杀" tag="secKill"/>
      <van-sidebar-item title="新鲜水果" tag="freshFruit"/>
      <van-sidebar-item title="休闲食品"/>
      <van-sidebar-item title="时令蔬菜"/>
      <van-sidebar-item title="肉蛋家禽"/>
    </van-sidebar>
    <div class="products_content">
      <div v-for="item in productList" :key="item._id">
        <van-card
            num="2"
            :desc="`月售:${item.monthlySale}`"
            :price="item.price"
            :origin-price="item.originalPrice"
            :title="item.name"
            :thumb="`http://localhost:3000/images${item.imgUrl}`"
            class="my-card__product"
        >
        </van-card>
      </div>
    </div>
  </div>
  <van-action-bar>
    <van-action-bar-icon icon="chat-o" text="客服" @click="onClickIcon"/>
    <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickIcon"/>
    <van-action-bar-icon icon="shop-o" text="店铺" @click="onClickIcon"/>
    <van-action-bar-button type="danger" text="立即购买" @click="onClickButton"/>
  </van-action-bar>
</template>
<script>
import {onMounted, ref} from 'vue';
import {Toast} from 'vant';
import {get} from "@/utils/request";
import {useRoute} from "vue-router";

const getProductsEffect = () => {
  const route = useRoute()
  const productList = ref([])
  const getProducts =  async (tag='') => {
    const {data} = await get(`/api/shop/${route.params.id}/products?tag=${tag}`)
    productList.value = data
  }
  return {productList,getProducts}
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
    const {productList,getProducts} = getProductsEffect()
    getProducts()
    const onChange = function (index) {
      //根据ref拿到bom节点的方式获取tag
      // Toast(`${box.value.$el.children[index].attributes.tag.value}`);
      //根据把值列出来再按照index做处理
      const tags= ['all','secKill','freshFruit']
      console.log(tags[index])
      getProducts(tags[index])
    }
    const box=ref(null)
    onMounted( ()=>{
      // console.log(this.$refs.test.innerHTML)//vue2的写法
      // console.log(box.value.$el.children[index].attributes.tag.value)
    })
    const themeVars = {
      // cardThumb:'4rem'
    };
    return {
      active,
      onClickIcon,
      onClickButton,
      onClickLeft,
      productList,
      shopInfo,
      loading, onChange,box,getProducts,themeVars
    };
  },
};

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
.shopImg{
  width: 4.7rem;
  height: 4.7rem;
  object-fit:cover;
}
.productImg{
  width: 5.7rem;
  height: 5.7rem;
  object-fit:cover;
}

.my-card__shop{
  .van-image{
    display: flex;
    justify-content: center;
    align-items: center;
    .van-image__img{
      width: 4.7rem;
      height: 4.7rem;
    }
  }
}
.my-card__product{
  .van-image{
    display: flex;
    justify-content: center;
    align-items: center;
    .van-image__img{
      width: 5.7rem;
      height: 5.7rem;
    }
  }
}

</style>