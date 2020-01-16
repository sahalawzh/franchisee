import storage from '@/utils/storage'
export default {
  data () {
    return {
      csrfToken: {}
    }
  },
  methods: {
    getCsrf () {
      try {
        const token = storage.get('gdlwzn_login') ? storage.get('gdlwzn_login').token : ''
        this.csrfToken = {
          'token': token
        }
        return this.csrfToken['token']
      } catch (e) {
        console.log(e)
        return ''
      }
    }
  },
  mounted () {
    this.getCsrf()
  }
}
