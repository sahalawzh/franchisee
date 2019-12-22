<template>
  <div class="page-register">
    <Header></Header>

    <div class="register-wrap">
      <div class="register-box">
        <div class="register-box__header">
          <span>重置密码</span>
        </div>
        <el-form class="register-box__form" label-width="100px" :model="form">
          <el-form-item label="手机号码">
            <div class="area-tel">
              <el-input class="tel-control" v-model="form.name" autocomplete="off" placeholder="请输入11位手机号">
                <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="手机验证码">
            <el-input v-model="form.name" autocomplete="off" placeholder="手机验证码">
              <el-button slot="append" class="code-btn">发送验证码</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="设置密码">
            <el-input v-model="form.name" autocomplete="off" placeholder="请输入新密码">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="form.name" autocomplete="off" placeholder="请输入新密码">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </el-form-item>
          

          <div class="login-footer">
            <el-button class="login-btn" type="danger">确认</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/header'
export default {
  components: {
    Header
  },
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
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
