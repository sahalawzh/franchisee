<template>
  <div class="page-register" v-loading="loading">
    <Header></Header>

    <div class="register-wrap">
      <div class="register-box">
        <div class="register-box__header">
          <span>重置密码</span>
        </div>
        <el-form class="register-box__form" label-width="100px" :hide-required-asterisk="true" :model="form" ref="form" :rules="rules">
          <el-form-item label="手机号码" prop="phone">
            <div class="area-tel">
              <el-input class="tel-control" v-model="form.phone" autocomplete="off" placeholder="请输入11位手机号">
                <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="手机验证码" prop="code">
            <el-input v-model="form.code" autocomplete="off" placeholder="手机验证码">
              <el-button slot="append" :disabled="disabledBtn" @click="handleGetCode(form.phone)" class="code-btn">{{ codeBtnText }}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="设置密码" prop="password">
            <el-input v-model="form.password" autocomplete="off" placeholder="请输入密码">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" autocomplete="off" placeholder="请输入新密码">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          

          <div class="login-footer">
            <el-button class="login-btn" type="danger" @click="handleSubmit">确认</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header'
import { postCheckPhone, getForgetCode, updateForget } from '@/service/http'

export default {
  components: {
    Header
  },
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.confirmPassword !== '') {
          this.$refs.form.validateField('confirmPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {
        phone: '',
        code: '',
        password: '',
        confirmPassword: ''
      },
      disabledBtn: false,
      codeBtnText: '发送验证码',
      rules: {
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入手机验证码', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          const params = Object.assign({}, this.form)
          updateForget(params).then(res => {
            this.loading = false
            this.$notify({
              title: '更改成功',
              message: res.data,
              type: 'success',
              onClose () {
                window.location.href = '/index.html'
              }
            })

          }).cathch(err => {
            this.loading = false
            console.log(err)
          })
        }
      })
    },
    handleGetCode (phone) {
      this.$refs.form.validateField('phone', (errMsg) => {
        if (!errMsg && !this.disabledBtn) {
          this.disabledBtn = true
          let timer = null
          const separationTime = process.env.NODE_ENV === 'development' ? 100 : 1000
          let time = 60
          getForgetCode({ phone }).then(res => {
            this.$message({
              message: '消息已发送',
              type: 'success'
            })
            clearInterval(timer)
            timer = setInterval(() => {
              const currentTime = time--
              if (currentTime === 0) {
                clearInterval(timer)
                this.disabledBtn = false
                this.codeBtnText = `重新获取`
                return
              }
              this.codeBtnText = `${currentTime}s后获取`
            }, separationTime)
          }).catch(err => {
            console.log(err)
            clearInterval(timer)
            this.disabledBtn = false
            this.codeBtnText = `重新获取验证码`
          })
        }
      })
    },
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
    }
  }
}
</script>
<style lang="less" scoped>
.page-register {
  background-color: #F2F2F2;
  .register-wrap {
    height: calc(100vh - 90px);
    padding: 40px 0;
    box-sizing: border-box;
  }
  .register-box {
    width: 500px;
    margin: 0 auto;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 10px 0px rgba(10,2,5,0.05);
    &__header {
      position: relative;
      height: 60px;
      line-height: 60px;
      padding-left: 38px;
      font-size: 18px;
      color: #000;
      border-bottom: 1px solid #E0E0E0;
      .login-entrance {
        float: right;
        margin-right: 30px;
        font-size: 16px;
        color: #333;
        a {
          color: #124FAE;
        }
      }
    }
    &__form {
      padding: 20px 80px 30px 30px;
      .area-tel {
        display: flex;
        align-items: center;
        .area-box {
          height: 40px;
          line-height: 40px;
          width: 110px;
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
      .code-btn {
        background-color: #4571EA;
        border: 1px solid #4571EA;
        color: #fff;
        border-radius: 0;
      }
      .login-footer {
        padding-left: 100px;
        .login-btn {
          width: 100%;
          margin-top: 6px;
          height: 50px;
        }
        .tips {
          font-size: 14px;
          color: #333;
          margin-top: 8px;
        }
      }
    }
  }
}
</style>
