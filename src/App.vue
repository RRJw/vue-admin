<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { login } from '@/api/user'
 
export default {
  name: "App",
  mounted() {
    this.$store.dispatch('user/login',{ username: 'admin', password: '123456' }).then( res => {
      console.log('登录成功=====');
    })
  }
};
</script>