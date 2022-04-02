<template>
  <van-nav-bar
      title="编辑收货地址"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  />
  <van-cell-group inset>
    <!-- 输入任意文本 -->
    <van-field v-model="address.city" label="所在城市："/>
    <van-field v-model="address.community" label="小区/大厦/学校："/>
    <van-field v-model="address.houseNumber" label="楼号-门牌号："/>
    <van-field v-model="address.receiver" label="收货人："/>
    <!-- 输入手机号，调起手机号键盘 -->
    <van-field v-model="address.phone" type="tel" label="手机号"/>
  </van-cell-group>

</template>
<script>
import { reactive} from 'vue';
import {useRouter,useRoute} from 'vue-router';
import {get,patch} from "@/utils/request";
import {Toast} from 'vant'

export default {
  setup() {
    const address = reactive({city:'', community:'', houseNumber:'', receiver:'', phone:''});
    const router = useRouter()
    const route=useRoute()
    const onClickLeft = () => history.back();
    const onClickRight = async () => {
      const {errno, message} = await patch(`/api/user/address/${route.params.id}`, address)
      if (errno === 0) {
        Toast('更新成功')
        await router.push({name: 'AddressList'})
      } else {
        Toast(`更新失败 - ${message}`)
      }
    }
    !(async ()=>{
     const {data}=await get(`/api/user/address/${route.params.id}`)
      address.city=data.city
      address.community=data.community
      address.phone=data.phone
      address.receiver=data.receiver
      address.houseNumber=data.houseNumber
    })()
    return {address, onClickLeft, onClickRight};
  }
};

</script>
<style lang="">

</style>