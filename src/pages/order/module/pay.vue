<template>
  <div class="pay-container"
       v-loading="loading">
    <el-divider></el-divider>
    <div class="pay-label">选择支付方式</div>
    <el-row class="pay-way">
      <el-col :md="4" :sm="6" class="pay-col">
        <el-radio v-model="payType"
                  @change="handleChangeWay"
                  class="pay-item"
                  label="alipay">
          <img src="../../../assets/common/alipay_icon.png" class="pay-icon">
          <span>支付宝支付</span>
        </el-radio>
      </el-col>
      <el-col :md="12" :sm="12" class="pay-col">
        <el-radio v-model="payType"
                  @change="handleChangeWay"
                  class="pay-item"
                  label="alipayhuabei">
          <img src="../../../assets/common/alipay_icon.png" class="pay-icon">
          支付宝花呗支付
        </el-radio>
        <div class="huabei-item">
          <div class="huabei-item__label">花呗分期</div>
          <el-row class="huabei-item__content">
            <el-col 
              :md="8"
              :sm="12"
              v-for="(item, index) in hbList"
              :key="index"
              >
              <div class="huabei-li" :class="{'active': hbIndex === index}" @click="handleChangeHuaBei(index)">
                <div>￥{{ item.eachPay }}x{{ item.hbFqNum }}期</div>
                <div>(含手续费￥{{ item.totalFee }})</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="huabei-tip">注：花呗支付金额仅供参考，实际支付金额以支付宝为准</div>
      </el-col>
      <el-col :md="8" :sm="6" class="pay-col">
        <el-radio v-model="payType"
                  @change="handleChangeWay"
                  class="pay-item"
                  label="wechat">
          <img src="../../../assets/common/wechat_icon.png" class="pay-icon">
          微信支付
        </el-radio>
      </el-col>
    </el-row>
    <el-row class="submit-btn">
      <!-- <el-popover placement="left"
                  :title="payTitle"
                  trigger="manual"
                  v-model="visible">
        <div id="qrcode"></div> 
      </el-popover> -->
      <el-button type="danger"
                  :loading="btnLoading"
                  @click="handleToPay"
                  :disabled="nocanPay">总价：￥ {{ countPrice }}，立即支付</el-button>
    </el-row>

    <el-dialog
      :title="payTitle"
      width="30%"
      :visible.sync="dialogVisible"
      class="pay-dialog"
      center
      :close-on-click-modal='false'>
      <div id="qrcode"></div>
      <div>{{ loadingAliPay }}</div>
      <div class="alipay-qrcode" v-html="alipayForm"></div>
    </el-dialog>

  </div>
