<template>
  <van-nav-bar
      title="管理收货地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />

  <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
  />
</template>
<script>
import {useRouter} from "vue-router"
import {get} from '@/utils/request'
import {ref} from "vue";
import {Toast} from "vant";
import {toRaw} from "@vue/reactivity";

export default {
  setup() {
    const router = useRouter()
    const addressList = ref([])
    const onClickLeft = () => history.back();
    !(async () => {
      const {data} = await get('/api/user/address')
      for (const item of data) {
        const {_id: id, phone: tel, receiver: name, community} = item
        const newItem = {id, tel, address: `${community}`, name}
        addressList.value.push(newItem)
      }
      addressList.value[0][`isDefault`] = true
    })()
    const chosenAddressId = ref('1');
    const onAdd = () => router.push({name: 'AddressAdd'})
    const onEdit = (item, index) => {
      router.push({path:`/addressEdit/${toRaw(item).id}`,})
      Toast('编辑地址:' + index);
    }

    return {
      onClickLeft, addressList,
      onAdd,
      onEdit,
      chosenAddressId,
    };
  },
}
</script>
<style lang="scss">
.all {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-family: PingFangSC-Regular, serif;
  font-size: 1.2rem;
  color: #333333;
  align-self: flex-start;
  margin-top: 1.3rem;
  margin-left: 1.5rem;
}

.address-item {
  box-sizing: border-box;
  background-color: #F1F1F1;
  width: 28.3rem;
  height: 8.7rem;
  margin-top: 1.3rem;
  padding: 1.5rem 1.3rem;
  border-radius: 1rem;
  position: relative;
}

.name {
  width: 2.3rem;
  height: 1.7rem;
  font-family: PingFangSC-Regular, serif;
  font-size: 1.2rem;
  color: #999999;
}

.phone {
  margin-left: 5.5rem;
  height: 1.7rem;
  font-family: PingFangSC-Regular, serif;
  font-size: 1.2rem;
  color: #999999;
}

.address {
  margin-top: 1.3rem;
  width: 21.7rem;
  height: 3.3rem;
  font-family: PingFangSC-Regular, serif;
  font-size: 1.2rem;
  line-height: 1.7rem;
  color: #333333;
}

.test {
  position: absolute;
  right: 2.8rem;
  top: 50%;
  transform: translate(0, -50%)
}
</style>