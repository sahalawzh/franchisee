<template>
  <div class="form-container">
    <div class="form-container__title">填写注册信息</div>
    <el-divider></el-divider>
    
    <el-form label-width="120px" label-position="left">

      <el-form-item label="姓名">
        <el-input class="control" placeholder="请填写真实姓名"></el-input>
      </el-form-item>
      
      <el-form-item label="身份证号码">
        <el-input class="control" placeholder="请输入身份证号码"></el-input>
      </el-form-item>

      <el-form-item label="银行卡">
        <el-select class="card-box" placeholder="请选择银行卡">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <div>
          <el-input class="control" placeholder="请输入卡号"></el-input>
        </div>
      </el-form-item>

      <el-form-item label="所在区域">
        <el-cascader
          :options="areaData"></el-cascader>
      </el-form-item>

      <el-form-item label="详细地址">
        <el-input class="control-address"></el-input>
      </el-form-item>
    </el-form>
    
    <el-row class="submit-btn">
      <el-button type="primary" @click="handleSubmit">提交注册信息</el-button>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      areaData: []
    }
  },
  methods: {
    handleSubmit () {
      this.$router.push({path: '/succeed'})
    }
  }
}
</script>
<style lang="less">
.form-container {
  .card-box {
    margin-bottom: 8px;
  }
  .control {
    width: 30%;
  }
  .control-address {
    width: 50%;
  }
  .submit-btn {
    margin-left: 120px;
  }
}
</style>

