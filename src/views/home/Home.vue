<template>
<div class="all">
  <div class="position">
    <van-icon name="location-o" class="position_icon_location" size="18"/>
    <div class="position_title">北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层</div>
    <van-icon name="service-o" class="position_icon_service" size="18"/>
  </div>
  <van-search v-model="value" shape="round" placeholder="请输入搜索关键词"/>

  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item><img
        src="https://tencent-1258157820.cos.ap-guangzhou.myqcloud.com/uPic/photo-1648670329793-e542dbe65bb7.webp"
        alt=""></van-swipe-item>
    <van-swipe-item><img
        src="https://tencent-1258157820.cos.ap-guangzhou.myqcloud.com/uPic/photo-1637955545923-df712b7da3d5.webp"
        alt=""></van-swipe-item>
    <van-swipe-item><img
        src="https://tencent-1258157820.cos.ap-guangzhou.myqcloud.com/uPic/photo-1548586805-f69e7b816cbe.webp" alt="">
    </van-swipe-item>
    <van-swipe-item><img
        src="https://tencent-1258157820.cos.ap-guangzhou.myqcloud.com/uPic/photo-1640622308205-8ad9478c2386.webp"
        alt=""></van-swipe-item>
  </van-swipe>
  <van-grid class="my-grid" :column-num="5" @click="handle_click">
    <van-grid-item icon="photo-o" text="文字"/>
    <van-grid-item icon="photo-o" text="文字"/>
    <van-grid-item icon="photo-o" text="文字"/>
    <van-grid-item icon="photo-o" text="文字"/>
    <van-grid-item icon="photo-o" text="文字"/>
    <van-grid-item icon="photo-o" text="文字"/>
    <van-grid-item icon="photo-o" text="文字"/>
    <van-grid-item icon="photo-o" text="文字"/>
    <van-grid-item icon="photo-o" text="文字"/>
    <van-grid-item icon="photo-o" text="文字"/>
  </van-grid>
  <div class="divider"></div>
  <div class="hot-">热门商店</div>
  <router-link to="/" v-for="item in shopList" :key="item._id">
  <van-card
      :desc="`月售${item.monthlySale}  起送${item.sendOff}  运费${item.baseShippingCosts}`"
      :title="item.shopName"
      :thumb="`http://localhost:3000/images${item.imgUrl}`"
      centered=centered
      @click="onClick()"
  >
<!--    <view :slot:tags>-->
<!--      <div>{{item.slogan}}</div>-->
<!--    </view>-->
  </van-card>
  </router-link>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" to='/shopCart'>购物车</van-tabbar-item>
    <van-tabbar-item icon="coupon-o" to="/order">订单</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/addressList">我的</van-tabbar-item>
  </van-tabbar>
  <router-view/>
</div>
</template>



<script>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {Toast} from "vant";
import {get} from '@/utils/request'

export default {
  setup() {
    const active = ref(0);
    const value = ref('');
    const router = useRouter()
    const images = [
      'https://cdn.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
      'https://cdn.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ];
    const onClick = () => {
      router.push({name: 'shop-info'})
    }
    const handle_click = () => {
      Toast('暂未开发');
    }
    const shopList=ref([])
    !(async ()=>{
      const {data} =await get('/api/shop/hot-shop')
      shopList.value=data
    })()
    return {active, value, images, onClick, handle_click,shopList};
  },
};
</script>
<style lang="scss">
.position {
display: flex;
height: 4.5rem;
align-items: center;

.position_icon_location {
margin-left: 1.6rem;
margin-top: 0.5rem;
}

.position_title {
margin-left: 0.8rem;
font-family: PingFangSC-Regular, serif;
width: 20.8rem;
font-size: 1.3rem;
color: #333333;
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden
}

.position_icon_service {
flex-grow: 1;
display: flex;
justify-content: flex-end;
margin-right: 1.5rem;
}
}

.my-swipe {
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

.my-grid {
margin: 1.5rem 1.3rem;
width: 28.3rem;

}

.divider {
background: #F1F1F1;
height: 0.8rem;
}
</style>