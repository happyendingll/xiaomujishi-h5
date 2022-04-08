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
      :search-result="searchResult"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
  />

</template>
<script>
import {ref} from 'vue';
import {post} from "@/utils/request";
import {Toast} from 'vant';
import {areaList} from '@vant/area-data';
import {toRaw} from '@vue/reactivity';


export default {
  setup() {
    const onClickLeft = () => history.back();
    const searchResult = ref([]);
    const onSave = async (content) => {
      console.log(content)
      const {
        addressDetail: community,
        areaCode: houseNumber,
        city,
        name: receiver,
        tel: phone,
        isDefault
      } = toRaw(content)
      const address = {city, community, houseNumber, receiver, phone, isDefault}
      const {errno, message} = await post('/api/user/address', address)
      if (errno === 0) {
        Toast('保存成功')
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
    return {
      onClickLeft,
      onSave,
      onDelete,
      areaList,
      searchResult,
      onChangeDetail,
    };
  }
};

</script>
<style lang="">

</style>