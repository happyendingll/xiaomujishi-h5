<template>

<div class="position">
<van-icon name="location-o" class="position_icon_location" :size="18" />
<div class="position_title">北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层</div>
<van-icon name="service-o" class="position_icon_service" :size="18" />
</div>
<van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />

<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item></van-swipe-item>
  <van-swipe-item></van-swipe-item>
  <van-swipe-item></van-swipe-item>
  <van-swipe-item></van-swipe-item>
</van-swipe>
<van-grid class="my-grid" :column-num="5" @click="handle_click">
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
</van-grid>
<div class="divider"></div>
<div class="hot-">热门商店</div>
<van-card
  num="2"
  price="2.00"
  desc="描述信息"
  title="商品标题"
  thumb="https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
  @click="onClick()"
/><van-card
  num="2"
  price="2.00"
  desc="描述信息"
  title="商品标题"
  thumb="https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
  @click="onClick()"
/>
<van-tabbar v-model="active">
  <van-tabbar-item icon="home-o" >首页</van-tabbar-item>
  <van-tabbar-item icon="shopping-cart-o" to='/shop-cart'>购物车</van-tabbar-item>
  <van-tabbar-item icon="coupon-o" to="'/order-list">订单</van-tabbar-item>
  <van-tabbar-item icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
<router-view/>
</template>


<style lang="scss">
.position{
  display:flex;
  height: 4.5rem;
  align-items: center;
  .position_icon_location{
  margin-left: 1.6rem;
  margin-top: 0.5rem;
  }
  .position_title{
    margin-left: 0.8rem;
    font-family: PingFangSC-Regular,serif;
    width: 20.8rem;
font-size: 1.3rem;
color: #333333;
text-overflow:ellipsis;
white-space:nowrap;
overflow:hidden
  }
  .position_icon_service{
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    margin-right: 1.5rem;
  }
}
.my-swipe{
  margin: 0 auto;
  height: 7.2rem;
  width: 28.3rem;
  border-radius: 0.4rem;
}
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  .my-grid{
    margin: 1.5rem 1.3rem;
  width: 28.3rem;

  }
  .divider{
background: #F1F1F1;
height: 0.8rem;
  }
</style>
<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {Toast} from "vant";

export default {
  setup() {
    const active = ref(1);
    const value = ref('');
    const router = useRouter()
    const images = [
      'https://cdn.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
      'https://cdn.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ];
    const onClick=()=>{
      router.push({ name: 'shop-info' })
    }
    const handle_click=()=>{
      Toast('提示内容');
    }
    return { active ,value,images,onClick,handle_click};
  },
};
</script>