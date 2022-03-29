<template lang="">
<van-nav-bar
  title="新建收货地址"
  left-text="返回"
  right-text="保存"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
<van-cell-group inset>
  <!-- 输入任意文本 -->
  <van-field v-model="text" label="所在城市：" />
  <van-field v-model="text" label="小区/大厦/学校：" />
  <van-field v-model="text" label="楼号-门牌号：" />
  <van-field v-model="text" label="收货人：" />
  <!-- 输入手机号，调起手机号键盘 -->
  <van-field v-model="tel" type="tel" label="手机号" />
</van-cell-group>

</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const tel = ref('');
    const text = ref('');
    const digit = ref('');
    const number = ref('');
    const password = ref('');

    return { tel, text, digit, number, password };
  },
};

</script>
<style lang="">

</style>