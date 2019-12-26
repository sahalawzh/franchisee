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
        <div class="value-content">{{ message.username }}</div>
      </div>
      <div class="info-detail__item">
        <div class="label-name">电话</div>
        <div class="value-content">{{ message.phone }}</div>
      </div>
      <div class="info-detail__item">
        <div class="label-name">银行卡</div>
        <div class="value-content">
          <div class="back-name">交通银行<el-button type="text" class="bind-link">点击下载</el-button></div>
          <div>1666665555</div>
        </div>
      </div>
      <div class="info-detail__item">
        <div class="label-name">地址</div>
        <div class="value-content">
          <div class="address-item">
            <div class="address-item__name">xx（收）</div>
            <div class="address-item__detail">广东  佛山市  时代创业小镇   18144506663</div>
            <div class="address-item__action">
              <el-button type="text">修改</el-button><el-divider direction="vertical"></el-divider><el-button type="text">删除</el-button>
            </div>
          </div>
          <div class="address-item">
            <div class="address-item__name">xx（收）</div>
            <div class="address-item__detail">广东  佛山市  时代创业小镇   18144506663</div>
            <div class="address-item__action">
              <el-button type="text">修改</el-button><el-divider direction="vertical"></el-divider><el-button type="text">删除</el-button>
            </div>
          </div>
          <!-- <el-link class="el-icon-plus" type="primary" @click="handleAddAdress">添加新地址</el-link> -->
        </div>
      </div>
      <div class="info-detail__item">
        <div class="label-name">加盟协议</div>
        <div class="value-content"><el-button type="text" class="down-btn">点击下载</el-button></div>
      </div>
    </div>

    <el-dialog title="收货地址" class="address-dialog" :visible.sync="dialogFormVisible">
      <el-form :model="addressForm" label-width="100px" >
        <el-form-item label="收货人">
          <el-input v-model="addressForm.consignee" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="addressForm.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在区域" prop="city">
          <el-cascader
            v-model="addressForm.city"
            :options="areaData"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input class="control-address" v-model="addressForm.detailAddress"></el-input>
        </el-form-item>
        <el-form-item>
          <el-switch
            v-model="addressForm.default"
            active-text="设置为默认收货地址">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getMemberMessage } from '@/service/http'
export default {
  data () {
    return {
      message: '',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      dialogFormVisible: false,
      addressForm: {
        consignee: '',
        tel: '',
        area: '',
        detailAddress: '',
        default: true
      },
      areaData: []
    }
  },
  methods: {
    handleAddAdress () {
      this.dialogFormVisible = true
    },
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

<style lang="less" scope>
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
    .down-btn {
      margin-top: -15px;
    }
    .address-item {
      position: relative;
      padding-bottom: 16px;
      border-bottom: 1px solid #eee;
      &:not(:first-child) {
        margin-top: 20px;
      }
      &__name {
        font-size: 16px;
        color: #333;
        margin-bottom: 8px;
      }
      &__detail {
        font-size: 14px;
        color: #333;
      }
      &__action {
        position: absolute;
        bottom: 16px;
        right: 40px;
      }
    }
  }
}
.address-dialog {
  .el-dialog {
    width: 40%;
  }
  .el-cascader,
  .el-input {
    width: 240px;
  }
  .control-address {
    width: 90%;
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>

