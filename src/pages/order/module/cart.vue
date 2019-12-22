<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        fixed
        type="selection"
        label="全选"
        width="55">
      </el-table-column>
      <el-table-column
        label="用户"
        width="120">
        <template slot-scope="scope">
          <div>{{ scope.row.username }}</div>
          <div>{{ scope.row.phone }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="scanDataTime"
        label="扫描数据"
        width="180">
      </el-table-column>
      <el-table-column
        width="180"
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
        width="100"
        label="价格">
        <template slot-scope="scope">
          <div>￥{{ scope.row.price }}</div>
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        label="收件人">
        <template slot-scope="scope">
          <div>{{ scope.row.consignee }}</div>
          <div>{{ scope.row.receivingTelephone }}</div>
        </template>
      </el-table-column>
      <el-table-column
        width="240"
        label="收件地址"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <div>{{ scope.row.province + scope.row.city + scope.row.detailAddress }}</div>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button class="el-icon-delete" @click="handleDeleteRow(scope.row.$index, scope.row)" type="text"></el-button>
        </template>
      </el-table-column>
    </el-table>


    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination> -->

    <el-row class="submit-btn">
      <el-button type="danger">总价：￥ 34545656.00，提交订单</el-button>
    </el-row>

  </div>
</template>
<script>
import { getSearchCart, deleteCart } from '@/service/http'
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      currentPage4: 4
    }
  },
  methods: {
    handleDeleteRow (index, item) {
      console.log(item)
      this.$confirm('是否删除该购物车?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteCart(index, item)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {        
        })
    },
    deleteCart (index, item) {
      let cartId = item.cartId
      deleteCart(cartId).then(res => {
        console.log(res)
        this.tableData.splice(index, 1)
      }).catch(err => {
        console.log(err)
      })
    },
    getCartData () {
      getSearchCart().then(res => {
        console.log(res)
        this.tableData = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    // handleSizeChange (val) {
    //   console.log(val)
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  created () {
    this.getCartData()
  }
}
</script>
<style lang="less" scoped>
.submit-btn,
.el-pagination {
  margin-top: 30px;
  text-align: right;
}
</style>

