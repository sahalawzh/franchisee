<template>
  <div class="page-register">
    <Header></Header>

    <div class="register-wrap">
      <div class="register-box">
        <div class="register-box__header">
          <span>注册账号</span>
          <span class="login-entrance">已有账号，<a href="index.html">立即登录</a></span>
        </div>
        <el-form class="register-box__form" label-width="100px" ref="form" :rules="rules" :model="form">
          <el-form-item label="手机号码" prop="phone">
            <div class="area-tel">
              <span class="area-box">中国 0086∨</span>
              <el-input class="tel-control" v-model="form.phone" autocomplete="off" placeholder="请输入常用手机号">
                <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="设置密码" prop="password">
            <el-input v-model="form.password" autocomplete="off" placeholder="密码">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="imageCode">
            <el-input v-model="form.imageCode" autocomplete="off" placeholder="验证码">
              <span slot="suffix" class="random-code" @click="handleRandomCode()">
                <img :src="randomCodeSrc" alt="">
              </span>
            </el-input>
          </el-form-item>
          <el-form-item label="手机验证码" prop="code">
            <el-input v-model="form.code" autocomplete="off" placeholder="手机验证码">
              <el-button slot="append" :disabled="disabledBtn" @click="handleGetCode(form.phone)" class="code-btn">{{ codeBtnText }}</el-button>
            </el-input>
          </el-form-item>

          <div class="login-footer">
            <el-button class="login-btn" @click="handleRegisterSubmit" type="danger">立即注册</el-button>
            <p class="tips">点击“立即注册”,即表示您同意并愿意遵守《兰湾在线定制系统协议》</p>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header'
import storage from '@/utils/storage'
import commonMixins from '@/mixins/common'
import { getRegisterCode, postCheckPhone, postRegister } from '@/service/http'
export default {
  components: {
    Header
  },
  mixins: [ commonMixins ],
  data () {
    var checkPhone = (rule, value, callback) => {
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
        phone: '1397235106',
        username: '',
        password: '',
        code: '',
        imageCode: '',
        checkCode: ''
      },
      rules: {
        phone: [
          {validator: checkPhone, trigger: 'blur'}
        ],
        username: [
          { required: true, message: '请填写用户名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入手机验证码', trigger: 'blur' },
        ],
        imageCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    handleRegisterSubmit () {
      this.$refs.form.validate(vaild => {
        if (vaild) {
          const param = Object.assign({}, this.form)
          postRegister(param).then(res => {
            storage.get('gdlwzn_login', res.data)
            this.$nextTick(() => {
              window.location.href = 'index.html'
            })
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    handleHasPhone (callback) {
      let phone = this.form.phone
      postCheckPhone({ phone }).then(res => {
        if (res.data === 1) {
          return callback(new Error('该号码已经注册过'))
        } else {
          return callback()
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
    box-sizing: border-box;
    .random-code {
      cursor: pointer;
      img {
        width: 100px;
        padding: 5px 0;
      }
    }
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
