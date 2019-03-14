<template>
  <!-- Swiper -->
  <div id="banner">
    <div class="univer">
      <img src="../assets/image/university.png" alt="">
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide rightDownBig swiper-no-swiping">
          <img src="../assets/image/school-1.jpg" />
        </div>
        <div class="swiper-slide swiper-no-swiping">
          <img src="../assets/image/school-2.jpg" />
        </div>
        <div class="swiper-slide swiper-no-swiping">
          <img src="../assets/image/school-3.jpg" />
        </div>
        <div class="swiper-slide swiper-no-swiping">
          <img src="../assets/image/school-4.jpg" />
        </div>
        <div class="swiper-slide swiper-no-swiping">
          <img src="../assets/image/school-5.jpg" />
        </div>
        <div class="swiper-slide swiper-no-swiping">
          <img src="../assets/image/school-6.jpg" />
        </div>
      </div>
    </div>
    <!-- <div class="bg" v-if="login"> -->
    <div class="login">
      <div>
        <div class="wel">
          <span class="logSpan">登录</span>
          <span>&nbsp;LOGIN</span>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" style="width:80%;margin:0 auto;">
          <el-form-item lable="用户名" prop="username" style="margin-top:5%;">
            <el-input v-model="loginForm.username" placeholder="学号或职工号" type="text"></el-input>
          </el-form-item>
          <el-form-item lable="密码" prop="password" style="margin-top:10%">
            <el-input type="password" placeholder="密码（身份证后六位）" v-model="loginForm.password" @keyup.enter.native="main"></el-input>
          </el-form-item>
          <span style="font-size:12px !important">(导师密码和旧系统密码一致)</span>
          <!-- <el-form-item lable="yan" prop="captcha" style="margin-top:10%">
            <el-row>
              <el-col :span="12">
                <el-input v-model="loginForm.captcha" placeholder="验证码" type="text" @keyup.enter.native="main"></el-input>
              </el-col>
              <el-col :span="12" style="border:1px solid #cccccc;height:40px">
                <img :src="imgurl" @click="changeImg" style="width:100%;height:100%" />
              </el-col>
            </el-row>
          </el-form-item> -->
        </el-form>
        <div class="loginIn" @click="main">
          登&nbsp;录
        </div>
        <div class="bottom">
          <p> © 技术支持：杭州毕为科技有限公司 </p>
        </div>
      </div>
    </div>
    <!--  </div> -->
  </div>

</template>

