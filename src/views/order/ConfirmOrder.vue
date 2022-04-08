<template>
  <div class="confirmOrder">
    <div class="gradient">
      <van-nav-bar
          title="确认订单"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
      />
      <router-link class="order__address"  to="/addressList">
        <div class="address__title">收货地址</div>
        <div class="address__detailAddress">{{ addressInfo.city }}{{ addressInfo.community }}</div>
        <div class="address__userInfo">
          <span class="userInfo__name">{{ addressInfo.receiver }}</span>
          <span class="userInfo__phone">{{ addressInfo.phone }}</span>
        </div>
        <div class="address__arrow">&gt;</div>
      </router-link>
    </div>
    <div class="order">
      <div class="order__products">
        <div class="products__shopName">沃尔玛</div>
        <div class="products__productList" v-for="item in products" :key="item._id">
          <div class="products__productItem">
            <img class="productItem__img" :src="`http://localhost:3000/images${item.imgUrl}`">
            <div class="productItem__info">
              <div class="productItem__name">{{ item.name }}</div>
              <span class="productItem__price&num">{{ item.price }}x{{ item.quantity }}</span>
              <span class="productItem__total">{{ item.price * item.quantity }}元</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-action-bar>
      <div style="width: 40vw;display: flex;justify-content:center;">总计:{{ total }}</div>
      <van-action-bar-button type="danger" text="提交订单" @click="onClickButton"/>
    </van-action-bar>
  </div>
</template>

<script>
import {computed, ref} from "vue";
import {useStore} from 'vuex';
import {get} from '@/utils/request';

const useAddressEffect = () => {
  const addressInfo = ref({})
  const getAddressInfo = async () => {
    const {data} = await get('/api/user/address/default')
    addressInfo.value = data
  }
  return {addressInfo, getAddressInfo}
}
export default {
  name: "order",
  setup() {
    const onClickLeft = () => history.back();
    const store = useStore()
    const products = computed(() => store.getters['cart/cartProducts'])
    const total = computed(() => store.getters['cart/cartTotalPrice']);
    const {addressInfo, getAddressInfo} = useAddressEffect()
    getAddressInfo()
    return {onClickLeft, products, total, addressInfo, getAddressInfo};
  },
}
</script>

<style lang="scss" scoped>
.confirmOrder {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .gradient {
    height: 16.4rem;
    background-image: linear-gradient(0deg, rgba(0, 145, 255, 0.00) 4%, #0091FF 50%);

    .order__address {
      width: 28.3rem;
      height: 9.3rem;
      margin: 1.8rem auto 1.3rem;
      background-color: white;;
      position: relative;
      border-radius: 0.3rem;
      display: flex;
      flex-direction: column;

      .address__title {
        font-family: PingFangSC-Medium, serif;
        font-size: 1.3rem;
        color: #333333;
        margin-top: 1.3rem;
        margin-left: 1.3rem;
      }

      .address__detailAddress {
        font-family: PingFangSC-Medium, serif;
        font-size: 1.2rem;
        color: #333333;
        margin-top: 1.2rem;
        margin-left: 1.3rem;
      }

      .address__userInfo {
        margin-top: 0.5rem;

        .userInfo__name {
          font-family: PingFangSC-Medium, serif;
          font-size: 1rem;
          color: #333333;
          margin-left: 1.3rem;
        }

        .userInfo__phone {
          font-family: PingFangSC-Medium, serif;
          font-size: 1rem;
          color: #333333;
          margin-left: 0.5rem;
        }
      }

      .address__arrow {
        position: absolute;
        right: 1.3rem;
        top: 50%;
        transform: translate(0%, -50%);
        width: 0.7rem;
        height: 1.3rem;
      }
    }
  }

  .order {
    flex: 1;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.3rem;


    .order__products {
      box-sizing: border-box;
      padding: 1.3rem;
      width: 28.3rem;
      background-color: white;
      display: flex;
      flex-direction: column;

      .products__shopName {
        width: 4rem;
        height: 1.8rem;
        margin-top: 1.3rem;
        font-family: PingFangSC-Medium, serif;
        font-size: 1.3rem;
        color: #333333;
      }

      .products__productItem {
        display: flex;
        margin-top: 1.3rem;

        .productItem__img {
          display: inline-block;
          width: 3.8rem;
          height: 3.8rem;
          object-fit: cover;
        }

        .productItem__info {
          margin-left: 1.3rem;

          .productItem__name {
            height: 1.7rem;
            font-family: PingFangSC-Medium, serif;
            font-size: 1.2rem;
            color: #333333;
            margin-bottom: 0.5rem;
          }

          .productItem__priceAndNum {

          }

          .productItem__total {
            margin-left: 13rem;
          }
        }
      }
    }
  }
}
</style>