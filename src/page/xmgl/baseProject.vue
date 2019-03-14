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

        <!-- 表单详情 -->
        <div class="container" v-show="!showTable">
            <el-row>
                <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                    <div class="small"></div>
                    <span>项目基本情况</span>
                    <div class="close" @click="close"> X </div>
                </el-col>
            </el-row>
            <el-form :model="sjjdxm" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="项目名称：" prop="name">
                            <el-input v-model="sjjdxm.xmmc"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="协议起止时间：" prop="gender">
                            <el-date-picker v-model="sjjdxm.xyqzsj" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="项目负责人：" prop="nativePlace">
                            <el-input v-model="sjjdxm.xm"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="出生年月：" prop="spell">
                            <el-input v-model="sjjdxm.csrq"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="所在单位：" prop="nativePlace">
                            <el-input v-model="sjjdxm.yxqc"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="联系电话：" prop="spell">
                            <el-input v-model="sjjdxm.yddh"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="邮箱：" prop="nativePlace">
                            <el-input v-model="sjjdxm.yddh"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="职称/职务：" prop="spell">
                            <el-input v-model="sjjdxm.zw"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="项目类别：" prop="spell">
                            <el-radio-group v-model="sjjdxm.xmlb">
                                <el-radio label="0">研究生实践教育基地</el-radio>
                                <el-radio label="1">研究生实验教学平台</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>校外基地依托单位基本情况</span>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="单位全称：" prop="name">
                            <el-input v-model="sjjdxm.xwjdytdwqc"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="单位性质：" prop="gender">
                            <el-input v-model="sjjdxm.xwjdytdwxz"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="地址：" prop="nativePlace">
                            <el-input v-model="sjjdxm.xwjdytdwdz"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="所属行业：" prop="spell">
                            <el-input v-model="sjjdxm.xwjdytdwsshy"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="网址：" prop="nativePlace">
                            <el-input v-model="sjjdxm.xwjdytdwwz"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="法人代表：" prop="spell">
                            <el-input v-model="sjjdxm.xwjdytdwfrdb"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="联系人姓名：" prop="nativePlace">
                            <el-input v-model="sjjdxm.xwjdytdwlxrxm"></el-input>
                        </el-form-item>
                    </el-col>

                    <!-- <el-col :span="11">
                        <el-form-item label="电话、传真：" prop="spell">
                            <el-input v-model="sjjdxm.spell"></el-input>
                        </el-form-item>
                    </el-col> -->
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="电话：" prop="nativePlace">
                            <el-input v-model="sjjdxm.xwjdytdwdh"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="传真：" prop="spell">
                            <el-input v-model="sjjdxm.xwjdytdwcz"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="邮箱：" prop="nativePlace">
                            <el-input v-model="sjjdxm.xwjdytdwyx"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="有无合作协议：" prop="spell">
                            <el-radio-group v-model="sjjdxm.xwjdytdwywhz">
                                <el-radio label="1">有</el-radio>
                                <el-radio label="0">无</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span='22'>
                        <el-form-item label="合作协议起止时间：">
                            <el-date-picker v-model="sjjdxm.xyqzsj" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>基地（平台）校方联络人员</span>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="姓名：" prop="name">
                            <el-input v-model="sjjdxm.jdllryxm"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="邮箱：" prop="gender">
                            <el-input v-model="sjjdxm.jdllryyx"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="电话：" prop="name">
                            <el-input v-model="sjjdxm.jdllrydh"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="传真：" prop="gender">
                            <el-input v-model="sjjdxm.jdllrycz"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>能够承担的实践专业（领域）</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='20'>
                        <div class="table-data">
                            <el-table border cell-style="padding:0px" row-style="height:50px;" :data="sjjdxm.ngcddsjzy" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                <el-table-column label="能够承担的实践专业（领域）" align="center">
                                    <el-table-column prop="num" label="序号" align="center" width="70">
                                    </el-table-column>
                                    <el-table-column prop="sjzy" label="实践专业（领域）" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.sjzy" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.sjzy}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="yjss" label="一次容纳实践研究生数" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.yjss" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.yjss}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="ryqk" label="基地技术指导人员情况" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.ryqk" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.ryqk}}</span>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(9)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(9)" class="plus"></el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>项目主要成员基本情况</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='20'>
                        <div class="table-data">
                            <el-table border cell-style="padding:0px" row-style="height:50px;" :data="sjjdxm.xmzycyjbqk" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                <el-table-column label="项目主要成员基本情况" align="center">
                                    <el-table-column prop="num" label="序号" align="center" width="70">
                                    </el-table-column>
                                    <el-table-column prop="xm" label="姓名" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xm" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.xm}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="csrq" label="出生年月" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.csrq" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.csrq}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="zczw" label="职称/职务" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zczw" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.zczw}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="szdw" label="所在单位" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.szdw" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.szdw}}</span>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(10)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(10)" class="plus"></el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>项目建设基础</span>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="sjjdxm.xmjsjc" type="textarea" :rows="8" placeholder="请简述现有合作基础、条件保障、基地（平台）特色、现有导师队伍情况等：">
                        </el-input>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>项目建设意义和可行性</span>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="sjjdxm.xmjsyyhkxx" type="textarea" :rows="8" placeholder="">
                        </el-input>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>项目建设与运行方案</span>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="sjjdxm.xmjsyyxfa" type="textarea" :rows="8" placeholder="实践基地（平台）建设总体规划；实践基地（平台）管理模式与运行机制；实践教学实施计划与措施；经费筹措与投入；条件建设与资源共享等。">
                        </el-input>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>项目建设目标和进度安排（须有具体可考核指标）</span>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="sjjdxm.xmjsmbhjdap" type="textarea" :rows="8" placeholder="">
                        </el-input>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>预期成果及受益面（须有量化成果和建设成效指标）</span>
                    </el-col>
                </el-row>

                <el-row :gutter="30" class="textarea">
                    <el-col :span="22">
                        <el-input v-model="sjjdxm.yqcgjsym" type="textarea" :rows="8" placeholder="">
                        </el-input>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>经费预算</span>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span='20'>
                        <div class="table-data">
                            <el-table border cell-style="padding:0px" row-style="height:50px;" :data="sjjdxm.jfys" show-summary :summary-method="getSummaries" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                <el-table-column label="经费预算" align="center">
                                    <el-table-column prop="num" label="序号" align="center" width="70">
                                    </el-table-column>
                                    <!-- <el-table-column prop="name" label="序号" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.name"
                                        placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.name}}</span>
                                </template>
                            </el-table-column> -->
                                    <el-table-column prop="yt" label="用途" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.yt" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.yt}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="jfys" label="经费预算（万元）" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.jfys" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.jfys}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="xxjf" label="学校经费（万元）" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xxjf" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.xxjf}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="xypt" label="学院配套（万元）" align="center">
                                        <template slot-scope="scope">
                                            <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xypt" placeholder="请输入" />
                                            <span v-show="!scope.row.editFlag">{{scope.row.xypt}}</span>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span='1' :offset='1' style="padding-top:80px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow(11)" class="plus"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:80px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow(11)" class="plus"></el-button>
                    </el-col>
                </el-row>

                <!-- 附件展示 -->
                <!-- <el-row :gutter="30">
                <el-col :span="22">
                <el-form-item label="附件：" prop="">
                    <a :href="item.url" v-for="item in sjjdxm.fj" class="fj">
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
      sjjdhj: [], //实践基地合计
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
      // 实践基地项目
      sjjdxm: {
        fj: [],
        ngcddsjzy: [
          {
            num: 1,
            sjzy: "",
            yjss: "",
            zdry: "",
            editFlag: false,
            tableNum: 9
          }
        ],
        xmzycyjbqk: [
          {
            num: 1,
            xm: "",
            csrq: "",
            zc: "",
            dw: "",
            editFlag: false,
            tableNum: 10
          }
        ],
        jfys: [
          {
            num: 1,
            yt: "",
            jfys: "",
            xxjf: "",
            xypt: "",
            editFlag: false,
            tableNum: 11
          }
        ]
      },
      rules: {
        region: [
          {
            required: true,
            message: "请选择活动区域",
            trigger: "change"
          }
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
      // console.log(timestampToTime (1533293827000))
    },
    // 加载列表
    loadTable() {
      if (this.has("teasjjdxm:list2")) {
        this.$http
          .get(this.$server.glourl + "teasjjdxm/list2", {
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
        location.href = this.$server.glourl + "teasjjdxm/downWord?lcid=" + lcid;
      } else {
        this.$message({
          message: "审核未通过！",
          type: "error"
        });
      }
    },
    // 文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
      this.sjjdxm.fj.push({ name: response.name, url: response.url });
      this.onsuccess = false;
    },
    progress: function() {
      this.onsuccess = true;
    },
    handleRemove(file, fileList) {
      this.onsuccess = false;
      this.fileList = fileList;
      this.sjjdxm.fj = this.fileList;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //保存
    saveMsg() {
      this.sjjdhj.splice(0, 2);
      this.sjjdxm.sum = this.sjjdhj.join();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // this.jgxm.jfly = this.jfly.join()
      this.$http
        .post(this.$server.glourl + "teasjjdxm/saveforupdate", this.sjjdxm)
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
        this.sjjdhj.splice(0, 2);
        this.sjjdxm.sum = this.sjjdhj.join();
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        // this.jgxm.jfly = this.jfly.join()
        this.$http
          .post(this.$server.glourl + "teasjjdxm/update", this.sjjdxm)
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
            .get(this.$server.glourl + "teasjjdxm/info/" + this.id)
            .then(response => {
              this.sjjdxm = response.data.teaSjjdxm;
              // console.log(this.sjjdxm.fj)
              // 附件展示，需要解析成对象
              this.sjjdxm.fj = JSON.parse(response.data.teaSjjdxm.fj);
              this.fileList = this.sjjdxm.fj;
              this.sjjdxm.ngcddsjzy = JSON.parse(
                response.data.teaSjjdxm.ngcddsjzy
              );
              this.sjjdxm.xmzycyjbqk = JSON.parse(
                response.data.teaSjjdxm.xmzycyjbqk
              );
              this.sjjdxm.jfys = JSON.parse(response.data.teaSjjdxm.jfys);
              // console.log(response.data.map.stu)
            });
          this.showTable = false;
        }
      }
    },
    //申请信息table鼠标经过事件
    handleMouseEnter(row, column, cell, event) {
      const tableIndex = row.tableNum;
      let num = row.num - 1;
      // console.log(num)
      switch (tableIndex) {
        // 实践基地
        case 9:
          this.sjjdxm.ngcddsjzy[num].editFlag = true;
          break;
        case 10:
          this.sjjdxm.xmzycyjbqk[num].editFlag = true;
          break;
        case 11:
          this.sjjdxm.jfys[num].editFlag = true;
          break;
      }
    },
    //申请信息table鼠标经过移出事件
    handleMouseOut(row, column, cell, event) {
      const tableIndex = row.tableNum;
      let num = row.num - 1;
      switch (tableIndex) {
        // 实践基地
        case 9:
          this.sjjdxm.ngcddsjzy[num].editFlag = false;
          break;
        case 10:
          this.sjjdxm.xmzycyjbqk[num].editFlag = false;
          break;
        case 11:
          this.sjjdxm.jfys[num].editFlag = false;
          break;
      }
    },
    //申请表信息动态添加行
    addRow(tableIndex) {
      switch (tableIndex) {
        // 实践基地
        case 9:
          this.sjjdxm.ngcddsjzy.push({
            num: this.sjjdxm.ngcddsjzy.length + 1,
            editFlag: false,
            tableNum: 9
          });
          break;
        case 10:
          this.sjjdxm.xmzycyjbqk.push({
            num: this.sjjdxm.xmzycyjbqk.length + 1,
            editFlag: false,
            tableNum: 10
          });
          break;
        case 11:
          this.sjjdxm.jfys.push({
            num: this.sjjdxm.jfys.length + 1,
            editFlag: false,
            tableNum: 11
          });
          break;
      }
    },
    //申请信息动态减少行
    delRow(tableIndex) {
      switch (tableIndex) {
        // 实践基地
        case 9:
          if (this.sjjdxm.ngcddsjzy.length == 1) {
            return;
          }
          this.sjjdxm.ngcddsjzy.pop();
          break;
        case 10:
          if (this.sjjdxm.xmzycyjbqk.length == 1) {
            return;
          }
          this.sjjdxm.xmzycyjbqk.pop();
          break;
        case 11:
          if (this.sjjdxm.jfys.length == 1) {
            return;
          }
          this.sjjdxm.jfys.pop();
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
      this.sjjdhj = sums;
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
    }
    // handleMouseEnter: function (row, column, cell, event) {
    //     let num = row.index - 1;
    //     this.tableData[num].editFlag = true;
    // },
    // handleMouseOut: function (row, column, cell, event) {
    //     let num = row.index - 1;
    //     this.tableData[num].editFlag = false;
    // },
    // addRow() {
    //     this.tableData.push({
    //         index: this.tableData.length + 1,
    //         editFlag: false
    //     });
    // },
    // delRow() {
    //     if (this.tableData.length == 1) {
    //         return;
    //     }
    //     this.tableData.pop();
    // }
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