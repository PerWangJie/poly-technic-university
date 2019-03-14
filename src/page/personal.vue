<template>
    <div>
        <div class="shouye" style="line-height:60px;color:rgba(102,102,102,1);font-size:14px">
            <el-form v-show="teaUser" :rules="rules" ref="grda" label-width="50%" class="demo-grda" label-position="left" style="padding-top:5px;line-height:60px">
                <!-- <el-row :gutter="22">
                    <el-col :span="10">
                        <el-form-item label="入学时照片：">
                            <div class="user-avatar">
                                <img src="../assets/image/avatar.jpg" alt="">
                            </div>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="毕业时照片：">
                            <div class="user-avatar">
                                <img src="../assets/image/avatar.jpg" alt="">
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row> -->
                <el-row :gutter="22" class="bg-purple-light">
                    <el-col :span="10">
                        <el-form-item label="姓名：">
                            <el-input v-model="user.xsxm" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="学号：">
                            <el-input v-model="user.xh" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22">
                    <el-col :span="10">
                        <el-form-item label="性别：">
                            <el-input v-model="user.xbm" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="所属学院：">
                            <el-input v-model="user.ssyx" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22" class="bg-purple-light">
                    <el-col :span="10">
                        <el-form-item label="民族：">
                            <el-input v-model="user.mzm" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="入学方式：">
                            <el-input v-model="user.rxfsm" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22">
                    <el-col :span="10">
                        <el-form-item label="籍贯：">
                            <el-input v-model="user.jg" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="入学前所属单位：">
                            <el-input v-model="user.rxfsm" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22" class="bg-purple-light">
                    <el-col :span="10">
                        <el-form-item label="大学毕业学校：">
                            <el-input v-model="user.dxbyyx" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="入学时学历：">
                            <el-input v-model="user.rxxlm" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22">
                    <el-col :span="10">
                        <el-form-item label="本科毕业专业：">
                            <el-input v-model="user.dxzy" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="入学年月：">
                            <el-input v-model="user.rxny" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22" class="bg-purple-light">
                    <el-col :span="10">
                        <el-form-item label="婚姻状况：">
                            <el-input v-model="user.hyzkm" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="本人电子邮箱：">
                            <el-input v-model="user.yx" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22">
                    <el-col :span="10">
                        <el-form-item label="本人电话：">
                            <el-input v-model="user.yx" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="本人邮编：">
                            <el-input v-model="user.yx" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22" class="bg-purple-light">
                    <el-col :span="10">
                        <el-form-item label="本人地址：">
                            <el-input v-model="user.brtxdz" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                        <el-form-item label="家庭住址：">
                            <el-input v-model="user.jttxdz" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="10" :offset="2">
                        <el-form-item label="生源地：">
                            <el-input v-model="user.syd" readonly></el-input>
                        </el-form-item>
                    </el-col> -->
                </el-row>
                <!-- <el-row :gutter="22">
                    <el-col :span="10">
                        <el-form-item label="所学学科（专业）：">
                            <el-input v-model="user.sxzy" readonly></el-input>
                        </el-form-item>
                    </el-col>

                   
                </el-row> -->
                <el-row :gutter="22" class="bg-purple-light">
                    <el-col :span="10">
                        <el-form-item label="政治面貌：">
                            <el-input v-model="user.zzmmm" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="家庭联系电话：">
                            <el-input v-model="user.zzmmm" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-row :gutter="22">
                    <el-col :span="10">
                        <el-form-item label="乘车区间：">
                            <el-input v-model="user.ccqj" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="家庭邮箱：">
                            <el-input v-model="user.jtyx" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22" class="bg-purple-light">
                    <el-col :span="10">
                        <el-form-item label="获学士门类：">
                            <el-input v-model="user.hxsml" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="加入党派年月：">
                            <el-input v-model="user.jrdpny" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22">
                    <el-col :span="10">
                        <el-form-item label="奖、助学金的拨款账号：">
                            <el-input v-model="user.bkzh" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                        <el-form-item label="获勤工助学金：">
                            <el-input v-model="user.zxj" readonly></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row :gutter="22" class="bg-purple-light">

                    <el-col :span="10">
                        <el-form-item label="获普通奖学金：">
                            <el-input v-model="user.jxj" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                        <el-form-item label="应交总学费：">
                            <el-input v-model="user.yjzxf" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22">
                    <el-col :span="10">
                        <el-form-item label="应交总教材费：">
                            <el-input v-model="user.yjzjcf" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="已交总学费：">
                            <el-input v-model="user.yjzxf" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22" class="bg-purple-light">
                    <el-col :span="10">
                        <el-form-item label="应交总代收费：">
                            <el-input v-model="user.yjzdsf" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="已交总教材费：">
                            <el-input v-model="user.yjzjcfs" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22">
                    <el-col :span="10">
                        <el-form-item label="欠交总教材费：">
                            <el-input v-model="user.qjzjcf" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="欠交总学费：">
                            <el-input v-model="user.qjzxf" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22" class="bg-purple-light">
                    <el-col :span="10">
                        <el-form-item label="交费账号：">
                            <el-input v-model="user.jfzh" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="已交总代收费：">
                            <el-input v-model="user.yjzdsfs" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22">
                    <el-col :span="10">
                        <el-form-item label="今年应缴费：">
                            <el-input v-model="user.jnyjf" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20" style="text-align:center;color:red;">
                        费用如有疑问，请凭交费单据到财务处会计科核实。
                    </el-col>
                </el-row> -->
                <!-- <el-row>
                    <el-col :span="20">
                        家庭成员及社会关系：
                    </el-col>
                    <el-input type="textarea" v-model="user.jtcy" :rows="8" style="width:91.5%">
                    </el-input>
                </el-row> -->
                <!-- <el-row style="margin-top:20px;">
                    <el-col :span="22">
                        研究生招生考试成绩：
                    </el-col>
                </el-row>
                <el-row :gutter="22" class="bg-purple-light">
                    <el-col :span="10">
                        <el-form-item label="考试科目：">
                            <el-input v-model="user.kskm" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="考试成绩：">
                            <el-input v-model="user.kscj" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> -->
                <el-row>
                    <el-col :span="20">
                        个人简历：
                    </el-col>
                    <el-input type="textarea" v-model="user.grjl" :rows="8" style="width:91.5%;padding-bottom:20px">
                    </el-input>
                </el-row>
                <el-row :gutter="22" class="bg-purple-light">
                    <!-- <el-col :span="10">
                        <el-form-item label="学位论文题目：">
                            <el-input v-model="user.lwtm" readonly></el-input>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="10">
                        <el-form-item label="授予学位：">
                            <el-input v-model="user.syxw" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                        <el-form-item label="毕业证书号：">
                            <el-input v-model="user.byzsh" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22">
                    <!-- <el-col :span="10">
                        <el-form-item label="奖惩记录：">
                            <el-input v-model="user.jcjl" readonly></el-input>
                        </el-form-item>
                    </el-col> -->

                </el-row>
                <el-row :gutter="22" class="bg-purple-light">
                    <!-- <el-col :span="10">
                        <el-form-item label="答辩日期：">
                            <el-input v-model="user.dbrq" readonly></el-input>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="10">
                        <el-form-item label="获学位日期：">
                            <el-input v-model="user.hdxwrq" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                        <el-form-item label="学位证书号：">
                            <el-input v-model="user.xwzsh" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22">
                    <!-- <el-col :span="10">
                        <el-form-item label="学位论文等级：">
                            <el-input v-model="user.lwdj" readonly></el-input>
                        </el-form-item>
                    </el-col> -->

                </el-row>
                <!-- <el-row :gutter="22" class="bg-purple-light">
                    <el-col :span="10">
                        <el-form-item label="学籍异动：">
                            <el-input v-model="user.xjyd" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="就业单位：">
                            <el-input v-model="user.jydw" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> -->
                <el-row :gutter="22">
                    <el-col :span="10">
                        <el-form-item label="结束学业年月：">
                            <el-input v-model="user.jsxyny" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-form v-show="!teaUser" :rules="rules" ref="grda" label-width="50%" class="demo-grda" label-position="left" style="padding-top:5px;line-height:60px">
                <!-- <el-row :gutter="22">
                    <el-col :span="10">
                        <el-form-item label="入学时照片：">
                            <div class="user-avatar">
                                <img src="../assets/image/avatar.jpg" alt="">
                            </div>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="毕业时照片：">
                            <div class="user-avatar">
                                <img src="../assets/image/avatar.jpg" alt="">
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row> -->
                <el-row :gutter="22" class="bg-purple-light">
                    <el-col :span="10">
                        <el-form-item label="导师姓名：">
                            <el-input v-model="teacher.xm" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                        <el-form-item label="导师工号：">
                            <el-input v-model="teacher.gh" readonly></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row :gutter="22">
                    <el-col :span="10">
                        <el-form-item label="出生日期：">
                            <el-input v-model="teacher.csrq" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="导师性别：">
                            <el-input v-model="teacher.xbm" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22" class="bg-purple-light">
                    <el-col :span="10">
                        <el-form-item label="所属院系：">
                            <el-input v-model="teacher.ssyxh" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="最后学历：">
                            <el-input v-model="teacher.zgxlm" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22">
                    <el-col :span="10">
                        <el-form-item label="最高学位：">
                            <el-input v-model="teacher.zgxw" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="政治面貌：">
                            <el-input v-model="teacher.zzmmm" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22" class="bg-purple-light">
                    <el-col :span="10">
                        <el-form-item label="职称：">
                            <el-input v-model="teacher.zc" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="提职称年月：">
                            <el-input v-model="teacher.tzcny" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22">
                    <el-col :span="10">
                        <el-form-item label="导师类型：">
                            <el-input v-model="teacher.dslb" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="导师性质：">
                            <el-input v-model="teacher.dsxz" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22" class="bg-purple-light">
                    <el-col :span="10">
                        <el-form-item label="导师身份证号：">
                            <el-input v-model="teacher.gh" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="工作单位：">
                            <el-input v-model="teacher.dwh" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22">
                    <el-col :span="10">
                        <el-form-item label="职务：">
                            <el-input v-model="teacher.zw" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="获硕士资格年月：">
                            <el-input v-model="teacher.hsdny" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22" class="bg-purple-light">
                    <el-col :span="10">
                        <el-form-item label="硕士资格证书号：">
                            <el-input v-model="teacher.sdzsh" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                        <el-form-item label="获博士资格年月：">
                            <el-input v-model="teacher.hbdny" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22">
                    <el-col :span="10">
                        <el-form-item label="博士资格证书号：">
                            <el-input v-model="teacher.bdzsh" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="聘任年月：">
                            <el-input v-model="teacher.lxrq" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22" class="bg-purple-light">
                    <el-col :span="10">
                        <el-form-item label="办公电话：">
                            <el-input v-model="teacher.bgsdh" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="手机号：">
                            <el-input v-model="teacher.yddh" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="22">
                    <el-col :span="10">
                        <el-form-item label="电子邮箱：">
                            <el-input v-model="teacher.dzyx" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10" :offset="2">
                        <el-form-item label="是否今年招生：">
                            <el-input v-model="teacher.jnzs" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- <div style="width:100%;height:200px;border-top:1px solid #000000;margin-top:30px;text-align:center;line-height:200px">
            <el-button type="primary" style="width:350px;height:50px">打印个人档案</el-button>
        </div> -->
    </div>
