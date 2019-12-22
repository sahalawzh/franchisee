import storage from '@/utils/storage'
import auth from '@/utils/auth'

export default {
  computed: {
    hasLogin () {
      return auth.checkAuth()
    },
    user () {
      return this.hasLogin && storage.get('gdlwzn_login') 
    }
  }
}