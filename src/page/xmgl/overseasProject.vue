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

        <div class="container" v-show="!showTable">
            <el-form :model="hwsjjdxm" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">
                <el-row :gutter="30">
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>项目基本情况</span>
                        <div class="close" @click="close"> X </div>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="项目名称：" prop="title">
                            <el-input v-model="hwsjjdxm.xmmc"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="协议起止时间：" prop="time">
                            <el-date-picker v-model="hwsjjdxm.sj" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="学科：" prop="subject">
                            <el-input v-model="hwsjjdxm.xk"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="学位点：" prop="degree">
                            <el-input v-model="hwsjjdxm.xwd"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="联合培养方式：" prop="train">
                            <el-radio-group v-model="hwsjjdxm.lhpyfs">
                                <el-radio label="0">双硕士学位</el-radio>
                                <el-radio label="1">双博士学位</el-radio>
                                <el-radio label="2">双硕士/博士学位</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>项目负责人基本情况</span>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="姓名：">
                            <el-input v-model="hwsjjdxm.xm"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="出生日期：" prop="birth">
                            <el-input v-model="hwsjjdxm.csrq" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="职务：" prop="duty">
                            <el-input v-model="hwsjjdxm.zw"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="职称：" prop="profess">
                            <el-input v-model="hwsjjdxm.zc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="联系电话：" prop="tel">
                            <el-input v-model="hwsjjdxm.bgsdh"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="手机：" prop="phone">
                            <el-input v-model="hwsjjdxm.yddh"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="E-mail：" prop="mail">
                            <el-input v-model="hwsjjdxm.dzyx"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>合作单位基本情况</span>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="单位名称：" prop="company">
                            <el-input v-model="hwsjjdxm.hzdwmc"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="国家：" prop="country">
                            <el-input v-model="hwsjjdxm.hzdwgj" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="地区：" prop="region">
                            <el-input v-model="hwsjjdxm.hzdwdq"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="联系人：" prop="contact">
                            <el-input v-model="hwsjjdxm.hzdwlxr"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="职务：" prop="duty1">
                            <el-input v-model="hwsjjdxm.hzdwzw"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="电话：" prop="tel1">
                            <el-input v-model="hwsjjdxm.hzdwdh"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="E-mail：" prop="mail1">
                            <el-input v-model="hwsjjdxm.hzdwyx"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="单位概述：" prop="company1">
                            <el-input v-model="hwsjjdxm.hzdwgs"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="双方合作模式：" prop="cooperate">
                            <el-input v-model="hwsjjdxm.hzdwhzms"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>实施情况</span>
                    </el-col>
                </el-row>
                <div class="textarea">
                    <el-row>
                        <el-col :span="22">
                            <el-input v-model="hwsjjdxm.ssqk" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="包括海外联合培养基地建设、共同开设课程、教师互派、已派遣学生等情况">
                            </el-input>
                        </el-col>
                    </el-row>
                </div>

                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>五年内建设计划安排</span>
                    </el-col>
                </el-row>
                <div class="textarea">
                    <el-row>
                        <el-col :span="22">
                            <el-input v-model="hwsjjdxm.wnnjhap" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="2016-2020年期间的实施计划（基地建设计划、开设课程情况、教师互派、派遣学生人数等情况）">
                            </el-input>
                        </el-col>
                    </el-row>
                </div>

                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>经费预算</span>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table :data="hwsjjdxm.jfys" ref="multipleTable" show-summary :summary-method="getSummaries" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                <el-table-column label="经费预算（单位：万元）" align="center" style="width: 100%;text-align: center">
                                    <el-table-column label="序号" width="70" align="center" prop="num">
                                    </el-table-column>

                                    <el-table-column prop="jflb" label="经费类别" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.jflb" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.jflb}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="ysjf" label="预算经费（万元）" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.ysjf" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.ysjf}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="ysyj" label="预算依据" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.ysyj" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.ysyj}}</span>
                                        </template>
                                    </el-table-column>

                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(12)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(12)" class="plus"></el-button>
                    </el-col>
                </el-row>

                <div class="textarea">
                    <el-row>
                        <el-col :span="22">
                            <el-input v-model="hwsjjdxm.jfyssm" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="经费预算说明：">
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
                <!-- 附件展示 -->
                <!-- <el-row :gutter="30">
                    <el-col :span="22">
                    <el-form-item label="附件：" prop="">
                        <a :href="item.url" v-for="item in hwsjjdxm.fj" class="fj">
                        <i class="el-icon-document"></i>
                        {{item.name}}<br/>
                        </a>
                    </el-form-item>    
                    </el-col>
                </el-row> -->

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
                    </el-upload>
                </div>
                <!-- 提交重置 -->
                <div class="submit-box">
                    <el-button type="primary" @click="saveMsg" class="submit-btn">保存</el-button>
                    <!-- <el-button type="primary" @click="applySave" class="submit-btn">保存</el-button>
                    <el-button type="primary" @click="reset" class="submit-btn">重置</el-button> -->
                    <el-button type="danger" @click="handleCancel" class="submit-btn">取消</el-button>
                    <el-button :loading="this.loading" type="primary" @click="changeSubmit" class="submit-btn" :disabled="onsuccess">{{ submit }}</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableTime: "", //列表结束时间
      changeTime: "", //修改当前时间
      subTime: "", //提交当前时间
      onsuccess: false,
      submit: "提交",
      loading: false, //显示正在加载中动画开关
      fileList: [], //上传文件列表展示
      showTable: true, //展示列表开关
      dataList: [], //列表数据相关
      id: "", //行号
      lcid: "", //流程id
      zt: "",
      seeVisible: false, //审核流程图显示开关
      his: [], //审核记录相关
      hwsjjdhj: [], //海外实践基地合计
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
      // 海外实践基地项目
      hwsjjdxm: {
        fj: [],
        jfys: [
          {
            num: 1,
            jflb: "",
            ysjf: "",
            ysyj: "",
            editFlag: false,
            tableNum: 12
          }
        ]
      },
      multipleSelection: [],
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
            message: "请选择日期",
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
    // 加载列表
    loadTable() {
      if (this.has("teahwsjjdxm:list2")) {
        this.$http
          .get(this.$server.glourl + "teahwsjjdxm/list2", {
            params: this.pageHelp
          })
          .then(response => {
            const data = response.data;
            this.dataList = data.page.list;
            this.pageList = data.page;
            // console.log(data.page.list)
          });
      } else {
        console.log();
      }
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
    //点击列表选中
    clickRow(row) {
      this.$refs.moviesTable.toggleRowSelection(row);
      //console.log(row);
    },
    // 选择表格行id
    handleSelectionChange(selection) {
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
        // console.log(this.id)
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
      this.hwsjjdxm.fj.push({ name: response.name, url: response.url });
      this.onsuccess = false;
    },
    progress: function() {
      this.onsuccess = true;
    },
    handleRemove(file, fileList) {
      this.onsuccess = false;
      this.fileList = fileList;
      this.hwsjjdxm.fj = this.fileList;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //保存
    saveMsg() {
      this.hwsjjdhj.splice(0, 2);
      this.hwsjjdhj.splice(1, 1);
      this.hwsjjdxm.sum = this.hwsjjdhj.join();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // this.jgxm.jfly = this.jfly.join()
      this.$http
        .post(this.$server.glourl + "teahwsjjdxm/saveforupdate", this.hwsjjdxm)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            // this.jfly = []
            this.showTable = true;
            this.loadTable();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 修改申请表单提交
    changeSubmit() {
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
        this.hwsjjdhj.splice(0, 2);
        this.hwsjjdhj.splice(1, 1);
        this.hwsjjdxm.sum = this.hwsjjdhj.join();
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        // this.jgxm.jfly = this.jfly.join()
        this.$http
          .post(this.$server.glourl + "teahwsjjdxm/update", this.hwsjjdxm)
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
    // 查看详情
    handleSee() {
      this.changeTime = new Date().getTime();
      if (this.id == null || this.id == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
        return;
      } else if (this.zt != 4 && this.zt != 5) {
        this.$message({
          message: "只能修改退回或未提交的信息！",
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
            .get(this.$server.glourl + "teahwsjjdxm/info/" + this.id)
            .then(response => {
                console.log(response.data);
              this.hwsjjdxm = response.data.teaHwsjjdxm;
              // 附件展示，需要解析成对象
              this.hwsjjdxm.fj = JSON.parse(response.data.teaHwsjjdxm.fj);
              this.fileList = this.hwsjjdxm.fj;
              // console.log(response.data.teaHwsjjdxm.fj)
              // this.hwsjjdxm.zycjzjk = JSON.parse(response.data.map.zycjzjk)
              this.hwsjjdxm.jfys = JSON.parse(response.data.teaHwsjjdxm.jfys);
              // console.log(response.data.teaHwsjjdxm.jfys)
            });
          this.showTable = false;
        }
      }
    },
    //申请信息table鼠标经过移出事件
    handleMouseEnter(row, column, cell, event) {
      // console.log(row)
      const tableIndex = row.tableNum;
      let num = row.num - 1;
      switch (tableIndex) {
        // 海外实践基地
        case 12:
          this.hwsjjdxm.jfys[num].editFlag = true;
          break;
        default:
          break;
      }
    },
    //申请信息table鼠标经过移出事件
    handleMouseOut(row, column, cell, event) {
      const tableIndex = row.tableNum;
      let num = row.num - 1;
      switch (tableIndex) {
        // 海外实践基地
        case 12:
          this.hwsjjdxm.jfys[num].editFlag = false;
          break;
        default:
          break;
      }
    },
    //列表下载按钮
    download(lcid, zt) {
      if (zt == "1") {
        location.href =
          this.$server.glourl + "teahwsjjdxm/downWord?lcid=" + lcid;
      } else {
        this.$message({
          message: "审核未通过！",
          type: "error"
        });
      }
    },
    //申请表信息动态添加行
    addRow(tableIndex) {
      switch (tableIndex) {
        // 海外实践基地
        case 12:
          this.hwsjjdxm.jfys.push({
            num: this.hwsjjdxm.jfys.length + 1,
            editFlag: false,
            tableNum: 12
          });
          break;
        default:
          break;
      }
    },
    //申请信息动态减少行
    delRow(tableIndex) {
      switch (tableIndex) {
        // 海外实践基地
        case 12:
          if (this.hwsjjdxm.jfys.length == 1) {
            return;
          }
          this.hwsjjdxm.jfys.pop();
          break;
        default:
          break;
      }
    },
    //合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " ";
        } else {
          sums[index] = "N/A";
        }
      });
      this.hwsjjdhj = sums;
      return sums;
    },
    // 查看审核进度
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
            // 获取审核弹窗相关数据
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
    //申请信息table鼠标经过事件
    // handleMouseEnter (row, column, cell, event) {
    //     let num = row.num - 1
    //     this.dataList[num].editFlag = true
    // },
    // //申请信息table鼠标经过移出事件
    // handleMouseOut (row, column, cell, event) {
    //     let num = row.num - 1
    //     this.dataList[num].editFlag = false
    // },
    // //申请表信息动态添加行
    // addRow () {
    //     this.dataList.push({
    //         num: this.dataList.length + 1,
    //         editFlag: false,
    //       })
    // },
    // //申请信息动态减少行
    // delRow () {
    //     if (this.dataList.length == 1) {
    //         return
    //     }
    //     this.dataList.pop()
    // },
    // 保存重置提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    }
  },
  activated() {
    this.loadTable();
  }
};
</script>

<style>
/* 表格头部背景色 */
/* .el-table thead.is-group th{
    background:#fff;
} */
</style>

<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 0px;
}
@import "../../style/common"; //必须加分号，不然会报错
@import "../../style/ele";
</style>
