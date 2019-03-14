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
                    <el-button type="primary" @click="midtermReport">中期报告</el-button>
                    <el-button type="danger" @click="summaryReport">总结报告</el-button>
                    <!-- <el-button type="warning">查看详情</el-button> -->
                    <!-- <el-button type="primary">审核进度</el-button> -->
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

                    <el-table-column prop="ndxwlwtm" label="拟定学位论文题目" align="center">
                    </el-table-column>

                    <!-- <el-table-column label="审核状态" prop="zt" align="center">
                      <template slot-scope="scope">
                            {{ scope.row.zt === 0 ? '审核不通过' :scope.row.zt === 1 ? '审核通过':scope.row.zt === 2 ? '审核中' :scope.row.zt === 3 ? '待审核': '退回'}}
                        </template>
                    </el-table-column> -->

                    <el-table-column label="创建时间" prop="cjsj" align="center">
                        <template slot-scope="scope">{{scope.row.cjsjString}}</template>
                    </el-table-column>

                    <el-table-column label="编辑" prop="cjsj" align="center">
                        <template slot-scope="scope">
                            <el-button type="warning" plain size="mini" v-if="scope.row.id" style="width:70px">{{ scope.row.zt == 0 ? '审核不通过' :scope.row.zt == 1 ? '审核通过':scope.row.zt == 2 ? '审核中' :scope.row.zt == 3 ? '待审核':scope.row.zt == 4 ? '退回':scope.row.zt == 5 ? '未提交':''}}</el-button><br>
                            <el-button type="danger" plain size="mini" v-if="scope.row.id" style="margin-top:5px;width:70px" @click="handleSee1(scope.row)">修改</el-button><br>
                            <el-button type="primary" plain size="mini" v-if="scope.row.id" style="margin-top:5px;width:70px" @click="handleProgress1(scope.row)">审核进度</el-button><br>
                            <el-button type="primary" plain size="mini" v-if="scope.row.id" style="margin-top:5px;width:70px" @click="download1(scope.row.lcid,scope.row.zt)">下载</el-button>
                        </template>
                    </el-table-column>

                    <el-table-column label="中期报告" align="center">
                        <!-- <template slot-scope="scope">
                            <el-tag
                            :type="scope.row.tag === '中期报告' ? 'primary' : 'success'"
                            disable-transitions>{{scope.row.tag}}</el-tag>
                        </template> -->
                        <template slot-scope="scope">
                            <el-button type="warning" plain size="mini" v-if="scope.row.zqid" style="width:70px">{{ scope.row.zqzt == 0 ? '审核不通过' :scope.row.zqzt == 1 ? '审核通过':scope.row.zqzt == 2 ? '审核中' :scope.row.zqzt == 3 ? '待审核':scope.row.zqzt == 4 ? '退回':scope.row.zqzt == 5 ? '未提交':''}}</el-button><br>
                            <el-button type="danger" plain size="mini" v-if="scope.row.zqid" style="margin-top:5px;width:70px" @click="handleSee2(scope.row)">修改</el-button><br>
                            <el-button type="primary" plain size="mini" v-if="scope.row.zqid" style="margin-top:5px;width:70px" @click="handleProgress2(scope.row)">审核进度</el-button><br>
                            <el-button type="primary" plain size="mini" v-if="scope.row.zqid" style="margin-top:5px;width:70px" @click="download2(scope.row.zqlcid,scope.row.zqzt)">下载</el-button>
                        </template>
                    </el-table-column>

                    <el-table-column label="总结报告" align="center">
                        <!-- <template slot-scope="scope">
                            <el-tag
                            :type="scope.row.tag === '总结报告' ? 'primary' : 'success'"
                            disable-transitions>{{scope.row.tag}}</el-tag>
                        </template> -->
                        <template slot-scope="scope">
                            <el-button type="warning" plain size="mini" v-if="scope.row.zjid" style="width:70px">{{ scope.row.zjzt == 0 ? '审核不通过' :scope.row.zjzt == 1 ? '审核通过':scope.row.zjzt == 2 ? '审核中' :scope.row.zjzt == 3 ? '待审核':scope.row.zjzt == 4 ? '退回':scope.row.zjzt == 5 ? '未提交':''}}</el-button><br>
                            <el-button type="danger" plain size="mini" v-if="scope.row.zjid" style="margin-top:5px;width:70px" @click="handleSee3(scope.row)">修改</el-button><br>
                            <el-button type="primary" plain size="mini" v-if="scope.row.zjid" style="margin-top:5px;width:70px" @click="handleProgress3(scope.row)">审核进度</el-button><br>
                            <el-button type="primary" plain size="mini" v-if="scope.row.zjid" style="margin-top:5px;width:70px" @click="download3(scope.row.zjlcid,scope.row.zjzt)">下载</el-button>
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
        <!-- 优博项目 -->
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
                        <el-form-item label="所在学科：">
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
                        <el-form-item label="学位点所在学院：">
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
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table border :data="ybxm.zclwkyxm" @cell-mouse-enter="handleMouseEnter1" @cell-mouse-leave="handleMouseOut1">

                                <el-table-column label="支撑论文科研项目" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" width="70" label="序号" align="center">
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
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow1" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow1" class="plus"></el-button>
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
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table border :data="ybxm.zdbsschybpyqk" @cell-mouse-enter="handleMouseEnter2" @cell-mouse-leave="handleMouseOut2">

                                <el-table-column label="指导的博士生中曾获优博培育资助情况" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" width="70" align="center">
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
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow2" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow2" class="plus"></el-button>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table border :data="ybxm.zdbssyxlwqk" @cell-mouse-enter="handleMouseEnter3" @cell-mouse-leave="handleMouseOut3">

                                <el-table-column label="指导的博士生中曾获各类优秀博士学位论文情况" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" width="70" align="center">
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
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow3" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow3" class="plus"></el-button>
                    </el-col>
                </el-row>

                <!-- <el-row :gutter="30">
                  <el-col :span="22">
                    <el-form-item label="附件：" prop="">
                      <a :href="item.url" v-for="item in ybxm.fj" class="fj">
                        <i class="el-icon-document"></i>
                        {{item.name}}<br/>
                      </a>
                    </el-form-item>    
                  </el-col>
                </el-row> -->
                <!-- 添加附件 -->
                <div class="append-btn">
                    <el-upload class="upload-demo" :action="baseUrls" :on-progress="progress1" :on-preview="handlePreview" :on-remove="handleRemove1" :before-remove="beforeRemove" :on-success="handleSuccess1" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList1">
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
                    <el-button type="primary" @click="saveMsg1" class="submit-btn">保存</el-button>
                    <!-- <el-button type="primary" @click="applySave" class="submit-btn">保存</el-button>
                    <el-button type="primary" @click="reset" class="submit-btn">重置</el-button> -->
                    <el-button type="danger" @click="handleCancel1" class="submit-btn">取消</el-button>
                    <el-button :loading="this.loading" type="primary" @click="changeSubmit1" class="submit-btn" :disabled="onsuccess1">{{ submit }}</el-button>
                </div>
            </el-form>
        </div>
        <!-- 中期报告初始化 -->
        <div class="container" v-show="!showTable2">
            <el-row>
                <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                    <div class="small"></div>
                    <span>报告人基本信息</span>
                    <div class="close" @click="close2"> X </div>
                </el-col>
            </el-row>
            <!-- 项目表单 -->
            <el-form :model="zqbg" :rules="rules" ref="quaApply" label-width="177px" class="demo-ruleForm" label-position="left">
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="姓名：" prop="academy">
                            <el-input v-model="zqbg.xsxm"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="所在学院：" prop="title">
                            <el-input v-model="zqbg.yxqc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="入学年月：" prop="titleEng">
                            <el-input v-model="zqbg.rxny"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="所在学科：">
                            <el-input v-model="zqbg.xk"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="学号：" prop="thesisDate">
                            <el-input v-model="zqbg.xh"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="导师姓名：" prop="doctorDate">
                            <el-input v-model="zqbg.dsxm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="联系电话：" prop="researchDirection">
                            <el-input v-model="zqbg.dh"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="学位点所在学院：">
                            <el-input v-model="zqbg.xwdszxy"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="E-mail：" prop="firstLevel">
                            <el-input v-model="zqbg.yx"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="研究方向：" prop="firstLevel">
                            <el-input v-model="zqbg.yjfx"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="攻博类型：" prop="secondLevel">
                            <!-- <el-input v-model="zqbgsave.gblx"></el-input> -->
                            <el-radio-group v-model="zqbg.gblx">
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
                            <el-input v-model="zqbgsave.zzqssj"></el-input>
                            <!-- <el-date-picker v-model="zqbgsave.zzqssj" value-format="yyyy-MM-dd" type="daterange" range-separator="至"
                                start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker> -->
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="拟申请学位时间：" prop="tutorRD">
                            <el-input v-model="zqbgsave.nsqxwsj"></el-input>
                            <!-- <el-date-picker v-model="zqbgsave.nsqxwsj" value-format="yyyy-MM-dd" type="daterange" range-separator="至"
                                start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker> -->
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="学位论文题目：" prop="tutorName">
                            <el-input v-model="zqbg.ndxwlwtm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="zqbgsave.blzzyjgzzj" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="本轮资助研究工作总结（与资助前情况进行对比，对照申请时提出的研究目标，预期成果等，对资助期间工作进行整体总结，包括受资助后研究进展情况，存在问题，原因及对策等）">
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
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table border :data="zqbgsave.gnwfbxslw" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">

                                <el-table-column label="在国内外重要学术刊物上发表与博士学位论文有关的学术论文" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" width="70" align="center">
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
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(1)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(1)" class="plus"></el-button>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table border :data="zqbgsave.yxwygyjcg" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">

                                <el-table-column label="与学位论文有关的其它研究成果（获奖成果或专利）" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" width="70" align="center">
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
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(2)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(2)" class="plus"></el-button>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table :data="zqbgsave.yxwygzz" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                <el-table-column label="与学位论文成果有关的专著" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" width="70" align="center">
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
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(3)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(3)" class="plus"></el-button>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table :data="zqbgsave.blzzqnyqwcqk" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                <el-table-column label="本轮资助期内预期目标完成情况" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" width="70" align="center">
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
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(4)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(4)" class="plus"></el-button>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="zqbgsave.hxgzjhjyqcg" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="后续工作计划及预期成果">
                        </el-input>
                    </el-col>
                </el-row>

                <!-- 添加附件 -->
                <div class="append-btn">
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
                </div>
                <!-- 提交重置 -->
                <div class="submit-box">
                    <el-button type="primary" @click="saveMsg2" class="submit-btn">保存</el-button>
                    <el-button :loading="this.loading" type="primary" @click="applySubmit2" class="submit-btn" :disabled="onsuccess2">{{ submit }}</el-button>
                </div>
            </el-form>
        </div>
        <!-- 总结报告初始化 -->
        <div class="container" v-show="!showTable3">
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

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="资助起始时间：" prop="secondLevelName">
                            <!-- <el-input v-model="zjbgsave.zzqssj"></el-input> -->
                            <el-date-picker v-model="zjbgsave.sj" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="zjbgsave.xwlwyjgzzj" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="学位论文研究工作总结（与资助前情况进行对比，对照申请时提出的研究目标，预期成果等，对资助期间工作进行整体总结，包括受资助后研究进展情况，存在问题，原因及对策等）">
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
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table border :data="zjbgsave.gnwfbxslw" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">

                                <el-table-column label="在国内外重要学术刊物上发表与博士学位论文有关的学术论文" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" width="70" align="center">
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
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(5)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(5)" class="plus"></el-button>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table border :data="zjbgsave.yxwygyjcg" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">

                                <el-table-column label="与学位论文有关的其它研究成果（获奖成果或专利）" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" width="70" align="center">
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
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(6)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(6)" class="plus"></el-button>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table :data="zjbgsave.yxwygzz" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                <el-table-column label="与学位论文成果有关的专著" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" width="70" align="center">
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
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(7)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(7)" class="plus"></el-button>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table :data="zjbgsave.blzzqnyqwcqk" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                <el-table-column label="本轮资助期内预期目标完成情况" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" width="70" align="center">
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
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(8)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(8)" class="plus"></el-button>
                    </el-col>
                </el-row>

                <!-- 添加附件 -->
                <div class="append-btn">
                    <el-upload class="upload-demo" :action="baseUrls" :on-progress="progress3" :on-preview="handlePreview" :on-remove="handleRemove3" :before-remove="beforeRemove" :on-success="handleSuccess3" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList3">
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

                <div class="submit-box">
                    <el-button type="primary" @click="saveMsg3" class="submit-btn">保存</el-button>
                    <el-button :loading="this.loading" type="primary" @click="applySubmit3" class="submit-btn" :disabled="onsuccess3">{{ submit }}</el-button>
                </div>
            </el-form>
        </div>
        <!-- 中期报告详情 -->
        <div class="container" v-show="!showDetail2">
            <el-row>
                <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                    <div class="small"></div>
                    <span>报告人基本信息</span>
                    <div class="close" @click="close4"> X </div>
                </el-col>
            </el-row>
            <!-- 项目表单 -->
            <el-form :model="zqbgsave" :rules="rules" ref="quaApply" label-width="177px" class="demo-ruleForm" label-position="left">
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="姓名：" prop="academy">
                            <el-input v-model="zqbgsave.xsxm"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="所在学院：" prop="title">
                            <el-input v-model="zqbgsave.yxqc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="入学年月：" prop="titleEng">
                            <el-input v-model="zqbgsave.rxny"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="所在学科：">
                            <el-input v-model="zqbgsave.yjxk"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="学号：" prop="thesisDate">
                            <el-input v-model="zqbgsave.xh"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="导师姓名：" prop="doctorDate">
                            <el-input v-model="zqbgsave.dsxm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="联系电话：" prop="researchDirection">
                            <el-input v-model="zqbgsave.dh"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="学位点所在学院：">
                            <el-input v-model="zqbgsave.yxqc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="E-mail：" prop="firstLevel">
                            <el-input v-model="zqbgsave.yx"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="研究方向：" prop="firstLevel">
                            <el-input v-model="zqbgsave.yjfx"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="攻博类型：" prop="secondLevel">
                            <!-- <el-input v-model="zqbgsave.gblx"></el-input> -->
                            <el-radio-group v-model="zqbgsave.gblx">
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
                            <el-input v-model="zqbgsave.zzqssj"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="拟申请学位时间：" prop="tutorRD">
                            <el-input v-model="zqbgsave.nsqxwsj"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="学位论文题目：" prop="tutorName">
                            <el-input v-model="zqbgsave.ndxwlwtm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="zqbgsave.blzzyjgzzj" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="本轮资助研究工作总结（与资助前情况进行对比，对照申请时提出的研究目标，预期成果等，对资助期间工作进行整体总结，包括受资助后研究进展情况，存在问题，原因及对策等）">
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
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table border :data="zqbgsave.gnwfbxslw" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">

                                <el-table-column label="在国内外重要学术刊物上发表与博士学位论文有关的学术论文" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" width="70" align="center">
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
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(1)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(1)" class="plus"></el-button>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table border :data="zqbgsave.yxwygyjcg" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">

                                <el-table-column label="与学位论文有关的其它研究成果（获奖成果或专利）" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" width="70" align="center">
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
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(2)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(2)" class="plus"></el-button>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table :data="zqbgsave.yxwygzz" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                <el-table-column label="与学位论文成果有关的专著" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" width="70" align="center">
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
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(3)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(3)" class="plus"></el-button>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table :data="zqbgsave.blzzqnyqwcqk" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                <el-table-column label="本轮资助期内预期目标完成情况" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" width="70" align="center">
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
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(4)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(4)" class="plus"></el-button>
                    </el-col>
                </el-row>

                <!-- <el-row :gutter="30">
                <el-col :span="22">
                    <el-form-item label="附件：" prop="">
                        <a :href="item.url" v-for="item in zqbgsave.fj" class="fj">
                            <i class="el-icon-document"></i>
                            {{item.name}}<br/>
                        </a>
                    </el-form-item>    
                </el-col>
            </el-row> -->
                <!-- 添加附件 -->
                <div class="append-btn">
                    <el-upload class="upload-demo" :action="baseUrls" :on-progress="progress2" :on-preview="handlePreview" :on-remove="handleRemove2" :before-remove="beforeRemove" :on-success="handleSuccess2" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList2">
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
                    <el-button type="primary" @click="saveMsg4" class="submit-btn">保存</el-button>
                    <!-- <el-button type="primary" @click="applySave" class="submit-btn">保存</el-button>
                    <el-button type="primary" @click="reset" class="submit-btn">重置</el-button> -->
                    <el-button type="danger" @click="handleCancel2" class="submit-btn">取消</el-button>
                    <el-button :loading="this.loading" type="primary" @click="changeSubmit2" class="submit-btn" :disabled="onsuccess2">{{ submit }}</el-button>
                </div>
            </el-form>
        </div>
        <!-- 总结报告详情 -->
        <div class="container" v-show="!showDetail3">
            <el-row>
                <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                    <div class="small"></div>
                    <span>报告人基本信息</span>
                    <div class="close" @click="close5"> X </div>
                </el-col>
            </el-row>

            <el-form :model="zjbgsave" :rules="rules" ref="quaApply" label-width="177px" class="demo-ruleForm" label-position="left">
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="姓名：" prop="academy">
                            <el-input v-model="zjbgsave.xsxm"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="所在学院：" prop="title">
                            <el-input v-model="zjbgsave.yxqc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="入学年月：" prop="titleEng">
                            <el-input v-model="zjbgsave.rxny"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="所在学科：">
                            <el-input v-model="zjbgsave.xk"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="学号：" prop="thesisDate">
                            <el-input v-model="zjbgsave.xh"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="导师姓名：" prop="doctorDate">
                            <el-input v-model="zjbgsave.dsxm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="联系电话：" prop="researchDirection">
                            <el-input v-model="zjbgsave.dh"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="学位点所在学院：">
                            <el-input v-model="zjbgsave.xwdszxy"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="E-mail：" prop="firstLevel">
                            <el-input v-model="zjbgsave.yx"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="研究方向：" prop="firstLevel">
                            <el-input v-model="zjbgsave.yjfx"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="攻博类型：" prop="secondLevel">
                            <!-- <el-input v-model="zjbgsave.gblx"></el-input> -->
                            <el-radio-group v-model="zjbgsave.gblx">
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
                            <el-date-picker v-model="zjbgsave.sj" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="学位论文题目：" prop="tutorName">
                            <el-input v-model="zjbgsave.ndxwlwtm"></el-input>
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
                        <el-input v-model="zjbgsave.xwlwyjgzzj" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="学位论文研究工作总结（与资助前情况进行对比，对照申请时提出的研究目标，预期成果等，对资助期间工作进行整体总结，包括受资助后研究进展情况，存在问题，原因及对策等）">
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
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table border :data="zjbgsave.gnwfbxslw" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">

                                <el-table-column label="在国内外重要学术刊物上发表与博士学位论文有关的学术论文" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" width="70" align="center">
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
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(5)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(5)" class="plus"></el-button>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table border :data="zjbgsave.yxwygyjcg" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">

                                <el-table-column label="与学位论文有关的其它研究成果（获奖成果或专利）" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" width="70" align="center">
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
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(6)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(6)" class="plus"></el-button>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table :data="zjbgsave.yxwygzz" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                <el-table-column label="与学位论文成果有关的专著" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" width="70" align="center">
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
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(7)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(7)" class="plus"></el-button>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="20">
                        <div class="table-data">
                            <el-table :data="zjbgsave.blzzqnyqwcqk" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                <el-table-column label="本轮资助期内预期目标完成情况" align="center" style="width: 100%;text-align: center">
                                    <el-table-column prop="num" label="序号" width="70" align="center">
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
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(8)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(8)" class="plus"></el-button>
                    </el-col>
                </el-row>

                <!-- <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="附件：" prop="">
                            <a :href="item.url" v-for="item in zjbgsave.fj" class="fj" :key="item">
                                <i class="el-icon-document"></i>
                                {{item.name}}<br />
                            </a>
                        </el-form-item>
                    </el-col>
                </el-row> -->
                <!-- 添加附件 -->
                <div class="append-btn">
                    <el-upload class="upload-demo" :action="baseUrls" :on-progress="progress3" :on-preview="handlePreview" :on-remove="handleRemove3" :before-remove="beforeRemove" :on-success="handleSuccess3" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList3">
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
                    <el-button type="primary" @click="saveMsg5" class="submit-btn">保存</el-button>
                    <!-- <el-button type="primary" @click="applySave" class="submit-btn">保存</el-button>
                    <el-button type="primary" @click="reset" class="submit-btn">重置</el-button> -->
                    <el-button type="danger" @click="handleCancel3" class="submit-btn">取消</el-button>
                    <el-button :loading="this.loading" type="primary" @click="changeSubmit3" class="submit-btn" :disabled="onsuccess3">{{ submit }}</el-button>
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
      sfzq: "", //判断中期报告和总结报告能否继续填写
      tableTime: "", //列表结束时间
      changeTime: "", //修改当前时间
      subTime: "", //提交当前时间
      onsuccess1: false,
      onsuccess2: false,
      onsuccess3: false,
      submit: "提交",
      loading: false, //显示正在加载中动画开关
      fileList1: [], //上传文件列表展示
      fileList2: [], //上传文件列表展示
      fileList3: [], //上传文件列表展示
      showTable: true, //展示列表开关
      showTable1: true, //优博项目展示列表开关
      showTable2: true, //优博中期报告展示列表开关
      showTable3: true, //优博总结报告展示列表开关
      showDetail2: true, //中期报告详情开关
      showDetail3: true, //总结报告详情开关

      dataList: [],
      zt: "",
      zqzt: "", //中期状态
      zjzt: "", //总结状态
      zqid: "", //中期id
      zjid: "", //总结id
      id: "",
      lcid: "", //流程id
      zqlcid: "", //中期流程id
      zjlcid: "", //总结流程id
      seeVisible: false, //审核流程图显示开关
      his: [], //弹窗：审核信息
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
      //优博项目
      ybxm: {
        fj: [
          // name: '',
          // url: ''
        ],
        zclwkyxm: [
          {
            num: 1,
            kyxmmc: "",
            xmly: "",
            xmjf: "",
            xmfzr: "",
            editFlag: false,
            tableNum: ""
          }
        ],
        zdbssyxlwqk: [
          {
            num: 1,
            nf: "",
            xm: "",
            xh: "",
            zy: "",
            yydj: "",
            editFlag: false,
            tableNum: ""
          }
        ],
        zdbsschybpyqk: [
          {
            num: 1,
            nf: "",
            xm: "",
            xh: "",
            zy: "",
            sfxy: "",
            yqmb: "",
            editFlag: false,
            tableNum: ""
          }
        ]
      },
      zqbg: [], //中期报告初始化
      zjbg: [], //总结报告初始化
      zqbgDetail: [], //中期报告查看详情
      zjbgDetail: [], //总结报告查看详情
      //中期报告提交
      zqbgsave: {
        xh: "",
        xmid: "",
        gblx: "",
        zzqssj: "",
        nsqxwsj: "",
        //   xwlutm: '',
        blzzyjgzzj: "",
        gnwfbxslw: [
          {
            num: 1,
            lwtm: "",
            mrpm: "",
            kwmc: "",
            fbsj: "",
            kwjb: "",
            yxyz: "",
            editFlag: false,
            tableNum: 1
          }
        ],
        yxwygyjcg: [
          {
            num: 1,
            zlmc: "",
            bjbm: "",
            zlh: "",
            hjsj: "",
            brpm: "",
            editFlag: false,
            tableNum: 2
          }
        ],
        yxwygzz: [
          {
            num: 1,
            zzmc: "",
            cbdw: "",
            cbsj: "",
            zs: "",
            brpm: "",
            editFlag: false,
            tableNum: 3
          }
        ],
        blzzqnyqwcqk: [
          {
            num: 1,
            yqcg: "",
            wcqk: "",
            qksm: "",
            editFlag: false,
            tableNum: 4
          }
        ],
        hxgzjhjyqcg: "",
        fj: []
      },
      //总结报告提交
      zjbgsave: {
        xh: "",
        xmid: "",
        gblx: "",
        sj: "",
        nsqxwsj: "",
        //   xwlutm: '',
        xwlwyjgzzj: "",
        gnwfbxslw: [
          {
            num: 1,
            lwtm: "",
            mrpm: "",
            kwmc: "",
            fbsj: "",
            kwjb: "",
            yxyz: "",
            editFlag: false,
            tableNum: 5
          }
        ],
        yxwygyjcg: [
          {
            num: 1,
            zlmc: "",
            bjbm: "",
            zlh: "",
            hjsj: "",
            brpm: "",
            editFlag: false,
            tableNum: 6
          }
        ],
        yxwygzz: [
          {
            num: 1,
            zzmc: "",
            cbdw: "",
            cbsj: "",
            zs: "",
            brpm: "",
            editFlag: false,
            tableNum: 7
          }
        ],
        blzzqnyqwcqk: [
          {
            num: 1,
            yqcg: "",
            wcqk: "",
            qksm: "",
            editFlag: false,
            tableNum: 8
          }
        ],
        hxgzjhjyqcg: "",
        fj: []
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
      if (this.has("stuybpyxm:selectListForService")) {
        this.$http
          .get(this.$server.glourl + "stuybpyxm/selectListForService", {
            params: this.pageHelp
          })
          .then(response => {
            const data = response.data;
            this.dataList = data.page.list;
            // this.zqid = data.page.list[0].zqid
            // console.log(this.dataList)
            this.pageList = data.page;
          });
      } else {
        console.log();
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
    // 文件上传成功时的钩子
    handleSuccess1(response, file, fileList) {
      this.ybxm.fj.push({ name: response.name, url: response.url });
      this.onsuccess1 = false;
    },
    handleRemove1(file, fileList) {
      this.onsuccess1 = false;
      this.fileList1 = fileList;
      this.ybxm.fj = this.fileList1;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSuccess2(response, file, fileList) {
      this.zqbgsave.fj.push({ name: response.name, url: response.url });
      this.onsuccess2 = false;
    },
    handleRemove2(file, fileList) {
      this.onsuccess2 = false;
      this.fileList2 = fileList;
      this.zqbgsave.fj = this.fileList2;
    },
    handleSuccess3(response, file, fileList) {
      this.zjbgsave.fj.push({ name: response.name, url: response.url });
      this.onsuccess3 = false;
    },
    progress1: function() {
      this.onsuccess1 = true;
    },
    progress2: function() {
      this.onsuccess2 = true;
    },
    progress3: function() {
      this.onsuccess3 = true;
    },
    handleRemove3(file, fileList) {
      this.onsuccess3 = false;
      this.fileList3 = fileList;
      this.zjbgsave.fj = this.fileList3;
    },
    close2() {
      this.showTable = true;
      this.showTable2 = true;
      this.loadTable();
    },
    close3() {
      this.showTable = true;
      this.showTable3 = true;
      this.loadTable();
    },
    close4() {
      this.showTable = true;
      this.showDetail2 = true;
      this.loadTable();
    },
    close5() {
      this.showTable = true;
      this.showDetail3 = true;
      this.loadTable();
    },
    // 选择表格行id
    handleSelectionChange(selection) {
    //   console.log(selection);
      if (selection.length == 0) {
        this.id = "";
        this.zt = "";
        this.zqzt = "";
        this.zjzt = "";
        this.zqbgsave.xmid = "";
        this.zjbgsave.xmid = "";
        this.tableTime = "";
        this.sfzq = "";
      } else {
        this.id = selection[0].id;
        this.zt = selection[0].zt;
        this.zqzt = selection[0].zqzt;
        this.zjzt = selection[0].zjzt;
        this.zqbgsave.xmid = selection[0].id;
        this.zjbgsave.xmid = selection[0].id;
        this.tableTime = selection[0].jssj;
        this.sfzq = selection[0].sfzq;
        // console.log(selection)
      }
    },
    //保存
    saveMsg1() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // this.jgxm.jfly = this.jfly.join()
      this.$http
        .post(this.$server.glourl + "stuybpyxm/saveforupdate", this.ybxm)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            // this.jfly = []
            this.showTable = true;
            this.showTable1 = true;
            this.loadTable();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //优博修改提交
    changeSubmit1() {
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
        // this.jgxm.jfly = this.jfly.join()
        this.$http
          .post(this.$server.glourl + "stuybpyxm/update", this.ybxm)
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
              this.showTable1 = true;
              this.loadTable();
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    //保存
    saveMsg4() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // this.jgxm.jfly = this.jfly.join()
      this.$http
        .post(this.$server.glourl + "stuybzqjzbg/saveforupdate", this.zqbgsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            // this.jfly = []
            this.showTable = true;
            this.showDetail2 = true;
            this.loadTable();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //中期报告修改提交
    changeSubmit2() {
      this.loading = true;
      this.submit = "加载中";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // this.jgxm.jfly = this.jfly.join()
      this.$http
        .post(this.$server.glourl + "stuybzqjzbg/update", this.zqbgsave)
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
            this.showDetail2 = true;
            this.loadTable();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //保存
    saveMsg5() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // this.jgxm.jfly = this.jfly.join()
      this.$http
        .post(this.$server.glourl + "stuybzjbg/saveforupdate", this.zjbgsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            // this.jfly = []
            this.showTable = true;
            this.showDetail3 = true;
            this.loadTable();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //总结报告修改提交
    changeSubmit3() {
      this.loading = true;
      this.submit = "加载中";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // this.jgxm.jfly = this.jfly.join()
      this.$http
        .post(this.$server.glourl + "stuybzjbg/update", this.zjbgsave)
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
            this.showDetail3 = true;
            this.loadTable();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 查看审核信息按钮函数
    handleProgress1(row) {
      this.lcid = row.lcid;
      this.$http
        .get(this.$server.glourl + "stucgbb/selectHisBuLcid?lcid=" + this.lcid)
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
        });
      this.seeVisible = true;
    },
    handleProgress2(row) {
      this.zqlcid = row.zqlcid;
      this.$http
        .get(
          this.$server.glourl + "stucgbb/selectHisBuLcid?lcid=" + this.zqlcid
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
        });
      this.seeVisible = true;
    },
    handleProgress3(row) {
      this.zjlcid = row.zjlcid;
      this.$http
        .get(
          this.$server.glourl + "stucgbb/selectHisBuLcid?lcid=" + this.zjlcid
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
        });
      this.seeVisible = true;
    },
    //改变时间格式
    changeDataType(time) {
      const date = new Date();
      date.setTime(time); // value通过截取字符串只取数字。
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    },
    //优博列表鼠标移入移出事件
    handleMouseEnter1(row, column, cell, event) {
      let num = row.num - 1;
      this.ybxm.zclwkyxm[num].editFlag = true;
    },
    handleMouseEnter2(row, column, cell, event) {
      let num = row.num - 1;
      this.ybxm.zdbsschybpyqk[num].editFlag = true;
    },
    handleMouseEnter3(row, column, cell, event) {
      let num = row.num - 1;
      this.ybxm.zdbssyxlwqk[num].editFlag = true;
    },
    handleMouseOut1(row, column, cell, event) {
      let num = row.num - 1;
      this.ybxm.zclwkyxm[num].editFlag = false;
    },
    handleMouseOut2(row, column, cell, event) {
      let num = row.num - 1;
      this.ybxm.zdbsschybpyqk[num].editFlag = false;
    },
    handleMouseOut3(row, column, cell, event) {
      let num = row.num - 1;
      this.ybxm.zdbssyxlwqk[num].editFlag = false;
    },
    addRow1() {
      this.ybxm.zclwkyxm.push({
        num: this.ybxm.zclwkyxm.length + 1,
        editFlag: false,
        tableNum: 3
      });
    },
    addRow2() {
      this.ybxm.zdbsschybpyqk.push({
        num: this.ybxm.zdbsschybpyqk.length + 1,
        editFlag: false,
        tableNum: 4
      });
    },
    addRow3() {
      this.ybxm.zdbssyxlwqk.push({
        num: this.ybxm.zdbssyxlwqk.length + 1,
        editFlag: false,
        tableNum: 5
      });
    },
    delRow1() {
      if (this.ybxm.zclwkyxm.length == 1) {
        return;
      }
      this.ybxm.zclwkyxm.pop();
    },
    delRow2() {
      if (this.ybxm.zdbsschybpyqk.length == 1) {
        return;
      }
      this.ybxm.zdbsschybpyqk.pop();
    },
    delRow3() {
      if (this.ybxm.zdbssyxlwqk.length == 1) {
        return;
      }
      this.ybxm.zdbssyxlwqk.pop();
    },
    //申请信息table鼠标经过事件
    handleMouseEnter(row, column, cell, event) {
      const tableIndex = row.tableNum;
      let num = row.num - 1;
      switch (tableIndex) {
        // 优博中期报告
        case 1:
          this.zqbgsave.gnwfbxslw[num].editFlag = true;
          break;
        case 2:
          this.zqbgsave.yxwygyjcg[num].editFlag = true;
          break;
        case 3:
          this.zqbgsave.yxwygzz[num].editFlag = true;
          break;
        case 4:
          this.zqbgsave.blzzqnyqwcqk[num].editFlag = true;
          break;
        // 优博总结报告
        case 5:
          this.zjbgsave.gnwfbxslw[num].editFlag = true;
          break;
        case 6:
          this.zjbgsave.yxwygyjcg[num].editFlag = true;
          break;
        case 7:
          this.zjbgsave.yxwygzz[num].editFlag = true;
          break;
        case 8:
          this.zjbgsave.blzzqnyqwcqk[num].editFlag = true;
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
        // 优博中期报告
        case 1:
          this.zqbgsave.gnwfbxslw[num].editFlag = false;
          break;
        case 2:
          this.zqbgsave.yxwygyjcg[num].editFlag = false;
          break;
        case 3:
          this.zqbgsave.yxwygzz[num].editFlag = false;
          break;
        case 4:
          this.zqbgsave.blzzqnyqwcqk[num].editFlag = false;
          break;
        // 优博总结报告
        case 5:
          this.zjbgsave.gnwfbxslw[num].editFlag = false;
          break;
        case 6:
          this.zjbgsave.yxwygyjcg[num].editFlag = false;
          break;
        case 7:
          this.zjbgsave.yxwygzz[num].editFlag = false;
          break;
        case 8:
          this.zjbgsave.blzzqnyqwcqk[num].editFlag = false;
          break;
        default:
          break;
      }
    },
    //申请表信息动态添加行
    addRow(tableIndex) {
      switch (tableIndex) {
        // 优博中期报告
        case 1:
          this.zqbgsave.gnwfbxslw.push({
            num: this.zqbgsave.gnwfbxslw.length + 1,
            editFlag: false,
            tableNum: 1
          });
          break;
        case 2:
          this.zqbgsave.yxwygyjcg.push({
            num: this.zqbgsave.yxwygyjcg.length + 1,
            editFlag: false,
            tableNum: 2
          });
          break;
        case 3:
          this.zqbgsave.yxwygzz.push({
            num: this.zqbgsave.yxwygzz.length + 1,
            editFlag: false,
            tableNum: 3
          });
          break;
        case 4:
          this.zqbgsave.blzzqnyqwcqk.push({
            num: this.zqbgsave.blzzqnyqwcqk.length + 1,
            editFlag: false,
            tableNum: 4
          });
          break;
        // 优博总结报告
        case 5:
          this.zjbgsave.gnwfbxslw.push({
            num: this.zjbgsave.gnwfbxslw.length + 1,
            editFlag: false,
            tableNum: 5
          });
          break;
        case 6:
          this.zjbgsave.yxwygyjcg.push({
            num: this.zjbgsave.yxwygyjcg.length + 1,
            editFlag: false,
            tableNum: 6
          });
          break;
        case 7:
          this.zjbgsave.yxwygzz.push({
            num: this.zjbgsave.yxwygzz.length + 1,
            editFlag: false,
            tableNum: 7
          });
          break;
        case 8:
          this.zjbgsave.blzzqnyqwcqk.push({
            num: this.zjbgsave.blzzqnyqwcqk.length + 1,
            editFlag: false,
            tableNum: 8
          });
          break;
        default:
          break;
      }
    },
    //申请信息动态减少行
    delRow(tableIndex) {
      switch (tableIndex) {
        // 优博中期报告
        case 1:
          if (this.zqbgsave.gnwfbxslw.length == 1) {
            return;
          }
          this.zqbgsave.gnwfbxslw.pop();
          break;
        case 2:
          if (this.zqbgsave.yxwygyjcg.length == 1) {
            return;
          }
          this.zqbgsave.yxwygyjcg.pop();
          break;
        case 3:
          if (this.zqbgsave.yxwygzz.length == 1) {
            return;
          }
          this.zqbgsave.yxwygzz.pop();
          break;
        case 4:
          if (this.zqbgsave.blzzqnyqwcqk.length == 1) {
            return;
          }
          this.zqbgsave.blzzqnyqwcqk.pop();
          break;
        // 优博总结报告
        case 5:
          if (this.zjbgsave.gnwfbxslw.length == 1) {
            return;
          }
          this.zjbgsave.gnwfbxslw.pop();
          break;
        case 6:
          if (this.zjbgsave.yxwygyjcg.length == 1) {
            return;
          }
          this.zjbgsave.yxwygyjcg.pop();
          break;
        case 7:
          if (this.zjbgsave.yxwygzz.length == 1) {
            return;
          }
          this.zjbgsave.yxwygzz.pop();
          break;
        case 8:
          if (this.zjbgsave.blzzqnyqwcqk.length == 1) {
            return;
          }
          this.zjbgsave.blzzqnyqwcqk.pop();
          break;
        default:
          break;
      }
    },
    // 中期报告初始化
    midtermReport() {
      //console.log(this.zt);
      if (this.id == null || this.id == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
      } else if (this.zt != "1") {
        this.$message({
          message: "请等待优博审核完成！",
          type: "error"
        });
      } else {
        if (this.sfzq == "0") {
          this.$message({
            message: "资助结束，无法填写中期报告！",
            type: "error"
          });
        } else {
          this.$http
            .get(
              this.$server.glourl + "stuybzqjzbg/selectZqjzbgInit?id=" + this.id
            )
            .then(response => {
              const data = response.data;
              this.zqbg = data.map;
            });
          this.showTable = false;
          this.showTable2 = false;
        }
      }
    },
    // 总结报告初始化
    summaryReport() {
      // console.log(this.zjzt);
      if (this.id == null || this.id == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
      } else {
        if (this.sfzq == "1") {
          this.$http
            .get(
              this.$server.glourl + "stuybzqjzbg/selectZqjzbgInit?id=" + this.id
            )
            .then(response => {
              const data = response.data;
              this.zjbg = data.map;
            });
          this.showTable = false;
          this.showTable3 = false;
        } else {
          this.$message({
            message: "未确定是否资助或资助已结束！",
            type: "error"
          });
        }
      }
    },
    saveMsg2() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$http
        .post(this.$server.glourl + "stuybzqjzbg/save", this.zqbgsave)
        .then(response => {
          //console.log(response.data);
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.reload();
            this.showTable = true;
            this.showTable2 = true;
            // this.loadTable()
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 中期报告提交
    applySubmit2() {
      this.loading = true;
      this.submit = "加载中";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$http
        .post(this.$server.glourl + "stuybzqjzbg/lcStart", this.zqbgsave)
        .then(response => {
          // console.log(response.data);
          if (response.data.code == 0) {
            this.$message({
              message: "提交成功！",
              type: "success"
            });
            this.loading = false;
            this.submit = "提交";
            this.reload();
            this.showTable = true;
            this.showTable2 = true;
            // this.loadTable()
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //保存
    saveMsg3() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$http
        .post(this.$server.glourl + "stuybzjbg/save", this.zjbgsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.reload();
            // this.zjbgsave = ''
            this.showTable = true;
            this.showTable3 = true;
            // this.loadTable()
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 总结报告提交
    applySubmit3() {
      this.loading = true;
      this.submit = "加载中";
      // console.log(this.zjbgsave)
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$http
        .post(this.$server.glourl + "stuybzjbg/lcStart", this.zjbgsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "提交成功！",
              type: "success"
            });
            this.loading = false;
            this.submit = "提交";
            this.reload();
            // this.zjbgsave = ''
            this.showTable = true;
            this.showTable3 = true;
            // this.loadTable()
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 中期报告查看详情
    handleSee2(row) {
      this.zqid = row.zqid;
      this.zqzt = row.zqzt;
      // console.log(row.zqid)
      if (this.zqid == null || this.zqid == "") {
        this.$message({
          message: "请填写中期报告！",
          type: "error"
        });
      } else if (this.zqzt != 4 && this.zqzt != 5) {
        this.$message({
          message: "只能修改退回或未提交的信息！",
          type: "error"
        });
      } else {
        this.$http
          .get(
            this.$server.glourl + "stuybzqjzbg/selectInfoById?id=" + this.zqid
          )
          .then(response => {
            this.zqbgsave = response.data.map;
            // 附件展示，需要解析成对象
            this.zqbgsave.fj = JSON.parse(response.data.map.fj);
            this.fileList2 = this.zqbgsave.fj;
            this.zqbgsave.gnwfbxslw = JSON.parse(response.data.map.gnwfbxslw);
            this.zqbgsave.yxwygyjcg = JSON.parse(response.data.map.yxwygyjcg);
            this.zqbgsave.yxwygzz = JSON.parse(response.data.map.yxwygzz);
            this.zqbgsave.blzzqnyqwcqk = JSON.parse(
              response.data.map.blzzqnyqwcqk
            );
            // console.log(this.ybxm)
          });
        this.showTable = false;
        this.showDetail2 = false;
      }
    },
    // 总结报告查看详情
    handleSee3(row) {
      this.zjid = row.zjid;
      this.zjzt = row.zjzt;
      // console.log(this.zjid)
      if (this.zjid == null || this.zjid == "") {
        this.$message({
          message: "请填写总结报告！",
          type: "error"
        });
        return;
      } else if (this.zjzt != 4 && this.zjzt != 5) {
        this.$message({
          message: "只能修改退回或未提交的信息！",
          type: "error"
        });
      } else {
        this.$http
          .get(this.$server.glourl + "stuybzjbg/selectInfoById?id=" + this.zjid)
          .then(response => {
            this.zjbgsave = response.data.map;
            // 附件展示，需要解析成对象
            this.zjbgsave.fj = JSON.parse(response.data.map.fj);
            this.fileList3 = this.zjbgsave.fj;
            this.zjbgsave.gnwfbxslw = JSON.parse(response.data.map.gnwfbxslw);
            this.zjbgsave.yxwygyjcg = JSON.parse(response.data.map.yxwygyjcg);
            this.zjbgsave.yxwygzz = JSON.parse(response.data.map.yxwygzz);
            this.zjbgsave.blzzqnyqwcqk = JSON.parse(
              response.data.map.blzzqnyqwcqk
            );
          });
        this.showTable = false;
        this.showDetail3 = false;
      }
    },
    // 优博培育查看详情
    handleSee1(row) {
      this.tableTime = row.jssj;
      this.changeTime = new Date().getTime();
      this.id = row.id;
      this.zt = row.zt;
      if (this.zt != 4 && this.zt != 5) {
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
        } else {
          this.$http
            .get(this.$server.glourl + "stuybpyxm/selectInfoById?id=" + this.id)
            .then(response => {
              this.ybxm = response.data.stuYbpyxm;
              // 附件展示，需要解析成对象
              this.ybxm.fj = JSON.parse(response.data.stuYbpyxm.fj);
              this.fileList1 = this.ybxm.fj;
              this.ybxm.zdbsschybpyqk = JSON.parse(
                response.data.stuYbpyxm.zdbsschybpyqk
              );
              this.ybxm.zdbssyxlwqk = JSON.parse(
                response.data.stuYbpyxm.zdbssyxlwqk
              );
              this.ybxm.zclwkyxm = JSON.parse(response.data.stuYbpyxm.zclwkyxm);
              // console.log(this.ybxm)
            });
          this.showTable = false;
          this.showTable1 = false;
        }
      }
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
@import "../../style/common"; //必须加分号，不然会报错
@import "../../style/ele";
</style>
