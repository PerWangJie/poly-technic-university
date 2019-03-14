<template>
  <div>
    <div v-if="showTable" style="margin:10px 0">
      <el-tabs type="border-card" @tab-click="handleClick">
        <el-tab-pane label="校级项目类型">
          <div class="header">

            <!-- 增删改查 -->
            <div class="right">
              <el-button type="success" @click="addApply()" v-if="has('stugjhzxxm:order')">申请</el-button>
            </div>
          </div>

          <!-- 表格 -->
          <div class="table">
            <el-table v-loading="loading" :data="dataList" @row-click="clickRow" tooltip-effect="dark" border style="width: 100%;text-align: center" ref="moviesTable" @selection-change="handleSelectionChange">

              <el-table-column type="selection" label="全选" align="center"></el-table-column>

              <el-table-column label="序号" sortable width="80" type="index" :index="indexMethod" align="center">
              </el-table-column>

              <el-table-column prop="xmmc" label="项目名称" align="center">
              </el-table-column>

              <el-table-column prop="xmlx" label="项目类型" align="center">
                <template slot-scope="scope">{{scope.row.xmlx == '0' ? '校级项目类型':scope.row.xmlx == '1' ? '国家级项目类型':''}}</template>
              </el-table-column>

              <el-table-column prop="ssxy" label="所属学院" align="center">

              </el-table-column>

              <!-- <el-table-column prop="yqjxy" label="要求及内容" align="center">
              </el-table-column> -->

              <!-- <el-table-column prop="status" label="审核状态" align="center">
                    </el-table-column> -->
              <el-table-column label="开始时间" prop="kssj" align="center">
                <template slot-scope="scope">{{scope.row.kssjString}}</template>
              </el-table-column>
              <el-table-column label="结束时间" prop="jssj" align="center">
                <template slot-scope="scope">{{scope.row.jssjString}}</template>
              </el-table-column>
              <el-table-column label="要求及通知" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" :size="small" plain @click="query(scope.row.yqjxy)">查看详情</el-button>
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
        </el-tab-pane>
        <el-tab-pane label="国家级项目类型">
          <div class="header">

            <!-- 增删改查 -->
            <div class="right">
              <el-button type="success" @click="addApply1()" v-if="has('stugjhzxxm:order')">申请</el-button>
            </div>
          </div>

          <!-- 表格 -->
          <div class="table">
            <el-table v-loading="loading" :data="dataList1" @row-click="clickRow1" tooltip-effect="dark" border style="width: 100%;text-align: center" ref="moviesTable1" @selection-change="handleSelectionChange1">

              <el-table-column type="selection" label="全选" align="center"></el-table-column>

              <el-table-column label="序号" sortable width="80" type="index" :index="indexMethod" align="center">
              </el-table-column>

              <el-table-column prop="xmmc" label="项目名称" align="center">
              </el-table-column>

              <el-table-column prop="xmlx" label="项目类型" align="center">
                <template slot-scope="scope">{{scope.row.xmlx == '0' ? '校级项目类型':scope.row.xmlx == '1' ? '国家级项目类型':''}}</template>
              </el-table-column>

              <el-table-column prop="ssxy" label="所属学院" align="center">

              </el-table-column>

              <el-table-column label="开始时间" prop="kssj" align="center">
                <template slot-scope="scope">{{scope.row.kssjString}}</template>
              </el-table-column>

              <!-- <el-table-column prop="status" label="审核状态" align="center">
                    </el-table-column> -->

              <el-table-column label="结束时间" prop="fbsj" align="center">
                <template slot-scope="scope">{{scope.row.jssjString}}</template>
              </el-table-column>
              <el-table-column label="要求及通知" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" :size="small" plain @click="query1(scope.row.yqjxy)">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-dialog title="要求及通知" :visible.sync="dialogVisible1" width="50%" :before-close="handleClose">
            <textarea rows="25" v-model="queryMsg1" readonly></textarea>
            <!-- {{queryMsg}} -->
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageList.currPage" :page-sizes="[5,10,15]" :page-size="pageList.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageList.totalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>

    <div class="container" v-if="showTable1">

      <!-- 项目表单 -->
      <el-form :model="init" :rules="rules" ref="init" label-width="177px" class="demo-ruleForm" label-position="left">

        <el-row>
          <el-col :sapn='24' style="margin-top:5px;line-height:50px">
            <div class="small"></div>
            <span>项目基本情况</span>
            <div class="close" @click="close" :class="searchBarFixed == true ? 'close' :''"> X </div>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="项目名称：" prop="">
              <el-input v-model="init.xmmc" readonly></el-input>

            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="所属学院：" prop="">
              <el-input v-model="init.ssxy" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="项目类型：" prop="">
              <el-input v-model="init.xmlx"></el-input>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="11">
            <el-form-item label="发布时间：" prop="">
              <el-input v-model="init.fbsj"></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="有效时间：" prop="">
              <el-input v-model="init.yxsj"></el-input>
              <!-- <span style="line-height:10px;margin-left:15px;color:red">请在有效时间内申请</span> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="要求及内容：" prop="">
              <el-input v-model="init.yqjxy" type="textarea" :autosize="{ minRows: 5, maxRows: 7}" placeholder="请输入内容" style="padding-left:0">
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

      </el-form>

      <el-row>
        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
          <div class="small"></div>
          <span>申请人员基本情况</span>
        </el-col>
      </el-row>
      <!-- 申请表单 -->
      <el-form :model="save" :rules="rules" ref="stu" label-width="177px" class="demo-ruleForm" label-position="left">

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="姓名：" prop="">
              <el-input v-model="stu.xm"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="学号：" prop="">
              <el-input v-model.number="stu.xh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="所在学科：" prop="">
              <el-input v-model="stu.xk"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="所在学院：" prop="">
              <el-input v-model="stu.yxqc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="联系电话：" prop="">
              <el-input v-model="stu.dh"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="人员类别：" prop="">
              <el-select v-model="save.rylb" placeholder="请选择" style="width:100%">
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
              <el-select v-model="save.xmlx" placeholder="请选择" clearable @change="selectSqqx">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="申请期限：" prop="">
              <!-- <el-input v-model.number="save.sqqx" auto-complete="off" clearable></el-input> -->
              <el-radio-group v-model="save.sqqx" v-show="sqqxRadio">
                <el-radio label="0">三个月</el-radio>
                <el-radio label="1">六个月</el-radio>
              </el-radio-group>
              <el-input v-model="save.sqqx" v-show="!sqqxRadio"></el-input>

            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="出境地点：" prop="">
              <el-input v-model="save.cjdd" @blur='handleBlur'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="外方机构：" prop="">
              <el-input v-model="save.wfjg" @blur='handleBlur'></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="项目名称：" prop="">
              <el-input v-model="save.xmmc" readonly="true" v-show="readxmmc"></el-input>
              <el-input v-model="save.xmmc" v-show="!readxmmc"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="指导老师：" prop="">
              <el-input v-model="stu.dsxm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="起止时间：（必填项）" prop="sj">
              <div class="date">
                <el-form-item>
                  <el-date-picker v-model="save.sj" @blur='handleBlur1' value-format="yyyy-MM-dd" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="在外天数：" prop="">
              <el-input v-model="save.zwts">{{this.save.zwts}}</el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <div class="long">
            <el-col :span="22">
              <el-form-item label="导师，学位点，学科，学院资助情况（元）" prop="zzqk" style="line-height:25px">
                <!-- <el-input v-model="ruleForm.name"></el-input> -->
                <el-input v-model.number="save.zzqk" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                </el-input>
              </el-form-item>
            </el-col>
          </div>
        </el-row>

        <el-row :gutter="30" class="textarea">
          <el-col :span="22">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="项目概况（项目基本情况、目的意义）" v-model="save.xmgk">
            </el-input>
          </el-col>
        </el-row>

        <el-row :gutter="30" class="textarea">
          <el-col :span="22">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="研究基础（本人已取得的科研成果）" v-model="save.yjjc">
            </el-input>
          </el-col>
        </el-row>

        <el-row :gutter="30" class="textarea">
          <el-col :span="22">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="研究计划及研究目标（短期访学类填写）" v-model="save.yjjh">
            </el-input>
          </el-col>
        </el-row>

        <el-row :gutter="30" class="textarea">
          <el-col :span="22">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="导师概况（主要科研成果、往届学生派出情况及学生获奖情况）" v-model="save.dsgk">
            </el-input>
          </el-col>
        </el-row>

        <el-row :gutter="30" class="textarea">
          <el-col :span="22">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="国外导师或联系人概况（短期访学类填写）" v-model="save.gwds">
            </el-input>
          </el-col>
        </el-row>

        <!-- 添加附件 -->
        <div class="append-btn">
          <el-upload class="upload-demo" :action="baseUrls" :on-progress="progress" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :on-success="handleSuccess" multiple :limit="3" :file-list="fileList">
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
          <el-button type="primary" @click="saveMsg" class="submit-btn">保存</el-button>
          <el-button :loading="this.loading" type="primary" @click="applySubmit" class="submit-btn" v-if="has('stugjhzxxm:lcStart')" :disabled="onsuccess">{{ submit }}</el-button>
        </div>

      </el-form>
    </div>
    <div class="container" v-if="showTable2">

      <!-- 申请表单 -->
      <el-form :model="person" :rules="rules" ref="person" label-width="177px" class="demo-ruleForm" label-position="left">
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
              <el-input v-model="otherMsg.xmmc" readonly></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="所属学院：" prop="">
              <el-input v-model="otherMsg.ssxy" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="项目类型：" prop="">
              <el-input v-model="otherMsg.xmlx"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="发布时间：" prop="">
              <el-input v-model="otherMsg.fbsj"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="要求及内容：" prop="">
              <el-input v-model="otherMsg.yqjxy" type="textarea" :autosize="{ minRows: 5, maxRows: 7}" placeholder="请输入内容" style="padding-left:0">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 附件展示 -->
        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="附件：" prop="">
              <a :href="item.url" v-for="item in otherMsg.fj" class="fj" :key="item">
                <i class="el-icon-document"></i>
                {{item.name}}<br/>
              </a>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sapn='24' style="margin-top:5px;line-height:50px">
            <div class="small"></div>
            <span>申请人员基本情况</span>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="姓名：" prop="">
              <el-input v-model="person.xsxm"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="学号：" prop="">
              <el-input v-model="person.xh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="性别：">
              <el-radio-group v-model="person.xbm">
                <el-radio-button label="1">男</el-radio-button>
                <el-radio-button label="2">女</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="一级学科：" prop="">
              <el-input v-model="person.yjxk"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="联系电话：" prop="">
              <el-input v-model="person.dh"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="出生日期：" prop="">
              <el-input v-model="person.csrq" readonly="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="email：" prop="">
              <el-input v-model="person.yx"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="Q Q：" prop="">
              <el-input v-model="person.qq"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="最高学位：" prop="">
              <el-input v-model="person.zgxw"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="所在学院：" prop="">
              <el-input v-model="person.yxqc"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="所在学科：" prop="">
              <el-input v-model="person.xk"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="所在年级：" prop="">
              <el-input v-model="person.nj"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="身份：" prop="">
              <el-input v-model="person.xslbmc"></el-input>
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
          <el-upload class="upload-demo" :action="baseUrls" :on-progress="progress1" :on-preview="handlePreview1" :on-remove="handleRemove1" :before-remove="beforeRemove1" :on-success="handleSuccess1" multiple :limit="3" :file-list="fileList">
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
          <!-- <el-button type="primary" @click="applyChange" class="submit-btn" v-if="has('stugjhzxxm:lcStart')">修改</el-button> -->
          <el-button type="primary" @click="saveMsg1" class="submit-btn">保存</el-button>
          <el-button :loading="this.loading1" type="primary" @click="applySubmit1" class="submit-btn" v-if="has('stugjhzxxm:lcStart')" :disabled="onsuccess1">{{ submits }}</el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import { isvalidPhone } from '../../../validate'