<script>
//import axios from axios;
export default {
  data() {
    return {
      loginForm: {
        login: false,
        username: "",
        password: "",
        captcha: ""
      },
      imgurl: this.$server.glourl + "captcha.jpg?",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      showLogin: false
    };
  },
  created() {
    this.ifphone();
  },
  mounted() {
    setTimeout(() => {
      var trList = [
        "leftUp",
        "moveRight",
        "moveDown",
        "centerBig",
        "rightDownBig"
      ];
      var swiper = new Swiper(".swiper-container", {
        speed: 2000, //控制动画执行时间
        autoplay: 5000, //自动切换的时间间隔
        setWrapperSize: true,
        width: window.innerWidth,
        height: window.innerHeight,
        autoplayDisableOnInteraction: false,
        effect: "fade",
        pagination: ".swiper-pagination",
        paginationClickable: true,
        onSlideChangeStart: function(swiper) {
          var nextSlide;
          nextSlide = swiper.slides.eq(swiper.activeIndex);
          nextSlide.addClass(trList[Math.floor(Math.random() * 5)]);
        },
        onSlideChangeEnd: function(swiper) {
          var prevSlide;
          prevSlide = swiper.slides[swiper.previousIndex];
          prevSlide.className = "swiper-slide";
        }
      });
    }, 2000);
  },
  methods: {
    ifphone() {
      var sUserAgent = navigator.userAgent;

      var mobileAgents = [
        "Android",
        "iPhone",
        "Symbian",
        "WindowsPhone",
        "iPod",
        "BlackBerry",
        "Windows CE"
      ];

      var goUrl = 0;

      for (var i = 0; i < mobileAgents.length; i++) {
        if (sUserAgent.indexOf(mobileAgents[i]) > -1) {
          goUrl = 1;

          break;
        }
      }

      if (goUrl == 1) {
        this.$router.push({ path: "/logins" });
      } else {
        this.login = true;
      }
    },
    changeImg() {
      this.imgurl = this.$server.glourl + "captcha.jpg?" + Math.random();
    },
    main() {
      this.$refs.loginForm.validate(valid => {
        var parms =
          "username=" +
          this.loginForm.username +
          "&password=" +
          this.loginForm.password;
          // +
          // "&captcha=" +
          // this.loginForm.captcha;
        let _this = this;
        if (valid) {
          this.$http
            // .post(_this.$server.glourl + "sys/login", parms)
            .post(_this.$server.glourl + "sys/webLogin", parms)
            .then(function(response) {
              if (response.data.code == 0) {
                _this.$store.commit("SET_TOKEN", _this.loginForm.username);
                _this.$store.commit("GET_USER", _this.loginForm);
                _this
                  .$http(_this.$server.glourl + "sys/user/graduatePerms")
                  .then(response => {
                    //console.log(response);
                    _this.$store.commit("BTNS", response.data.perms);
                  });
                _this.$message({
                  message: "登陆成功",
                  type: "success"
                });
                _this.$router.push({ name: "main" });
              } else if (response.data.code == 500) {
                // _this.changeImg();
                _this.$message({
                  message: response.data.msg,
                  type: "error"
                });
                _this.$router.replace({ path: "/login" });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.login .el-input__inner {
  height: 45px;
  border-color: rgba(68, 125, 254, 1);
}
</style>

<style scoped>
html {
  width: 100%;
  height: 100%;
}
body {
  width: 100%;
  height: 100%;
}
.bg {
  width: 100%;
  height: 100%;
  /* min-height: 700px; */
  margin: auto;
  /* background: url("../assets/image/loginbg.png") no-repeat;
  background-size: 100% 100%; */
  position: relative;
}
.univer {
  position: absolute;
  top: 5%;
  left: 3%;
  z-index: 100;
}

.login {
  background: rgba(255, 255, 255, 1);
  width: 20%;
  position: absolute;
  right: 10%;
  top: 30%;
  z-index: 1000;
}
.wel {
  width: 80%;
  margin: 0 auto;
  padding-top: 25px;
  height: 50px;
  font-size: 26px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(68, 125, 254, 1);
}

.wel span {
  font-size: 16px;
}
.wel .logSpan {
  font-size: 26px;
}
.user {
  width: 279px;
  height: 50%;
  margin: 0 auto;
  margin-top: 10%;
  position: relative;
}
input {
  width: 229px;
  height: 45px;
  border: none;
  padding-left: 50px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: rgba(153, 153, 153, 1);
  border-bottom: 1px solid rgba(153, 153, 153, 1);
  outline: none;
  margin-top: 5%;
}

img {
  /* width: 21px;
  height: 21px; */
}
.username {
  position: absolute;
  left: 0;
  top: 60px;
}
.pass {
  position: absolute;
  left: 0;
  top: 105px;
}
.code {
  width: 279px;
  margin: 0 auto;
  margin-top: 36px;
}
.code input {
  width: 122px;
  padding-left: 50px;
  outline: none;
}
.loginIn {
  width: 80%;
  margin: 0 auto;
  margin-top: 5%;
  text-align: center;
  font-size: 18px;
  font-family: PingFangSC-Light;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  height: 45px;
  line-height: 45px;
  background: rgba(68, 125, 254, 1);
  border-radius: 4px;
}
.bottom {
  width: 100%;
  margin-top: 10%;
  text-align: center;
  font-size: 12px;
  color: #555555;
  font-weight: Regular;
  font-family: PingFangSC-Light;
}

#banner {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide > img{
  width:100%;
  height:100%;
}
.swiper-slide .detail {
  height: 90px;
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  width: 100%;
  bottom: 0;
  color: #fff;
  opacity: 0;
  transition: opacity 0.3s 0.3s;
}

.swiper-slide-active .detail {
  opacity: 1;
}

.swiper-slide .detail h3 {
  width: 950px;
  margin: 15px auto 0;
}

.swiper-slide .detail p {
  width: 950px;
  margin: 5px auto 0;
}

.swiper-slide .detail p span {
  width: 650px;
  display: block;
}

/**/
.effect1 img {
  transform: scale(1.25, 1.25) translate(10%, 10%);
  transform: scale(1.1, 1.1) translate(4.545%, 4.545%);
  /*tr     =    (sc-1)/2sc*100%              */
  /* --1.25       0.25/2.5*100%=10%          */
}

.leftUp img {
  -webkit-animation-name: leftUp;
  animation-name: leftUp;
}

@-webkit-keyframes leftUp {
  0% {
    transform: scale(1.1, 1.1) translate(4.545%, 4.545%);
  }

  100% {
    transform: scale(1.1, 1.1) translate(-4.545%, -4.545%);
  }
}

@keyframes leftUp {
  0% {
    transform: scale(1.1, 1.1) translate(4.545%, 4.545%);
  }

  100% {
    transform: scale(1.1, 1.1) translate(-4.545%, -4.545%);
  }
}

.moveRight img {
  -webkit-animation-name: moveRight;
  animation-name: moveRight;
}

@-webkit-keyframes moveRight {
  0% {
    transform: scale(1.1, 1.1) translate(-4.545%, 0);
  }

  100% {
    transform: scale(1.1, 1.1) translate(4.545%, 0);
  }
}

@keyframes moveRight {
  0% {
    transform: scale(1.1, 1.1) translate(-4.545%, 0);
  }

  100% {
    transform: scale(1.1, 1.1) translate(4.545%, 0);
  }
}

.moveDown img {
  -webkit-animation-name: moveDown;
  animation-name: moveDown;
}

@-webkit-keyframes moveDown {
  0% {
    transform: scale(1.1, 1.1) translate(0, -4.545%);
  }

  100% {
    transform: scale(1.1, 1.1) translate(0, 4.545%);
  }
}

@keyframes moveDown {
  0% {
    transform: scale(1.1, 1.1) translate(0, -4.545%);
  }

  100% {
    transform: scale(1.1, 1.1) translate(0, 4.545%);
  }
}

.centerBig img {
  -webkit-animation-name: centerBig;
  animation-name: centerBig;
}

@-webkit-keyframes centerBig {
  100% {
    transform: scale(1.1, 1.1);
  }
}

@keyframes centerBig {
  100% {
    transform: scale(1.1, 1.1);
  }
}

.rightDownBig img {
  -webkit-animation-name: rightDownBig;
  animation-name: rightDownBig;
}

@-webkit-keyframes rightDownBig {
  100% {
    transform: scale(1.1, 1.1) translate(4%, 4%);
  }
}

@keyframes rightDownBig {
  100% {
    transform: scale(1.1, 1.1) translate(4%, 4%);
  }
}

.swiper-slide img {
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  -webkit-animation-duration: 5s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-fill-mode: forwards;
}
.swiper-pagination {
  bottom: 35px;
  right: 250px;
}

.swiper-pagination-bullet {
  width: 20px;
  height: 20px;
  background: #fff;
  margin: 0 5px;
}
</style>
