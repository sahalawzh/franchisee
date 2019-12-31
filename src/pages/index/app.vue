<template>
  <div id="app" class="page-index">

    <el-row class="panel-box">
      <el-col :span="8">
        <div class="panel-item" @click="handleToPage" :class="{'panel-item__hover2': mask_active === 1}" @mouseover="handleEnter(1)" @mouseleave="handleLeave(1)">
          <div class="panel-title panel-title__one">3D打印功能性定制鞋垫</div>
          <div class="panel-content">
            
            <el-button class="panel-shape" v-if="isLogin" type="primary">我的足型报告<i class="el-icon-right"></i></el-button>
            
            <p v-else>
              为国内外有足部治疗及保健需求的人群，结合惠普高精度3D打印而研发出定制功能性鞋垫。
            </p>
            <div class="statistics-box">
              <div class="statistics-box__title">据统计</div>
              <div class="statistics-box__desc">有<span class="underline"><span class="underline-num">65</span>%以上人</span>群有不同程度的足部问题引起的足、腰腿疼等症状。</div>
            </div>
          </div>
          <img src="../../assets/index/insole-custom.png" class="panel-bg">
          <div class="panel-item__mask" v-if="mask_active === 1"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="panel-item" @click="handleToPage" :class="{'panel-item__hover2': mask_active === 2}" @mouseover="handleEnter(2)" @mouseleave="handleLeave(2)">
          <div class="panel-item__logo">
            <img v-if="mask_active === 2" src="../../assets/common/logo_mask.png" alt=""/>
            <img v-else src="../../assets/common/logo01.png" alt=""/>
          </div>
          <div class="panel-title">在线打印</div>
          <div class="panel-content">
            <p>
              可在线上传模型，一秒报价，下单打印，最快24小时发货。材料丰富设备齐全，惠普尼龙可实现批量化生产。
            </p>
            <div class="more-service">更多需要请联系客服。</div>
          </div>
          <img src="../../assets/index/online-printer.png" class="panel-bg">
          <div class="panel-item__mask" v-if="mask_active === 2"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="panel-item" @click.stop="handleToPage" :class="{'panel-item__hover2': mask_active === 3}" @mouseover="handleEnter(3)" @mouseleave="handleLeave(3)">
          <div class="login-box">
            <drop-down :isIndex="isLogin" :isLogin="isLogin" @login-status="handleLoginStatus"></drop-down>
          </div>

          <div class="panel-title">创业同行</div>
          <div class="panel-content">
            <p>
              兰湾足行邀您创业同行，共享经济，利他原则，<span class="stress-text">我们承诺<span class="stress-text__big">90</span>%利润让利给您</span>，我们承诺一年内达不到市场应有的成果，我们全额退回投资资金。
            </p>
          </div>
          <img src="../../assets/index/business-peer.png" class="panel-bg">
          <div class="panel-item__mask" v-if="mask_active === 3"></div>
        </div>
      </el-col>
    </el-row>

    <Login @login-status="handleLoginStatus" v-model="loginVisible" :isIndex="true"></Login>
  </div>
</template>
<script>
import Login from '@/components/login'
import DropDown from '@/components/dropDown'
import auth from '@/utils/auth'
import loginMixins from '@/mixins/login'
export default {
  data () {
    return {
      mask_active: 0
    }
  },
  mixins: [loginMixins],
  components: {
    Login,
    DropDown
  },
  methods: {
    handleToPage () {
      let val = this.mask_active
      switch (val) {
        case 1:
          window.location.href = 'footShape.html'
          break
        case 2:
          window.open( 'https://www.gdlwzn.com/', '_blank')
          break
        case 3:
          window.open( 'business.html', '_blank')
          break
        default:
          break
      }
    },
    handleEnter (val) {
      this.mask_active = val
    },
    handleLeave (val) {
      if (this.mask_active === val) return
      this.mask_active = 0
    }
  }
}
</script>

<style lang="less">
.page-index {
  background-color: #E8EDF9;
  height: 100vh;
  overflow: hidden;
  .panel-box {
    .panel-item {
      position: relative;
      z-index: 99;
      height: 100vh;
      box-sizing: border-box;
      overflow: hidden;
      .panel-shape {
        margin-top: 20px;
      }
      &__logo {
        position: absolute;
        top: 6%;
        width: 100%;
        text-align: center;
        z-index: 8;
      }
      .panel-content {
        padding: 0 22%;
      }
      .panel-bg {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        // height: calc(100vh - 366px);
        z-index: -1;
      }
      &__wrap {
        position: absolute;
        top: 0;
        bottom: 0;
        height: 100%;
        z-index: 4;
      }
      &__mask {
        position: absolute;
        top: 0;
        z-index: 6;
        width: 100%;
        height: 100%;
        background: rgba(18,79,174,.83);
      }
      .panel-title {
        padding-top: calc(6% + 134px);
        font-size: 24px;
        color: #124FAE;
        text-align: center;
        margin-bottom: 10px;
        &__one {
          text-align: left;
          padding-left: 22%;
        }
      }
      p {
        font-size: 14px;
        color: #9DA0A8;
        line-height: 28px;
      }
      .stress-text {
        font-size: 18px;
        color: #124FAE;
        &__big {
          font-size: 34px;
        }
      }
      .more-service {
        margin-top: 34px;
        color: #9DA0A8;
        font-size: 14px;
        text-align: center;
      }
      .statistics-box {
        font-size: 18px;
        color: #333;
        text-align: left;
        font-weight: 600;
        &__title {
          margin: 24px 0 18px;
        }
        &__desc {
          line-height: 30px;
          .underline {
            position: relative;
            z-index: 2;
            &::after {
              content: '';
              width: 100%;
              height: 9px;
              background-color: #FBEC00;
              position: absolute;
              left: 0;
              bottom: 2px;
              z-index: -1;
            }
            &-num {
              font-size: 34px;
            }
          }
        }
      }
      .login-box {
        position: absolute;
        top: 68px;
        right: 93px;
        z-index: 100;
        .el-dropdown {
          font-size: 18px;
          vertical-align: text-bottom;
        }
      }
      &__hover2 {
        .panel-title, p, .more-service, .stress-text, .statistics-box, .panel-shape {
          position: relative;
          color: #fff;
          z-index: 9;
        }
      }
    }
  }
}
</style>
