<template>
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
            style="background-color: #ccc"
        />
        <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请确认密码' }]"
            autocomplete="new-password"
            style="background-color: #ccc"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit" class="registerBtn">
          注册
        </van-button>
      </div>
      <div @click="handleClick" class="other">已有账号去登录</div>
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
    const router = useRouter()
    const onSubmit = (values) => {
      console.log('submit', values);
    };
    const handleClick = () => {
      router.push({name: 'Login'})
    }

    return {
      username,
      password,
      onSubmit,
      handleClick
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

.username {
}

.password {
  background-color: #ccc;
  margin-top: 1.3rem;
}

.registerBtn {
  margin-top: 2.7rem;
}
.other {
  display: flex;
  justify-content: center;
}
</style>