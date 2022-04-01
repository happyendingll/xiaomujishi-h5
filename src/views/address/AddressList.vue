<template>
<van-nav-bar
  title="管理收货地址"
  left-text="返回"
  right-text="新建"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>

</template>
<script>
import {useRouter} from "vue-router"
export default {

  setup() {
    const router = useRouter()
    const onClickLeft = () => history.back();
    const onClickRight = () => {router.push({name:'AddressAdd'})};
    return {
      onClickLeft,onClickRight
    };
  },
}
</script>
<style lang="">

</style>