<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="待付款" name="awaitPay"></el-tab-pane>
      <el-tab-pane label="待发货" name="awaitShipped"></el-tab-pane>
      <el-tab-pane label="已发货" name="shipped"></el-tab-pane>
    </el-tabs>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="用户"
        width="140">
      </el-table-column>
      <el-table-column
        prop="scan"
        label="扫描数据"
        width="220">
      </el-table-column>
      <el-table-column
        width="220"
        label="客户资料">
        <template slot-scope="scope">
          <div>{{ scope.row.info.symptom }}</div>
          <div>{{ scope.row.info.size }}</div>
          <div>{{ scope.row.info.group }}</div>
          <div>{{ scope.row.info.type }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="num"
        width="140"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="price"
        width="140"
        label="价格">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'all',
      tableData: [{
        name: '李某某',
        tel: '1688816888',
        scan: '2019-10-11 10:22:00',
        info: {
          symptom: '扁平足',
          size: '42号',
          group: '儿童',
          type: '皮鞋'
        },
        num: 1,
        price: 266
      }],
      currentPage4: 4
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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