</template>
<script>
import { getOrderPrice, postWxPay, postCheckPay, getAlipayListHb, postAliPayPay } from '@/service/http'
import QRCode from 'qrcodejs2'
const payTag = {
  alipay: '支付宝支付',
  alipayhuabei: '支付宝花呗支付',
  wechat: '微信支付'
}
export default {
  data () {
    return {
      payType: 'alipay',
      countPrice: '0.00',
      loading: false,
      orderNo: '',
      btnLoading: false,
      timer: null,
      visible: false,
      nocanPay: true,
      orderType: 0,
      hbList: [],
      hbIndex: -1,
      dialogVisible: false,
      alipayForm: '',
      loadingAliPay: ''
    }
  },
  computed: {
    payTitle () {
      return payTag[this.payType]
    }
  },
  watch: {
    payType (val) {
      if (val !== 'alipayhuabei') {
        this.hbIndex = -1
      }
    }
  },
  methods: {
    handleChangeHuaBei (index) {
      this.payType = 'alipayhuabei'
      if (this.hbIndex === index) {
        this.hbIndex = -1
      } else {
        this.hbIndex = index
      }
    },
    getHuaBeiInfo () {
      const opts = {
        orderNo: this.orderNo
      }
      getAlipayListHb(opts).then(res => {
        this.hbList = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleChangeWay (val) {
      this.payType = val
    },
    updateOrderStatus () {
      const { orderNo } = this
      postCheckPay({ orderNo }).then(res => {
        if (res.data === 1) { // 已支付
          clearInterval(this.timer)
          this.$router.push({ name: 'success' })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleToPay () {
      // if (this.visible) {
      //   this.visible = false
      //   clearInterval(this.timer)
      //   return
      // }
      this.btnLoading = true
      const { orderNo } = this
      let params = {
        orderNo
      }
      if (this.hbIndex === -1 && this.payType === 'alipayhuabei') {
        return this.$message({
          message: '您还未选择花呗分期',
          type: 'warning'
        })
      }
      this.dialogVisible = true
      if (this.payType === 'wechat') {
        this.handlePayWechat(params)
      } else {
        this.handlePayAliPay(params)
      }
    },
    handlePayAliPay (params) {
      const { hbIndex, hbList, payType } = this
      if (payType === 'alipay') { // 支付宝支付
        params.Huabei = {}
      } else { // 花呗
        const { hbFqNum, hbFqSellerPercent } = hbList[hbIndex]
        params.Huabei = {
          hbFqNum,
          hbFqSellerPercent
        }
      }
      postAliPayPay(params).then(res => {
        this.btnLoading = false
        console.log(res)
        this.alipayForm = res.data
        this.loadingAliPay = '支付宝支付加载中...'
        setTimeout(() => {
          document.forms[0].submit()
          this.loadingAliPay = '正在跳转'
        }, 800)
      }).catch(err => {
        console.log(err)
        this.btnLoading = false
      })
    },
    handlePayWechat (params) {
      const { orderType } = this
      params.orderType = orderType
      postWxPay(params).then(res => {
        this.btnLoading = false
        var code_url = res.data.code_url
        let qrcodeEl = document.getElementById('qrcode')
        qrcodeEl.innerHTML = ''
        let qrcode = new QRCode(qrcodeEl, {
          render: 'canvas',
          width: 200,
          height: 200,
          text: code_url, // 二维码地址
          colorDark: "#000",
          colorLight: "#fff"
        })
        this.timer = setInterval(() => {
          this.updateOrderStatus()
        }, 2000)
      }).catch(err => {
        console.log(err)
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
    Promise.all([this.getOrderAmount(), this.getHuaBeiInfo()]).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
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
    text-align: right;
    button {
      padding: 10px 80px;
    }
  }
  .pay-col:nth-child(2) {
    border-left: 1px solid #ECECEC;
    border-right: 1px solid #ECECEC;
    padding-left: 40px;
  }
  .pay-col:nth-child(3) {
    padding-left: 40px;
  }
  .pay-item {
    display: flex;
    align-items: center;
    .pay-icon {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    /deep/ .el-radio__label {
      padding-left: 30px;
      display: flex;
      align-items: center;
    }
  }
  .huabei-item {
    display: flex;
    margin-top: 30px;
    &__label {
      font-size: 14px;
      color: #333;
      margin-right: 14px;
    }
    &__content {
      display: flex;
      font-size: 14px;
      color: #333;
      .huabei-li {
        margin: 0 10px 14px 0;
        border: 1px solid #ccc;
        height: 55px;
        padding: 7px 7px 9px 5px;
        box-sizing: border-box;
        line-height: 20px;
        letter-spacing: 1.5px;
        text-align: center;
        cursor: pointer;
        &.active {
          border: 1px solid #409EFF;
        }
      }
    }
  }
  .huabei-tip {
    margin-top: 10px;
    color: #999;
  }
  .pay-dialog {
    text-align: center;
    /deep/ .el-dialog__body {
      padding-top: 15px;
      img {
        margin: 0 auto 10px;
      }
    }
    .alipay-qrcode {
      width: 140px;
      height: 140px;
    }
  }
}
</style>

