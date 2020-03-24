<template>
  <div class="compontent-banner">
    <default-header></default-header>
    <el-main class="main-container">
      <el-row class="shape-advertise">
        <el-image :src="bannerImg" fit="cover"></el-image>
        <div class="shape-wrap">
          <el-col :span="9" :offset="3" class="shape-wrap__info">
            <div class="protect-en">PROTECT</div>
            <div class="feet-en">FOOT BEGINS WITH FEET</div>
            <div class="feet-zh">
              <span class="feet-zh__bottom">护足</span>从脚开始
            </div>
            <p class="feet-desc">
              每个人的双脚都是不一样的，走路时的运动习惯也不尽相同。足部受力的不均匀，不但会导致足部问题，还会引起身体其他部位的不适。
            </p>
            <div class="experience-btn">
              <el-link @click="handleExperience"
                >{{ isLogin ? "定制我的专属鞋垫" : "立即体验"
                }}<i class="el-icon-right"></i
              ></el-link>
            </div>
          </el-col>
          <el-col :span="6" :offset="6">
            <div>
              <el-link class="entrance-btn" @click="handleFranchisees">{{
                role === 3 ? "进入加盟商后台" : "我要做加盟商"
              }}</el-link>
            </div>
            <div v-if="!isLogin">
              <el-link class="entrance-btn" @click="handleToLogin"
                >查看我的脚型数据</el-link
              >
            </div>
            <div>
              <el-link class="entrance-btn" @click="handleLookPoint"
                >查看测量点</el-link
              >
            </div>
          </el-col>
        </div>
      </el-row>

      <Login @login-status="handleLoginStatus" v-model="loginVisible"></Login>
    </el-main>
  </div>
</template>
<script>
import DefaultHeader from "@/components/defaultHeader";
import loginMixins from "@/mixins/login";
import { getSearchFranchisee } from "@/service/http";
import Login from "@/components/login";
export default {
  components: {
    DefaultHeader,
    Login
  },
  mixins: [loginMixins],
  methods: {
    handleLookPoint() {
      if (this.isLogin) {
        window.location.href = "nearby.html";
      } else {
        this.handleLoginStatus({ loginVisible: true });
      }
    },
    handleFranchisees() {
      if (this.isLogin) {
        getSearchFranchisee()
          .then(res => {
            window.location.href = res.data
              ? "/backend.html"
              : "/franchisees.html";
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.handleLoginStatus({ loginVisible: true });
      }
    },
    handleExperience() {
      if (this.isLogin) {
        window.location.href = "order.html";
      } else {
        this.handleLoginStatus({ loginVisible: true });
      }
    },
    handleToLogin() {
      this.handleLoginStatus({ loginVisible: true });
    }
  },
  data() {
    return {
      bannerImg: require("@/assets/shape/advertise.png")
    };
  },
  created() {}
};
</script>
<style lang="less" scoped>
.compontent-banner {
  .main-container {
    padding: 0;
  }
  .shape-advertise {
    position: relative;
    height: 500px;
    .el-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .shape-wrap {
      position: relative;
      padding-top: 50px;
      &__info {
        color: #fff;
        .protect-en {
          font-size: 64px;
        }
        .feet-en {
          font-size: 18px;
          margin-top: 6px;
        }
        .feet-zh {
          font-size: 38px;
          margin-top: 20px;
          padding-bottom: 16px;
          &__bottom {
            display: inline-block;
            padding-bottom: 10px;
            border-bottom: 6px solid #fff;
          }
        }
        .feet-desc {
          font-size: 14px;
          margin-top: 16px;
          line-height: 22px;
          margin-bottom: 22px;
        }
        .experience-btn {
          width: 264px;
          height: 40px;
          border-radius: 6px;
          text-align: center;
          background-image: linear-gradient(to right, #d5de31, #03d6c7);
          a {
            width: 100%;
            height: 100%;
            color: #fff;
            i {
              padding-left: 6px;
            }
          }
        }
      }
      .entrance-btn {
        color: rgba(255, 255, 255, 0.8);
        width: 194px;
        height: 40px;
        line-height: 40px;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.7);
        text-align: center;
        font-size: 16px;
        letter-spacing: 1px;
        margin-top: 18px;
      }
    }
  }
}
</style>
