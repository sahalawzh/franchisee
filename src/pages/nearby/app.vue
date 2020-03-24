<template>
  <el-container class="page-nearby"
                v-loading="loading">
    <banner-container></banner-container>

    <el-main class="main-container">
      <el-row type="flex"
              align="bottom">
        <div class="nearby-location">
          <i class="el-icon-location-outline"></i>
          <span>{{ currentCity }}</span>
        </div>
        <div class="nearby-list">
          <div>兰湾足行所在城市：</div>
          <!-- <span v-for="(item, index) in cityList"
                :key="index">
            <el-button type="text"
                       @click="handleToDetail(item)">{{ item.city }}</el-button>
            <el-divider v-if="index + 1 < cityList.length"
                        direction="vertical"></el-divider>
          </span> -->
          <el-tabs v-model="currentCity"
                   @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in cityList"
                         :key="index"
                         :name="item.city"
                         :label="item.city"></el-tab-pane>
          </el-tabs>
        </div>
      </el-row>
      <el-row class="nearby-container">
        <el-col :md="6"
                :sm="6"
                :xs="8"
                v-for="(item, index) in locationList"
                :key="index">
          <div class="nearby-item">
            <div class="nearby-item__hd">
              <el-tag class="tag-name"
                      size="small">{{ item.tag }}</el-tag>
              {{ item.companyName }}
            </div>
            <div class="nearby-item__bd">
              <div class="item-list">
                <div class="label">营业时间：</div>
                <div class="value">
                  <div v-for="(item, index) in businessTime"
                       :key="index">{{item.week}} {{item.time}}</div>
                </div>
              </div>
              <div class="item-list">
                <div class="label">测量地址：</div>
                <div class="value">
                  {{ item.address }}<i class="el-icon-location"></i>
                </div>
              </div>
            </div>
            <!-- <div class="nearby-item__ft">
              <el-button type="text">查看详情</el-button>
            </div> -->
          </div>
        </el-col>
      </el-row>
      <el-pagination @current-change="handleCurrentChange"
                     :current-page="start"
                     :page-sizes="[limits]"
                     :page-size="limits"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalCount">
      </el-pagination>

      <el-row class="nearby-foot">
        <img src="../../assets/shape/service-qrcode.png"
             class="service-qrcode"
             alt="">
        <p class="contact-info">想做一站式服务创业项目，共享兰湾足行，请微信客服</p>
      </el-row>
    </el-main>
    <!-- <baidu-map @ready="hanlder"></baidu-map> -->
    <default-footer></default-footer>
  </el-container>
</template>
<script>
import BannerContainer from "@/components/banner";
import DefaultFooter from "@/components/defaultFooter";
import LocationSdk from "@/utils/location";
import { getListCity, getLocalLocation, getLocations } from "@/service/http";
import axios from 'axios';
export default {
  components: {
    DefaultFooter,
    BannerContainer
  },
  methods: {
    handleClick (tab) {
      const { latitude, longitude } = this.cityList[tab.index]
      this.start = 1
      this.latitude = latitude
      this.longitude = longitude
      this.loading = true
      this.getLocationList()
    },
    handleCurrentChange (val) {
      this.start = val
      this.getLocationList()
    },
    getLocationList () {
      const { latitude, longitude, start } = this
      const opts = {
        latitude,
        longitude,
        start
      }
      getLocations(opts).then(res => {
        let { data, total } = res.data
        const businessTime = []
        data.forEach(item => {
          item.businessDays.forEach((_item, _index) => {
            businessTime.push({
              week: _item,
              time: item.businessHours[_index]
            })
          })
        })
        this.businessTime = businessTime
        this.locationList = data
        this.totalCount = total
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    getHomeData () {
      let apiList = []
      if (this.permission === 'PERMISSIONAUTH') {
        apiList = [this.getLocationList(), getLocalLocation()]
      } else {
        apiList = [this.getLocationList()]
      }
      axios.all(apiList).then(res => {
        console.log(res)
        if (this.permission === 'PERMISSIONAUTH') {
          const { latitude, longitude, cityList } = this
          cityList.unshift({
            city: res[1].data,
            latitude,
            longitude
          })
          this.currentCity = res[1].data
        } else {
          this.currentCity = this.cityList[0].city
        }
        this.loading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    getListCity () {
      getListCity()
        .then(res => {
          let values = Object.values(res.data)
          let cityList = [].concat.apply([], values)
          if (this.permission === 'NOTPERMISSIONAUTH') {
            let defaultAddress = values[0][0]
            this.latitude = defaultAddress.latitude
            this.longitude = defaultAddress.longitude
          }
          this.cityList = cityList
          this.getHomeData()
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  data () {
    return {
      loading: false,
      latitude: '',
      longitude: '',
      start: 1,
      totalCount: 1,
      limits: 24,
      cityList: [],
      locationList: [],
      businessTime: [],
      currentCity: '',
      activeName: '用户管理',
      permission: 'NOTPERMISSIONAUTH'
    };
  },
  watch: {
  },
  mounted () {
    this.loading = true
    let self = this;
    LocationSdk.getLocation({
      success: res => {
        console.log(res);
        const { latitude, longitude } = res
        self.latitude = latitude;
        self.longitude = longitude;
        this.permission = 'PERMISSIONAUTH'
        self.getListCity()
      },
      error: error => {
        console.log(error);
        this.permission = 'NOTPERMISSIONAUTH'
        self.getListCity()
      }
    });
  },
  created () {
  }
};
</script>
<style lang="less">
.page-nearby {
  flex-direction: column !important;
  .main-container {
    padding: 30px 80px;
  }
  .nearby-location {
    font-size: 28px;
    color: #0096d6;
    .el-icon-location-outline {
      margin-right: 4px;
      color: #666;
    }
  }
  .nearby-list {
    margin-left: 26px;
    font-size: 16px;
    color: #333;
    display: flex;
    align-items: center;
    .el-button--text {
      padding-top: 10px;
      padding-bottom: 0;
    }
    .el-tabs__header {
      margin-bottom: 0;
    }
  }
  .nearby-container {
    margin: 30px 0;
  }
  .nearby-item {
    position: relative;
    padding: 16px 10px 2px;
    width: 86%;
    border: 1px solid #eee;
    &__hd {
      display: flex;
      align-items: center;
      padding-left: 84px;
      padding-bottom: 12px;
      font-size: 16px;
      color: #333;
      border-bottom: 1px solid #eee;
      .tag-name {
        position: absolute;
        left: 10px;
        font-size: 14px;
      }
    }
    &__bd {
      color: #666;
      font-size: 14px;
      .item-list {
        position: relative;
        padding-top: 10px;
        padding-left: 70px;
        .label {
          position: absolute;
          left: 0;
        }
      }
    }
    &__ft {
      text-align: right;
    }
  }
  .nearby-foot {
    text-align: center;
    margin-top: 80px;
    margin-bottom: 40px;
    .service-qrcode {
      margin-top: 30px;
      margin-bottom: 4px;
    }
    .contact-info {
      margin-top: 8px;
      color: #333;
      font-size: 14px;
    }
  }
}
</style>
