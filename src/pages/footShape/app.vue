<template>
  <el-container class="page-shape">
    <banner-container></banner-container>

    <el-row v-if="isLogin">

      <template v-if="scanList.length">
        <el-col :span="6"
                class="shape-action">
          <div class="record-title">
            <i class="el-icon-s-data"></i>
            <span>我的脚型数据</span>
          </div>

          <div class="record-list">
            <div class="record-list__time"
                 v-for="(item, index) in scanList"
                 :key="item.id">
              <span class="first-item"
                    v-if="index === 0">{{ item.scanTime }}</span>
              <el-radio v-else
                        v-model="currentScan"
                        @change="handleCheckCompare"
                        :label="item.id">{{ item.scanTime }}</el-radio>
            </div>
          </div>
          <div class="page-count">共{{ totalPage }}页</div>

          <el-pagination small
                         @current-change="handleCurrentChange"
                         layout="prev, pager, next, jumper"
                         :current-page="start"
                         :page-size="limits"
                         :total="totalPage">
          </el-pagination>

        </el-col>
        <el-col :span="18"
                class="shape-data"
                v-loading="tableLoading">
          <el-table :data="tableData"
                    stripe
                    class="shape-data__table"
                    style="width: 100%">
            <el-table-column prop="label"
                             width="180">
            </el-table-column>
            <el-table-column :render-header="renderTdHeader"
                             class="td-cell">
              <template scope="scope">
                <span class="column-left">{{ scope.row.l_value }}</span>
                <span class="column-right">{{ scope.row.r_value }}</span>
              </template>
            </el-table-column>
            <el-table-column :render-header="renderTdHeader">
              <template scope="scope">
                <div v-if="currentScan">
                  <span class="column-left">{{ scope.row[`l_value_${currentScan}`] }}</span>
                  <span class="column-right">{{ scope.row[`r_value_${currentScan}`] }}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </template>
      <el-col :span="24"
              class="shape-action"
              v-else>
        <div class="record-title">
          <i class="el-icon-s-data"></i>
          <span>我的脚型数据</span>
        </div>
        <div class="record-empty">
          <img src="../../assets/shape/foot-shape.png"
               class="foot-shape"
               alt="">
          <p class="record-empty__text">还没有测量的脚型数据</p>
          <el-link type="primary"
                   class="record-empty__check"
                   href="nearby.html">查看附近测量点</el-link>
          <!-- <p class="record-empty__text">请联系你当地的兰湾足行店铺扫描脚型数据</p>
          <img src="../../assets/shape/service-qrcode.png"
               class="service-qrcode"
               alt="">
          <p class="contact-info">兰湾足行所在城市：佛山&nbsp;&nbsp;0757-85500380&nbsp;丨&nbsp;85500382&nbsp;&nbsp;&nbsp;青岛&nbsp;&nbsp;&nbsp;0532-88690000&nbsp;&nbsp;&nbsp;苏州&nbsp;&nbsp;&nbsp;0512-68796096&nbsp;&nbsp;&nbsp;厦门</p>
          <p class="contact-info">想做一站式服务创业项目，共享兰湾足行，请微信客服</p> -->
        </div>
      </el-col>
    </el-row>

    <el-row class="about-box">
      <el-col :offset="2"
              :span="10">
        <div class="about-box__desc">兰湾足行<span class="en">TM</span>矫形鞋垫是无限三维|兰湾智能旗下子品牌，为国内外有足部治疗及保健需求的人群，结合惠普高精度3D打印而研发出定制鞋垫。</div>
        <div class="about-box__title">适应症</div>
        <div class="about-box__ul">
          <ul>
            <li>内翻/外翻足</li>
            <li>扁平/高弓足</li>
            <li>旋前/旋后</li>
            <li>左右肢长度不等（长短腿）</li>
            <li>足底溃疡（鸡眼）</li>
            <li>糖尿病足底溃疡</li>
            <li>足底筋膜炎等足部疾病</li>
            <li>生物力线不正常引起的O/X腿、腰腿疼痛</li>
          </ul>
        </div>
      </el-col>
      <el-col :offset="1"
              :span="8">
        <a class="about-video"
           href="#">
          <video :src="currentVideo.video"
                 :poster="currentVideo.image"
                 controls="controls"></video>
          <!-- <img src="../../assets/shape/about-video.png" alt="">
          <i class="el-icon-caret-right"></i> -->
        </a>
        <el-row type="flex"
                class="video-group"
                justify="space-between">
          <el-link :underline="false"
                   @click="handleVideo(item)"
                   :span="6"
                   class="video-group__item"
                   v-for="item in videoList"
                   :key="item.id">
            <el-image :src="item.image"
                      fit="cover"></el-image>
          </el-link>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="custom-box">
      <div class="custom-box__header">
        <div class="custom-box__title">
          <div class="zh">定制流程</div>
          <div class="en">Custom Process</div>
        </div>
      </div>
      <el-col :span="3"
              :offset="2">
        <div class="process-item process-into">
          <img src="../../assets/shape/process-into.png"
               alt="">
          <div class="process-title">
            <span class="process-num">1</span>
            <span>顾客进店</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6"
              :offset="1">
        <div class="process-item process-client">
          <img src="../../assets/shape/process-client.png"
               alt="">
          <div class="process-title">
            <span class="process-num">1</span>
            <span>商店端/个人端</span>
          </div>
          <div>
            <i class="el-icon-bottom"></i>
          </div>
          <div class="process-item__step">
            <div class="step-wrap">足底扫描</div>
          </div>
          <div>
            <i class="el-icon-bottom"></i>
          </div>
          <div class="process-item__step">
            <div class="step-wrap">建立客户档案并发送扫描数据解读分析报告</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6"
              :offset="1">
        <div class="process-item process-center">
          <img src="../../assets/shape/process-center.png"
               alt="">
          <div class="process-title">
            <span class="process-num">1</span>
            <span>兰湾3D打印创新中心</span>
          </div>
          <div>
            <i class="el-icon-bottom"></i>
          </div>
          <div class="process-item__step">
            <div class="step-wrap">足底数据分析</div>
          </div>
          <div>
            <i class="el-icon-bottom"></i>
          </div>
          <div class="process-item__step">
            <div class="step-wrap">鞋垫设计</div>
          </div>
          <div>
            <i class="el-icon-bottom"></i>
          </div>
          <div class="process-item__step">
            <div class="step-wrap">鞋垫生产</div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="process-item process-exchange">
          <img src="../../assets/shape/process-exchange.png"
               alt="">
          <div class="process-title">
            <span class="process-num">1</span>
            <span>客户交货</span>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row class="advertise-box">
      <div class="advertise-box__site">
        <img src="../../assets/common/lwzx-logo.png"
             alt="">
      </div>
      <div class="advertise-box__sell">
        <img src="../../assets/shape/sell-icon.png"
             alt="">
        <div>
          <div class="sell-state">官方直销</div>
        </div>
      </div>
      <el-col :offset="6"
              :span="12">
        <el-col :span="8"
                class="security-item">
          <img src="../../assets/shape/security_1.png"
               alt="">
          <p>正品保障</p>
        </el-col>
        <el-col :span="8"
                class="security-item">
          <img src="../../assets/shape/security_2.png"
               alt="">
          <p>统一发货</p>
        </el-col>
        <el-col :span="8"
                class="security-item">
          <img src="../../assets/shape/security_3.png"
               alt="">
          <p>统一售后</p>
        </el-col>
      </el-col>
      <div class="advertise-box__insole">
        <img src="../../assets/shape/insole-img.png"
             alt="">
      </div>
    </el-row>

    <default-footer></default-footer>

  </el-container>
