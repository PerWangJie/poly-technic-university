<template>
    <div>
        <div>
            <div>
                <el-row :gutter="30">
                    <el-col :span="20" :offset="1">
                        <h1 style="color:#237ae4;font-size:20px;text-align:center">个 人 中 心</h1>
                    </el-col>
                    <!-- <el-col :span="2" style="margin-top:20px;padding-left:0;padding-right:0">
                        <el-button @click="update" v-if="xgButton">修改</el-button>
                    </el-col> -->
                </el-row>
            </div>
            <div class="topLine"></div>
            <div v-if="showMsg" style="margin: 0 auto;line-height:60px;color:rgba(102,102,102,1);font-size:15px">
                <!-- <el-row :gutter="30">
                    <el-col :span="8">
                        <span>照片：</span>
                    </el-col>
                    <el-col :span="8">
                        <div class="student-avatar">
                            <img src="../../assets/image/avatar.jpg" alt="">
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <span @click="modifyData" class="textBlue">【修改】</span>
                    </el-col>
                </el-row> -->

                <el-row :gutter="30" class="bg-purple-light">
                    <el-col :span="3" :offset="1">
                        <span>姓氏中文：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="student.xszw"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="2">
                        <span>名字中文：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="student.mzzw"></el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="3" :offset="1">
                        <span>姓氏拼音：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="student.xspy"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="2">
                        <span>名字拼音：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="student.mzpy"></el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="bg-purple-light">
                    <!-- <el-col :span="3" :offset="1">
                        <span>姓名：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="student.xm"></el-input>
                    </el-col> -->
                    <!-- <el-col :span="3" :offset="1">
                        <span>学号：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="student.xh" readonly></el-input>
                    </el-col> -->
                </el-row>

                <el-row :gutter="30" class="bg-purple-light">
                    <el-col :span="3" :offset="1">
                        <span>身份证号：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="student.sfzjh"></el-input>
                    </el-col>

                    <el-col :span="3" :offset="2">
                        <span>性别：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-radio-group v-model="student.xbm">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="2">女</el-radio>
                        </el-radio-group>
                    </el-col>

                </el-row>

                <el-row :gutter="30">
                    <el-col :span="3" :offset="1">
                        <span>出生日期：</span>
                    </el-col>
                    <el-col :span="7">
                        <!-- <el-input v-model="student.csrq"></el-input> -->
                        <el-date-picker v-model="student.csrq" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width:100%">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="3" :offset="2">
                        <span>籍贯：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="student.jg"></el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="bg-purple-light">
                    <el-col :span="3" :offset="1">
                        <span>所属院系：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="student.deptName"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="2">
                        <span>院系代码：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="student.yxsh"></el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="3" :offset="1">
                        <span>导师号：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="student.dsh"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="2">
                        <span>导师姓名：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="student.dsxm"></el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="bg-purple-light">
                    <el-col :span="3" :offset="1">
                        <span>电话：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="student.dh"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="2">
                        <span>邮箱：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="student.yx"></el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="3" :offset="1">
                        <span>家庭地址：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="student.jttxdz"></el-input>
                    </el-col>
                    <el-col :span="3" :offset="2">
                        <span>家庭电话：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="student.jtdh"></el-input>
                    </el-col>
                </el-row>

            </div>
            <div v-if="!showMsg" style="margin: 0 auto;line-height:60px;color:rgba(102,102,102,1);font-size:15px">
                <!-- <el-row :gutter="30">
                    <el-col :span="8">
                        <span>照片：</span>
                    </el-col>
                    <el-col :span="8">
                        <div class="student-avatar">
                            <img src="../../assets/image/avatar.jpg" alt="">
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <span @click="modifyData" class="textBlue">【修改】</span>
                    </el-col>
                </el-row> -->
                <el-row :gutter="30" class="bg-purple-light">
                    <el-col :span="3" :offset="1">
                        <span>导师姓名：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="teacher.xm" readonly></el-input>
                    </el-col>
                    <el-col :span="3" :offset="2">
                        <span>导师工号：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="teacher.gh" readonly></el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="3" :offset="1">
                        <span>出生日期：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="teacher.csrq" readonly></el-input>
                    </el-col>
                    <el-col :span="3" :offset="2">
                        <span>导师性别：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="teacher.sex" readonly></el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="bg-purple-light">
                    <el-col :span="3" :offset="1">
                        <span>所属院系：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="teacher.ssyxh" readonly></el-input>
                    </el-col>
                    <el-col :span="3" :offset="2">
                        <span>最后学历：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="teacher.zgxlm" readonly></el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="bg-purple-light">
                    <el-col :span="3" :offset="1">
                        <span>最高学位：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="teacher.zgxw" readonly></el-input>
                    </el-col>
                    <el-col :span="3" :offset="2">
                        <span>政治面貌：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="teacher.zzmmm" readonly></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30" class="bg-purple-light">
                    <el-col :span="3" :offset="1">
                        <span>职称：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="teacher.zc" readonly></el-input>
                    </el-col>
                    <el-col :span="3" :offset="2">
                        <span>提职称年月：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="teacher.tzcny" readonly></el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30" class="bg-purple-light">
                    <el-col :span="3" :offset="1">
                        <span>导师类型：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="teacher.dslb" readonly></el-input>
                    </el-col>
                    <el-col :span="3" :offset="2">
                        <span>导师性质：</span>
                    </el-col>
                    <el-col :span="7">
                        <el-input v-model="teacher.dsxz" readonly></el-input>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      xgButton: true,
      showMsg: true,
      student: {},
      teacher: {},
      bj: true,
      tj: false
    };
  },
  mounted() {
    if (this.$store.state.identity == 1) {
      this.loadMessage();
    } else if (this.$store.state.identity == 2) {
      this.loadMessage1();
    } else {
      this.$message({
        message: "无信息！",
        type: "error"
      });
    }
  },
  methods: {
    // 修改数据
    loadMessage() {
      this.$http
        .get(this.$server.glourl + "stuinfo/queryPersonal")
        .then(response => {
          //console.log(response.data);
          this.showMsg = true;
          this.student = response.data.stuList;
          this.student.xszw = this.student.xm.substring(0, 1);
          this.student.mzzw = this.student.xm.substring(1);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    loadMessage1() {
      this.$http
        .get(this.$server.glourl + "supervisor/queryAccInfo")
        .then(response => {
          //console.log(response.data);
          this.showMsg = false;
          //   this.xgButton = false;
          this.teacher = response.data.info;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    update() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // this.bj = true
      // this.tj = false
      // console.log(this.student)
      this.$http
        .post(this.$server.glourl + "stuinfo/update", this.student)
        .then(response => {
          this.loadMessage();
          if (response.data.code == 0) {
            this.$message({
              message: "修改成功！",
              type: "success"
            });
          }
          // console.log(1)
        });
    }
  }
};
</script>

<style scoped>
.title {
  font-family: MicrosoftYaHei;
  color: rgba(0, 0, 0, 1);
  text-align: center;
}

.topLine {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 30px;
}

/* 个人头像 */
.student-avatar img {
  display: block;
  width: 55px;
  height: 55px;
  border-radius: 50%;
}

/* 文字颜色：修改 */
.textBlue {
  color: #237ae4;
  cursor: pointer;
}

/* 隔行变色 */
.bg-purple-light {
  background: #f9fafc;
}

/* .el-row {
        padding-left: 19%;
    } */
</style>