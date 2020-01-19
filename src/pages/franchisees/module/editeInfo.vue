<template>
  <div class="form-container">
    <div class="form-container__title">填写注册信息</div>

    <el-radio-group v-model="form.franchiseeType" :disabled="processType === 0"  @change="handleChangeFranchiseeType">
      <el-radio :label="0">个人</el-radio>
      <el-radio :label="1">公司</el-radio>
    </el-radio-group>
    <el-divider></el-divider>
    
    <el-form label-width="120px" ref="form" :hide-required-asterisk="true"  label-position="left" :model="form"  :rules="ruleForm">

      <template v-if="form.franchiseeType === 0">

        <el-form-item label="姓名" prop="name">
          <el-input class="control" :disabled="processType === 0" v-model="form.name" placeholder="请填写真实姓名"></el-input>
        </el-form-item>
        
        <el-form-item label="身份证号码" prop="creditCard">
          <el-input class="control" :disabled="processType === 0" v-model="form.creditCard" placeholder="请输入身份证号码"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input class="control" :disabled="processType === 0" v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <!-- <el-form-item label="银行卡">
          <el-select class="card-box" placeholder="请选择银行卡">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <div>
            <el-input class="control" placeholder="请输入卡号"></el-input>
          </div>
        </el-form-item> -->

        <el-form-item label="上传个人身份证" prop="cardFrontImage">
          <el-upload
            class="avatar-uploader"
            :action="uploadAction"
            :show-file-list="false"
            :on-success="handleFrontImgSuccess"
            name="file"
            accept="image/*"
            :data="frontImg"
            :disabled="processType === 0"
            :headers="csrfToken"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.cardFrontImage" :src="form.cardFrontImage" class="upload_img">
            <template v-else>
              <img src="../../../assets/franchisees/f_card.png" class="upload_img">
              <p class="upload-text">上传身份证头像面</p>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item prop="cardBackImage">
          <el-upload
            class="avatar-uploader"
            :action="uploadAction"
            :show-file-list="false"
            :on-success="handleBackImgSuccess"
            name="file"
            accept="image/*"
            :data="backImg"
            :disabled="processType === 0"
            :headers="csrfToken"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.cardBackImage" :src="form.cardBackImage" class="upload_img">
            <template v-else>
              <img src="../../../assets/franchisees/b_card.png" class="upload_img">
              <p class="upload-text">上传身份证国徽面</p>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item label="所在区域" prop="city">
          <el-cascader
            :disabled="processType === 0"
            v-model="form.city"
            :options="areaData"></el-cascader>
        </el-form-item>

        <el-form-item label="详细地址" prop="detailAddress">
          <el-input class="control-address" :disabled="processType === 0" v-model="form.detailAddress" placeholder="请输入详细地址"></el-input>
        </el-form-item>

      </template>

      <template v-if="form.franchiseeType === 1">

        <el-form-item label="代办人姓名" prop="name">
          <el-input class="control" :disabled="processType === 0" v-model="form.name" placeholder="请填写真实姓名"></el-input>
        </el-form-item>
        
        <el-form-item label="代办人身份证" prop="creditCard">
          <el-input class="control" :disabled="processType === 0" v-model="form.creditCard" placeholder="请输入身份证号码"></el-input>
        </el-form-item>

        <el-form-item label="代办人手机号" prop="phone">
          <el-input class="control" :disabled="processType === 0" v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        
        <el-form-item label="公司名称" prop="companyName">
          <el-input class="control" :disabled="processType === 0" v-model="form.companyName" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        
        <el-form-item label="上传法人身份证" prop="cardFrontImage">
          <el-upload
            class="avatar-uploader"
            :action="uploadAction"
            :show-file-list="false"
            :on-success="handleFrontImgSuccess"
            :disabled="processType === 0"
            name="file"
            accept="image/*"
            :data="frontImg"
            :headers="csrfToken"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.cardFrontImage" :src="form.cardFrontImage" class="upload_img">
            <template v-else>
              <img src="../../../assets/franchisees/f_card.png" class="upload_img">
              <p class="upload-text">上传身份证头像面</p>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item prop="cardBackImage">
          <el-upload
            class="avatar-uploader"
            :action="uploadAction"
            :show-file-list="false"
            :on-success="handleBackImgSuccess"
            :disabled="processType === 0"
            name="file"
            accept="image/*"
            :data="backImg"
            :headers="csrfToken"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.cardBackImage" :src="form.cardBackImage" class="upload_img">
            <template v-else>
              <img src="../../../assets/franchisees/b_card.png" class="upload_img">
              <p class="upload-text">上传身份证国徽面</p>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item label="上传营业执照" prop="businessLicense">
          <el-upload
            class="avatar-uploader"
            :action="uploadAction"
            :show-file-list="false"
            :on-success="handleBusinessSuccess"
            name="file"
            :data="businessImg"
            :disabled="processType === 0"
            accept="image/*"
            :headers="csrfToken"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.businessLicense" :src="form.businessLicense" class="upload_img">
            <template v-else>
              <img src="../../../assets/franchisees/business_card.png" class="upload_img">
              <p class="upload-text">上传营业执照</p>
            </template>
          </el-upload>
        </el-form-item>

      </template>
    </el-form>
    
    <el-row class="submit-btn">
      <el-button type="primary" :loading="submitBtnLoading" :disabled="processType === 0" @click="handleSubmit">{{processType === 0 ? '已' : ''}}确认信息</el-button>
      <div class="submit-btn__tip" v-if="processType === 0">我们将在3个工作日内完成对您资料的审核</div>
    </el-row>
  </div>
</template>
<script>
import { v1 } from '@/service/api'
import csrf from '@/utils/csrf'
import { getListDstricts, postAddFranchisee, getSearchFranchisee, putUpdateFranchisee } from '@/service/http'

