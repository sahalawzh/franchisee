<template>
  <div v-loading="loading">
    <div>加盟服务</div>
    <el-divider></el-divider>
    
    <template v-if="detail">
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
            <el-button
              size="mini"
              type="danger"
              v-if="scope.row.isPayment === 0"
              @click="handleToPay(scope.row)">待支付</el-button>
            <div v-if="scope.row.isPayment === 1">已付款</div>
          </template>
        </el-table-column>
      </el-table>

      <div class="info-detail">
        <div class="info-detail__item">
          <div class="label-name">姓名</div>
          <div class="value-content">{{ detail.name }}</div>
        </div>
        <div class="info-detail__item">
          <div class="label-name">身份证</div>
          <div class="value-content">{{ detail.creditCard }}</div>
        </div>
        <div class="info-detail__item">
          <div class="label-name">电话</div>
          <div class="value-content">{{ detail.phone }}</div>
        </div>
        <div class="info-detail__item">
          <div class="label-name">地址</div>
          <div class="value-content">
            <div class="back-name">{{ detail.province }}{{ detail.city }}</div>
            <div>{{ detail.detailAddress }}</div>
          </div>
        </div>
        <div class="info-detail__item">
          <div class="label-name">银行卡</div>
          <div class="value-content">
            <div class="back-name">{{ detail.bankName }}
              <el-button type="primary" class="checkout-btn" v-if="detail.bindProcess === 0" size="mini" icon="el-icon-plus" @click="handleBindBank">绑定银行卡</el-button>
              <span class="status-text" v-else-if="detail.bindProcess === 1">审核中...</span>
              <el-button class="checkout-btn" v-else-if="detail.bindProcess === 2" type="primary" size="mini" @click="handleCheckoutAccount">银行账户验证</el-button>
              <span class="status-text" v-else-if="detail.bindProcess === 3">审核失败</span>
              <el-button type="text" v-else-if="detail.bindProcess === 4" @click="handleUnBind" class="bind-link">解除绑定</el-button>
              <span class="status-text" v-else-if="detail.bindProcess === 5">绑定失败次数过多 请联系客服</span>
            </div>
            <div>{{ detail.bankCard }}</div>
          </div>
        </div>
        <!-- <div class="info-detail__item" v-else>
          <div class="label-name">银行卡</div>
          <div class="value-content">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleBindBank">绑定银行卡</el-button>
          </div>
        </div> -->
      </div>
      

      <el-dialog title="银行账户验证" class="bank-dialog" :visible.sync="accountVisible">
        <el-form :model="amountForm" :rules="amountRules">
          <el-form-item prop="amount">
            <el-input v-model="amountForm.amount" placeholder="请输入打款金额"></el-input>
          </el-form-item>
          
          <el-button type="danger" :loading="btnCheckoutLoading" @click="handleCheckoutSubmit">提交</el-button>
        </el-form>
      </el-dialog>

      <el-dialog title="绑定银行卡" class="bank-dialog" :visible.sync="bankVisible">
        <el-form :model="form" label-width="100px" :hide-required-asterisk="true" :rules="rules">
          <el-form-item label="银行" prop="bankName">
            <el-input v-model="form.bankName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="卡号" prop="bankCard">
            <el-input v-model="form.bankCard" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="tip">我们将在3个工作日内向您的银行账号转账不足1元的款项用于验证银行账号，请及时查看</div>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" :loading="btnLoading" @click="handleSubmit">提 交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </template>

    <el-button type="primary" v-else @click="handleCreateFranchisee">创建加盟流程</el-button>

  </div>
</template>

