<template>
  <div>
    <div v-show="show" style="margin:10px 0">
      <el-tabs type="border-card" @tab-click="handleClick">
        <el-tab-pane label="待审核">
          <div class="header">
            <div class="right">
              <!-- <el-button type="danger" @click="handleBack">退回</el-button> -->
              <el-button type="primary" @click="handleCheck">审核</el-button>
              <el-button type="primary" @click="handleSee">查看审核信息</el-button>
            </div>

            <!-- 退回弹窗 -->
            <el-dialog title="退回操作" :visible.sync="dialogTableVisible">
              <el-table :data="backList" border highlight-current-row @current-change="handleCurrentChange2">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column property="NAME_" label="类型" align="center"></el-table-column>
              </el-table>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="backSubmit">确 定</el-button>
              </div>
            </el-dialog>

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
            <el-table ref="moviesTable" border :data="dataList" tooltip-effect="dark" style="width: 100%" @row-click="clickRow" @selection-change="handleSelectionChange">

              <el-table-column type="selection" width="55">
              </el-table-column>

              <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="80">
              </el-table-column>

              <el-table-column label="姓名" prop="assignee" align="center">
              </el-table-column>

              <el-table-column label="任务名称" prop="name" align="center">
              </el-table-column>

              <el-table-column label="流程名称" prop="lcname" align="center">
                <template slot-scope="scope">{{ scope.row.lcname }}</template> -->
              </el-table-column>
              <!-- <el-table-column label="项目名称" prop="xmmc" align="center">
              </el-table-column> -->

              <el-table-column label="审核状态" align="center">
                <template slot-scope="scope">
                  待审核
                </template>
              </el-table-column>

              <el-table-column prop="description" label="创建时间" align="center">
                <template slot-scope="scope">{{ scope.row.description }}</template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageList.currPage" :page-sizes="[5,10,15]" :page-size="pageList.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageList.totalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已审核">
          <div class="header">
            <div class="right">
              <!-- <el-button type="primary" @click="handleCheck" style="display:none">审核</el-button> -->
              <el-button type="primary" @click="handleSee1">查看审核信息</el-button>
            </div>

            <el-dialog title="审核信息" :visible.sync="seeVisible1" width="30%" :before-close="handleClose" v-loading="loading2">
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
                      <el-button type="success">{{item.state == '1' ?'通过': item.state == '2' ? '退回':'不通过'}}</el-button>
                    </span>
                    <span v-if="item.state == '0' && item.name != '提交申请'">审核：
                      <el-button type="danger">{{item.state == '1' ?'通过': item.state == '2' ? '退回':'不通过'}}</el-button>
                    </span>
                    <span v-if="item.state == '2' && item.name != '提交申请'">审核：
                      <el-button type="danger">{{item.state == '1' ?'通过': item.state == '2' ? '退回':'不通过'}}</el-button>
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
          <div>
            <el-table ref="moviesTable1" border :data="dataList" tooltip-effect="dark" style="width: 100%" @row-click="clickRow1" @selection-change="handleSelectionChange1" v-loading="loading1">

              <el-table-column type="selection" width="55">
              </el-table-column>

              <el-table-column label="序号" type="index" :index="indexMethod1" align="center" width="80">
              </el-table-column>

              <el-table-column label="学号" prop="proposer" align="center">
              </el-table-column>
              <el-table-column label="姓名" prop="xm" align="center">
              </el-table-column>
              <el-table-column label="任务名称" prop="name" align="center">
              </el-table-column>

              <!-- <el-table-column label="项目名称" prop="xmmc" align="center">
              </el-table-column> -->

              <el-table-column label="审核状态" align="center">
                <template slot-scope="scope">
                  {{ scope.row.state === '0' ? '审核不通过' : scope.row.state === '1' ?'审核通过' : '退回'}}
                </template>
              </el-table-column>

              <el-table-column prop="kssjString" label="创建时间" align="center">
                <template slot-scope="scope">{{scope.row.kssjString}}</template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="pageList1.currPage" :page-sizes="[5,10,15]" :page-size="pageList1.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageList1.totalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 专项项目申请表 -->
    <div class="container" v-show="show4">
      <!-- <el-row>
            <el-col :sapn='24' style="margin-top:5px;line-height:50px">
              <div class="small"></div>
              <span>专项项目申请基本情况</span>
              <div class="close" @click="close1"> X </div>
            </el-col>
          </el-row> -->
      <!-- 项目表单 -->
      <!-- <el-form 
              :model="stuGjhzxxm"
              :rules="rules"
              ref="init"
              label-width="177px"
              class="demo-ruleForm"
              label-position="left">

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="项目名称：" prop="">
                            <el-input v-model="stuGjhzxxm.xh" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="所属学院：" prop="">
                            <el-input v-model="stuGjhzxxm.xh" :disabled="edit"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                  <el-col :span="11">
                        <el-form-item label="项目类型：" prop="">
                            <el-input v-model="stuGjhzxxm.xh"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="发布时间：" prop="">
                            <el-input v-model="stuGjhzxxm.xh"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                  <el-col :span="22">
                        <el-form-item label="要求及内容：" prop="">
                            <el-input v-model="stuGjhzxxm.yqjxy" type="textarea" :autosize="{ minRows: 5, maxRows: 7}" placeholder="请输入内容" style="padding-left:0">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="附件：" prop="">
                            <a :href="item.url" v-for="item in stuGjhzxxm.fj" class="fj">
                              <i class="el-icon-document"></i>
                              {{item.name}}<br/>
                            </a>
                        </el-form-item>
                        
                    </el-col>
                </el-row>

            </el-form> -->

      <el-row>
        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
          <div class="small"></div>
          <span>专项项目申请人员基本情况</span>
          <div class="close" @click="close4"> X </div>
        </el-col>
      </el-row>
      <!-- 申请表单 -->
      <el-form :model="stuGjhzxxm" :rules="rules" ref="stu" label-width="177px" class="demo-ruleForm" label-position="left">

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="姓名：" prop="">
              <el-input v-model="stuGjhzxxm.xm"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="学号：" prop="">
              <el-input v-model.number="stuGjhzxxm.xh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="所在学科：" prop="">
              <el-input v-model="stuGjhzxxm.xk"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="所在学院：" prop="">
              <el-input v-model="stuGjhzxxm.yxqc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="联系电话：" prop="">
              <el-input v-model="stuGjhzxxm.dh"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="人员类别：" prop="">
              <el-select v-model="stuGjhzxxm.rylb" placeholder="请选择" style="width:100%">
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
            <el-form-item label="出境地点：" prop="">
              <el-input v-model="stuGjhzxxm.cjdd"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="外方机构：" prop="">
              <el-input v-model="stuGjhzxxm.wfjg"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="项目名称：" prop="">
              <el-input v-model="stuGjhzxxm.xmmc"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="指导老师：" prop="">
              <el-input v-model="stuGjhzxxm.dsxm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="项目类别：" prop="">
              <el-input v-model="stuGjhzxxm.xmlx === '0' ? '短期访学':'国际学术会议'"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="申请期限（个月）：" prop="sqqx">
              <!-- <el-input v-model="stuGjhzxxm.sqqx"></el-input> -->
              <el-radio-group v-model="stuGjhzxxm.sqqx">
                <el-radio label="0">三个月</el-radio>
                <el-radio label="1">六个月</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="起止时间" prop="sj">
              <div class="date">
                <el-form-item>
                  <el-date-picker v-model="stuGjhzxxm.sj" value-format="yyyy-MM-dd" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <div class="long">
            <el-col :span="22">
              <el-form-item label="导师，学位点，学科，学院资助情况（元）" prop="">
                <!-- <el-input v-model="ruleForm.name"></el-input> -->
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="stuGjhzxxm.zzqk">
                </el-input>
              </el-form-item>
            </el-col>
          </div>
        </el-row>

        <el-row>
          <el-col :span="22" class="textarea">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="项目概况（项目基本情况、目的意义，附上邀请函）" v-model="stuGjhzxxm.xmgk">
            </el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22" class="textarea">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="研究基础（本人已取得的科研成果）" v-model="stuGjhzxxm.yjjc">
            </el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22" class="textarea">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="研究计划及研究目标（短期访学类填写）" v-model="stuGjhzxxm.yjjh">
            </el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22" class="textarea">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="导师概况（主要科研成果、往届学生派出情况及学生获奖情况）" v-model="stuGjhzxxm.dsgk">
            </el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22" class="textarea">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="国外导师或联系人概况（短期访学类填写）" v-model="stuGjhzxxm.gwds">
            </el-input>
          </el-col>
        </el-row>

        <!-- 添加附件 -->
        <!-- <div class="append-btn">
                  <el-upload
                    class="upload-demo"
                    action="platform-framework/xmfb/upload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :on-success="handleSuccess"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-col :span="24">
                      <el-button size="small" @click="print">
                        <div class="append-img">
                          <img src="../../assets/image/attachment.png" alt="" style="width:100%;height:100%;">
                        </div>
                        <p class="append-text">添加附件</p>
                      </el-button>
                    </el-col>
                  </el-upload>
                </div> -->

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="附件：" prop="">
              <a :href="item.url" v-for="item in stuGjhzxxm.fj" class="fj" :key="item.id">
                <i class="el-icon-document"></i>
                {{item.name}}<br />
              </a>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="审核：" prop="">
              <el-radio-group v-model="audit.check">
                <el-radio-button label="1">通过</el-radio-button>
                <el-radio-button label="0">不通过</el-radio-button>
                <el-radio-button label="2">退回</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30" v-if="audit.check == '2'">
          <el-col :span="22">
            <el-form-item label="选择节点：" prop="">
              <el-select v-model="optionValue" placeholder="请选择" clearable>
                <el-option v-for="item in backList" :key="item.TASK_DEF_KEY_" :label="item.NAME_" :value="item.TASK_DEF_KEY_">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="审核意见：" prop="">
              <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容" v-model="audit.comment">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 提交重置 -->
        <div class="submit-box">
          <!-- <el-button type="primary" @click="handleFail" class="submit-btn">不通过</el-button> -->
          <el-button :loading="this.loading" type="primary" @click="handleSubmit" class="submit-btn">{{ submit }}</el-button>
        </div>

      </el-form>
    </div>
    <!-- 校级资助项目 -->
    <div v-show="show1" class="container">
      <el-row>
        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
          <div class="small"></div>
          <span>外派人员基本情况（校级资助项目）</span>
          <div class="close" @click="close1"> X </div>
        </el-col>
      </el-row>

      <el-form :model="xjzzsave" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="姓名：" prop="">
              <el-input v-model="xjzzsave.xm"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="性别：" prop="">
              <el-input v-model="xjzzsave.xbm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="籍贯：" prop="">
              <el-input v-model="xjzzsave.jg"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="拼音：" prop="">
              <el-input v-model="xjzzsave.xmpy"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="出生年月：" prop="">
              <el-input v-model="xjzzsave.csrq"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="出生地：" prop="">
              <el-input v-model="xjzzsave.ssdqmc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="学院：" prop="">
              <el-input v-model="xjzzsave.yxqc"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="指导老师：" prop="">
              <el-input v-model="xjzzsave.dsxm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="学科：" prop="">
              <el-input v-model="xjzzsave.xk"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="学号：" prop="">
              <el-input v-model="xjzzsave.xh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="身份证号：" prop="r">
              <el-input v-model="xjzzsave.sfzjh"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="手机：" prop="">
              <el-input v-model="xjzzsave.dh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="E-mail：" prop="">
              <el-input v-model="xjzzsave.yx"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="婚姻状况：" prop="">
              <el-input v-model="xjzzsave.hyzkm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="配偶姓名：" prop="">
              <el-input v-model="xjzzsave.poxm"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="因私护照（通行证）：" prop="">
              <el-input v-model="xjzzsave.yshz"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="项目名称：" prop="">
              <el-input v-model="xjzzsave.xmmc"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="境外地点：" prop="">
              <el-input v-model="xjzzsave.gwtxdz"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="外方单位：" prop="">
              <el-input v-model="xjzzsave.gwdw"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="邀请人：" prop="">
              <el-input v-model="xjzzsave.yqr"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="起止时间：（必填项）" prop="sj">
              <div class="date">
                <el-form-item>
                  <el-date-picker v-model="xjzzsave.sj" value-format="yyyy-MM-dd" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="在外天数：" prop="">
              <el-input v-model="xjzzsave.zwts"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="派出任务：" prop="">
              <el-radio-group v-model="xjzzsave.pcrw">
                <!-- <el-radio label="0">联合培养</el-radio> -->
                <el-radio label="0">短期访学</el-radio>
                <el-radio label="1">学术会议</el-radio>
                <el-radio label="2">交换生</el-radio>
                <!-- <el-radio label="4">自费留学</el-radio> -->
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-row :gutter="30">
                <el-col :span="22">
                <el-form-item label="派出渠道：" prop="">
                    <el-radio-group v-model="xjzzsave.gplb">
                    <el-radio label="0">国家公派</el-radio>
                    <el-radio label="1">学院组团</el-radio>
                    <el-radio label="2">会议邀请</el-radio>
                    <el-radio label="3">学院选派</el-radio>
                    <el-radio label="4">导师联系</el-radio>
                    </el-radio-group>
                </el-form-item>
                </el-col>
            </el-row> -->

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="经费来源：" prop="">
              <el-checkbox-group v-model="jfly1">
                <!-- <el-checkbox label="0">国家留基委资助</el-checkbox> -->
                <el-checkbox label="0">学校国际化培养经费</el-checkbox>
                <el-checkbox label="1">学院经费</el-checkbox>
                <el-checkbox label="2">学科经费</el-checkbox>
                <el-checkbox label="3">导师经费</el-checkbox>
                <el-checkbox label="4">其它（自费）</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label="此次出国主要任务和理由：" prop="">
              <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容" v-model="xjzzsave.cgjbz">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 添加附件 -->
        <!-- <div class="append-btn">
                <el-upload class="upload-demo" action="platform-framework/xmfb/upload"
                    :on-preview="handlePreview" :on-remove="handleRemove1" :before-remove="beforeRemove"
                    :on-success="handleSuccess1" multiple :limit="3" :on-exceed="handleExceed"
                    :file-list="fileList1">
                    <el-col :span="24">
                        <el-button size="small" @click="print">
                            <div class="append-img">
                                <img src="../../assets/image/attachment.png" alt="" style="width:100%;height:100%;">
                            </div>
                            <p class="append-text">添加附件</p>
                        </el-button>
                    </el-col>
                </el-upload>
            </div> -->

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="附件：" prop="">
              <a :href="item.url" v-for="item in xjzzsave.fj" class="fj" :key="item.id">
                <i class="el-icon-document"></i>
                {{item.name}}<br />
              </a>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="审核：" prop="">
              <el-radio-group v-model="audit.check">
                <el-radio-button label="1">通过</el-radio-button>
                <el-radio-button label="0">不通过</el-radio-button>
                <el-radio-button label="2">退回</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30" v-if="audit.check == '2'">
          <el-col :span="22">
            <el-form-item label="选择节点：" prop="">
              <el-select v-model="optionValue" placeholder="请选择" clearable>
                <el-option v-for="item in backList" :key="item.TASK_DEF_KEY_" :label="item.NAME_" :value="item.TASK_DEF_KEY_">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="审核意见：" prop="">
              <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容" v-model="audit.comment">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 提交重置 -->
        <div class="submit-box">
          <!-- <el-button type="danger" @click="handleCancel1" class="submit-btn">取消</el-button> -->
          <el-button :loading="this.loading" type="primary" @click="handleSubmit" class="submit-btn" v-if="has('stucgbb:stuOrderApply')">{{ submit }}</el-button>
        </div>
      </el-form>
    </div>
    <!-- 国家公派项目 -->
    <div v-show="show2" class="container">
      <el-row>
        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
          <div class="small"></div>
          <span>外派人员基本情况（国家公派项目）</span>
          <div class="close" @click="close2"> X </div>
        </el-col>
      </el-row>

      <el-form :model="gjgpsave" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="姓名：" prop="">
              <el-input v-model="gjgpsave.xm"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="性别：" prop="">
              <el-input v-model="gjgpsave.xbm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="籍贯：" prop="">
              <el-input v-model="gjgpsave.jg"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="拼音：" prop="">
              <el-input v-model="gjgpsave.xmpy"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="出生年月：" prop="">
              <el-input v-model="gjgpsave.csrq"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="出生地：" prop="">
              <el-input v-model="gjgpsave.ssdqmc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="学院：" prop="">
              <el-input v-model="gjgpsave.yxqc"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="指导老师：" prop="">
              <el-input v-model="gjgpsave.dsxm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="学科：" prop="">
              <el-input v-model="gjgpsave.xk"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="学号：" prop="">
              <el-input v-model="gjgpsave.xh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="身份证号：" prop="r">
              <el-input v-model="gjgpsave.sfzjh"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="手机：" prop="">
              <el-input v-model="gjgpsave.dh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="E-mail：" prop="">
              <el-input v-model="gjgpsave.yx"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="婚姻状况：" prop="">
              <el-input v-model="gjgpsave.hyzkm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="配偶姓名：" prop="">
              <el-input v-model="gjgpsave.poxm"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="因私护照（通行证）：" prop="">
              <el-input v-model="gjgpsave.yshz"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="项目名称：" prop="">
              <el-input v-model="gjgpsave.xmmc"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="境外地点：" prop="">
              <el-input v-model="gjgpsave.gwtxdz"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="外方单位：" prop="">
              <el-input v-model="gjgpsave.gwdw"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="邀请人：" prop="">
              <el-input v-model="gjgpsave.yqr"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="起止时间：（必填项）" prop="sj">
              <div class="date">
                <el-form-item>
                  <el-date-picker v-model="gjgpsave.sj" value-format="yyyy-MM-dd" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="在外天数：" prop="">
              <el-input v-model="gjgpsave.zwts"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="派出任务：" prop="">
              <el-radio-group v-model="gjgpsave.pcrw">
                <el-radio label="3">攻读博士学位</el-radio>
                <el-radio label="4">联合培养</el-radio>
                <!-- <el-radio label="1">短期访学</el-radio>
                        <el-radio label="2">学术会议</el-radio>
                        <el-radio label="3">交换生</el-radio>
                        <el-radio label="4">自费留学</el-radio> -->
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-row :gutter="30">
                <el-col :span="22">
                <el-form-item label="派出渠道：" prop="">
                    <el-radio-group v-model="gjgpsave.gplb">
                    <el-radio label="0">国家公派</el-radio>
                    <el-radio label="1">学院组团</el-radio>
                    <el-radio label="2">会议邀请</el-radio>
                    <el-radio label="3">学院选派</el-radio>
                    <el-radio label="4">导师联系</el-radio>
                    </el-radio-group>
                </el-form-item>
                </el-col>
            </el-row> -->

        <!-- <el-row :gutter="30">
                <el-col :span="22">
                <el-form-item label="经费来源：" prop="">
                    <el-checkbox-group v-model="jfly2">
                    <el-checkbox label="0">国家留基委资助</el-checkbox>
                    <el-checkbox label="1">学校国际化培养经费</el-checkbox>
                    <el-checkbox label="2">学院经费</el-checkbox>
                    <el-checkbox label="3">学科经费</el-checkbox>
                    <el-checkbox label="4">导师经费</el-checkbox>
                    <el-checkbox label="5">其它（自费）</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                </el-col>
            </el-row> -->

        <el-row>
          <el-col :span="22">
            <el-form-item label="此次出国主要任务和理由：" prop="">
              <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容" v-model="gjgpsave.cgjbz">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 添加附件 -->
        <!-- <div class="append-btn">
                <el-upload class="upload-demo" action="platform-framework/xmfb/upload"
                    :on-preview="handlePreview" :on-remove="handleRemove2" :before-remove="beforeRemove"
                    :on-success="handleSuccess2" multiple :limit="3" :on-exceed="handleExceed"
                    :file-list="fileList2">
                    <el-col :span="24">
                        <el-button size="small" @click="print">
                            <div class="append-img">
                                <img src="../../assets/image/attachment.png" alt="" style="width:100%;height:100%;">
                            </div>
                            <p class="append-text">添加附件</p>
                        </el-button>
                    </el-col>
                </el-upload>
            </div> -->

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="附件：" prop="">
              <a :href="item.url" v-for="item in gjgpsave.fj" class="fj" :key="item.id">
                <i class="el-icon-document"></i>
                {{item.name}}<br />
              </a>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="审核：" prop="">
              <el-radio-group v-model="audit.check">
                <el-radio-button label="1">通过</el-radio-button>
                <el-radio-button label="0">不通过</el-radio-button>
                <el-radio-button label="2">退回</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30" v-if="audit.check == '2'">
          <el-col :span="22">
            <el-form-item label="选择节点：" prop="">
              <el-select v-model="optionValue" placeholder="请选择" clearable>
                <el-option v-for="item in backList" :key="item.TASK_DEF_KEY_" :label="item.NAME_" :value="item.TASK_DEF_KEY_">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="审核意见：" prop="">
              <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容" v-model="audit.comment">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 提交重置 -->
        <div class="submit-box">
          <!-- <el-button type="danger" @click="handleCancel2" class="submit-btn">取消</el-button> -->
          <el-button :loading="this.loading" type="primary" @click="handleSubmit" class="submit-btn" v-if="has('stucgbb:stuOrderApply')">{{ submit }}</el-button>
        </div>
      </el-form>
    </div>
    <!-- 其他项目 -->
    <div v-show="show3" class="container">
      <el-row>
        <el-col :sapn='22' style="margin-top:5px;line-height:50px">
          <div class="small"></div>
          <span>外派人员基本情况（其它项目）</span>
          <div class="close" @click="close3"> X </div>
        </el-col>
      </el-row>

      <el-form :model="qtsave" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="姓名：" prop="">
              <el-input v-model="qtsave.xm"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="性别：" prop="">
              <el-input v-model="qtsave.xbm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="籍贯：" prop="">
              <el-input v-model="qtsave.jg"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="拼音：" prop="">
              <el-input v-model="qtsave.xmpy"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="出生年月：" prop="">
              <el-input v-model="qtsave.csrq"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="出生地：" prop="">
              <el-input v-model="qtsave.ssdqmc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="学院：" prop="">
              <el-input v-model="qtsave.yxqc"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="指导老师：" prop="">
              <el-input v-model="qtsave.dsxm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="学科：" prop="">
              <el-input v-model="qtsave.xk"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="学号：" prop="">
              <el-input v-model="qtsave.xh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="身份证号：" prop="r">
              <el-input v-model="qtsave.sfzjh"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="手机：" prop="">
              <el-input v-model="qtsave.dh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="E-mail：" prop="">
              <el-input v-model="qtsave.yx"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="婚姻状况：" prop="">
              <el-input v-model="qtsave.hyzkm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="配偶姓名：" prop="">
              <el-input v-model="qtsave.poxm"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="因私护照（通行证）：" prop="">
              <el-input v-model="qtsave.yshz"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="项目名称：" prop="">
              <el-input v-model="qtsave.xmmc"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="境外地点：" prop="">
              <el-input v-model="qtsave.gwtxdz"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="外方单位：" prop="">
              <el-input v-model="qtsave.gwdw"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="邀请人：" prop="">
              <el-input v-model="qtsave.yqr"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-row :gutter="30">
                    <el-form-item label="起止时间" required>
                    <el-col :span="11">
                        <div class="date">
                        <el-form-item prop="">
                            <el-date-picker type="date" placeholder="选择日期" v-model="save.sj"></el-date-picker>
                        </el-form-item>
                        </div>
                    </el-col>
                    </el-form-item>
                </el-row> -->

        <el-row :gutter="30">
          <el-col :span="15">
            <el-form-item label="起止时间：" prop="sj">
              <div class="date">
                <el-form-item>
                  <el-date-picker v-model="qtsave.sj" value-format="yyyy-MM-dd" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="在外天数：" prop="">
              <el-input v-model="qtsave.zwts"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="派出任务：" prop="">
              <el-radio-group v-model="qtsave.pcrw">
                <!-- <el-radio label="0">联合培养</el-radio> -->
                <el-radio label="0">短期访学</el-radio>
                <el-radio label="1">学术会议</el-radio>
                <!-- <el-radio label="3">交换生</el-radio> -->
                <el-radio label="5">自费留学</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="派出渠道：" prop="">
              <el-radio-group v-model="qtsave.gplb">
                <!-- <el-radio label="0">国家公派</el-radio> -->
                <el-radio label="0">学院组团</el-radio>
                <el-radio label="1">导师联系</el-radio>
                <el-radio label="2">会议邀请</el-radio>
                <!-- <el-radio label="3">学院选派</el-radio>    -->
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="经费来源：" prop="">
              <el-checkbox-group v-model="jfly3">
                <!-- <el-checkbox label="0">国家留基委资助</el-checkbox> -->
                <!-- <el-checkbox label="1">学校国际化培养经费</el-checkbox> -->
                <el-checkbox label="1">学院经费</el-checkbox>
                <el-checkbox label="2">学科经费</el-checkbox>
                <el-checkbox label="3">导师经费</el-checkbox>
                <el-checkbox label="4">其它（自费）</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="22">
            <el-form-item label="此次出国主要任务和理由：" prop="">
              <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容" v-model="qtsave.cgjbz">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 添加附件 -->
        <!-- <div class="append-btn">
                <el-upload class="upload-demo" action="platform-framework/xmfb/upload"
                    :on-preview="handlePreview" :on-remove="handleRemove3" :before-remove="beforeRemove"
                    :on-success="handleSuccess3" multiple :limit="3" :on-exceed="handleExceed"
                    :file-list="fileList3">
                    <el-col :span="24">
                        <el-button size="small" @click="print">
                            <div class="append-img">
                                <img src="../../assets/image/attachment.png" alt="" style="width:100%;height:100%;">
                            </div>
                            <p class="append-text">添加附件</p>
                        </el-button>
                    </el-col>
                </el-upload>
            </div> -->

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="附件：" prop="">
              <a :href="item.url" v-for="item in qtsave.fj" class="fj" :key="item.id">
                <i class="el-icon-document"></i>
                {{item.name}}<br />
              </a>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="审核：" prop="">
              <el-radio-group v-model="audit.check">
                <el-radio-button label="1">通过</el-radio-button>
                <el-radio-button label="0">不通过</el-radio-button>
                <el-radio-button label="2">退回</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30" v-if="audit.check == '2'">
          <el-col :span="22">
            <el-form-item label="选择节点：" prop="">
              <el-select v-model="optionValue" placeholder="请选择" clearable>
                <el-option v-for="item in backList" :key="item.TASK_DEF_KEY_" :label="item.NAME_" :value="item.TASK_DEF_KEY_">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="审核意见：" prop="">
              <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容" v-model="audit.comment">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="submit-box">
          <!-- <el-button type="danger" @click="handleCancel3" class="submit-btn">取消</el-button> -->
          <el-button :loading="this.loading" type="primary" @click="handleSubmit" class="submit-btn" v-if="has('stucgbb:stuOrderApply')">{{ submit }}</el-button>
        </div>
      </el-form>
    </div>
    <!-- 成果录入 -->
    <div class="container" v-show="show5">
      <el-row>
        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
          <div class="small"></div>
          <span>个人及项目基本情况</span>
          <div class="close" @click="close5"> X </div>
        </el-col>
      </el-row>
      <el-form :model="map" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">
        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="map.xm"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="性别：" prop="gender">
              <el-input v-model="map.xbm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="出生年月：" prop="birth">
              <el-input v-model="map.csrq"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="政治面貌：" prop="political">
              <el-input v-model="map.zzmm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="专业：" prop="major">
              <el-input v-model="map.zy"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="学号：" prop="studentId">
              <el-input v-model="map.xh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <!-- <el-col :span="11">
            <el-form-item label="境外时间：" prop="time">
              <el-input v-model="map.jwts"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="11">
            <el-form-item label="项目名称：" prop="projectName">
              <el-input v-model="map.xmmc"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="指导老师：" prop="advisor">
              <el-input v-model="map.dsxm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="境外时间：（必填项）" prop="sj">
              <div class="date">
                <el-form-item>
                  <el-date-picker v-model="map.sj" value-format="yyyy-MM-dd" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="境外天数：" prop="outsideDays">
              <el-input v-model="map.jwts" readonly="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="境外地点：" prop="location">
              <el-input v-model="map.gwtxdz"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
            <el-form-item label="E-mail：" prop="mail">
              <el-input v-model="map.yx"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="联系电话：" prop="phone">
              <el-input v-model="map.dh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="项目名称：" prop="projectName">
              <el-input v-model="map.xmmc"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="项目执行情况：" prop="execution">
              <el-input v-model="map.xmzxqk"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="项目取得的成效（可附页说明，并提供相关证明）：" prop="effect">
              <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容" v-model="map.xmqdcx">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="附件：" prop="">
              <a :href="item.url" v-for="item in map.fj" class="fj" :key="item">
                <i class="el-icon-document"></i>
                {{item.name}}<br />
              </a>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="审核：" prop="">
              <el-radio-group v-model="audit.check">
                <el-radio-button label="1">通过</el-radio-button>
                <el-radio-button label="0">不通过</el-radio-button>
                <el-radio-button label="2" fill="#F56C6C">退回</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30" v-if="audit.check == '2'">
          <el-col :span="22">
            <el-form-item label="选择节点：" prop="">
              <el-select v-model="optionValue" placeholder="请选择" clearable>
                <el-option v-for="item in backList" :key="item.TASK_DEF_KEY_" :label="item.NAME_" :value="item.TASK_DEF_KEY_">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="22">
            <el-form-item label="审核意见：" prop="">
              <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容" v-model="audit.comment">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <!-- 提交重置 -->
          <div class="submit-box">
            <!-- <el-button type="primary" @click="handleFail" class="submit-btn">不通过</el-button> -->
            <el-button :loading="this.loading" type="primary" @click="handleSubmit" class="submit-btn">{{ submit }}</el-button>
          </div>
        </el-row>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      tableTime: "",
      outTime: "", //公共变量
      timestamp1: "", //提交当前时间
      timestamp: "", //当前时间
      optionValue: "", //选择退回节点
      submit: "提交",
      loading: true,
      loading1: true,
      loading2: true,
      dataList: [],
      backList: [], //退回列表
      type: 1, //出国报备类型
      id: "", //行号
      show: true, //申请项目展示列表开关
      show4: false, // 专项项目申请表
      show1: false, // 校级资助项目申请表
      show2: false, // 国家公派项目申请表
      show3: false, // 其他项目申请表
      show5: false, // 成果录入申请表
      jfly1: [], //校级资助项目经费来源
      jfly3: [], //其它项目经费来源
      processInstanceId: "",
      executionId: "", //流程id
      backId: "", //退回id
      zt: "",
      xmType: "",
      processDefinitionId: "",
      instId: "", //流程id
      taskDefKey: "",
      activityId: "", //回退列表选择的回退节点
      processVariables: {},
      businesskey: "",
      opinion: "", //审核意见
      seeVisible: false, //审核流程图显示开关
      seeVisible1: false, //审核流程图显示开关
      dialogTableVisible: false, //退回操作表格显示开关
      his: [], //弹窗：审核信息
      stuGjhzxxm: {}, //专项项目申请
      xjzzsave: {}, //校级资助
      gjgpsave: {}, //国家公派
      qtsave: {}, //其它项目
      map: {},
      // rwid: '',
      //提交审核意见
      audit: {
        check: "1",
        comment: ""
      },
      stuGjhzxxm: {
        fj: []
      },
      xjzzsave: {
        fj: []
      },
      map: {
        fj: []
      },
      fj: [],
      // pass: {
      //   taskId: '',
      //   check: '',
      //   comment: '',
      //   taskKey: ''
      // },
      taskId: "",
      taskKey: "",
      //列表前端分页
      pageList: {
        totalCount: "",
        pageSize: "",
        totalPage: "",
        currPage: ""
      },
      pageList1: {
        totalCount: "",
        pageSize: "",
        totalPage: "",
        currPage: ""
      },
      //列表分页辅助类(传参)
      pageHelp: {
        page: 1,
        limit: 5,
        sidx: "id",
        order: "asc"
      },
      pageHelp1: {
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
    // 列表页面：
    // 时间戳转换成时间：使用element table组件中的formatter属性，传入一个函数
    timestampToTime(row, column) {
      var date = new Date(row.createTime); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
    timestampToTime1(row, column) {
      var date = new Date(row.startTime);
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
    indexMethod1(index) {
      return (
        (this.pageList1.currPage - 1) * this.pageList1.pageSize + index + 1
      );
    },
    handleSizeChange(val) {
      this.pageList.pageSize = val;
      this.pageHelp.limit = this.pageList.pageSize;
      this.pageHelp.page = this.pageList.currPage;
      this.loadTable();
    },
    handleSizeChange1(val) {
      this.pageList1.pageSize = val;
      this.pageHelp1.limit = this.pageList1.pageSize;
      this.pageHelp1.page = this.pageList1.currPage;
      this.loadTable2();
    },
    handleCurrentChange(currentPage) {
      this.pageList.currPage = currentPage;
      this.pageHelp.page = this.pageList.currPage;
      this.loadTable();
    },
    handleCurrentChange1(currentPage) {
      this.pageList1.currPage = currentPage;
      this.pageHelp1.page = this.pageList1.currPage;
      this.loadTable2();
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
    // 列表选择改变事件
    handleSelectionChange(selection) {
      // console.log(selection);
      if (selection.length == 0) {
        this.id = "";
        // this.activityId = ''
        this.executionId = "";
        this.zt = "";
        this.xmType = "";
        // this.rwid = ''
        this.processDefinitionId = "";
        this.businesskey = "";
        this.instId = "";
        this.taskDefKey = "";
        this.processInstanceId = "";
      } else {
        this.id = selection[0].id;
        this.lx = selection[0].lx;
        this.processInstanceId = selection[0].processInstanceId;
        // this.activityId = selection[0].activityId
        this.executionId = selection[0].executionId;
        this.zt = selection[0].zt;
        // this.rwid = selection[0].rwid
        this.processDefinitionId = selection[0].processDefinitionId;
        // console.log(selection);
        if (this.processDefinitionId.indexOf("gjhZxxmCheck")) {
          this.xmType = "0";
        } else {
          this.xmType = "1";
        }

        this.businesskey = selection[0].processVariables.businesskey;
        this.instId = selection[0].processInstanceId;
        this.taskDefKey = selection[0].taskDefinitionKey;
        // console.log(this.id)
        //console.log(selection);
      }
    },
    handleSelectionChange1(selection) {
      // console.log(selection)
      if (selection.length == 0) {
        this.id = "";
        this.processInstanceId = "";
        this.zt = "";
        this.xmType = "";
        // this.rwid = ''
        this.processDefinitionId = "";
        // this.businesskey = ''
      } else {
        this.id = selection[0].id;
        this.processInstanceId = selection[0].processInstanceId;
        this.zt = selection[0].zt;
        this.processDefinitionId = selection[0].processDefinitionId;

        // this.businesskey = selection[0].processVariables.businesskey
        // console.log(this.id)
      }
    },
    // 退回单选操作
    handleCurrentChange2(val) {
      // this.currentRow = val
      this.backId = val.ID_;
      this.activityId = val.TASK_DEF_KEY_;
      // console.log(val)
    },
    // 点击选项卡改变事件
    handleClick(tab, event) {
      if (tab.label == "待审核") {
        this.loading = true;
        this.loadTable();
        // console.log(111)
      } else {
        this.loading1 = true;
        this.loadTable2();
        // console.log(222)
      }
    },
    // handleClick2 () {
    //   this.loadTable2()
    //   // console.log(tab, event)
    // },
    // 获取列表数据
    loadTable() {
      this.$http
        .get(this.$server.glourl + "stuOrderApply/taskList3", {
          params: this.pageHelp
        })
        .then(response => {
          this.loading = false;
          const data = response.data;
          this.dataList = data;
          console.log(data);
          for (var i = 0; i < this.dataList.length; i++) {
            //console.log(data[i].processDefinitionId);
            if (
              this.dataList[i].processDefinitionId.indexOf("gjhZxxmCheck") != -1
            ) {
              this.dataList[i].lcname = "校级专项项目审核";
              // data[i].processDefinitionId = "校级专项项目审核"
            } else if (
              this.dataList[i].processDefinitionId.indexOf(
                "gjhAdminStuOrderCheck"
              ) != -1
            ) {
              this.dataList[i].lcname = "出国报备审核";
              // data[i].processDefinitionId = "出国报备审核"
            } else if (
              this.dataList[i].processDefinitionId.indexOf(
                "gjhAdminResultCheck"
              ) != -1
            ) {
              this.dataList[i].lcname = "成果录入审核";
              // data[i].processDefinitionId = "成果录入审核"
            } else {
              this.dataList[i].lcname = "国家级专项项目审核";
              // data[i].processDefinitionId = "国家级专项项目审核"
            }
          }
          //console.log(this.dataList)
          this.processVariables = data.processVariables;
          this.loadTable3();
          // this.pageList = data.page
          // console.log(this.dataList)
        });
    },
    // 分页相关
    loadTable3() {
      this.$http
        .get(this.$server.glourl + "stuOrderApply/taskListTotalCount4", {
          params: this.pageHelp
        })
        .then(response => {
          this.loading = false;
          const data = response.data;
          this.pageList = data.pageUtil;
        });
    },
    loadTable2() {
      this.$http
        .get(this.$server.glourl + "stuOrderApply/getHistoryAudit2", {
          params: this.pageHelp1
        })
        .then(response => {
          console.log(response.data);
          this.loading1 = false;
          this.dataList = response.data.page.list;
          this.pageList1 = response.data.page;
        });
    },
    //点击审核：0失败，1成功，2审核中，3待审核
    handleCheck() {
      this.timestamp = new Date().getTime(); //当前时间
      // console.log(this.timestamp);
      this.audit.comment = ""; //点击审核默认审核意见为空
      this.audit.check = "1"; //点击审核默认为通过

      if (this.businesskey == null || this.businesskey == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
        return;
      } else {
        //     debugger;
        if (this.processDefinitionId.indexOf("gjhZxxmCheck") != -1) {
          //校级
          this.$http
            .get(
              this.$server.glourl +
                "stugjhzxxm/queryObjectById?id=" +
                this.businesskey
            )
            .then(response => {
              // console.log(response.data.obj.xmlx);
              // console.log(response.data);
              if (response.data.obj.xmlx == "0") {
                //短期访学
                this.$http
                  .get(
                    this.$server.glourl +
                      "stugjhzxxm/selectValidTime?id=" +
                      this.businesskey +
                      "&&type=" +
                      0
                  )
                  .then(response => {
                    //console.log(response.data);
                    this.tableTime = response.data.map.jssj;
                    if (this.tableTime < this.timestamp) {
                      this.$message({
                        message: "已过期，无效操作!",
                        type: "error"
                      });
                      return;
                    } else {
                      this.changeTime();
                    }
                  });
              } else {
                this.changeTime();
              }
            });
        } else {
          //根据过期时间判断是否
          this.changeTime();
        }
      }
    },
    // 审核通过
    // 0不通过1通过
    handleSubmit() {
      // console.log(this.optionValue)
      this.timestamp1 = new Date().getTime();

      if (this.processDefinitionId.indexOf("gjhZxxmCheck") != -1) {
        //校级
        this.$http
          .get(
            this.$server.glourl +
              "stugjhzxxm/queryObjectById?id=" +
              this.businesskey
          )
          .then(response => {
            // console.log(response.data.obj.xmlx);
            // console.log(response.data);
            if (response.data.obj.xmlx == "0") {
              //短期访学
              this.$http
                .get(
                  this.$server.glourl +
                    "stugjhzxxm/selectValidTime?id=" +
                    this.businesskey +
                    "&&type=" +
                    0
                )
                .then(response => {
                  // console.log(response.data);
                  this.tableTime = response.data.map.jssj;
                  if (this.tableTime < this.timestamp1) {
                    this.$message({
                      message: "已过期，无效操作!",
                      type: "error"
                    });
                  } else {
                    // console.log(123);
                    this.changes();
                  }
                });
            } else {
              this.changes();
            }
          });
      } else {
        this.changes();
      }
    },

    changes() {
      // 根据过期时间判断是否可以提交申请
      //提交退回
      if (this.audit.check == "2") {
        if (this.optionValue == null || this.optionValue == "") {
          this.$message({
            message: "请选择一个节点！",
            type: "error"
          });
          return;
        } else {
          if (this.audit.comment != "") {
            this.loading = true;
            this.submit = "加载中";
            this.$http
              .get(this.$server.glourl + "stucgbb/back", {
                params: {
                  taskId: this.id,
                  activityId: this.optionValue,
                  businesskey: this.businesskey,
                  processDefinitionId: this.processDefinitionId,
                  check: this.audit.check,
                  comment: this.audit.comment,
                  processInstanceId: this.processInstanceId,
                  taskKey: this.taskDefKey,
                  executionId: this.executionId
                }
              })
              .then(response => {
                if (response.data.code == 0) {
                  this.$message({
                    message: "退回操作成功！",
                    type: "success"
                  });
                  this.loading = false;
                  this.reload();
                  this.show = true;
                  this.show1 = false;
                  this.show2 = false;
                  this.show3 = false;
                  this.show4 = false;
                  this.show5 = false;
                  // this.loadTable()
                }
              })
              .catch(function(err) {
                console.log(err);
              });
          } else {
            this.$message({
              message: "请填写审核意见！",
              type: "error"
            });
          }
        }
        //提交审核通过不通过
      } else if (this.audit.check != "2") {
        if (this.audit.comment != "") {
          this.loading = true;
          this.submit = "加载中";
          this.$http
            .get(this.$server.glourl + "stucgbb/stuSaveOrder", {
              params: {
                check: this.audit.check,
                comment: this.audit.comment,
                taskId: this.id,
                taskKey: this.taskDefKey
              }
            })
            .then(response => {
              if (response.data.code == 0) {
                this.$message({
                  message: "审核信息提交成功！",
                  type: "success"
                });
                this.loading = false;
                this.submit = "提交";
                this.reload();
                this.show = true;
                this.show1 = false;
                this.show2 = false;
                this.show3 = false;
                this.show4 = false;
                this.show5 = false;
                // this.loadTable()
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        } else {
          this.$message({
            message: "请填写审核意见！",
            type: "error"
          });
        }
      }
    },

    changeTime() {
      this.$http
        .get(this.$server.glourl + "stuOrderApply/selectTaskInfo", {
          params: {
            instId: this.instId,
            taskDefKey: this.taskDefKey
          }
        })
        .then(response => {
          // console.log(response.data);
          this.backList = response.data.list;
          // console.log(this.backList)
        });
      // 专项项目申请
      // console.log(this.processDefinitionId);
      if (this.processDefinitionId.indexOf("gjhZxxmCheck") != -1) {
        this.$http
          .get(
            this.$server.glourl +
              "stugjhzxxm/selectDetail/?id=" +
              this.businesskey
          )
          .then(response => {
            //  console.log(response.data);
            // if (response.data.map.detail.xmlx == "0") {
            // }
            this.stuGjhzxxm = response.data.map.detail;
            this.stuGjhzxxm.fj = JSON.parse(response.data.map.detail.fj);
            this.show = false;
            this.show4 = true;
          });
      } else if (
        this.processDefinitionId.indexOf("gjhAdminStuOrderCheck") != -1
      ) {
        //   if()
        // 学校出国报备(校级资助项目/国家公派项目/其他项目)
        this.$http
          .post(
            this.$server.glourl +
              "stucgbb/selectStuAndCheckById/?id=" +
              this.businesskey
          )
          .then(response => {
            // console.log(response.data.obj.lx);
            if (response.data.obj.lx == "0") {
              this.xjzzsave = response.data.obj;
              if (response.data.obj == "1") {
                this.xjzzsave.xbm = "男";
              } else {
                this.xjzzsave.xbm = "女";
              }
              this.xjzzsave.fj = JSON.parse(response.data.obj.fj);
              this.jfly1 = response.data.obj.jfly.split(""); //分割每个字符
              this.show = false;
              this.show1 = true;
            } else if (response.data.obj.lx == "1") {
              this.gjgpsave = response.data.obj;
              if (response.data.obj == "1") {
                this.gjgpsave.xbm = "男";
              } else {
                this.gjgpsave.xbm = "女";
              }
              this.gjgpsave.fj = JSON.parse(response.data.obj.fj);
              // this.gjgpsave.jfly = this.obj.jfly.split('') //分割每个字符
              this.show = false;
              this.show2 = true;
            } else {
              this.qtsave = response.data.obj;
              if (response.data.obj == "1") {
                this.qtsave.xbm = "男";
              } else {
                this.qtsave.xbm = "女";
              }
              this.qtsave.fj = JSON.parse(response.data.obj.fj);
              this.jfly3 = response.data.obj.jfly.split(""); //分割每个字符
              this.show = false;
              this.show3 = true;
            }
          });
      } else if (
        this.processDefinitionId.indexOf("gjhAdminResultCheck") != -1
      ) {
        // 成果录入
        this.$http
          .post(
            this.$server.glourl +
              "stugjhpycg/queryStuAndResult/?id=" +
              this.businesskey
          )
          .then(response => {
            this.map = response.data.map;
            if (response.data.map == "1") {
              this.map.xbm = "男";
            } else {
              this.map.xbm = "女";
            }
            this.map.fj = JSON.parse(response.data.map.fj);
            // console.log(response.data.map.fj)
          });
        this.show = false;
        this.show5 = true;
      } else {
        return;
        // console.log(this.dataList.xmType)
      }
    },
    //退回操作
    // handleBack () {
    //   if (this.instId == null || this.instId == "") {
    //     this.$message({
    //       message: "请选择一条数据！",
    //       type: "error"
    //     })
    //     return;
    //   } else {
    //       this.$http
    //         .get("platform-framework/stuOrderApply/selectTaskInfo",{
    //           params: {
    //             instId: this.instId,
    //             taskDefKey: this.taskDefKey
    //           }
    //         })
    //         .then((response) => {
    //           console.log(this.instId)
    //           this.backList = response.data.list
    //         })
    //       this.dialogTableVisible = true
    // }
    // },
    //确定退回
    backSubmit() {
      // console.log(this.activityId)
      if (this.activityId == null || this.activityId == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
        return;
      } else {
        this.$http
          .get(this.$server.glourl + "stuOrderApply/back2", {
            params: {
              id: this.id,
              activityId: this.activityId,
              businesskey: this.businesskey,
              processDefinitionId: this.processDefinitionId
            }
          })
          .then(response => {
            this.reload();
            // console.log(response.data)
            // this.backList = response.data.list
          });
        this.dialogTableVisible = true;
      }
      // this.$router.go(0)
      this.loadTable();
      this.dialogTableVisible = false;
    },
    //关闭申请页面
    close1() {
      this.show = true;
      this.show1 = false;
      this.loadTable();
    },
    close2() {
      this.show = true;
      this.show2 = false;
      this.loadTable();
    },
    close3() {
      this.show = true;
      this.show3 = false;
      this.loadTable();
    },
    close4() {
      this.show = true;
      this.show4 = false;
      this.loadTable();
    },
    close5() {
      this.show = true;
      this.show5 = false;
      this.loadTable();
    },

    // 审核不通过
    handleFail() {
      this.$http
        .get(this.$server.glourl + "stucgbb/stuSaveOrder", {
          params: this.pass
        })
        .then(res => {
          this.show = true;
          this.show1 = false;
          this.show2 = false;
          this.show3 = false;
          this.show4 = false;
          this.show5 = false;
          this.loadTable();
          this.$message.error("审核不通过！");
        });
    },
    // 查看审核信息按钮函数
    handleSee() {
      this.loading2 = true;
      // console.log(this.executionId)
      if (this.executionId == null || this.executionId == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
        return;
      } else {
        this.$http
          .get(
            this.$server.glourl +
              "stucgbb/selectHisBuLcid?lcid=" +
              this.executionId
          )
          .then(response => {
            this.loading2 = false;
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
            this.seeVisible = true;
            this.seeVisible1 = false;
          });
      }
    },
    handleSee1() {
      // console.log(this.processInstanceId)
      if (this.processInstanceId == null || this.processInstanceId == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
        return;
      } else {
        this.$http
          .get(
            this.$server.glourl +
              "stucgbb/selectHisBuLcid?lcid=" +
              this.processInstanceId
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
            this.seeVisible = false;
            this.seeVisible1 = true;
          });
      }
    },
    //改变时间格式
    changeDataType(time) {
      const date = new Date();
      date.setTime(time); // value通过截取字符串只取数字。
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    }
  },
  activated() {
    this.loadTable();
    // this.loadTable2()
  }
};
</script>

<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 0px;
}

@import "../../style/common"; //必须加分号，不然会报错
@import "../../style/ele";
.long >>> .el-form-item__label {
  line-height: 25px !important;
}
</style>