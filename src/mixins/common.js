import { getRegisterCode, getVerify, getLoginCode } from '@/service/http'
import randomCode from '@/utils/randomCode'

export default {
  data () {
    return {
      randomCodeSrc: '',
      disabledBtn: false,
      codeBtnText: '发送验证码'
    }
  },
  created () {
    this.handleGetVerify()
  },
  methods: {
    handleGetVerify () {
      this.form.checkCode = randomCode()
      let param = {
        checkCode: this.form.checkCode
      }
      getVerify(param).then(res => {
        this.randomCodeSrc = res.url
      }).catch(err => {
        console.log(err)
      })
    },
    handleRandomCode () {
      this.handleGetVerify()
    },
    handleGetCode (phone, type) {
      this.$refs.form.validateField('phone', (errMsg) => {
        if (!errMsg && !this.disabledBtn) {
          this.disabledBtn = true
          let timer = null
          const separationTime = process.env.NODE_ENV === 'development' ? 100 : 1000
          let time = 60
          let API = type === 'login' ? getLoginCode : getRegisterCode
          API({ phone }).then(res => {
            this.$message({
              message: '消息已发送',
              type: 'success'
            })
            clearInterval(timer)
            timer = setInterval(() => {
              const currentTime = time--
              if (currentTime === 0) {
                clearInterval(timer)
                this.disabledBtn = false
                this.codeBtnText = `重新获取`
                return
              }
              this.codeBtnText = `${currentTime}s后获取`
            }, separationTime)
          }).catch(err => {
            console.log(err)
            clearInterval(timer)
            this.disabledBtn = false
            this.codeBtnText = `重新获取验证码`
          })
        }
      })
    }
  }
}