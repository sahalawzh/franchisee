<template>
  <div>
    <div class="header-container">
      <div class="nav-wrap">
        <img src="../assets/common/logo_white.png" alt="">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1"><a href="footShape.html">3D打印功能性定制鞋垫</a></el-menu-item>
          <el-menu-item index="2"><a href="https://www.gdlwzn.com/" target="_blank">在线打印</a></el-menu-item>
          <el-menu-item index="3"><a href="business.html" target="_blank">创业同行</a></el-menu-item>
        </el-menu>
      </div>
      <div class="cart-box">
        <el-link href="order.html#/cart">
          <img src="../assets/common/cart.png" class="cart-icon" alt="">
          <div>购物车</div>
        </el-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: ''
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style lang="less" scoped>
.header-container {
  position: relative;
  height: 90px;
  padding-left: 70px;
  background-color: #fff;
  .el-menu.el-menu--horizontal {
    border-bottom: 0;
    display: inline-block;
    font-size: 16px;
  }
  .el-menu--horizontal>.el-menu-item {
    color: #333;
  }
  .nav-wrap {
    padding-top: 10px;
  }
  .cart-box {
    position: absolute;
    top: 20px;
    right: 80px;
    font-size: 14px;
    color: #000;
    text-align: center;
    .cart-icon {
      width: 36px;
    }
  }
}
</style>

