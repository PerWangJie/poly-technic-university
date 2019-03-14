<template>
  <div>
    <div v-show="showTable" style="margin:10px 0">
      <el-tabs type="border-card" @tab-click="handleClick">
        <el-tab-pane label="校级项目类型">
          <div class="header">

            <!-- 增删改查 -->
            <div class="right">
              <!-- <el-button type="primary" @click="downLoad">下载</el-button> -->
              <el-button type="danger" @click="applyChange">修改</el-button>
              <!-- <el-button type="warning" @click="handleReport" v-if="has('stucgbb:selectCHBBInit')">项目报备</el-button> -->
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
            <el-table v-loading="loading" ref="moviesTable" @row-click="clickRow" border :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">

              <el-table-column type="selection" width="55">
              </el-table-column>

              <el-table-column label="序号" type="index" :index="indexMethod" width="80" align="center">
              </el-table-column>

              <el-table-column label="项目类型" prop="xmlx" align="center">
                <template slot-scope="scope">
                  {{ scope.row.xmlx == '0' ? '短期访学' :scope.row.xmlx == '1' ? '国际学术会议':''}}
                </template>
              </el-table-column>

              <el-table-column label="项目名称" prop="xmmc" align="center">
              </el-table-column>

              <!-- 0失败，1成功，2审核中，3待审核 -->
              <el-table-column label="审核状态" prop="zt" align="center">
                <template slot-scope="scope">
                  {{ scope.row.zt == 0 ? '审核不通过' :scope.row.zt == 1 ? '审核通过':scope.row.zt == 2 ? '审核中' :scope.row.zt == 3 ? '待审核':scope.row.zt == 4 ? '退回':scope.row.zt == 5 ? '未提交':''}}
                </template>
              </el-table-column>

              <el-table-column prop="cjsj" label="创建时间" align="center">
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
        </el-tab-pane>
        <el-tab-pane label="国家级项目类型">
          <div class="header">

            <!-- 增删改查 -->
            <div class="right">
              <el-button type="danger" @click="applyChange">修改</el-button>
              <!-- <el-button type="warning" @click="handleReport" v-if="has('stucgbb:selectCHBBInit')">项目报备</el-button> -->
              <el-button type="primary" @click="handleSee1">查看审核信息</el-button>
              <!-- <el-button type="success" @click="handleSee">审核</el-button> -->
            </div>
            <el-dialog title="审核信息" :visible.sync="seeVisible1" width="30%" :before-close="handleClose">
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
                <el-button @click="seeVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="seeVisible1 = false">确 定</el-button>
              </span>
            </el-dialog>
          </div>

          <!-- 表格 -->
          <div class="table">
            <el-table v-loading="loading" ref="moviesTable1" @row-click="clickRow1" border :data="dataList1" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange1">

              <el-table-column type="selection" width="55">
              </el-table-column>

              <el-table-column label="序号" type="index" :index="indexMethod" width="80" align="center">
              </el-table-column>

              <!-- <el-table-column label="报备类型" prop="ls" align="center">
            </el-table-column> -->

              <el-table-column label="留学单位" prop="jhlxdwmc" align="center">

              </el-table-column>

              <el-table-column label="项目名称" prop="jhsbxmmc" align="center">
                <template slot-scope="scope">
                  {{ scope.row.jhsbxmmc == 0 ? '国家建设高水平大学项目' :scope.row.jhsbxmmc == 1 ? '国家公派硕士研究生项目' :scope.row.jhsbxmmc == 2 ? '国外合作项目' :scope.row.jhsbxmmc == 3 ?'其他' :''}}
                </template>
              </el-table-column>

              <!-- 0失败，1成功，2审核中，3待审核 -->
              <el-table-column label="审核状态" prop="zt" align="center">
                <template slot-scope="scope">
                  {{ scope.row.zt == 0 ? '审核不通过' :scope.row.zt == 1 ? '审核通过':scope.row.zt == 2 ? '审核中' :scope.row.zt == 3 ? '待审核':scope.row.zt == 4 ? '退回':scope.row.zt == 5 ? '未提交':''}}
                </template>
              </el-table-column>

              <el-table-column prop="cjsj" label="创建时间" align="center">

                <template slot-scope="scope">{{scope.row.cjsjString}}</template>
              </el-table-column>
            </el-table>
          </div>

          <!-- 分页 -->
          <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageList.currPage" :page-sizes="[5,10,15]" :page-size="pageList.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageList.totalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
    <!-- 校级项目申请修改 -->
    <div class="container" v-show="showTable1">

      <!-- 申请表单 -->
      <el-form :model="xmsqsave" :rules="rules" ref="stu" label-width="177px" class="demo-ruleForm" label-position="left">

        <el-row>
          <el-col :sapn='24' style="margin-top:5px;line-height:50px">
            <div class="small"></div>
            <span>申请人员基本情况</span>
            <div class="close" @click="close1"> X </div>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="姓名：" prop="">
              <el-input v-model="xmsqsave.xm"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="学号：" prop="">
              <el-input v-model.number="xmsqsave.xh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="所在学科：" prop="">
              <el-input v-model="xmsqsave.xk"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="所在学院：" prop="">
              <el-input v-model="xmsqsave.yxqc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="联系电话：" prop="">
              <el-input v-model="xmsqsave.dh"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="人员类别：" prop="">
              <el-select v-model="xmsqsave.rylb" placeholder="请选择" style="width:100%">
                <el-option label="博士" value="0"></el-option>
                <el-option label="硕士" value="1"></el-option>
                <el-option label="优博资助博士生" value="2"></el-option>
                <el-option label="硕博连读博士生" value="3"></el-option>
                <el-option label="硕博连读硕士生" value="4"></el-option>
                <el-option label="被我校录取的推免生" value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="项目类别：" prop="">
              <!-- <el-input v-model="save.xmlx"></el-input> -->
              <el-select v-model="xmsqsave.xmlx" placeholder="请选择" clearable @change="selectSqqx">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="申请期限（个月）：" prop="sqqx">
              <!-- <el-input v-model.number="xmsqsave.sqqx" auto-complete="off"></el-input> -->
              <el-radio-group v-model="xmsqsave.sqqx" v-show="sqqxRadio">
                <el-radio label="0">三个月</el-radio>
                <el-radio label="1">六个月</el-radio>
              </el-radio-group>
              <el-input v-model="xmsqsave.sqqx" v-show="!sqqxRadio"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="出境地点：" prop="">
              <el-input v-model="xmsqsave.cjdd" @blur='handleBlur1'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="外方机构：" prop="">
              <el-input v-model="xmsqsave.wfjg" @blur='handleBlur1'></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="项目名称：" prop="">
              <el-input v-model="xmsqsave.xmmc" readonly v-show="readxmmc"></el-input>
              <el-input v-model="xmsqsave.xmmc" v-show="!readxmmc"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="指导老师：" prop="">
              <el-input v-model="xmsqsave.dsxm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="起止时间：（必填项）" prop="sj">
              <div class="date">
                <el-form-item>
                  <el-date-picker v-model="xmsqsave.sj" @blur='handleBlur' value-format="yyyy-MM-dd" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="在外天数：" prop="">
              <el-input v-model="xmsqsave.zwts">{{this.xmsqsave.zwts}}</el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <div class="long">
            <el-col :span="22">
              <el-form-item label="导师，学位点，学科，学院资助情况（元）" prop="zzqk">
                <!-- <el-input v-model="ruleForm.name"></el-input> -->
                <el-input v-model.number="xmsqsave.zzqk" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                </el-input>
              </el-form-item>
            </el-col>
          </div>
        </el-row>

        <el-row :gutter="30" class="textarea">
          <el-col :span="22">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="项目概况（项目基本情况、目的意义，附上邀请函）" v-model="xmsqsave.xmgk">
            </el-input>
          </el-col>
        </el-row>

        <el-row :gutter="30" class="textarea">
          <el-col :span="22">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="研究基础（本人已取得的科研成果）" v-model="xmsqsave.yjjc">
            </el-input>
          </el-col>
        </el-row>

        <el-row :gutter="30" class="textarea">
          <el-col :span="22">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="研究计划及研究目标（短期访学类填写）" v-model="xmsqsave.yjjh">
            </el-input>
          </el-col>
        </el-row>

        <el-row :gutter="30" class="textarea">
          <el-col :span="22">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="导师概况（主要科研成果、往届学生派出情况及学生获奖情况）" v-model="xmsqsave.dsgk">
            </el-input>
          </el-col>
        </el-row>

        <el-row :gutter="30" class="textarea">
          <el-col :span="22">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="国外导师或联系人概况（短期访学类填写）" v-model="xmsqsave.gwds">
            </el-input>
          </el-col>
        </el-row>

        <!-- 添加附件 -->
        <div class="append-btn">
          <el-upload class="upload-demo" :action="baseUrls" :on-progress="progress1" :on-preview="handlePreview1" :on-remove="handleRemove1" :before-remove="beforeRemove1" :on-success="handleSuccess1" multiple :limit="3" :on-exceed="handleExceed1" :file-list="fileList1">
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

        <!-- 提交重置 -->
        <div class="submit-box">
          <!-- <el-button type="primary" @click="applyChange" class="submit-btn" v-if="has('stugjhzxxm:lcStart')">修改</el-button> -->
          <el-button type="danger" @click="handleCancel" class="submit-btn">取消</el-button>
          <el-button type="primary" @click="saveMsg" class="submit-btn">保存</el-button>
          <el-button :loading="this.loading1" type="primary" @click="changeSubmit1" class="submit-btn" :disabled="onsuccess1">{{ submit }}</el-button>
        </div>

      </el-form>
    </div>
    <!-- 国家级项目申请修改 -->
    <div class="container" v-show="showTable2">
      <el-row>
        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
          <div class="small"></div>
          <span>申请人员基本情况</span>
          <div class="close" @click="close2"> X </div>
        </el-col>
      </el-row>
      <!-- 申请表单 -->
      <el-form :model="person" :rules="rules" ref="person" label-width="177px" class="demo-ruleForm" label-position="left">
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="姓名：" prop="">
              <el-input v-model="plan.xsxm"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="学号：" prop="">
              <el-input v-model="plan.xh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="性别：">
              <el-radio-group v-model="plan.xbm">
                <el-radio-button label="1">男</el-radio-button>
                <el-radio-button label="2">女</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="一级学科：" prop="">
              <el-input v-model="plan.yjxk"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="联系电话：" prop="">
              <el-input v-model="plan.dh"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="出生日期：" prop="">
              <el-input v-model="plan.csrq" readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="email：" prop="">
              <el-input v-model="plan.yx"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="Q Q：" prop="">
              <el-input v-model="plan.qq"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="最高学位：" prop="">
              <el-input v-model="plan.zgxw"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="所在学院：" prop="">
              <el-input v-model="plan.yxqc"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="所在学科：" prop="">
              <el-input v-model="plan.xk"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="所在年级：" prop="">
              <el-input v-model="plan.xh"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="身份：" prop="">
              <el-input v-model="plan.xslbmc"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="计划留学国别：" prop="">
              <el-input v-model="plan.jhlxgb"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <div class="long">
            <el-col :span="11">
              <el-form-item label="计划留学单位名称（中文）：" prop="">
                <el-input v-model="plan.jhlxdwmc"></el-input>
              </el-form-item>
            </el-col>
          </div>
          <el-col :span="11">
            <el-form-item label="计划申报项目名称：" prop="">
              <el-select v-model="plan.jhsbxmmc" placeholder="请选择" style="width:100%">
                <el-option label="国家建设高水平大学项目" value="0"></el-option>
                <el-option label="国家公派硕士研究生项目" value="1"></el-option>
                <el-option label="国外合作项目" value="2"></el-option>
                <el-option label="其他" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="外语是否符合条件：" prop="">
              <el-radio-group v-model="plan.wysffhtj">
                <el-radio-button label="0">否</el-radio-button>
                <el-radio-button label="1">是</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="外语合格类别：" prop="">
              <el-select v-model="plan.wyhglb" placeholder="请选择" style="width:100%">
                <el-option label="通过考试或面试达到外方要求" value="0"></el-option>
                <el-option label="WSK合格" value="1"></el-option>
                <el-option label="外语专业本科毕业" value="2"></el-option>
                <el-option label="10年内同语种工作学习" value="3"></el-option>
                <el-option label="培训合格(有效期内)" value="4"></el-option>
                <el-option label="雅思托福合格" value="5"></el-option>
                <el-option label="未达标" value="6"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="是否获得邀请函：" prop="">
              <el-radio-group v-model="plan.sfhdyqh">
                <el-radio-button label="0">否</el-radio-button>
                <el-radio-button label="1">是</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="拟出国时间：" prop="">
              <el-date-picker v-model="plan.ncgsj" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <div class="long">
            <el-col :span="11">
              <el-form-item label="计划申请留学期限（月）：" prop="">
                <el-input v-model="plan.jhsqlxqx"></el-input>
              </el-form-item>
            </el-col>
          </div>

          <el-col :span="11">
            <el-form-item label="计划申请留学身份：" prop="">
              <el-input v-model="plan.jhsqlxsf"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="利用渠道：" prop="">
              <el-input v-model="plan.lyqd"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <!-- 添加附件 -->
        <div class="append-btn">
          <el-upload class="upload-demo" :action="baseUrls" :on-progress="progress2" :on-preview="handlePreview2" :on-remove="handleRemove2" :before-remove="beforeRemove2" :on-success="handleSuccess2" multiple :limit="3" :file-list="fileList2">
            <el-col :span="24">
              <el-button size="small">
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

        <!-- 提交重置 -->
        <div class="submit-box">
          <el-button type="primary" @click="saveMsg1" class="submit-btn">保存</el-button>
          <!-- <el-button type="primary" @click="applyChange" class="submit-btn" v-if="has('stugjhzxxm:lcStart')">修改</el-button> -->
          <el-button :loading="this.loading2" type="primary" @click="changeSubmit2" class="submit-btn" v-if="has('stugjhzxxm:lcStart')" :disabled="onsuccess2">{{ submits }}</el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      readxmmc: true,
      sqqxRadio: true,
      tableTime: "",
      plan: {
        xsxm: "21321"
      },
      tabsName: "",
      onsuccess1: false,
      onsuccess2: false,
      type: 1, //出国报备类型
      id: "", //行号
      lcid: "", //流程id
      zt: "", //审核状态
      dataList: [], //列表数据
      dataList1: [], //列表数据
      xmsq: [], //项目申请详情
      init: [],
      stu: [],
      submit: "提交",
      submits: "提交",
      loading1: true, //显示正在加载中动画开关
      loading2: true, //显示正在加载中动画开关
      list: [], //项目报备表单
      his: [], //弹窗：审核信息
      showTable: true, //展示列表开关
      showTable1: false, //项目申请开关
      seeVisible: false, //审核流程图显示开关
      seeVisible1: false, //审核流程图显示开关
      fileList1: [], //上传文件列表展示
      fileList2: [],
      // 项目申请提交更新
      xmsqsave: {
        zwts: "",
        lcid: "",
        xmmc: "",
        xmlx: "",
        xh: "",
        xmid: "",
        sqqx: "",
        cjdd: "",
        zzqk: "",
        xmgk: "",
        yjjc: "",
        yjjh: "",
        dsgk: "",
        gwds: "",
        fj: [],
        sj: [],
        cjr: "",
        gxr: ""
      },
      options: [
        {
          value: "0",
          label: "短期访学"
        },
        {
          value: "1",
          label: "国际学术会议"
        }
      ],
      //列表前端分页
      pageList: {
        totalCount: "",
        pageSize: "",
        totalPage: "",
        currPage: ""
      },
      //列表分页辅助类(传参)
      pageHelp: {
        page: 1,
        limit: 5,
        sidx: "cjsj",
        order: "desc"
      },
      jfly: [], //经费来源多选
      fj: [],
      // 保存表单辅助类
      save: {
        xmmc: "",
        lx: "",
        zxxmid: "",
        xh: "",
        yshz: "",
        xmmc: "",
        gwtxdz: "",
        gwdw: "",
        yqr: "",
        sj: [],
        zwts: "",
        pcrw: "",
        gplb: "",
        jfly: "",
        cgjbz: "",
        fj: ""
      }
    };
  },
  mounted() {
    this.loadTable();
    this.loadTable1();
  },
  methods: {
    //项目名称拼接
    handleBlur1() {
      if (this.sqqxRadio == true) {
        this.readxmmc = true;
        this.xmsqsave.xmmc =
          this.xmsqsave.cjdd + this.xmsqsave.wfjg + "短期访学项目";
      } else if (this.sqqxRadio == false) {
        this.readxmmc = false;
      }
    },
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
    },

    clickRow1(row) {
      this.$refs.moviesTable1.toggleRowSelection(row);
      //console.log(row);
    },
    // 列表选择改变事件
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
        // console.log(this.lcid)
      }
    },
    handleSelectionChange1(selection) {
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
    // 点击选项卡改变事件
    handleClick(tab, event) {
      //console.log(tab.label);
      if (tab.label == "校级项目类型") {
        this.tabsName = tab.label;
        //  console.log(tab.label)
        this.loadTable();
        // console.log(111)
      } else {
        this.loadTable1();
        this.tabsName = tab.label;
        // console.log(222)
      }
    },
    //加载列表
    loadTable() {
      if (this.has("stugjhzxxm:selectGjhzxxmListForService")) {
        this.$http
          .get(this.$server.glourl + "stugjhzxxm/selectGjhzxxmListForService", {
            params: this.pageHelp
          })
          .then(response => {
            // console.log(response.data);
            const data = response.data;
            this.dataList = data.page.list;
            this.pageList = data.page;
            // console.log(data.page);
          });
      } else {
        console.log();
      }
      this.loading1 = false;
    },
    //加载列表
    loadTable1() {
      // if (this.has("stugjhzxxm:selectGjhzxxmListForService")) {
      this.$http
        .get(this.$server.glourl + "stugjjzxxm/selectListForUser", {
          params: this.pageHelp
        })
        .then(response => {
          if (response.data.code == "0") {
            const data = response.data;
            this.dataList1 = data.page.list;
            this.pageList = data.page;
          } else {
            console.log();
          }
        });
      this.loading2 = false;
    },
    //项目报备按钮函数
    handleReport() {
      if (this.id == null || this.id == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
      } else if (this.zt != "1") {
        this.$message({
          message: "请等待审核完成！",
          type: "error"
        });
      } else {
        this.$http
          .get(this.$server.glourl + "stucgbb/selectCHBBInit")
          .then(response => {
            this.list = response.data.list;
            // console.log(this.list)
          });
        this.showTable = false;
        this.showTable1 = true;
      }
    },
    //申请期限
    handleBlur() {
      // console.log(this.xmsqsave.zwts);
      this.$http
        .get(this.$server.glourl + "teahwsjjdxm/count?sj=" + this.xmsqsave.sj)
        .then(response => {
          // console.log(response.data);
          if (response.data.code == 0) {
            this.xmsqsave.zwts = response.data.count;
          }
          // console.log(this.xmsqsave.zwts);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 修改申请表单
    applyChange() {
      // console.log(this.zt)

      if (this.id == null || this.id == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
        // } else if (this.zt != 4 && this.zt != 5) {
        //   this.$message({
        //     message: "只能修改退回或未提交的信息！",
        //     type: "error"
        //   });
      } else {
        // console.log(this.tabsName);
        if (this.tabsName == "国家级项目类型") {
          this.$http
            .get(
              this.$server.glourl + "stugjjzxxm/selectInfoById?id=" + this.id
            )
            .then(response => {
              this.plan = response.data.obj;
              // 附件展示，需要解析成对象
              this.plan.fj = JSON.parse(response.data.obj.fj);
              this.fileList2 = this.plan.fj;
            });
          this.showTable = false;
          this.showTable2 = true;
        } else {
          this.$http
            .get(this.$server.glourl + "stugjhzxxm/selectDetail?id=" + this.id)
            .then(response => {
              if (response.data.map.detail.xmlx == "0") {
                this.readxmmc = true;
                this.sqqxRadio = true;
              } else {
                this.sqqxRadio = false;
                this.readxmmc = false;
              }
              this.xmsqsave = response.data.map.detail;
              // 附件展示，需要解析成对象
              this.xmsqsave.fj = JSON.parse(response.data.map.detail.fj);
              this.fileList1 = this.xmsqsave.fj;
              // this.stu = response.data.map.stu
              // console.log(response.data.map.detail)
            });
          this.showTable = false;
          this.showTable1 = true;
        }
      }
    },
    //申请期限控制
    selectSqqx(val) {
      //console.log(val);
      if (val == 0) {
        this.sqqxRadio = true;
        this.readxmmc = true;
      } else {
        this.readxmmc = false;
        this.sqqxRadio = false;
      }
    },
    //列表下载按钮
    download(lcid, zt) {
      if (zt == "1") {
        location.href =
          this.$server.glourl + "stugjhzxxm/downloadWord?lcid=" + lcid;
      } else {
        this.$message({
          message: "审核通过后才可以下载！",
          type: "error"
        });
      }
    },
    //保存
    saveMsg() {
      if (!this.xmsqsave.sj) {
        this.$message({
          message: "请选择起止时间！",
          type: "error"
        });
        return;
      }
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // this.list1.fj = this.fj
      // this.xmsq.jfly = this.jfly.join()
      // this.xmsqsave =this.xmsq
      // this.xmsqsave.jfly = this.xmsq.jfly
      this.$http
        .post(this.$server.glourl + "stugjhzxxm/saveforupdate", this.xmsqsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            // this.xmsqsave = ''
            // this.jfly = []
            this.showTable = true;
            this.showTable1 = false;
            this.loadTable();
            // console.log(this.grcgbbsave)
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //修改申请表单提交
    changeSubmit1() {
      this.timestamp1 = new Date().getTime();
      if (this.save.xmlx == 1) {
        if (!this.xmsqsave.sj) {
          this.$message({
            message: "请选择起止时间！",
            type: "error"
          });
          return;
        } else {
          this.loading1 = true;
          this.submit = "加载中";
          let config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };
          this.$http
            .post(this.$server.glourl + "stugjhzxxm/update", this.xmsqsave)
            .then(response => {
              if (response.data.code == 0) {
                this.$message({
                  message: "修改成功！",
                  type: "success"
                });
                // this.xmsqsave = ''
                // this.jfly = []
                this.loading1 = false;
                this.submit = "提交";
                this.showTable = true;
                this.showTable1 = false;
                this.loadTable();
                // console.log(this.grcgbbsave)
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        }
      } else {
        if (this.tableTime < this.timestamp1) {
          this.$message({
            message: "已过期，无效操作!",
            type: "error"
          });
          return;
        } else {
          if (!this.xmsqsave.sj) {
            this.$message({
              message: "请选择起止时间！",
              type: "error"
            });
            return;
          } else {
            this.loading1 = true;
            this.submit = "加载中";
            let config = {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            };
            this.$http
              .post(this.$server.glourl + "stugjhzxxm/update", this.xmsqsave)
              .then(response => {
                if (response.data.code == 0) {
                  this.$message({
                    message: "修改成功！",
                    type: "success"
                  });
                  // this.xmsqsave = ''
                  // this.jfly = []
                  this.loading1 = false;
                  this.submit = "提交";
                  this.showTable = true;
                  this.showTable1 = false;
                  this.loadTable();
                  // console.log(this.grcgbbsave)
                }
              })
              .catch(function(err) {
                console.log(err);
              });
          }
        }
      }
    },
    //保存
    saveMsg1() {
      // var a=this.plan.fj
      // console.log(Array.isArray(a))
      // this.loading2 = true;
      // this.submits = "加载中";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // this.list1.fj = this.fj
      // this.xmsq.jfly = this.jfly.join()
      // this.xmsqsave =this.xmsq
      // this.xmsqsave.jfly = this.xmsq.jfly
      this.$http
        .post(this.$server.glourl + "stugjjzxxm/saveforupdate", this.plan)
        .then(response => {
          // console.log(this.plan.fj)
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            // this.xmsqsave = ''
            // this.jfly = []
            // this.loading2 = false;
            // this.submits = "提交";
            this.showTable = true;
            this.showTable2 = false;
            this.loadTable1();
            // console.log(this.grcgbbsave)
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    changeSubmit2() {
      // var a=this.plan.fj
      // console.log(Array.isArray(a))
      this.loading2 = true;
      this.submits = "加载中";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // this.list1.fj = this.fj
      // this.xmsq.jfly = this.jfly.join()
      // this.xmsqsave =this.xmsq
      // this.xmsqsave.jfly = this.xmsq.jfly
      this.$http
        .post(this.$server.glourl + "stugjjzxxm/update", this.plan)
        .then(response => {
          // console.log(this.plan.fj)
          if (response.data.code == 0) {
            this.$message({
              message: "修改成功！",
              type: "success"
            });
            // this.xmsqsave = ''
            // this.jfly = []
            this.loading2 = false;
            this.submits = "提交";
            this.showTable = true;
            this.showTable2 = false;
            this.loadTable1();
            // console.log(this.grcgbbsave)
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 查看审核信息按钮函数
    handleSee() {
      // console.log(this.lcid)
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
            // console.log(this.his[0].startTime)
          });
        this.seeVisible = true;
      }
    },
    handleSee1() {
      // console.log(this.lcid)
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
            // console.log(this.his[0].startTime)
          });
        this.seeVisible1 = true;
      }
    },
    //改变时间格式
    changeDataType(time) {
      const date = new Date();
      date.setTime(time); // value通过截取字符串只取数字。
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    },
    // 审核

    // 文件上传成功时的钩子
    handleSuccess1(response, file, fileList) {
      this.onsuccess1 = false;
      this.xmsqsave.fj.push({ name: response.name, url: response.url });
    },
    handleSuccess2(response, file, fileList) {
      this.onsuccess2 = false;
      // console.log(response, file, fileList)
      this.fj.push({ name: response.name, url: response.url });
      this.plan.fj = JSON.stringify(this.fj);
      // console.log(this.save.fj)
    },
    progress1: function() {
      this.onsuccess1 = true;
    },
    progress2: function() {
      this.onsuccess2 = true;
    },
    // 移除文件钩子
    handleRemove1(file, fileList) {
      // console.log(file)
      // console.log(fileList)
      this.onsuccess1 = false;
      this.fileList1 = fileList;
      this.xmsqsave.fj = this.fileList1;
    },
    handleRemove2(file, fileList) {
      this.onsuccess2 = false;
      this.fileList2 = fileList;
      this.plan.fj = this.fileList2;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //关闭申请页面
    close1() {
      this.showTable = true;
      this.showTable1 = false;
      this.loadTable();
    },
    close2() {
      this.showTable = true;
      this.showTable2 = false;
      this.loadTable1();
    },
    handleCancel() {
      this.showTable = true;
      this.showTable1 = false;
      this.loadTable();
    },
    // 提交申请表单
    applySubmit() {
      // console.log(this.save.sj)
      // if (this.sava == null || this.save == "") {
      //   this.$message({
      //     message: "请填写内容！",
      //     type: "error"
      //   });
      //   return
      // }
      this.loading = true;
      this.submit = "加载中";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.save.fj = this.fj;
      this.save.jfly = this.jfly.join();
      this.save.zxxmid = this.id;
      this.save.lx = "1";
      this.$http
        .post(this.$server.glourl + "stucgbb/stuOrderApply", this.save)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "提交成功！",
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
    }
    // 弹窗确认关闭
    // seeClose (done) {
    //   this.$confirm('确认关闭？', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //       .then(() => {
    //         seeVisible = false
    //       })
    //       .catch(_ => {})
    // },
  },
  activated() {
    this.loadTable();
  }
};
</script>

<style scoped>
/* .el-dialog__header {
  border-bottom: 1px solid #ddd;
} */
.container {
  padding: 30px !important;
}
.long >>> .el-form-item__label {
  line-height: 25px;
}
.el-button + .el-button {
  margin-left: 0px;
}
</style>

<style lang="scss" scoped>
@import "../../style/common"; //必须加分号，不然会报错
@import "../../style/ele";
</style>