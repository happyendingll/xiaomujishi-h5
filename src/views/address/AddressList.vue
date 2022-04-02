<template>
  <van-nav-bar
      title="管理收货地址"
      left-text="返回"
      right-text="新建"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  />
  <div class="all">
    <div class="title">我的收货地址</div>
    <div class="address-item" v-for="item in addressList" :key="item._id">
      <router-link :to="`/addressEdit/${item._id}`">
      <span class="name">{{ item.receiver }}</span><span class="phone">{{ item.phone }}</span>
      <div class="address">{{ item.city }}{{ item.community }}{{ item.houseNumber }}</div>
      </router-link>
    </div>
  </div>
</template>
<script>
import {useRouter} from "vue-router"
import {get} from '@/utils/request'
import {ref} from "vue";

export default {
  setup() {
    const router = useRouter()
    const addressList = ref([])
    const onClickLeft = () => history.back();
    const onClickRight = () => {
      router.push({name: 'AddressAdd'})
    };
    !(async () => {
      const {data} = await get('/api/user/address')
      addressList.value = data
    })()
    return {
      onClickLeft, onClickRight, addressList
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
  background-color: #ccc;
  width: 28.3rem;
  height: 8.7rem;
  margin-top: 1.3rem;
  padding: 1.5rem 1.3rem;
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
</style>