<template>
  <div class="page-online" v-loading="loading">
    <el-row type="flex" class="online-header" justify="space-between">
      <div class="online-header__title">请先选择本次打印的脚型数据</div>
      <el-link
        class="online-header__more"
        @click="drawer = true"
        type="primary"
        v-if="scanData.length"
        >查看更多的脚型数据>></el-link
      >
    </el-row>
    <el-row v-if="scanData.length">
      <el-col
        :md="8"
        :sm="8"
        :xs="12"
        v-for="(item, index) in scanData.slice(0, scanShowNum)"
        :key="index"
      >
        <div class="panel-item">
          <el-radio
            v-model="currentScan"
            @change="handleChangeScan"
            :label="item.id"
            border
          >
            <div class="panel-item__hd">
              <el-tag class="tag-name" size="small">{{ item.tag }}</el-tag>
              <span class="company-name">{{ item.companyName }}</span>
            </div>
            <div class="panel-item__bd">
              <div class="record-info">
                <span class="user-name">{{ item.userName }}</span>
                <span class="scan-time">{{ item.scanTime }}</span>
              </div>
              <div class="record-data">
                <div class="record-data__item">诊断结果</div>
                <div class="record-data__item">
                  左脚<span class="result-text">{{
                    item.leftFooterResult
                  }}</span>
                </div>
                <div class="record-data__item">
                  右脚<span class="result-text">{{
                    item.leftFooterResult
                  }}</span>
                </div>
              </div>
            </div>
          </el-radio>
        </div>
      </el-col>
    </el-row>
    <el-row
      v-else
      class="empty-scan"
      type="flex"
      justify="center"
      align="middle"
    >
      <div class="empty-box">
        <div>还没有测量的脚型数据</div>
        <el-link class="scan-point" href="nearby.html" type="primary"
          >查看附近测量点</el-link
        >
      </div>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="good-img">
          <el-image :src="detailData.image" fit="cover" alt="" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="good-info">
          <div class="good-info__title">{{ detailData.title }}</div>
          <div class="good-info__price">
            <span class="good-price">{{ skuPrice }}</span>
            <span class="good-price-market"
              >原价￥{{ detailData.originalPrice }}</span
            >
          </div>
          <div class="good-info__sku">
            <div class="sku-item" v-for="(item, index) in spuData" :key="index">
              <div class="sku-label">{{ item.name }}</div>
              <div class="sku-value">
                <el-radio-group
                  size="medium"
                  @change="
                    e => {
                      handleChangeSpec(e, index);
                    }
                  "
                  v-model="specSelect[index]"
                >
                  <el-radio-button
                    v-for="(_item, _index) in item.list"
                    :key="_index"
                    :label="_item.id"
                  >
                    <img
                      v-if="_item.isRecommend === 1"
                      src="../../../assets/order/ico_recommend.png"
                      class="ico_recommend"
                    />
                    {{ _item.name }}
                  </el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div class="good-info__step">
            <div class="step-label">数量</div>
            <el-input-number
              v-model="num"
              size="small"
              :min="min"
              @change="handleChangeNum"
            ></el-input-number>
          </div>
          <div class="submit-btn">
            <el-button type="danger" @click="handleSubmit">提交订单</el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-drawer
      :visible.sync="drawer"
      class="drawer-container"
      :direction="direction"
    >
      <div class="drawer-box">
        <div class="scam-search">
          <el-form :model="phoneForm" ref="phoneForm" :rules="rulePhoneForm">
            <el-form-item prop="phone">
              <el-input
                placeholder="搜索手机查找"
                v-model="phoneForm.phone"
                class="input-with-select"
              >
                <el-button
                  slot="append"
                  @click="handleSearchScan"
                  icon="el-icon-search"
                ></el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </div>

        <div class="scan-container">
          <div class="scan-wrap">
            <div
              class="panel-item"
              v-for="(item, index) in scanData"
              :key="index"
            >
              <el-radio
                v-model="currentScan"
                :label="item.id"
                @change="handleChangeScan"
                border
              >
                <div class="panel-item__hd">
                  <el-tag class="tag-name" size="small">{{ item.tag }}</el-tag>
                  <span class="company-name">{{ item.companyName }}</span>
                </div>
                <div class="panel-item__bd">
                  <div class="record-info">
                    <span class="user-name">{{ item.userName }}</span>
                    <span class="scan-time">{{ item.scanTime }}</span>
                  </div>
                  <div class="record-data">
                    <div class="record-data__item">诊断结果</div>
                    <div class="record-data__item">
                      左脚<span class="result-text">{{
                        item.leftFooterResult
                      }}</span>
                    </div>
                    <div class="record-data__item">
                      右脚<span class="result-text">{{
                        item.leftFooterResult
                      }}</span>
                    </div>
                  </div>
                </div>
              </el-radio>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>

    <el-divider></el-divider>

    <el-row>
      <div class="product-introduce">
        <div class="product-introduce__title">商品介绍</div>
      </div>
      <div class="tab-product">
        <el-image :src="detailData.introductionImage" fit="cover" alt="" />
      </div>
    </el-row>
  </div>
