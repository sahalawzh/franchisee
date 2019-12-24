<template>
  <div>
    <!-- Header -->
		<header id="header" class="lwzx-header">
			<div class="lwzx-logo">
				<!-- Logo -->
				<a class="logo" href="index.html">
					<img src="../../assets/business/logo.png" alt="logo">
				</a>
				<!-- /Logo -->

			</div>

			<div class="main-menu pull-right">
				<a href="index.html">
					兰湾在线定制平台
				</a>
			</div>

		</header>
		<!-- /Header -->

    <!-- Backgound Image -->
    <div class="lwzx-banner">
      <el-row class="lwzx-banner__bg bg-image">
        <div class="banner-info">
          <div class="lead"><span>帮别人辛苦打工</span>不如自己创业轻松</div>
          <div class="introduce"><span class="introduce-space">千亿级市场<span class="introduce-sm">等你加入</span></span>90%利润<span class="introduce-sm">让利给您</span></div>
          <div class="promise">我们承诺1年内达不到市场应用的成果，我们全额退回投资资金</div>
        </div>
      </el-row>
    </div>
    <!-- /Backgound Image -->

    <div class="section lwzx-resolve">

      <el-row class="resolve-header">
        <div class="resolve-header sub-title"><span class="title-text">无需囤货</span></div>
      </el-row>
      <el-row class="resolve-content">
        <div class="resolve-process">
          <ul>
            <li>生产</li>
            <li>管理</li>
            <li>技术</li>
            <li>发货</li>
            <li>售后</li>
            <li>品牌</li>
          </ul>
        </div>
        <div class="resolve-slogan">我们全为你解决</div>
        <el-col :span="12">
          <div class="resolve-form">
            <h2>高新企业    低入门槛</h2>
            <h4>创业同行申请表</h4>
            <el-form>
              <el-form-item>
                <el-input placeholder="请输入您的姓名"></el-input>
              </el-form-item>
              
              <el-form-item>
                <el-input placeholder="请输入您的电话"></el-input>
              </el-form-item>
              
              <el-form-item>
                <el-input placeholder="请输入您的电话"></el-input>
              </el-form-item>
              
              <el-button type="primary">提交申请，领取免费创业培训</el-button>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <ul class="resolve-details">
            <li>
              <img src="../../assets/business/resolve_1.png" alt="">
              <div class="info">
                <h3>不懂销售不要紧</h3>
                <div class="desc">我们有讲师为您培训指导</div>
              </div>
            </li>
            <li>
              <img src="../../assets/business/resolve_2.png" alt="">
              <div class="info">
                <h3>不懂设计不要紧</h3>
                <div class="desc">我们有专业的设计师，专业为用户设计</div>
              </div>
            </li>
            <li>
              <img src="../../assets/business/resolve_3.png" alt="">
              <div class="info">
                <h3>不懂生产不要紧</h3>
                <div class="desc">我们有惠普批量化定制中心，统一生产，统一发货</div>
              </div>
            </li>
            <li>
              <img src="../../assets/business/resolve_4.png" alt="">
              <div class="info">
                <h3>售后麻烦怎么办</h3>
                <div class="desc">我们有专业客服团队，为客户做售后</div>
              </div>
            </li>
            <li>
              <img src="../../assets/business/resolve_5.png" alt="">
              <div class="info">
                <h3>不懂管理不要紧</h3>
                <div class="desc">我们有专业的客户管理平台，用户数据存储于在线平台，
                    用户可以随时查看自己的足部信息</div>
              </div>
            </li>
          </ul>
        </el-col>
      </el-row>
		</div>

    <div class="section lwzx-join bg-image">
			<div class="container">
				<div class="row">
					<div class="sub-title"><span class="title-text">加入我们</span></div>
				</div>
				<div class="row join-info">
					<div class="way-label">方式一</div>
					<h4>3.98万元<span class="span">加入即可享受</span>90%<span class="span">以上利润</span></h4>
					<div class="way-label">方式二</div>
					<h4>0元<span class="span">加入，享受</span>60%<span class="span">利润，30%利润抵扣价值6万元足部扫描仪，抵扣完成即可享受90%利润</span></h4>
					<div class="qrcode">
						<img src="../../assets/business/qrcode.png" alt="">
						<div class="qrcode-text-1">扫描加好友</div>
						<div class="qrcode-text-2">领取免费创业培训</div>
					</div>
				</div>
			</div>
		</div>

    <div class="section lwzx-service">
			<div class="join-box">
				<el-row>
					<div class="sub-title"><span class="title-text">加入创业同行，即享以下服务</span></div>
				</el-row>
				<el-row class="multiple-service">
					<el-col :sm="12" :md="8" :lg="6">
						<div class="single-service">
							<div class="service-img">
								<img src="../../assets/business/service_1.png" alt="">
							</div>
							<div class="info">
								<div><span class="num">1</span>价值6万元</div>
								<div class="desc">兰湾足行TM高精度足型扫描仪</div>
							</div>
						</div>
					</el-col>
					<el-col :sm="12" :md="8" :lg="6">
						<div class="single-service">
							<div class="service-img">
								<img src="../../assets/business/service_2.png" alt="">
							</div>
							<div class="info">
								<div><span class="num white-text">2</span>鞋垫设计方案</div>
							</div>
						</div>
					</el-col>
					<el-col :sm="12" :md="8" :lg="6">
						<div class="single-service">
							<div class="service-img">
								<img src="../../assets/business/service_3.png" alt="">
							</div>
							<div class="info">
								<div><span class="num white-text">3</span>技术培训</div>
							</div>
						</div>
					</el-col>
					<el-col :sm="12" :md="8" :lg="6">
						<div class="single-service">
							<div class="service-img">
								<img src="../../assets/business/service_4.png" alt="">
							</div>
							<div class="info">
								<div><span class="num white-text">4</span>高识别度的兰湾足行TMVI系统</div>
							</div>
						</div>
					</el-col>
					<el-col :sm="12" :md="8" :lg="6">
						<div class="single-service">
							<div class="service-img">
								<img src="../../assets/business/service_5.png" alt="">
							</div>
							<div class="info">
								<div><span class="num white-text">5</span>现代化3D打印生产</div>
							</div>
						</div>
					</el-col>
					<el-col :sm="12" :md="8" :lg="6">
						<div class="single-service">
							<div class="service-img">
								<img src="../../assets/business/service_6.png" alt="">
							</div>
							<div class="info">
								<div><span class="num white-text">6</span>统一的售后</div>
							</div>
						</div>
					</el-col>
					<el-col :sm="12" :md="8" :lg="6">
						<div class="single-service">
							<div class="service-img">
								<img src="../../assets/business/service_7.png" alt="">
							</div>
							<div class="info">
								<div><span class="num white-text">7</span>专业的足部矫形设计师</div>
							</div>
						</div>
					</el-col>
					<el-col :sm="12" :md="8" :lg="6">
						<div class="single-service">
							<div class="service-img">
								<img src="../../assets/business/service_8.png" alt="">
							</div>
							<div class="info">
								<div class="service-img"><span class="num white-text">8</span>客户足部健康档案</div>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>

			<div class="bg-image advertise-box">
				<div class="advertise-title"><span>兰湾足行<span class="en">TM</span></span><span>带你创业</span><span>带你赢</span></div>
				<div class="advertise-content">
					<ul>
						<li>定制</li>
						<li>舒适</li>
						<li>矫形</li>
					</ul>
				</div>
			</div>

      <div class="service-container">

        <el-row class="about-box">
          <el-col :span="12">
            <h3>兰湾足行<span class="en">TM</span>矫形鞋垫是无限三维|兰湾智能旗下子品牌，为国内外有足部治疗及保健需求的人群，结合惠普高精度3D打印而研发出定制鞋垫。</h3>
            <h4>在欧美国家，足部疾病被高度重视，矫形鞋垫早已普及使用</h4>
            <p class="desc">目前已成为健康产业的重要组成部分，欧美超市里面随处可见类似的矫形功能鞋垫。专业足部矫形师和专门的足部矫形店遍布很多城市大的街区，百姓和执业医生也对矫形鞋垫的作用和应用范围有着高度认知并形成习惯。</p>
            <p>比利时3D打印矫形鞋垫品牌phits线下门店超过<strong>200</strong>家</p>
            <p>美国矫形鞋垫品牌superfeet线下门店超过<strong>350</strong>家</p>
            <p>美国连锁商超costco也进驻3D打印定制鞋垫</p>
            <p>中国矫形鞋垫线下门店<strong>不足50</strong>家，而3D打印定制鞋垫线下门店更是没有</p>
          </el-col>

          <el-col :span="11" :offset="1">
            <a class="about-video" href="#">
              <img src="../../assets/shape/about-video.png" alt="">
              <i class="play-icon fa fa-play"></i>
            </a>
          </el-col>
        </el-row>

        <el-row class="sale-box">
          <el-col :span="12">
            <div class="resolve-form">
              <h2>高新企业    低入门槛</h2>
              <h4>创业同行申请表</h4>
              <el-form>
                <el-form-item>
                  <el-input placeholder="请输入您的姓名"></el-input>
                </el-form-item>
                
                <el-form-item>
                  <el-input placeholder="请输入您的电话"></el-input>
                </el-form-item>
                
                <el-form-item>
                  <el-input placeholder="请输入您的电话"></el-input>
                </el-form-item>
                
                <el-button type="primary">提交申请，领取免费创业培训</el-button>
              </el-form>
            </div>
          </el-col>
          <el-col :span="11" :offset="1" class="sale-content">
            <img src="../../assets/business/sale_header.png" class="sale-header" alt="">
            <div><div class="sale-direct">官方直销</div></div>
            <div>
              <el-col :span="8">
                <img src="../../assets/business/sale_1.png" alt="">
                <p>正品保障</p>
              </el-col>
              <el-col :span="8">
                <img src="../../assets/business/sale_2.png" alt="">
                  <p>统一发货</p>
              </el-col>
              <el-col :span="8">
                <img src="../../assets/business/sale_3.png" alt="">
                  <p>统一售后</p>
              </el-col>
            </div>
            <div class="sale-pro">
              <img src="../../assets/business/sale_product.png" alt="">
            </div>
          </el-col>
        </el-row>
    
        <el-row class="case-box">
          <el-col :lg="6" :md="6" :sm="12">
            <div class="single-case">
              <div class="case-img">
                <img src="../../assets/business/case_1.png" alt="">
              </div>
              <p class="desc">该客户有较严重的扁平足及内翻足，引起X型腿。2017-2019，经过2年的定制鞋垫的穿着，已经有了极大的改善</p>
            </div>
          </el-col>
          <el-col :lg="6" :md="6" :sm="12">
            <div class="single-case">
              <div class="case-img">
                <img src="../../assets/business/case_2.png" alt="">
              </div>
              <p class="desc">该客户有较严重的O型腿及外翻足。2017-2019，经过2年的定制鞋垫的穿着，O型腿已经完全矫正</p>
            </div>
          </el-col>
          <el-col :lg="6" :md="6" :sm="12">
            <div class="single-case">
              <div class="case-img">
                <img src="../../assets/business/case_3.png" alt="">
              </div>
              <p class="desc">该客户有较轻微的扁平足及过度旋后、X型腿，引起膝盖磨损疼痛。2018-2019，经过1年多的定制鞋垫的穿着，腿型已经有了极大的改善，膝盖的疼痛也随之消失。</p>
            </div>
          </el-col>
          <el-col :lg="6" :md="6" :sm="12">
            <div class="single-case">
              <div class="case-img">
                <img src="../../assets/business/case_4.png" alt="">
              </div>
              <p class="desc">该客户有运动爱好，但有较严重的内翻足、足弓塌陷。2017-2019，经过2年多的定制鞋垫的穿着，内足弓塌陷情况极大改善，运动成绩也大大提升。</p>
            </div>
          </el-col>
        </el-row>

        <el-row class="support-box">
          <el-col :span="12">
            <img class="img-responsive service_support" src="../../assets/business/service_support.png" alt="">
          </el-col>
          <el-col :span="11" :offset="1">
            <div class="resolve-form">
              <h2>高新企业    低入门槛</h2>
              <h4>创业同行申请表</h4>
              <el-form>
                <el-form-item>
                  <el-input placeholder="请输入您的姓名"></el-input>
                </el-form-item>
                
                <el-form-item>
                  <el-input placeholder="请输入您的电话"></el-input>
                </el-form-item>
                
                <el-form-item>
                  <el-input placeholder="请输入您的电话"></el-input>
                </el-form-item>
                
                <el-button type="primary">提交申请，领取免费创业培训</el-button>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
		</div>

    <div class="section lwzx-media">
      <el-row>
        <div class="sub-title"><span class="title-text">媒体报道</span></div>
      </el-row>
      <div class="media-container">

        <el-row class="news-box">
          <div class="feature">
            <div class="state">2016年国家发布“健康中国2030”规划纲要，健康产业正是风口浪尖</div>
            <div class="state">各地都在酝酿健康产业，有政策，就有机遇</div>
          </div>
          <el-col :span="12">
            <div class="news">
              <div class="news-li">
                <a href="#">
                  <div class="date">
                    <div class="date-month">SEP</div>
                    <div class="date-day">22</div>
                  </div>
                  <div class="content">
                    <div class="title">国际健康产业大会9月22日 定义智慧养老产业项目投资</div>
                    <div class="detail">到2030年，我国健康产业将突破20万亿元，成为国民经济的重要组成部分。其中，智慧养老产业相信也会迅速发展。</div>
                  </div>
                </a>
              </div>
              <div class="news-li">
                <a href="#">
                  <div class="date">
                    <div class="date-month">SEP</div>
                    <div class="date-day">22</div>
                  </div>
                  <div class="content">
                    <div class="title">国际健康产业大会9月22日 定义智慧养老产业项目投资</div>
                    <div class="detail">到2030年，我国健康产业将突破20万亿元，成为国民经济的重要组成部分。其中，智慧养老产业相信也会迅速发展。</div>
                  </div>
                </a>
              </div>
              <div class="news-li">
                <a href="#">
                  <div class="date">
                    <div class="date-month">SEP</div>
                    <div class="date-day">22</div>
                  </div>
                  <div class="content">
                    <div class="title">国际健康产业大会9月22日 定义智慧养老产业项目投资</div>
                    <div class="detail">到2030年，我国健康产业将突破20万亿元，成为国民经济的重要组成部分。其中，智慧养老产业相信也会迅速发展。</div>
                  </div>
                </a>
              </div>
              <div class="news-li">
                <a href="#">
                  <div class="date">
                    <div class="date-month">SEP</div>
                    <div class="date-day">22</div>
                  </div>
                  <div class="content">
                    <div class="title">国际健康产业大会9月22日 定义智慧养老产业项目投资</div>
                    <div class="detail">到2030年，我国健康产业将突破20万亿元，成为国民经济的重要组成部分。其中，智慧养老产业相信也会迅速发展。</div>
                  </div>
                </a>
              </div>
            </div>
          </el-col>
          <el-col :span="11" :offset="1">
            <img src="../../assets/business/media_img.png" alt="">
          </el-col>
        </el-row>

        <el-row class="company-box">
          <el-col :span="12" class="content">
            <h1>无限三维丨兰湾智能</h1>
            <p>兰湾智能是一家立足于3D打印教育、3D打印数字化批量化应用、3D打印医疗康复、3D打印互联网平台为主的高科技企业。旗下全资控股无限三维（青岛）科技产业集团、苏州无限三维科技产业有限公司等实体，拥有3家国家高新技术企业，1家国家级公共服务平台，2家互联网公共平台。</p>
            <p>无限三维APP、无限三维小程序是一款面向3D打印初学者为主的，免费在线教育平台。与自主研发的Makesome 物联网打印机构成线上线下平台，核心是教会青少年玩转3D打印，启发创新思维，提高动手动脑能力。</p>
            <p>兰湾在线定制是一款面向工业和医疗康复领域的工业互联网平台，与线下批量化3D打印创新中心结合，为工业设计、文化创意、医疗康复机构、科研企业提供个性化、批量化定制服务。</p>
          </el-col>
          <el-col :span="11" :offset="1" class="compay-show">
            <h3>国家高新技术企业</h3>
            <h3>国家中小企业公共示范服务平台</h3>
            <el-col :span="12" class="bar">
              <div class="compay-patent">
                <img src="../../assets/business/compay_1.png" alt="">
                <h4>知识专利</h4>
                <div>康复相关专利申请数量12个以上</div>
              </div>
            </el-col>
            <el-col :span="12" class="bar">
              <div class="compay-patent">
                <img src="../../assets/business/compay_2.png" alt="">
                <h4>医疗资质</h4>
                <div>3个一类医疗器械产品备案</div>
              </div>
            </el-col>
          </el-col>
        </el-row>

        <el-row class="credential-box">
          <el-col class="credential-box__item" :lg="4" :md="6" :sm="8">
            <img src="../../assets/business/credential_1.png" alt="">
          </el-col>
          <el-col class="credential-box__item" :lg="4" :md="6" :sm="8">
            <img src="../../assets/business/credential_2.png" alt="">
          </el-col>
        </el-row>
      </div>
		</div>
    
    <div class="section lwzx-footer">

			<div class="bg-image lwzx-footer__bg"></div>


				<el-row>
					<el-col :span="16" :offset="4">
						<h1>欢迎加入兰湾足行<span class="en">TM</span>创业同行</h1>
						<img src="../../assets/business/qrcode.png" alt="">
						<p>联系客服  了解更多</p>
					</el-col>

				</el-row>
		</div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      bannerUrl: '../../assets/business/banner.png'
    }
  }
}
</script>

