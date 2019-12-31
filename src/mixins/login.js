import auth from '@/utils/auth'
import storage from '@/utils/storage'

export default {
  created () {
    this.isLogin = auth.checkAuth()
    if (this.isLogin) {
      this.role = storage.get('gdlwzn_login').type
    }
  },
  data () {
    return {
      loginVisible: false,
      isLogin: false,
      role: 0
    }
  },
  methods: {
    handleLoginStatus ({ loginStatus, loginVisible }) {
      this.isLogin = loginStatus
      this.loginVisible = loginVisible
    }
  }
}