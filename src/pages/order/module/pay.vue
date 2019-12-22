<template>
  <div class="pay-container">
    <el-divider></el-divider>
    <div class="pay-label">支付方式</div>
    <div class="pay-way">
      <el-radio v-model="radio1" label="1" border>支付宝支付</el-radio>
      <el-radio v-model="radio1" label="2" border>微信支付</el-radio>
    </div>
    <el-row class="submit-btn">
      <el-button type="danger">总价：￥ 34545656.00，立即支付</el-button>
    </el-row>
  </div>
</template>
<style lang="less" scoped>
.pay-container {
  margin-bottom: 140px;
  .pay-label {
    margin-bottom: 20px;
  }
  .pay-way {
    margin-bottom: 60px;
  }
  .submit-btn {
    text-align: center;
    button {
      padding: 10px 80px;
    }
  }
}
</style>

