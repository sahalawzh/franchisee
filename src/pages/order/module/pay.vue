<template>
  <div class="pay-container" v-loading="loading">
    <el-divider></el-divider>
    <div class="pay-label">支付方式</div>
    <div class="pay-way">
      <el-radio v-model="payType" label="1" border>支付宝支付</el-radio>
      <el-radio v-model="payType" label="2" border>微信支付</el-radio>
    </div>
    <el-row class="submit-btn">
      <el-button type="danger" :disabled="!ids">总价：￥ {{ countPrice }}，立即支付</el-button>
    </el-row>
  </div>
</template>
<script>
import { getCartPrice } from '@/service/http'
export default {
  data () {
    return {
      payType: 'weixin',
      ids: '',
      countPrice: '0.00',
      loading: false
    }
  },
  methods: {
    handleCartPrice () {
      const param = {
        ids: this.ids
      }
      this.loading = true
      getCartPrice(param).then(res => {
        this.countPrice = res.data
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    }
  },
  created () {
    this.ids = this.$route.query.ids
    this.handleCartPrice()
  }
}
</script>

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

