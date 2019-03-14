<template>
  <div>
    <div class="container" v-show="show">
      <div class="header">
        <div class="right">
          <el-button type="success" @click="addApply" v-show='showTj'>添加</el-button>
          <el-button type="warning" @click="handleEdit" v-show='showSh'>审核</el-button>
          <el-button type="primary" @click="handleDownload">下载</el-button>
        </div>
      </div>
      <div>
        <el-table ref="moviesTable" border :data="page.slice((currentPage-1)*pageSize,currentPage*pageSize)" @row-click="clickRow" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">

          <el-table-column type="selection" width="55" align="center">
          </el-table-column>

          <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="80">
          </el-table-column>
          <el-table-column prop="id" label="id" type="index" align="center" v-if='showId'>
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>

          <el-table-column prop="xh" label="学号" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.xh }}</template>
          </el-table-column>
          <el-table-column prop="zyxm" label="姓名" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.zyxm }}
            </template>
          </el-table-column>
          <el-table-column prop="lwtm" label="论文题目" show-overflow-tooltip align="center">
            <template slot-scope="scope">{{ scope.row.lwtm }}</template>
          </el-table-column>
          <el-table-column prop="shzt" label="审核状态" show-overflow-tooltip align="center">
            <template slot-scope="scope">{{ scope.row.shzt === '0' ? '导师审核中' :scope.row.shzt === '1'?'导师审核不通过':scope.row.shzt === '2'?'学院待审' :scope.row.shzt === '3'?'学院审核不通过':scope.row.shzt === '4'?'学校待审':scope.row.shzt === '5'?'不通过' : '通过'}}</template>
          </el-table-column>

          <!-- <el-table-column prop="shzt" label="编辑" show-overflow-tooltip align="center">
            <template slot-scope="scope">
                <el-button type="primary" plain size="mini" style="margin-top:5px;width:60px">下载</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5,10,15]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="page.length">
        </el-pagination>
      </div>
    </div>

    <div class="container" v-show="show2">
      <el-row>
        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
          <div class="small"></div>
          <span>论文基本信息</span>
          <div class="close" @click="close1"> X </div>
        </el-col>
      </el-row>
      <!-- 项目表单 -->
      <el-form :model="stuYxlw" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">

         <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="学院名称：" prop="academy">
              <el-input v-model="xjxx.deptName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="学号：" prop="thesisDate">
              <el-input v-model="xjxx.xh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="论文题目：" prop="title">
              <el-input v-model="stuYxlw.lwtm" style="width:94.5%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="论文英文题目：" prop="titleEng">
              <el-input v-model="stuYxlw.lwywtm" style="width:94.5%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="作者姓名：" prop="name">
              <el-input v-model="xjxx.xsxm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <!-- <el-form-item label="论文答辩日期：" prop="thesisDate">
              <el-input v-model="stuYxlw.lwdbrq"></el-input>
            </el-form-item> -->
            <el-form-item label="论文答辩日期：" prop="thesisDate">
              <el-date-picker v-model="stuYxlw.lwdbrq" type="date"  placeholder="选择日期" value-format="yyyy-MM-dd">  </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="获得博士学位日期：" prop="doctorDate">
              <el-input v-model="xjxx.hdxwrq"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="论文涉及的研究方向：" prop="researchDirection">
              <el-input v-model="stuYxlw.yjfx"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="一级学科代码：" prop="studentId">
              <el-input v-model="stuYxlw.yjxkdm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="一级学科（专业）名称：" prop="firstLevel">
              <el-input v-model="stuYxlw.yjxkmc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="二级学科代码：" prop="secondLevel">
              <el-input v-model="stuYxlw.ejxkdm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="二级学科名称：" prop="secondLevelName">
              <el-input v-model="stuYxlw.ejxkmc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="指导教师研究方向：" prop="tutorRD">
              <el-input v-model="stuYxlw.zdjsyjfx" style="width:94.5%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <div class="long">
            <el-col :span="22">
              <el-form-item label="指导教师姓名（如导师组按序填入）：" prop="tutorName">
                <el-input v-model="stuYxlw.zdjsxm" style="width:94.5%"></el-input>
              </el-form-item>
            </el-col>
          </div>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="22">
              <el-form-item label="是否立即公开：" prop="tutorName">
                <el-select v-model="stuYxlw.sfljgk" placeholder="请选择">
                  <!-- 立即公开，一年，两年，三年 -->
                  <el-option value="立即公开"></el-option>
                  <el-option value="一年"></el-option>
                  <el-option value="两年"></el-option>
                  <el-option value="三年"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
        </el-row>

        <el-row>
          <el-col :sapn='24' style="margin-top:5px;line-height:50px">
            <div class="small"></div>
            <span>论文评审情况</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="同意答辩人数：" prop="secondLevel">
              <el-input-number v-model="dbrs1" :min="0" size="small"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="同意修改后答辩人数：" prop="secondLevelName">
              <el-input-number v-model="dbrs2" :min="0" size="small"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="推荐校优人数：" prop="secondLevel">
              <el-input-number v-model="stuYxlw.tjxyrs" :min="0" size="small"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="推荐省优人数：" prop="secondLevelName">
              <el-input-number v-model="stuYxlw.tjsyrs" :min="0" size="small"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="11">
              <el-form-item label="答辩委员会是否推优：" prop="yktm">
                  <el-radio-group v-model="stuYxlw.sfty">
                      <el-radio-button label="是">是</el-radio-button>
                      <el-radio-button label="否">否</el-radio-button>
                  </el-radio-group>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="21">
            <el-form-item label="备注：" prop="secondLevel">
              <el-input v-model="stuYxlw.bz" placeholder="请在备注栏注明攻读学位类别！"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :sapn='24' style="margin-top:5px;line-height:50px">
            <div class="small"></div>
            <span>作者攻博期间及获博士学位后一年内获得与博士学位论文密切相关的代表性成果</span>
          </el-col>
        </el-row>

        <el-row style="padding-top:20px;">
          <el-col :span="21">
            <div class="table-data">
              <el-table :data="stuYxlw.dbxcg" ref="multipleTable" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                <el-table-column label="取得代表性成果（可从学术成果录入中导入）" align="center" style="width: 100%;text-align: center">
                  <el-table-column label="序号" align="center" width="80" prop="num">
                  </el-table-column>

                  <el-table-column prop="achievement" label="成果名称" align="center" :formatter="formatter">
                    <template slot-scope="scope">
                      <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.stime" placeholder="请输入内容" />
                      <span v-show="!scope.row.editFlag">{{scope.row.stime}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column prop="reference" label="成果类型" align="center" :formatter="formatter">
                    <template slot-scope="scope">
                      <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xh" placeholder="请输入内容" />
                      <span v-show="!scope.row.editFlag">{{scope.row.xh}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column prop="zip" label="时间" align="center" :formatter="formatter">
                    <template slot-scope="scope">
                      <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xsxm" placeholder="请输入内容" />
                      <span v-show="!scope.row.editFlag">{{scope.row.xsxm}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column prop="zip" label="关联性" align="center" :formatter="formatter">
                    <template slot-scope="scope">
                      <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.glx" placeholder="请输入内容" />
                      <span v-show="!scope.row.editFlag">{{scope.row.glx}}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :span='1' style="margin-top:60px;padding-left:5px">
            <div style="width:100px">
              <el-button size='mini' square @click="centerDialogVisible = true" v-show="piliang">批量导入</el-button>
              <div style="margin-top:20px">
                <el-button icon="el-icon-plus" size='mini' circle @click="addRow(1)" />
                <el-button icon="el-icon-minus" size='mini' circle @click="delRow(1)" style="margin-left:20px"></el-button>
              </div>

            </div>

          </el-col>
          <!-- <el-col :span='1' style="margin-top:100px;">
            <el-button icon="el-icon-plus" size='mini' circle @click="addRow(1)" />
          </el-col>
          <el-col :span='1' style="margin-top:100px;">
            <el-button icon="el-icon-minus" size='mini' circle @click="delRow(1)"></el-button>
          </el-col> -->

          <el-dialog title="批量导入" :visible.sync="centerDialogVisible" width="40%">
            <div style="height:320px;overflow-y:scroll;margin-top:-30px;padding-left:15px" @change="handleCheckedCitiesChange(checked)">
              <el-row>
                <el-col :span='24' style="margin-top:5px;line-height:50px">
                  <div class="small"></div>
                  <span>学术成果</span>
                </el-col>
              </el-row>
              <el-row style="line-height:30px;padding-left:30px;">
                <el-checkbox-group v-model="checked1">
                  <el-col :span='8' v-for="cg in xscg" :key="cg">
                    <el-checkbox :label="cg.lwmc" :key="cg.lwmc"></el-checkbox>
                    <el-input v-show="false">{{cg.dsshsj}}</el-input>
                    <el-input v-show="false">{{cg.sljb}}</el-input>
                    <el-input v-show="false">{{cg.nkcsj}}</el-input>
                    <el-input v-show="false">{{cg.sfdyzz}}</el-input>
                    <el-input v-show="false">{{cg.zzzrs}}</el-input>
                    <el-input v-show="false">{{cg.yxyz}}</el-input>
                  </el-col>

                </el-checkbox-group>
              </el-row>

              <el-row>
                <el-col :span='24' style="margin-top:5px;line-height:50px">
                  <div class="small"></div>
                  <span>技术专利</span>
                </el-col>
              </el-row>
              <el-row style="line-height:30px;padding-left:30px;">
                <el-checkbox-group v-model="checked2">
                  <el-col :span='8' v-for="zl in zljs" :key="zl">
                    <el-checkbox :label="zl.zlmc" :key="zl.zlmc"></el-checkbox>
                    <el-input v-show="false">{{zl.dsshsj}}</el-input>
                  </el-col>

                </el-checkbox-group>
              </el-row>

              <el-row>
                <el-col :span='24' style="margin-top:5px;line-height:50px">
                  <div class="small"></div>
                  <span>发表著作</span>
                </el-col>
              </el-row>
              <el-row style="line-height:30px;padding-left:30px;">
                <el-checkbox-group v-model="checked3">
                  <el-col :span='8' v-for="fb in fbzz" :key="fb">
                    <el-checkbox :label="fb.zzmc" :key="fb.zzmc"></el-checkbox>
                    <el-input v-show="false">{{fb.xxshsj}}</el-input>
                  </el-col>

                </el-checkbox-group>
              </el-row>
              <el-row>
                <el-col :span='24' style="margin-top:5px;line-height:50px">
                  <div class="small"></div>
                  <span>科研项目</span>
                </el-col>
              </el-row>
              <el-row style="line-height:30px;padding-left:30px;">
                <el-checkbox-group v-model="checked4">
                  <el-col :span='8' v-for="ky in kyxm" :key="ky">
                    <el-checkbox :label="ky.xmnr" :key="ky.xmnr"></el-checkbox>
                    <el-input v-show="false">{{ky.dsshsj}}</el-input>
                  </el-col>

                </el-checkbox-group>
              </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>

              <el-button type="primary" @click="handleImport">确 定</el-button>
            </span>
          </el-dialog>
        </el-row>

        <div class="top">
          <el-row>
            <el-col :sapn='24' style="margin-top:5px;line-height:50px">
              <div class="small"></div>
              <span>论文创新点</span>
            </el-col>
          </el-row>
        </div>

        <el-row>
          <el-col :span="22">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="论文主要创新点" v-model="stuYxlw.cxd">
            </el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7">
            <div class="el-btn">
              <el-upload class="upload-demo" :action="baseUrl6" name="file" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList" :on-success="handleSuccess1">
                <!-- <el-col :span="24"> -->
                  <el-button size="small">
                    <div class="img">
                      <img src="../../assets/image/attachment.png" alt="" style="width:100%;height:100%;">
                    </div>
                    <p class="append">上传论文</p>
                  </el-button>
                <!-- </el-col> -->
                <!-- <el-col :span="7">
                  <div slot="tip" class="el-upload__tip"></div>
                </el-col> -->
              </el-upload>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="el-btn">
              <el-upload class="upload-demo" :action="baseUrl6" name="file" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList" :on-success="handleSuccess2">
                <!-- <el-col :span="24"> -->
                  <el-button size="small">
                    <div class="img">
                      <img src="../../assets/image/attachment.png" alt="" style="width:100%;height:100%;">
                    </div>
                    <p class="append">上传评阅表</p>
                  </el-button>
                <!-- </el-col> -->
                <!-- <el-col :span="7">
                  <div slot="tip" class="el-upload__tip"></div>
                </el-col> -->
              </el-upload>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="el-btn">
              <el-upload class="upload-demo" :action="baseUrl6" name="file" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList" :on-success="handleSuccess3">
                <!-- <el-col :span="24"> -->
                  <el-button size="small">
                    <div class="img">
                      <img src="../../assets/image/attachment.png" alt="" style="width:100%;height:100%;">
                    </div>
                    <p class="append">上传答辩记录表</p>
                  </el-button>
                <!-- </el-col> -->
                <!-- <el-col :span="7">
                  <div slot="tip" class="el-upload__tip"></div>
                </el-col> -->
              </el-upload>
            </div>
          </el-col>
        </el-row>
        <el-row>

        </el-row>
        <el-row>

        </el-row>
        <!-- 评阅表，论文，答辩记录表 -->
        <!-- 保存重置提交 -->
        <div class="bottomBox" style="text-align:center;">
          <el-button type="primary" class="reset" @click="close1">取消</el-button>
          <el-button type="primary" class="reset" @click="submit">提交申请</el-button>

        </div>
      </el-form>
    </div>

    <!-- 审核页面 -->
    <div class="container" v-show="show1">
      <el-row>
        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
          <div class="small"></div>
          <span>论文基本信息</span>
          <div class="close" @click="close"> X </div>
        </el-col>
      </el-row>

      <!-- 项目表单 -->
      <el-form :model="stuYxlw1" ref="stuYxlw1" :rules="rules" label-width="177px" class="demo-stuYxlw1" label-position="left">

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="学院名称：" prop="academy">
              <el-input v-model="stuYxlw1.deptName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="学号：" prop="thesisDate">
              <el-input v-model="stuYxlw1.xh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="论文题目：" prop="title">
              <el-input v-model="stuYxlw1.lwtm" style="width:94.5%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="论文英文题目：" prop="titleEng">
              <el-input v-model="stuYxlw1.lwywtm" style="width:94.5%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="作者姓名：" prop="name">
              <el-input v-model="stuYxlw1.zyxm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="论文答辩日期：" prop="thesisDate">
              <el-input v-model="stuYxlw1.lwdbrq"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="获得博士学位日期：" prop="doctorDate">
              <el-input v-model="stuYxlw1.hdxwrq"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="论文涉及的研究方向：" prop="researchDirection">
              <el-input v-model="stuYxlw1.yjfx"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="一级学科代码：" prop="studentId">
              <el-input v-model="stuYxlw1.yjxkdm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="一级学科（专业）名称：" prop="firstLevel">
              <el-input v-model="stuYxlw1.yjxkmc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="二级学科代码：" prop="secondLevel">
              <el-input v-model="stuYxlw1.ejxkdm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="二级学科名称：" prop="secondLevelName">
              <el-input v-model="stuYxlw1.ejxkmc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="指导教师研究方向：" prop="tutorRD">
              <el-input v-model="stuYxlw1.zdjsyjfx" style="width:94.5%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <div class="long">
            <el-col :span="22">
              <el-form-item label="指导教师姓名（如导师组按序填入）：" prop="tutorName">
                <el-input v-model="stuYxlw1.zdjsxm" style="width:94.5%"></el-input>
              </el-form-item>
            </el-col>
          </div>
        </el-row>
        <!-- sfljgk -->
        <el-row :gutter="20">
          <el-col :span="22">
              <el-form-item label="是否立即公开：" prop="tutorName">
                <el-select v-model="stuYxlw1.sfljgk" placeholder="请选择">
                  <!-- 立即公开，一年，两年，三年 -->
                  <el-option value="立即公开"></el-option>
                  <el-option value="一年"></el-option>
                  <el-option value="两年"></el-option>
                  <el-option value="三年"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
        </el-row>

        <el-row>
          <el-col :sapn='24' style="margin-top:5px;line-height:50px">
            <div class="small"></div>
            <span>论文评审情况</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="评阅成绩：" prop="secondLevel">
              <el-input v-model="stuYxlw1.pycj"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="答辩委员会是否推优：" prop="yktm">
                <el-radio-group v-model="stuYxlw1.sfty">
                    <el-radio-button label="是">是</el-radio-button>
                    <el-radio-button label="否">否</el-radio-button>
                </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="推荐校优人数：" prop="secondLevel">
              <el-input v-model="stuYxlw1.tjxyrs" :min="0"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="推荐省优人数：" prop="secondLevelName">
              <el-input v-model="stuYxlw1.tjsyrs" :min="0"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="21">
            <el-form-item label="备注：" prop="secondLevel">
              <el-input v-model="stuYxlw1.bz" placeholder="请在备注栏注明攻读学位类别！"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :sapn='24' style="margin-top:5px;line-height:50px">
            <div class="small"></div>
            <span>作者攻博期间及获博士学位后一年内获得与博士学位论文密切相关的代表性成果</span>
          </el-col>
        </el-row>

        <el-row style="padding-top:20px;">
          <el-col :span="22">
            <div class="table-data">
              <el-table :data="stuYxlw1.xsdbxcg" ref="multipleTable">
                <el-table-column label="取得代表性成果（可从学术成果录入中导入）" align="center" style="width: 100%;text-align: center">
                  <el-table-column label="序号" type="index" :index="indexMethod" width="80" align="center">
                  </el-table-column>

                  <el-table-column prop="achievement" label="成果名称" align="center" :formatter="formatter">
                    <template slot-scope="scope">
                      <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.stime" placeholder="请输入内容" />
                      <span v-show="!scope.row.editFlag">{{scope.row.stime}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column prop="reference" label="成果类型" align="center" :formatter="formatter">
                    <template slot-scope="scope">
                      <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xh" placeholder="请输入内容" />
                      <span v-show="!scope.row.editFlag">{{scope.row.xh}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column prop="zip" label="时间" align="center" :formatter="formatter">
                    <template slot-scope="scope">
                      <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xsxm" placeholder="请输入内容" />
                      <span v-show="!scope.row.editFlag">{{scope.row.xsxm}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column prop="zip" label="关联性" align="center" :formatter="formatter">
                    <template slot-scope="scope">
                      <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.glx" placeholder="请输入内容" />
                      <span v-show="!scope.row.editFlag">{{scope.row.glx}}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>

        <div class="top">
          <el-row>
            <el-col :sapn='24' style="margin-top:5px;line-height:50px">
              <div class="small"></div>
              <span>论文创新点</span>
            </el-col>
          </el-row>
        </div>

        <el-row>
          <el-col :span="22">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="论文主要创新点" v-model="stuYxlw1.cxd">
            </el-input>
          </el-col>
        </el-row>

         <el-row :gutter="20"  style="margin-left:3%;margin-top:20px">
            <!-- 下载附件 -->
            <div class="el-btn" style="margin-left:0">
              <!-- <a class="append" href="#" style="color:#606266;text-decoration:none;font-size:14px;margin-left:25px" id="fj1" @click="download()">下载论文</a>
              <a class="append" href="#" style="color:#606266;text-decoration:none;font-size:14px;margin-left:25px" id="fj2" @click="download()">下载评阅表</a>
              <a class="append" href="#" style="color:#606266;text-decoration:none;font-size:14px;margin-left:25px" id="fj3" @click="download()">下载答辩记录表</a> -->
               <a class="append" :href="stuYxlw1.fj" download="" style="color:#606266;text-decoration:none;font-size:14px;margin-left:25px" id="fj1" @click="download(href)">下载论文</a>
              <a class="append" :href="stuYxlw1.pyb" download="" style="color:#606266;text-decoration:none;font-size:14px;margin-left:25px" id="fj2">下载评阅表</a>
              <a class="append" :href="stuYxlw1.dbjlb" download="" style="color:#606266;text-decoration:none;font-size:14px;margin-left:25px" id="fj3">下载答辩记录表</a>
            </div>
            <!-- <div class="el-btn">
              <a class="append" href="#" style="color:#606266;text-decoration:none;font-size:14px;margin-left:25px" id="fj" @click="download()">下载附件</a>
            </div>
            <div class="el-btn">
              <a class="append" href="#" style="color:#606266;text-decoration:none;font-size:14px;margin-left:25px" id="fj" @click="download()">下载附件</a>
            </div> -->
          </el-row>
        <!-- 保存重置提交 -->
        <div class="bottomBox" style="text-align:center;">
          <el-button type="primary" class="reset" @click="adopt()">通过</el-button>
          <el-button type="primary" class="reset" @click="nothrough()">不通过</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  inject: ['reload'],
  data() {
    return {
      show: true, //展示列表开关
      show1: false,
      show2: false,
      showId: false,
      piliang: true, //批量按钮开关
      showSh: false, //审核按钮
      showTj: true, //添加按钮
      centerDialogVisible: false, //dialog 开关
      checked1: [],
      checked2: [],
      checked3: [],
      checked4: [],
      page: [],
      dbrs1: 0,
      dbrs2: 0,
      currentPage: 1,
      ids: "",
      pageSize: 5,
      totalItems: 0,
      multipleSelection: [],
      input: "",
      textarea1: "",
      dataList: [],
      ruleForm: {},
      rules: {},
      dialogFormVisible: false,
      stuYxlw: {
        tjxyrs: 0,
        tjsyrs: 0,
        sfty: "是",
        xh: "",
        xymc:"",
        zyxm:"",
        hdxwrq:"",
        fj:"",
        pyb:"",
        dbjlb:"",
        dbxcg: [
          // {
          //   // num: 1,
          //   // stime: '',
          //   // xh: '',
          //   // xsxm: '',
          //   // glx: '',
          //   // editFlag: false
          // },
        ]
      },
      stuYxlw1: {
        id: "",
        xsdbxcg: [],
      },
      shzt: "",
      fbzz: {},
      kyxm: {},
      zljs: {},
      xscg: {},
      fbzzsj: "",
      kyxmsj: "",
      xscgsj: "",
      zljssj: "",
      xjxx:"",
    };
  },
  mounted() {
    //进入页面，加载申请列表
    this.loadTable();
  },
  methods: {
    //下载
    download1(){
      location.href=this.$server.glourl+"stuyxlw/download";
    },
    download(href) {
        window.location.href=href;
    },
    //加载列表
    loadTable() {
      this.$http.post(this.$server.glourl+"stuyxlw/YxlwMenu").then(response => {
        if(response.data.username=="xuesheng"){
          this.xjxx=response.data.xjxx
          this.page = response.data.yxlw
          this.fbzz = response.data.fbzz
          this.kyxm = response.data.kyxm
          this.xscg = response.data.xscg
          this.zljs = response.data.zljs
          this.showSh = false
          this.showTj = true
          // console.log(response.data.xscg)
        }else{
          this.page = response.data.yxlw
          this.showSh = true
          this.showTj = false
          // console.log(response.data);
        }
      });
    },
    //表格方法
    //点击列表选中
    clickRow(row) {
      this.$refs.moviesTable.toggleRowSelection(row);
      //console.log(row);
    },
    //列表选择改变事件
    handleSelectionChange(selection) {
      //console.log(selection);
      if (selection.length == 1) {
        this.ids = selection[0].id;
        // console.log(this.ids);
      } else {
        this.ids = "";
      }
    },
    //改变列表页条数大小回调函数
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadTable();
    },
    //改变列表页当前页回调函数
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.loadTable();
    },
    //列表序号
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
    //关闭添加页面
    // 添加：show2
    // 审核：show1
    close1 () {
        this.show = true;
        this.show2 = false;
        this.show1 = false;
        this.loadTable();
    },
    //关闭审核页面
    close() {
      this.show = true;
      this.show1 = false;
      this.show2 = false;
      this.loadTable();
    },
    //添加按钮函数
    addApply() {
      this.show = false;
      this.show2 = true;

    },
    //下载
    handleDownload(){
      if (this.ids == null || this.ids == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
        return;
      }
      location.href = this.$server.glourl+"stuyxlw/downTable?id="+this.ids;
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
      this.show1 = true;
      this.show = false;
      this.show2 = false;
      // console.log(this.ids);
      this.$http
        .get(this.$server.glourl+"stuyxlw/CheckInfo/", {
          params: {
            id: this.ids
          }
        })
        .then(
          response => {
            // console.log(response.data),
            this.stuYxlw1 = response.data.stuyxlw[0];
            this.stuYxlw1.xsdbxcg = response.data.stuyxlw[0].dbxcg;
            this.stuYxlw1.xsdbxcg = JSON.parse(this.stuYxlw1.xsdbxcg);
          }
          //this.stuYxlw1=response.data.stuyxlw,
          // this.stuYxlw1 = response.data.stuYxlw,
          // (this.stuYxlw1 = response.data.stuYxlw),
          // (this.stuYxlw1.zzxx1 = response.data.parse),
          // this.stuYxlw1 = response.data.stuyxlw[0]
        );
    },
    //点击通过
    adopt() {
      //console.log(this.ids);
      this.$http
        .get(this.$server.glourl+"stuyxlw/TutorCheck", {
          params: {
            id: this.stuYxlw1.id,
            shenhe: "1"
          }
        })
        .then(res => {
          if (res.data.msg == 1) {
            this.$message({
              message: "抱歉，该数据已被审核，不可操作！",
              type: "error"
            });
          } else {
            this.show1 = false;
            this.show2 = false;
            this.loadTable();
            this.$message({
              message: "审核成功！",
              type: "success"
            });
          }
          this.show=true;
        });
    },
    //点击不通过
    nothrough() {
      //console.log(this.ids);
      this.$http
        .get(this.$server.glourl+"stuyxlw/TutorCheck", {
          params: {
            id: this.stuYxlw1.id,
            shenhe: "2"
          }
        })
        .then(res => {
          if (res.data.msg == 1) {
            this.$message({
              message: "抱歉，该数据已被审核，不可操作！",
              type: "error"
            });
          } else {
            this.show1 = false;
            this.show2 = false;
            this.loadTable();
            this.$message({
              message: "审核成功！",
              type: "success"
            });
          }
            this.show=true;
        });
    },
    //列表确认
    handleImport(){
      this.centerDialogVisible = false
      this.checked1 = []
      this.checked2 = []
      this.checked3 = []
      this.checked4 = []
    },
    //选择代表性成果（多选）
    handleCheckedCitiesChange(checked) {
      // this.checked1 = ''
      this.stuYxlw.dbxcg = [];
      // console.log(this.checked1, this.checked2, this.checked3, this.checked4);
      this.checked1.forEach(element => {
        // console.log(element)
        var time1;
        var data1; //收录级别
        var data2; //发表日期
        var data3; //第一作者
        var data4; //作者总人数
        var data5; //导师第一作者
        this.xscg.forEach(ele => {
          // console.log(ele)
          if ((ele.lwmc == element)) {
            time1 = ele.dsshsj;
            data1 = ele.sljb == null ? '':('【'+ele.sljb+'】')
            data2 = ele.fbrq == null ? '':(ele.fbrq+'，')
            data3 = ele.sfdyzz == null ? '':(ele.sfdyzz+'/')
            data4 = ele.zzzrs == null ? '':(ele.zzzrs)
            data5 = ele.dsdyzz == 1 ? '（导师第一）':''
          }
        });
        this.stuYxlw.dbxcg.push({
          num: this.stuYxlw.dbxcg.length + 1,
          stime: element+data1+data2+data3+data4+data5,
          // stime: element,
          xh: "学术论文",
          xsxm: time1,
          editFlag: false
        });
      });
      this.checked2.forEach(element => {
        var time2;
        this.zljs.forEach(ele => {
          if ((ele.xmlx = element)) {
            time2 = ele.dsshsj;
          }
        });
        this.stuYxlw.dbxcg.push({
          num: this.stuYxlw.dbxcg.length + 1,
          stime: element,
          xh: "技术专利",
          xsxm: time2,
          editFlag: false
        });
      });
      this.checked3.forEach(element => {
        var time3;
        this.fbzz.forEach(ele => {
          if ((ele.xmlx = element)) {
            time3 = ele.dsshsj;
          }
        });
        this.stuYxlw.dbxcg.push({
          num: this.stuYxlw.dbxcg.length + 1,
          stime: element,
          xh: "发表著作",
          xsxm: time3,
          editFlag: false
        });
      });
      this.checked4.forEach(element => {
        var time;
        this.kyxm.forEach(ele => {
          if ((ele.xmlx = element)) {
            time = ele.dsshsj;
          }
        });
        this.stuYxlw.dbxcg.push({
          num: this.stuYxlw.dbxcg.length + 1,
          stime: element,
          xh: "科研项目",
          xsxm: time,
          editFlag: false
        });
      });
    },
    handleSuccess1(response) {
      this.stuYxlw.fj = response.url;
      // console.log(this.stuYxlw.fj);
    },
    handleSuccess2(response) {
      this.stuYxlw.pyb = response.url;
      // console.log(this.stuYxlw.pyb);
    },
    handleSuccess3(response) {
      this.stuYxlw.dbjlb = response.url;
      // console.log(response);
      // this.myFileList = true;
    },
    //申请信息提交事件
    submit: function() {
    //  if(this.stuYxlw.fj == '' || this.stuYxlw.pyb == '' || this.stuYxlw.dbjlb == ''){
    //    this.$message({
    //       message: "请依次上传三个附件！",
    //       type: "error"
    //     });
    //     console.log(this.stuYxlw.fj)
    //     return
    //  }
     this.stuYxlw.xh=this.xjxx.xh
     this.stuYxlw.xymc=this.xjxx.yxsh
     this.stuYxlw.zyxm=this.xjxx.xsxm
     this.stuYxlw.hdxwrq=this.xjxx.hdxwrq
     this.dbrs1 = "1("+this.dbrs1+")"
     this.dbrs2 = "2("+this.dbrs2+")"
     this.stuYxlw.pycj=this.dbrs1+","+this.dbrs2;
     this.stuYxlw.tjxyrs = "Y("+this.stuYxlw.tjxyrs+")"
     this.stuYxlw.tjsyrs = "Y("+this.stuYxlw.tjsyrs+")"
    //  console.log(this.stuYxlw.fj);
    //  console.log(this.stuYxlw.pycj)
    //  console.log(this.stuYxlw.dbxcg)
    //  console.log(this.stuYxlw.fj)
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$http
        .post(this.$server.glourl+"stuyxlw/save", this.stuYxlw)
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "申请信息提交成功，请下载推荐表！",
              type: "success"
            });
            // this.reload()
            this.show = true;
            this.show1 = false;
            this.show2 = false;
            // this.dbrs1 = 0
            // this.dbrs2 = 0
            this.loadTable();
          }
          this.stuYxlw = { brand_right: 0 };
          // console.log(this.stuYxlw);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //申请表信息动态添加行
    addRow(tableIndix) {
      // console.log(this.stuYxlw.dbxcg.length)
      if(this.stuYxlw.dbxcg.length<5){
        this.stuYxlw.dbxcg.push({
          num: this.stuYxlw.dbxcg.length + 1,
          editFlag: false
        });
      }else {
        this.$message({
          message: "最多添加5条数据！",
          type: "error"
        });
      }
    },
    //申请信息动态减少行
    delRow(tableIndix) {
      this.stuYxlw.dbxcg.pop();
    },
    handleSave: function(row) {
      //保存数据，向后台取数据
    },
    //申请信息table鼠标经过事件
    handleMouseEnter: function(row, column, cell, event) {
      const tableIndix = row.tableNum;
      let num = row.num - 1;
      this.stuYxlw.dbxcg[num].editFlag = true;
    },
    //申请信息table鼠标经过移出事件
    handleMouseOut: function(row, column, cell, event) {
      const tableIndix = row.tableNum;
      let num = row.num - 1;
      this.stuYxlw.dbxcg[num].editFlag = false;
    },
    //提交申请信息校验table列是否为空
    checkTable() {
      var f = this.checkList(this.stuYxlw.dbxcg, 9);
      return f;
    }
  }
};
</script>

<style scoped>
.el-form-item {
  margin-left: 56px;
}
/* 表格左边距 */
.table-data {
  margin-left: 56px;
  box-sizing: border-box;
  margin-bottom: 25px;
}
/* 文本框 */
.el-textarea {
  margin-top: 14px;
  padding-left: 56px;
  box-sizing: border-box;
}
.textarea >>> .el-textarea {
  margin-bottom: 20px;
}
.divShadow2 {
  width: 97%;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 20px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
  position: relative;
}
.container {
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  margin-top: 10px;
  overflow: hidden;
  position: relative;
}
.container >>> .el-form-item__label {
  padding: 0;
}
.bottom {
  margin-bottom: 40px;
}
/* header表格上面部分 */
.header-input {
  width: 54%;
}
.header {
  overflow: hidden;
}
.left {
  float: left;
}
.right {
  float: right;
}
.el-table {
  margin-top: 5px;
  /* border: 1px solid #ccc; */
  border-radius: 3px;
}
/* 分页 */
.pagination {
  text-align: center;
  margin-top: 40px;
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
p {
  display: inline-block;
}
/* 批量导入 */
.import {
  margin-top: 15px;
  float: right;
  height: 40px;
}
/* .top {
  margin-top: 60px;
} */
/* 添加附件 */
.img {
  float: left;
  line-height: 35px;
  width: 12px;
  height: 14px;
}
.add {
  width: 100px;
  height: 35px;
  line-height: 28px;
}
.el-btn {
  /* margin-top: 15px; */
  margin-left: 56px;
  margin-bottom: 10px;
}
.append {
  margin-left: 8px;
}
.el-button--small,
.el-button--small.is-round {
  /* margin-left: 5px; */
  padding: 5px 15px 5px 15px;
}
.el-textarea {
  margin-top: 14px;
  /* 添加附件上边距 */
  margin-bottom: 25px;
}
.el-upload {
  margin-top: 10px;
}
.bottomBox {
  width: 97%;
  background: rgba(255, 255, 255, 1);
  margin-top: 3%;
  padding-bottom: 1%;
  padding-top: 3%;
  border-top: 1px solid #eeeeee;
}
.reset {
  width: 20%;
  margin-left: 5%;
  margin-right: 5%;
  font-size: 16px;
  background-color: #237ae4;
}
.long >>> .el-form-item__label {
  line-height: 25px;
}
.el-button + .el-button {
  margin-left: 0px;
}
.close {
  text-align: center;
  width: 20px;
  height: 20px;
  color: #cccccc;
  font-size: 16px;
  position: absolute;
  right: 15px;
  top: 10px;
  cursor: pointer;
  z-index: 1000;
}
/* 日期控件样式 */
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
}
.el-btn /deep/ .el-upload-list__item-name {
  white-space: normal;
}
.red {
  color: #f56c6c;
}
/* .red >>> .el-form-item__label {
  color: #f56c6c;
} */
</style>
