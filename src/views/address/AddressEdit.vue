<template>
  <van-nav-bar
      title="编辑收货地址"
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

</template>
<script>
import {ref, reactive} from 'vue';
import {useRoute} from 'vue-router';
import {get, patch} from "@/utils/request";
import {Toast} from 'vant'
import {toRaw} from "@vue/reactivity";
import {areaList} from "@vant/area-data";

export default {
  setup() {
    const address = reactive({city:'', community:'', houseNumber:'', receiver:'', phone:''});
    const route=useRoute()
    const onClickLeft = () => history.back();
    const onClickRight = async () => {
      const {errno, message} = await patch(`/api/user/address/${route.params.id}`, address)
      if (errno === 0) {
        Toast('更新成功')
        history.back();
      } else {
        Toast(`更新失败 - ${message}`)
      }
    }
    const addressEditInfo=reactive({})
    !(async ()=>{
     const {data}=await get(`/api/user/address/${route.params.id}`)
      addressEditInfo.city=data.city
      addressEditInfo.addressDetail=data.community
      addressEditInfo.tel=data.phone
      addressEditInfo.name=data.receiver
      addressEditInfo.areaCode=data.houseNumber
    })()


    const searchResult = ref([]);
    const onSave =async (content) => {
      console.log(content)
      const {addressDetail:community,areaCode:houseNumber,city,name:receiver,tel:phone}=toRaw(content)
      const address = {city,community,houseNumber,receiver,phone}
      const {errno, message} = await patch(`/api/user/address/${route.params.id}`, address)
      if (errno === 0) {
        Toast('更新成功')
        history.back()
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
    return {address, onClickLeft, onClickRight,onSave,
      onDelete,
      areaList,
      searchResult,
      onChangeDetail,
      addressEditInfo};
  }
};

</script>
<style lang="">

</style>