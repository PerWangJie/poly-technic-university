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

                    <el-table-column prop="kcmc" label="课程名称" align="center">
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
            <el-row>
                <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                    <div class="small"></div>
                    <span>课程总体情况</span>
                    <div class="close" @click="close"> X </div>
                </el-col>
            </el-row>
            <el-form :model="hxkcxm" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="课程名称：">
                            <el-input v-model="hxkcxm.kcmc"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="所属学科：" prop="gender">
                            <el-input v-model="hxkcxm.ssxk"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="课程起始设立学期：" prop="spell">
                            <el-input v-model="hxkcxm.qsslxq"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="课程负责人：" prop="nativePlace">
                            <el-input v-model="hxkcxm.xm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="课程性质：" prop="nativePlace">
                            <el-radio-group v-model="hxkcxm.kcxz">
                                <el-radio label="0">学位课</el-radio>
                                <el-radio label="1">专业选修课</el-radio>
                                <el-radio label="2">全校性通识课</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="课程层次：" prop="nativePlace">
                            <el-radio-group v-model="hxkcxm.kccc">
                                <el-radio label="0">硕士课程</el-radio>
                                <el-radio label="1">博士课程</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="课程类型：" prop="spell">
                            <el-radio-group v-model="hxkcxm.kclb">
                                <el-radio label="0">全英文课程</el-radio>
                                <el-radio label="1">双语课程</el-radio>
                                <el-radio label="2">中文课程</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="近三年年均修读研究生人数：" prop="spell">
                            <el-input v-model="hxkcxm.jdyjsrs"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>课程负责人情况</span>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="姓名：">
                            <el-input v-model="hxkcxm.xm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="性别：" prop="gender">
                            <el-input v-model="hxkcxm.xbm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="出生年月：" prop="nativePlace">
                            <el-input v-model="hxkcxm.csrq"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="所在学院：" prop="spell">
                            <el-input v-model="hxkcxm.yxqc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="职称：" prop="nativePlace">
                            <el-input v-model="hxkcxm.zc"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="职务：" prop="spell">
                            <el-input v-model="hxkcxm.zw"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="专业：" prop="nativePlace">
                            <el-input v-model="hxkcxm.zy"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="学位：" prop="spell">
                            <el-input v-model="hxkcxm.zgxw"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="联系电话：" prop="nativePlace">
                            <el-input v-model="hxkcxm.yddh"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="hxkcxm.kcszjs" type="textarea" :rows="8" placeholder="课程设置、建设与改革自述（包括研究生课程体系要求、在学位点培养方案中的角色、课程的受益面等）">
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="hxkcxm.tlkcjxgk" type="textarea" :rows="8" placeholder="近三年来，国内外同类教学课程概况">
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="hxkcxm.jxyjgzzycg" type="textarea" :rows="8" placeholder="该课程已开展的教学研究工作与成果">
                        </el-input>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>课程教学情况</span>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="hxkcxm.jcjsqk" type="textarea" :rows="8" placeholder="教材建设情况（包括选用或自编教材、配套教材、教学指导书、教学参考书和数学课件）">
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="hxkcxm.jxmsjxff" type="textarea" :rows="8" placeholder="教学模式、教学方法及实践教学（包括能否有利于促进学生自主性学习、研究性学习和个性发展，教学过程能否有利于学生综合素质的提高、有利于培养学生的创新思维、科研实践能力和有利于激发学生的创造力）">
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="hxkcxm.jxsd" type="textarea" :rows="8" placeholder="教学手段（包括是否在课程建设中积极营造数字化、信息化环境和外语教学环境，网络教学和网上教学资源的开发与建设情况）">
                        </el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :sapn='24' style="margin-top:25px;line-height:50px">
                        <div class="small"></div>
                        <span>师资队伍情况</span>
                    </el-col>
                </el-row>

                <!-- <el-row>
            <el-col :span='20'>
                <div class="table-data">
                <el-table
                    border
                    cell-style="padding:0px"
                    row-style="height:50px;"
                    :data="hxkcxm.kcfzrqk"
                    @cell-mouse-enter="handleMouseEnter"
                    @cell-mouse-leave="handleMouseOut">
                    <el-table-column label="课程负责人情况" align="center">
                        <el-table-column label="序号" align="center" width="80" prop="num">
                        </el-table-column>
                        <el-table-column prop="xm" label="姓名" align="center">
                            <template slot-scope="scope">
                                <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xm" placeholder="请输入内容" />
                                <span v-show="!scope.row.editFlag">{{scope.row.xm}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="xb" label="性别" align="center">
                            <template slot-scope="scope">
                                <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xb" placeholder="请输入内容" />
                                <span v-show="!scope.row.editFlag">{{scope.row.xb}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="csrq" label="出生年月" align="center">
                            <template slot-scope="scope">
                                <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.csrq" placeholder="请输入内容" />
                                <span v-show="!scope.row.editFlag">{{scope.row.csrq}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="szxy" label="所在学院" align="center">
                            <template slot-scope="scope">
                                <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.szxy" placeholder="请输入内容" />
                                <span v-show="!scope.row.editFlag">{{scope.row.szxy}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="zc" label="职称" align="center">
                            <template slot-scope="scope">
                                <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zc" placeholder="请输入内容" />
                                <span v-show="!scope.row.editFlag">{{scope.row.zc}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="zw" label="职务" align="center">
                            <template slot-scope="scope">
                                <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zw" placeholder="请输入内容" />
                                <span v-show="!scope.row.editFlag">{{scope.row.zw}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="zy" label="专业" align="center">
                            <template slot-scope="scope">
                                <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zy" placeholder="请输入内容" />
                                <span v-show="!scope.row.editFlag">{{scope.row.zy}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="xw" label="学位" align="center">
                            <template slot-scope="scope">
                                <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xw" placeholder="请输入内容" />
                                <span v-show="!scope.row.editFlag">{{scope.row.xw}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="dh" label="联系电话" align="center">
                            <template slot-scope="scope">
                                <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.dh" placeholder="请输入内容" />
                                <span v-show="!scope.row.editFlag">{{scope.row.dh}}</span>
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table>
                </div>
            </el-col>
        </el-row> -->
                <el-row>
                    <el-col :span='20'>
                        <div class="table-data">
                            <el-table border cell-style="padding:0px" row-style="height:50px;" :data="hxkcxm.zyjxgzjl" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                <el-table-column label="主要教学工作经历" align="center">
                                    <el-table-column prop="num" label="序号" align="center" width="70">
                                    </el-table-column>
                                    <el-table-column prop="sj" label="时间" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.sj" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.sj}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="kcmc" label="课程名称" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.kcmc" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.kcmc}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="skdx" label="授课对象" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.skdx" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.skdx}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="xs" label="学时" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xs" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.xs}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="dw" label="单位" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.dw" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.dw}}</span>
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

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="hxkcxm.jsnzyjxyj" type="textarea" :rows="8" placeholder="与本项目相关的近三年主要教学研究和科研成果（注明项目来源、成果名称、成果形式、发表刊物或出版单位、发表或出版时间、获奖情况）：">
                        </el-input>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span='20'>
                        <div class="table-data">
                            <el-table border cell-style="padding:0px" row-style="height:50px;" :data="hxkcxm.kczcyqk" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                <el-table-column label="课程组成员情况" align="center">
                                    <el-table-column prop="num" label="序号" align="center" width="70">
                                    </el-table-column>
                                    <el-table-column prop="xm" label="姓名" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xm" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.xm}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="xb" label="性别" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xb" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.xb}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="xlxw" label="学历、学位" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xlxw" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.xlxw}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="zc" label="职称" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zc" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.zc}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="zy" label="专业" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zy" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.zy}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="ssxy" label="所属学院" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.ssxy" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.ssxy}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="zjjs" label="是否是主讲教师" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zjjs" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.zjjs}}</span>
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

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="hxkcxm.kczcyjx" type="textarea" :rows="8" placeholder="课题组成员的教学及科研成果：">
                        </el-input>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :sapn='24' style="margin-top:25px;line-height:50px">
                        <div class="small"></div>
                        <span>课程建设规划</span>
                    </el-col>
                </el-row>
                <!-- <el-form :model="teacher" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left"> -->
                <el-row>
                    <el-col :span='23'>
                        <el-form-item label="课程建设的期限：" label-width="200px">
                            <el-date-picker v-model="hxkcxm.sj" value-format="yyyy-MM-dd" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='23'>
                        <el-form-item label="本课程建设目标和预期成果：" label-width="200px">
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="hxkcxm.jsmbhyqcg" type="textarea" :rows="8" placeholder="（必需包括“建立并完善本课程网站”和“制作和完善电子课件”等）">
                        </el-input>
                    </el-col>
                </el-row>
                <el-row style="padding-top:20px">
                    <el-col :span='23'>
                        <el-form-item label="课程建设的措施及条件保障：" label-width="200px">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="hxkcxm.kjjscsjtjbz" type="textarea" :rows="8" placeholder="（需包括“分析课程存在的不足之处，制定课程建设的详细计划”等）">
                        </el-input>
                    </el-col>
                </el-row>

                <!-- </el-form> -->
                <el-row>
                    <el-col :span='20'>
                        <div class="table-data">
                            <el-table border cell-style="padding:0px" row-style="height:50px;" :data="hxkcxm.jfys" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                <el-table-column label="经费预算（单位：万元）" align="center">
                                    <el-table-column prop="num" label="序号" align="center" width="70">
                                    </el-table-column>
                                    <el-table-column prop="sj" label="时间" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.sj" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.sj}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="jfys" label="经费预算" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.jfys" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.jfys}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="yt" label="用途" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.yt" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.yt}}</span>
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
                <!-- 附件展示 -->
                <!-- <el-row :gutter="30">
            <el-col :span="22">
                <el-form-item label="附件：" prop="">
                    <a :href="item.url" v-for="item in hxkcxm.fj" class="fj">
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
                        <!-- <el-col :span="12">
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-col> -->
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
      id: "",
      lcid: "", //流程id
      zt: "",
      seeVisible: false, //审核流程图显示开关
      his: [], //审核记录相关
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
      // 核心课程项目
      hxkcxm: {
        fj: [
          // name: '',
          // url: ''
        ],
        kcfzrqk: [
          {
            num: "",
            xm: "",
            xb: "",
            csrq: "",
            szxy: "",
            zc: "",
            zw: "",
            zy: "",
            xw: "",
            dh: "",
            editFlag: false,
            tableNum: ""
          }
        ],
        zyjxgzjl: [
          {
            num: 1,
            sj: "",
            kcmc: "",
            skdx: "",
            xs: "",
            dw: "",
            xw: "",
            editFlag: false,
            tableNum: 6
          }
        ],
        kczcyqk: [
          {
            num: 1,
            xm: "",
            xlxw: "",
            zc: "",
            zy: "",
            ssxy: "",
            zjjs: "",
            editFlag: false,
            tableNum: 7
          }
        ],
        jfys: [
          {
            num: 1,
            sj: "",
            jfys: "",
            yt: "",
            editFlag: false,
            tableNum: 8
          }
        ]
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
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
    loadTable() {
      if (this.has("teahxkcxm:list2")) {
        this.$http
          .get(this.$server.glourl + "teahxkcxm/list2", {
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
    //列表下载按钮
    download(lcid, zt) {
      if (zt == "1") {
        location.href = this.$server.glourl + "teahxkcxm/downWord?lcid=" + lcid;
      } else {
        this.$message({
          message: "审核未通过！",
          type: "error"
        });
      }
    },
    // 文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
      this.hxkcxm.fj.push({ name: response.name, url: response.url });
      this.onsuccess = false;
    },
    progress: function() {
      this.onsuccess = true;
    },
    handleRemove(file, fileList) {
      this.onsuccess = false;
      this.fileList = fileList;
      this.hxkcxm.fj = this.fileList;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //保存
    saveMsg() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // this.jgxm.jfly = this.jfly.join()
      this.$http
        .post(this.$server.glourl + "teahxkcxm/saveforupdate", this.hxkcxm)
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
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        // this.jgxm.jfly = this.jfly.join()
        this.$http
          .post(this.$server.glourl + "teahxkcxm/update", this.hxkcxm)
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
    // 查看详情（点击修改按钮）
    handleSee() {
      this.changeTime = new Date().getTime();
      if (this.id == null || this.id == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
        return;
      }  else if (this.zt != 4 && this.zt != 5) {
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
            .get(this.$server.glourl + "teahxkcxm/selectInfoById?id=" + this.id)
            .then(response => {
              this.hxkcxm = response.data.hxkc;
              if (response.data.hxkc == "1") {
                this.hxkcxm.xbm = "男";
              } else {
                this.hxkcxm.xbm = "女";
              }
              //console.log(response.data.hxkc);
              // 附件展示，需要解析成对象
              this.hxkcxm.fj = JSON.parse(response.data.hxkc.fj);
              this.fileList = this.hxkcxm.fj;
              // console.log(this.hxkcxm.fj)
              this.hxkcxm.zyjxgzjl = JSON.parse(response.data.hxkc.zyjxgzjl);
              // this.hxkcxm.zyjxgzjl = JSON.parse(JSON.stringify(response.data.hxkc.zyjxgzjl))
              this.hxkcxm.kczcyqk = JSON.parse(response.data.hxkc.kczcyqk);
              this.hxkcxm.jfys = JSON.parse(response.data.hxkc.jfys);
              // console.log(this.hxkcxm.zyjxgzjl)
            });
          this.showTable = false;
        }
      }
    },
    //申请信息table鼠标经过事件
    handleMouseEnter(row, column, cell, event) {
      // console.log(row)
      const tableIndex = row.tableNum;
      let num = row.num - 1;
      switch (tableIndex) {
        // 核心课程
        case 6:
          this.hxkcxm.zyjxgzjl[num].editFlag = true;
          break;
        case 7:
          this.hxkcxm.kczcyqk[num].editFlag = true;
          break;
        case 8:
          this.hxkcxm.jfys[num].editFlag = true;
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
        // 核心课程
        case 6:
          this.hxkcxm.zyjxgzjl[num].editFlag = false;
          break;
        case 7:
          this.hxkcxm.kczcyqk[num].editFlag = false;
          break;
        case 8:
          this.hxkcxm.jfys[num].editFlag = false;
          break;
        default:
          break;
      }
    },
    //申请表信息动态添加行
    addRow(tableIndex) {
      switch (tableIndex) {
        // 核心课程
        case 6:
          this.hxkcxm.zyjxgzjl.push({
            num: this.hxkcxm.zyjxgzjl.length + 1,
            editFlag: false,
            tableNum: 6
          });
          break;
        case 7:
          this.hxkcxm.kczcyqk.push({
            num: this.hxkcxm.kczcyqk.length + 1,
            editFlag: false,
            tableNum: 7
          });
          break;
        case 8:
          this.hxkcxm.jfys.push({
            num: this.hxkcxm.jfys.length + 1,
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
        // 核心课程
        case 6:
          if (this.hxkcxm.zyjxgzjl.length == 1) {
            return;
          }
          this.hxkcxm.zyjxgzjl.pop();
          break;
        case 7:
          if (this.hxkcxm.kczcyqk.length == 1) {
            return;
          }
          this.hxkcxm.kczcyqk.pop();
          break;
        case 8:
          if (this.hxkcxm.jfys.length == 1) {
            return;
          }
          this.hxkcxm.jfys.pop();
          break;
        default:
          break;
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
    //改变时间格式
    changeDataType(time) {
      const date = new Date();
      date.setTime(time); // value通过截取字符串只取数字。
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    }
  },
  activated() {
    this.loadTable();
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
