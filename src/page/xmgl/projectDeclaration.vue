<template>
    <div style="width:100%;color:rgba(102,102,102,1)">
        <div class="container" v-show="showTable">
            <div class="header">
                <!-- 查询部分 -->
                <!-- <div class="left">
                    <el-input placeholder="请输入内容" class="header-input" clearable></el-input>
                    <el-button>查询</el-button>
                </div> -->

                <!-- 增删改查 -->
                <div class="right">
                    <el-button type="success" @click="addApply">申请</el-button>
                    <!-- <el-button type="danger">删除</el-button>
                    <el-button type="warning">修改</el-button>
                    <el-button type="primary">撤销</el-button> -->
                </div>
            </div>

            <!-- 表格 -->
            <div class="table">
                <el-table border :data="dataList" @row-click="clickRow" ref="moviesTable" @selection-change="handleSelectionChange">

                    <el-table-column type="selection" label="全选" align="center"></el-table-column>

                    <el-table-column label="序号" sortable width="80" type="index" :index="indexMethod" align="center">
                    </el-table-column>

                    <el-table-column prop="xmmc" label="项目名称" align="center">
                    </el-table-column>

                    <el-table-column prop="name" label="项目类型" :formatter="formatter" align="center">
                    </el-table-column>

                    <el-table-column prop="ssxymc" label="所属学院" :formatter="formatter" align="center">
                    </el-table-column>

                    <el-table-column label="开始时间" prop="kssj" align="center">
                        <template slot-scope="scope">{{scope.row.kssjString}}</template>
                    </el-table-column>
                    <el-table-column label="结束时间" prop="jssj" align="center">
                        <template slot-scope="scope">{{scope.row.jssjString}}</template>
                    </el-table-column>
                    <el-table-column label="要求及通知" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" :size="small" plain @click="query(scope.row.xmyq)">查看详情</el-button>
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
        </div>
        <!-- 教改项目 -->
        <div class="container" v-show="!showTable1">

            <!-- 项目表单 -->
            <el-form :model="jgsave" :rules="rules1" ref="init" label-width="177px" class="demo-ruleForm" label-position="left">
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
                            <el-input v-model="init.xmmc" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="所属学院：" prop="">
                            <el-input v-model="init.ssxymc" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="项目类型：" prop="">
                            <el-input v-model="init.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="要求及内容：" prop="">
                            <el-input v-model="init.xmyq" type="textarea" :autosize="{ minRows: 5, maxRows: 7}" placeholder="请输入内容" style="padding-left:0">
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
                <div v-show="showStu">
                    <el-row>
                        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>教改申请项目及申请人基本情况</span>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="项目名称：" prop="">
                                <el-input v-model="jgsave.xmmc" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="申请经费（万元）：" prop="sqjf">
                                <el-input v-model.number="jgsave.sqjf" clearable auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="22">
                            <el-form-item label="起止时间：（必填项）" prop="sj">
                                <div class="date">
                                    <el-form-item>
                                        <el-date-picker v-model="jgsave.sj" value-format="yyyy-MM-dd" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="22">
                            <el-form-item label="项目性质：" prop="">
                                <el-radio-group v-model="jgsave.xmxz">
                                    <el-radio label="0">理论研究</el-radio>
                                    <el-radio label="1">实践探索</el-radio>
                                    <el-radio label="2">专项项目</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="22">
                            <el-form-item label="预期的主要成果：" prop="">
                                <el-checkbox-group style="width:90%" v-model="yqdzycg">
                                    <el-checkbox label="0">研究报告</el-checkbox>
                                    <el-checkbox label="1">论文</el-checkbox>
                                    <el-checkbox label="2">课件</el-checkbox>
                                    <el-checkbox label="3">实验装置</el-checkbox>
                                    <el-checkbox label="4">多媒体软件</el-checkbox>
                                    <el-checkbox label="5">其他</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="姓名：" prop="">
                                <el-input v-model="jgxm.xm" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="性别：" prop="">
                                <el-input v-model="jgxm.xbm"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="民族：" prop="">
                                <el-input v-model="jgxm.mzm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="出生年月：" prop="">
                                <el-input v-model="jgxm.csrq"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="职务：" prop="">
                                <el-input v-model="jgxm.zw"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="职称：" prop="">
                                <el-input v-model="jgxm.zc"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="学历：" prop="">
                                <el-input v-model="jgxm.zgxlm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="硕、博导：" prop="">
                                <el-input >{{jgxm.dslb == '1' ? '硕士生导师' : jgxm.dslb == '2' ? '博士生导师' : ''}}</el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="所在院、学科：" prop="">
                                <el-input v-model="jgxm.yxqc"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="联系电话：" prop="">
                                <el-input v-model="jgxm.yddh"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="E-mail：" prop="">
                                <el-input v-model="jgxm.dzyx"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="20">
                            <div class="table-data">
                                <el-table :data="jgsave.zycjzjk" ref="multipleTable" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                    <el-table-column label="主要参加者概况" align="center" style="width: 100%;text-align: center">
                                        <el-table-column label="序号" width="70" align="center" prop="num">
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

                                        <el-table-column prop="csrq" label="出生年月" align="center">
                                            <template slot-scope="scope">
                                                <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.csrq" placeholder="请输入" />
                                                <span v-show="!scope.row.editFlag">{{scope.row.csrq}}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column prop="xl" label="学历" align="center">
                                            <template slot-scope="scope">
                                                <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xl" placeholder="请输入" />
                                                <span v-show="!scope.row.editFlag">{{scope.row.xl}}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column prop="zc" label="职称" align="center">
                                            <template slot-scope="scope">
                                                <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zc" placeholder="请输入" />
                                                <span v-show="!scope.row.editFlag">{{scope.row.zc}}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column prop="zw" label="职务" align="center">
                                            <template slot-scope="scope">
                                                <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zw" placeholder="请输入" />
                                                <span v-show="!scope.row.editFlag">{{scope.row.zw}}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column prop="xmfg" label="项目分工" align="center">
                                            <template slot-scope="scope">
                                                <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xmfg" placeholder="请输入" />
                                                <span v-show="!scope.row.editFlag">{{scope.row.xmfg}}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column prop="gzdw" label="工作单位" align="center">
                                            <template slot-scope="scope">
                                                <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.gzdw" placeholder="请输入" />
                                                <span v-show="!scope.row.editFlag">{{scope.row.gzdw}}</span>
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
                        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>已完成的研究生教改项目及时间：</span>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容" v-model="jgsave.ywcjgxmhsj">
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>项目研究内容、意义摘要：</span>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容" v-model="jgsave.yjnr">
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>本项目研究意义及国内外同类研究工作现状</span>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容" v-model="jgsave.gzxz">
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>主要研究内容、目标、方案和进度及拟解决的关键问题</span>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容" v-model="jgsave.zyyjfx">
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>与本项目有关的工作条件（包括研究工作基础、实验条件等）</span>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容" v-model="jgsave.gztj">
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>项目预期成果形式、效果</span>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容" v-model="jgsave.xmyqcgxsxg">
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>经费预算（单位：万元）：</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <div class="table-data">
                                <el-table border :data="jgsave.jfys" ref="multipleTable" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                    <el-table-column label="序号" width="70" align="center" prop="num">
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

                                </el-table>
                            </div>
                        </el-col>
                        <el-col :span='1' :offset='1' style="padding-top:60px;">
                            <el-button icon="el-icon-plus" size='mini' circle @click="addRow(2)" class="plus"></el-button>
                        </el-col>
                        <el-col :span='1' style="padding-top:60px;">
                            <el-button icon="el-icon-minus" size='mini' circle @click="delRow(2)" class="plus"></el-button>
                        </el-col>
                    </el-row>

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
                            <!-- <el-col :span="12">
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-col> -->
                        </el-upload>
                    </div>
                </div>
                <!-- 提交重置 -->
                <div class="submit-box">
                    <el-button type="primary" @click="saveMsg1" class="submit-btn">保存</el-button>
                    <el-button type="primary" @click="close1" class="submit-btn">返回</el-button>
                    <el-button v-show="showStu" :loading="this.loading" type="primary" @click="applySubmit1" class="submit-btn">{{ submit }}</el-button>
                </div>
            </el-form>
        </div>
        <!-- 核心课程项目 -->
        <div class="container" v-show="!showTable2">

            <el-form :model="hxkcsave" :rules="rules2" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">
                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>项目发布信息</span>
                        <div class="close" @click="close2"> X </div>
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
                            <el-input v-model="init.ssxymc" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="项目类型：" prop="">
                            <el-input v-model="init.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="要求及内容：" prop="">
                            <el-input v-model="init.xmyq" type="textarea" :autosize="{ minRows: 5, maxRows: 7}" placeholder="请输入内容" style="padding-left:0">
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
                <div v-show="showStu">
                    <el-row>
                        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>课程总体情况</span>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="课程名称：">
                                <el-input v-model="hxkcsave.kcmc"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="所属学科：" prop="gender">
                                <el-input v-model="hxkcsave.ssxk"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="课程起始设立学期：" prop="spell">
                                <el-input v-model="hxkcsave.qsslxq"></el-input>
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
                                <el-radio-group v-model="hxkcsave.kcxz">
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
                                <el-radio-group v-model="hxkcsave.kccc">
                                    <el-radio label="0">硕士课程</el-radio>
                                    <el-radio label="1">博士课程</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="22">
                            <el-form-item label="课程类型：" prop="spell">
                                <el-radio-group v-model="hxkcsave.kclb">
                                    <el-radio label="0">全英文课程</el-radio>
                                    <el-radio label="1">双语课程</el-radio>
                                    <el-radio label="2">中文课程</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="近三年年均修读研究生人数：" prop="jdyjsrs">
                                <el-input v-model.number="hxkcsave.jdyjsrs" clearable auto-complete="off"></el-input>
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
                            <el-input v-model="hxkcsave.kcszjs" type="textarea" :rows="8" placeholder="课程设置、建设与改革自述（包括研究生课程体系要求、在学位点培养方案中的角色、课程的受益面等）">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input v-model="hxkcsave.tlkcjxgk" type="textarea" :rows="8" placeholder="近三年来，国内外同类教学课程概况">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input v-model="hxkcsave.jxyjgzzycg" type="textarea" :rows="8" placeholder="该课程已开展的教学研究工作与成果">
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
                            <el-input v-model="hxkcsave.jcjsqk" type="textarea" :rows="8" placeholder="教材建设情况（包括选用或自编教材、配套教材、教学指导书、教学参考书和数学课件）">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input v-model="hxkcsave.jxmsjxff" type="textarea" :rows="8" placeholder="教学模式、教学方法及实践教学（包括能否有利于促进学生自主性学习、研究性学习和个性发展，教学过程能否有利于学生综合素质的提高、有利于培养学生的创新思维、科研实践能力和有利于激发学生的创造力）">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input v-model="hxkcsave.jxsd" type="textarea" :rows="8" placeholder="教学手段（包括是否在课程建设中积极营造数字化、信息化环境和外语教学环境，网络教学和网上教学资源的开发与建设情况）">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :sapn='24' style="margin-top:25px;line-height:50px">
                            <div class="small"></div>
                            <span>师资队伍情况</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span='20'>
                            <div class="table-data">
                                <el-table border cell-style="padding:0px" row-style="height:50px;" :data="hxkcsave.zyjxgzjl" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
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
                        <el-col :span='1' :offset='1' style="padding-top:60px;">
                            <el-button icon="el-icon-plus" size='mini' circle @click="addRow(6)" class="plus"></el-button>
                        </el-col>
                        <el-col :span='1' style="padding-top:60px;">
                            <el-button icon="el-icon-minus" size='mini' circle @click="delRow(6)" class="plus"></el-button>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input v-model="hxkcsave.jsnzyjxyj" type="textarea" :rows="8" placeholder="与本项目相关的近三年主要教学研究和科研成果（注明项目来源、成果名称、成果形式、发表刊物或出版单位、发表或出版时间、获奖情况）：">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span='20'>
                            <div class="table-data">
                                <el-table border cell-style="padding:0px" row-style="height:50px;" :data="hxkcsave.kczcyqk" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
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
                        <el-col :span='1' :offset='1' style="padding-top:60px;">
                            <el-button icon="el-icon-plus" size='mini' circle @click="addRow(7)" class="plus"></el-button>
                        </el-col>
                        <el-col :span='1' style="padding-top:60px;">
                            <el-button icon="el-icon-minus" size='mini' circle @click="delRow(7)" class="plus"></el-button>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input v-model="hxkcsave.kczcyjx" type="textarea" :rows="8" placeholder="课题组成员的教学及科研成果：">
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
                                <el-date-picker v-model="hxkcsave.sj" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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
                            <el-input v-model="hxkcsave.jsmbhyqcg" type="textarea" :rows="8" placeholder="（必需包括“建立并完善本课程网站”和“制作和完善电子课件”等）">
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
                            <el-input v-model="hxkcsave.kjjscsjtjbz" type="textarea" :rows="8" placeholder="（需包括“分析课程存在的不足之处，制定课程建设的详细计划”等）">
                            </el-input>
                        </el-col>
                    </el-row>
                    <!-- </el-form> -->
                    <el-row>
                        <el-col :span='20'>
                            <div class="table-data">
                                <el-table border cell-style="padding:0px" row-style="height:50px;" :data="hxkcsave.jfys" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
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
                        <el-col :span='1' :offset='1' style="padding-top:60px;">
                            <el-button icon="el-icon-plus" size='mini' circle @click="addRow(8)" class="plus"></el-button>
                        </el-col>
                        <el-col :span='1' style="padding-top:60px;">
                            <el-button icon="el-icon-minus" size='mini' circle @click="delRow(8)" class="plus"></el-button>
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
                            <!-- <el-col :span="12">
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-col> -->
                        </el-upload>
                    </div>
                </div>
                <!-- 提交重置 -->
                <div class="submit-box">
                    <el-button type="primary" @click="saveMsg2" class="submit-btn">保存</el-button>
                    <el-button type="primary" @click="close2" class="submit-btn">返回</el-button>
                    <el-button v-show="showStu" :loading="this.loading" type="primary" @click="applySubmit2" class="submit-btn">{{ submit }}</el-button>
                </div>
            </el-form>
        </div>
        <!-- 实践基地项目 -->
        <div class="container" v-show="!showTable3">

            <el-form :model="sjjdxm" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">
                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>项目发布信息</span>
                        <div class="close" @click="close3"> X </div>
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
                            <el-input v-model="init.ssxymc" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="项目类型：" prop="">
                            <el-input v-model="init.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="要求及内容：" prop="">
                            <el-input v-model="init.xmyq" type="textarea" :autosize="{ minRows: 5, maxRows: 7}" placeholder="请输入内容" style="padding-left:0">
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
                <div v-show="showStu">
                    <el-row>
                        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>项目基本情况</span>
                            <div class="close" @click="close3"> X </div>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="项目名称：" prop="name">
                                <el-input v-model="sjjdsave.xmmc"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="协议起止时间：（必填）" prop="gender">
                                <el-date-picker v-model="sjjdsave.sj" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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
                                <el-input v-model="sjjdxm.dzyx"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="职称/职务：" prop="spell">
                                <el-input v-model="sjjdxm.zczw"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="22">
                            <el-form-item label="项目类别：" prop="spell">
                                <el-radio-group v-model="sjjdsave.xmlb">
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
                                <el-input v-model="sjjdsave.xwjdytdwqc"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="单位性质：" prop="gender">
                                <el-input v-model="sjjdsave.xwjdytdwxz"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="地址：" prop="nativePlace">
                                <el-input v-model="sjjdsave.xwjdytdwdz"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="所属行业：" prop="spell">
                                <el-input v-model="sjjdsave.xwjdytdwsshy"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="网址：" prop="nativePlace">
                                <el-input v-model="sjjdsave.xwjdytdwwz"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="法人代表：" prop="spell">
                                <el-input v-model="sjjdsave.xwjdytdwfrdb"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="联系人姓名：" prop="nativePlace">
                                <el-input v-model="sjjdsave.xwjdytdwlxrxm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="电话：" prop="nativePlace">
                                <el-input v-model="sjjdsave.xwjdytdwdh"></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="11">
                        <el-form-item label="电话、传真：" prop="spell">
                            <el-input v-model="sjjdsave.xwjdytdwcz"></el-input>
                        </el-form-item>
                    </el-col> -->
                    </el-row>

                    <el-row :gutter="30">

                        <el-col :span="11">
                            <el-form-item label="传真：" prop="spell">
                                <el-input v-model="sjjdsave.xwjdytdwcz"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="邮箱：" prop="nativePlace">
                                <el-input v-model="sjjdsave.xwjdytdwyx"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span='11'>
                            <el-form-item label="合作协议起止时间：">
                                <el-date-picker v-model="sjjdsave.xyqzsj" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="有无合作协议：" prop="spell">
                                <el-radio-group v-model="sjjdsave.xwjdytdwywhz">
                                    <el-radio label="1">有</el-radio>
                                    <el-radio label="0">无</el-radio>
                                </el-radio-group>
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
                                <el-input v-model="sjjdsave.jdllryxm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="邮箱：" prop="gender">
                                <el-input v-model="sjjdsave.jdllryyx"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="电话：" prop="name">
                                <el-input v-model="sjjdsave.jdllrydh"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="传真：" prop="gender">
                                <el-input v-model="sjjdsave.jdllrycz"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="邮箱：" prop="nativePlace">
                            <el-input v-model="sjjdsave.jdllryyx"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> -->
                    <el-row>
                        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>能够承担的实践专业（领域）</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span='20'>
                            <div class="table-data">
                                <el-table border cell-style="padding:0px" row-style="height:50px;" :data="sjjdsave.ngcddsjzy" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
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
                                <el-table border cell-style="padding:0px" row-style="height:50px;" :data="sjjdsave.xmzycyjbqk" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
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
                            <el-input v-model="sjjdsave.xmjsjc" type="textarea" :rows="8" placeholder="请简述现有合作基础、条件保障、基地（平台）特色、现有导师队伍情况等：">
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :sapn='24' style="margin-top:25px;line-height:50px">
                            <div class="small" style="float:left;margin:20px;margin-left:30px"></div>
                            <span>项目建设意义和可行性</span>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input v-model="sjjdsave.xmjsyyhkxx" type="textarea" :rows="8" placeholder="">
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :sapn='24' style="margin-top:25px;line-height:50px">
                            <div class="small" style="float:left;margin:20px;margin-left:30px"></div>
                            <span>项目建设与运行方案</span>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input v-model="sjjdsave.xmjsyyxfa" type="textarea" :rows="8" placeholder="实践基地（平台）建设总体规划；实践基地（平台）管理模式与运行机制；实践教学实施计划与措施；经费筹措与投入；条件建设与资源共享等。">
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
                            <el-input v-model="sjjdsave.xmjsmbhjdap" type="textarea" :rows="8" placeholder="">
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
                            <el-input v-model="sjjdsave.yqcgjsym" type="textarea" :rows="8" placeholder="">
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
                                <el-table border cell-style="padding:0px" row-style="height:50px;" :data="sjjdsave.jfys" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" show-summary :summary-method="getSummaries">
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
                </div>
                <!-- 提交重置 -->
                <div class="submit-box">
                    <el-button type="primary" @click="saveMsg3" class="submit-btn">保存</el-button>
                    <el-button type="primary" @click="close3" class="submit-btn">返回</el-button>
                    <el-button v-show="showStu" :loading="this.loading" type="primary" @click="applySubmit3" class="submit-btn">{{ submit }}</el-button>
                </div>
            </el-form>
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
        </div>
        <!-- 海外实践基地项目 -->
        <div class="container" v-show="!showTable4">

            <el-form :model="hwsjjdxm" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">
                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>项目发布信息</span>
                        <div class="close" @click="close4"> X </div>
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
                            <el-input v-model="init.ssxymc" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="项目类型：" prop="">
                            <el-input v-model="init.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="要求及内容：" prop="">
                            <el-input v-model="init.xmyq" type="textarea" :autosize="{ minRows: 5, maxRows: 7}" placeholder="请输入内容" style="padding-left:0">
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
                <div v-show="showStu">
                    <el-row :gutter="30">
                        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>项目基本情况</span>

                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="项目名称：" prop="title">
                                <el-input v-model="hwsjjdsave.xmmc"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="协议起止时间：" prop="time">
                                <!-- <el-input v-model="hwsjjdsave.sj" placeholder="(万)"></el-input> -->
                                <el-date-picker v-model="hwsjjdsave.sj" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="学科：" prop="subject">
                                <el-input v-model="hwsjjdsave.xk"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="学位点：" prop="degree">
                                <el-input v-model="hwsjjdsave.xwd"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="22">
                            <el-form-item label="联合培养方式：" prop="train">
                                <el-radio-group v-model="hwsjjdsave.lhpyfs">
                                    <el-radio :label="0">双硕士学位</el-radio>
                                    <el-radio :label="1">双博士学位</el-radio>
                                    <el-radio :label="2">双硕士/博士学位</el-radio>
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
                            <el-form-item label="姓名：" prop="name">
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
                                <el-input v-model="hwsjjdsave.hzdwmc"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="国家：" prop="country">
                                <el-input v-model="hwsjjdsave.hzdwgj" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="地区：" prop="region">
                                <el-input v-model="hwsjjdsave.hzdwdq"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="联系人：" prop="contact">
                                <el-input v-model="hwsjjdsave.hzdwlxr"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="职务：" prop="duty1">
                                <el-input v-model="hwsjjdsave.hzdwzw"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="电话：" prop="tel1">
                                <el-input v-model="hwsjjdsave.hzdwdh"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="E-mail：" prop="mail1">
                                <el-input v-model="hwsjjdsave.hzdwyx"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="单位概述：" prop="company1">
                                <el-input v-model="hwsjjdsave.hzdwgs"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="22">
                            <el-form-item label="双方合作模式：" prop="cooperate">
                                <el-input v-model="hwsjjdsave.hzdwhzms"></el-input>
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
                                <el-input v-model="hwsjjdsave.ssqk" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="包括海外联合培养基地建设、共同开设课程、教师互派、已派遣学生等情况">
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
                                <el-input v-model="hwsjjdsave.wnnjhap" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="2016-2020年期间的实施计划（基地建设计划、开设课程情况、教师互派、派遣学生人数等情况）">
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
                                <el-table :data="hwsjjdsave.jfys" ref="multipleTable" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut" show-summary :summary-method="getSummaries1">
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
                                <el-input v-model="hwsjjdsave.jfyssm" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="经费预算说明：">
                                </el-input>
                            </el-col>
                        </el-row>
                    </div>

                    <!-- 添加附件 -->
                    <div class="append-btn">
                        <el-upload class="upload-demo" :action="baseUrls" :on-progress="progress4" :on-preview="handlePreview" :on-remove="handleRemove4" :before-remove="beforeRemove" :on-success="handleSuccess4" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList4">
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
                </div>
                <!-- 提交重置 -->
                <div class="submit-box">
                    <el-button type="primary" @click="saveMsg4" class="submit-btn">保存</el-button>
                    <el-button type="primary" @click="close4" class="submit-btn">返回</el-button>
                    <el-button v-show="showStu" :loading="this.loading" type="primary" @click="applySubmit4" class="submit-btn">{{ submit }}</el-button>
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
            </el-form>
        </div>
        <!-- 教材建设项目 -->
        <div class="container" v-show="!showTable5">
            <el-form :model="jcjssave" :rules="rules5" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">
                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>项目发布信息</span>
                        <div class="close" @click="close5"> X </div>
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
                            <el-input v-model="init.ssxymc" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="项目类型：" prop="">
                            <el-input v-model="init.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="要求及内容：" prop="">
                            <el-input v-model="init.xmyq" type="textarea" :autosize="{ minRows: 5, maxRows: 7}" placeholder="请输入内容" style="padding-left:0">
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
                <div v-show="showStu">
                    <el-row :gutter="30">
                        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>稿件情况</span>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="教材名称：" prop="">
                                <el-input v-model="jcjssave.jcmc"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="估计字数：" prop="gjzs">
                                <el-input v-model.number="jcjssave.gjzs"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="黑白照片张数：" prop="hbzpzs">
                                <el-input v-model.number="jcjssave.hbzpzs"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="黑白照片版数：" prop="hbzpbs">
                                <el-input v-model.number="jcjssave.hbzpbs" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="彩色照片张数：" prop="cszpzs">
                                <el-input v-model.number="jcjssave.cszpzs"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="彩色照片版数：" prop="cszpbs">
                                <el-input v-model.number="jcjssave.cszpbs" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="交稿时间：" prop="">
                                <el-input v-model="jcjssave.jgsj"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="出版社名称：" prop="">
                                <el-input v-model="jcjssave.cbsmc"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="出版时间：" prop="">
                                <el-input v-model="jcjssave.cbsj"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="申请经费：" prop="sqjf">
                                <el-input v-model.number="jcjssave.sqjf" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="申请其他资助情况：" prop="">
                                <el-input v-model="jcjssave.sqqtzzqk"></el-input>
                            </el-form-item>
                        </el-col>
                        <div class="long">
                            <el-col :span="11">
                                <el-form-item label="本校使用该书的专业及每年使用人数：" prop="zyhsyrs">
                                    <el-input v-model.number="jcjssave.zyhsyrs"></el-input>
                                </el-form-item>
                            </el-col>
                        </div>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="对应的研究生课程名称：" prop="">
                                <el-input v-model="jcjssave.yjskctm"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="出版费用（万元）：" prop="zyhsyrs">
                                <el-input v-model.number="jcjssave.cbfy"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>作者简况</span>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="姓名：" prop="">
                                <el-input v-model="jcjsxm.xm"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="性别：" prop="">
                                <el-input v-model="jcjsxm.xbm"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="出生年月：" prop="">
                                <el-input v-model="jcjsxm.csrq"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="学历：" prop="">
                                <el-input v-model="jcjsxm.zgxlm"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="学位：" prop="">
                                <el-input v-model="jcjsxm.zgxw"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="职称：" prop="">
                                <el-input v-model="jcjsxm.zc"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="职务：" prop="">
                                <el-input v-model="jcjsxm.zw"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="E-mail：" prop="">
                                <el-input v-model="jcjsxm.dzyx"></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="11">
                            <el-form-item label="所属学科：" prop="kind">
                                <el-input v-model="jcjsxm.zw"></el-input>
                            </el-form-item>
                        </el-col> -->
                    </el-row>

                    <el-row :gutter="30">

                        <el-col :span="11">
                            <el-form-item label="电话：" prop="">
                                <el-input v-model="jcjsxm.bgsdh"></el-input>
                            </el-form-item>
                        </el-col>
                        <div class="long">
                            <el-col :span="22">
                                <el-form-item label="申请者简历及主要科研、教学成果：" prop="">
                                    <!-- <el-input v-model="jcjssave.zzjxcg"></el-input> -->
                                    <el-input v-model="jcjssave.zzjxcg" type="textarea" :autosize="{ minRows: 3, maxRows: 6}" placeholder="请输入内容">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </div>
                    </el-row>

                    <el-row :gutter="30">

                    </el-row>

                    <el-row :gutter="20">
                        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>主要合作者</span>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="20">
                            <div class="table-data">
                                <el-table :data="jcjssave.zyhzz" ref="multipleTable" @selection-change="handleSelectionChange" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                                    <el-table-column label="主要合作者" align="center" style="width: 100%;text-align: center">
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

                                        <el-table-column prop="nl" label="年龄" align="center">
                                            <template slot-scope="scope">
                                                <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.nl" placeholder="请输入" />
                                                <span v-show="!scope.row.editFlag">{{scope.row.nl}}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column prop="gzdw" label="工作单位" align="center">
                                            <template slot-scope="scope">
                                                <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.gzdw" placeholder="请输入" />
                                                <span v-show="!scope.row.editFlag">{{scope.row.gzdw}}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column prop="zc" label="职称" align="center">
                                            <template slot-scope="scope">
                                                <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zc" placeholder="请输入" />
                                                <span v-show="!scope.row.editFlag">{{scope.row.zc}}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column prop="xl" label="学历" align="center">
                                            <template slot-scope="scope">
                                                <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xl" placeholder="请输入" />
                                                <span v-show="!scope.row.editFlag">{{scope.row.xl}}</span>
                                            </template>
                                        </el-table-column>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-col>
                        <el-col :span='1' :offset='1' style="padding-top:80px;">
                            <el-button icon="el-icon-plus" size='mini' circle @click="addRow(13)" class="plus"></el-button>
                        </el-col>
                        <el-col :span='1' style="padding-top:80px;">
                            <el-button icon="el-icon-minus" size='mini' circle @click="delRow(13)" class="plus"></el-button>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>本书主要内容</span>
                        </el-col>
                    </el-row>

                    <div class="textarea">
                        <el-row>
                            <el-col :span="22">
                                <el-input v-model="jcjssave.nrzy" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="内容提要">
                                </el-input>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="textarea">
                        <el-row>
                            <el-col :span="22">
                                <el-input v-model="jcjssave.zjml" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="章节目录">
                                </el-input>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- <el-row>
                        <el-col :span="22">
                            <div class="table-data">
                                <el-table
                                :data="jcjsxm"
                                ref="multipleTable"
                                @selection-change="handleSelectionChange">
                                    <el-table-column label="本书主要内容" align="center" style="width: 100%;text-align: center">
                                        <el-table-column prop="nrzy" label="内容提要" align="center" style="width:50%">
                                        </el-table-column>

                                        <el-table-column prop="zjml" label="章节目录" align="center" style="width:50%">
                                        </el-table-column>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-col>
                    </el-row> -->

                    <!-- <el-row>
                        <el-col :sapn='22' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>本人承诺</span>
                        </el-col>
                    </el-row>

                    <div class="textarea">
                        <el-row>
                            <el-col :span="22">
                                <el-input v-model="jcjsxm.bstdhcbjz" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="本人所撰写的教材内容符合《浙江工业大学研究生课程与教材管理规范》（浙工大研[2018]2号）文件中关于社会主义意识形态的要求，不存在违背社会主义意识形态的内容。">
                                </el-input>
                            </el-col>
                        </el-row>
                    </div> -->

                    <el-row>
                        <el-col :sapn='22' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>本书特点和出版价值</span>
                        </el-col>
                    </el-row>

                    <div class="textarea">
                        <el-row>
                            <el-col :span="22">
                                <el-input v-model="jcjssave.bstdhcbjz" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="（与国内外已出版的同类书籍比较，说明本书的特点及独到之处，包括学术思想、内容范围、结构体系、写作特点等）">
                                </el-input>
                            </el-col>
                        </el-row>
                    </div>

                    <el-row>
                        <el-col :sapn='22' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>同类教材简况</span>
                        </el-col>
                    </el-row>

                    <div class="textarea">
                        <el-row>
                            <el-col :span="22">
                                <el-input v-model="jcjssave.tljcjk" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="（书名、出版社、出版年代、作者及单位、定价、页数、印数、简略评价）">
                                </el-input>
                            </el-col>
                        </el-row>
                    </div>

                    <el-row>
                        <el-col :sapn='22' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>本书社会需求情况、发行前景</span>
                        </el-col>
                    </el-row>
                    <div class="textarea">
                        <el-row>
                            <el-col :span="22">
                                <el-input v-model="jcjssave.bsshxqqk" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="（书名、出版社、出版年代、作者及单位、定价、页数、印数、简略评价）">
                                </el-input>
                            </el-col>
                        </el-row>
                    </div>

                    <el-row>
                        <el-col :sapn='22' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>对我校研究生教育的作用</span>
                        </el-col>
                    </el-row>
                    <div class="textarea">
                        <el-row>
                            <el-col :span="22">
                                <el-input v-model="jcjssave.dwxjydzy" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="">
                                </el-input>
                            </el-col>
                        </el-row>
                    </div>

                    <el-row>
                        <el-col :sapn='22' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>经费预算</span>
                        </el-col>
                    </el-row>
                    <div class="textarea">
                        <el-row>
                            <el-col :span="22">
                                <el-input v-model="jcjssave.jfys" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="">
                                </el-input>
                            </el-col>
                        </el-row>
                    </div>

                    <el-row>
                        <el-col :sapn='22' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>本人承诺：</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :sapn='20' style="margin-top:5px;line-height:50px;margin-left:56px">
                            <p style="width:80%">本人所撰写的教材内容符合《浙江工业大学研究生课程与教材管理规范》（浙工大研[2018]2号）文件中关于社会主义意识形态的要求，不存在违背社会主义意识形态的内容。</p>
                        </el-col>
                    </el-row>
                    <div class="textarea">
                        <el-row>
                            <el-col :span="22">
                                <el-input v-model="jcjssave.ysxtcn" type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="">
                                </el-input>
                            </el-col>
                        </el-row>
                    </div>

                    <!-- 添加附件 -->
                    <div class="append-btn">
                        <el-upload class="upload-demo" :action="baseUrls" :on-progress="progress5" :on-preview="handlePreview" :on-remove="handleRemove5" :before-remove="beforeRemove" :on-success="handleSuccess5" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList5">
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

                </div>
                <!-- 提交重置 -->
                <div class="submit-box">
                    <el-button type="primary" @click="saveMsg5" class="submit-btn">保存</el-button>
                    <el-button type="primary" @click="close5" class="submit-btn">返回</el-button>
                    <el-button v-show="showStu" :loading="this.loading" type="primary" @click="applySubmit5" class="submit-btn">{{ submit }}</el-button>
                </div>
            </el-form>
        </div>
        <!-- 优博项目 -->
        <div class="container" v-show="!showTable6">

            <el-form :model="ybxm" :rules="rules" ref="quaApply" label-width="177px" class="demo-ruleForm" label-position="left">
                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>项目发布信息</span>
                        <div class="close" @click="close6"> X </div>
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
                            <el-input v-model="init.ssxymc" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="项目类型：" prop="">
                            <el-input v-model="init.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="要求及内容：" prop="">
                            <el-input v-model="init.xmyq" type="textarea" :autosize="{ minRows: 5, maxRows: 7}" placeholder="请输入内容" style="padding-left:0">
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
                <div v-if="showStu">
                    <el-row>
                        <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>博士生资助申请</span>
                        </el-col>
                    </el-row>

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
                                <el-input v-model="ybsave.ndxwlwtm"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="研究方向：" prop="firstLevel">
                                <el-input v-model="ybsave.yjfx"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="22">
                            <el-form-item label="攻博类型：" prop="secondLevel">
                                <!-- <el-input v-model="ybsave.gblx"></el-input> -->
                                <el-radio-group v-model="ybsave.gblx">
                                    <el-radio label="0">硕博连读</el-radio>
                                    <el-radio label="1">普通脱产博士</el-radio>
                                    <el-radio label="2">在职博士</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="22">
                            <el-form-item label="申请资助类型：" prop="secondLevelName">
                                <!-- <el-input v-model="ybsave.sqzzlx"></el-input> -->
                                <el-radio-group v-model="ybsave.sqzzlx">
                                    <el-radio label="0">学制内资助</el-radio>
                                    <el-radio label="1">延期创优资助</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="20">
                            <div class="table-data">
                                <el-table border :data="ybsave.zclwkyxm" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">

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
                        <el-col :span='1' :offset='1' style="padding-top:80px;">
                            <el-button icon="el-icon-plus" size='mini' circle @click="addRow(3)" class="plus"></el-button>
                        </el-col>
                        <el-col :span='1' style="padding-top:80px;">
                            <el-button icon="el-icon-minus" size='mini' circle @click="delRow(3)" class="plus"></el-button>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="申请人研究工作进展" v-model="ybsave.sqryjgzjz">
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="申请人在本学科顶级学术刊物上发表的论文（作者署名，题名，刊名，发表时间，起讫页码及影响因子等）" v-model="ybsave.sqrlw">
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="学位论文将要开展的主要研究内容，目标，预期可取得的创新成果及成果的表现形式" v-model="ybsave.xwlwzyyjfxnr">
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="研究工作进展安排" v-model="ybsave.yjgzjzap">
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
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="本学科全国性优秀博士学位论文水平分析" v-model="ybsave.bxkqglwfx">
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="申请人博士学位论文研究课题可能的理论创新，预期发表学术论文及科研成果的水平" v-model="ybsave.sqryjcgsp">
                            </el-input>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30" class="textarea">
                        <el-col :span="22">
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="目标实现的技术安排" v-model="ybsave.mbsxjsap">
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
                                <el-table border :data="ybsave.zdbsschybpyqk" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">

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
                        <el-col :span='1' :offset='1' style="padding-top:80px;">
                            <el-button icon="el-icon-plus" size='mini' circle @click="addRow(4)" class="plus"></el-button>
                        </el-col>
                        <el-col :span='1' style="padding-top:80px;">
                            <el-button icon="el-icon-minus" size='mini' circle @click="delRow(4)" class="plus"></el-button>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="20">
                            <div class="table-data">
                                <el-table border :data="ybsave.zdbssyxlwqk" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">

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
                        <el-col :span='1' :offset='1' style="padding-top:80px;">
                            <el-button icon="el-icon-plus" size='mini' circle @click="addRow(5)" class="plus"></el-button>
                        </el-col>
                        <el-col :span='1' style="padding-top:80px;">
                            <el-button icon="el-icon-minus" size='mini' circle @click="delRow(5)" class="plus"></el-button>
                        </el-col>
                    </el-row>

                    <!-- 添加附件 -->
                    <div class="append-btn">
                        <el-upload class="upload-demo" :action="baseUrls" :on-progress="progress6" :on-preview="handlePreview" :on-remove="handleRemove6" :before-remove="beforeRemove" :on-success="handleSuccess6" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList6">
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
                </div>
                <!-- 提交重置 -->
                <div class="submit-box">
                    <el-button type="primary" @click="saveMsg6" class="submit-btn" v-show="saveBack1">保存</el-button>
                    <el-button type="primary" @click="close6" class="submit-btn" v-show="!saveBack1">返回</el-button>
                    <el-button v-if="showStu" :loading="this.loading" type="primary" @click="applySubmit6" class="submit-btn">{{ submit }}</el-button>
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
      queryMsg: "",
      dialogVisible: false,
      saveBack1: true,
      identity: "",
      tableTime: "", // 列表结束时间
      startTime: "", //列表开始时间
      timestamp1: "", //提交当前时间
      timestamp2: "", //申请当前时间
      init: {},
      showStu: true,
      onsuccess1: false,
      onsuccess2: false,
      onsuccess3: false,
      onsuccess4: false,
      onsuccess5: false,
      onsuccess6: false,
      submit: "提交",
      loading: false,
      showTable: true, //展示列表开关
      showTable1: true, //教改项目 展示列表开关
      showTable2: true, //核心课程项目 展示列表开关
      showTable3: true, //实践基地项目 展示列表开关
      showTable4: true, //海外实践基地项目 展示列表开关
      showTable5: true, //教材建设项目 展示列表开关
      showTable6: true, //优博项目 展示列表开关
      fileList1: [], //上传文件列表展示
      fileList2: [], //上传文件列表展示
      fileList3: [], //上传文件列表展示
      fileList4: [], //上传文件列表展示
      fileList5: [], //上传文件列表展示
      fileList6: [], //上传文件列表展示
      id: "",
      loading1: false, //显示正在加载中动画开关
      type: "", //项目类型
      rules1: {
        sqjf: [
          //   { required: true, message: '不能为空', trigger: 'blur' },
          {
            required: true,
            type: "number",
            message: "申请经费必须为数字",
            trigger: "blur"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ]
      },
      rules2: {
        jdyjsrs: [
          //   { required: true, message: '不能为空', trigger: 'blur' },
          { type: "number", message: "人数必须为数字", trigger: "blur" }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ]
      },
      rules5: {
        sqjf: [
          //   { required: true, message: '不能为空', trigger: 'blur' },
          { type: "number", message: "必须为数字", trigger: "blur" }
        ],
        gjzs: [{ type: "number", message: "必须为数字", trigger: "blur" }],
        hbzpzs: [{ type: "number", message: "必须为数字", trigger: "blur" }],
        hbzpbs: [{ type: "number", message: "必须为数字", trigger: "blur" }],
        cszpzs: [{ type: "number", message: "必须为数字", trigger: "blur" }],
        cszpbs: [{ type: "number", message: "必须为数字", trigger: "blur" }],
        zyhsyrs: [{ type: "number", message: "必须为数字", trigger: "blur" }],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ]
      },
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
      dataList: [], // 列表数据
      fj: [],
      list: [],
      // 初始化项目
      jgxm: {}, //教改项目
      ybxm: {}, //优博项目
      hxkcxm: [], //核心课程项目
      sjjdxm: {}, //实践基地项目
      hwsjjdxm: {}, //海外实践基地项目
      jcjsxm: {}, //教材建设项目
      // 教改项目提交
      yqdzycg: [],
      jgsave: {
        xmid: "",
        xmmc: "",
        yqdzycg: "",
        xmxz: "",
        sqjf: "",
        sj: "",
        teaid: "00000003",
        zycjzjk: [
          {
            num: 1,
            xm: "",
            xb: "",
            csrq: "",
            xl: "",
            zc: "",
            zw: "",
            xmfg: "",
            gzdw: "",
            editFlag: false,
            tableNum: 1
          }
        ],
        ywcjgxmhsj: "",
        yjnr: "",
        gzxz: "",
        zyyjfx: "",
        gztj: "",
        xmyqcgxsxg: "",
        jfys: [
          {
            num: 1,
            sj: "",
            jfys: "",
            yt: "",
            editFlag: false,
            tableNum: 2
          }
        ],
        fj: []
      },
      // 优博项目提交
      ybsave: {
        xmid: "",
        xh: "",
        yjfx: "",
        gblx: "",
        sqzzlx: "",
        ndxwlwtm: "",
        zclwkyxm: [
          {
            num: 1,
            kyxmmc: "",
            xmly: "",
            xmjf: "",
            xmfzr: "",
            editFlag: false,
            tableNum: 3
          }
        ],
        sqryjgzjz: "",
        sqrlw: "",
        xwlwzyyjfxnr: "",
        yjgzjzap: "",
        bxkqglwfx: "",
        sqryjcgsp: "",
        mbsxjsap: "",
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
            tableNum: 4
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
            tableNum: 5
          }
        ],
        fj: []
      },
      // 核心课程项目提交
      hxkcsave: {
        xmid: "",
        kcmc: "",
        ssxk: "",
        kcxz: "",
        kccc: "",
        kclb: "",
        qsslxq: "",
        jdyjsrs: "",
        kcszjs: "",
        tlkcjxgk: "",
        jxyjgzzycg: "",
        jcjsqk: "",
        jxmsjxff: "",
        jxsd: "",
        teaid: "",
        zyjxgzjl: [
          {
            num: 1,
            sj: "",
            kcmc: "",
            skdx: "",
            xs: "",
            dw: "",
            editFlag: false,
            tableNum: 6
          }
        ],
        jsnzyjxyj: "",
        kczcyqk: [
          {
            num: 1,
            xm: "",
            xb: "",
            xlxw: "",
            zc: "",
            zy: "",
            ssxy: "",
            zjjs: "",
            editFlag: false,
            tableNum: 7
          }
        ],
        kczcyjx: "",
        sj: "",
        //   kcjsqxjssj: '',
        //   kcjsqxkssj: '',
        jsmbhyqcg: "",
        kjjscsjtjbz: "",
        jfys: [
          {
            num: 1,
            sj: "",
            jfys: "",
            yt: "",
            editFlag: false,
            tableNum: 8
          }
        ],
        fj: []
      },
      // 实践基地项目提交
      sjjdhj: [], //实践基地合计
      hwsjjdhj: [], //海外实践基地合计
      sjjdsave: {
        xmid: "",
        xmmc: "",
        teaid: "",
        sj: "",
        xmlb: "",
        xwjdytdwqc: "",
        xwjdytdwxz: "",
        xyqzsj: "",
        xwjdytdwsshy: "",
        xwjdytdwfrdb: "",
        xwjdytdwyx: "",
        xwjdytdwlxrxm: "",
        xwjdytdwdh: "",
        xwjdytdwwz: "",
        ngcddsjzy: [
          {
            num: 1,
            sjzy: "",
            yjss: "",
            ryqk: "",
            editFlag: false,
            tableNum: 9
          }
        ],
        xwjdytdwcz: "",
        xmzycyjbqk: [
          {
            num: 1,
            xm: "",
            csrq: "",
            zczw: "",
            szdw: "",
            editFlag: false,
            tableNum: 10
          }
        ],
        xmjsjc: "",
        sum: "",
        jdllryxm: "",
        jdllryyx: "",
        jdllrycz: "",
        xmjsyyhkxx: "",
        jdllrydh: "",
        xwjdytdwywhz: "",
        xmjsyyxfa: "",
        xmjsmbhjdap: "",
        yqcgjsym: "",
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
        ],

        fj: []
      },
      // 海外实践基地项目提交
      hwsjjdsave: {
        xmid: "",
        sum: "",
        xmmc: "",
        lhpyfs: "",
        sj: "",
        xk: "",
        xwd: "",
        hzdwmc: "",
        hzdwgj: "",
        hzdwdq: "",
        hzdwlxr: "",
        hzdwzw: "",
        hzdwdh: "",
        hzdwyx: "",
        hzdwgs: "",
        hzdwhzms: "",
        ssqk: "",
        wnnjhap: "",
        jfys: [
          {
            num: 1,
            jflb: "",
            ysjf: "",
            ysyj: "",
            editFlag: false,
            tableNum: 12
          }
        ],
        jfyssm: "",
        fj: []
      },
      // 教材建设项目提交
      jcjssave: {
        xmid: "",
        jcmc: "",
        yjskctm: "",
        cbfy: "",
        gjzs: "",
        hbzpzs: "",
        hbzpbs: "",
        cszpzs: "",
        cszpbs: "",
        jgsj: "",
        cbsmc: "",
        cbsj: "",
        sqjf: "",
        sqqtzzqk: "",
        zyhsyrs: "",
        zzjxcg: "",
        zyhzz: [
          {
            num: 1,
            xm: "",
            xb: "",
            nl: "",
            gzdw: "",
            zc: "",
            xl: "",
            editFlag: false,
            tableNum: 13
          }
        ],
        nrzy: "",
        zjml: "",
        bstdhcbjz: "",
        tljcjk: "",
        bsshxqqk: "",
        dwxjydzy: "",
        jfys: "",
        ysxtcn: "",
        fj: []
      },
      multipleSelection: []
    };
  },
  methods: {
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
    //加载列表
    loadTable() {
      if (this.has("xmfb:selectYFB")) {
        this.$http
          .get(this.$server.glourl + "xmfb/selectYFB", {
            params: this.pageHelp
          })
          .then(response => {
            // console.log(response.data);
            const data = response.data;
            this.dataList = data.page.list;
            this.pageList = data.page;
          });
      } else {
        console.log();
      }
      this.loading = false;
      // if(this.has('xmfb:selectYFB')){

      // }else {
      //         console.log(1)
      // }
    },
    //点击列表选中
    clickRow(row) {
      this.$refs.moviesTable.toggleRowSelection(row);
    },
    // 列表选择改变事件
    handleSelectionChange(selection) {
      //console.log(selection);
      if (selection.length == 0) {
        this.id = "";
        this.type = "";
        this.tableTime = "";
        this.startTime = "";
        //   this.lcid = ''
      } else {
        this.id = selection[0].id;
        this.type = selection[0].type;
        this.tableTime = selection[0].jssj;
        this.startTime = selection[0].kssj;
        // console.log(this.type);
      }
    },
    //列表查询
    query(queryMsg) {
      // console.log(queryMsg);
      this.queryMsg = queryMsg;
      this.dialogVisible = true;
    },
    //   项目申请按钮函数
    addApply() {
      this.$http
        .get(this.$server.glourl + "xmfb/selectIdentityByUserName")
        .then(response => {
          this.identity = response.data.identity;
        });

      this.timestamp2 = new Date().getTime();
      if (this.id == null || this.id == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
      } else {
        if (this.type == "0") {
          this.$http
            .get(this.$server.glourl + "teajgxm/selectJGInit?id=" + this.id)
            .then(response => {
              //   console.log(response.data);
              // console.log(this.timestamp2)
              // console.log(this.timestamp)
              // console.log(this.startTime > this.timestamp2);
              if (this.startTime > this.timestamp2) {
                this.$message({
                  message: "请等待项目开启!",
                  type: "error"
                });
                return;
              } else {
                if (this.tableTime < this.timestamp2) {
                  this.$message({
                    message: "已过期，无效操作!",
                    type: "error"
                  });
                  return;
                } else {
                  if (this.identity == 2) {
                    // this.saveBack1 = false;
                    this.showStu = true;
                    this.jgxm = response.data.map.initPerson;
                    this.init = response.data.map.initAdminXm;
                    if (response.data.map.initPerson.xbm == "1") {
                      this.jgxm.xbm = "男";
                    } else {
                      this.jgxm.xbm = "女";
                    }
                    this.init.fj = JSON.parse(response.data.map.initAdminXm.fj);
                  } else {
                    this.showStu = false;
                    // this.saveBack1 = true;
                    this.init = response.data.map.initAdminXm;
                    this.init.fj = JSON.parse(response.data.map.initAdminXm.fj);
                  }
                  this.showTable = false;
                  this.showTable1 = false;
                }
              }
            });
        } else if (this.type == "5") {
          this.$http
            .get(this.$server.glourl + "stuybpyxm/selectPbInit?id=" + this.id)
            .then(response => {
              // console.log(response.data);
              if (this.startTime > this.timestamp2) {
                this.$message({
                  message: "请等待项目开启!",
                  type: "error"
                });
                return;
              } else {
                if (this.tableTime < this.timestamp2) {
                  this.$message({
                    message: "已过期，无效操作!",
                    type: "error"
                  });
                  return;
                } else {
                  //console.log(response.data);
                  if (response.data.map.identity == 1) {
                    this.saveBack1 = true;
                    this.ybxm = response.data.map.initPerson;
                    this.init = response.data.map.initAdminXm;
                    this.init.fj = JSON.parse(response.data.map.initAdminXm.fj);
                  } else {
                    this.showStu = false;
                    this.saveBack1 = false;
                    this.init = response.data.map.initAdminXm;
                    this.init.fj = JSON.parse(response.data.map.initAdminXm.fj);
                  }
                  this.showTable = false;
                  this.showTable6 = false;
                }
              }
            });
        } else if (this.type == "1") {
          this.$http
            .get(this.$server.glourl + "teahxkcxm/hxkcInit?id=" + this.id)
            .then(response => {
              console.log(response.data);
              if (this.startTime > this.timestamp2) {
                this.$message({
                  message: "请等待项目开启!",
                  type: "error"
                });
                return;
              } else {
                if (this.tableTime < this.timestamp2) {
                  this.$message({
                    message: "已过期，无效操作!",
                    type: "error"
                  });
                  return;
                } else {
                  if (this.identity == 2) {
                    //  this.saveBack1 = false;
                    this.showStu = true;
                    this.hxkcxm = response.data.map.initPerson;
                    this.init = response.data.map.initAdminXm;
                    this.init.fj = JSON.parse(response.data.map.initAdminXm.fj);
                  } else {
                    this.showStu = false;
                    // this.saveBack1 = true;
                    this.init = response.data.map.initAdminXm;
                    this.init.fj = JSON.parse(response.data.map.initAdminXm.fj);
                  }
                  this.showTable = false;
                  this.showTable2 = false;
                }
              }
            });
        } else if (this.type == "2") {
          this.$http
            .get(this.$server.glourl + "teasjjdxm/sjjdxmInit?id=" + this.id)
            .then(response => {
              //console.log(response.data);
              // console.log(this.tableTime);
              if (this.startTime > this.timestamp2) {
                this.$message({
                  message: "请等待项目开启!",
                  type: "error"
                });
                return;
              } else {
                if (this.tableTime < this.timestamp2) {
                  this.$message({
                    message: "已过期，无效操作!",
                    type: "error"
                  });
                  return;
                } else {
                  if (this.identity == 2) {
                    // this.saveBack1 = false;
                    this.showStu = true;
                    this.sjjdxm = response.data.map.initPerson;
                    this.init = response.data.map.initAdminXm;
                    this.init.fj = JSON.parse(response.data.map.initAdminXm.fj);
                  } else {
                    this.showStu = false;
                    // this.saveBack1 = true;
                    this.init = response.data.map.initAdminXm;
                    this.init.fj = JSON.parse(response.data.map.initAdminXm.fj);
                  }
                  this.showTable = false;
                  this.showTable3 = false;
                }
              }
            });
        } else if (this.type == "3") {
          this.$http
            .get(this.$server.glourl + "teahwsjjdxm/hwsjjdInit?id=" + this.id)
            .then(response => {
              // console.log(response.data);
              //console.log(this.tableTime);
              if (this.startTime > this.timestamp2) {
                this.$message({
                  message: "请等待项目开启!",
                  type: "error"
                });
                return;
              } else {
                if (this.tableTime < this.timestamp2) {
                  this.$message({
                    message: "已过期，无效操作!",
                    type: "error"
                  });
                  return;
                } else {
                  if (this.identity == 2) {
                    //this.saveBack1 = false;
                    this.showStu = true;
                    this.hwsjjdxm = response.data.map.initPerson;
                    this.init = response.data.map.initAdminXm;
                    this.init.fj = JSON.parse(response.data.map.initAdminXm.fj);
                  } else {
                    this.showStu = false;
                    //this.saveBack1 = true;
                    this.init = response.data.map.initAdminXm;
                    this.init.fj = JSON.parse(response.data.map.initAdminXm.fj);
                  }
                  this.showTable = false;
                  this.showTable4 = false;
                }
              }
            });
          this.showTable = false;
          this.showTable4 = false;
        } else if (this.type == "4") {
          this.$http
            .get(this.$server.glourl + "teajcjsxm/jcjsInit?id=" + this.id)
            .then(response => {
              //console.log(response.data);
              // console.log(this.tableTime);
              if (this.startTime > this.timestamp2) {
                this.$message({
                  message: "请等待项目开启!",
                  type: "error"
                });
                return;
              } else {
                if (this.tableTime < this.timestamp2) {
                  this.$message({
                    message: "已过期，无效操作!",
                    type: "error"
                  });
                  return;
                } else {
                  if (this.identity == 2) {
                    this.showStu = true;
                    //this.saveBack1 = false;
                    this.jcjsxm = response.data.map.initPerson;
                    this.init = response.data.map.initAdminXm;
                    this.init.fj = JSON.parse(response.data.map.initAdminXm.fj);
                  } else {
                    this.showStu = false;
                    //this.saveBack1 = true;
                    this.init = response.data.map.initAdminXm;
                    this.init.fj = JSON.parse(response.data.map.initAdminXm.fj);
                  }
                  this.showTable = false;
                  this.showTable5 = false;
                }
              }
            });
        }
      }
    },
    //申请信息table鼠标经过事件
    handleMouseEnter(row, column, cell, event) {
      const tableIndex = row.tableNum;
      let num = row.num - 1;
      switch (tableIndex) {
        // 教改
        case 1:
          this.jgsave.zycjzjk[num].editFlag = true;
          break;
        case 2:
          this.jgsave.jfys[num].editFlag = true;
          break;
        // 优博
        case 3:
          this.ybsave.zclwkyxm[num].editFlag = true;
          break;
        case 4:
          this.ybsave.zdbsschybpyqk[num].editFlag = true;
          break;
        case 5:
          this.ybsave.zdbssyxlwqk[num].editFlag = true;
          break;
        // 核心课程
        case 6:
          this.hxkcsave.zyjxgzjl[num].editFlag = true;
          break;
        case 7:
          this.hxkcsave.kczcyqk[num].editFlag = true;
          break;
        case 8:
          this.hxkcsave.jfys[num].editFlag = true;
          break;
        // 实践基地
        case 9:
          this.sjjdsave.ngcddsjzy[num].editFlag = true;
          break;
        case 10:
          this.sjjdsave.xmzycyjbqk[num].editFlag = true;
          break;
        case 11:
          this.sjjdsave.jfys[num].editFlag = true;
          break;
        // 海外实践基地
        case 12:
          this.hwsjjdsave.jfys[num].editFlag = true;
          break;
        // 教材建设
        case 13:
          this.jcjssave.zyhzz[num].editFlag = true;
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
        // 教改
        case 1:
          this.jgsave.zycjzjk[num].editFlag = false;
          break;
        case 2:
          this.jgsave.jfys[num].editFlag = false;
          break;
        // 优博
        case 3:
          this.ybsave.zclwkyxm[num].editFlag = false;
          break;
        case 4:
          this.ybsave.zdbsschybpyqk[num].editFlag = false;
          break;
        case 5:
          this.ybsave.zdbssyxlwqk[num].editFlag = false;
          break;
        // 核心课程
        case 6:
          this.hxkcsave.zyjxgzjl[num].editFlag = false;
          break;
        case 7:
          this.hxkcsave.kczcyqk[num].editFlag = false;
          break;
        case 8:
          this.hxkcsave.jfys[num].editFlag = false;
          break;
        // 实践基地
        case 9:
          this.sjjdsave.ngcddsjzy[num].editFlag = false;
          break;
        case 10:
          this.sjjdsave.xmzycyjbqk[num].editFlag = false;
          break;
        case 11:
          this.sjjdsave.jfys[num].editFlag = false;
          break;
        // 海外实践基地
        case 12:
          this.hwsjjdsave.jfys[num].editFlag = false;
          break;
        // 教材建设
        case 13:
          this.jcjssave.zyhzz[num].editFlag = false;
          break;
        default:
          break;
      }
    },
    //申请表信息动态添加行
    addRow(tableIndex) {
      switch (tableIndex) {
        // 教改
        case 1:
          this.jgsave.zycjzjk.push({
            num: this.jgsave.zycjzjk.length + 1,
            editFlag: false,
            tableNum: 1
          });
          break;
        case 2:
          this.jgsave.jfys.push({
            num: this.jgsave.jfys.length + 1,
            editFlag: false,
            tableNum: 2
          });
          break;
        // 优博
        case 3:
          this.ybsave.zclwkyxm.push({
            num: this.ybsave.zclwkyxm.length + 1,
            editFlag: false,
            tableNum: 3
          });
          break;
        case 4:
          this.ybsave.zdbsschybpyqk.push({
            num: this.ybsave.zdbsschybpyqk.length + 1,
            editFlag: false,
            tableNum: 4
          });
          break;
        case 5:
          this.ybsave.zdbssyxlwqk.push({
            num: this.ybsave.zdbssyxlwqk.length + 1,
            editFlag: false,
            tableNum: 5
          });
          break;
        // 核心课程
        case 6:
          this.hxkcsave.zyjxgzjl.push({
            num: this.hxkcsave.zyjxgzjl.length + 1,
            editFlag: false,
            tableNum: 6
          });
          break;
        case 7:
          this.hxkcsave.kczcyqk.push({
            num: this.hxkcsave.kczcyqk.length + 1,
            editFlag: false,
            tableNum: 7
          });
          break;
        case 8:
          this.hxkcsave.jfys.push({
            num: this.hxkcsave.jfys.length + 1,
            editFlag: false,
            tableNum: 8
          });
          break;
        // 实践基地
        case 9:
          this.sjjdsave.ngcddsjzy.push({
            num: this.sjjdsave.ngcddsjzy.length + 1,
            editFlag: false,
            tableNum: 9
          });
          break;
        case 10:
          this.sjjdsave.xmzycyjbqk.push({
            num: this.sjjdsave.xmzycyjbqk.length + 1,
            editFlag: false,
            tableNum: 10
          });
          break;
        case 11:
          this.sjjdsave.jfys.push({
            num: this.sjjdsave.jfys.length + 1,
            editFlag: false,
            tableNum: 11
          });
          break;
        // 海外实践基地
        case 12:
          this.hwsjjdsave.jfys.push({
            num: this.hwsjjdsave.jfys.length + 1,
            editFlag: false,
            tableNum: 12
          });
          break;
        // 教材建设
        case 13:
          this.jcjssave.zyhzz.push({
            num: this.jcjssave.zyhzz.length + 1,
            editFlag: false,
            tableNum: 13
          });
          break;
        default:
          break;
      }
    },
    //申请信息动态减少行
    delRow(tableIndex) {
      switch (tableIndex) {
        // 教改
        case 1:
          if (this.jgsave.zycjzjk.length == 1) {
            return;
          }
          this.jgsave.zycjzjk.pop();
          break;
        case 2:
          if (this.jgsave.jfys.length == 1) {
            return;
          }
          this.jgsave.jfys.pop();
          break;
        // 优博
        case 3:
          if (this.ybsave.zclwkyxm.length == 1) {
            return;
          }
          this.ybsave.zclwkyxm.pop();
          break;
        case 4:
          if (this.ybsave.zdbsschybpyqk.length == 1) {
            return;
          }
          this.ybsave.zdbsschybpyqk.pop();
          break;
        case 5:
          if (this.ybsave.zdbssyxlwqk.length == 1) {
            return;
          }
          this.ybsave.zdbssyxlwqk.pop();
          break;
        // 核心课程
        case 6:
          if (this.hxkcsave.zyjxgzjl.length == 1) {
            return;
          }
          this.hxkcsave.zyjxgzjl.pop();
          break;
        case 7:
          if (this.hxkcsave.kczcyqk.length == 1) {
            return;
          }
          this.hxkcsave.kczcyqk.pop();
          break;
        case 8:
          if (this.hxkcsave.jfys.length == 1) {
            return;
          }
          this.hxkcsave.jfys.pop();
          break;
        // 实践基地
        case 9:
          if (this.sjjdsave.ngcddsjzy.length == 1) {
            return;
          }
          this.sjjdsave.ngcddsjzy.pop();
          break;
        case 10:
          if (this.sjjdsave.xmzycyjbqk.length == 1) {
            return;
          }
          this.sjjdsave.xmzycyjbqk.pop();
          break;
        case 11:
          if (this.sjjdsave.jfys.length == 1) {
            return;
          }
          this.sjjdsave.jfys.pop();
          break;
        // 海外实践基地
        case 12:
          if (this.hwsjjdsave.jfys.length == 1) {
            return;
          }
          this.hwsjjdsave.jfys.pop();
          break;
        // 教材建设
        case 13:
          if (this.jcjssave.zyhzz.length == 1) {
            return;
          }
          this.jcjssave.zyhzz.pop();
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
      // console.log(sums)
      // console.log(sums.splice(0,1))
      this.sjjdhj = sums;
      return sums;
    },
    getSummaries1(param) {
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
      // console.log(sums)
      // console.log(sums.splice(0,1))
      this.hwsjjdhj = sums;
      return sums;
    },
    //关闭申请页面
    close1() {
      this.showTable = true;
      this.showTable1 = true;
      this.loadTable();
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
      this.showTable4 = true;
      this.loadTable();
    },
    close5() {
      this.showTable = true;
      this.showTable5 = true;
      this.loadTable();
    },
    close6() {
      this.showTable = true;
      this.showTable6 = true;
      this.loadTable();
    },
    // 文件上传成功时的钩子
    handleSuccess1(response, file, fileList) {
      this.jgsave.fj.push({ name: response.name, url: response.url });
      this.onsuccess1 = false;
    },
    handleSuccess2(response, file, fileList) {
      this.hxkcsave.fj.push({ name: response.name, url: response.url });
      this.onsuccess2 = false;
    },
    handleSuccess3(response, file, fileList) {
      this.sjjdsave.fj.push({ name: response.name, url: response.url });
      this.onsuccess3 = false;
    },
    handleSuccess4(response, file, fileList) {
      this.hwsjjdsave.fj.push({ name: response.name, url: response.url });
      this.onsuccess4 = false;
    },
    handleSuccess5(response, file, fileList) {
      this.jcjssave.fj.push({ name: response.name, url: response.url });
      this.onsuccess5 = false;
    },
    handleSuccess6(response, file, fileList) {
      this.ybsave.fj.push({ name: response.name, url: response.url });
      this.onsuccess6 = false;
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
    progress4: function() {
      this.onsuccess4 = true;
    },
    progress5: function() {
      this.onsuccess5 = true;
    },
    progress6: function() {
      this.onsuccess6 = true;
    },
    handleRemove1(file, fileList) {
      this.onsuccess1 = false;
      this.fileList1 = fileList;
      this.jgsave.fj = this.fileList1;
    },
    handleRemove2(file, fileList) {
      this.onsuccess2 = false;
      this.fileList2 = fileList;
      this.hxkcsave.fj = this.fileList2;
    },
    handleRemove3(file, fileList) {
      this.onsuccess3 = false;
      this.fileList3 = fileList;
      this.sjjdsave.fj = this.fileList3;
    },
    handleRemove4(file, fileList) {
      this.onsuccess4 = false;
      this.fileList4 = fileList;
      this.hwsjjdsave.fj = this.fileList4;
    },
    handleRemove5(file, fileList) {
      this.onsuccess5 = false;
      this.fileList5 = fileList;
      this.jcjssave.fj = this.fileList5;
    },
    handleRemove6(file, fileList) {
      this.onsuccess6 = false;
      this.fileList6 = fileList;
      this.ybsave.fj = this.fileList6;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 教改项目提交
    applySubmit1() {
      this.timestamp1 = new Date().getTime();
      if (this.tableTime < this.timestamp1) {
        this.$message({
          message: "已过期，无效操作!",
          type: "error"
        });
        return;
      } else {
        if (!this.jgsave.sj) {
          this.$message({
            message: "请选择起止时间！",
            type: "error"
          });
          return;
        }
        this.loading = true;
        this.submit = "加载中";
        this.jgsave.xmid = this.id;
        this.jgsave.yqdzycg = this.yqdzycg.join();
        // console.log(this.jgsave.yqdzycg)
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        this.$http
          .post(this.$server.glourl + "teajgxm/jgxmApply", this.jgsave)
          .then(response => {
            if (response.data.code == 0) {
              this.$message({
                message: "提交成功！",
                type: "success"
              });
              this.loading = false;
              this.submit = "提交";
              this.reload();

              this.showTable = true;
              this.showTable1 = true;
              // this.loadTable()
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    saveMsg1() {
      this.jgsave.xmid = this.id;
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.jgsave.yqdzycg = this.yqdzycg.join();
      this.$http
        .post(this.$server.glourl + "teajgxm/save", this.jgsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.reload();
            this.showTable = true;
            this.showTable1 = true;
            // this.loadTable()
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 核心课程提交
    applySubmit2() {
      this.timestamp1 = new Date().getTime();
      if (this.tableTime < this.timestamp1) {
        this.$message({
          message: "已过期，无效操作!",
          type: "error"
        });
        return;
      } else {
        if (!this.hxkcsave.sj) {
          this.$message({
            message: "请选择课程建设的期限！",
            type: "error"
          });
          return;
        }
        this.loading = true;
        this.submit = "加载中";
        this.hxkcsave.xmid = this.id;
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        this.$http
          .post(this.$server.glourl + "teahxkcxm/startLc", this.hxkcsave)
          .then(response => {
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
      }
    },
    saveMsg2() {
      this.hxkcsave.xmid = this.id;
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$http
        .post(this.$server.glourl + "teahxkcxm/save", this.hxkcsave)
        .then(response => {
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
    // 实践基地提交
    applySubmit3() {
      this.timestamp1 = new Date().getTime();
      if (this.tableTime < this.timestamp1) {
        this.$message({
          message: "已过期，无效操作!",
          type: "error"
        });
        return;
      } else {
        if (!this.sjjdsave.sj) {
          this.$message({
            message: "请选择协议起止时间！",
            type: "error"
          });
          return;
        }
        this.loading = true;
        this.submit = "加载中";
        // this.loading = false
        // sjjdhj = sums
        this.sjjdhj.splice(0, 2);
        this.sjjdsave.sum = this.sjjdhj.join();
        this.sjjdsave.xmid = this.id;
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        this.$http
          .post(this.$server.glourl + "teasjjdxm/sjjdptApply", this.sjjdsave)
          .then(response => {
            if (response.data.code == 0) {
              this.$message({
                message: "提交成功！",
                type: "success"
              });
              this.loading = false;
              this.submit = "提交";
              this.reload();
              this.showTable = true;
              this.showTable3 = true;
              // this.loadTable()
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    saveMsg3() {
      this.sjjdsave.xmid = this.id;
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$http
        .post(this.$server.glourl + "teasjjdxm/save", this.sjjdsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.reload();
            this.showTable = true;
            this.showTable3 = true;
            // this.loadTable()
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 海外实践基地提交
    applySubmit4() {
      this.timestamp1 = new Date().getTime();
      if (this.tableTime < this.timestamp1) {
        this.$message({
          message: "已过期，无效操作!",
          type: "error"
        });
        return;
      } else {
        if (!this.hwsjjdsave.sj) {
          this.$message({
            message: "请选择协议起止时间！",
            type: "error"
          });
          return;
        }
        this.loading = true;
        this.submit = "加载中";
        // this.loading = false
        this.hwsjjdhj.splice(0, 2);
        this.hwsjjdhj.splice(1, 1);
        // console.log(this.sjjdhj)
        this.hwsjjdsave.sum = this.hwsjjdhj.join();
        this.hwsjjdsave.xmid = this.id;
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        // console.log(this.hwsjjdsave.fj)
        this.$http
          .post(this.$server.glourl + "teahwsjjdxm/lcStart", this.hwsjjdsave)
          .then(response => {
            // console.log(response.data)
            if (response.data.code == 0) {
              this.$message({
                message: "提交成功！",
                type: "success"
              });
              this.loading = false;
              this.submit = "提交";
              this.reload();
              this.showTable = true;
              this.showTable4 = true;
              this.loadTable();
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    saveMsg4() {
      this.hwsjjdhj.splice(0, 2);
      this.hwsjjdhj.splice(1, 1);
      // console.log(this.sjjdhj)
      this.hwsjjdsave.sum = this.hwsjjdhj.join();
      this.hwsjjdsave.xmid = this.id;
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // console.log(this.hwsjjdsave.fj)
      this.$http
        .post(this.$server.glourl + "teahwsjjdxm/save", this.hwsjjdsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.reload();
            this.showTable = true;
            this.showTable4 = true;
            // this.loadTable()
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 教材建设提交
    applySubmit5() {
      this.timestamp1 = new Date().getTime();
      if (this.tableTime < this.timestamp1) {
        this.$message({
          message: "已过期，无效操作!",
          type: "error"
        });
        return;
      } else {
        this.loading = true;
        this.submit = "加载中";
        // this.loading = false
        this.jcjssave.xmid = this.id;
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        this.$http
          .post(this.$server.glourl + "teajcjsxm/lcStart", this.jcjssave)
          .then(response => {
            if (response.data.code == 0) {
              this.$message({
                message: "提交成功！",
                type: "success"
              });
              this.loading = false;
              this.submit = "提交";
              this.reload();
              this.showTable = true;
              this.showTable5 = true;
              // this.loadTable()
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    saveMsg5() {
      this.jcjssave.xmid = this.id;
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$http
        .post(this.$server.glourl + "teajcjsxm/save", this.jcjssave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.reload();
            this.showTable = true;
            this.showTable5 = true;
            // this.loadTable()
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 优博项目提交
    applySubmit6() {
      this.timestamp1 = new Date().getTime();
      // console.log(this.tableTime);
      if (this.tableTime < this.timestamp1) {
        this.$message({
          message: "已过期，无效操作!",
          type: "error"
        });
        return;
      } else {
        this.loading = true;
        this.submit = "加载中";
        // this.loading = false
        this.ybsave.xmid = this.id;
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        // this.save.jfly = this.jfly.join()
        this.$http
          .post(this.$server.glourl + "stuybpyxm/lcStart", this.ybsave)
          .then(response => {
            if (response.data.code == 0) {
              this.$message({
                message: "提交成功！",
                type: "success"
              });
              this.loading = false;
              this.submit = "提交";
              this.reload();
              this.showTable = true;
              this.showTable6 = true;
              // this.loadTable()
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    saveMsg6() {
      this.ybsave.xmid = this.id;
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // this.save.jfly = this.jfly.join()
      this.$http
        .post(this.$server.glourl + "stuybpyxm/save", this.ybsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.reload();
            this.showTable = true;
            this.showTable6 = true;
            // this.loadTable()
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  mounted() {
    this.loadTable();
  }
};
</script>
<style>
.long >>> .el-form-item__label {
  line-height: 25px;
}
.el-button + .el-button {
  margin-left: 0px;
}
</style>

<style lang="scss" scoped>
textarea {
  resize: none;
  outline: none;
  width: 98.5%;
  overflow-y: scroll;
  line-height: 20px;
  font-size: 14px;
  font-family: "微软雅黑";
}
@import "../../style/common"; //必须加分号，不然会报错
@import "../../style/ele";
</style>