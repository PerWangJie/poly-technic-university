<template>
  <div>
    <div class="container" v-show="showTable">
      <div class="header">
        <!-- 查询部分 -->
        <!-- <div class="left">
            <el-input placeholder="请输入内容" class="header-input" clearable></el-input>
            <el-button>查询</el-button>
          </div> -->

        <!-- 增删改查 -->
        <div class="right">
          <!-- <el-button type="warning" @click="handleReport">成果录入</el-button> -->
          <el-button type="danger" @click="applyChange">修改</el-button>
          <el-button type="primary" @click="handleSee">查看审核信息</el-button>
          <!-- <el-button type="success" @click="handleSee">审核</el-button> -->
        </div>

        <el-dialog title="审核信息" :visible.sync="seeVisible" width="30%" :before-close="handleClose">
          <div style="border:1px solid #ddd;padding:20px;margin-bottom:20px" v-for="(item, index) in his" :key="index">
            <div class="see-title" style="border-bottom: 1px solid #ddd;padding-bottom:20px;font-size:17px">{{item.name}}</div>
            <el-row style="padding: 20px 0 20px 0;border-bottom:1px solid #ddd">
              <el-col :span="24">
                <span>经办人：{{item.assignee}}</span>
              </el-col>
            </el-row>

            <el-row style="padding: 20px 0 20px 0;border-bottom:1px solid #ddd">
              <el-col :span="24">
                <span>开始时间：{{item.startTime}}</span>
              </el-col>
            </el-row>

            <el-row style="padding: 20px 0 0 0">
              <el-col :span="24">
                <span>结束时间：{{item.endTime}}</span>
              </el-col>
            </el-row>

            <el-row style="padding: 20px 0 0 0" v-if="item.comment!=null">
              <el-col :span="24">
                <span>审核意见：{{item.comment}}</span>
              </el-col>
            </el-row>

            <el-row style="padding: 20px 0 0 0" v-if="item.state!=null">
              <el-col :span="24">
                <span v-if="item.state == '1' && item.name != '提交申请'">审核：
                  <el-button type="success">{{item.state == '1' ?'通过': item.state == '2' ? '退回': item.state == '0' ? '不通过': item.state == '3' ? '指定学科账号成功':item.state == '4'?'指定学院账号成功':'指定学位点账号成功'}}</el-button>
                </span>
                <span v-if="item.state == '0' && item.name != '提交申请'">审核：
                  <el-button type="danger">{{item.state == '1' ?'通过': item.state == '2' ? '退回': item.state == '0' ? '不通过': item.state == '3' ? '指定学科账号成功':item.state == '4'?'指定学院账号成功':'指定学位点账号成功'}}</el-button>
                </span>
                <span v-if="item.state == '2' && item.name != '提交申请'">审核：
                  <el-button type="success">{{item.state == '1' ?'通过': item.state == '2' ? '退回': item.state == '0' ? '不通过': item.state == '3' ? '指定学科账号成功':item.state == '4'?'指定学院账号成功':'指定学位点账号成功'}}</el-button>
                </span>
                <span v-if="item.state == '3' && item.name != '提交申请'">审核：
                  <el-button type="success">{{item.state == '1' ?'通过': item.state == '2' ? '退回': item.state == '0' ? '不通过': item.state == '3' ? '指定学科账号成功':item.state == '4'?'指定学院账号成功':'指定学位点账号成功'}}</el-button>
                </span>
                <span v-if="item.state == '4' && item.name != '提交申请'">审核：
                  <el-button type="success">{{item.state == '1' ?'通过': item.state == '2' ? '退回': item.state == '0' ? '不通过': item.state == '3' ? '指定学科账号成功':item.state == '4'?'指定学院账号成功':'指定学位点账号成功'}}</el-button>
                </span>
                <span v-if="item.state == '5' && item.name != '提交申请'">审核：
                  <el-button type="success">{{item.state == '1' ?'通过': item.state == '2' ? '退回': item.state == '0' ? '不通过': item.state == '3' ? '指定学科账号成功':item.state == '4'?'指定学院账号成功':'指定学位点账号成功'}}</el-button>
                </span>
              </el-col>
            </el-row>
          </div>

          <span slot="footer" class="see-footer">
            <el-button @click="seeVisible = false">取 消</el-button>
            <el-button type="primary" @click="seeVisible = false">确 定</el-button>
          </span>
        </el-dialog>

      </div>
      <div>
        <el-table ref="moviesTable" @row-click="clickRow" border :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">

          <el-table-column type="selection" width="55">
          </el-table-column>

          <el-table-column label="序号" type="index" :index="indexMethod" width="80" align="center">
          </el-table-column>

          <!-- <el-table-column label="项目类型" prop="xmlx" align="center">
            </el-table-column> -->

          <el-table-column label="项目名称" prop="xmmc" align="center">
          </el-table-column>

          <el-table-column label="审核状态" prop="zt" align="center">
            <template slot-scope="scope">
              {{ scope.row.zt == 0 ? '审核不通过' :scope.row.zt == 1 ? '审核通过':scope.row.zt == 2 ? '审核中' :scope.row.zt == 3 ? '待审核':scope.row.zt == 4 ? '退回':scope.row.zt == 5 ?'未提交':''}}
            </template>
          </el-table-column>

          <el-table-column label="创建时间" prop="cjsj" align="center">
            <template slot-scope="scope">{{scope.row.cjsjString}}</template>
          </el-table-column>
          <el-table-column label="编辑" align="center" prop="bj">
            <template slot-scope="scope">
              <el-button type="primary" :size="small" plain @click="download(scope.row.lcid,scope.row.zt)">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageList.currPage" :page-sizes="[5,10,15]" :page-size="pageList.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageList.totalCount">
        </el-pagination>
      </div>
    </div>
    <!-- 成果录入 -->
    <div class="container" v-show="showTable1">

      <el-form :model="cglrsave" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">

        <el-row>
          <el-col :sapn='24' style="margin-top:5px;line-height:50px">
            <div class="small"></div>
            <span>个人及项目基本情况</span>
            <div class="close" @click="close1"> X </div>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="姓名：">
              <el-input v-model="cglrsave.xm"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="性别：" prop="gender">
              <el-input v-model="cglrsave.xbm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="出生年月：" prop="birth">
              <el-input v-model="cglrsave.csrq"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="政治面貌：" prop="political">
              <el-input v-model="cglrsave.zzmm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="专业：">
              <el-input v-model="cglrsave.zy"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="学号：">
              <el-input v-model="cglrsave.xh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <!-- <el-col :span="11">
                    <el-form-item label="境外时间：" prop="time">
                        <el-input v-model="cglrsave.jwts"></el-input>
                    </el-form-item>
                </el-col> -->
          <el-col :span="11">
            <el-form-item label="项目名称：" prop="projectName">
              <el-input v-model="cglrsave.xmmc"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="指导老师：" prop="advisor">
              <el-input v-model="cglrsave.dsxm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="境外时间：（必填项）" prop="sj">
              <div class="date">
                <el-form-item>
                  <el-date-picker v-model="cglrsave.sj" value-format="yyyy-MM-dd" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="境外天数：" prop="outsideDays">
              <el-input v-model="cglrsave.jwts" readonly="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="境外地点：" prop="location">
              <el-input v-model="cglrsave.gwtxdz"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="E-mail：" prop="mail">
              <el-input v-model="cglrsave.yx"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="联系电话：" prop="phone">
              <el-input v-model="cglrsave.dh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-row :gutter="30">
              <el-col :span="22">
                    <el-form-item label="项目名称：" prop="projectName">
                        <el-input v-model="cglrsave.xmmc"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> -->

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="项目执行情况：" prop="execution">
              <el-input v-model="cglrsave.xmzxqk"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="项目取得的成效：" prop="effect">
              <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容" v-model="cglrsave.xmqdcx">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 添加附件 -->
        <div class="append-btn">
          <el-upload class="upload-demo" :action="baseUrls" :on-progress="progress" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :on-success="handleSuccess" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
            <el-col :span="24">
              <el-button size="small" @click="print">
                <div class="append-img">
                  <img src="../../assets/image/attachment.png" alt="" style="width:100%;height:100%;">
                </div>
                <p class="append-text">添加附件</p>
              </el-button>
            </el-col>
            <!-- <el-col :span="12">
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-col> -->
          </el-upload>
        </div>

        <el-row :gutter="30">
          <!-- 提交重置 -->
          <div class="submit-box">
            <el-button type="primary" @click="saveMsg" class="submit-btn">保存</el-button>
            <!-- <el-button type="primary" @click="reset" class="submit-btn">重置</el-button> -->
            <el-button type="danger" @click="handleCancel" class="submit-btn">取消</el-button>
            <!-- :loading="this.loading" -->
            <el-button type="primary" @click="changeSubmit" class="submit-btn" :disabled="onsuccess1">{{ submit }}</el-button>
            <!-- //v-if="has('stugjhpycg:update')" -->
          </div>
        </el-row>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onsuccess: false,
      submit: "提交",
      loading: true,
      fileList: [], //上传文件列表展示
      dataList: [],
      showTable: true, //展示列表开关
      showTable1: false, //成果录入开关
      id: "",
      lcid: "",
      zt: "",
      his: [],
      seeVisible: false, //审核流程图显示开关
      //列表前端分页
      pageList: {
        totalCount: "",
        pageSize: "",
        totalPage: "",
        currPage: ""
      },
      pageHelp: {
        page: 1,
        limit: 5,
        sidx: "cjsj",
        order: "desc"
      },
      cglrsave: {
        xh: "",
        sj: [],
        xmmc: "",
        cgbbid: "",
        xmzxqk: "",
        xmqdcx: "",
        fj: []
      },
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        major: [{ required: true, message: "请输入专业", trigger: "blur" }],
        studentId: [{ required: true, message: "请输入学号", trigger: "blur" }],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.loadTable();
  },
  methods: {
    // 时间戳转换成时间
    // 使用element table组件中的formatter属性，传入一个函数
    timestampToTime(row, column) {
      var date = new Date(row.cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    // 分页功能
    indexMethod(index) {
      return (this.pageList.currPage - 1) * this.pageList.pageSize + index + 1;
    },
    handleSizeChange(val) {
      this.pageList.pageSize = val;
      this.pageHelp.limit = this.pageList.pageSize;
      this.pageHelp.page = this.pageList.currPage;
      this.loadTable();
    },
    handleCurrentChange(currentPage) {
      this.pageList.currPage = currentPage;
      this.pageHelp.page = this.pageList.currPage;
      this.loadTable();
    },
    loadTable() {
      // if(this.has('stugjhpycg:selectPycgListForService')){
      this.$http
        .get(this.$server.glourl + "stugjhzxxm/selectPycgListForService", {
          params: this.pageHelp
        })
        .then(response => {
          const data = response.data;
          this.dataList = data.page.list;
          this.pageList = data.page;
          //console.log(response.data)
        });
      // }else {
      //   console.log(1)
      // }
    },
    // 列表选择改变事件
    handleSelectionChange(selection) {
      if (selection.length == 0) {
        this.id = "";
        this.lcid = "";
        this.zt = "";
      } else {
        this.id = selection[0].id;
        this.lcid = selection[0].lcid;
        this.zt = selection[0].zt;
        // console.log(this.id)
        // console.log(this.lcid)
      }
    },
    handleReport() {
      if (this.id == null || this.id == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
      } else {
        this.$http
          .get(this.$server.glourl + "stugjhpycg/selectPYCGInit")
          .then(response => {
            this.list = response.data.list;
            // console.log(this.list)
          });
        this.showTable = false;
      }
    },
    // 查看审核信息
    handleSee() {
      if (this.lcid == null || this.lcid == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
        return;
      } else {
        this.$http
          .get(
            this.$server.glourl + "stucgbb/selectHisBuLcid?lcid=" + this.lcid
          )
          .then(response => {
            for (let i = 0; i < response.data.his.length; i++) {
              if (response.data.his[i].endTime != null) {
                response.data.his[i].endTime = this.changeDataType(
                  response.data.his[i].endTime
                );
              }
              response.data.his[i].startTime = this.changeDataType(
                response.data.his[i].startTime
              );
            }
            this.his = response.data.his;
            // console.log(this.his)
          });
        this.seeVisible = true;
      }
    },
    //改变时间格式
    changeDataType(time) {
      const date = new Date();
      date.setTime(time); // value通过截取字符串只取数字。
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    },
    //点击列表选中
    clickRow(row) {
      this.$refs.moviesTable.toggleRowSelection(row);
      //console.log(row);
    },
    //关闭申请页面
    close1() {
      this.showTable = true;
      this.showTable1 = false;
      this.loadTable();
    },
    //取消
    handleCancel() {
      this.showTable = true;
      this.showTable1 = false;
      this.loadTable();
    },
    // 修改申请表单
    applyChange() {
      if (this.id == null || this.id == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
      } else if (this.zt == 4 || this.zt == 5) {
        this.$http
          .get(
            this.$server.glourl + "stugjhpycg/queryStuAndResult?id=" + this.id
          )
          .then(response => {
            this.cglrsave = response.data.map;
            if (response.data.map == "1") {
              this.cglrsave.xbm = "男";
            } else {
              this.cglrsave.xbm = "女";
            }
            // 附件展示，需要解析成对象
            this.cglrsave.fj = JSON.parse(response.data.map.fj);
            this.fileList = this.cglrsave.fj;
            // console.log(response.data.map)
            //数组转字符串：join()
            //字符串转数组：split('')
          });
        this.showTable = false;
        this.showTable1 = true;
      } else {
        this.$message({
          message: "只能修改退回或未提交的信息！",
          type: "error"
        });
      }
    },
    //修改保存
    saveMsg() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$http
        .post(this.$server.glourl + "stugjhpycg/saveforupdate", this.cglrsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.showTable = true;
            this.showTable1 = false;
            this.loadTable();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 修改申请表单提交
    changeSubmit() {
      if (!this.cglrsave.sj) {
        this.$message({
          message: "请选择境外时间！",
          type: "error"
        });
        return;
      }
      this.loading = true;
      this.submit = "加载中";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$http
        .post(this.$server.glourl + "stugjhpycg/update", this.cglrsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "修改成功！",
              type: "success"
            });
            this.loading = false;
            this.submit = "提交";
            this.showTable = true;
            this.showTable1 = false;
            this.loadTable();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
      this.cglrsave.fj.push({ name: response.name, url: response.url });
      this.onsuccess = false;
    },
    progress: function() {
      this.onsuccess = true;
    },
    handleRemove(file, fileList) {
      this.onsuccess = false;
      this.fileList = fileList;
      this.cglrsave.fj = this.fileList;
    },
    handlePreview(file) {
      //console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //列表下载按钮
    download(lcid, zt) {
      if (zt == "1") {
        location.href =
          this.$server.glourl + "stugjhpycg/downWord?lcid=" + lcid;
      } else {
        this.$message({
          message: "审核未通过！",
          type: "error"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/common"; //必须加分号，不然会报错
@import "../../style/ele";
.el-button + .el-button {
  margin-left: 0px;
}
</style>
