<template>
  <el-container class="page-order">
    <default-header></default-header>
    
    <div class="order-banner">
      <img src="../../assets/order/order-header.png" alt="">
      <div class="order-banner__info">
        <h4>3D打印功能性定制鞋垫</h4>
        <div>
          <ul>
            <li>定制</li>
            <li>舒适</li>
            <li>健康</li>
          </ul>
        </div>
      </div>
    </div>
    <el-main>
      <div class="order-container" :class="{'order-container__width': stepActive === 1}">
        <el-steps class="step-wrap" align-center :active="stepActive">
          <el-step title="选择脚型数据" icon="el-icon-edit"></el-step>
          <el-step title="购物车结算" icon="el-icon-document"></el-step>
          <el-step title="支付订单" icon="el-icon-money"></el-step>
          <el-step title="完成" icon="el-icon-check"></el-step>
        </el-steps>

        <div class="main-content">

          <router-view/>

        </div>
      </div>
    </el-main>

    <default-footer></default-footer>

  </el-container>
</template>
<script>
import DefaultHeader from '@/components/defaultHeader'
import DefaultFooter from '@/components/defaultFooter'
export default {
  components: {
    DefaultHeader,
    DefaultFooter
  },
  created () {
  },
  computed: {
    stepActive () {
      let path = this.$route.path
      switch (path) {
        case '/':
          return 1
        case '/cart':
          return 2
        case '/pay':
          return 3
        case '/success':
          return 4
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
.page-order {
  flex-direction: column;
}
.order-banner {
  position: relative;
  img {
    width: 100%;
  }
  &__info {
    position: absolute;
    top: 0;
    right: 24%;
    padding-top: 70px;
    text-align: right;
    h4 {
      font-size: 38px;
      color: #fff;
      font-weight: 500;
      letter-spacing: 1px;
      margin-bottom: 14px;
    }
    ul {
      li {
        float: right;
        margin-left: 26px;
        color:rgba(204,204,204,1);
      }
    }
  }
}
.el-main{
  background-color: #F2F2F2;
  .order-container {
    background:rgba(255,255,255,1);
    box-shadow:0px 5px 38px 0px rgba(10,2,5,0.17);
    margin: 0 30px;
    padding: 30px 60px;
    &__width {
      max-width: 1000px;
      margin: 0 auto;
    }
    .step-wrap {
      padding: 0 10%;
    }
    .main-content {
      margin-top: 32px;
    }
  }
}
</style>

