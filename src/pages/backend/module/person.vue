<template>
  <div v-loading="loading">
    <div>个人资料</div>
    <el-divider></el-divider>
    <div class="info-detail">
      <div class="info-detail__item">
        <div class="label-name">当前头像</div>
        <div class="value-content">
          <el-avatar :size="50"
                     :src="message.avatar" />
        </div>
      </div>
      <div class="info-detail__item">
        <div class="label-name">姓名</div>
        <div class="value-content">{{ message.username }}</div>
      </div>
      <div class="info-detail__item">
        <div class="label-name">电话</div>
        <div class="value-content">{{ message.phone }}</div>
      </div>
      <!-- <div class="info-detail__item">
        <div class="label-name">银行卡</div>
        <div class="value-content">
          <div class="back-name">交通银行<el-button type="text" class="bind-link">点击下载</el-button></div>
          <div>1666665555</div>
        </div>
      </div> -->
      <div class="info-detail__item">
        <div class="label-name">修改密码</div>
        <div class="value-content">
          <el-button type="text"
                     @click="handleSetPassword"
                     class="password-btn">设置</el-button>
        </div>
      </div>
      <div class="info-detail__item">
        <div class="label-name">地址</div>
        <div class="value-content">
          <template v-if="addressList.length">
            <div class="address-item"
                 v-for="item in addressList"
                 :key="item.id">
              <div class="address-item__name">{{ item.recipient }}（收）<el-tag size="small"
                        v-if="item.isDefault === 0">默认</el-tag>
              </div>
              <div class="address-item__detail">{{ item.province }}&nbsp;{{ item.city }}&nbsp;{{ item.detailAddress }}&nbsp;&nbsp;&nbsp;&nbsp;{{ item.phone }}</div>
              <div class="address-item__action">
                <el-button type="text"
                           v-if="item.isDefault === 1"
                           :loading="addressDefaultLoading"
                           @click="handleSetDefault(item)">选为默认地址</el-button>
                <el-divider v-if="item.isDefault === 1"
                            direction="vertical"></el-divider>
                <el-button type="text"
                           @click="handleOpAdress(item)">修改</el-button>
                <el-divider direction="vertical"></el-divider>
                <!-- <el-popover placement="top"
                            width="160"
                            v-model="visible">
                  <p>是否确认删除该地址？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini"
                               type="text"
                               @click="visible = false">取消</el-button>
                    <el-button type="primary"
                               size="mini"
                               @click="handleDelAdress(item.id)">确定</el-button>
                  </div>
                  <el-button slot="reference"
                             type="text">删除</el-button>
                </el-popover> -->
                <el-button type="text"
                           @click="handleDelAdress(item.id)">删除</el-button>
              </div>
            </div>
          </template>
          <el-link class="el-icon-plus address-item-add"
                   type="primary"
                   v-if="addressList.length <= maxAddressLen"
                   @click="handleOpAdress">添加新地址</el-link>
        </div>
      </div>
      <!-- <div class="info-detail__item">
        <div class="label-name">加盟协议</div>
        <div class="value-content"><el-button type="text" class="down-btn">点击下载</el-button></div>
      </div> -->
    </div>

    <el-dialog title="密码设置"
               class="address-dialog"
               :visible.sync="passwordVisible">
      <el-form :model="passwordForm"
               label-width="100px"
               ref="passwordForm"
               :hide-required-asterisk="true"
               :rules="rulesPassword">
        <el-form-item label="当前密码"
                      prop="oldPassword">
          <el-input type="password" v-model="passwordForm.oldPassword"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码"
                      prop="password">
          <el-input type="password" v-model="passwordForm.password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码"
                      prop="confirmPassword">
          <el-input type="password" v-model="passwordForm.confirmPassword"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger"
                     :loading="passwordBtnLoading"
                     @click="handleSavePassword">保 存</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>

    <el-dialog title="收货地址"
               class="address-dialog"
               :visible.sync="dialogFormVisible">
      <el-form :model="addressForm"
               label-width="100px"
               ref="addressForm"
               :hide-required-asterisk="true"
               :rules="ruleAddress">
        <el-form-item label="收货人"
                      prop="recipient">
          <el-input v-model="addressForm.recipient"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话"
                      prop="phone">
          <el-input v-model="addressForm.phone"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在区域"
                      prop="city">
          <el-cascader v-model="addressForm.city"
                       :options="areaData"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址"
                      prop="detailAddress">
          <el-input class="control-address"
                    v-model="addressForm.detailAddress"></el-input>
        </el-form-item>
        <el-form-item>
          <el-switch v-model="addressForm.isDefault"
                     :active-value="0"
                     :inactive-value="1"
                     active-text="设置为默认收货地址">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     :loading="addressBtnLoading"
                     @click="handleSubmitAddress">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getMemberMessage, postUpdatePassword, getAddress, getListDstricts, postAddressAdd, deleteAddressDelete, putAddressUpdate } from '@/service/http'
