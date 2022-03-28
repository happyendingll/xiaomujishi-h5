<template>
<van-tabbar v-model="active">
  <van-tabbar-item icon="home-o">标签</van-tabbar-item>
  <van-tabbar-item icon="search">标签</van-tabbar-item>
  <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
  <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
</van-tabbar>
</template>


<style lang="scss">

</style>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const active = ref(1);
    return { active };
  },
};
</script>