export default {
  // directives: {
  //   focus: {
  //     inserted: function(el) {
  //       el.focus()
  //     }
  //   }
  // },
  data() {
    var validDate = (rule, value, callback) => {
      // if (!value[0] || !value[1]) {
      //   console.log(value)
      //   console.log(error)
      //   return callback(new Error('请选择时间！'))
      // }else {
      //   callback()
      // }
      if (value === "") {
        // console.log(value)
        // console.log(error)
        return callback(new Error("请选择时间！"));
      } else {
        callback();
      }
    };
    return {
      readxmmc: true,
      sqqxRadio: true,
      value1: "",
      queryMsg: "",
      queryMsg1: "",
      dialogVisible: false,
      dialogVisible1: false,
      timestamp1: "", //提交当前时间
      timestamp2: "",
      timestamp: "", //申请当前时间
      tableTime: "", //结束时间
      tableTime1: "", //国家级结束时间
      startTime: "", //开始时间
      startTime1: "", //国家级开始时间
      otherMsg: {},
      plan: {
        fj: []
      },
      person: {},
      radio: "0",
      onsuccess: false,
      onsuccess1: false,
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
      readonly: true,
      edit: true,
      pageHelp: {
        page: 1,
        limit: 5,
        sidx: "cjsj",
        order: "desc",
        xmlx: "0"
      },
      pageHelp1: {
        page: 1,
        limit: 5,
        sidx: "cjsj",
        order: "desc",
        xmlx: "1"
      },
      dataList: [],
      dataList1: [],
      init: {
        fj: {
          name: "",
          url: ""
        }
      },
      inits: {},
      stu: [],
      // 保存表单辅助类
      save: {
        xmmc: "",
        xmlx: "",
        xh: "",
        xmid: "",
        sqqx: "",
        cjdd: "",
        wfjg: "",
        zzqk: "",
        xmgk: "",
        yjjc: "",
        yjjh: "",
        dsgk: "",
        gwds: "",
        zwts: "",
        fj: [],
        sj: [],
        cjr: "",
        gxr: ""
      },
      fj: [],
      fj1: [],
      sj: [],
      // saveHelp: {
      //   xh: '',
      //   xmid: 1,
      //   fj: {}
      // },
      submit: "提交",
      submits: "提交",
      loading: true,
      loading1: true,
      xmid: "", // 申请实例ID
      ids: "",
      upload: {
        fj: []
      },
      fileList: [],
      multipleSelection: [],
      delVisible: false,
      showTable: true, //展示列表开关
      showTable1: false,
      showTable2: false,
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        studentId: [{ required: true, message: "请输入学号", trigger: "blur" }],
        sqqx: [
          // { required: true, message: '不能为空', trigger: 'blur' },
          { type: "number", message: "申请期限必须为数字", trigger: "blur" }
        ],
        zzqk: [
          { type: "number", message: "资助情况必须为数字", trigger: "blur" }
        ],
        sj: [{ validator: validDate, trigger: "blur" }],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var offsetTop = document.querySelector("#searchBar").offsetTop;
      if (scrollTop > offsetTop) {
        this.searchBarFixed = true;
      } else {
        this.searchBarFixed = false;
      }
    },

    handleBlur() {
      if (this.sqqxRadio == true) {
        this.readxmmc = true;
        this.save.xmmc = this.save.cjdd + this.save.wfjg + "短期访学项目";
      } else if (this.sqqxRadio == false) {
        this.readxmmc = false;
      }
    },
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
      //console.log(row);
    },
    clickRow1(row) {
      this.$refs.moviesTable1.toggleRowSelection(row);
      //console.log(row);
    },
    //关闭申请页面
    close() {
      this.showTable = true;
      this.showTable1 = false;
      this.$refs["init"].resetFields();
      this.$refs["stu"].resetFields();
      this.loadTable();
    },
    close1() {
      this.loadTable();
      this.showTable = true;
      this.showTable2 = false;
    },
    // 点击选项卡改变事件
    handleClick(tab, event) {
      if (tab.label == "校级项目类型") {
        this.loadTable();
        this.showTable2 = false;
        // console.log(111)
      } else {
        this.loadTable1();
        this.showTable1 = false;
        // console.log(222)
      }
    },
    //加载列表
    loadTable() {
      if (this.has("gjhpyxm:selectYFB")) {
        this.$http
          .get(this.$server.glourl + "gjhpyxm/selectYFB", {
            params: this.pageHelp
          })
          .then(response => {
            this.xmid = "";
            const data = response.data;
            this.dataList = data.page.list;
            this.pageList = data.page;
            //后端返回一个值0或1，根据这个值来判断权限
          });
      } else {
        console.log();
      }
      this.loading = false;
    },
    loadTable1() {
      if (this.has("gjhpyxm:selectYFB")) {
        this.$http
          .get(this.$server.glourl + "gjhpyxm/selectYFB", {
            params: this.pageHelp1
          })
          .then(response => {
            this.xmid = "";
            const data = response.data;
            this.dataList1 = data.page.list;
            // console.log(response.data);
            this.pageList = data.page;
            // console.log(data.page.list)
            //后端返回一个值0或1，根据这个值来判断权限
          });
      } else {
        console.log();
      }
      this.loading1 = false;
    },
    //申请按钮函数
    addApply() {
      this.timestamp = new Date().getTime();
      //console.log(this.timestamp1)
      // console.log(new Date(parseInt(timestamp)).toLocaleString().replace(/:\d{1,2}$/,' '))
      if (this.xmid == null || this.xmid == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
        return;
      } else {
        //console.log(this.tableTime < timestamp)
        if (this.startTime > this.timestamp) {
          this.$message({
            message: "请等待项目开启!",
            type: "error"
          });
          return;
        } else {
          if (this.tableTime < this.timestamp) {
            this.$message({
              message: "已过期，无效操作!",
              type: "error"
            });
            return;
          } else {
            this.$http
              .get(this.$server.glourl + "stugjhzxxm/order?xmid=" + this.xmid)
              .then(response => {
                this.init = response.data.map.init;
                // 附件展示，需要解析成对象
                this.init.fj = JSON.parse(response.data.map.init.fj);
                if (response.data.map.init.xmlx == "0") {
                  this.init.xmlx = "校级项目";
                } else {
                  this.init.xmlx = "国家级项目";
                }
                this.stu = response.data.map.stu;
                // console.log(response.data.map.init);
                this.init.yxsj =
                  response.data.map.init.kssj2 +
                  " 至 " +
                  response.data.map.init.jssj2;
              });
            this.showTable = false;
            this.showTable1 = true;
          }
        }
        // console.log(response.data.map.init.fj)
      }
    },
    addApply1() {
      this.timestamp = new Date().getTime();
      if (this.id == null || this.id == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
        return;
      } else {
        if (this.startTime1 > this.timestamp) {
          this.$message({
            message: "请等待项目开启!",
            type: "error"
          });
          return;
        } else {
          if (this.tableTime1 < this.timestamp) {
            this.$message({
              message: "已过期，无效操作!",
              type: "error"
            });
            return;
          } else {
            this.$http
              .get(this.$server.glourl + "stugjjzxxm/selectInit?id=" + this.id)
              .then(response => {
                this.showTable = false;
                this.showTable2 = true;
                //console.log(response.data);
                this.person = response.data.map.initPerson;
                this.otherMsg = response.data.map.initAdminXm;
                this.otherMsg.fj = JSON.parse(response.data.map.initAdminXm.fj);
                //console.log(response.data.list.xslbm)
                response.data.map.initAdminXm.xmlx == "1"
                  ? (this.otherMsg.xmlx = "国家级项目")
                  : "校级项目";
                // response.data.map.initPerson.xslbm == "1"
                //   ? (this.person.xslbm = "博士生")
                //   : response.data.map.initPerson.xslbm == "2"
                //     ? (this.person.xslbm = "硕士生")
                //     : response.data.map.initPerson.xslbm == "3"
                //       ? (this.person.xslbm = "硕士生")
                //       : "";
                // 附件展示，需要解析成对象
                // this.init.fj = JSON.parse(response.data.map.init.fj);
                // this.stu = response.data.map.stu;
                // console.log(response.data.map.init)
              });
          }
          // console.log(response.data.map.init.fj)
        }
      }
    },
    // 选择表格行xmid
    handleSelectionChange(selection) {
      // console.log(selection);
      if (selection.length == 0) {
        this.xmid = "";
        this.tableTime = "";
        this.startTime = "";
      } else {
        this.xmid = selection[0].id;
        this.tableTime = selection[0].jssj;
        this.startTime = selection[0].kssj;
        this.save.xmid = selection[0].id;
        //console.log(this.tableTime);
      }
    },
    handleSelectionChange1(selection) {
      // console.log(selection);
      if (selection.length == 0) {
        this.id = "";
        this.tableTime1 = "";
        this.startTime1 = "";
        this.plan.xmid = "";
      } else {
        this.id = selection[0].id;
        this.tableTime1 = selection[0].jssj;
        this.startTime1 = selection[0].kssj;
        this.plan.xmid = selection[0].id;
      }
    },
    //申请期限控制
    selectSqqx(val) {
      // console.log(val);
      if (val == 0) {
        this.sqqxRadio = true;
        this.readxmmc = true;
      } else {
        this.readxmmc = false;
        this.sqqxRadio = false;
      }
    },
    //列表查询
    query(queryMsg) {
      // console.log(queryMsg);
      this.queryMsg = queryMsg;
      this.dialogVisible = true;
    },
    query1(queryMsg) {
      //console.log(queryMsg);
      this.queryMsg1 = queryMsg;
      this.dialogVisible1 = true;
    },
    //申请期限
    // handleBlur(){
    //   this.$http
    //     .get("platform-framework/teahwsjjdxm/count?sj="+this.save.sj)
    //     .then(response => {
    //         if (response.data.code == 0) {
    //             // console.log(response.data)
    //             this.save.sqqx = response.data.count
    //         }
    //       })
    //     .catch(function(err) {
    //       console.log(err)
    //     })
    // },
    //申请表单修改
    applyChange() {
      this.$http
        .get(this.$server.glourl + "stucgbb/update", this.save)
        .then(response => {
          //console.log("success");
        });
      this.showTable = false;
      this.showTable1 = true;
    },
    //申请期限
    handleBlur1() {
      this.$http
        .get(this.$server.glourl + "teahwsjjdxm/count?sj=" + this.save.sj)
        .then(response => {
          // console.log(response.data);
          if (response.data.code == 0) {
            this.save.zwts = response.data.count;
          }
          // console.log(this.save.zwts);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 提交申请表单
    applySubmit() {
       console.log(this.save.sj);
      this.timestamp1 = new Date().getTime();
      if (this.save.xmlx == 1) {
        if (this.save.yjjh == "" || this.save.gwds == "" || !this.save.sj) {
          this.$message({
            message: "请填写完整信息！",
            type: "error"
          });
        } else {
          this.loading = true;
          this.submit = "加载中";
          let config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };
          this.save.fj = this.fj;
          //console.log(this.save);
          // console.log(this.fj);
          this.$http
            .post(this.$server.glourl + "stugjhzxxm/lcStart", this.save)
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
              } else {
                this.$message({
                  message: "提交成功！",
                  type: "success"
                });
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
          if (this.save.yjjh == "" || this.save.gwds == "") {
            this.$message({
              message: "请填写完整信息！",
              type: "error"
            });
          } else {
            this.loading = true;
            this.submit = "加载中";
            let config = {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            };
            this.save.fj = this.fj;
            //console.log(this.save);
            // console.log(this.fj);
            this.$http
              .post(this.$server.glourl + "stugjhzxxm/lcStart", this.save)
              .then(response => {
                if (response.data.code == 0) {
                  // console.log("success");
                  this.$message({
                    message: "提交成功！",
                    type: "success"
                  });
                  this.loading = false;
                  this.submit = "提交";
                  this.showTable = true;
                  this.showTable1 = false;
                  this.loadTable();
                } else {
                  this.$alert("提交失败", {
                    dangerouslyUseHTMLString: true
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
            // }
          }
        }
      }
    },
    //切换项目类型
    // changexmlx(){

    // },
    saveMsg() {
      if (this.save.yjjh == "" || this.save.gwds == "") {
        this.$message({
          message: "请填写完整信息！",
          type: "error"
        });
      } else {
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        this.save.fj = this.fj;
        // console.log(this.fj);
        this.$http
          .post(this.$server.glourl + "stugjhzxxm/save", this.save)
          .then(response => {
            //console.log(response.data);
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
        // }
      }
    },
    saveMsg1() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.plan.fj = this.fj1;
      this.$http
        .post(this.$server.glourl + "stugjjzxxm/save2", this.plan)
        .then(response => {
          if (response.data.code == 0) {
            // console.log("success");
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.showTable = true;
            this.showTable2 = false;
            this.loadTable1();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 提交申请表单
    applySubmit1() {
      // console.log(this.save.sj);
      this.timestamp2 = new Date().getTime();
      if (this.tableTime1 < this.timestamp2) {
        this.$message({
          message: "已过期，无效操作!",
          type: "error"
        });
        return;
      } else {
        this.loading1 = true;
        this.submits = "加载中";
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        this.plan.fj = this.fj1;
        // console.log(typeof (this.plan.ncgsj));
        this.$http
          .post(this.$server.glourl + "stugjjzxxm/save", this.plan)
          .then(response => {
            if (response.data.code == 0) {
              // console.log("success");
              this.$message({
                message: "提交成功！",
                type: "success"
              });
              this.loading = false;
              this.submits = "提交";
              this.showTable = true;
              this.showTable2 = false;
              this.loadTable1();
            } else if (response.data.code == 123456) {
              this.$alert(response.data.msg, {
                dangerouslyUseHTMLString: true
              });
              this.loading = false;
              this.submits = "提交";
              this.showTable = true;
              this.showTable2 = false;
              this.loadTable();
              this.loadTable1();
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    //点击重置
    reset() {
      this.$refs["init"].resetFields();
      this.$refs["stu"].resetFields();
      this.stuKyxm.fbxx = [];
      this.$message({
        message: "已重置",
        type: "success"
      });
    },
    //申请信息提交事件
    // submits: function() {
    //   let config = {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   };
    //   this.$http
    //     .post(this.$server.glourl + "stugjhzxxm/order", this.stuKyxm)
    //     .then(res => {
    //       if (res.data.code == 0) {
    //         this.$message({
    //           message: "申请信息提交成功，请等待审核！",
    //           type: "success"
    //         });
    //         this.showTable = true;
    //         this.showTable1 = false;
    //         this.loadTable();
    //       }
    //       // console.log(res);
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     });
    // },
    handlePreview(file) {
      // console.log(file)
    },
    handleRemove(file, fileList) {
      this.onsuccess = false;
      // console.log(file, fileList)
    },
    handleRemove1(file, fileList) {
      this.onsuccess1 = false;
      // console.log(file, fileList)
    },
    // upload () {
    //   this.$http
    //     .get("platform-framework/xmfb/upload", { params: this.pageHelp })
    //     .then(
    //       response => {
    //         // this.loading = false
    //         const data = response.data
    //         this.dataList = data.page.list
    //         // console.log(data.page.list)
    //       }
    //     );
    // },
    // 文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
      this.save.fj = this.fj;
      this.save.fj.push({ name: response.name, url: response.url });
      this.onsuccess = false;
      // console.log(this.save.fj)
    },
    handleSuccess1(response, file, fileList) {
      this.plan.fj = this.fj1;
      this.plan.fj.push({ name: response.name, url: response.url });
      this.onsuccess1 = false;
      // console.log(this.save.fj)
    },
    progress: function() {
      this.onsuccess = true;
    },
    progress1: function() {
      this.onsuccess1 = true;
    },
    // handleExceed (files, fileList) {
    //   this.$message.warning(
    //     `当前限制选择 3 个文件，本次选择了 ${
    //       files.length
    //     } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    //   )
    // },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeRemove1(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 确定删除
    deleteRow() {
      this.intApplyData.splice(this.idx, 1);
      this.$message.success("删除成功");
      this.delVisible = false;
    }
  },
  // activated() {
  //   // this.getData()
  //   //进入页面，加载申请列表
  //   this.loadTable();
  //   // 解决：用户点击申请的状态下直接点了选项卡的关闭，然后再进去页面的时候显示的不是列表而是申请表单
  //   this.showTable = true;
  //   this.showTable1 = false;
  // }
  mounted() {
    this.loadTable();
  }
};
</script>
<style scoped>
textarea {
  resize: none;
  outline: none;
  width: 98.5%;
  overflow-y: scroll;
  line-height: 20px;
  font-size: 14px;
  font-family: "微软雅黑";
}
.long >>> .el-form-item__label {
  line-height: 25px;
}
</style>
<style>
.el-message-box__message p {
  color: red !important;
}
</style>

<style lang="scss" scoped>
@import "../../style/common"; //必须加分号，不然会报错
@import "../../style/ele";
</style>
