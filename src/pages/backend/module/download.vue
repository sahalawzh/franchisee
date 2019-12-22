<template>
  <div class="download-container">
    <el-row class="download-item">
      <el-col :span="12">
        <el-image :src="src"></el-image>
      </el-col>
      <el-col :span="12">
        <div class="download-desc">兰湾足行 3D打印定制功能鞋垫</div>
        <div class="download-title">加盟商手册</div>
        <div class="download-date">2019-11-11</div>
        <el-button type="danger">点击下载</el-button>
      </el-col>
    </el-row>
    <el-row class="download-item">
      <el-col :span="12">
        <div class="download-desc">兰湾足行 3D打印定制功能鞋垫</div>
        <div class="download-title">加盟商手册</div>
        <div class="download-date">2019-11-11</div>
        <el-button type="danger">点击下载</el-button>
      </el-col>
      <el-col :span="12">
        <el-image :src="src"></el-image>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    }
  }
}
</script>
<style lang="less" scoped>
.download-container {
  padding: 60px;
  .download-item {
    margin-bottom: 60px;
  }
  .el-image {
    width: 80%;
  }
  .download-desc {
    font-size: 18px;
    color: #333;
    margin-top: 5%;
    margin-bottom: 8px;
  }
  .download-title {
    font-size: 30px;
    color: #333;
  }
  .download-date {
    font-size: 16px;
    color: #999;
    margin-top: 12px;
    margin-bottom: 6%;
  }
  .el-button {
    width: 140px;
  }
}
</style>

