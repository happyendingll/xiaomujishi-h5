<template lang="">
<van-nav-bar
  title="我的订单"
    left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
</template>
<script>
export default {
setup() {
    const onClickLeft = () => history.back();
    return {
      onClickLeft,
    };
  },
}
</script>
<style lang="">

</style>