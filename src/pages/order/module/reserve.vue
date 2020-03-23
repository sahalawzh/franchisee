<template>
  <div class="page-reserve"
       v-loading="loading">
    <div class="main-title">选择本次打印的脚型数据</div>
    <el-row>
      <div class="panel-item">
        <div class="panel-item__hd">
          收货人信息
          <span class="op-text"
                v-if="addressList.length < 5"
                @click="handleOpAdress">新增收货地址</span>
        </div>
        <el-row>
          <template v-if="addressList.length">
            <el-col :md="6"
                    :sm="8"
                    :xs="12"
                    v-for="(item, index) in addressList"
                    :key="index">
              <div class="address-item">
                <el-radio v-model="selectAddressId"
                          @change="handleChangeAddress"
                          :label="item.id"
                          border>
                  <div class="address-item__hd">
                    <el-tag size="small"
                            class="tag-name"
                            v-if="item.isDefault === 0">默认</el-tag>
                    <span class="concat-info">{{item.recipient}}（收）</span>
                  </div>
                  <div class="address-item__bd">
                    <div class="value-detail">
                      <i class="el-icon-map-location icon-address"></i>
                      <span>{{ item.province }}{{ item.city }}{{ item.detailAddress }}</span>
                    </div>
                    <div class="value-detail">
                      <i class="el-icon-mobile-phone"></i>
                      <span>{{ item.phone }}</span>
                    </div>
                  </div>
                  <div class="address-item__ft">
                    <el-button type="text"
                               @click="handleOpAdress(item)">修改</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="text"
                               @click="handleDelAdress(item.id)">删除</el-button>
                  </div>
                </el-radio>
              </div>
            </el-col>
          </template>
          <div v-else
               class="address-empty">暂无收获地址</div>
        </el-row>
      </div>
    </el-row>
    <!-- <el-row>
      <div class="panel-item">
        <div class="panel-item__hd">
          优惠券
          <span class="op-text">点击使用优惠券</span>
        </div>
        <div class="panel-item__bd">
          暂无使用优惠券
        </div>
      </div>
    </el-row>
    <el-row>
      <div class="panel-item">
        <div class="panel-item__hd">
          发票信息
          <span class="op-text op-text-sider">使用其他发票信息</span>
          <span class="op-text">新增发票信息</span>
        </div>
        <div class="panel-item__bd">
          暂无使用优惠券
        </div>
      </div>
    </el-row> -->
    <el-row class="product-title">商品信息</el-row>
    <el-table :data="tableData"
              class="table-data"
              style="width: 100%">
      <el-table-column label="打印商品">
        <template slot-scope="scope">
          <div class="table-product">
            <el-image :src="scope.row.image"
                      fit="cover"
                      alt="" />
            <span>{{ scope.row.titleName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="打印参数">
        <template slot-scope="scope">
          <div class="table-param">
            <div class="table-param__item">
              <span class="params-label">扫描时间</span>{{ scope.row.scanTime }}
            </div>
            <div class="table-param__item">
              <span class="params-label">人群</span> {{ scope.row.crowdName }}
            </div>
            <div class="table-param__item">
              <span class="params-label">鞋群</span> {{ scope.row.shoeName }}
            </div>
            <div class="table-param__item">
              <span class="params-label">功能</span>
              {{ scope.row.functionName }}
            </div>
            <div class="table-param__item">
              <span class="params-label">鞋码</span> {{ scope.row.sizeName }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="打印单价">
        <template slot-scope="scope">
          <div class="product-cell">￥{{ scope.row.price }}</div>
        </template>
      </el-table-column>
      <el-table-column label="打印数量"
                       prop="num">
        <template slot-scope="scope">
          <div class="product-cell">
            <el-input-number v-model="num"
                             size="small"
                             :min="min"
                             @change="handleChangeNum"></el-input-number>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="合计">
        <template slot-scope="scope">
          <div class="product-cell">￥{{ totalPrice }}</div>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="table-foot">
      <el-col :span="12">
        <div class="textarea-box">
          <div class="textarea-box__label">备注</div>
          <el-input type="textarea"
                    resize="none"
                    :rows="2"
                    placeholder="选填，请先与客服协商一致"
                    v-model="remark">
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row class="reserve-foot"
            type="flex"
            align="middle"
            justify="end">
      <div>
        <span>实付金额：</span>
        <span class="real-price">￥999</span>
      </div>
      <el-button type="danger"
                 :loading="submitLoading"
                 @click="handleToPay">确认支付</el-button>
    </el-row>

    <el-dialog title="收货地址"
               class="address-dialog"
               :visible.sync="dialogAddressVisible">
      <el-form :model="addressForm"
               label-width="100px"
               ref="addressForm"
               :hide-required-asterisk="true"
               :rules="ruleAddress">
        <el-form-item label="收货人"
                      prop="recipient">
          <el-input v-model="addressForm.recipient"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话"
                      prop="phone">
          <el-input v-model="addressForm.phone"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在区域"
                      prop="city">
          <el-cascader v-model="addressForm.city"
                       :options="areaData"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址"
                      prop="detailAddress">
          <el-input class="control-address"
                    v-model="addressForm.detailAddress"></el-input>
        </el-form-item>
        <el-form-item>
          <el-switch v-model="addressForm.isDefault"
                     :active-value="0"
                     :inactive-value="1"
                     active-text="设置为默认收货地址">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     :loading="addressBtnLoading"
                     @click="handleSubmitAddress">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  postAddCart,
  putUpdateNum,
  getCartPrice,
  getAddress,
  postAddressAdd,
  getListDstricts,
  postAddOrder,
  deleteAddressDelete,
  putAddressUpdate
} from "@/service/http";
import axios from 'axios';
export default {
  data () {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    var checkCity = (rule, value, callback) => {
      value = value.filter(Boolean)
      if (!value.length) {
        return callback(new Error('请选择所在区域'));
      }
      callback()
    }
    return {
      tableData: [],
      orderInfo: "",
      loading: false,
      min: 1,
      totalPrice: "",
      num: 1,
      addressInfo: "",
      dialogAddressVisible: false,
      addressForm: {
        recipient: "",
        phone: "",
        city: [],
        isDefault: 1,
        detailAddress: ""
      },
      areaData: [],
      addressBtnLoading: false,
      ruleAddress: {
        recipient: [
          { required: true, message: "请输入收货人", trigger: "blur" },
          { min: 2, max: 9, message: "长度在 2 到 9 个字符", trigger: "blur" }
        ],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        city: [
          { validator: checkCity, trigger: 'change' }
        ],
        detailAddress: [
          { required: true, message: "请填写详细地址", trigger: "blur" },
          {
            min: 2,
            max: 80,
            message: "长度在 2 到 80 个字符",
            trigger: "blur"
          }
        ]
      },
      remark: "",
      addressList: [],
      selectAddressId: '',
      submitLoading: false
    };
  },
  methods: {
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
    async handleOpAdress (item) {
      if (item) {
        const { recipient, phone, detailAddress, isDefault, provinceId, cityId, id } = item
        this.addressForm = {
          recipient,
          phone,
          detailAddress,
          city: [provinceId, cityId],
          id,
          isDefault
        }
      }
      await this.handleChangeDstricts()
      this.dialogAddressVisible = true
    },
    handleDelAdress (id) {
      this.$confirm('是否确认删除该地址？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAddressDelete(id).then(res => {
          console.log(res)
          this.getAddressList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(err => {
          console.log(err)
        })
      })
    },
    handleChangeAddress (id) {
      this.selectAddressId = id
    },
    handleToPay () {
      if (!this.addressList.length) {
        return this.$message({
          message: "请新增收获地址",
          type: "warning"
        });
      }
      if (!this.selectAddressId) {
        return this.$message({
          message: "请选择收获地址",
          type: "warning"
        });
      }
      const { selectAddressId, remark } = this
      const opts = {
        addressId: selectAddressId,
        remark
      }
      this.submitLoading = true
      postAddOrder(opts).then(res => {
        console.log(res)
        this.submitLoading = false
        let orderNo = res.data
        this.$router.push({ name: 'pay', query: { orderNo, orderType: 0 } })
      }).catch(err => {
        this.submitLoading = false
        console.log(err)
      })
    },
    handleSubmitAddress () {
      this.$refs.addressForm.validate(valid => {
        if (valid) {
          const [provinceId, cityId] = this.addressForm.city;
          const area = {
            provinceId,
            cityId
          };
          const params = Object.assign({}, this.addressForm, area);
          delete params.city;
          this.addressBtnLoading = true;
          let API_URL = this.addressForm.id ? putAddressUpdate : postAddressAdd
          API_URL(params)
            .then(res => {
              console.log(res);
              this.getAddressList();
              this.dialogAddressVisible = false;
              this.addressBtnLoading = false;
            })
            .catch(err => {
              this.addressBtnLoading = false;
              console.log(err);
            });
        }
      });
    },
    getAddressList () {
      getAddress().then(res => {
        let result = res.data || []
        this.addressList = result
        if (!this.addressList.length) {
          return this.handleOpAdress()
        }
        let defaultAddress = result.length && result.filter(item => item.isDefault === 0)
        defaultAddress = defaultAddress.length ? defaultAddress[0] : result[0]
        this.selectAddressId = defaultAddress.id
      }).catch(err => {
        console.log(err)
      })
    },
    handleChangeNum (val, oldVal) {
      let opts = {
        num: val
      };
      if (Math.abs(val - oldVal) > 1) {
        opts.cartType = 2;
      } else {
        if (val > oldVal) {
          opts.cartType = 0;
        } else {
          opts.cartType = 1;
        }
      }
      putUpdateNum(opts)
        .then(res => {
          this.totalPrice = res.data;
          this.num = val;
        })
        .catch(err => {
          console.log(err);
          this.num = oldVal;
        });
    }
  },
  created () {
    let args = this.$route.query;
    this.loading = true;
    axios.all([postAddCart(args), getCartPrice(), this.getAddressList()])
      .then(res => {
        const [cart, cartPrice] = res;
        const { data: cartData } = cart;
        this.tableData = [cartData];
        this.num = cartData.num;
        this.totalPrice = cartPrice.data;
        this.loading = false;
      })
      .catch(err => {
        console.log(err);
        this.loading = false;
      });
  }
};
</script>
<style lang="less">
.page-reserve {
  .panel-item {
    padding: 16px 0 0 30px;
    border-bottom: 1px solid #eee;
    &__hd {
      position: relative;
      font-size: 12px;
      color: #333;
      margin-bottom: 12px;
      .op-text {
        position: absolute;
        right: 10px;
        top: 0;
        font-size: 12px;
        color: #4571ea;
        &-sider {
          right: 100px;
        }
      }
    }
    &__address {
      position: relative;
      padding-left: 30px;
      .icon-address {
        position: absolute;
        left: 0;
        top: 1px;
      }
      .address-title {
        font-size: 14px;
        color: #333;
        font-weight: 600;
      }
      .address-info {
        font-size: 12px;
        margin-top: 5px;
      }
    }
    .address-item {
      margin-bottom: 30px;
      .el-radio__input {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
      .el-radio.is-bordered {
        height: 178px;
        width: 94%;
        padding-bottom: 10px;
      }
      .el-radio__label {
        padding-left: 0;
      }
      &__hd {
        position: relative;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        .concat-info {
          font-size: 14px;
          color: #333;
          line-height: 24px;
        }
        .tag-name {
          margin-right: 10px;
        }
      }
      &__bd {
        position: relative;
        color: #333;
        .value-detail {
          margin-top: 10px;
          overflow: hidden;
          word-break: break-all;
          white-space: normal;
          line-height: 1.6em;
          i {
            margin-right: 6px;
          }
        }
      }
      &__ft {
        position: absolute;
        bottom: 0;
      }
    }
  }
  .product-title {
    padding: 17px 0 10px 30px;
    font-size: 14px;
    color: #333;
  }
  .el-table th {
    background-color: #f3f7ff;
    text-align: center;
  }
  .table-data {
    .table-product {
      display: flex;
      font-size: 14px;
      color: #0a0a0a;
      .el-image {
        width: 90px;
        margin-right: 8px;
      }
    }
    .table-param {
      padding-left: 20px;
      &__item {
        position: relative;
        font-size: 14px;
        padding-left: 80px;
        color: #333;
        .params-label {
          position: absolute;
          left: 0;
          color: #999;
        }
      }
    }
    .product-cell {
      text-align: center;
    }
  }
  .address-dialog {
    .el-dialog {
      width: 40%;
    }
    .el-cascader,
    .el-input {
      width: 240px;
    }
    .control-address {
      width: 90%;
    }
    .dialog-footer {
      text-align: center;
    }
  }
  .table-foot {
    padding: 22px 38px 40px 28px;
    background-color: #f3f7ff;
    .textarea-box {
      width: 80%;
      display: flex;
      &__label {
        min-width: 40px;
        font-size: 13px;
        color: #3f3f3f;
      }
    }
  }
  .reserve-foot {
    padding: 30px 0;
    .real-price {
      color: @dangerColor;
      margin-right: 20px;
    }
  }
  .address-empty {
    padding: 20px 0;
    font-size: 16px;
    color: #999;
  }
}
</style>
