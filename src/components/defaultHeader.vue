<template>
  <div>
    <el-header height="90px">
        
      <div class="lwzx-site">
        <img src="../assets/common/lwzx-img.png" class="lwzx-img" @click="handleLogo('index')">
        <img src="../assets/common/lwzx-logo.png" class="lwzx-logo" @click="handleLogo('footShape')">
      </div>
      <div class="lwzx-action">
        <el-link :underline="false" icon="el-icon-s-home" class="icon-home" href="/index.html">首页</el-link>

        <drop-down :isLogin="isLogin" @login-status="handleLoginStatus"></drop-down>
      </div>

    </el-header>
    <Login @login-status="handleLoginStatus" v-model="loginVisible"></Login>
  </div>
</template>
<script>
import DropDown from '@/components/dropDown'
import loginMixins from '@/mixins/login'
import Login from '@/components/login'

export default {
  components: {
    Login,
    DropDown
  },
  mixins: [loginMixins],
  methods: {
    handleLogo (page) {
      window.location.href = page + '.html'
    }
  }
}
</script>
<style lang="less" scoped>
.el-header {
  position: relative;
  line-height: 90px;
  background-color: #fff;
  padding-left:70px;
}
.lwzx-site {
  display: inline-flex;
  align-items: center;
  height: 100%;
  .lwzx-img {
    padding-right: 20px;
    cursor: pointer;
  }
  .lwzx-logo {
    padding-left: 24px;
    border-left: 1px solid #999;
    cursor: pointer;
  }
}
.lwzx-action {
  position: absolute;
  right: 126px;
  bottom: 22px;
  color: #000;
  font-size: 16px;
  line-height: 16px;
  display: inline-flex;
  align-items: center;
  a {
    font-size: 16px;
  }
  .icon-home {
    padding-right: 40px;
    margin-right: 34px;
    border-right: 1px solid #999;
  }
}
</style>
