<template>
    <div>
        <div v-show="showTable" style="margin:10px 0">
            <el-tabs type="border-card" @tab-click="handleClick">
                <el-tab-pane label="待审核">
                    <div class="header">
                        <div class="right">
                            <!-- <el-button type="danger" @click="handleBack">退回</el-button> -->
                            <el-button type="primary" @click="handleCheck">审核</el-button>
                            <el-button type="success" @click="handleSee">查看审核记录</el-button>
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
                        <el-table ref="moviesTable" border :data="dataList" tooltip-effect="dark" style="width: 100%" @row-click="clickRow" @selection-change="handleSelectionChange" v-loading="loading">

                            <el-table-column type="selection" width="55">
                            </el-table-column>

                            <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="80">
                            </el-table-column>

                            <el-table-column label="姓名" prop="assignee" align="center">
                            </el-table-column>

                            <el-table-column label="申请类型" prop="name" align="center">
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
                            <el-button type="success" @click="handleSee1">查看审核记录</el-button>
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
                            <el-table-column label="申请类型" prop="name" align="center">
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

        <!-- 优博申请表 -->
        <div class="container" v-show="!showTable1">
            <el-row>
                <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                    <div class="small"></div>
                    <span>博士生资助申请</span>
                    <div class="close" @click="close1"> X </div>
                </el-col>
            </el-row>

            <el-form :model="ybxm" :rules="rules" ref="quaApply" label-width="177px" class="demo-ruleForm" label-position="left">
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="姓名：" prop="academy">
                            <el-input v-model="ybxm.xsxm"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="所在学院：" prop="title">
                            <el-input v-model="ybxm.yxqc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="入学年月：" prop="titleEng">
                            <el-input v-model="ybxm.rxny"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="所在学科：" prop="name">
                            <el-input v-model="ybxm.xk"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="学号：" prop="thesisDate">
                            <el-input v-model="ybxm.xh"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="导师姓名：" prop="doctorDate">
                            <el-input v-model="ybxm.dsxm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="联系电话：" prop="researchDirection">
                            <el-input v-model="ybxm.dh"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="学位点所在学院：" prop="studentId">
                            <el-input v-model="ybxm.xwdszxy"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="E-mail：" prop="firstLevel">
                            <el-input v-model="ybxm.yx"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="拟定学位论文题目：" prop="tutorRD">
                            <el-input v-model="ybxm.ndxwlwtm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="研究方向：" prop="firstLevel">
                            <el-input v-model="ybxm.yjfx"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="攻博类型：" prop="secondLevel">
                            <!-- <el-input v-model="ybxm.gblx"></el-input> -->
                            <el-radio-group v-model="ybxm.gblx">
                                <el-radio label="0">硕博连读</el-radio>
                                <el-radio label="1">普通脱产博士</el-radio>
                                <el-radio label="2">在职博士</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="申请资助类型" prop="secondLevelName">
                            <!-- <el-input v-model="ybxm.sqzzlx"></el-input> -->
                            <el-radio-group v-model="ybxm.sqzzlx">
                                <el-radio label="0">学制内资助</el-radio>
                                <el-radio label="1">延期创优资助</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="22">
                        <div class="table-data">
                            <el-table border :data="ybxm.zclwkyxm">

                                <el-table-column label="支撑论文科研项目" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" align="center" width="70">
                                    </el-table-column>

                                    <el-table-column prop="kyxmmc" label="科研项目名称" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.kyxmmc" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.kyxmmc}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="xmly" label="项目来源" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xmly" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.xmly}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="xmjf" label="项目经费（万元）" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xmjf" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.xmjf}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="xmfzr" label="项目负责人" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xmfzr" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.xmfzr}}</span>
                                        </template>
                                    </el-table-column>

                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="申请人研究工作进展" v-model="ybxm.sqryjgzjz">
                        </el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="申请人在本学科顶级学术刊物上发表的论文（作者署名，题名，刊名，发表时间，起讫页码及影响因子等）" v-model="ybxm.sqrlw">
                        </el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="学位论文将要开展的主要研究内容，目标，预期可取得的创新成果及成果的表现形式" v-model="ybxm.xwlwzyyjfxnr">
                        </el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="研究工作进展安排" v-model="ybxm.yjgzjzap">
                        </el-input>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>博士学位论文预期优势分析</span>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="本学科全国性优秀博士学位论文水平分析" v-model="ybxm.bxkqglwfx">
                        </el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="申请人博士学位论文研究课题可能的理论创新，预期发表学术论文及科研成果的水平" v-model="ybxm.sqryjcgsp">
                        </el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="目标实现的技术安排" v-model="ybxm.mbsxjsap">
                        </el-input>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>申请人指导教师情况</span>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="22">
                        <div class="table-data">
                            <el-table border :data="ybxm.zdbsschybpyqk">

                                <el-table-column label="指导的博士生中曾获优博培育资助情况" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" align="center" width="70">
                                    </el-table-column>

                                    <el-table-column prop="nf" label="年份" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.nf" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.nf}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="xm" label="学生姓名" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xm" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.xm}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="xh" label="学号" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xh" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.xh}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="zy" label="专业" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zy" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.zy}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="sfxy" label="是否校优" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.sfxy" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.sfxy}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="yqmb" label="结题时是否达到预期目标" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.yqmb" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.yqmb}}</span>
                                        </template>
                                    </el-table-column>

                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="22">
                        <div class="table-data">
                            <el-table border :data="ybxm.zdbssyxlwqk">

                                <el-table-column label="指导的博士生中曾获各类优秀博士学位论文情况" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" align="center" width="70">
                                    </el-table-column>

                                    <el-table-column prop="nf" label="年份" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.nf" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.nf}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="xm" label="学生姓名" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xm" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.xm}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="xh" label="学号" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xh" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.xh}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="zy" label="专业" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zy" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.zy}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="yydj" label="优秀等级" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.yydj" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.yydj}}</span>
                                        </template>
                                    </el-table-column>

                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>

                <!-- 附件展示 -->
                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="附件：" prop="">
                            <a :href="item.url" v-for="item in ybxm.fj" class="fj" :key="item.id">
                                <i class="el-icon-document"></i>
                                {{item.name}}<br />
                            </a>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 审核 -->
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

                <!-- 提交审核 -->
                <div class="submit-box">
                    <!-- <el-button type="primary" @click="handleFail" class="submit-btn">不通过</el-button> -->
                    <el-button :loading="this.loading3" type="primary" @click="handleSubmit1" class="submit-btn">{{ submit }}</el-button>
                </div>
            </el-form>
        </div>
        <!-- 中期报告详情 -->
        <div class="container" v-show="!showDetail2">
            <el-row>
                <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                    <div class="small"></div>
                    <span>报告人基本信息</span>
                    <div class="close" @click="close2"> X </div>
                </el-col>
            </el-row>
            <!-- 项目表单 -->
            <el-form :model="zqbgDetail" :rules="rules" ref="quaApply" label-width="177px" class="demo-ruleForm" label-position="left">
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="姓名：" prop="academy">
                            <el-input v-model="zqbgDetail.xsxm"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="所在学院：" prop="title">
                            <el-input v-model="zqbgDetail.yxqc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="入学年月：" prop="titleEng">
                            <el-input v-model="zqbgDetail.rxny"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="所在学科：">
                            <el-input v-model="zqbgDetail.yjxk"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="学号：" prop="thesisDate">
                            <el-input v-model="zqbgDetail.xh"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="导师姓名：" prop="doctorDate">
                            <el-input v-model="zqbgDetail.dsxm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="联系电话：" prop="researchDirection">
                            <el-input v-model="zqbgDetail.dh"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="学位点所在学院：">
                            <el-input v-model="zqbgDetail.yxqc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="E-mail：" prop="firstLevel">
                            <el-input v-model="zqbgDetail.yx"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="研究方向：" prop="firstLevel">
                            <el-input v-model="zqbgDetail.yjfx"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="攻博类型：" prop="secondLevel">
                            <!-- <el-input v-model="zqbgsave.gblx"></el-input> -->
                            <el-radio-group v-model="zqbgDetail.gblx">
                                <el-radio label="0">硕博连读</el-radio>
                                <el-radio label="1">普通脱产博士</el-radio>
                                <el-radio label="2">在职博士</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="资助起始时间：" prop="secondLevelName">
                            <el-input v-model="zqbgDetail.zzqssj"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="拟申请学位时间：" prop="tutorRD">
                            <el-input v-model="zqbgDetail.nsqxwsj"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="学位论文题目：" prop="tutorName">
                            <el-input v-model="zqbgDetail.ndxwlwtm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="zqbgDetail.blzzyjgzzj" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="本轮资助研究工作总结（与资助前情况进行对比，对照申请时提出的研究目标，预期成果等，对资助期间工作进行整体总结，包括受资助后研究进展情况，存在问题，原因及对策等）">
                        </el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>本轮资助期内取得的成果清单</span>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="22">
                        <div class="table-data">
                            <el-table border :data="zqbgDetail.gnwfbxslw" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">

                                <el-table-column label="在国内外重要学术刊物上发表与博士学位论文有关的学术论文" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" align="center" width="70">
                                    </el-table-column>

                                    <el-table-column prop="lwtm" label="论文题目" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.lwtm" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.lwtm}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="brpm" label="本人排名" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.brpm" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.brpm}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="kwmc" label="刊物名称" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.kwmc" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.kwmc}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="fbsj" label="发表时间" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.fbsj" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.fbsj}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="kwjb" label="刊物级别" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.kwjb" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.kwjb}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="yxyz" label="影响因子" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.yxyz" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.yxyz}}</span>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="22">
                        <div class="table-data">
                            <el-table border :data="zqbgDetail.yxwygyjcg" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">

                                <el-table-column label="与学位论文有关的其它研究成果（获奖成果或专利）" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" align="center" width="70">
                                    </el-table-column>

                                    <el-table-column prop="zlmc" label="获奖成果或专利名称" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zlmc" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.zlmc}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="bjbm" label="颁奖（专利）部门" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.bjbm" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.bjbm}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="zlh" label="奖励级别或专利号" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zlh" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.zlh}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="hjsj" label="获奖（专利）时间" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.hjsj" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.hjsj}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="brpm" label="本人排名" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.brpm" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.brpm}}</span>
                                        </template>
                                    </el-table-column>

                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="22">
                        <div class="table-data">
                            <el-table :data="zqbgDetail.yxwygzz" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                <el-table-column label="与学位论文成果有关的专著" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" align="center" width="70">
                                    </el-table-column>

                                    <el-table-column prop="zzmc" label="专著名称" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zzmc" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.zzmc}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="cbdw" label="出版单位" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.cbdw" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.cbdw}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="cbsj" label="出版时间" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.cbsj" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.cbsj}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="zs" label="字数（万）" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zs" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.zs}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="brpm" label="本人排名" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.brpm" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.brpm}}</span>
                                        </template>
                                    </el-table-column>

                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="22">
                        <div class="table-data">
                            <el-table :data="zqbgDetail.blzzqnyqwcqk" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                <el-table-column label="本轮资助期内预期目标完成情况" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" align="center" width="70">
                                    </el-table-column>

                                    <el-table-column prop="yqcg" label="预期成果" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.yqcg" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.yqcg}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="wcqk" label="完成情况" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.wcqk" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.wcqk}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="qksm" label="情况说明" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.qksm" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.qksm}}</span>
                                        </template>
                                    </el-table-column>

                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="zqbgDetail.hxgzjhjyqcg" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="后续工作计划及预期成果">
                        </el-input>
                    </el-col>
                </el-row>

                <!-- 附件展示 -->
                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="附件：" prop="">
                            <a :href="item.url" v-for="item in zqbgDetail.fj" class="fj" :key="item.id">
                                <i class="el-icon-document"></i>
                                {{item.name}}<br/>
                            </a>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 审核 -->
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

                <!-- 提交审核 -->
                <div class="submit-box">
                    <!-- <el-button type="primary" @click="handleFail" class="submit-btn">不通过</el-button> -->
                    <el-button :loading="this.loading3" type="primary" @click="handleSubmit" class="submit-btn">{{ submit }}</el-button>
                </div>
            </el-form>
        </div>
        <!-- 总结报告详情 -->
        <div class="container" v-show="!showDetail3">
            <el-row>
                <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                    <div class="small"></div>
                    <span>报告人基本信息</span>
                    <div class="close" @click="close3"> X </div>
                </el-col>
            </el-row>

            <el-form :model="zjbg" :rules="rules" ref="quaApply" label-width="177px" class="demo-ruleForm" label-position="left">
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="姓名：" prop="academy">
                            <el-input v-model="zjbg.xsxm"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="所在学院：" prop="title">
                            <el-input v-model="zjbg.yxqc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="入学年月：" prop="titleEng">
                            <el-input v-model="zjbg.rxny"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="所在学科：">
                            <el-input v-model="zjbg.xk"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="学号：" prop="thesisDate">
                            <el-input v-model="zjbg.xh"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="导师姓名：" prop="doctorDate">
                            <el-input v-model="zjbg.dsxm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="联系电话：" prop="researchDirection">
                            <el-input v-model="zjbg.dh"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="学位点所在学院：">
                            <el-input v-model="zjbg.xwdszxy"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="E-mail：" prop="firstLevel">
                            <el-input v-model="zjbg.yx"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="研究方向：" prop="firstLevel">
                            <el-input v-model="zjbg.yjfx"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="攻博类型：" prop="secondLevel">
                            <!-- <el-input v-model="zjbgsave.gblx"></el-input> -->
                            <el-radio-group v-model="zjbg.gblx">
                                <el-radio label="0">硕博连读</el-radio>
                                <el-radio label="1">普通脱产博士</el-radio>
                                <el-radio label="2">在职博士</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- <el-row :gutter="30">
                <el-col :span="11">
                    <el-form-item label="资助起始时间：" prop="secondLevelName">
                        <el-input v-model="zjbg.zzqssj"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="11">
                    <el-form-item label="拟申请学位时间：" prop="tutorRD">
                        <el-input v-model="zjbg.nsqxwsj"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> -->

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="资助起始时间：" prop="secondLevelName">
                            <!-- <el-input v-model="zjbgsave.zzqssj"></el-input> -->
                            <el-date-picker v-model="zjbg.sj" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="学位论文题目：" prop="tutorName">
                            <el-input v-model="zjbg.ndxwlwtm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- <el-row :gutter="30">
                <el-col :span="22">
                    <el-input v-model="zjbg.blzzyjgzzj" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="论文主要创新点">
                    </el-input>
                </el-col>
            </el-row> -->

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="zjbg.xwlwyjgzzj" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="学位论文研究工作总结（与资助前情况进行对比，对照申请时提出的研究目标，预期成果等，对资助期间工作进行整体总结，包括受资助后研究进展情况，存在问题，原因及对策等）">
                        </el-input>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>整个资助期内取得的成果清单</span>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="22">
                        <div class="table-data">
                            <el-table border :data="zjbg.gnwfbxslw" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">

                                <el-table-column label="在国内外重要学术刊物上发表与博士学位论文有关的学术论文" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" align="center" width="70">
                                    </el-table-column>

                                    <el-table-column prop="lwtm" label="论文题目" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.lwtm" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.lwtm}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="brpm" label="本人排名" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.brpm" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.brpm}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="kwmc" label="刊物名称" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.kwmc" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.kwmc}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="fbsj" label="发表时间" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.fbsj" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.fbsj}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="kwjb" label="刊物级别" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.kwjb" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.kwjb}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="yxyz" label="影响因子" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.yxyz" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.yxyz}}</span>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="22">
                        <div class="table-data">
                            <el-table border :data="zjbg.yxwygyjcg" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">

                                <el-table-column label="与学位论文有关的其它研究成果（获奖成果或专利）" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" align="center" width="70">
                                    </el-table-column>

                                    <el-table-column prop="zlmc" label="获奖成果或专利名称" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zlmc" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.zlmc}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="bjbm" label="颁奖（专利）部门" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.bjbm" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.bjbm}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="zlh" label="奖励级别或专利号" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zlh" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.zlh}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="hjsj" label="获奖（专利）时间" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.hjsj" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.hjsj}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="brpm" label="本人排名" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.brpm" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.brpm}}</span>
                                        </template>
                                    </el-table-column>

                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="22">
                        <div class="table-data">
                            <el-table :data="zjbg.yxwygzz" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                <el-table-column label="与学位论文成果有关的专著" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" align="center" width="70">
                                    </el-table-column>

                                    <el-table-column prop="zzmc" label="专著名称" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zzmc" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.zzmc}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="cbdw" label="出版单位" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.cbdw" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.cbdw}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="cbsj" label="出版时间" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.cbsj" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.cbsj}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="zs" label="字数（万）" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zs" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.zs}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="brpm" label="本人排名" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.brpm" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.brpm}}</span>
                                        </template>
                                    </el-table-column>

                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="22">
                        <div class="table-data">
                            <el-table :data="zjbg.blzzqnyqwcqk" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                <el-table-column label="本轮资助期内预期目标完成情况" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" align="center" width="70">
                                    </el-table-column>

                                    <el-table-column prop="yqcg" label="预期成果" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.yqcg" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.yqcg}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="wcqk" label="完成情况" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.wcqk" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.wcqk}}</span>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="qksm" label="情况说明" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.qksm" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.qksm}}</span>
                                        </template>
                                    </el-table-column>

                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="附件：" prop="">
                            <a :href="item.url" v-for="item in zjbg.fj" class="fj" :key="item">
                                <i class="el-icon-document"></i>
                                {{item.name}}<br />
                            </a>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 审核 -->
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

                <!-- 提交审核 -->
                <div class="submit-box">
                    <!-- <el-button type="primary" @click="handleFail" class="submit-btn">不通过</el-button> -->
                    <el-button :loading="this.loading3" type="primary" @click="handleSubmit" class="submit-btn">{{ submit }}</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      tableTime: "", //列表结束时间
      timestamp1: "", //提交当前时间
      timestamp: "", //审核当前时间
      submit: "提交",
      loading3: false, //显示正在加载中动画开关
      //选择退回节点
      optionValue: "",
      loading: true,
      loading1: true,
      loading2: true,
      showTable: true, //申请项目展示列表开关
      showTable1: true, // 优博申请表
      showDetail2: true, //中期报告详情开关
      showDetail3: true, //总结报告详情开关
      dataList: [],
      backList: [], //退回列表
      dialogTableVisible: false, //退回操作表格显示开关
      instId: "", //流程id
      taskDefKey: "",
      activityId: "", //回退列表选择的回退节点
      type: 1, //出国报备类型
      id: "", //行号
      executionId: "", //流程id
      processInstanceId: "", //流程id
      zt: "",
      xmType: "",
      processDefinitionId: "",
      processVariables: {},
      businesskey: "", //优博id
      zqid: "", //中期id
      zjid: "", //总结id
      opinion: "", //审核意见
      seeVisible: false, //审核流程图显示开关
      seeVisible1: false, //审核流程图显示开关
      his: [], //弹窗：审核信息
      // rwid: '',
      audit: {
        check: "1",
        comment: ""
      },
      ybxm: [], // 优博项目
      zqbgDetail: [], // 中期报告
      zjbg: [], // 总结报告
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
      // console.log(timestampToTime (1533293827000))
    },
    timestampToTime1(row, column) {
      var date = new Date(row.startTime); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
      if (selection.length == 0) {
        this.id = "";
        this.processInstanceId = "";
        this.executionId = "";
        this.zt = "";
        this.xmType = "";
        // this.rwid = ''
        this.processDefinitionId = "";
        this.businesskey = "";
        this.zqid = "";
        this.instId = "";
        this.taskDefKey = "";
      } else {
        this.id = selection[0].id;
        this.processInstanceId = selection[0].processInstanceId;
        this.executionId = selection[0].executionId;
        this.zt = selection[0].zt;
        // this.rwid = selection[0].rwid
        this.xmType = selection[0].xmType;
        this.processDefinitionId = selection[0].processDefinitionId;
        this.businesskey = selection[0].processVariables.businesskey;
        this.zqid = selection[0].zqid;
        this.instId = selection[0].processInstanceId;
        this.taskDefKey = selection[0].taskDefinitionKey;
        //  console.log(selection);
        // console.log(this.taskDefKey)
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
        // this.rwid = selection[0].rwid
        this.xmType = selection[0].xmType;
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
        .get(this.$server.glourl + "stuOrderApply/taskList4", {
          params: this.pageHelp
        })
        .then(response => {
          this.loading = false;
          const data = response.data;
          this.dataList = data;
          this.processVariables = data.processVariables;
          this.loadTable3();
          // this.pageList = data.page
          // console.log(response.data)
        });
    },
    // 分页相关
    loadTable3() {
      this.$http
        .get(this.$server.glourl + "stuOrderApply/taskListTotalCount5", {
          params: this.pageHelp
        })
        .then(response => {
          this.loading = false;
          const data = response.data;
          this.pageList = data.pageUtil;
          // console.log(response.data.page)
        });
    },
    loadTable2() {
      this.$http
        .get(this.$server.glourl + "stuOrderApply/getHistoryAudit3", {
          params: this.pageHelp1
        })
        .then(response => {
          this.loading1 = false;
          const data = response.data;
          this.dataList = data.page.list;
          this.pageList1 = data.page;
          // console.log(this.dataList)
          // this.pageList = data.page
        });
    },
    //点击审核：0失败，1成功，2审核中，3待审核
    handleCheck() {
      this.timestamp = new Date().getTime(); //当前时间
      this.audit.comment = ""; //点击审核默认审核意见为空
      this.audit.check = "1"; //点击审核默认为通过
      //   console.log(this.audit.check);
      //   console.log(this.audit.comment);
      if (this.businesskey == null || this.businesskey == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
        return;
      } else {
        this.$http
          .get(this.$server.glourl + "stuOrderApply/selectTaskInfo", {
            params: {
              instId: this.instId,
              taskDefKey: this.taskDefKey
            }
          })
          .then(response => {
            this.backList = response.data.list;
            // console.log(response.data);
          });
        // 优博培育审核
        if (this.processDefinitionId.indexOf("xmjsServiceYbpyApply") != -1) {
          this.$http
            .get(
              this.$server.glourl +
                "stugjhzxxm/selectValidTime2?id=" +
                this.businesskey +
                "&&type=" +
                0
            )
            .then(response => {
              this.tableTime = response.data.map.jssj;
              if (this.tableTime < this.timestamp) {
                this.$message({
                  message: "已过期，无效操作!",
                  type: "error"
                });
                return;
              } else {
                this.$http
                  .get(
                    this.$server.glourl +
                      "stuybpyxm/selectInfoById?id=" +
                      this.businesskey
                  )
                  .then(response => {
                    this.ybxm = response.data.stuYbpyxm;
                    this.ybxm.fj = JSON.parse(response.data.stuYbpyxm.fj);
                    this.ybxm.zdbsschybpyqk = JSON.parse(
                      response.data.stuYbpyxm.zdbsschybpyqk
                    );
                    this.ybxm.zdbssyxlwqk = JSON.parse(
                      response.data.stuYbpyxm.zdbssyxlwqk
                    );
                    this.ybxm.zclwkyxm = JSON.parse(
                      response.data.stuYbpyxm.zclwkyxm
                    );
                  });
                this.showTable = false;
                this.showTable1 = false;
              }
            });
        } else if (
          this.processDefinitionId.indexOf("xmjsServiceYbpyzqjzApply") != -1
        ) {
          // 中期报告
          this.$http
            .post(
              this.$server.glourl +
                "stuybzqjzbg/selectInfoById?id=" +
                this.businesskey
            )
            .then(response => {
              this.zqbgDetail = response.data.map;
              //console.log(this.zqbgDetail.hxgzjhjyqcg);
              // console.log(this.zqid)
              // 附件展示，需要解析成对象
              this.zqbgDetail.fj = JSON.parse(response.data.map.fj);
              this.zqbgDetail.gnwfbxslw = JSON.parse(
                response.data.map.gnwfbxslw
              );
              this.zqbgDetail.yxwygyjcg = JSON.parse(
                response.data.map.yxwygyjcg
              );
              this.zqbgDetail.yxwygzz = JSON.parse(response.data.map.yxwygzz);
              this.zqbgDetail.blzzqnyqwcqk = JSON.parse(
                response.data.map.blzzqnyqwcqk
              );
              // this.obj.jfly = this.obj.jfly.split('') //分割每个字符
            });
          this.showTable = false;
          this.showDetail2 = false;
        } else if (
          this.processDefinitionId.indexOf("xmjsServiceYbpyzjbgApply") != -1
        ) {
          // 总结报告
          this.$http
            .post(
              this.$server.glourl +
                "stuybzjbg/selectInfoById?id=" +
                this.businesskey
            )
            .then(response => {
              this.zjbg = response.data.map;
              // 附件展示，需要解析成对象
              this.zjbg.fj = JSON.parse(response.data.map.fj);
              this.zjbg.gnwfbxslw = JSON.parse(response.data.map.gnwfbxslw);
              this.zjbg.yxwygyjcg = JSON.parse(response.data.map.yxwygyjcg);
              this.zjbg.yxwygzz = JSON.parse(response.data.map.yxwygzz);
              this.zjbg.blzzqnyqwcqk = JSON.parse(
                response.data.map.blzzqnyqwcqk
              );
            });
          this.showTable = false;
          this.showDetail3 = false;
        } else {
          // console.log(this.dataList.xmType)
        }
      }
    },
    //关闭申请页面
    close1() {
      this.showTable = true;
      this.showTable1 = true;
      this.loadTable();
    },
    close2() {
      this.showTable = true;
      this.showDetail2 = true;
      this.loadTable();
    },
    close3() {
      this.showTable = true;
      this.showDetail3 = true;
      this.loadTable();
    },
    //退回操作
    handleBack() {
      if (this.instId == null || this.instId == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
        return;
      } else {
        this.$http
          .get(this.$server.glourl + "stuOrderApply/selectTaskInfo", {
            params: {
              instId: this.instId,
              taskDefKey: this.taskDefKey
            }
          })
          .then(response => {
            // console.log(this.instId)
            this.backList = response.data.list;
          });
        this.dialogTableVisible = true;
      }
    },
    //确定退回
    backSubmit() {
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
    // 审核通过
    // 0不通过1通过
    handleSubmit1() {
      this.timestamp1 = new Date().getTime(); //当前时间
      this.loading = true;
      if (this.tableTime < this.timestamp1) {
        this.$message({
          message: "已过期，无效操作!",
          type: "error"
        });
        return;
      } else {
        if (this.audit.check == "2") {
          if (this.optionValue == null || this.optionValue == "") {
            this.$message({
              message: "请选择一个节点！",
              type: "error"
            });
            return;
          } else {
            if (this.audit.comment != "") {
              this.loading3 = true;
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
                    this.loading3 = false;
                    this.submit = "提交";
                    this.loading = false;
                    this.reload();
                    this.showTable = true;
                    this.showTable1 = true;
                    this.showDetail2 = true;
                    this.showDetail3 = true;
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
        } else if (this.audit.check != "2") {
          if (this.audit.comment != "") {
            this.loading3 = true;
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
                  this.loading3 = false;
                  this.submit = "提交";
                  this.loading = false;
                  this.reload();
                  this.showTable = true;
                  this.showTable1 = true;
                  this.showDetail2 = true;
                  this.showDetail3 = true;
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
      }
    },
    handleSubmit() {
      this.loading = true;
      if (this.audit.check == "2") {
        if (this.optionValue == null || this.optionValue == "") {
          this.$message({
            message: "请选择一个节点！",
            type: "error"
          });
          return;
        } else {
          if (this.audit.comment != "") {
            this.loading3 = true;
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
                  this.loading3 = false;
                  this.submit = "提交";
                  this.loading = false;
                  this.reload();
                  this.showTable = true;
                  this.showTable1 = true;
                  this.showDetail2 = true;
                  this.showDetail3 = true;
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
      } else if (this.audit.check != "2") {
        if (this.audit.comment != "") {
          this.loading3 = true;
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
                this.loading3 = false;
                this.submit = "提交";
                this.loading = false;
                this.reload();
                this.showTable = true;
                this.showTable1 = true;
                this.showDetail2 = true;
                this.showDetail3 = true;
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
    // 审核不通过
    handleFail() {
      this.$http
        .get(this.$server.glourl + "stucgbb/stuSaveOrder", {
          params: this.pass
        })
        .then(res => {
          this.showTable = true;
          this.showTable1 = true;
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
            //   console.log(this.his)
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

<style>
.el-button + .el-button {
  margin-left: 0px;
}
</style>
<style lang="scss" scoped>
@import "../../style/common"; //必须加分号，不然会报错
@import "../../style/ele";
</style>