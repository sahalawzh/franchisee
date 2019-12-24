<template>
  <div class="pay-container">
    <div class="amount-box">应付金额：<span class="amount-box__num">￥9800.00</span></div>
    <el-divider></el-divider>
    <div class="pay-label">支付方式</div>
    <div class="pay-way">
      <el-radio v-model="radio1" label="1" border>支付宝支付</el-radio>
      <el-radio v-model="radio1" label="2" border>微信支付</el-radio>
    </div>
    <el-row class="submit-btn">
      <el-button type="danger" @click="handleToPay">总价：￥ 34545656.00，立即支付</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleToPay () {
      this.$router.push({path: '/editeInfo'})
    }
  }
}
</script>

<style lang="less" scoped>
.pay-container {
  margin-bottom: 140px;
  .amount-box {
    text-align: right;
    &__num {
      color: #F34234;
    }
  }
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

