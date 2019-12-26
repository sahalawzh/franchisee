<template>
  <div v-loading="loading">
    <el-tabs v-model="orderProcess" @tab-click="handleClick">
      <el-tab-pane label="全部" name="-1"></el-tab-pane>
      <el-tab-pane label="待付款" name="0"></el-tab-pane>
      <el-tab-pane label="待发货" name="1"></el-tab-pane>
      <el-tab-pane label="已发货" name="2"></el-tab-pane>
    </el-tabs>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="consignee"
        label="用户"
        width="140">
      </el-table-column>
      <el-table-column
        prop="scanTime"
        label="扫描数据"
        width="200">
      </el-table-column>
      <el-table-column
        width="220"
        label="客户资料">
        <template slot-scope="scope">
          <div>{{ scope.row.diseaseName }}</div>
          <div>{{ scope.row.sizeName }}</div>
          <div>{{ scope.row.functionName }}</div>
          <div>{{ scope.row.shoeName }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="num"
        width="100"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="price"
        width="100"
        label="价格">
        <template slot-scope="scope">
          <div>￥{{ scope.row.price }}</div>
        </template>
      </el-table-column>
      <el-table-column
        width="220"
        label="地址">
        <template slot-scope="scope">
          <div>{{ scope.row.province }}{{ scope.row.city }}{{ scope.row.detailAddress }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="orderProcess === 0"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">立即付款</el-button>
          <div v-else-if="orderProcess === 1">鞋垫制作中，待发货</div>
          <div v-else-if="orderProcess === 2">查看物流</div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="start"
      :page-sizes="[limits, 200, 300, 400]"
      :page-size="limits"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</template>
<script>
import { getSearchOrder } from '@/service/http'
export default {
  data() {
    return {
      loading: false,
      orderProcess: '-1',
      tableData: [],
      start: 1,
      limits: 5,
      totalCount: 1
    }
  },
  created () {
    this.getOrderList()
  },
  methods: {
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
    handleClick(tab, event) {
      this.orderProcess = tab.name
      this.getOrderList()
    },
    handleCurrentChange(val) {
      this.start = val
      this.getOrderList()
    }
  }
}
</script>
<style lang="less" scoped>
.el-pagination {
  margin-top: 30px;
  text-align: right;
}
</style>