</template>
<script>
import BannerContainer from '@/components/banner'
import DefaultFooter from '@/components/defaultFooter'
import loginMixins from '@/mixins/login'
import { getScan, getScanData, getListVideo } from '@/service/http'
import handleScanData from './utils/handleScanData'
export default {
  components: {
    BannerContainer,
    DefaultFooter
  },
  mixins: [loginMixins],
  methods: {
    handleVideo (item) {
      this.currentVideo = item
    },
    getListVideo () {
      getListVideo({ videoType: 0 }).then(res => {
        console.log(res)
        this.videoList = res.data
        this.currentVideo = this.videoList[0]
      }).catch(err => {
        console.log(err)
      })
    },
    handleCheckCompare (val) {
      this.currentScan = val
      this.getScanDetail(val)
    },
    getScanDetail (id) {
      this.tableLoading = true
      getScanData({ id }).then(res => {
        const [leftData, rightData] = res.data
        this.tableData = handleScanData(leftData, rightData, this.currentScan).map((o, i) => {
          return {
            ...o,
            ...this.tableData[i]
          }
        })
        this.tableLoading = false
      }).catch(err => {
        this.tableLoading = false
        console.log(err)
      })
    },
    getScanList () {
      const { start, limits } = this
      const params = {
        start,
        limits
      }
      console.log(params)
      getScan(params).then(res => {
        const { data, total } = res.data
        this.scanList = data
        this.totalPage = total
        this.getScanDetail(data[0].id)
      }).catch(err => {
        console.log(err)
      })
    },
    renderHeader (arr) {
      return (
        <div class="cell-header">
          {
            arr.map((item) => {
              return <span class="cell-header__item">{item}</span>
            })
          }
        </div>
      )
    },
    renderTdHeader () {
      return this.renderHeader(['左脚', '右脚'])
    },
    handleCurrentChange (val) {
      this.start = val
      this.getScanList()
    }
  },
  data () {
    return {
      start: 1,
      limits: 6,
      totalPage: '',
      tableData: [],
      scanList: [],
      currentScan: '',
      tableLoading: false,
      videoList: [],
      currentVideo: ''
    }
  },
  created () {
    if (this.isLogin) {
      this.getScanList()
    }
    this.getListVideo()
  }
}
</script>
<style lang="less">
.page-shape {
  flex-direction: column !important;
  .main-container {
    padding: 0;
  }
  .shape-advertise {
    position: relative;
    height: 500px;
    .el-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .shape-wrap {
      position: relative;
      padding-top: 50px;
      &__info {
        color: #fff;
        .protect-en {
          font-size: 64px;
        }
        .feet-en {
          font-size: 18px;
          margin-top: 6px;
        }
        .feet-zh {
          font-size: 38px;
          margin-top: 20px;
          padding-bottom: 16px;
          &__bottom {
            display: inline-block;
            padding-bottom: 10px;
            border-bottom: 6px solid #fff;
          }
        }
        .feet-desc {
          font-size: 14px;
          margin-top: 16px;
          line-height: 22px;
          margin-bottom: 22px;
        }
        .experience-btn {
          width: 264px;
          height: 40px;
          border-radius: 6px;
          text-align: center;
          background-image: linear-gradient(to right, #d5de31, #03d6c7);
          a {
            width: 100%;
            height: 100%;
            color: #fff;
            i {
              padding-left: 6px;
            }
          }
        }
      }
      .entrance-btn {
        color: rgba(255, 255, 255, 0.8);
        width: 194px;
        height: 40px;
        line-height: 40px;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.7);
        text-align: center;
        font-size: 16px;
        letter-spacing: 1px;
        margin-top: 18px;
      }
    }
  }
  .shape-action {
    background-color: #eff2f9;
    padding: 0 39px 26px 80px;
    box-sizing: border-box;
    .record-title {
      position: relative;
      height: 64px;
      line-height: 64px;
      font-size: 20px;
      color: #333;
      border-bottom: 1px solid #fff;
      i {
        color: #999;
        font-size: 18px;
        margin-right: 4px;
      }
      &__btn {
        position: absolute;
        right: 0;
        top: 22px;
        padding: 6px 12px;
        font-size: 12px;
      }
    }
    .record-list {
      position: relative;
      min-height: 288px;
      box-sizing: border-box;
      &__time {
        font-size: 18px;
        height: 48px;
        line-height: 48px;
        box-sizing: border-box;
        border-bottom: 1px solid #fff;
        .first-item {
          font-size: 14px;
          color: #0096d6;
          padding-left: 24px;
        }
      }
    }
    .page-count {
      text-align: right;
      color: #333;
      padding: 12px 0 30px;
    }
    .record-empty {
      font-size: 12px;
      text-align: center;
      &__text {
        color: #999;
        margin-top: 8px;
      }
      &__check {
        margin-top: 8px;
        font-size: 14px;
      }
      .foot-shape {
        margin: 20px 0 14px;
      }
      .service-qrcode {
        margin-top: 30px;
        margin-bottom: 4px;
      }
      .contact-info {
        margin-top: 8px;
        color: #333;
      }
    }
  }
  .shape-data {
    padding: 10px 84px 6px 48px;
    &__table {
      td {
        padding: 6px 0;
      }
      .cell-header {
        width: 280px;
        &__item:first-child {
          padding-right: 100px;
        }
      }
      .column-left {
        display: inline-block;
        min-width: 100px;
        border-right: 1px solid #ddd;
      }
      .column-right {
        padding-left: 30px;
      }
    }
    .diagnose-label {
      margin-top: 8px;
      margin-bottom: 2px;
      padding-left: 10px;
    }
  }
  .about-box {
    margin-top: 80px;
    margin-bottom: 100px;
    &__desc {
      line-height: 36px;
      font-size: 22px;
      color: #333;
      letter-spacing: 1px;
      margin-top: -8px;
      .en {
        font-size: 14px;
        vertical-align: text-bottom;
      }
    }
    &__title {
      color: #0096d6;
      font-size: 24px;
      padding-left: 8px;
      margin-top: 30px;
      margin-bottom: 12px;
      border-left: 4px solid #0096d6;
    }
    &__ul {
      color: #798696;
      li {
        margin-bottom: 6px;
      }
    }
    .about-video {
      position: relative;
      display: block;
      border-radius: 4px;
      overflow: hidden;
      video {
        width: 100%;
      }
    }

    .about-video > img {
      width: 100%;
    }

    .about-video i {
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      background: #fff;
      border-radius: 50%;
      font-size: 24.027px;
      z-index: 10;
      -webkit-animation: 2s play-animation infinite;
      animation: 2s play-animation infinite;
      -webkit-transition: 0.2s color;
      transition: 0.2s color;
    }

    .about-video:hover i {
      color: #0096d6;
    }

    @-webkit-keyframes play-animation {
      from {
        -webkit-box-shadow: 0px 0px 0px 0px #fff;
        box-shadow: 0px 0px 0px 0px #fff;
      }
      to {
        -webkit-box-shadow: 0px 0px 0px 10px transparent;
        box-shadow: 0px 0px 0px 10px transparent;
      }
    }

    @keyframes play-animation {
      from {
        -webkit-box-shadow: 0px 0px 0px 0px #fff;
        box-shadow: 0px 0px 0px 0px #fff;
      }
      to {
        -webkit-box-shadow: 0px 0px 0px 10px transparent;
        box-shadow: 0px 0px 0px 10px transparent;
      }
    }
  }
  .custom-box {
    &__header {
      text-align: center;
    }
    &__title {
      color: #333;
      display: inline-block;
      padding: 0 36px;
      border-left: 1px solid #333;
      border-right: 1px solid #333;
      margin-bottom: 48px;
      .zh {
        font-size: 40px;
      }
      .en {
        font-size: 28px;
        font-weight: 300;
      }
    }
    .process-item {
      text-align: center;
      color: #1e8ec9;
      font-weight: 600;
      .process-title {
        text-align: center;
        .process-num {
          width: 32px;
          height: 32px;
          line-height: 32px;
          border-radius: 50%;
          background-color: #f18d28;
          color: #fff;
          display: inline-block;
          margin-right: 10px;
        }
      }
      &__step {
        .step-wrap {
          border-radius: 16px;
          border: 2px solid #1e8ec9;
          padding: 2px 20px;
          line-height: 30px;
          display: inline-block;
        }
      }
    }
  }
  .advertise-box {
    margin-top: 80px;
    margin-bottom: 40px;
    text-align: center;
    &__site {
      margin-bottom: 40px;
    }
    &__sell {
      margin-bottom: 50px;
      .sell-state {
        font-size: 32px;
        font-weight: 300;
        height: 48px;
        line-height: 48px;
        color: #fff;
        background-color: #0096d6;
        padding: 2px 60px;
        border-radius: 26px;
        display: inline-block;
        margin-top: 30px;
      }
    }
    .security-item {
      p {
        margin-top: 6px;
      }
    }
    &__insole {
      text-align: center;
    }
  }
  .video-group {
    &__item {
      margin: 0 8px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
    img {
      // height: 100px;
    }
  }
}
</style>