import axios from 'axios'
import storage from "@/utils/storage"
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.passwordForm.confirmPassword !== '') {
          this.$refs.passwordForm.validateField('confirmPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwordForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
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
    var checkCity = (rule, value, callback) => {
      value = value.filter(Boolean)
      if (!value.length) {
        return callback(new Error('请选择所在区域'));
      }
      callback()
    }
    return {
      loading: false,
      message: '',
      dialogFormVisible: false,
      addressForm: {
        recipient: '',
        phone: '',
        city: [],
        detailAddress: '',
        isDefault: 1
      },
      areaData: [],
      passwordVisible: false,
      passwordForm: {
        oldPassword: '',
        password: '',
        confirmPassword: ''
      },
      passwordBtnLoading: false,
      rulesPassword: {
        oldPassword: [
          { required: true, message: '请输入当前密码', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      ruleAddress: {
        recipient: [
          { required: true, message: '请输入收货人', trigger: 'blur' },
          { min: 2, max: 9, message: '长度在 2 到 9 个字符', trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        city: [
          { validator: checkCity, trigger: 'change' }
        ],
        detailAddress: [
          { required: true, message: '请填写详细地址', trigger: 'blur' },
          { min: 2, max: 80, message: '长度在 2 到 80 个字符', trigger: 'blur' }
        ]
      },
      addressList: [],
      addressBtnLoading: false,
      visible: false,
      maxAddressLen: 5,
      addressDefaultLoading: false
    }
  },
  watch: {
  },
  methods: {
    handleSetDefault (item) {
      const args = Object.assign({}, item)
      args.isDefault = 0
      this.addressDefaultLoading = true
      putAddressUpdate(args).then(res => {
        console.log(res)
        this.$message({
          message: '默认地址设置成功',
          type: 'success'
        })
        this.addressDefaultLoading = false
        this.getAddressList()
      }).catch(err => {
        console.log(err)
        this.addressDefaultLoading = false
      })
    },
    handleDelAdress (id) {
      this.$confirm('是否确认删除该地址？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAddressDelete(id).then(res => {
          console.log(res)
          // this.visible = false
          this.getAddressList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(err => {
          console.log(err)
        })
      })
    },
    handleSubmitAddress () {
      this.$refs.addressForm.validate((valid) => {
        if (valid) {
          const [provinceId, cityId] = this.addressForm.city
          const area = {
            provinceId,
            cityId
          }
          const params = Object.assign({}, this.addressForm, area)
          delete params.city
          this.addressBtnLoading = true
          let API_URL = this.addressForm.id ? putAddressUpdate : postAddressAdd
          API_URL(params).then(res => {
            this.getAddressList()
            this.dialogFormVisible = false
            this.addressBtnLoading = false
          }).catch(err => {
            this.addressBtnLoading = false
            console.log(err)
          })
        }
      })
    },
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
    handleSavePassword () {
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          const params = Object.assign({}, this.passwordForm)
          this.passwordBtnLoading = true
          const that = this
          postUpdatePassword(params).then(res => {
            console.log(res)
            this.$notify({
              title: '更改成功',
              message: res.data,
              type: 'success',
              onClose () {
                that.passwordBtnLoading = false
                window.location.href = '/index.html'
                storage.remove("gdlwzn_login")
              }
            })
          }).catch(err => {
            console.log(err)
            this.passwordBtnLoading = false
          })
        }
      })
    },
    handleSetPassword () {
      this.passwordVisible = true
    },
    async handleOpAdress (item) {
      if (item) {
        const { recipient, phone, detailAddress, isDefault, provinceId, cityId, id } = item
        this.addressForm = {
          recipient,
          phone,
          detailAddress,
          city: [provinceId, cityId],
          id,
          isDefault
        }
      }
      await this.handleChangeDstricts()
      this.dialogFormVisible = true
    },
    getAddressList () {
      getAddress().then(res => {
        let result = res.data || []
        this.addressList = result
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.loading = true
    axios.all([getMemberMessage(), this.getAddressList()]).then(res => {
      const data = res[0].data
      this.message = data
      this.loading = false
    }).catch(err => {
      console.log(err)
      this.loading = false
    })
  }
}
</script>

<style lang="less" scope>
.info-detail {
  padding-left: 20px;
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
      &-add {
        margin: 20px 0;
      }
    }
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

