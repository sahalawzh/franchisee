<template>
  <el-container class="page-franchisees">
    <default-header></default-header>
    <el-main class="main-franchisees">
      <el-row>
        <div class="word-tip">轻松三步，成为加盟商</div>
        <el-steps class="step-wrap" :active="stepActive" align-center>
          <el-step description="填写加盟商信息"></el-step>
          <!-- <el-step description="阅读加盟协议"></el-step> -->
          <el-step description="缴纳加盟费用"></el-step>
          <el-step description="完善加盟商资料"></el-step>
        </el-steps>
      </el-row>
      <div class="franchisees-content">
        <router-view />
      </div>
    </el-main>

    <div class="advertise-box">
      <div class="advertise-title">
        <span>兰湾足行<span class="en">TM</span></span
        ><span>带你创业</span><span>带你赢</span>
      </div>
      <div class="advertise-content">
        <ul>
          <li>定制</li>
          <li>舒适</li>
          <li>矫形</li>
        </ul>
      </div>
    </div>
    <default-footer></default-footer>
  </el-container>
</template>
<script>
import DefaultHeader from "../../components/defaultHeader";
import DefaultFooter from "../../components/defaultFooter";
export default {
  components: {
    DefaultHeader,
    DefaultFooter
  },
  computed: {
    stepActive() {
      let path = this.$route.path;
      let query = this.$route.query;
      if (query.status) {
        path = path + "_" + query.status;
      }
      switch (path) {
        case "/":
          return 1;
        case "/payment":
          return 2;
        case "/payment_success":
          return 3;
      }
    }
  }
};
</script>
<style lang="less">
.page-franchisees {
  flex-direction: column !important;
  background-color: #f2f2f2;
  .main-franchisees {
    padding: 0 60px 90px;
    .word-tip {
      font-size: 32px;
      color: #999;
      text-align: center;
      margin: 30px 0;
    }
    .step-wrap {
      padding: 10px 60px 40px;
      .el-step__description {
        margin-top: 6px;
      }
    }
    .franchisees-content {
      min-height: 380px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 5px 38px 0px rgba(10, 2, 5, 0.17);
      padding: 60px 100px 100px;
    }
  }
  .advertise-box {
    position: relative;
    width: 100%;
    padding: 140px 0;
    box-sizing: border-box;
    color: #fff;
    text-align: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-image: url("../../assets/shape/advertise.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    .advertise-title {
      font-size: 38px;
      & > span:not(:last-child) {
        margin-right: 32px;
      }
      .en {
        font-size: 32px;
        vertical-align: text-top;
        font-weight: 600;
      }
    }
    .advertise-content {
      font-size: 30px;
      margin-top: 20px;
      li {
        position: relative;
        display: inline-block;
        padding: 0 20px;
        &:not(:last-child)::after {
          content: "";
          position: absolute;
          right: -4px;
          top: 0;
          bottom: 0;
          width: 2px;
          height: 100%;
          transform: scaleY(0.5);
          background-color: #fff;
        }
      }
    }
  }
}
</style>
