<template>
  <div class="outdivs" :style="{ height: bodyHeight + 'px' }">
    <div class="login-wrapper">
      <div class="login-logo">
        <img src="../../assets/image/logins_logo.png" alt="">
        <div>研究生综合服务平台</div>
      </div>
      <div class="login-content">
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <input type="text" v-model="loginForm.username" placeholder="请输入账号" class="login-input">
          <input type="password" v-model="loginForm.password" name="" id="" placeholder="请输入密码" class="login-input">
          <!-- <el-form-item lable="yan" prop="captcha" style="margin-top:15%">
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
      </div>
      <div class="login-button" @click="main">
        <span>登录</span>
      </div>
    </div>
  </div>

</template>
<style scoped>
@import "../../style/common.css";
</style>
<script>
export default {
  data() {
    return {
      bodyHeight: "",
      loginForm: {
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
  mounted() {
    this.bodyHeight = document.documentElement.clientHeight;
  },
  methods: {
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
            // .post(this.$server.glourl + "sys/login", parms)
            .post(_this.$server.glourl + "sys/webLogin", parms)
            .then(function(response) {
              //console.log(response.data.code);
              if (response.data.code == 0) {
                _this.$store.commit("SET_TOKEN", _this.loginForm.username);
                _this.$store.commit("GET_USER", _this.loginForm);
                _this
                  .$http(_this.$server.glourl + "sys/user/graduatePerms")
                  .then(response => {
                    _this.$store.commit("BTNS", response.data.perms);
                  });
                // _this.$message({
                //   message: "登陆成功",
                //   type: "success"
                // });
                _this.$router.push({ path: "/zzfw" });
              } else if (response.data.code == 500) {
                // _this.changeImg();
                alert("账号密码错误！");
                _this.$router.replace({ path: "/logins" });
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