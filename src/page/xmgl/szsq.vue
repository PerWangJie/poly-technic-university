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
          <el-button type="success" @click="addApply">申请</el-button>
          <!-- <el-button type="warning">查看详情</el-button> -->
          <!-- <el-button type="primary">审核进度</el-button> -->
        </div>
      </div>

      <!-- 表格 -->
      <div class="table">
        <el-table v-loading="loading" :data="dataList" @row-click="clickRow" tooltip-effect="dark" border style="width: 100%;text-align: center" ref="moviesTable" @selection-change="handleSelectionChange">

          <el-table-column type="selection" label="全选" align="center"></el-table-column>

          <el-table-column label="序号" sortable width="80" type="index" :index="indexMethod" align="center">
          </el-table-column>

          <!-- <el-table-column prop="gblx" label="攻博类型" align="center">
                    </el-table-column> -->

          <!-- <el-table-column prop="sqzzlx" label="申请资助类型"  align="center">
                    </el-table-column> -->

          <el-table-column prop="xmmc" label="项目名称" align="center">
          </el-table-column>

          <!-- <el-table-column label="审核状态" prop="zt" align="center">
                      <template slot-scope="scope">
                            {{ scope.row.zt === 0 ? '审核不通过' :scope.row.zt === 1 ? '审核通过':scope.row.zt === 2 ? '审核中' :scope.row.zt === 3 ? '待审核': '退回'}}
                        </template>
                    </el-table-column> -->

          <el-table-column label="项目类型" prop="name" align="center">

          </el-table-column>

          <el-table-column label="开始时间" align="center" prop="kssjString">
            <template slot-scope="scope">{{scope.row.kssjString}}</template>
          </el-table-column>
          <el-table-column label="结束时间" align="center" prop="jssjString">
            <template slot-scope="scope">{{scope.row.jssjString}}</template>
          </el-table-column>
          <el-table-column label="要求及通知" align="center">
            <template slot-scope="scope">
              <el-button type="primary" :size="small" plain @click="query(scope.row.xmyq)">查看详情</el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <el-dialog title="要求及通知" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <textarea rows="25" v-model="queryMsg" readonly></textarea>
        <!-- {{queryMsg}} -->
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageList.currPage" :page-sizes="[5,10,15]" :page-size="pageList.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageList.totalCount">
        </el-pagination>
      </div>
    </div>
    <div class="container" v-show="!showTable">

      <!-- 项目表单 -->
      <el-form :model="init" :rules="rules1" ref="init" label-width="177px" class="demo-ruleForm" label-position="left">
        <el-row>
          <el-col :sapn='24' style="margin-top:5px;line-height:50px">
            <div class="small"></div>
            <span>项目发布信息</span>
            <div class="close" @click="close1"> X </div>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="项目名称：" prop="">
              <el-input v-model="init.xmmc" readonly></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="起止时间：" prop="">
              <el-input v-model="init.stringSj" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="项目类型：" prop="">
              <el-input v-model="init.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="要求及内容：" prop="">
              <el-input v-model="init.xmyq" type="textarea" :autosize="{ minRows: 5, maxRows: 7}" placeholder="请输入内容" style="padding-left:0">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 附件展示 -->
        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="附件：" prop="">
              <a :href="item.url" v-for="item in init.fj" class="fj" :key="item">
                <i class="el-icon-document"></i>
                {{item.name}}<br/>
              </a>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :sapn='24' style="margin-top:5px;line-height:50px">
            <div class="small"></div>
            <span>项目申请信息</span>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="项目名称：" prop="">
              <el-input v-model="kcsz.xmmc"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="项目负责人：" prop="">
              <el-input v-model="kcsz.xmfzr"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 添加附件 -->
        <div class="append-btn" style="padding-left: 0 !important;margin-top: 0 !important">
          <el-form-item label="word附件：" prop="">
            <el-upload class="upload-demo" :action="baseUrls" :on-progress="progress1" :on-preview="handlePreview" :on-remove="handleRemove1" :before-remove="beforeRemove" :on-success="handleSuccess1" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList1">
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
          </el-form-item>
          <el-form-item label="pdf附件：" prop="">
            <el-upload class="upload-demo" :action="baseUrls" :on-progress="progress2" :on-preview="handlePreview" :on-remove="handleRemove2" :before-remove="beforeRemove" :on-success="handleSuccess2" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList2">
              <el-col :span="24">
                <el-button size="small" @click="print">
                  <div class="append-img">
                    <img src="../../assets/image/attachment.png" alt="" style="width:100%;height:100%;">
                  </div>
                  <p class="append-text">添加附件</p>
                </el-button>

              </el-col>

            </el-upload>
          </el-form-item>
        </div>
        <!-- 提交重置 -->
        <div class="submit-box">
          <!-- <el-button type="primary" @click="saveMsg" class="submit-btn">保存</el-button> -->
          <el-button type="primary" @click="close1" class="submit-btn">返回</el-button>
          <el-button :loading="this.loading" type="primary" @click="applySubmit1" class="submit-btn">{{ submit }}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  inject: ["reload"],
  data() {
    return {
      kcsz: {},
      timestamp: "", //申请列表当前时间
      timestamp1: "", //提交当前时间
      onsuccess1: false,
      onsuccess2: false,
      init: {},
      showTable: true,
      wordfj: [],
      pdffj: [],
      queryMsg: "",
      dialogVisible: false,
      sfzq: "", //判断中期报告和总结报告能否继续填写
      tableTime: "", //列表结束时间
      tableTimest: "", //列表开始时间
      changeTime: "", //修改当前时间
      subTime: "", //提交当前时间
      onsuccess1: false,
      onsuccess2: false,
      onsuccess3: false,
      submit: "提交",
      loading: false, //显示正在加载中动画开关
      dataList: [],
      id: "",
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
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        studentId: [{ required: true, message: "请输入学号", trigger: "blur" }],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 列表页面：
    // 时间戳转换成时间：使用element table组件中的formatter属性，传入一个函数
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
    // 加载列表
    loadTable() {
      //   if (this.has("stuybpyxm:selectListForService")) {
      this.$http
        .get(this.$server.glourl + "diyxmfb/list2", {
          params: this.pageHelp
        })
        .then(response => {
          console.log(response.data)
          const data = response.data;
          this.dataList = data.page.list;
          this.pageList = data.page;
        });
      //   } else {
      //     console.log();
      //   }
    },
    //列表查询
    query(queryMsg) {
      // console.log(queryMsg);
      this.queryMsg = queryMsg;
      this.dialogVisible = true;
    },
    addApply() {
      if (this.id == null || this.id == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
      } else {
        this.timestamp = new Date().getTime();
        if (this.timestamp < this.tableTimest) {
          this.$message({
            message: "请等待项目开启!",
            type: "error"
          });
          return;
        } else {
          if (this.timestamp > this.tableTime) {
            this.$message({
              message: "已过期，无效操作!",
              type: "error"
            });
            return;
          } else {
            this.showTable = false;
            this.$http
              .get(this.$server.glourl + "diyxmfb/info/" + this.id)
              .then(response => {
                this.init = {};
                this.init.xmmc = response.data.diyXmfb.xmmc;

                this.init.stringSj = response.data.diyXmfb.stringSj;
                this.init.name = response.data.diyXmfb.name;
                this.init.xmyq = response.data.diyXmfb.xmyq;
                this.init.fj = JSON.parse(response.data.diyXmfb.fj);
              });
          }
        }
      }
    },
    // 文件上传成功时的钩子
    // handleSuccess2 (response, file, fileList) {
    //     this.zqbgsave.fj.push({name:response.name, url:response.url})
    // },
    // handleSuccess3 (response, file, fileList) {
    //     this.zjbgsave.fj.push({name:response.name, url:response.url})
    // },
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
    //点击列表选中
    clickRow(row) {
      this.$refs.moviesTable.toggleRowSelection(row);
      // console.log(row);
    },
    //关闭优博申请页面
    close1() {
      this.showTable = true;
      this.showTable1 = true;
      this.loadTable();
    },
    handleCancel1() {
      this.showTable = true;
      this.showTable1 = true;
      this.loadTable();
    },
    handleCancel2() {
      this.showTable = true;
      this.showDetail2 = true;
      this.loadTable();
    },
    handleCancel3() {
      this.showTable = true;
      this.showDetail3 = true;
      this.loadTable();
    },
    //列表下载按钮
    download1(lcid, zt) {
      if (zt == "1") {
        location.href = this.$server.glourl + "stuybpyxm/downWord?lcid=" + lcid;
      } else {
        this.$message({
          message: "审核未通过！",
          type: "error"
        });
      }
    },
    download2(zqlcid, zt) {
      if (zt == "1") {
        location.href =
          this.$server.glourl + "stuybzqjzbg/downWord?lcid=" + zqlcid;
      } else {
        this.$message({
          message: "审核未通过！",
          type: "error"
        });
      }
    },
    download3(zjlcid, zt) {
      if (zt == "1") {
        location.href =
          this.$server.glourl + "stuybzjbg/downWord?lcid=" + zjlcid;
      } else {
        this.$message({
          message: "审核未通过！",
          type: "error"
        });
      }
    },
    //文件上传成功时的钩子
    handleSuccess1(response, file, fileList) {
      this.onsuccess1 = false;
      this.wordfj.push({ name: response.name, url: response.url });
    },
    handleRemove1(file, fileList) {
      this.fileList1 = fileList;
      this.init.fj = this.fileList1;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSuccess2(response, file, fileList) {
      this.pdffj.push({ name: response.name, url: response.url });
      this.onsuccess2 = false;
    },
    handleRemove2(file, fileList) {
      this.onsuccess2 = false;
      this.fileList2 = fileList;
      this.init.fj = this.fileList2;
    },
    progress1: function() {
      this.onsuccess1 = true;
    },
    progress2: function() {
      this.onsuccess2 = true;
    },
    // 选择表格行id
    handleSelectionChange(selection) {
      // console.log(selection);
      if (selection.length == 0) {
        this.tableTime = "";
        this.tableTimest = "";
        this.id = "";
      } else {
        this.id = selection[0].id;
        this.tableTime = selection[0].jssj;
        this.tableTimest = selection[0].kssj;
        // console.log(selection)
      }
    },

    //改变时间格式
    changeDataType(time) {
      const date = new Date();
      date.setTime(time); // value通过截取字符串只取数字。
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    },
    //提交
    applySubmit1() {
      this.timestamp1 = new Date().getTime();
      if (this.tableTime < this.timestamp1) {
        this.$message({
          message: "已过期，无效操作!",
          type: "error"
        });
        return;
      } else {
        this.kcsz.wordfj = this.wordfj;
        this.kcsz.pdffj = this.pdffj;

        this.submit = "加载中";
        this.kcsz.xmid = this.id;
        this.$http
          .post(this.$server.glourl + "teaapplydiy/lcStart", this.kcsz)
          .then(response => {
            if (response.data.code == 0) {
              this.$message({
                message: "提交成功！",
                type: "success"
              });
              this.loading = false;
              this.submit = "提交";
              this.reload();

              this.showTable = true;
              this.loadTable();
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    //保存
    saveMsg() {
      this.init.xmid = this.id;
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // this.save.jfly = this.jfly.join()
      this.$http
        .post(this.$server.glourl + "stuybpyxm/save", this.ybsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.reload();
            this.showTable = true;
            this.showTable6 = true;
            // this.loadTable()
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  activated() {
    //进入页面，加载申请列表
    this.loadTable();
  }
};
</script>

<style>
/* 表格头部背景色 */
/* .el-table thead.is-group th{
    background:#ffffff;
} */
.el-button + .el-button {
  margin-left: 0px;
}
</style>

<style lang="scss" scoped>
textarea {
  resize: none;
  outline: none;
  width: 98.5%;
  overflow-y: scroll;
  line-height: 20px;
  font-size: 14px;
  font-family: "微软雅黑";
}
@import "../../style/common"; //必须加分号，不然会报错
@import "../../style/ele";
</style>
