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
      const data = await get('/api/user/address')
  console.log(data);
  })();
}

};
</script>