export default {
  mixins: [csrf],
  data () {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    var checkCreditCard = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身份证号码不能为空'))
      } else {
        const reg = /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}[\dXx]$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的身份证号码'))
        }
      }
    }
    return {
      areaData: [],
      frontImg: {
        code: 0
      },
      backImg: {
        code: 1
      },
      businessImg: {
        code: 2
      },
      form: {
        franchiseeType: 0,
        name: '',
        phone: '',
        creditCard: '',
        city: [],
        detailAddress: '',
        companyName: '',
        businessLicense: '',
        cardBackImage: '',
        cardFrontImage: ''
      },
      ruleForm: {
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 2, max: 9, message: '长度在 2 到 9 个字符', trigger: 'blur' }
        ],
        phone: [
          {validator: checkPhone, trigger: 'blur'}
        ],
        creditCard: [
          {validator: checkCreditCard, trigger: 'blur'}
        ],
        city: [
          { required: true, message: '请选择所在区域', trigger: 'change' }
        ],
        detailAddress: [
          { required: true, message: '请填写详细地址', trigger: 'blur' },
          { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
        ],
        businessLicense: [
          { required: true, message: '请上传营业执照', trigger: 'change' }
        ],
        cardBackImage: [
          { required: true, message: '请上传身份证国徽面', trigger: 'change' }
        ],
        cardFrontImage: [
          { required: true, message: '请上传身份证头像面', trigger: 'change' }
        ]
      },
      uploadAction: '',
      submitBtnLoading: false,
      processType: null
    }
  },
  created () {
    this.uploadAction = process.env.NODE_ENV === 'development' ? v1.POST_UPLOAD_IMAGE : process.env.VUE_APP_BASE_API + v1.POST_UPLOAD_IMAGE
    this.handleChangeDstricts()
    this.getSearchFranchisee()
  },
  watch: {
    processType (val) {
      if (val === 1) {
        window.location.href = 'backend.html#/service'
      }
    }
  },
  methods: {
    getSearchFranchisee (status) {
      getSearchFranchisee().then(res => {
        if (res.data) {
          const { processType, id, franchiseeType, name = '', phone, creditCard, provinceId = '', cityId = '', detailAddress = '', companyName = '', businessLicense = '', cardBackImage = '', cardFrontImage = ''  } = res.data
          this.processType = processType
          if (processType === 2 || processType === 0) {
            this.form = {
              id,
              franchiseeType: Number(franchiseeType),
              name,
              phone,
              creditCard,
              city: [provinceId, cityId],
              detailAddress,
              companyName,
              businessLicense,
              cardBackImage,
              cardFrontImage
            }
            return
          }
          // 1是创建成功 0是失败 2是已经注册过
          if (status === 0) {
            this.$notify.error({
              title: '温馨提示',
              message: '创建加盟商失败'
            })
          }
          if (status === 1) {
            const that = this
            this.$notify({
              title: '温馨提示',
              message: '创建加盟商成功',
              type: 'success',
              onClose () {
                that.$router.push({path: '/payment'})
              }
            })
          }
          if (status === 2) {
            this.$notify({
              title: '温馨提示',
              message: '该加盟商已经注册过',
              type: 'warning'
            })
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleChangeFranchiseeType (val) {
      this.$refs['form'].clearValidate()
    },
    handleChangeDstricts () {
      getListDstricts().then(res => {
        res.data.forEach(item => {
          item.value = item.id
          item.label = item.name
          item.children = []
          item.list.forEach(_item => {
            item.children.push({
              value: _item.id,
              label: _item.name
            })
          })
        })
        this.areaData = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleFrontImgSuccess(res, file) {
      this.form.cardFrontImage = res.data
    },
    handleBackImgSuccess(res, file) {
      this.form.cardBackImage = res.data
      console.log(this.form.cardBackImage)
    },
    handleBusinessSuccess(res, file) {
      this.form.businessLicense = res.data
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let param = ''
          const {
            franchiseeType,
            name,
            phone,
            creditCard,
            city,
            detailAddress,
            companyName,
            businessLicense,
            cardBackImage,
            cardFrontImage,
            id
          } = this.form
          if (franchiseeType === 0) {
            const [ provinceId, cityId ] = city
            param = {
              franchiseeType,
              name,
              phone,
              creditCard,
              provinceId,
              cityId,
              detailAddress,
              cardFrontImage,
              cardBackImage
            }
          }
          if (franchiseeType === 1) {
            param = {
              franchiseeType,
              name,
              phone,
              creditCard,
              companyName,
              businessLicense,
              cardBackImage,
              cardFrontImage
            }
          }
          if (this.processType === 2) {
            param.id = id
          }
          this.submitBtnLoading = true
          const API = this.processType === 2 ? putUpdateFranchisee : postAddFranchisee
          API(param).then(res => {
            console.log(res)
            this.getSearchFranchisee(res.data)
            this.submitBtnLoading = false
          }).catch(err => {
            this.submitBtnLoading = false
            console.log(err)
          })
        }
      })
    }
  }
}
</script>
<style lang="less">
.form-container {
  &__title {
    margin-bottom: 20px;
  }
  .card-box {
    margin-bottom: 8px;
  }
  .control {
    width: 30%;
  }
  .control-address {
    width: 50%;
  }
  .submit-btn {
    margin-left: 120px;
    &__tip {
      font-size: 14px;
      color: #ccc;
      margin-top: 10px;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px solid #E5E5E5;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    .upload_img {
      padding: 16px 50px;
      width: 240px;
      height: 150px;
      display: block;
    }
    .upload-text {
      color: #0197D6;
      font-size: 12px;
    }
  }
}
</style>

