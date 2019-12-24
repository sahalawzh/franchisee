import auth from '@/utils/auth'

export default {
  created () {
    this.isLogin = auth.checkAuth()
  },
  data () {
    return {
      loginVisible: false,
      isLogin: false
    }
  },
  methods: {
    handleLoginStatus ({ loginStatus, loginVisible }) {
      this.isLogin = loginStatus
      this.loginVisible = loginVisible
    }
  }
}