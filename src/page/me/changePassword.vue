<template>
    <div>
        <div class="container">
            <div class="title">修改密码</div>
            <div class="topLine"></div>
            <div class="center">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="right">
                    <el-row :gutter="30">
                        <el-col :span="13">
                            <el-form-item label="旧密码：" prop="oldPassword">
                                <el-input type="password" v-model="ruleForm.oldPassword" placeholder="请输入您以前的密码"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="13">
                            <el-form-item label="新密码：" prop="newPassword">
                                <el-input type="password" v-model="ruleForm.newPassword" placeholder="新密码，6-16个字符"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="13">
                            <el-form-item label="确认密码：" prop="confirmPassword">
                                <el-input type="password" v-model="ruleForm.confirmPassword" placeholder="请确认您的登录密码"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <!-- 确认 -->
                    <div class="submit-btn">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item>
                                    <el-button type="primary" @click="changePassword">确认</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import store from "../../store";
export default {
  data() {
    return {
      ruleForm: {},
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        major: [{ required: true, message: "请输入专业", trigger: "blur" }],
        studentId: [{ required: true, message: "请输入学号", trigger: "blur" }],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    changePassword() {
      this.$refs.ruleForm.validate(valid => {
        var parms =
          "&password=" +
          this.ruleForm.oldPassword +
          "&newPassword=" +
          this.ruleForm.newPassword;
        // +
        // "&captcha=" +
        // this.loginForm.captcha;
        let _this = this;
        if (this.ruleForm.newPassword != this.ruleForm.confirmPassword) {
          this.$message({
            message: "两次密码不同！",
            type: "error"
          });
        } else {
          this.$http
            .post(this.$server.glourl + "sys/user/password", parms)
            .then(response => {
              if (response.data.code == 0) {
                this.$message({
                  message: "密码修改成功！",
                  type: "success"
                });
                _this.$router.replace({ path: "/login" });
              } else if (response.data.code == 500) {
                this.$message({
                  message: "密码不能与原密码相同！",
                  type: "error"
                });
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>

<style scoped>
.title {
  margin-top: 50px;
  font-size: 19px;
  font-family: MicrosoftYaHei;
  color: rgba(0, 0, 0, 1);
  text-align: center;
  padding-bottom: 15px;
}
.topLine {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 30px;
}
.container .center >>> form {
  vertical-align: middle;
  margin: 0 auto;
}
.el-row {
  padding-left: 21%;
}
.submit-btn {
  text-align: center;
}
.el-form-item {
  margin-bottom: 25px;
}
.el-input__inner {
  font-size: 13px;
}
</style>
