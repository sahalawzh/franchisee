<template>
  <div>
    <el-table
      v-loading="loading"
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
        prop="scanTime"
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


    <el-pagination
      v-if="totalCount"
      @current-change="handleCurrentChange"
      :current-page="curtPage"
      :page-sizes="[limit, 200, 300, 400]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>

    <el-row class="submit-btn">
      <el-button type="danger" :loading="btnLoading" @click="handleToSubmit" :disabled="!ids">总价：￥{{ countPrice }}，提交订单</el-button>
    </el-row>

  </div>
</template>
<script>
import { getSearchCart, deleteCart, getCartPrice, postAddOrder } from '@/service/http'
export default {
  data () {
    return {
      tableData: [],
      multipleCart: [],
      curtPage: 1,
      limit: 2,
      totalCount: 1,
      countPrice: '0.00',
      ids: '',
      loading: false,
      btnLoading: false
    }
  },
  methods: {
    handleToSubmit () {
      this.btnLoading = true
      let ids = this.ids
      postAddOrder({ ids }).then(res => {
        console.log(res)
        let orderNo = res.data
        this.btnLoading = false
        this.$router.push({name: 'pay', query: { orderNo, orderType: 0 } })
      }).catch(err => {
        this.btnLoading = false
        console.log(err)
      })
    },
    handleDeleteRow (index, item) {
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
        this.tableData.splice(index, 1)
      }).catch(err => {
        console.log(err)
      })
    },
    getCartData () {
      const { curtPage, limit } = this
      const params = {
        curtPage,
        limit
      }
      this.loading = true
      getSearchCart(params).then(res => {
        const { carts, totalCount } = res.data
        this.tableData = carts
        this.totalCount = totalCount
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    handleCurrentChange (val) {
      this.curtPage = val
      this.getCartData()
    },
    handleCartPrice () {
      let ids = []
      this.multipleCart.forEach(item => {
        ids.push(item.cartId)
      })
      const param = {
        ids: ids.join('_'),
        orderType: 0
      }
      getCartPrice(param).then(res => {
        this.countPrice = res.data
        this.ids = param.ids
      }).catch(err => {
        console.log(err)
      })
    },
    handleSelectionChange(val) {
      this.multipleCart = val
      this.handleCartPrice()
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

