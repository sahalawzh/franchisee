<template>
  <el-header height="90px">
    <div class="lwzx-site">
      <img src="../assets/common/lwzx-img.png" class="lwzx-img">
      <img src="../assets/common/lwzx-logo.png" class="lwzx-logo">
    </div>
    <div class="lwzx-action">
      <el-link :underline="false" icon="el-icon-s-home" class="icon-home" href="/index.html">首页</el-link>

      <drop-down></drop-down>
    </div>
  </el-header>
</template>
<script>
// import storage from '@/utils/storage'
// import auth from '@/utils/auth'
import DropDown from '@/components/dropDown'
export default {
  components: {
    DropDown
  },
  computed: {
    // hasLogin () {
    //   return auth.checkAuth()
    // },
    // user () {
    //   return this.hasLogin && storage.get('gdlwzn_login')
    // }
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
  }
  .lwzx-logo {
    padding-left: 24px;
    border-left: 1px solid #999;
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
