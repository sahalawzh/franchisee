<template>
  <div class="pay-container" v-loading="loading">
    <!-- <div class="amount-box">应付金额：<span class="amount-box__num">￥9800.00</span></div>
    <el-divider></el-divider> -->

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="programName"
        label="购买项目">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="订单生成时间">
      </el-table-column>
      <el-table-column
        prop="price"
        label="金额（元）">
      </el-table-column>
      <el-table-column
        label="下载合同">
        <template slot-scope="scope">
          <el-button plain @click="handleDownFile(scope.row.agreement)">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="付款">
        <template slot-scope="scope">
          <div class="pay-price">￥{{ scope.row.price }}</div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pay-label">请选择支付方式</div>
    <div class="pay-way">
      <el-radio v-model="payType" label="zhifubao" border disabled>支付宝支付</el-radio>
      <el-radio v-model="payType" label="weixin" border>微信支付</el-radio>
    </div>
    <el-row class="submit-btn">
      <el-popover
        placement="top"
        :title="payType === 'weixin' ? '微信支付' : '支付宝支付'"
        trigger="manual"
        v-model="visible">
        <div id="qrcode"></div> <!-- 创建一个div，并设置id为qrcode -->
        <el-button slot="reference" type="danger" :loading="btnLoading" @click="handleToPay">总价：￥ {{countPrice}}，立即支付</el-button>
      </el-popover>
    </el-row>


    <el-dialog class="success-dialog" :show-close="false" :visible.sync="successVisible">
      <div class="success-wrap">
        <div class="success-wrap__header"></div>
        <img src="../../../assets/franchisees/success.png" class="success-wrap__icon">
        <div class="success-wrap__content">
          <div class="status">支付成功！</div>
          <div class="tip">欢迎加入兰湾足行！</div>
          <el-button class="btn" type="primary" @click="handleToServer">完善加盟商资料</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSearchFranchisee, postFranchiseePay, getFranchiseeCheckPay } from '@/service/http'
import { v1 } from '@/service/api'
import QRCode from 'qrcodejs2'
export default {
  data () {
    return {
      payType: 'weixin',
      loading: false,
      tableData: [],
      visible: false,
      timer: null,
      btnLoading: false,
      successVisible: false
    }
  },
  computed: {
    countPrice () {
      return this.tableData.length && this.tableData[0].price || '0.00'
    }
  },
  methods: {
    handleToServer () {
      window.location.href = 'backend.html#/service'
    },
    updateOrderStatus () {
      getFranchiseeCheckPay().then(res => {
        if (res.data === 1) { // 已支付
          clearInterval(this.timer)
          this.successVisible = true
          this.$router.push({name: 'payment', query: { status: 'success'}})
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
      postFranchiseePay().then(res => {
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
    handleDownFile (fileName) {
      window.open(`${v1.GET_DOWN__LOAD_FILE}?fileName=${fileName}`)
    }
  },
  created () {
    this.loading = true
    getSearchFranchisee().then(res => {
      this.tableData = res.data ? [res.data] : []
      this.loading = false
    }).catch(err => {
      this.loading = false
      console.log(err)
    })
  }
}
</script>

<style lang="less">
.pay-container {
  margin-bottom: 140px;
  .amount-box {
    text-align: right;
    &__num {
      color: #F34234;
    }
  }
  .pay-label {
    margin-top: 80px;
    margin-bottom: 20px;
  }
  .pay-way {
    margin-bottom: 60px;
  }
  .pay-price {
    color: #F34234;
  }
  .submit-btn {
    text-align: center;
    button {
      padding: 10px 80px;
    }
  }
  .el-dialog {
    background-color: transparent;
    overflow: hidden;
    border-radius: 6px;
  }
  .success-dialog {
    .el-dialog__header, .el-dialog__body {
      padding: 0;
    }
    .success-wrap {
      position: relative;
      height: 549px;
      &__icon {
        position: absolute;
        top: 20px;
        left: calc((100% - 255px) / 2);
        width: 255px;
        height: 290px;
      }
      &__header {
        height: 225px;
        background:linear-gradient(0deg,rgba(111,142,251,1),rgba(58,223,242,1));
      }
      &__content {
        background-color: #fff;
        text-align: center;
        display: inline-block;
        width: 100%;
        height: 100%;
        .status {
          margin-top: 84px;
          color: #3F3F3F;
          font-size: 30px;
        }
        .tip {
          margin-top: 24px;
          color: #3F3F3F;
          font-size: 16px;
        }
        .btn {
          margin-top: 60px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>

