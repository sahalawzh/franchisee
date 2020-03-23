<template>
  <div class="success-container">
    <el-divider></el-divider>
    <img src="../../../assets/order/pay-success.png"
         class="pay-success"
         alt="">
    <div class="success-text">支付成功!</div>
    <el-link class="tab-item"
             href="backend.html">我的订单</el-link>
    <el-divider direction="vertical"></el-divider>
    <el-link class="tab-item"
             href="order.html">再次购买</el-link>
  </div>
</template>
<style lang="less" scoped>
.success-container {
  text-align: center;
  margin-bottom: 160px;
  .pay-success {
    margin-top: 20px;
    width: 120px;
    height: 120px;
  }
  .success-text {
    font-size: 20px;
    color: #333;
    margin-top: 20px;
    margin-bottom: 90px;
  }
  .tab-item {
    color: #0096d6;
  }
}
</style>
