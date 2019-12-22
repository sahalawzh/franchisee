<template>
  <el-footer height="352px">
    <div class="container">
      <div class="footer-main">
        <h4>蓝湾在线定制</h4>
        <div class="footer-main-en">LANWAN Online</div>
        <el-link class="footer-main-link">关于我们</el-link>
        <el-link class="footer-main-link">联系我们</el-link>
        <el-link class="footer-main-link">保密政策</el-link>
      </div>
      <div class="footer-main">
        <h4>联系&帮助</h4>
        <div class="footer-main-code">
          <img src="../assets/common/concat_qrcode.png" alt="">
          <p>微信客服</p>
        </div>
      </div>
      <div class="footer-social">
        <p class="footer-social-title">选择语言</p>
        <el-dropdown>
          <span class="el-dropdown-link">
            zh<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>zh</el-dropdown-item>
            <el-dropdown-item>en</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-footer>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
.el-footer {
  background-color: #272727;
  width: 100%;
  padding: 60px 180px;
  box-sizing: border-box;
  height: 352px;
  .footer-main {
    font-size: 0;
    display: inline-block;
    vertical-align: top;
    margin-right: 150px;
    h4 {
      font-size: 18px;
      color: #fff;
      line-height: 1;
    }
    &-en {
      font-size: 14px;
      color: #fff;
      margin: 2px 0 15px;
    }
    &-link {
      display: block;
      margin: 0;
      line-height: 2.8;
      font-size: 16px;
      color: rgba(255,255,255,.65);;
    }
    &-code {
      margin-top: 26px;
      width: 114px;
      height: 114px;
      img {
        width: 100%;
      }
      p {
        color: #fff;
        font-size: 14px;
        margin-top: 8px;
        text-align: center;
      }
    }
  }
  .footer-social {
    float: right;
    color: #fff;
    &-title {
      font-size: 18px;
      line-height: 1;
      margin-bottom: 30px;
    }
  }
}
</style>