</template>
<script>
import {
  postAddCart,
  getSpu,
  getListclassiFication,
  putUpdateNum,
  getScanResultByPhone
} from "@/service/http";
import storage from "@/utils/storage";
import axios from "axios";
const ArchPattern = {
  NormalArch: "正常足弓",
  FlatArch: "扁平足",
  HighArch: "高足弓"
};

const FootStyle = {
  RomanFoot: "罗马脚",
  EgyptFoot: "埃及脚",
  GreeceFoot: "希腊脚",
  SquareFoot: "方形脚"
};
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      detailData: "",
      spuData: [],
      num: 1,
      specSelect: [],
      min: 1,
      skuPrice: 0,
      scanData: [],
      currentScan: "",
      currentTime: "",
      drawer: false,
      scanShowNum: 3,
      direction: "ltr",
      loading: false,
      phoneForm: {
        phone: ""
      },
      rulePhoneForm: {
        phone: [{ validator: checkPhone, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit() {
      const { currentScan, currentTime, specSelect, num } = this;
      if (!currentScan) {
        return this.$message({
          message: "您还没选择扫描数据",
          type: "warning"
        });
      }
      const args = {
        scanId: currentScan,
        scanTime: currentTime,
        indexes: specSelect.join("_"),
        num
      };
      postAddCart(args)
        .then(res => {
          console.log(res);
          this.$router.push({ name: "reserve" });
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleChangeNum(val) {
      this.num = val;
    },
    handleChangeScan(val) {
      this.currentScan = val;
      this.currentTime = this.scanData.filter(
        item => item.id === val
      )[0].scanTime;
    },
    handleSearchScan() {
      this.$refs.phoneForm.validate(valid => {
        if (valid) {
          console.log(this.phoneForm);
          const args = {
            phone: this.phoneForm.phone
          };
          getScanResultByPhone(args)
            .then(res => {
              console.log(res);
              this.scanData = this.handleScanData(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    handleChangeSpec(id, index) {
      this.$set(this.specSelect, index, id);
      if (this.spuData[index].type === 0) {
        // 人群
        this.skuPrice = this.spuData[index].list.filter(
          item => item.id === id
        )[0].secondName;
      }
    },
    handleScanData(data) {
      let result = [];
      data &&
        data.length &&
        data.forEach(item => {
          item.jsonData = JSON.parse(item.jsonData);
          const [leftFoot, rightFoot] = item.jsonData;
          item.leftFooterResult =
            ArchPattern[leftFoot.ArchPattern] +
            " " +
            FootStyle[leftFoot.FootStyle];
          item.rightFooterResult =
            ArchPattern[rightFoot.ArchPattern] +
            " " +
            FootStyle[rightFoot.FootStyle];
          result.push(item);
        });
      return result;
    }
  },
  created() {
    if (!storage.get("gdlwzn_login")) {
      window.location.href = "index.html";
      return;
    }
    let phone = storage.get("gdlwzn_login").phone;
    const phoneScanParams = {
      phone
    };
    const spuParams = {
      device: 0
    };
    const ficationParams = {
      linkType: 1
    };
    this.loading = true;
    axios
      .all([
        getSpu(spuParams),
        getListclassiFication(ficationParams),
        getScanResultByPhone(phoneScanParams)
      ])
      .then(res => {
        this.loading = false;
        const [detailData, spuData, scanData] = res;
        this.detailData = detailData.data;
        let selectIds = [];
        let skuPrice = 0;
        spuData.data.forEach(item => {
          let recommenItem = item.list.filter(_item => _item.isRecommend === 1);
          let currentItem = recommenItem.length
            ? recommenItem[0]
            : item.list[0];
          selectIds.push(currentItem.id);
          if (item.type === 0) {
            skuPrice = currentItem.secondName;
          }
        });
        this.skuPrice = skuPrice;
        this.specSelect = selectIds;
        this.spuData = spuData.data;
        this.scanData = this.handleScanData(scanData.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="less">
.page-online {
  .online-header {
    padding: 30px 0;
    &__title {
      font-size: 14px;
      color: #333;
    }
    &__more {
      font-size: 12px;
    }
  }
  .good-img {
    width: 90%;
    height: 184px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .good-info {
    &__title {
      font-size: 20px;
      color: #333;
    }
    &__price {
      margin-top: 10px;
      margin-bottom: 8px;
      .good-price {
        font-size: 20px;
        color: #f34234;
      }
      .good-price-market {
        font-size: 14px;
        color: #999;
        margin-left: 14px;
        position: relative;
        display: inline-block;
        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 1px;
          -webkit-transform: scale(1, 0.5);
          transform: scale(1, 0.5);
          top: 48%;
          left: 2px;
          background-color: #999;
        }
      }
    }
    &__sku {
      .sku-item {
        position: relative;
        padding-left: 60px;
        margin-top: 12px;
        .sku-label {
          position: absolute;
          left: 0;
          top: 7px;
          font-size: 14px;
          color: #999;
        }
        .sku-value {
          .el-radio-button {
            margin-bottom: 10px;
            margin-right: 20px;
            .el-radio-button__inner {
              border-color: transparent;
              background-color: #eeeeed;
              border-radius: 30px;
              font-size: 13px;
              color: #333;
              box-shadow: none;
            }
            .el-radio-button__orig-radio:checked + .el-radio-button__inner {
              color: #fff;
              background-color: #4571ea;
              border-color: #4571ea;
              -webkit-box-shadow: -1px 0 0 0 #4571ea;
              box-shadow: -1px 0 0 0 #4571ea;
            }
          }
          .ico_recommend {
            position: absolute;
            top: -1px;
            left: -1px;
            width: 30px;
            height: 30px;
          }
        }
      }
    }
    &__step {
      display: flex;
      margin-top: 10px;
      .step-label {
        font-size: 14px;
        color: #999;
        padding: 7px 54px 0 0;
      }
    }
    .submit-btn {
      margin: 30px 0;
      button {
        width: 70%;
      }
    }
  }
  .panel-item {
    margin-bottom: 50px;
    .el-radio__input {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
    .el-radio.is-bordered {
      height: 178px;
      width: 90%;
    }
    .el-radio__label {
      padding-left: 0;
    }
    &__hd {
      position: relative;
      padding-left: 78px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      .tag-name {
        position: absolute;
        left: 0;
      }
      .company-name {
        font-size: 14px;
        color: #333;
        line-height: 24px;
      }
    }
    &__bd {
      position: relative;
      .record-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 12px;
        padding-bottom: 4px;
        font-size: 14px;
        .user-name {
          color: #333;
        }
        .scan-time {
          color: #999;
        }
      }
      .record-data {
        font-size: 12px;
        &__item {
          color: #999;
          margin-top: 12px;
        }
        .result-text {
          color: #333;
          margin-left: 22px;
        }
      }
    }
  }
  .drawer-container {
    .el-drawer {
      height: 100% !important;
      width: 360px;
      .el-drawer__body {
        height: calc(100% - 200px);
        .drawer-box {
          position: relative;
          padding: 0 26px 30px;
          height: 100%;
          box-sizing: border-box;
          overflow: hidden;
          .scam-search {
            position: fixed;
            left: 26px;
            padding-bottom: 16px;
            background-color: #fff;
            z-index: 99;
          }
          .scan-container {
            height: 100%;
            padding-top: 80px;
            box-sizing: border-box;
            overflow-y: scroll;
            .panel-item {
              margin-bottom: 15px;
            }
          }
        }
      }
    }
  }
  .product-introduce {
    text-align: center;
    &__title {
      font-size: 20px;
      color: #999;
      display: inline-block;
      padding: 4px 20px 10px;
      border-bottom: 2px solid #0753fe;
    }
  }
  .empty-scan {
    padding: 50px 0;
    border: 2px solid #ccc;
    margin-bottom: 50px;
    .empty-box {
      text-align: center;
      font-size: 16px;
      .scan-point {
        margin-top: 20px;
        color: #1a5de1;
        border-bottom: 1px solid #1a5de1;
      }
    }
  }
  .tab-product {
    width: 100%;
    .el-image {
      display: block;
    }
  }
}
</style>
