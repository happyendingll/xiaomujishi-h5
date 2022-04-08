<template>
  <div class="order">
    <van-nav-bar
        title="我的订单"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <div class="orderList" >
      <div class="orderItem" v-for="item in orderList" :key="item._id">
        <div class="orderItem-header">
          <div class="orderItem-header-left">{{ item.shopName }}
          </div>
          <div class="orderItem-header-right">{{ item.isCanceled ? '已取消' : '已支付' }}
          </div>
        </div>
        <div class="orderItem-body">
          <div class="orderItem-body-left">
            <div class="orderItem-body-left-img" v-for="product in item.products" :key="product._id">
              <img
                  :src="`http://localhost:3000/images${product.product.imgUrl}`"
                  alt="">
            </div>
          </div>
          <div class="orderItem-body-right">
            <div class="orderItem-body-right-count">
              ¥{{ item.products.reduce((total,product)=>{return total+=product.num*product.product.price},0) }}
            </div>
            <div class="orderItem-body-right-total">共{{item.products.reduce((total,product) => {return total += product.num},0)}}件
            </div>
          </div>
        </div>

      </div>


    </div>
  </div>
</template>
<script>
import {get} from '@/utils/request'
import {ref} from 'vue'

//获取订单列表
const getOrderListEffect = () => {
  const orderList = ref([])
  const getOrderList = async () => {
    const res = await get('/api/order')
    orderList.value = res.data
  }
  return {orderList, getOrderList}
}
export default {
  setup() {
    const onClickLeft = () => history.back();
    const {orderList, getOrderList} = getOrderListEffect();
    getOrderList()
    console.log(orderList)
    return {
      onClickLeft,
      orderList
    };
  },
}
</script>
<style lang="scss" scoped>
.order {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;

  .orderList {
    flex: 1;
    overflow: auto;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;

    .orderItem {
      width: 28.3rem;
      height: 9.3rem;
      margin-top: 1.3rem;
      background-color: #fff;
      border-radius: 0.3rem;
      box-sizing: border-box;
      padding: 1.3rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .orderItem-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 1.8rem;
        align-items: center;

        .orderItem-header-left {
          font-family: PingFangSC-Medium, serif;
          font-size: 1.3rem;
          color: #333333;
        }

        .right-header-right {
          font-family: PingFangSC-Medium, serif;
          font-size: 1.2rem;
          color: #999999;
          text-align: right;
        }
      }

      .orderItem-body {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .orderItem-body-left {
          width: 16.3rem;
          height: 3.3rem;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          display: flex;

          .orderItem-body-left-img {
            width: 3.3rem;
            height: 3.3rem;
            border-radius: 10%;
            overflow: hidden;
            margin-right: 1rem;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }

        .orderItem-body-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .orderItem-body-right-count {
            font-family: PingFangSC-Regular, serif;
            font-size: 1.2rem;
            color: #E93B3B;
            text-align: right;
          }

          .orderItem-body-right-total {
            font-family: PingFangSC-Regular, serif;
            font-size: 1rem;
            color: #333333;
            text-align: right;
            line-height: 14px;
          }
        }
      }
    }
  }
}
</style>