<style lang="less" scoped>
.section {
  position: relative;
}
.section .sub-title {
  position: relative;
  font-size: 36px;
  color: #333;
  padding-top: 60px;
  padding-bottom: 7px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.section .sub-title .title-text{
  padding-bottom: 6px;
  border-bottom: 3px solid #333;
}
.lwzx-header{
  padding: 1em 10%;
  .lwzx-logo{
    display: inline-block;
    & > img {
      width: 264px;
      max-height: 64px;
      height: 64px;
    }
  }
  .main-menu {
    float: right;
    a{
      margin-top: 2em;
      display: inline-block;
      font-size: 18px;
      color: rgba(51,51,51,0.6);
    }
  }
}
.lwzx-banner {
  position: relative;
  height: 600px;
  &__bg {
    background-image: url('../../assets/business/banner.png');
    color: #fff;
  }
  .banner-info {
    padding: 70px 0 0 106px;
  }
  .lead {
    font-size: 28px;
    color: rgba(255,255,255,0.7);
    span{
      margin-right: 15px;
    }
  }
  .introduce {
    font-size: 48px;
    .introduce-sm{
      font-size: 30px;
    }
    .introduce-space{
      margin-right: 20px;
    }
  }
  .promise {
    font-size: 18px;
    margin-top: 10px;
    letter-spacing: 1px;
    color: rgba(255,255,255,0.8);
  }
}
.lwzx-resolve {
  .resolve-header{
    text-align: center;
  }
  .resolve-process{
    position: relative;
    text-align: center;
    display: block;
    font-size: 20px;
    margin-top: 26px;
    color: #333;
    ul li {
      position: relative;
      display: inline-block;
      padding: 0 14px;
      &:not(:last-child)::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 2px;
        height: 100%;
        transform: scaleY(0.5);
        background-color: #ddd;
      }
    }
  }
  .resolve-slogan {
    margin-top: 10px;
    margin-bottom: 40px;
    color: #0096d6;
    font-size: 30px;
    text-align: center;
  }
  .resolve-details {
    margin-top: -20px;
    li {
      position: relative;
      margin-bottom: 38px;
      padding-left: 66px;
      .info{
        padding-left: 66px;
      }
      h3{
        margin-bottom: 8px;
        font-size: 22px;
        font-weight: 500;
      }
      .desc{
        font-size: 16px;
        color: #666;
      }
      img {
        width: 50px;
        height: 50px;
        float: left;
      }
    }
  }
}
.resolve-form .dropdown-group {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  padding: 0;
}
.resolve-form .dropdown-group.dropdown-space{
  padding-right: 10px;
}
.resolve-form .dropdown-group button{
  width: 100%;
  height: 50px;
  background-color: #fff;
  color: #ccc;
  text-align: left;
}
.resolve-form .dropdown-group button .caret{
  margin-left: 13px;
}
.lwzx-resolve .resolve-form,
.lwzx-service .resolve-form  {
  background-color: #eff2f9;
  padding: 30px 77px 45px 79px;
}
.lwzx-resolve .resolve-form input,
.lwzx-service .resolve-form input{
  margin-bottom: 23px;
  background-color: #fff;
  height: 50px;
}
.lwzx-resolve .resolve-form input::-moz-placeholder,
.lwzx-service .resolve-form input::-moz-placeholder{
  color: #ccc;
}
.lwzx-resolve .resolve-form input::-webkit-input-placeholder,
.lwzx-service .resolve-form input::-webkit-input-placeholder{
  color: #ccc;
}
.lwzx-resolve .resolve-form h2 ,
.lwzx-service .resolve-form h2{
  text-align: center;
  padding-bottom: 8px;
  border-bottom: 1px solid #333;
}
.lwzx-resolve .resolve-form h4 ,
.lwzx-service .resolve-form h4{
  text-align: center;
  margin: 20px 0;
  color: rgba(51,51,51,0.6);
}
.lwzx-join {
  position: relative;
  height: 606px;
  width: 100%;
  background-image: url('../../assets/business/join_bg.png');
  .join-info {
    position: relative;
    text-align: center;
    padding: 36px 0 74px;
    .way-label {
      width: 143px;
      font-size: 18px;
      line-height: 18px;
      color: #f0f1f3;
      background-color: #0096d6;
      border-radius: 4px;
      padding: 3px 0;
      margin: 0 auto 16px;
    }
    h4 {
      margin-bottom: 26px;
    }
    .span {
      color: rgba(51,51,51,0.7);
    }
    .qrcode {
      font-size: 16px;
      img {
        margin-top: 4px;
      }
      .qrcode-text-1{
        margin-top: 9px;
        margin-bottom: 2px;
      }
    }
  }
}

