<template>
  <div class="page-order" v-loading="loading">
    <div class="main-title">选择本次打印的脚型数据</div>
    <div class="search-box">
      <el-form ref="phoneForm" :model="phoneForm" :rules="phoneRules">
        <el-form-item prop="phoneSingle">
          <el-input placeholder="输入用户手机号查找" v-model="phoneForm.phoneSingle">
          </el-input>
          <el-button type="primary" @click="handleSearchPhone">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-divider></el-divider>
    
    <el-table
      :data="scanData"
      style="width: 100%">
      <el-table-column
        label="手机号"
        width="240">
        <template slot-scope="scope">
          <el-radio v-model="scan.scanId" @change="handleScan" :label="scope.row.id">&nbsp;</el-radio>{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名"
        width="220">
      </el-table-column>
      <el-table-column
        prop="deviceNum"
        label="扫描设备"
        width="220">
      </el-table-column>
      <el-table-column
        label="扫描时间">
        <template slot-scope="scope">
          <el-date-picker
          v-model="scope.row.scanTime"
          type="datetime"
          disabled
          placeholder="选择日期时间">
        </el-date-picker></template>
      </el-table-column>
    </el-table>

    <el-form ref="form" :model="form" :rules="rules" class="form-container" label-width="100px" label-position="left">
      <div class="form-title">填写客户资料</div>
      <el-form-item label="疾病类型" prop="diseaseId">
        <el-select v-model="form.diseaseId" placeholder="请选择疾病类型">
          <el-option 
            v-for="item in diseaseType.list"
            :key="item.id"
            :label="item.name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择尺码" prop="sizeId">
        <el-select v-model="form.sizeId" placeholder="请选择尺码">
          <el-option 
            v-for="item in size.list"
            :max="max"
            :key="item.id"
            :label="item.name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="功能" prop="functionId">
        <el-row>
          <el-col :span="3" class="func-item" v-for="item in func.list" :key="item.id">
            <el-image :src="item.image" class="func-img"></el-image>
            <div class="func-info">
              <div>{{ item.name }}</div>
              <div>{{ item.secondName }}</div>
              <el-radio v-model="form.functionId" :label="item.id">&nbsp;</el-radio>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="鞋型" prop="shoeId">
        <el-radio-group v-model="form.shoeId">
          <el-radio v-for="item in shoesType.list" :key="item.id" :label="item.id">{{ item.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="数量">
        <el-input-number v-model="form.num" :min="1" :max="10"></el-input-number>
      </el-form-item>
      <el-form-item label="收货人" prop="consignee">
        <el-input v-model="form.consignee" class="control" placeholder="请填写收货人"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone" class="control" placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item label="所在区域" prop="city">
        <el-cascader
          v-model="form.city"
          :options="areaData"
          @change="handleChange"></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="detailAddress">
        <el-input class="control-address" v-model="form.detailAddress"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
      
      
      <el-form-item>
        <!-- <el-col :span="6" class="op-btn">
          <el-button type="primary">加入购物车</el-button>
        </el-col> -->
        <el-col :span="6" class="op-btn">
          <el-button type="danger" @click="handleSubmit">立即结算</el-button>
        </el-col>
      </el-form-item>
    </el-form>

    <div class="cart-box">
      <img src="../../../assets/order/cart-settle.png" @click="handleToCart" class="cart-settle" alt="">
      <span class="cart-box__badge">{{ cartNum < 100 ? cartNum : '99+' }}</span>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { getListclassiFication, getListDstricts, getScanResultByPhone, postAddCart, getCartNum } from '@/service/http'
import storage from '@/utils/storage'
import isEmpty from '@/utils/isEmpty'

export default {
  data () {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    }
    return {
      loading: false,
      phoneForm: {
        phoneSingle: ''
      },
      phoneRules: {
        phoneSingle: [
          {validator: checkPhone, trigger: 'blur'}
        ]
      },
      scan: {
        scanId: '',
        scanTime: ''
      },
      form: {
        diseaseId: '',
        sizeId: '',
        functionId: '',
        shoeId: '',
        num: '',
        consignee: '',
        phone: '',
        city: [],
        detailAddress: '',
        remark: ''
      },
      rules: {
        diseaseId: [
          { required: true, message: '请选择疾病类型', trigger: 'change' }
        ],
        sizeId: [
          { required: true, message: '请选择尺码', trigger: 'change' }
        ],
        functionId: [
          { required: true, message: '请选择功能', trigger: 'change' }
        ],
        shoeId: [
          { required: true, message: '请选择鞋型', trigger: 'change' }
        ],
        consignee: [
          { required: true, message: '请填写收货人', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请选择所在区域', trigger: 'change' }
        ],
        detailAddress: [
          { required: true, message: '请填写详细地址', trigger: 'blur' },
          { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' }
        ]
      },
      max: 10,
      areaData: [],
      diseaseType: '',
      size: '',
      func: '',
      shoesType: '',
      scanData: [],
      cartNum: '',
    }
  },
  methods: {
    handleToCart () {
      this.$router.push({path: '/cart'})
    },
    handleScan (val) {
      this.scan.scanTime = this.scanData.filter(item => item.id === val)[0].scanTime
    },
    handleSubmit () {
      if (isEmpty(this.scan) || !this.scan.scanId) {
        this.$message({
          message: '脚型数据不能为空',
          type: 'warning'
        })
        return
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          const [ province, city ] = this.form.city
          const area = {
            province,
            city
          }
          const param = Object.assign({}, this.form, area, this.scan)
          console.log(param)
          postAddCart(param).then(res => {
            this.loading = false
            this.$router.push({path: '/cart'})
          }).catch(err => {
            this.loading = false
            console.log(err)
          })
        }
      })
    },
    handleSearchPhone () {
      this.$refs.phoneForm.validate((valid) => {
        if (valid) {
          const params = {
            phone: this.phoneForm.phoneSingle
          }
          getScanResultByPhone(params).then(res => {
            this.scanData = res.data
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    handleChange (val) {
      console.log(val)
    }
  },
  created () {
    const ficationParams = {
      linkType: 0
    }
    if (!storage.get('gdlwzn_login')) {
      window.location.href = 'index.html'
      return
    }
    let phone = storage.get('gdlwzn_login').phone
    const phoneScanParams = {
      phone
    }
    axios.all([getListclassiFication(ficationParams), getListDstricts(), getScanResultByPhone(phoneScanParams), getCartNum()]).then(res => {
      const [ diseaseType, size, func, shoesType] = res[0].data
      this.diseaseType = diseaseType
      this.size = size
      this.func = func
      this.shoesType = shoesType
      res[1].data.forEach(item => {
        item.value = item.label = item.name
        item.children = []
        item.list.forEach(_item => {
          item.children.push({
            value: _item.name,
            label: _item.name
          })
        })
      })
      this.areaData = res[1].data
      this.scanData = res[2].data
      this.cartNum = res[3].data
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style lang="less" scoped>
.page-order {
  position: relative;
  .cart-box {
    position: fixed;
    right: 60px;
    bottom: 120px;
    &__badge {
      position: absolute;
      right: 10px;
      top: 0;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #F34234;
      color: #fff;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
    }
  }
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
  .el-table th {
    text-align: center;
  }
  .form-container {
    .form-title {
      font-size: 16px;
      color: #000;
      margin: 26px 0;
    }
    .func-item {
      margin-right: 14px;
    }
    .func-img {
      display: block;
    }
    .func-info {
      line-height: 22px;
      font-size: 14px;
      color: #333;
      text-align: center;
      margin-top: 8px;
      .el-radio {
        margin-top: 10px;
      }
    }
    .el-cascader,
    .control {
      width: 300px;
    }
    .control-address {
      width: 80%;
    }
    .op-btn {
      margin-right: 40px;
      button {
        width: 100%;
      }
    }
  }
}
</style>
