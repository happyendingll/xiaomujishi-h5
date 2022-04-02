<template>
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
    <van-field v-model="city" label="所在城市："/>
    <van-field v-model="community" label="小区/大厦/学校："/>
    <van-field v-model="houseNumber" label="楼号-门牌号："/>
    <van-field v-model="receiver" label="收货人："/>
    <!-- 输入手机号，调起手机号键盘 -->
    <van-field v-model="phone" type="tel" label="手机号"/>
  </van-cell-group>

</template>
<script>
import {reactive, toRefs} from 'vue';
import {useRouter} from 'vue-router';
import {post} from "@/utils/request";
import {Toast} from 'vant'

export default {
  setup() {
    const address = reactive({city:'', community:'', houseNumber:'', receiver:'', phone:''});
    const {city, community, houseNumber, receiver, phone} = toRefs(address)
    const router = useRouter()
    const onClickLeft = () => history.back();
    const onClickRight = async () => {
      const {errno, message} = await post('/api/user/address', address)
      if (errno === 0) {
        Toast('保存成功')
        await router.push({name: 'AddressList'})
      } else {
        Toast(`保存失败 - ${message}`)
      }
    }
    return {city, community, houseNumber, receiver, phone, onClickLeft, onClickRight};
  }
};

</script>
<style lang="">

</style>