<template>
  <el-container class="page-backend">
    <default-header></default-header>

    <el-container>
      <el-aside width="200px">
        <div class="person-info">
          <img src="../../assets/common/head-photo.png" alt="" />
          <div class="greet-word">欢迎回来</div>
          <div class="user-name">{{ username }}</div>
        </div>
        <el-menu router :default-active="$route.path">
          <el-menu-item index="/">
            <i class="el-icon-tickets"></i>
            <span slot="title">我的订单</span>
          </el-menu-item>
          <el-menu-item index="/withdraw" v-if="role === 3">
            <i class="el-icon-money"></i>
            <span slot="title">提现(月结)</span>
          </el-menu-item>
          <el-menu-item index="/download" v-if="role === 3">
            <i class="el-icon-download"></i>
            <span slot="title">资料下载</span>
          </el-menu-item>
          <el-menu-item index="/person">
            <i class="el-icon-user"></i>
            <span slot="title">个人资料</span>
          </el-menu-item>
          <el-menu-item index="/service">
            <i class="el-icon-s-cooperation"></i>
            <span slot="title">加盟服务</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="main-section">
          <router-view />
        </div>
      </el-main>
    </el-container>

    <!-- <el-footer height="200px">Footer</el-footer> -->
    <default-footer></default-footer>
  </el-container>
</template>
<script>
import DefaultHeader from "@/components/defaultHeader";
import DefaultFooter from "@/components/defaultFooter";
import storage from "@/utils/storage";
export default {
  components: {
    DefaultHeader,
    DefaultFooter
  },
  computed: {},
  data() {
    return {
      role: 0,
      username: ""
    };
  },
  created() {
    if (storage.get("gdlwzn_login")) {
      const { type, username } = storage.get("gdlwzn_login");
      this.role = type;
      this.username = username;
    }
  },
  methods: {}
};
</script>

<style lang="less">
.page-backend {
  flex-direction: column !important;
}
.el-aside {
  background-color: #205299;
  color: #333;
  text-align: center;
  min-height: calc(100vh - 90px);
  text-align: right;
  .person-info {
    margin: 40px 40px 32px;
    color: #fff;
    display: inline-block;
    text-align: center;
    .greet-word {
      font-size: 16px;
      margin: 10px 0;
    }
    .user-name {
      font-size: 18px;
      font-weight: 600;
    }
  }
  .el-menu {
    background-color: #205299;
    border-right: solid 1px #205299;
  }
  .el-menu-item {
    color: #fff;
    font-size: 16px;
    padding: 0 40px 0 20px;
    i {
      color: #fff;
      line-height: 1.2em;
    }
    &.is-active,
    &:hover,
    &:focus,
    &:active {
      color: #fff !important;
      background-color: #1c4b8e !important;
    }
  }
}
.el-main {
  background-color: #f2f2f2;
  .main-section {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px 0px rgba(10, 2, 5, 0.05);
    padding: 24px 20px 40px 40px;
    .main-title {
      color: #000;
    }
    .search-box {
      margin-top: 10px;
      .el-input {
        width: 300px;
        margin-right: 10px;
      }
    }
  }
}
</style>
