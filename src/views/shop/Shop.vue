<template lang="">
<van-nav-bar
  title="标题"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
<van-card
  num="2"
  price="2.00"
  desc="描述信息"
  title="商品标题"
  thumb="https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
/>
<van-sidebar v-model="active">
  <van-sidebar-item title="全部商品" />
  <van-sidebar-item title="秒杀" />
  <van-sidebar-item title="新鲜水果" />
  <van-sidebar-item title="休闲食品" />
  <van-sidebar-item title="时令蔬菜" />
  <van-sidebar-item title="肉蛋家禽" />
</van-sidebar>
<van-action-bar>
  <van-action-bar-icon icon="chat-o" text="客服" @click="onClickIcon" />
  <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickIcon" />
  <van-action-bar-icon icon="shop-o" text="店铺" @click="onClickIcon" />
  <van-action-bar-button type="danger" text="立即购买" @click="onClickButton" />
</van-action-bar>
</template>
<script>
import { ref } from 'vue';
import { Toast } from 'vant';
export default {
  setup() {
    const active = ref(0);
    const onClickIcon = () => Toast('点击图标');
    const onClickButton = () => Toast('点击按钮');
    const onClickLeft = () => history.back();
    return {
        active,
      onClickIcon,
      onClickButton,
      onClickLeft
    };
  },
};

</script>
<style lang="">

</style>