</template>
<style scoped>
.el-form-item {
  margin-top: 11px;
  margin-bottom: 11px;
}
.bg-purple-light {
  background: #f9fafc;
}
.el-row {
  padding-left: 10%;
  box-sizing: border-box;
}
.user-avatar img {
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>
<style>
.shouye .el-input__inner {
  height: 33px;
  font-size: 13px;
  box-shadow: none;
  border: 1px solid #ffffff;
}

.shouye .el-input__inner:hover {
  border-color: #ffffff;
}

.shouye .el-input__inner:focus {
  border-color: #ffffff;
  box-shadow: none;
  transition-duration: 0.5s;
}

.shouye .el-input__inner::-webkit-input-placeholder {
  line-height: 20px;
}
</style>

<script>
var _this;
export default {
  data() {
    return {
      teaUser: true,
      teacher: {},
      user: {},
      grda: {},
      tableData6: [
        {
          id: "12987122",
          amount3: 10
        }
      ],
      rules: {}
    };
  },
  mounted() {
     this.loadMessage();
  },
  methods: {
    loadMessage() {
      this.$http
        .get(this.$server.glourl + "supervisor/queryAccInfo")
        .then(response => {
            this.$store.commit("IDEN", response.data.info.identity);
           // console.log(response.data)
          if (response.data.info.identity == 1) {
            this.user = response.data.info;
            if (response.data.info.xbm == "1") {
              this.user.xbm = "男";
            } else {
              this.user.xbm = "女";
            }
            this.teaUser = true;
          } else {
            this.teacher = response.data.info;
            if (response.data.info.xbm == 1) {
              this.teacher.xbm = "男";
            } else {
              this.teacher.xbm = "女";
            }
            if (response.data.info.isEnroll == 0) {
              this.teacher.isEnroll = "否";
            } else {
              this.teacher.isEnroll = "是";
            }
             if (response.data.info.jnzs == 0) {
              this.teacher.jnzs = "否";
            } else {
              this.teacher.jnzs = "是";
            }
            this.teaUser = false;
            //console.log(this.teacher);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>