<script>
import { getSearchFranchisee, getDownLoadFile, postBindBankCard, postCheckPriceBankCard, postUnBindBankCard  } from '@/service/http'
import { v1 } from '@/service/api'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入卡号'))
      } else {
        const reg = /^[1-9]\d{9,29}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的卡号'));
        }
      }
    }
    var validateAmount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入金额'))
      } else {
        const reg = /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0){1}$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的金额格式'));
        }
      }
    }
    return {
      loading: false,
      tableData: [],
      bankVisible: false,
      form: {
        bankName: '',
        bankCard: ''
      },
      rules: {
        bankName: [
          { required: true, message: '请输入银行', trigger: 'blur' }
        ],
        bankCard: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      btnLoading: false,
      detail: '',
      accountVisible: false,
      btnCheckoutLoading: false,
      amountForm: {
        amount: ''
      },
      amountRules: {
        amount: [
          { validator: validateAmount, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleUnBind () {
      this.$confirm('是否接触绑定该账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleUnBindAcount()
      }).catch(() => {        
      })
    },
    handleUnBindAcount () {
      postUnBindBankCard().then(res => {
        this.getFranchiseeServe()
      }).catch(err => {
      })
    },
    handleCreateFranchisee () {
      window.location.href = 'franchisees.html'
    },
    handleCheckoutSubmit () {
      const params = {
        price: this.amountForm.amount
      }
      this.btnCheckoutLoading = true
      postCheckPriceBankCard(params).then(res => {
        this.btnCheckoutLoading = false
        this.getFranchiseeServe()
      }).catch(err => {
        console.log(err)
        this.btnCheckoutLoading = false
      })
    },
    handleCheckoutAccount () {
      this.accountVisible = true
    },
    handleSubmit () {
      if (!this.detail) return
      const { id, phone } = this.detail
      const params = Object.assign({}, this.form, {franchiseeId: id, phone})
      this.btnLoading = true
      postBindBankCard(params).then(res => {
        this.btnLoading = false
        this.bankVisible = false
        if (res.data === 0) {
          this.$notify.error({
            title: '温馨提示',
            message: '绑定失败'
          })
        }
        if (res.data === 1) {
          this.getFranchiseeServe()
        }
      }).catch(err => {
        this.bankVisible = false
        this.btnLoading = false
        console.log(err)
      })
    },
    handleBindBank () {
      this.bankVisible = true
    },
    handleToPay () {
      window.location.href = 'franchisees.html#/payment'
    },
    handleDownFile (fileName) {
      window.open(`${process.env.VUE_APP_BASE_API}/${v1.GET_DOWN__LOAD_FILE}?fileName=${fileName}`)
    },
    getFranchiseeServe () {
      this.loading = true
      getSearchFranchisee().then(res => {
        this.detail = res.data
        if (res.data) {
          const { programName, createTime, price, agreement, isPayment, processType } = res.data
          if (processType === 0 || processType === 2) {
            window.location.href = 'franchisees.html#/editeInfo'
            return
          }
          this.tableData = [
            {
              programName,
              createTime,
              price,
              agreement,
              isPayment
            }
          ]
        } else {
          this.tableData = []
        }
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    }
  },
  created () {
    this.getFranchiseeServe()
  }
}
</script>

<style lang="less">
.info-detail {
  padding-left: 20px;
  margin-top: 80px;
  &__item {
    position: relative;
    margin-bottom: 40px;
    .label-name {
      position: absolute;
      left: 0;
      font-size: 16px;
      color: #787878;
    }
    .value-content {
      padding-left: 120px;
    }
    .back-name {
      margin-bottom: 10px;
    }
    .bind-link {
      padding-top: 0;
      margin-left: 6%;
    }
    .checkout-btn, .status-text {
      margin-left: 60px;
    }
    .password-btn {
      padding-top: 0;
      padding-bottom: 0;
    }
    .down-btn {
      margin-top: -15px;
    }
    .address-item {
      position: relative;
      padding-bottom: 16px;
      border-bottom: 1px solid #eee;
      &:not(:first-child) {
        margin-top: 20px;
      }
      &__name {
        font-size: 16px;
        color: #333;
        margin-bottom: 8px;
      }
      &__detail {
        font-size: 14px;
        color: #333;
      }
      &__action {
        position: absolute;
        bottom: 16px;
        right: 40px;
      }
    }
  }
}
.bank-dialog {
  .el-dialog {
    width: 48%;
  }
  .tip {
    line-height: 1.6em;
  }
  .el-input {
    width: 260px;
  }
}
</style>
