<template>
  <div class="pay-container" v-loading="loading">
    <el-divider></el-divider>
    <div class="pay-label">支付方式</div>
    <div class="pay-way">
      <el-radio v-model="payType" @change="handleChangeWay" label="weixin" border>微信支付</el-radio>
      <el-radio v-model="payType" @change="handleChangeWay" label="zhifubao" border disabled>支付宝支付</el-radio>
    </div>
    <el-row class="submit-btn">
      <el-popover
        placement="top"
        :title="payType === 'weixin' ? '微信支付' : '支付宝支付'"
        trigger="manual"
        v-model="visible">
        <div id="qrcode"></div> <!-- 创建一个div，并设置id为qrcode -->
        <el-button slot="reference" type="danger" :loading="btnLoading" @click="handleToPay" :disabled="nocanPay">总价：￥ {{ countPrice }}，立即支付</el-button>
      </el-popover>
    </el-row>
    
  </div>
</template>
<script>
import { getOrderPrice, postWxPay, postCheckPay  } from '@/service/http'
import QRCode from 'qrcodejs2'
export default {
  data () {
    return {
      payType: 'weixin',
      countPrice: '0.00',
      loading: false,
      orderNo: '',
      btnLoading: false,
      timer: null,
      visible: false,
      nocanPay: true,
      orderType: 0
    }
  },
  methods: {
    handleChangeWay (val) {
      this.payType = val
    },
    updateOrderStatus () {
      const { orderNo } = this
      postCheckPay({ orderNo }).then(res => {
        if (res.data === 1) { // 已支付
          clearInterval(this.timer)
          this.$router.push({name: 'success'})
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleToPay () {
      if (this.visible) {
        this.visible = false
        clearInterval(this.timer)
        return
      }
      this.btnLoading = true
      const { orderNo, orderType } = this
      const params = {
        orderNo,
        orderType
      }
      postWxPay(params).then(res => {
        this.btnLoading = false
        var code_url = res.data.code_url
        let qrcodeEl = document.getElementById('qrcode')
        qrcodeEl.innerHTML = ''
        let qrcode = new QRCode(qrcodeEl, {
          render: 'canvas',
          width: 160,  
          height: 160,
          text: code_url, // 二维码地址
          colorDark : "#000",
          colorLight : "#fff"
        })
        this.visible = true
        this.timer = setInterval(() => {
          this.updateOrderStatus()
        }, 2000)
      }).catch(err => {
        this.btnLoading = false
      })
    },
    getOrderAmount () {
      this.loading = true
      const { orderNo } = this
      this.nocanPay = true
      getOrderPrice({ orderNo }).then(res => {
        this.countPrice = res.data
        this.loading = false
        this.nocanPay = false
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    }
  },
  created () {
    const { orderNo, orderType } = this.$route.query
    this.orderNo = orderNo
    this.orderType = orderType
    this.getOrderAmount()
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

