<template>
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <div class="all">
    <van-image
        round
        width="5.5rem"
        height="5.5rem"
        src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        class="avatar"
    />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
            autocomplete="new-password"
            style="background-color: #ccc"
        />
        <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            autocomplete="new-password"
            style="background-color: #ccc;font-size: 16px"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit" @click="handleLogin" class="loginBtn">
          登录
        </van-button>
      </div>
      <div class="other">
        <span @click="handleRegister">立即注册</span>
        <span style="margin-left: 1rem">忘记密码</span>
      </div>

    </van-form>
  </div>
</template>
<script>
import {ref} from 'vue';
import {useRouter} from 'vue-router'

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const onSubmit = (values) => {
      console.log('submit', values);
    };
    const handleLogin = () => {
      localStorage.isLogin = true
      router.push({name: 'Home'})
    };
    const handleRegister = () => {
      router.push({name: 'Register'})
    }
    return {
      username,
      password,
      onSubmit,
      handleLogin,
      handleRegister
    };
  },
};

</script>
<style lang="scss">
.all {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.other {
  display: flex;
  justify-content: center;
  border-top: 1.3rem;
}

.avatar {
  margin-top: 10rem;
  margin-bottom: 3.3rem;
}

.loginBtn {
  margin-top: 2.7rem;
}
</style>