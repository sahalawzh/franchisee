<template>
  <div>
    <div>加盟商资料</div>
    <el-divider></el-divider>
    <div class="info-detail">
      <div class="info-detail__item">
        <div class="label-name">当前头像</div>
        <div class="value-content"><el-avatar :size="50" :src="message.avatar"/></div>
      </div>
      <div class="info-detail__item">
        <div class="label-name">姓名</div>
        <div class="value-content">{{ message.realname }}</div>
      </div>
      <div class="info-detail__item">
        <div class="label-name">电话</div>
        <div class="value-content">{{ message.phone }}</div>
      </div>
      <div class="info-detail__item">
        <div class="label-name">银行卡</div>
        <div class="value-content">
          <div class="back-name">交通银行<el-link class="bind-link" type="primary">点击绑定</el-link></div>
          <div>1666665555</div>
        </div>
      </div>
      <div class="info-detail__item">
        <div class="label-name">地址</div>
        <div class="value-content">广东省佛山市</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getMemberMessage } from '@/service/http'
export default {
  data () {
    return {
      message: '',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }
  },
  methods: {
    getMemberMessage () {
      getMemberMessage().then(res => {
        const data = res.data
        this.message = data
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.getMemberMessage()
  }
}
</script>

<style lang="less" scoped>
.info-detail {
  padding-left: 20px;
  &__item {
    position: relative;
    margin-bottom: 40px;
    .label-name {
      position: absolute;
      left: 0;
      font-size: 16px;
      color: #787878;
    }
    .value-content {
      padding-left: 120px;
    }
    .back-name {
      margin-bottom: 10px;
    }
    .bind-link {
      margin-left: 10%;
    }
  }
}
</style>

