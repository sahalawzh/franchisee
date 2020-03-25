<template>
  <div class="my-order"
       v-loading="loading">
    <el-tabs v-model="orderProcess"
             @tab-click="handleClick">
      <el-tab-pane label="全部"
                   name="-1"></el-tab-pane>
      <el-tab-pane label="待付款"
                   name="0"></el-tab-pane>
      <el-tab-pane label="待发货"
                   name="1"></el-tab-pane>
      <el-tab-pane label="已发货"
                   name="2"></el-tab-pane>
    </el-tabs>
    <template v-if="tableData.length">
      <el-row class="table-header">
        <el-col :span="3">用户</el-col>
        <el-col :span="6">扫描时间</el-col>
        <el-col :span="6">客户资料</el-col>
        <el-col :span="2">数量</el-col>
        <el-col :span="3">价格</el-col>
        <el-col :span="4">操作</el-col>
      </el-row>
      <div class="table-content"
           v-for="(item, index) in tableData"
           :key="index">
        <el-row class="table-content__hd">
          <span>{{ item.createTime }}</span>
          <span class="order-no">订单号：{{item.orderNo}}</span>
          <span class="payment-time"
                v-if="item.paymentTime">成交时间：{{ item.paymentTime }}</span>
        </el-row>
        <el-row class="table-content__bd">
          <el-col :span="3">{{ item.consignee }}</el-col>
          <el-col :span="6">{{ item.scanTime }}</el-col>
          <el-col :span="6">
            <div class="sku-list">
              <div>{{ item.crowdName }}</div>
              <div>{{ item.sizeName }}</div>
              <div>{{ item.functionName }}</div>
              <div>{{ item.shoeName }}</div>
            </div>
          </el-col>
          <el-col :span="2">{{ item.num }}</el-col>
          <el-col :span="3"
                  class="color-pirce">￥{{ item.totalPrice }}</el-col>
          <el-col :span="4">
            <el-button size="mini"
                       type="danger"
                       v-if="item.orderProcess === 0"
                       @click="handleToPay(item)">立即付款</el-button>
            <div v-else-if="item.orderProcess === 1">鞋垫制作中，待发货</div>
            <el-button v-else-if="item.orderProcess === 2"
                       type="text"
                       @click="handleOpenFlow(item)">查看物流</el-button>
          </el-col>
        </el-row>
        <el-row class="table-content__ft">
          <div class="address-colum-1">
            <i class="el-icon-map-location icon-address"></i>
            <span>{{ item.province }}{{ item.city }}</span>
            <span>（{{ item.consignee }}收）</span>
          </div>
          <div class="address-colum-2">
            <span>{{ item.province }}{{ item.city }}{{ item.detailAddress }}</span>
            <span class="phone">{{ item.phone }}</span>
          </div>
        </el-row>
      </div>
    </template>
    <el-row v-else>暂无数据~</el-row>

    <el-pagination @current-change="handleCurrentChange"
                   :current-page="start"
                   :page-sizes="[limits, 200, 300, 400]"
                   :page-size="limits"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="totalCount">
    </el-pagination>

    <el-dialog title="物流信息"
               :visible.sync="dialogVisible"
               :show-close="false"
               width="40%"
               center>
      <div class="flow-box">
        <div>物流信息：{{ logisticsInfo.company }}</div>
        <div class="exp-phone">物流电话：{{ logisticsInfo.expPhone }}</div>
        <el-scrollbar style="height: 90%;"
                      v-if="logistics && logistics.length">
          <el-timeline>
            <el-timeline-item v-for="(item, index) in logistics"
                              :key="index"
                              :timestamp="item.date"
                              placement="top">
              <el-card>
                <!-- <h4>更新 Github 模板</h4> -->
                <p>{{ item.AcceptStation }}</p>
              </el-card>
            </el-timeline-item>

          </el-timeline>
        </el-scrollbar>
        <div v-else>暂无物流信息</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getSearchOrder, getLogisticsMessage } from '@/service/http'
export default {
  data () {
    return {
      payType: 'weixin',
      loading: false,
      orderProcess: '-1',
      tableData: [],
      start: 1,
      limits: 5,
      totalCount: 1,
      dialogVisible: false,
      logisticsInfo: '',
      logistics: []
    }
  },
  created () {
    this.getOrderList()
  },
  methods: {
    handleToPay (item) {
      window.location.href = `/order.html#/pay?orderNo=${item.orderNo}&orderType=1`
    },
    handleOpenFlow (item) {
      let opts = {
        orderNo: '10956202003241425153525' || item.orderNo
      }
      getLogisticsMessage(opts).then(res => {
        const result = res.data
        console.log(result)
        result.traces && result.traces.forEach(element => {
          let deteTime = element.AcceptTime.split(' ')
          element.date = deteTime[0]
          element.time = deteTime[1]
        })
        this.logisticsInfo = result
        this.logistics = result.traces
        console.log(this.logisticsInfo)
      }).catch(err => {
        console.log(err)
      })
      this.dialogVisible = true
    },
    getOrderList () {
      this.loading = true
      const { orderProcess, start, limits } = this
      const params = {
        orderProcess,
        start,
        limits
      }
      getSearchOrder(params).then(res => {
        this.loading = false
        const { data } = res
        this.tableData = data.data || []
        this.totalCount = data.total
      }).catch(err => {
        console.log(err)
      })
    },
    handleClick (tab) {
      this.orderProcess = tab.name
      this.getOrderList()
    },
    handleCurrentChange (val) {
      this.start = val
      this.getOrderList()
    }
  }
}
</script>
<style lang="less">
.el-pagination {
  margin-top: 30px;
  text-align: right;
}
.flow-box {
  padding: 0 30px;
  height: 500px;
  .el-scrollbar__wrap {
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .exp-phone {
    margin-top: 4px;
    margin-bottom: 20px;
  }
}
.my-order {
  .table-header {
    font-size: 15px;
    color: #999;
    text-align: center;
    margin-bottom: 14px;
  }
  .table-content {
    border: 1px solid #ddd;
    margin-bottom: 20px;
    &__hd {
      position: relative;
      height: 38px;
      line-height: 38px;
      font-size: 14px;
      color: #999;
      padding-left: 20px;
      border-bottom: 1px solid #ddd;
      .payment-time {
        position: absolute;
        right: 20px;
      }
      .order-no {
        margin-left: 10px;
      }
    }
    &__bd {
      text-align: center;
      font-size: 14px;
      color: #333;
      padding: 20px 0;
      border-bottom: 1px dotted #ddd;
      .sku-list {
        padding-left: 70px;
        text-align: left;
      }
    }
    &__ft {
      padding: 14px 0 14px 20px;
      .address-colum-1 {
        font-size: 17px;
        color: #666;
        margin-bottom: 10px;
        i {
          margin-right: 8px;
        }
      }
      .address-colum-2 {
        font-size: 14px;
        color: #999;
        .phone {
          margin-left: 12px;
        }
      }
    }
  }
}
</style>

