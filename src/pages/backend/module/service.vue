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
            <div class="back-name">{{ detail.province }}{{ detail.city }}<el-button type="text" @click="handleOpenAddress" class="bind-link">修改</el-button></div>
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
        <el-form :model="amountForm" ref="amountForm" :rules="amountRules">
          <el-form-item prop="amount">
            <el-input v-model="amountForm.amount" placeholder="请输入打款金额"></el-input>
          </el-form-item>
          
          <el-button type="danger" :loading="btnCheckoutLoading" @click="handleCheckoutSubmit">提交</el-button>
        </el-form>
      </el-dialog>

      <el-dialog title="绑定银行卡" class="bank-dialog" :visible.sync="bankVisible">
        <el-form :model="form" ref="form" label-width="100px" :hide-required-asterisk="true" :rules="rules">
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

      <el-dialog title="修改地址" class="address-dialog" :visible.sync="dialogFormVisible">
        <el-form :model="addressForm" label-width="100px" ref="addressForm" :hide-required-asterisk="true" :rules="ruleAddress">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="addressForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所在区域" prop="city">
            <el-cascader
              v-model="addressForm.city"
              :options="areaData"></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="detailAddress">
            <el-input class="control-address" v-model="addressForm.detailAddress"></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <el-switch
              v-model="addressForm.default"
              active-text="设置为默认收货地址">
            </el-switch>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" :loading="addressBtnLoading" @click="handleSubmitAddress">保 存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </template>

    <el-button type="primary" v-else @click="handleCreateFranchisee">创建加盟流程</el-button>

  </div>
</template>

<script>
import { getSearchFranchisee, getDownLoadFile, postBindBankCard, postCheckPriceBankCard, postUnBindBankCard, putUpdate, getListDstricts } from '@/service/http'
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
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'));
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
      },
      dialogFormVisible: false,
      addressForm: {
        recipient: '',
        phone: '',
        city: [],
        detailAddress: ''
      },
      ruleAddress: {
        phone: [
          {validator: checkPhone, trigger: 'blur'}
        ],
        city: [
          { required: true, message: '请选择所在区域', trigger: 'change' }
        ],
        detailAddress: [
          { required: true, message: '请填写详细地址', trigger: 'blur' },
          { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' }
        ]
      },
      addressBtnLoading: false,
      areaData: []
    }
  },
  methods: {
    handleChangeDstricts () {
      getListDstricts().then(res => {
        res.data.forEach(item => {
          item.value = item.id
          item.label = item.name
          item.children = []
          item.list.forEach(_item => {
            item.children.push({
              value: _item.id,
              label: _item.name
            })
          })
        })
        this.areaData = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleOpenAddress () {
      const { phone, detailAddress, provinceId, cityId, id } = this.detail
      this.addressForm = {
        phone,
        detailAddress,
        city: [provinceId, cityId],
        id
      }
      this.handleChangeDstricts()
      this.$nextTick(() => {
        this.dialogFormVisible = true
      })
    },
    handleSubmitAddress () {
      this.$refs.addressForm.validate((valid) => {
        if (!valid) return
        const [ provinceId, cityId ] = this.addressForm.city
        const area = {
          provinceId,
          cityId
        }
        const params = Object.assign({}, this.addressForm, area)
        delete params.city
        this.addressBtnLoading = true
        putUpdate(params).then(res => {
          this.addressBtnLoading = false
          this.dialogFormVisible = false
          this.getFranchiseeServe()
        }).catch(err => {
          this.addressBtnLoading = false
          console.log(err)
        })
      })
    },
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
      this.$refs.amountForm.validate((valid) => {
        if (!valid) return
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
      })
    },
    handleCheckoutAccount () {
      this.accountVisible = true
    },
    handleSubmit () {
      if (!this.detail) return
      this.$refs.form.validate((valid) => {
        if (!valid) return
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
.address-dialog {
  .el-dialog {
    width: 40%;
  }
  .el-cascader,
  .el-input {
    width: 240px;
  }
  .control-address {
    width: 90%;
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>
