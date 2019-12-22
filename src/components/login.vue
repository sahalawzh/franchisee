<template>
  <el-dialog
    :show-close="false"
    :visible.sync="dialogVisible"
    width="390px">
    <div slot="title" class="header-title">
      <div class="login-way" :class="{'tabActive': loginType === 'mobile'}" @click="handleTab('mobile')">手机快速登录</div>
      <div class="login-way" :class="{'tabActive': loginType === 'account'}" @click="handleTab('account')">账号密码登录</div>
    </div>
    <el-form class="form-container" :model="form" ref="form" :rules="rules">
      <template v-if="loginType === 'mobile'">
        <el-form-item prop="phone">
          <div class="area-tel">
            <span class="area-box">中国 0086∨</span>
            <el-input class="tel-control" v-model="form.phone" autocomplete="off" placeholder="请输入常用手机号">
              <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item prop="imageCode">
          <el-input v-model="form.imageCode" autocomplete="off" placeholder="验证码">
            <span slot="suffix" class="random-code" @click="handleRandomCode">
              <img :src="randomCodeSrc" alt="">
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="form.code" autocomplete="off" placeholder="手机验证码">
            <el-button slot="append" :disabled="disabledBtn" @click="handleGetCode(form.phone)" class="code-btn">{{ codeBtnText }}</el-button>
          </el-input>
        </el-form-item>
      </template>
      <template v-if="loginType === 'account'">
        <el-form-item prop="username">
          <el-input v-model="form.username" type="text" placeholder="请输入用户名">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="form.password" type="password" placeholder="请输入密码">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
      </template>
      <div class="login-footer">
        <el-button class="login-btn" type="danger" @click="handleToLogin">登 录</el-button>
        <p class="tips" v-if="loginType === 'mobile'">验证即登录，未注册将自动创建无限三维账号</p>
        <div v-if="loginType === 'account'" class="pass-link">
          <el-link :underline="false" class="pass-register" href="/register.html">立即注册</el-link>
          <el-link :underline="false" href="/forgetPassword.html">忘记密码？</el-link>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>
<script>
import { postMemberLogin, postPhoneLogin, postCheckPhone  } from '@/service/http'
import storage from '@/utils/storage'
import auth from '@/utils/auth'
import commonMixins from '@/mixins/common'
export default {
  mixins: [ commonMixins ],
  data () {
    var checkPhone = (rule, value, callback) => {
      value = this.form.phone
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          this.handleHasPhone(callback)
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    }
    return {
      form: {
        username: process.env.NODE_ENV === 'development' ? 'fe无限三维' : '',
        password: process.env.NODE_ENV === 'development' ? '123456' : '',
        phone: '',
        checkCode: '',
        code: '',
        imageCode: '',
        checkCode: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入手机验证码', trigger: 'blur' }
        ],
        imageCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      },
      loginType: 'mobile',
      dialogVisible: false
    }
  },
  props: {
    value: [Boolean, String]
  },
  watch: {
    value (val) {
      this.dialogVisible = val
    },
    dialogVisible (val) {
      this.$emit('input', val)
    }
  },
  created () {
    this.dialogVisible = this.value
  },
  methods: {
    handleHasPhone (callback) {
      let phone = this.form.phone
      postCheckPhone({ phone }).then(res => {
        if (res.data === 1) {
          return callback()
        } else {
          return callback(new Error('该号码还未注册，请先注册'))
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleTab (type) {
      this.$refs['form'].clearValidate()
      this.loginType = type
    },
    handleToLogin () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { username, password, phone, code, imageCode, checkCode } = this.form
          let params
          if (this.loginType === 'account') {
            params = {
              username,
              password
            }
          } else {
            params = {
              phone,
              code,
              imageCode,
              checkCode
            }
          }
          let API = this.loginType === 'account' ? postMemberLogin : postPhoneLogin 
          API(params).then(res => {
            storage.set('gdlwzn_login', res.data)
            this.$emit('login-status', {
              loginStatus: true,
              loginVisible: false
            })
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.header-title {
  display: flex;
  font-size: 18px;
  .login-way {
    flex: 1;
    text-align: center;
    cursor: pointer;
    &:first-child {
      border-right: 1px solid #D2D2D2;
    }
    &.tabActive {
      color: #124FAE;
    }
  }
}
.area-tel {
  display: flex;
  align-items: center;
  .area-box {
    height: 40px;
    line-height: 40px;
    width: 120px;
    border: 1px solid #DCDFE6;
    text-align: center;
    padding: 0 14px;
    box-sizing: border-box;
    margin-right: 10px;
    display: inline-block;
  }
  .tel-control {
    flex: 1;
  }
}
.form-container {
  padding: 0 15px;
  margin-top: -10px;
  .code-btn {
    background-color: #4571EA;
    border: 1px solid #4571EA;
    color: #fff;
    border-radius: 0;
  }
  .random-code {
    cursor: pointer;
    img {
      width: 100px;
      padding: 5px 0;
    }
  }
  .login-footer {
    .login-btn {
      width: 100%;
      margin-top: 6px;
      height: 50px;
    }
    .tips {
      font-size: 14px;
      color: #999;
      margin: 10px 0;
    }
    .pass-link {
      margin-top: 10%;
      text-align: center;
    }
    .pass-register {
      position: relative;
      padding-right: 20px;
      margin-right: 20px;
      border-right: 1px solid #ccc;
    }
  }
}
</style>