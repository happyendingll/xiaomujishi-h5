<template>
<router-view/>
</template>


<style lang="scss">

</style>
<script>
import { get } from './utils/request';

export default {
  setup() {
  !(async()=>{
      const data = await get('/api/shop/hot-shop')
  console.log(data);
  })();
}

};
</script>