<template>
  <div>
    <el-row>
      <el-col :span="10" class="statistics-item">
        <div class="statistics-item__count"><span>￥</span>618</div>
        <div>总收入</div>
      </el-col>
      <el-col :span="10" class="statistics-item">
        <div class="statistics-item__count"><span>￥</span>618</div>
        <div>已兑现</div>
      </el-col>
    </el-row>
    <div class="tip">注：每月15日，结算上一个月的工资，逢节假日顺延至下一个工作日</div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="月份"
        width="220">
      </el-table-column>
      <el-table-column
        prop="price"
        label="工资"
        width="220">
      </el-table-column>
      <el-table-column
        width="220"
        label="业绩详情">
        <template slot-scope="scope">
          <div>{{ scope.row.symptom }}</div>
          <div>{{ scope.row.size }}</div>
          <div>{{ scope.row.group }}</div>
          <div>{{ scope.row.type }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="提现">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">提现</el-button>
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
      tableData: [{
        date: '2019-10-11 10:22:00',
        symptom: '扁平足',
        size: '42号',
        group: '儿童',
        type: '皮鞋',
        num: 1,
        price: 266
      }],
      currentPage4: 4
    };
  },
  methods: {
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
.statistics-item {
  position: relative;
  text-align: center;
  &:first-child::after {
    content: '';
    position: absolute;
    top: 40%;
    bottom: 20%;
    right: 0;
    width: 1px;
    background-color: #ccc;
  }
  &__count {
    color: #F34234;
    font-size: 48px;
    padding-top: 40px;
    span {
      font-size: 24px;
    }
  }
}
.tip {
  font-size: 16px;
  color: #999;
  margin: 56px 0 20px;
}
.el-pagination {
  margin-top: 30px;
  text-align: right;
}
</style>
