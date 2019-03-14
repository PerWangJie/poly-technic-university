<template>
  <div style="width:100%">
    <div class="container" v-show="showTable">
      <el-row style="margin:0 auto;">
        <!-- <el-col :span="12">
					<div class="grid-content">
						<el-input placeholder="请输入内容" style="width:50%"></el-input>
						<el-button>查询</el-button>
						<el-button>重置</el-button>
					</div>
				</el-col> -->
        <el-col :span="24">
          <el-row style="float:right">
            <el-button type="warning" @click="xiugai">修改</el-button>
            <el-button type="success" @click="addApply">添加</el-button>
            <el-button type="success" @click="exportEx">导出Word</el-button>
            <!-- v-if="has('apply:create')" -->
            <!-- <el-button type="primary" @click="showImg">审核进度</el-button> -->
          </el-row>
        </el-col>
      </el-row>
      <el-table ref="multipleTable" :data="page.list" tooltip-effect="dark" @row-click="clickRow" style="margin:0 auto;text-align:center;margin-top:5px" @selection-change="handleSelectionChange" border>
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="80">
        </el-table-column>
        <el-table-column label="申请类型" align="center">
          <template slot-scope="scope">
            <el-button type="text">{{scope.row.appType === '1' ? '博士导师' :scope.row.appType === '2'?'学术型硕士导师':"专业型硕士导师"}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="资料名称" align="center">
          <template slot-scope="scope">
            <p>招生资格申请</p>
          </template>
        </el-table-column>
        <el-table-column label="评审状态" align="center">
          <template slot-scope="scope">
            <el-button type="text">{{scope.row.state === '1' ? '审核成功' :scope.row.state === '2'?'审核中' :scope.row.state === '0'? '审核失败' :scope.row.state === '3'? '退回' :scope.row.state === '4'? '研究生院退回':''}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="comTime">
          <template slot-scope="scope">{{ scope.row.comTime }}</template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align:center;margin-top:30px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currPage" :page-sizes="[5, 10, 15, 20]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.totalCount">
        </el-pagination>
      </div>
    </div>
    <div class="divShadow" v-show="showTable1">
      <div class="close" @click="close()"> X </div>
      <el-row>
        <el-col :span="18" style="margin-top:25px;line-height:50px">
          <div class="small" style="float:left;margin:20px;margin-left:30px"></div>
          <span>申请人基本情况</span>
        </el-col>
      </el-row>
      <el-form :model="quaApply" :rules="rules" ref="quaApply" label-width="177px" label-position="left" style="padding-left:100px">
        <el-row style="padding-top:20px;margin-right:0px" :gutter="20">
          <el-col :span='24'>
            <el-form-item label="招生导师类别：">
              <template>
                <el-checkbox-group style="width:90%" v-model="tutorApply" @change="handleCheckedCitiesChange" v-if="topType">
                  <el-checkbox label="1">博士导师</el-checkbox>
                  <el-checkbox label="2">学术型硕士导师</el-checkbox>
                  <el-checkbox label="3">专业型硕士导师</el-checkbox>
                </el-checkbox-group>
                <el-radio-group v-model="tutorApply" v-if="!topType" @change="topSelection">
                  <el-radio label="1">博士导师</el-radio>
                  <el-radio label="2">学术型硕士导师</el-radio>
                  <el-radio label="3">专业型硕士导师</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='10'>
            <el-form-item label="所在学院名称：" prop="college">
              <el-input v-model="teacher.college" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='10' :offset='1'>
            <el-form-item label="填表时间：">
              <el-input v-bind:value="getNowFormatDate()" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='10'>
            <el-form-item label="姓名：" prop="name1">
              <el-input v-model="teacher.name" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='10' :offset='1'>
            <el-form-item label="性别：" v-model="teacher.sex">
              <el-radio-group v-model="teacher.sex">
                <el-radio-button label="1">男</el-radio-button>
                <el-radio-button label="2">女</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='10'>
            <el-form-item label="出生年月：">
              <el-col>
                <el-form-item prop="birth">
                  <el-date-picker type="date" v-model="teacher.birth" style="width: 100%;" readonly></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span='10' :offset='1'>
            <el-form-item label="联系电话：">
              <el-input type="text" v-model="teacher.phone" readonly/></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='10'>
            <el-form-item label="邮箱：">
              <el-input type="email" v-model="teacher.email" readonly/></el-form-item>
          </el-col>
          <el-col :span='10' :offset='1'>
            <el-form-item label="人才类型：">
              <el-input type="text" v-model="quaApply.talType" /></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='10'>
            <el-form-item label="人才层次：" v-model="quaApply.talLevel">
              <el-radio-group v-model="quaApply.talLevel">
                <el-radio label="1">国家级</el-radio>
                <el-radio label="2">省级</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span='10'>
            <el-form-item label="博士学位点名称：" v-if="boshi" prop="enrollName">
              <el-input type="text" v-model="enrollName1[0]" style="width:49%" />
              <el-input type="text" v-model="enrollName1[1]" style="width:49%" />
            </el-form-item>
            <el-form-item label="学术学位点名称：" v-if="xueshu" prop="enrollName1">
              <el-input type="text" v-model="enrollName2[0]" style="width:49%" />
              <el-input type="text" v-model="enrollName2[1]" style="width:49%" />
            </el-form-item>
            <el-form-item label="专业学位点名称：" v-if="zhuanye" prop="enrollName2">
              <el-input type="text" v-model="enrollName3[0]" style="width:49%" />
              <el-input type="text" v-model="enrollName3[1]" style="width:49%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="line-height:50px;margin-left:-100px">
            <div class="small" style="float:left;margin:20px;margin-left:30px"></div>
            <div class="numAdd">
              <el-col :span='22'>
                <span>满足《浙江工业大学关于研究生指导教师招生条件的规定（修订）》（浙工大研【2017】8号）第
                  <span>
                    <el-input type="text" v-model="quaApply.branch" size="mini"></el-input>
                  </span> 条规定。</span>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" style="line-height:50px;margin-left:-100px">
            <div class="small" style="float:left;margin:20px;margin-left:30px"></div>
            <span>招生条件</span>
          </el-col>
        </el-row>
        <el-row>
          <el-radio-group v-model="quaApply.comType" @change="selection">
            <!-- quaApply.comType -->
            <el-row style="margin-top:15px;width:100%" v-for="type in comType" :key="type.id">
              <el-col :span='22'>
                <el-radio :label="type.id" style="margin-top:10px;">
                  <span style="word-break:normal;white-space:pre-wrap;overflow:hidden;">{{type.condition}}</span>
                </el-radio>
              </el-col>
            </el-row>
          </el-radio-group>
        </el-row>

      </el-form>

      <div v-if="condition.itemStatus || condition.paperStatus">
        <el-row>
          <el-col :span="18" style="margin-top:25px;line-height:50px">
            <div class="small" style="float:left;margin:20px;margin-left:30px"></div>
            <span>本人近五年学术成果情况</span>
          </el-col>
        </el-row>

        <!--主持项目及到校经费 table-->
        <el-row style="padding-top:20px;" v-show="condition.itemStatus">
          <el-col :span='20' :offset='1'>
            <el-table border cell-style="padding:0px" row-style="height:50px;" :data="quaApply.itemInfo" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
              <el-table-column label="主持项目及到校经费" align="center">
                <el-table-column prop="num" label="序号" align="center">
                </el-table-column>

                <el-table-column prop="name" label="项目名称" align="center">
                  <template slot-scope="scope">
                    <el-input size="mini" v-show="scope.row.editFlag && scope.row.from == '3'" v-model="scope.row.name" placeholder="请输入内容" />
                    <span v-show="!(scope.row.editFlag && scope.row.from == '3')">{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="source" label="项目来源" align="center">
                  <template slot-scope="scope">
                    <el-input size="mini" v-show="scope.row.editFlag && scope.row.from == '3'" v-model="scope.row.source" placeholder="请输入内容" />
                    <span v-show="!(scope.row.editFlag && scope.row.from == '3')">{{scope.row.source}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="level" label="项目类别" align="center">
                  <template slot-scope="scope">
                    <el-input size="mini" v-show="scope.row.editFlag && scope.row.from == '3'" v-model="scope.row.level" placeholder="请输入内容" />
                    <span v-show="!(scope.row.editFlag && scope.row.from == '3')">{{scope.row.level}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="expend" label="到校经费" align="center">
                  <template slot-scope="scope">
                    <el-input size="mini" v-show="scope.row.editFlag && scope.row.from == '3'" v-model="scope.row.expend" placeholder="请输入内容" />
                    <span v-show="!(scope.row.editFlag && scope.row.from == '3')">{{scope.row.expend}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="startTime" label="开始时间" align="center">
                  <template slot-scope="scope">
                    <el-input size="mini" v-show="scope.row.editFlag && scope.row.from == '3'" v-model="scope.row.startTime" placeholder="请输入内容" />
                    <span v-show="!(scope.row.editFlag && scope.row.from == '3')">{{scope.row.startTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="endTime" label="结束时间" align="center">
                  <template slot-scope="scope">
                    <el-input size="mini" v-show="scope.row.editFlag && scope.row.from == '3'" v-model="scope.row.endTime" placeholder="请输入内容" />
                    <span v-show="!(scope.row.editFlag && scope.row.from == '3')">{{scope.row.endTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="upload" label="上传附件" align="center">
                  <template slot-scope="scope">
                    <span v-show="!scope.row.editFlag">{{scope.row.fjName}}</span>
                    <el-upload class="upload-demo" v-show="scope.row.editFlag" :action="baseUrls" name="file" :on-progress="progress1" :on-success="uploadFile1" :show-file-list="false">
                      <el-button style="margin:10px" size="mini" type="primary" @click="uploadClick(scope.row.num,1)">上传附件</el-button>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column prop="from" label="数据来源" align="center">
                  <template slot-scope="scope">
                    <span>{{scope.row.from == '1'?'科研系统': scope.row.from == '2'?'社科系统' : '手动填写'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" align="center">
                  <template slot-scope="scope">
                    <el-input v-show="scope.row.editFlag" size="mini" v-model="scope.row.remark" placeholder="请输入内容" />
                    <span v-show="!scope.row.editFlag">{{scope.row.remark}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-col>
          <!-- 
          <el-col :span='1' style="padding-left:20px">
            <el-button icon="el-icon-plus" size='mini' circle @click="addRow(1)" />
          </el-col>
          <el-col :span='1'>
            <el-button icon="el-icon-minus" size='mini' circle @click="delRow(1)"></el-button>
          </el-col>
          <el-upload class="upload-demo" multiple="true" action="platform-framework/tutorApply/upload" name="file" :on-success="uploadFile">
            <el-button style="margin:20px" size="small" type="primary">上传附件</el-button>
          </el-upload> -->
          <el-col :span='2' style="padding-top:10px;padding-left:10px">
            <div>
              <el-button size='mini' square @click="piliang1">批量导入</el-button>
            </div>
            <div style="margin-top:20px;">
              <el-button icon="el-icon-plus" size='mini' circle @click="addRow(1)" />
              <el-button style="margin-left:20px;" icon="el-icon-minus" size='mini' circle @click="delRow(1)"></el-button>
            </div>
          </el-col>

          <!-- <el-upload class="upload-demo" multiple="true" action="platform-framework/tutorApply/upload" name="file" :on-success="uploadFile">
            <el-button style="margin:20px" size="small" type="primary">上传附件</el-button>
          </el-upload> -->
        </el-row>

        <!--论文专著教材 table-->
        <el-row style="padding-top:20px;" v-show="condition.paperStatus">
          <el-col :span='20' :offset='1'>
            <el-table border cell-style="padding:0px" row-style="height:50px;" :data="quaApply.paperInfo" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
              <el-table-column label="论文专著教材" align="center">
                <el-table-column prop="num" label="序号" align="center">
                </el-table-column>
                <el-table-column prop="name" label="论文/专著名称" align="center">
                  <template slot-scope="scope">
                    <el-input size="mini" v-show="scope.row.editFlag && scope.row.from == '3'" v-model="scope.row.name" placeholder="请输入内容" />
                    <span v-show="!(scope.row.editFlag && scope.row.from == '3')">{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="unit" label="期刊名称/出版单位" align="center">
                  <template slot-scope="scope">
                    <el-input size="mini" v-show="scope.row.editFlag && scope.row.from == '3'" v-model="scope.row.unit" placeholder="请输入内容" />
                    <span v-show="!(scope.row.editFlag && scope.row.from == '3')">{{scope.row.unit}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="publishTime" label="发表/出版年份" align="center">
                  <template slot-scope="scope">
                    <el-input size="mini" v-show="scope.row.editFlag && scope.row.from == '3'" v-model="scope.row.publishTime" placeholder="请输入内容" />
                    <span v-show="!(scope.row.editFlag && scope.row.from == '3')">{{scope.row.publishTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="level" label="期刊/出版级别" align="center">
                  <template slot-scope="scope">
                    <el-input size="mini" v-show="scope.row.editFlag && scope.row.from == '3'" v-model="scope.row.level" placeholder="请输入内容" />
                    <span v-show="!(scope.row.editFlag && scope.row.from == '3')">{{scope.row.level}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="upload" label="上传附件" align="center">
                  <template slot-scope="scope">
                    <span v-show="!scope.row.editFlag">{{scope.row.fjName}}</span>
                    <el-upload v-show="scope.row.editFlag" class="upload-demo" :action="baseUrls" name="file" :on-progress="progress2" :on-success="uploadFile2" :show-file-list="false">
                      <el-button style="margin:10px" size="mini" type="primary" @click="uploadClick(scope.row.num,2)">上传附件</el-button>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column prop="from" label="数据来源" align="center">
                  <template slot-scope="scope">
                    <span>{{scope.row.from == '1'?'科研系统': scope.row.from == '2'?'社科系统' : '手动填写'}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" align="center">
                  <template slot-scope="scope">
                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.remark" placeholder="请输入内容" />
                    <span v-show="!scope.row.editFlag">{{scope.row.remark}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-col>

          <el-col :span='2' style="padding-top:10px;padding-left:10px">
            <div>
              <el-button size='mini' square @click="piliang2">批量导入</el-button>
            </div>
            <div style="margin-top:20px;">
              <el-button icon="el-icon-plus" size='mini' circle @click="addRow(2)" />
              <el-button style="margin-left:20px" icon="el-icon-minus" size='mini' circle @click="delRow(2)"></el-button>
            </div>
          </el-col>

          <!-- <el-upload class="upload-demo" multiple="true" action="platform-framework/tutorApply/upload" name="file" :on-success="uploadFile">
            <el-button style="margin:20px" size="small" type="primary">上传附件</el-button>
          </el-upload> -->
        </el-row>
      </div>
      <el-dialog title="批量导入" :visible.sync="centerDialogVisible" width="40%">
        <el-row v-show="zcxmDio">
          <el-col :span='24' style="line-height:30px;margin-top:-25px">
            <div class="small"></div>
            <span>主持项目及到校经费</span>
          </el-col>
        </el-row>
        <div style="height:300px;overflow-y:scroll;padding-left:15px" v-show="zcxmDio">
          <el-row style="line-height:30px;">
            <el-checkbox-group v-model="checked1" @change="handleCheckedCitiesChanges(zcxm)">
              <el-col :span='24' v-for="(zcxm,index) in item" :key="index">
                <el-checkbox :label="zcxm" :key="zcxm">{{formatDate(zcxm.start_dt*1000)}}&nbsp;&nbsp;&nbsp;&nbsp;{{zcxm.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{formatDate(zcxm.end_dt*1000)}}&nbsp;&nbsp;&nbsp;&nbsp;{{zcxm.total_fee}}&nbsp;&nbsp;&nbsp;&nbsp;{{zcxm.level}}</el-checkbox>
              </el-col>
            </el-checkbox-group>
          </el-row>
        </div>
        <el-row v-show="lwzzDio">
          <el-col :span='24' style="line-height:30px;margin-top:-25px">
            <div class="small"></div>
            <span>论文专著教材</span>
          </el-col>
        </el-row>
        <div style="height:300px;overflow:scroll;padding-left:15px" v-show="lwzzDio">
          <el-row style="line-height:30px;">
            <el-checkbox-group v-model="checked2" @change="handleCheckedCitiesChanges(lwzz)">
              <el-col :span='24' v-for="(lwzz,index) in paper" :key="index">
                <el-checkbox :label="lwzz" :key="lwzz">名称：{{lwzz.title}}&nbsp;&nbsp;&nbsp;&nbsp;发表时间：{{lwzz.year}}&nbsp;&nbsp;&nbsp;&nbsp;级别：{{lwzz.level}}&nbsp;&nbsp;&nbsp;&nbsp;{{lwzz.journal}}</el-checkbox>
              </el-col>
            </el-checkbox-group>
          </el-row>
        </div>
        <el-row v-show="kyhjDio">
          <el-col :span='24' style="line-height:30px;margin-top:-25px">
            <div class="small"></div>
            <span>科研获奖情况</span>
          </el-col>
        </el-row>
        <div style="height:300px;overflow-y:scroll;padding-left:15px" v-show="kyhjDio">
          <el-row style="line-height:30px;">
            <el-checkbox-group v-model="checked3" @change="handleCheckedCitiesChanges(kyhj)">
              <el-col :span='24' v-for="(kyhj,index) in bear" :key="index">
                <el-checkbox :label="kyhj" :key="kyhj">{{kyhj.time}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{kyhj.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{kyhj.unit}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{kyhj.level}}&nbsp;&nbsp;&nbsp;&nbsp;{{kyhj.rank}}</el-checkbox>
              </el-col>
            </el-checkbox-group>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-row v-show="condition.bearStatus">
        <el-col :span="18" style="margin-top:25px;line-height:50px">
          <div class="small" style="float:left;margin:20px;margin-left:30px"></div>
          <span>科研获奖情况</span>
        </el-col>
      </el-row>

      <el-row style="padding-top:20px" v-show="condition.bearStatus">
        <el-col :span='20' :offset='1'>
          <el-table border cell-style="padding:0px" row-style="height:50px;" :data="quaApply.bearInfo" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
            <el-table-column label="科研获奖情况" align="center">
              <el-table-column prop="num" label="序号" align="center">
              </el-table-column>
              <el-table-column prop="name" label="成果名称" align="center">
                <template slot-scope="scope">
                  <el-input size="mini" v-show="scope.row.editFlag && scope.row.from == '3'" v-model="scope.row.name" placeholder="请输入内容" />
                  <span v-show="!(scope.row.editFlag && scope.row.from == '3')">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="time" label="获奖年份" align="center">
                <template slot-scope="scope">
                  <el-input size="mini" v-show="scope.row.editFlag && scope.row.from == '3'" v-model="scope.row.time" placeholder="请输入内容" />
                  <span v-show="!(scope.row.editFlag && scope.row.from == '3')">{{scope.row.time}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="unit" label="获奖名称" align="center">
                <template slot-scope="scope">
                  <el-input size="mini" v-show="scope.row.editFlag && scope.row.from == '3'" v-model="scope.row.unit" placeholder="请输入内容" />
                  <span v-show="!(scope.row.editFlag && scope.row.from == '3')">{{scope.row.unit}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="rank" label="等级/排名" align="center">
                <template slot-scope="scope">
                  <el-input size="mini" v-show="scope.row.editFlag && scope.row.from == '3'" v-model="scope.row.rank" placeholder="请输入内容" />
                  <span v-show="!(scope.row.editFlag && scope.row.from == '3')">{{scope.row.classification}}{{scope.row.rank}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="upload" label="上传附件" align="center">
                <template slot-scope="scope">
                  <span v-show="!scope.row.editFlag">{{scope.row.fjName}}</span>
                  <el-upload v-show="scope.row.editFlag" class="upload-demo" :action="baseUrls" name="file" :on-progress="progress3" :on-success="uploadFile3" :show-file-list="false">
                    <el-button style="margin:10px" size="mini" type="primary" @click="uploadClick(scope.row.num,3)">上传附件</el-button>
                  </el-upload>
                </template>
              </el-table-column>
              <el-table-column prop="from" label="数据来源" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.from == '1'?'科研系统': scope.row.from == '2'?'社科系统' : '手动填写'}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注" align="center">
                <template slot-scope="scope">
                  <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.remark" placeholder="请输入内容" />
                  <span v-show="!scope.row.editFlag">{{scope.row.remark}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-col>

        <el-col :span='2' style="padding-top:10px;padding-left:10px">
          <div>
            <el-button size='mini' square @click="piliang3">批量导入</el-button>
          </div>
          <div style="margin-top:20px;">
            <el-button icon="el-icon-plus" size='mini' circle @click="addRow(3)" />
            <el-button style="margin-left:20px" icon="el-icon-minus" size='mini' circle @click="delRow(3)"></el-button>
          </div>
        </el-col>

        <!-- <el-upload class="upload-demo" multiple="true" action="platform-framework/tutorApply/upload" name="file" :on-success="uploadFile">
            <el-button style="margin:20px" size="small" type="primary">上传附件</el-button>
          </el-upload> -->
      </el-row>

      <div v-show="condition.guideStatus">
        <el-row>
          <el-col :span="18" style="margin-top:25px;line-height:50px">
            <div class="small" style="float:left;margin:20px;margin-left:30px"></div>
            <span>本人指导研究生获优秀学位论文情况</span>
          </el-col>
        </el-row>
        <el-row style="padding-top:20px;">
          <el-col :span='20' :offset='1'>
            <el-table border cell-style="padding:0px" row-style="height:50px;" :data="quaApply.guideInfo" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
              <el-table-column label="本人指导研究生获优秀学位论文情况" align="center">
                <el-table-column prop="num" label="序号" align="center">
                </el-table-column>
                <el-table-column prop="stuName" label="学生名称" align="center">
                  <template slot-scope="scope">
                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.stuName" placeholder="请输入内容" />
                    <span v-show="!scope.row.editFlag">{{scope.row.stuName}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="type" label="学硕/专硕" align="center">
                  <template slot-scope="scope">
                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.type" placeholder="请输入内容" />
                    <span v-show="!scope.row.editFlag">{{scope.row.type}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="degree" label="所在学位点" align="center">
                  <template slot-scope="scope">
                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.degree" placeholder="请输入内容" />
                    <span v-show="!scope.row.editFlag">{{scope.row.degree}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="time" label="获评年份" align="center">
                  <template slot-scope="scope">
                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.time" placeholder="请输入内容" />
                    <span v-show="!scope.row.editFlag">{{scope.row.time}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="level" label="等级" align="center">
                  <template slot-scope="scope">
                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.level" placeholder="请输入内容" />
                    <span v-show="!scope.row.editFlag">{{scope.row.level}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="upload" label="上传附件" align="center">
                  <template slot-scope="scope">
                    <span v-show="!scope.row.editFlag">{{scope.row.fjName}}</span>
                    <el-upload v-show="scope.row.editFlag" class="upload-demo" :action="baseUrls" name="file" :on-progress="progress4" :on-success="uploadFile4" :show-file-list="false">
                      <el-button style="margin:10px" size="mini" type="primary" @click="uploadClick(scope.row.num,4)">上传附件</el-button>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" align="center">
                  <template slot-scope="scope">
                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.remark" placeholder="请输入内容" />
                    <span v-show="!scope.row.editFlag">{{scope.row.remark}}</span>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-col>

          <el-col :span='2' style="padding-top:10px;padding-left:10px">
            <!-- <div>
              <el-button size='mini' square @click="centerDialogVisible = true">批量导入</el-button>
            </div> -->
            <div style="margin-top:50px;">
              <el-button icon="el-icon-plus" size='mini' circle @click="addRow(4)" />
              <el-button style="margin-left:20px" icon="el-icon-minus" size='mini' circle @click="delRow(4)"></el-button>
            </div>
          </el-col>

          <!-- <el-upload class="upload-demo" multiple="true" action="platform-framework/tutorApply/upload" name="file" :on-success="uploadFile">
            <el-button style="margin:20px" size="small" type="primary">上传附件</el-button>
          </el-upload> -->
        </el-row>
        <!-- <el-row style="padding-top:20px;padding-left:65px">
          <el-col>
            <el-upload class="upload-demo" multiple="true" action="platform-framework/tutorApply/upload" name="file" :on-success="uploadFile">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上不超过500kb的文件</div>
            </el-upload>
          </el-col>
        </el-row> -->
      </div>

      <div class="bottomBox" style="text-align:center;">
        <el-button type="primary" @click="resets" class="reset">重置</el-button>
        <el-button :loading="load" type="primary" @click="submitApply" class="reset" :disabled="onsuccess">提交</el-button>
      </div>
    </div>
    <!-- <el-dialog title="审核进度" :visible.sync="imgVisible" width="30%" center>
      <el-row>
        <el-col offset="4" span="12">
          <img :src="imgUrl" />
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="imgVisible = false">取 消</el-button>
        <el-button type="primary" @click="imgVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // buttonStatusL: false,
      uploadedit: false,
      someNum: "",
      zcxmDio: true,
      lwzzDio: true,
      kyhjDio: true,
      item: [],
      paper: [],
      bear: [],
      checked1: [],
      checked2: [],
      checked3: [],
      userName: "",
      centerDialogVisible: false, //dialog 开关
      onsuccess: false,
      comType: [],
      load: false,
      topType: true,
      tutorApply: [],
      tutorApplys: [],
      xueshu: false,
      boshi: false,
      zhuanye: false,
      radio: "",
      table: false,
      table1: false,
      showTable: true, //展示列表开关
      showTable1: false,
      // imgVisible: false, //审核流程图显示开关
      imgUrl: "", //审核流程图地址
      teacher: {}, //导师基本信息类
      currentdate: "",
      pageHelp: {
        //列表分页辅助类
        host: 1, //后台需要，标识是否研究生综合服务平台请求
        page: 1,
        limit: 5,
        sidx: "sqlx,cjsj",
        order: "asc"
      },
      //审核进度流程实例ID
      processId: "",
      page: {
        //列表信息回调辅助类
      },
      //辅助变量
      num: 0,
      tables: 0,
      enrollName1: [],
      enrollName2: [],
      enrollName3: [],
      quaApply: {
        //申请表信息辅助类
        comType: "",
        appType: [],
        talType: "专业型",
        talLevel: "",
        itemInfo: [],
        paperInfo: [],
        bearInfo: [],
        guideInfo: [],
        accinfo: [],
        comTime: ""
      },
      condition: {},
      rules: {
        //表单校验
        appType: [{ required: true, message: "请填申请类型", trigger: "blur" }],
        // enrollName: [{ required: true, message: "请填博士学位点名称", trigger: "blur" }],
        // enrollName1: [{ required: true, message: "请填学术学位点名称", trigger: "blur" }],
        // enrollName2: [{ required: true, message: "请填专业学位点名称", trigger: "blur" }],
        talType: [
          {
            required: true,
            message: "请填写人才类型",
            trigger: "blur"
          }
        ],
        talLevel: [
          {
            required: true,
            message: "请填写人才层次",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    //进入页面，加载申请列表
    this.loadTable();
    this.getNowFormatDate();
    this.$http.get(this.$server.glourl + "enrol/condition").then(response => {
      this.comType = response.data;
      // console.log(this.comType);
      // console.error(this.quaApply.bearInfo)
    });
  },
  methods: {
    uploadClick(num, table) {
      this.num = num;
      this.tables = table;
    },
    //console.log(num, table);
    //关闭添加页面
    close() {
      this.showTable1 = false;
      this.showTable = true;
      this.loadTable();
    },
    //单选控制
    selection(val) {
      this.comType.forEach(element => {
        if (element.id == val) {
          this.condition = element;
          return;
        }
      });
    },
    topSelection(val) {
      if (val == 1) {
        this.boshi = true;
      } else {
        this.boshi = false;
      }
      if (val == 2) {
        this.xueshu = true;
      } else {
        this.xueshu = false;
      }
      if (val == 3) {
        this.zhuanye = true;
      } else {
        this.zhuanye = false;
      }
    },
    //多选控制
    handleCheckedCitiesChange(checked) {
      this.quaApply.enrollName = [];
      var num = checked.map(Number);

      if (num.indexOf(1) >= 0) {
        this.boshi = true;
      } else {
        this.boshi = false;
      }
      if (num.indexOf(2) >= 0) {
        this.xueshu = true;
      } else {
        this.xueshu = false;
      }
      if (num.indexOf(3) >= 0) {
        this.zhuanye = true;
      } else {
        this.zhuanye = false;
      }
    },
    // uploadFile(response, file, fileList) {
    //   //console.log(response, file, fileList)
    //   //console.log(this.quaApply.accinfo)
    //   this.quaApply.accinfo.push({ name: response.name, url: response.url });
    //   //console.log(this.quaApply.accinfo)
    // },
    //加载列表
    loadTable() {
      this.$http
        .get(this.$server.glourl + "tutorApply/list", { params: this.pageHelp })
        .then(response => {
          this.page = response.data.page;
          //console.log(response.data);
        });
    },
    //列表index
    indexMethod(index) {
      return (this.page.currPage - 1) * this.page.pageSize + index + 1;
    },
    //查询个人基本信息
    queryTeacherInfo() {
      this.quaApply.comTime = new Date("yyyy-MM-dd");
      this.$http
        .get(this.$server.glourl + "supervisor/teaInfo")
        .then(response => {
          if (response.data.code == 500) {
            this.$message({
              message: response.data.msg,
              type: "error"
            });
          } else {
            (this.teacher = response.data.teacher),
              (this.teacher.birth = new Date(
                this.teacher.birth.replace(/\./g, "/")
              ));
            // this.tutorApply = [];
            // this.enrollName1 = [];
            // this.enrollName2 = [];
            // this.enrollName3 = [];
            // this.quaApply.comType = "";
          }
        });
    },
    queryTeacherInfos() {
      this.quaApply.comTime = new Date("yyyy-MM-dd");
      this.$http
        .get(this.$server.glourl + "supervisor/teaInfo")
        .then(response => {
          // console.log(response.data);
          if (response.data.code == 500) {
            this.$message({
              message: response.data.msg,
              type: "error"
            });
          } else {
            this.userName = response.data.teacher.name;
            (this.teacher = response.data.teacher),
              (this.teacher.birth = new Date(
                this.teacher.birth.replace(/\./g, "/")
              ));

            // this.quaApply.comType = this.comType;
            let _this = this;
            this.$http
              .post(this.$server.glourl + "scr/info?userName=" + this.userName)
              .then(res => {
                // console.log(res.data);
                _this.item = res.data.result.item;
                _this.paper = res.data.result.paper;
                _this.bear = res.data.result.bear;
              })
              .catch(function(err) {
                console.log(err);
              });
          }
        });
    },
    // showImg() {
    //   if (this.processId == null || this.processId == "") {
    //     this.$message({
    //       message: "请选择一条数据！",
    //       type: "error"
    //     });
    //     return;
    //   }
    //   this.imgUrl =
    //     "platform-framework/activitiController/getActivitiProccessImage?processId=" +
    //     this.processId;
    //   this.imgVisible = true;
    // },
    //判断字符串是否为空
    isEmpty(obj) {
      if (typeof obj == "boolean") {
        return true;
      }
      if (
        typeof obj == "undefined" ||
        obj == null ||
        obj == "" ||
        obj.length == 0
      ) {
        return false;
      } else {
        return true;
      }
    },

    //添加申请按钮函数
    addApply() {
      this.someNum = 2;
      //加载教师基本信息
      this.showTable = false;
      this.showTable1 = true;
      this.topType = true;
      this.tutorApply = [];
      this.enrollName1 = [];
      this.enrollName2 = [];
      this.enrollName3 = [];
      this.checked1 = [];
      this.checked2 = [];
      this.checked3 = [];
      this.quaApply.itemInfo = [];
      this.quaApply.bearInfo = [];
      this.quaApply.guideInfo = [];
      this.quaApply.paperInfo = [];
      this.quaApply.talType = [];
      this.quaApply.comType = "";
      this.condition = {};
      this.queryTeacherInfos();
    },
    //改变列表页当前页回调函数
    handleCurrentChange(val) {
      this.pageHelp.page = val;
      this.loadTable();
    },
    //改变列表页条数大小回调函数
    handleSizeChange(val) {
      this.pageHelp.limit = val;
      this.loadTable();
    },
    //申请表信息动态添加行
    addRow(tableIndix) {
      switch (tableIndix) {
        case 1:
          this.quaApply.itemInfo.push({
            num: this.quaApply.itemInfo.length + 1,
            editFlag: false,
            tableNum: 1,
            from: 3
          });
          break;
        case 2:
          this.quaApply.paperInfo.push({
            num: this.quaApply.paperInfo.length + 1,
            editFlag: false,
            tableNum: 2,
            from: 3
          });
          break;
        case 3:
          this.quaApply.bearInfo.push({
            num: this.quaApply.bearInfo.length + 1,
            editFlag: false,
            tableNum: 3,
            from: 3
          });
          break;
        case 4:
          this.quaApply.guideInfo.push({
            num: this.quaApply.guideInfo.length + 1,
            editFlag: false,
            tableNum: 4,
            from: 3
          });
          break;
        default:
          break;
      }
    },
    //上传成功
    uploadFile1(file) {
      // console.log(file);
      this.upload1 = false;
      this.onsuccess = false;
      this.quaApply.itemInfo[this.num - 1].fjName = file.name;
      this.quaApply.itemInfo[this.num - 1].fjUrl = file.url;
      this.quaApply.itemInfo[this.num - 1].editFlag = true;
      // this.quaApply.itemInfo[this.num - 1].editFlag = false;
      // console.log(this.quaApply.itemInfo);
    },

    uploadFile2(file) {
      // console.log(file);
      this.upload2 = false;
      this.onsuccess = false;
      this.quaApply.paperInfo[this.num - 1].fjName = file.name;
      this.quaApply.paperInfo[this.num - 1].fjUrl = file.url;
      this.quaApply.paperInfo[this.num - 1].editFlag = true;
      // this.quaApply.paperInfo[this.num - 1].editFlag = false;
      // console.log(this.quaApply.paperInfo);
    },

    uploadFile3(file) {
      // console.log(file);
      this.upload3 = false;
      this.onsuccess = false;
      this.quaApply.bearInfo[this.num - 1].fjName = file.name;
      this.quaApply.bearInfo[this.num - 1].fjUrl = file.url;
      this.quaApply.bearInfo[this.num - 1].editFlag = true;
      // this.quaApply.bearInfo[this.num - 1].editFlag = false;
      //console.log(this.quaApply.bearInfo);
    },

    uploadFile4(file) {
      // console.log(file);
      this.onsuccess = false;
      this.quaApply.guideInfo[this.num - 1].fjName = file.name;
      this.quaApply.guideInfo[this.num - 1].fjUrl = file.url;
      this.quaApply.guideInfo[this.num - 1].editFlag = true;
      // this.quaApply.guideInfo[this.num - 1].editFlag = false;
      //console.log(this.quaApply.guideInfo);
    },
    progress1: function() {
      this.onsuccess = true;
    },
    progress2: function() {
      this.onsuccess = true;
    },
    progress3: function() {
      this.onsuccess = true;
    },
    progress4: function() {
      this.onsuccess = true;
    },
    //申请信息动态减少行
    delRow(tableIndix) {
      switch (tableIndix) {
        case 1:
          if (this.quaApply.itemInfo.length == 1) {
            this.checked1 = [];
          }
          this.quaApply.itemInfo.pop();
          break;
        case 2:
          if (this.quaApply.paperInfo.length == 1) {
            this.checked2 = [];
          }
          this.quaApply.paperInfo.pop();
          break;
        case 3:
          if (this.quaApply.bearInfo.length == 1) {
            this.checked3 = [];
          }
          this.quaApply.bearInfo.pop();
          break;
        case 4:
          // if (this.quaApply.guideInfo.length == 1) {
          //   return;
          // }
          this.quaApply.guideInfo.pop();
          break;
        default:
          break;
      }
    },
    //申请信息table鼠标经过事件
    handleMouseEnter: function(row, column, cell, event) {
      const tableIndix = row.tableNum;
      let num = row.num - 1;
      switch (tableIndix) {
        case 1:
          this.quaApply.itemInfo[num].editFlag = true;
          break;
        case 2:
          this.quaApply.paperInfo[num].editFlag = true;
          break;
        case 3:
          this.quaApply.bearInfo[num].editFlag = true;
          break;
        case 4:
          this.quaApply.guideInfo[num].editFlag = true;
          break;
        default:
          break;
      }
    },
    //列表选择改变事件
    handleSelectionChange(selection) {
      //console.log(selection);
      if (selection.length == 1) {
        this.processId = selection[0];
        // console.log(this.processId);
      } else {
        this.processId = "";
      }
    },
    //申请信息table鼠标经过移出事件
    handleMouseOut: function(row, column, cell, event) {
      // console.log(row);
      const tableIndix = row.tableNum;
      let num = row.num - 1;
      switch (tableIndix) {
        case 1:
          this.quaApply.itemInfo[num].editFlag = false;
          break;
        case 2:
          this.quaApply.paperInfo[num].editFlag = false;
          break;
        case 3:
          this.quaApply.bearInfo[num].editFlag = false;
          break;
        case 4:
          this.quaApply.guideInfo[num].editFlag = false;
          break;
        default:
          break;
      }
    },
    //提交申请信息校验table列是否为空
    checkTable() {
      var f =
        this.checkList(this.quaApply.itemInfo, 9) &&
        this.checkList(this.quaApply.paperInfo, 7) &&
        this.checkList(this.quaApply.bearInfo, 7) &&
        this.checkList(this.quaApply.guideInfo, 8);
      return f;
    },
    //校验数组
    checkList(obj, size) {
      var ckeck = true;
      var flag = false;
      for (let index = 0; index < obj.length; index++) {
        const element = obj[index];
        if (Object.keys(element).length < size) {
          ckeck = false;
          break;
        }
        var temp = Object.values(element);
        for (let index = 0; index < temp.length; index++) {
          const t = temp[index];
          if (!this.isEmpty(t)) {
            ckeck = false;
            flag = true;
            break;
          }
        }
        if (flag) {
          break;
        }
      }
      return ckeck;
    },
    //申请信息提交至服务器
    submitApply() {
      // console.log(this.tutorApply.length == 0)
      if (this.tutorApply.length == 0) {
        this.$message({
          message: "请填写完整信息！",
          type: "error"
        });
      } else {
        if (this.someNum == 1) {
          this.quaApply.appType = JSON.stringify(this.tutorApply);
          this.submitForm();
          this.load = true;
        } else {
          //this.quaApply.enrollName = new Array();
          this.tutorApply.forEach(element => {
            switch (element) {
              case "1":
                this.quaApply.enrollName.push(this.enrollName1[0]);
                this.quaApply.enrollName.push(this.enrollName1[1]);

                break;
              case "2":
                this.quaApply.enrollName.push(this.enrollName2[0]);
                this.quaApply.enrollName.push(this.enrollName2[1]);

                break;
              case "3":
                this.quaApply.enrollName.push(this.enrollName3[0]);
                this.quaApply.enrollName.push(this.enrollName3[1]);

                break;

              default:
                break;
            }
          });
          this.quaApply.appType = JSON.stringify(this.tutorApply);
          this.subThis();
          this.load = true;
        }
      }
    },
    //提交
    subThis() {
      // console.log(this.quaApply.comType)
      this.$http
        .post(this.$server.glourl + "tutorApply/submitApply", this.quaApply)
        .then(res => {
          if (res.data.code == 0) {
            this.load = false;

            this.$message({
              message: "申请信息提交成功，请等待审核！",
              type: "success"
            });
            this.showTable = true;
            this.showTable1 = false;
            this.load = false;
            // console.log(this.quaApply);

            this.loadTable();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //申请信息提交事件
    submitForm: function() {
      // console.log(this.tutorApply.replace(/\"/g, ""))
      // console.log(this.quaApply.appType);
      this.quaApply.appType = this.quaApply.appType.replace(/\"/g, "");
      // console.log(this.quaApply.appType);
      if (this.processId != "") {
        this.$http
          .post(this.$server.glourl + "tutorApply/update", this.quaApply)
          .then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: "申请信息提交成功，请等待审核！",
                type: "success"
              });
              this.showTable = true;
              this.showTable1 = false;
              this.load = false;
              //console.log(this.quaApply);
              this.loadTable();
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    /**
     * 获取当前时间
     * 格式YYYY-MM-DD
     */
    getNowFormatDate: function() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      //console.log(currentdate);
      return currentdate;
    },
    //点击修改按钮
    xiugai() {
      this.someNum = 1;
      if (this.processId == null || this.processId == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
      } else {
        if (this.processId.state == 3) {
          this.showTable = false;
          this.showTable1 = true;
          this.topType = false;
          this.quaApply = this.processId;
          // console.log(this.condition);
          this.tutorApply = this.quaApply.appType.replace(/\"/g, "");
          this.comType.forEach(element => {
            if (this.quaApply.comType == element.id) {
              this.condition = element;
              this.quaApply.comType = element.id;
            }
          });
          if (this.tutorApply == 1) {
            this.enrollName1 = this.quaApply.enrollName;
            this.boshi = true;
          } else {
            this.boshi = false;
          }
          if (this.tutorApply == 2) {
            this.enrollName2 = this.quaApply.enrollName;
            this.xueshu = true;
          } else {
            this.xueshu = false;
          }
          if (this.tutorApply == 3) {
            this.enrollName3 = this.quaApply.enrollName;
            this.zhuanye = true;
          } else {
            this.zhuanye = false;
          }
          this.showTable = false;
          this.showTable1 = true;
        } else {
          this.$message({
            message: "只有退回状态才可以修改!",
            type: "error"
          });
        }
      }
      this.queryTeacherInfo();
    },
    exportEx() {
      // console.log(this.processId.id)
      if (this.processId == null || this.processId == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
      } else {
        window.location =
          this.$server.glourl +
          "tutorApply/downExcel?businessId=" +
          this.processId.id;
      }
    },
    //点击列表选中
    clickRow(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
      //console.log(row);
    },
    //重置
    resets() {
      this.showTable = false;
      this.showTable1 = true;
      this.topType = true;
      this.tutorApply = [];
      this.enrollName1 = [];
      this.enrollName2 = [];
      this.enrollName3 = [];
      this.checked1 = [];
      this.checked2 = [];
      this.checked3 = [];
      this.quaApply.itemInfo = [];
      this.quaApply.bearInfo = [];
      this.quaApply.guideInfo = [];
      this.quaApply.paperInfo = [];
      this.quaApply.talType = [];
      this.quaApply.comType = "";
      this.condition = {};
    },
    //点击批量导入
    piliang1() {
      this.lwzzDio = false;
      this.kyhjDio = false;
      this.zcxmDio = true;
      this.centerDialogVisible = true;
    },
    piliang2() {
      this.kyhjDio = false;
      this.zcxmDio = false;
      this.lwzzDio = true;
      this.centerDialogVisible = true;
    },
    piliang3() {
      this.lwzzDio = false;
      this.zcxmDio = false;
      this.kyhjDio = true;
      this.centerDialogVisible = true;
    },
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + MM + "-" + d + " ";
    },
    //清除导入信息
    cleanSysInfo() {
      this.quaApply.itemInfo = this.quaApply.itemInfo.filter(
        item => item.from == 3
      );
      this.quaApply.paperInfo = this.quaApply.paperInfo.filter(
        item => item.from == 3
      );
      this.quaApply.bearInfo = this.quaApply.bearInfo.filter(
        item => item.from == 3
      );
    },
    //选择代表性成果（多选）
    handleCheckedCitiesChanges(checked) {
      this.cleanSysInfo();
      this.checked1.forEach(element => {
        this.quaApply.itemInfo.push({
          num: this.quaApply.itemInfo.length + 1,
          name: element.name,
          source: element.source,
          level: element.level,
          expend: element.total_fee,
          startTime: this.formatDate(element.start_dt * 1000),
          endTime: this.formatDate(element.end_dt * 1000),
          editFlag: false,
          tableNum: 1,
          from: element.from
        });
      });
      this.checked2.forEach(element => {
        this.quaApply.paperInfo.push({
          num: this.quaApply.paperInfo.length + 1,
          name: element.title,
          unit: element.journal,
          publishTime: element.year,
          level: element.level,
          editFlag: false,
          tableNum: 2,
          from: element.from
        });
      });
      this.checked3.forEach(element => {
        this.quaApply.bearInfo.push({
          num: this.quaApply.bearInfo.length + 1,
          name: element.name,
          time: element.time,
          unit: element.unit,
          rank:
            element.level +
            " / " +
            element.participants +
            "(" +
            element.rank +
            ")",
          from: element.from,
          editFlag: false,
          tableNum: 3
        });
      });
    }
  }
};
</script>
<style scoped>
.container {
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  margin-top: 10px;
  overflow: hidden;
}

.divShadow {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin: 0 auto;
  color: rgba(102, 102, 102, 1);
  padding-bottom: 3%;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
  position: relative;
}
.bottomBox {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  margin-top: 3%;
  padding-bottom: 1%;
  padding-top: 3%;
  border-top: 1px solid #eeeeee;
}
.reset {
  width: 10%;
  margin-left: 5%;
  margin-right: 5%;
  font-size: 16px;
}
.small {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  background-color: #237ae4;
}
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 10px;
}
/* .table {
  margin-top: 30px;
} */
.close {
  text-align: center;
  width: 20px;
  height: 20px;
  color: #cccccc;
  font-size: 16px;
  position: fixed;
  right: 50px;
  top: 130px;
  cursor: pointer;
  z-index: 1000;
}
.el-button + .el-button {
  margin-left: 0px;
}
</style>
<style>
.el-table thead.is-group th {
  background: #ffffff;
}
.el-upload {
  display: block;
}
.el-upload-list__item {
  float: right !important;
}
.el-upload-list__item:first-child {
  margin-top: 0px;
}
</style>
<style>
.numAdd .el-input {
  width: 55px !important;
}
.numAdd .el-input__inner {
  width: 55px !important;
  border: none !important;
  border-bottom: 1px solid #000000 !important;
  height: 20px !important;
  font-size: 16px !important;
  padding: 0 !important;
  text-align: center;
  border-radius: 0px !important;
}
</style>