.resolve-content,
.media-container,
.multiple-service,
.service-container {
  padding: 0 10%;
}
.lwzx-service {
  margin-bottom: 86px;
  
  .single-service {
    margin-top: 56px;
    padding-left: 15px;
    padding-right: 15px;
    .service-img {
      margin-bottom: 24px;
      img {
        width: 100%;
        height: 256px;
      }
    }
    .info {
      min-height: 60px;
      border-bottom: 1px solid #c8c8c8;
    }
    .desc {
      margin-top: 8px;
    }
    .num {
      width: 16px;
      height: 16px;
      background-color: #0096d6;
      font-size: 16px;
      border-radius: 50%;
      display: inline-block;
      text-align: center;
      line-height: 16px;
      margin-right: 6px;
      color: #fff;
    }
  }
  .advertise-box {
    position: relative;
    width: 100%;
    height: 506px;
    padding: 130px 0 240px;
    box-sizing: border-box;
    color: #fff;
    text-align: center;
    background-image: url('../../assets/shape/advertise.png');
  }
  .advertise-title {
    font-size: 48px;
    & > span:not(:last-child) {
      margin-right: 32px;
    }
    .en{
      font-size: 32px;
      vertical-align: text-top;
      font-weight: 600;
    }
  }
  .advertise-content {
    font-size: 36px;
    margin-top: 20px;
    li {
      position: relative;
      display: inline-block;
      padding: 0 20px;
      &:not(:last-child)::after {
        content: '';
        position: absolute;
        right: -4px;
        top: 0;
        bottom: 0;
        width: 2px;
        height: 100%;
        transform: scaleY(0.5);
        background-color: #fff;
      }
    }
  }
  .about-box {
    padding-top: 94px;
    h3 {
      font-family: PingFang-SC-Bold;
      line-height: 38px;
      margin-top: -10px;
      font-size: 22px;
      font-weight: 500;
      .en {
        font-size: 14px;
        vertical-align: text-bottom;
      }
    }
    h4 {
      font-family: PingFang-SC-Bold;
      margin-top: 32px;
      margin-bottom: 30px;
      font-size: 18px;
      font-weight: 500;
    }
    .desc {
      margin-bottom: 30px;
      line-height: 26px;
      color: #333;
    }
    .play-icon {
      background: #0096d6;
      color: #fff;
    }
    .join-box {
      margin-bottom: 86px;
    }
    p {
      margin-bottom: 8px;
    }
  }
  .sale-box {
    padding-top: 100px;
    .sale-content {
      text-align: center;
    }
    .sale-direct {
      font-size: 24px;
      padding: 2px 58px;
      background-color: #0096d6;
      border-radius: 17px;
      text-align: center;
      color: rgba(255,255,255,0.8);
      display: inline-block;
      margin: 28px 0 37px;
      font-weight: 100;
      .sale-content ul {
        li {
          display: inline-block;
          text-align: center;
        }
        p{
          font-size: 16px;
          margin-top: 4px;
        }
      }
    }
  }
  .sale-pro {
    display: inline-block;
    margin-top: 20px;
  }
  .case-box {
    padding-top: 84px;
  }
  .single-case {
    padding: 0 15px;
    .case-img {
      img{
        height: 260px;
        width: 100%;
      }
    }
    .desc {
      font-size: 16px;
      margin-top: 28px;
      letter-spacing: 2px;
      color: #333;
    }
  }
  .support-box {
    padding-top: 90px;
    .service_support {
      margin: 0 auto;
    }
  }
}
.lwzx-media {
  .state {
    font-size: 20px;
    color: #333;
    text-align: center;
    margin-top: 6px;
  }
  .feature {
    margin-top: 24px;
    margin-bottom: 60px;
  }
  .news-li {
    margin-bottom: 36px;
    .date {
      width: 45px;
      font-size: 14px;
      text-align: center;
      float: left;
      margin-right: 4px;
      margin-right: 12px;
    }
    .date-month {
      height: 34px;
      line-height: 34px;
      background-color: #0096d6;
      color: #fff;
    }
    .date-day {
      height: 34px;
      line-height: 34px;
      background-color: #eff2f9;
      color: #999;
    }
    .title {
      font-size: 16px;
      color: #333;
      font-family: PingFang-SC-Bold;
    }
    .detail {
      margin-top: 6px;
      color: rgba(51,51,51,0.8);
    }
  }
  .company-box{
    padding-top: 68px;
    h1{
      margin-bottom: 20px;
      font-weight: 500;
    }
    .content p {
      color: #323333;
      margin-bottom: 26px;
      line-height: 26px;
    }
    .compay-show {
      text-align: center;
      margin-top: 64px;
      h3 {
        font-size: 22px;
        margin-top: 20px;
        margin-bottom: 10px;
        font-weight: normal;
        color: #333;
      }
    }
    .bar {
      margin-top: 60px;
      &:last-child {
        border-left: 1px solid #ccc;
      }
    }
  }
  .compay-patent {
    color: #333;
    img {
      margin: 0 auto;
    }
    h4 {
      font-weight: normal;
      font-size: 18px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
  }
  .credential-box{
    padding-bottom: 86px;
    &__item {
      margin-right: 18px;
    }
  }
}
.lwzx-footer {
  padding: 50px 0 64px;
  text-align: center;
  color: #333;
  &__bg {
    background-image: url('../../assets/business/footer_bg.png');
  }
  h1 {
    font-size: 36px;
    font-weight: normal;
  }
  .en {
    display: inline-block;
    font-size: 18px;
    vertical-align: top;
  }
   img {
    margin: 20px auto 8px;
  }
}
</style>

