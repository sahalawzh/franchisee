import storage from '@/utils/storage'

const auth = {
  user: {
    authenticated: false
  },
  checkAuth () {
    return this.user.authenticated
  },
  refreshAuth () {
    let _token = storage.get('gdlwzn_login')
    if (_token){
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  }
}
auth.refreshAuth()
export default auth
