<template>
  <div style="width:100%">
   <div>
      <el-row style="width:96%;margin:0 auto;padding-top:30px;">
        <el-col :span="24">
          <el-row style="float:right">
            <el-button type="primary" @click="modify" v-show="xiugai">修改</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div> 
    <div class="container" v-show="!showTable">
      <el-row>
        <!-- <el-col :span="24">
          <el-row style="float:right">
            <el-button type="primary" @click="modify" v-show="xiugai">修改</el-button>
          </el-row>
        </el-col> -->
        <!-- <el-col :span="12">
          <div class="grid-content">
            <el-input placeholder="请输入内容" style="width:50%"></el-input>
            <el-button>查询</el-button>
          </div>
        </el-col> -->
        <el-col :span="24">
          <el-row style="float:right">
            <el-button type="warning" @click="handleEdit" v-show="check">评审</el-button>
          </el-row>
        </el-col>
      </el-row>
      <el-table ref="moviesTable" :data="page.slice((currentPage-1)*pageSize,currentPage*pageSize)" @row-click="clickRow" tooltip-effect="dark" style="margin:0 auto;text-align:center;margin-top:5px" @selection-change="handleSelectionChange" border>
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="80">
        </el-table-column>
        <el-table-column label="id" type="index" align="center" v-if='show'>
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="学号" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.xh }}</template>
        </el-table-column>
        <el-table-column prop="xsxm" label="姓名" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.xsxm }}</template>
        </el-table-column>
        <el-table-column prop="lwtm" label="论文题目" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{ scope.row.lwtm }}</template>
        </el-table-column>
        <el-table-column prop="lwywtm" label="论文英文题目" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{ scope.row.lwywtm }}</template>
        </el-table-column>
        <el-table-column prop="shzt" label="审核状态" show-overflow-tooltip align="center">
          <template slot-scope="scope">{{ scope.row.shzt === '0' ? '待审核' :scope.row.shzt === '1'?'审核通过':scope.row.shzt === '2'?'退回' : '通过'}}</template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align:center;margin-top:30px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.length">
        </el-pagination>
      </div>
    </div>
    <div class="container" v-show="xg">
      <div>
        <el-row>
          <el-col :sapn='24' style="margin-top:5px;line-height:50px">
            <div class="small"></div>
            <span>关键信息</span>
            <!-- <div class="close" @click="close1"> X </div> -->
          </el-col>
        </el-row>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left" style="padding-top:20px">

          <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item label="中文题目：" prop="lwtm">
                <el-input v-model="stuxwlw.lwtm" :readonly="status ? false : 'readonly'"></el-input>
                <el-input v-model="stuxwlw.id" v-show="false"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item label="英文题目：" prop="lwywtm">
                <el-input v-model="stuxwlw.lwywtm" :readonly="status ? false : 'readonly'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="论文起始日期：" prop="lwqsrq">
               <el-date-picker v-model="stuxwlw.lwqsrq" type="date"  placeholder="选择日期">  </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="论文终止日期：" prop="lwzzrq">
                <el-date-picker v-model="stuxwlw.lwzzrq" type="date"  placeholder="选择日期">  </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="论文字数：" prop="lwzs">
                <el-input v-model="stuxwlw.lwzs" placeholder="(万)" :readonly="status ? false : 'readonly'"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="论文类型：" prop="lwlxm">
                <el-input v-model="stuxwlw.lwlxm" :readonly="status ? false : 'readonly'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="论文关键词：" prop="lwztc">
                <el-input v-model="stuxwlw.lwztc" :readonly="status ? false : 'readonly'"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="选题来源：" prop="xtly">
                <el-input v-model="stuxwlw.xtly" :readonly="status ? false : 'readonly'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item label="中文摘要：" prop="zwzy">
                <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容"
                  v-model="stuxwlw.zwzy">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item label="英文摘要：" prop="ywzy">
                <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容"
                  v-model="stuxwlw.ywzy">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" v-show="downloading" style="margin-left:50px">
            <!-- 添加附件 -->
            <div class="el-btn">
              <el-from>
                <el-upload class="upload-demo" :action="baseUrl7" name="file" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList" :on-success="uploadError">
                  <el-button slot="trigger" size="small" class="add">
                    <div class="img">
                      <img src="../../assets/image/attachment.png" alt="" style="width:100%;height:100%;">
                    </div>
                    <span class="append">添加附件</span>
                  </el-button>
                  <div slot="tip" class="el-upload__tip">文件过多，请打压缩包上传！</div>
                </el-upload>
              </el-from>
            </div>
          </el-row>
          <el-row :gutter="20" v-show="!downloading" style="margin-left:3%;margin-top:20px">
            <!-- 下载附件 -->
            <div class="el-btn">
              <a class="append"  href="#" style="color:#606266;text-decoration:none;font-size:14px;margin-left:25px" id="fj" @click="download()">下载附件</a>
            </div>
          </el-row>

        </el-form>
        <div class="bottomBox" style="text-align:center;margin-top:50px" v-show="tg">
          <!--   -->
          <el-button type="primary" class="reset" style="width:30%" @click="adopt()" v-show="tg">审核通过</el-button>
          <el-button type="primary" class="reset" style="width:30%" @click="notadopt()" v-show="tg">退回</el-button>
        </div>
      </div>
      <!-- 保存重置提交 -->
      <div class="bottomBox" style="text-align:center;margin-top:50px" v-show="tj">
        <el-button type="primary" class="reset" @click="update()" style="width:30%" v-show="shzt==null">提交</el-button>
        <el-button type="primary" class="reset" v-show="shzt==0" disabled style="background-color:#909399;border-color:#909399;width:30%">导师审核中</el-button>
        <el-button type="primary" class="reset" v-show="shzt==1" disabled style="background-color:#67c23a;border-color:#67c23a;width:30%">审核通过！</el-button>
        <el-button type="primary" class="reset" v-show="shzt==2" disabled style="background-color:#f56c6c;border-color:#f56c6c;width:30%">数据退回！请修改</el-button>
      </div>
    </div>
    <!--添加-->
    <div class="container" v-show="add">
      <el-row>
        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
          <div class="small"></div>
          <span>添加关键信息</span>
        </el-col>
      </el-row>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left" style="padding-top:20px">
        <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item label="中文题目：" prop="lwtm">
                <el-input v-model="stuxwlw.lwtm" :readonly="status ? false : 'readonly'"></el-input>
                <el-input v-model="stuxwlw.id" v-show="false"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item label="英文题目：" prop="lwywtm">
                <el-input v-model="stuxwlw.lwywtm" :readonly="status ? false : 'readonly'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        
        <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="论文起始日期：" prop="lwqsrq">
                <el-date-picker v-model="stuxwlw.lwqsrq" type="date"  placeholder="选择日期" value-format="yyyy-MM-dd">  </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="论文终止日期：" prop="lwzzrq">
                <el-date-picker v-model="stuxwlw.lwzzrq" type="date"  placeholder="选择日期" value-format="yyyy-MM-dd">  </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

        <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="论文字数：" prop="lwzs">
                <el-input v-model="stuxwlw.lwzs" placeholder="(万)" :readonly="status ? false : 'readonly'"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="论文类型：" prop="lwlxm">
                <el-input v-model="stuxwlw.lwlxm" :readonly="status ? false : 'readonly'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="论文关键词：" prop="lwztc">
                <el-input v-model="stuxwlw.lwztc" :readonly="status ? false : 'readonly'"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11">
              <el-form-item label="选题来源：" prop="xtly">
                <el-input v-model="stuxwlw.xtly" :readonly="status ? false : 'readonly'"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item label="中文摘要：" prop="lwlx">
                <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容"
                  v-model="stuxwlw.zwzy" :readonly="status ? false : 'readonly'">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="22">
              <el-form-item label="英文摘要：" prop="ywzy">
                <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容"
                  v-model="stuxwlw.ywzy" :readonly="status ? false : 'readonly'">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

        <el-row :gutter="20" v-show="downloading" style="margin-left:50px">
          <!-- 添加附件 -->
          <div class="el-btn">
            <el-from>
              <el-upload class="upload-demo" :action="baseUrl7" name="file" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList" :on-success="uploadError">
                <el-button slot="trigger" size="small" class="add">
                  <div class="img">
                    <img src="../../assets/image/attachment.png" alt="" style="width:100%;height:100%;">
                  </div>
                  <span class="append">添加附件</span>
                </el-button>
                <div slot="tip" class="el-upload__tip">文件过多，请打压缩包上传！</div>
              </el-upload>
            </el-from>
          </div>
        </el-row>
      </el-form>
      <!-- 保存重置提交 -->
      <div class="bottomBox" style="text-align:center;margin-top:50px">
        <el-button type="primary" class="reset" @click="submit()" style="width:30%">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ids: "",
      downloading: true,
      status: false,
      showTable: true, //展示列表开关
      currentPage: 1,
      pageSize: 5,
      totalItems: 0,
      username: "",
      dsshzt: "",
      xyshezt: "",
      fujian: "",
      tj: true,
      tg: false,
      btg: false,
      xiugai: false,
      check: false,
      add: false,
      xg: false,
      shzt: "",
      page: [],
      url:"",
      myFileList: false,
      numonst: "",
      fileList: [],
      stuxwlw: {
        lwfj: ""
      },
      stuxwlw: {
        lwfj: ""
      },
      pageHelp: {
        //列表分页辅助类
        host: 1, //后台需要，标识是否研究生综合服务平台请求
        page: 1,
        limit: 5,
        sidx: "id",
        order: "asc"
      }
    };
  },
  mounted() {
    this.loadTable();
  },
  methods: {
    //关闭申请页面
      close1() {
        this.showTable = true
        this.xg = false
        this.loadTable()
      },
    //下载
    download(){
        
    location.href=this.$server.glourl+"stuxwlw/download";

    },
    //点击列表选中
    clickRow(row) {
      this.$refs.moviesTable.toggleRowSelection(row);
      //console.log(row);
    },
    //点击通过
    adopt() {
      this.$http
        .get(this.$server.glourl+"stuxwlw/TutorCheck", {
          params: {
            id: this.stuxwlw.id,
            shenhe: "1"
          }
        })
        .then(res => {
          //console.log(res.data);
          if (res.data.msg == 1) {
            this.$message({
              message: "抱歉，该数据已被审核，不可操作！",
              type: "error"
            });
          } else {
            this.xg = false;
            this.loadTable();
            this.$message({
              message: "审核成功！",
              type: "success"
            });
          }
        });
    },
    //点击通过
    notadopt() {
      this.$http
        .get(this.$server.glourl+"stuxwlw/TutorCheck", {
          params: {
            id: this.stuxwlw.id,
            shenhe: "2"
          }
        })
        .then(res => {
          // console.log(res.data);
          if (res.data.msg == 1) {
            this.$message({
              message: "抱歉，该数据已被审核，不可操作！",
              type: "error"
            });
          } else {
            this.xg = false;
            this.loadTable();
            this.$message({
              message: "审核成功！",
              type: "success"
            });
          }
        });
    },

    //修改
    update() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$http
        .post(this.$server.glourl+"stuxwlw/update", this.stuxwlw)
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "申请信息提交成功，请等待审核！",
              type: "success"
            });
          }
          this.loadTable();
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    //加载个人信息
    loadTable() {
      this.$http
        .get(this.$server.glourl+"stuxwlw/queryPersonInfo")
        .then(response => {
          // console.log(response.data);
          if (response.data.xwlw != null) {
            this.downloading = false;
            this.stuxwlw = response.data.xwlw;
            this.fujian = this.stuxwlw.fj;
            this.username = response.data.username;
            this.shzt = this.stuxwlw.shzt;
            this.xg = true;
          } else {
            this.status = true;
            this.downloading = true;
            this.add = true;
          }
          if (this.username == "xuesheng" && this.shzt == 2) {
            this.xiugai = true;
          }else if (this.username == "daoshi") {
            this.page = response.data.xwlw;
            this.check = true;
            this.xg = false;
            this.add = false;
            this.showTable = false;
          }
        });
    },
    //申请信息提交事件
    submit: function() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$http
        .post(this.$server.glourl+"stuxwlw/save", this.stuxwlw)
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "申请信息提交成功，请等待审核！",
              type: "success"
            });
            this.loadTable();
            this.add = false;
          } 
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //列表选择改变事件
    handleSelectionChange(selection) {
      if (selection.length == 0) {
        this.ids = "";
      } else {
        this.ids = selection[0].id;
        //console.log(this.ids);
      }
    },
    uploadError(response) {
      // console.log(response);
      this.stuxwlw.fj = response.url;
      // this.stuxwlw.lwfj = response.url;
      if (response.msg == 1) {
        this.$message({
          message: "抱歉！你学位资格未通过,上传论文失败！",
          type: "error"
        });
      }
      this.myFileList = true;

      //console.log(response);
    },

    //点击审核
    handleEdit(index, row) {
      if (this.ids == null || this.ids == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
        return;
      }
      this.xg = true;
      this.tg = true;
      this.tj = false;
      // this.showTable = true;
      this.$http.get(this.$server.glourl+"stuxwlw/info/" + this.ids)
        .then(response => {
          this.stuxwlw = response.data.stuXwlw
          this.fujian = this.stuxwlw.fj
          //(this.stuxwlw)
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //点击修改
    modify() {
      this.status = true;
      this.downloading = true;
      this.shzt = null;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      // this.$message.warning(
      //   `当前限制选择 3 个文件，本次选择了 ${
      //     files.length
      //   } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      // );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style scoped>
.topBlue {
  width: 10%;
  height: 35px;
  background-color: #237ae4;
  color: #ffffff;
  text-align: center;
  line-height: 35px;
  position: absolute;
  top: -10px;
  left: 28px;
}
.divShadows {
  width: 97%;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 1%;
  padding-bottom: 1%;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
  position: relative;
}
.divShadow {
  width: 97%;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 1%;
  padding-bottom: 3%;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
  position: relative;
}
/* 蓝色圆点 */
.small {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #237ae4;
  display: inline-block;
  margin-right: 7px;
}
.img {
  float: left;
  line-height: 20px;
  width: 12px;
  height: 14px;
}
.container {
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  margin-top: 10px;
  overflow: hidden;
}
.reset {
  width: 10%;
  margin-left: 5%;
  margin-right: 5%;
  font-size: 16px;
  background-color: #237ae4;
}
.bottomBox {
  width: 97%;
  background: rgba(255, 255, 255, 1);
  margin-top: 3%;
  padding-bottom: 1%;
}
.el-form-item {
  margin-left: 56px;
}
/* 日期控件样式 */
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
}
</style>
