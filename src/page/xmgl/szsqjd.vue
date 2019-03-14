<template>
    <div>
        <!-- 列表展示 -->
        <div class="container" v-show="showTable">
            <div class="header">
                <!-- 查询部分 -->
                <!-- <div class="left">
                    <el-input placeholder="请输入内容" class="header-input" clearable></el-input>
                    <el-button>查询</el-button>
                </div> -->

                <!-- 增删改查 -->
                <div class="right">
                    <el-button type="danger" @click="handleSee">修改</el-button>
                    <el-button type="primary" @click="handleProgress">查看审核记录</el-button>
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
                                <span style="display:block;float:left">审核意见:</span>
                                <span style="display:block;float:left;margin-left:10px;line-height:22px" v-html="item.comment"></span>
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
                        <el-button type="primary" @click="seeVisible = false">确 定</el-button>
                    </span>
                </el-dialog>

            </div>

            <!-- 表格 -->
            <div class="table">
                <el-table v-loading="loading" :data="dataList" @row-click="clickRow" tooltip-effect="dark" border style="width: 100%;text-align: center" ref="moviesTable" @selection-change="handleSelectionChange">

                    <el-table-column type="selection" label="全选" align="center"></el-table-column>

                    <el-table-column label="序号" sortable width="80" type="index" :index="indexMethod" align="center">
                    </el-table-column>

                    <el-table-column prop="xmmc" label="项目名称" align="center">
                    </el-table-column>

                    <!-- <el-table-column prop="xmlx" label="项目类型"  align="center">
                    </el-table-column> -->

                    <!-- <el-table-column prop="ssxy" label="所属学院"  align="center">
                    </el-table-column> -->

                    <!-- <el-table-column prop="yqjxy" label="要求及内容"  align="center">
                    </el-table-column> -->

                    <el-table-column prop="zt" label="审核状态" align="center">
                        <template slot-scope="scope">
                            {{ scope.row.zt == 0 ? '审核不通过' :scope.row.zt == 1 ? '审核通过':scope.row.zt == 2 ? '审核中' :scope.row.zt == 3 ? '待审核':scope.row.zt == 4 ? '退回':scope.row.zt == 5 ? '未提交':''}}
                        </template>
                    </el-table-column>

                    <el-table-column label="创建时间" prop="cjsj" align="center">
                      <template slot-scope="scope">{{scope.row.cjsjString}}</template>
                    </el-table-column>
                    <el-table-column label="编辑" align="center" prop="bj">
                        <template slot-scope="scope">
                            <el-button type="primary" plain :size="small" @click="download(scope.row.id,scope.row.zt)">下载</el-button>
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
        <div class="container" v-show="!showTable">

            <!-- 项目表单 -->
            <el-form :model="init" :rules="rules1" ref="init" label-width="177px" class="demo-ruleForm" label-position="left">

                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>项目申请信息</span>
                        <div class="close" @click="close1"> X </div>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="项目名称：" prop="">
                            <el-input v-model="init.xmmc"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="项目负责人：" prop="">
                            <el-input v-model="init.xmfzr"></el-input>
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
                            <span>（如果上传文件名相同，请删掉之前同名文件）</span>
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
                            <span>（如果上传文件名相同，请删掉之前同名文件）</span>
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
export default {
  data() {
    return {
      init: {},
      tableTime: "", //列表结束时间
      changeTime: "", //修改当前时间
      subTime: "", //提交当前时间
      onsuccess: false,
      submit: "提交",
      loading: false, //显示正在加载中动画开关
      fileList: [], //上传文件列表展示
      showTable: true, //展示列表开关
      dataList: [], //列表数据相关
      seeVisible: false, //审核流程图显示开关
      his: [], //审核记录相关
      lcid: "", //流程id
      pdffj: [],
      id: "",
      zt: "",
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
      // console.log(timestampToTime (1533293827000))
    },
    loadTable() {
      //   if (this.has("teajgxm:selectListForService")) {
      this.$http
        .get(this.$server.glourl + "teaapplydiy/selectList", {
          params: this.pageHelp
        })
        .then(response => {
          const data = response.data;
          this.dataList = data.page.list;
          this.pageList = data.page;
          //  console.log(response.data)
        });
      //   } else {
      //     console.log();
      //   }
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
    //列表下载按钮
    download(id, zt) {
      if (zt == "1") {
        location.href = this.$server.glourl + "gjhpyxm/addImageForPdf?id=" + id;
      } else {
        this.$message({
          message: "审核未通过！",
          type: "error"
        });
      }
    },
    //点击列表选中
    clickRow(row) {
      this.$refs.moviesTable.toggleRowSelection(row);
      //console.log(row);
    },
    // 选择表格行id
    handleSelectionChange(selection) {
      // console.log(selection);
      if (selection.length == 0) {
        this.id = "";
        this.lcid = "";
        this.zt = "";
        this.tableTime = "";
      } else {
        this.id = selection[0].id;
        this.lcid = selection[0].lcid;
        this.zt = selection[0].zt;
        this.tableTime = selection[0].jssj;
        // console.log(selection)
      }
    },
    //关闭申请页面
    close() {
      this.showTable = true;
      this.loadTable();
    },
    //取消
    handleCancel() {
      this.showTable = true;
      this.loadTable();
    },
    // 文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
      this.jgxm.fj.push({ name: response.name, url: response.url });
      this.onsuccess = false;
    },
    progress: function() {
      this.onsuccess = true;
    },
    handleRemove(file, fileList) {
      this.onsuccess = false;
      this.fileList = fileList;
      this.jgxm.fj = this.fileList;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    //改变时间格式
    changeDataType(time) {
      const date = new Date();
      date.setTime(time); // value通过截取字符串只取数字。
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    },
    handleSee() {
      // console.log(this.tableTime);
      this.changeTime = new Date().getTime();
      if (this.id == null || this.id == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
      } else if (this.zt != 4) {
        this.$message({
          message: "只能修改退回的信息！",
          type: "error"
        });
      } else {
        if (this.tableTime < this.changeTime) {
          this.$message({
            message: "已过期，无效操作!",
            type: "error"
          });
          return;
        } else {
          this.$http
            .get(
              this.$server.glourl + "teaapplydiy/selectInfoById?id=" + this.id
            )
            .then(response => {
              // console.log(response.data);
              this.init = response.data.info;
              //   // 附件展示，需要解析成对象
              this.init.pdffj = JSON.parse(response.data.info.pdffj);
              this.fileList1 = this.init.pdffj;
              this.init.wordfj = JSON.parse(response.data.info.wordfj);
              this.fileList2 = this.init.wordfj;
            });
          this.showTable = false;
        }
      }
    },
    // 查看审核记录
    handleProgress() {
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
          //  console.log(response.data);
            for (let i = 0; i < response.data.his.length; i++) {
              if (response.data.his[i].endTime != null) {
                response.data.his[i].endTime = this.changeDataType(
                  response.data.his[i].endTime
                );
              }
              if (
                response.data.his[i].comment != null &&
                response.data.his[i].comment != " "
              ) {
                response.data.his[i].comment = response.data.his[
                  i
                ].comment.replace(/abcd/g, "<br/>");
              }
              response.data.his[i].startTime = this.changeDataType(
                response.data.his[i].startTime
              );
            }
            this.his = response.data.his;
            //   console.log(this.his)
            // console.log(this.his[0].startTime)
          });
        this.seeVisible = true;
      }
    },
    //修改提交
    applySubmit1() {
      this.subTime = new Date().getTime();
      if (this.tableTime < this.subTime) {
        this.$message({
          message: "已过期，无效操作!",
          type: "error"
        });
        return;
      } else {
        this.loading = true;
        this.submit = "加载中";
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        this.$http
          .post(this.$server.glourl + "teaapplydiy/update", this.init)
          .then(response => {
            if (response.data.code == 0) {
              this.$message({
                message: "修改成功！",
                type: "success"
              });
              // this.jfly = []
              this.loading = false;
              this.submit = "提交";
              this.showTable = true;
              this.loadTable();
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    //关闭申请页面
    close1() {
      this.showTable = true;
      this.loadTable();
    }
  },
  activated() {
    this.loadTable();
    //   this.getData()
  }
};
</script>

<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 0px;
}
@import "../../style/common"; //必须加分号，不然会报错
@import "../../style/ele";
</style>