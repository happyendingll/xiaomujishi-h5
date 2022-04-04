<template>
  <van-nav-bar
      title="新建收货地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      :address-info="addressEditInfo"
      :search-result="searchResult"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
  />
  <!--  <van-cell-group inset>-->
  <!--    &lt;!&ndash; 输入任意文本 &ndash;&gt;-->
  <!--    <van-field v-model="city" label="所在城市："/>-->
  <!--    <van-field v-model="community" label="小区/大厦/学校："/>-->
  <!--    <van-field v-model="houseNumber" label="楼号-门牌号："/>-->
  <!--    <van-field v-model="receiver" label="收货人："/>-->
  <!--    &lt;!&ndash; 输入手机号，调起手机号键盘 &ndash;&gt;-->
  <!--    <van-field v-model="phone" type="tel" label="手机号"/>-->
  <!--  </van-cell-group>-->

</template>
<script >
import {reactive, toRefs, ref} from 'vue';
import {useRouter} from 'vue-router';
import {post} from "@/utils/request";
import {Toast} from 'vant';
import {areaList} from '@vant/area-data';
import { toRaw } from '@vue/reactivity';


export default {
  setup() {
    const address = reactive({city: '', community: '', houseNumber: '', receiver: '', phone: ''});
    const {city, community, houseNumber, receiver, phone} = toRefs(address)
    const router = useRouter()
    const onClickLeft = () => history.back();

    const searchResult = ref([]);
    const onSave =async (content) => {
      console.log(content)
      const {addressDetail:community,areaCode:houseNumber,city,name:receiver,tel:phone}=toRaw(content)
      const address = {city,community,houseNumber,receiver,phone}
      const {errno, message} = await post('/api/user/address', address)
      if (errno === 0) {
        Toast('保存成功')
        await router.push({name: 'AddressList'})
      } else {
        Toast(`保存失败 - ${message}`)
      }
    }
    const onDelete = () => Toast('delete');
    const onChangeDetail = (val) => {
      if (val) {
        searchResult.value = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        searchResult.value = [];
      }
    };
    const addressEditInfo=ref({name:'zengzy',city: '沈阳市',tel:'13023802363',addressDetail:'dsflgh',areaCode:'131002'})
    return {
      city, community, houseNumber, receiver, phone, onClickLeft,
      onSave,
      onDelete,
      areaList,
      searchResult,
      onChangeDetail,
      addressEditInfo
    };
  }
};

</script>
<style lang="">

</style>