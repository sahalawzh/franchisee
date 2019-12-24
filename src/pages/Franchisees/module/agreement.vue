<template>
  <el-row class="submit-btn">
    <el-button type="primary" @click="handleToAgree">加盟费用：￥ 34545656.00，去缴纳</el-button>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleToAgree () {
      this.$router.push({path: '/payment'})
    }
  }
}
</script>
