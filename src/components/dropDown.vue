<template>
  <div @click.stop>
    <span v-if="hasLogin">欢迎回来，<el-dropdown>
        <el-link :underline="false" type="primary" class="el-dropdown-link">{{ userName }}</el-link>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-tickets" @click.native="handleBack('')">我的订单</el-dropdown-item>
          <el-dropdown-item icon="el-icon-money" @click.native="handleBack('withdraw')" v-if="user.type === 3">提现（月结）</el-dropdown-item>
          <el-dropdown-item icon="el-icon-download" @click.native="handleBack('download')" v-if="user.type === 3">资料下载</el-dropdown-item>
          <el-dropdown-item icon="el-icon-user" @click.native="handleBack('person')" divided>个人资料</el-dropdown-item>
          <el-dropdown-item icon="el-icon-switch-button" @click.native="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
    <span v-else @click="handleOpenLogin"><el-link :underline="false" type="primary">登录</el-link></span>
  </div>
</template>
<script>
import storage from '@/utils/storage'
import auth from '@/utils/auth'
export default {
  props: {
    isIndex: {
      type: Boolean,
      default: false
    },
    isLogin: Boolean
  },
  created () {
  },
  data () {
    return {
      hasLogin: false
    }
  },
  methods: {
    handleBack (router) {
      window.location.href = `/backend.html#/${router}`
    },
    handleLogout () {
      storage.remove('gdlwzn_login')
      if (this.isIndex) {
        this.$emit('login-status', { loginStatus: false })
        this.hasLogin = false
      } else {
        window.location.href = `/index.html`
      }
    },
    handleOpenLogin () {
      if (this.isIndex || window.location.pathname === '/index.html') {
        this.$emit('login-status', { loginVisible: true })
      } else {
        window.location.href = `/index.html`
      }
    }
  },
  watch: {
    isLogin: {
      handler: function (val) {
        this.hasLogin = val || auth.checkAuth()
      },
      immediate: true
    }
  },
  computed: {
    user () {
      return this.hasLogin && storage.get('gdlwzn_login')
    },
    userName () {
      if (this.user) {
        return this.user.username
      } else {
        this.hasLogin = false
      }
    }
  }
}
</script>

