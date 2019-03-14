<template>
    <div style="width:100%">
        <div class="container" v-show="showTable2">
            <el-row>
                <!-- <el-col :span="12">
                    <div class="grid-content">
                        <el-input placeholder="请输入内容" style="width:50%"></el-input>
                        <el-button>查询</el-button>
                    </div>
                </el-col> -->
                <el-col :span="24">
                    <el-row style="float:right">
                        <el-button type="warning" @click="handleEdit">审核</el-button>
                    </el-row>
                </el-col>
            </el-row>
            <el-table ref="moviesTable" :data="page.slice((currentPage-1)*pageSize,currentPage*pageSize)" @row-click="clickRow" tooltip-effect="dark" style="margin:0 auto;margin-top:5px;text-align:center" @selection-change="handleSelectionChange" border>
                <el-table-column type="selection" width="55" align="center">
                </el-table-column>
                <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="80">
                </el-table-column>
                <el-table-column label="id" type="index" align="center" v-if='show'>
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column label="学号" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.xh }}</template>
                </el-table-column>
                <el-table-column prop="xm" label="姓名" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.xm }}</template>
                </el-table-column>
                <el-table-column prop="zy" label="专业" show-overflow-tooltip align="center">
                    <template slot-scope="scope">{{ scope.row.zy }}</template>
                </el-table-column>
                <el-table-column prop="yqdxf" label="取得总学分" show-overflow-tooltip align="center">
                    <template slot-scope="scope">{{ scope.row.qdzxf }}</template>
                </el-table-column>
                <el-table-column prop="dsshzt" label="审核状态" show-overflow-tooltip align="center">
                    <template slot-scope="scope">{{ scope.row.shzt=='0' ? '待审核' :scope.row.shzt=='1'?'审核通过':scope.row.shzt=='2'?'审核不通过' :scope.row.shzt == '3'?'学院审核不通过':scope.row.shzt == '4'?'学校待审':scope.row.shzt == '5'?'不通过' : '通过'}}</template>
                </el-table-column>
            </el-table>
            <div class="block" style="text-align:center;margin-top:30px">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.length">
                </el-pagination>
            </div>
        </div>
        <div v-show="showTable" class="container">
            <div>
                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>申请学位资格基本信息</span>
                    </el-col>
                </el-row>

                <el-form :model="stuxwzgsq" :rules="rules" ref="stuxwzgsq" label-width="177px" class="demo-stuxwzgsq" label-position="left" style="padding-top:50px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="报考时照片：" prop="picture">
                                <div class="user-avatar">
                                    <img v-bind:src="stuxwzgsq.bkzp" alt="">
                                </div>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="毕业时照片：" prop="photo">
                                <div class="user-avatar">
                                    <img v-bind:src="stuxwzgsq.byzp" alt="">
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="姓名：" prop="xm">
                                <el-input v-model="stuxwzgsq.xm" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="学号：" prop="xh">
                                <el-input v-model="stuxwzgsq.xh" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="出生年月：" prop="csrq">
                                <el-input v-model="stuxwzgsq.csrq" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="身份证号码：" prop="sfzjh">
                                <el-input v-model="stuxwzgsq.sfzjh" readonly="readonly"> </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="户口所在地：" prop="jg">
                                <el-input v-model="stuxwzgsq.jg" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="入学时学历：" prop="rxxlm">
                                <el-input v-model="stuxwzgsq.rxxlm" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="已获最高学位年月：" prop="yhdzgxwny">
                                <el-input v-model="stuxwzgsq.yhdzgxwny" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="获学位名称：" prop="zhxlm">
                                <el-input v-model="stuxwzgsq.zhxlm" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="录取类别：" prop="lqlbm">
                                <el-input v-model="stuxwzgsq.lqlbm" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="导师姓名：" prop="dsxm">
                                <el-input v-model="stuxwzgsq.dsxm" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="外语程度（CET6-425）：" prop="wycd">
                                <el-input v-model="stuxwzgsq.wycd" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所学专业代码：" prop="zym">
                                <el-input v-model="stuxwzgsq.zym" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="所学专业名称：" prop="zy">
                                <el-input v-model="stuxwzgsq.zy" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="取得总学分：" prop="qdzxf">
                                <el-input v-model="stuxwzgsq.qdzxf" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="其中学位课总学分：" prop="xwkzxf">
                                <el-input v-model="stuxwzgsq.xwkzxf" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="学位课总平均分：" prop="xwkzpjf">
                                <el-input v-model="stuxwzgsq.xwkzpjf" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="已获学位一级学科：" prop="yjxk">
                                <el-input v-model="stuxwzgsq.yjxk" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="通过综合水平考试年份：" prop="tgzhksnf">
                                <el-input v-model="stuxwzgsq.tgzhksnf" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <div class="long">
                            <el-col :span="12">
                                <el-form-item label="同等学历人员申请硕士通过外语统考年份：" prop="wytknf">
                                    <el-input v-model="stuxwzgsq.wytknf" readonly="readonly"></el-input>
                                </el-form-item>
                            </el-col>
                        </div>

                        <el-col :span="12">
                            <el-form-item label="证书号：" prop="zsh">
                                <el-input v-model="stuxwzgsq.zsh" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- <el-row>
                        <el-col :span='24' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>授予的学位信息</span>
                        </el-col>
                    </el-row> -->
                    <el-row :gutter="20">
                        <div class="long">
                            <el-col :span="12">
                                <el-form-item label="授予学位：" prop="year1">
                                    <el-input v-model="ruleForm.year1"></el-input>
                                </el-form-item>
                            </el-col>
                        </div>

                        <el-col :span="12">
                            <el-form-item label="学位证书号：" prop="certificateId">
                                <el-input v-model="ruleForm.certificateId"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <div class="long">
                            <el-col :span="12">
                                <el-form-item label="结束学业年月：" prop="year1">
                                    <el-input v-model="ruleForm.year1"></el-input>
                                </el-form-item>
                            </el-col>
                        </div>

                        <el-col :span="12">
                            <el-form-item label="结束学业方式：" prop="certificateId">
                                <el-input v-model="ruleForm.certificateId"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <div class="long">
                            <el-col :span="12">
                                <el-form-item label="最后学历：" prop="year1">
                                    <el-input v-model="ruleForm.year1"></el-input>
                                </el-form-item>
                            </el-col>
                        </div>

                        <el-col :span="12">
                            <el-form-item label="获博士门类：" prop="certificateId">
                                <el-input v-model="ruleForm.certificateId"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <div class="red">
                            <el-col :span="12">
                                <el-form-item label="获博士日期：" prop="time1" color="red">
                                    <el-input v-model="ruleForm.time1"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <p style="font-size:14px">(若取消该生本次申请学位，则该字段清空！)</p>
                            </el-col>
                        </div>
                    </el-row>
                    <el-row :gutter="20">
                        <!-- <div class="long">
                            <el-col :span="12">
                                <el-form-item label="申请学位备注：" prop="sqxwbz">
                                    <el-input v-model="stujyandxw.sqxwbz"></el-input>
                                </el-form-item>
                            </el-col>
                        </div> -->

                        <el-col :span="12">
                            <el-form-item label="就业单位性质：" prop="jyxzm">
                                <el-input v-model="stujyandxw.jyxzm"></el-input>
                            </el-form-item>
                        </el-col>
                        <div class="long">
                            <el-col :span="12">
                                <el-form-item label="就业单位：" prop="jydwxzm">
                                    <el-input v-model="stujyandxw.jydwxzm"></el-input>
                                </el-form-item>
                            </el-col>
                        </div>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="单位所在地：" prop="jydmssm">
                                <el-input v-model="stujyandxw.jydmssm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item>
                                <el-input v-model="stuxwzgsqs.id" v-show="false"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="bottomBox" style="text-align:center;">

                <el-button type="primary" class="reset" @click="submit()" v-show="dsshzt==null">提交申请</el-button>
                <el-button type="primary" class="reset" v-show="dsshzt==0" disabled style="background-color:gray">导师审核中</el-button>
                <el-button type="primary" class="reset" v-show="dsshzt==1" disabled style="background-color:green">审核通过，请上传论文</el-button>
                <el-button type="primary" class="reset" v-show="dsshzt==2" disabled style="background-color:red">审核不通过</el-button>
            </div>
        </div>

        <!-- 审核  页面 -->
        <div v-show="!showTables" class="container">
            <div>
                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>申请学位资格基本信息</span>
                    </el-col>
                </el-row>
                <el-form :model="stuxwzgsqs" :rules="rules" ref="stuxwzgsqs" label-width="177px" class="demo-stuxwzgsqs" label-position="left" style="padding-top:50px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="报考时照片：" prop="picture">
                                <div class="user-avatar">
                                    <img v-bind:src="stuxwzgsqs.bkzp" alt="">
                                </div>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="毕业时照片：" prop="photo">
                                <div class="user-avatar">
                                    <img v-bind:src="stuxwzgsqs.byzp" alt="">
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="姓名：" prop="xm">
                                <el-input v-model="stuxwzgsqs.xm" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="学号：" prop="xh">
                                <el-input v-model="stuxwzgsqs.xh" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="出生年月：" prop="csrq">
                                <el-input v-model="stuxwzgsqs.csrq" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="身份证号码：" prop="sfzjh">
                                <el-input v-model="stuxwzgsqs.sfzjh" readonly="readonly"> </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="户口所在地：" prop="jg">
                                <el-input v-model="stuxwzgsqs.jg" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="入学时学历：" prop="rxxlm">
                                <el-input v-model="stuxwzgsqs.rxxlm" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="已获最高学位年月：" prop="yhdzgxwny">
                                <el-input v-model="stuxwzgsqs.yhdzgxwny" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="获学位名称：" prop="zhxlm">
                                <el-input v-model="stuxwzgsqs.zhxlm" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="录取类别：" prop="lqlbm">
                                <el-input v-model="stuxwzgsqs.lqlbm" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="导师姓名：" prop="dsxm">
                                <el-input v-model="stuxwzgsqs.dsxm" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="外语程度（CET6-425）：" prop="wycd">
                                <el-input v-model="stuxwzgsqs.wycd" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所学专业代码：" prop="zym">
                                <el-input v-model="stuxwzgsqs.zym" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="所学专业名称：" prop="zy">
                                <el-input v-model="stuxwzgsqs.zy" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="取得总学分：" prop="qdzxf">
                                <el-input v-model="stuxwzgsqs.qdzxf" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="其中学位课总学分：" prop="xwkzxf">
                                <el-input v-model="stuxwzgsqs.xwkzxf" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="学位课总平均分：" prop="xwkzpjf">
                                <el-input v-model="stuxwzgsqs.xwkzpjf" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="已获学位一级学科：" prop="yjxk">
                                <el-input v-model="stuxwzgsqs.yjxk" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="通过综合水平考试年份：" prop="tgzhksnf">
                                <el-input v-model="stuxwzgsqs.tgzhksnf" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <div class="long">
                            <el-col :span="12">
                                <el-form-item label="同等学历人员申请硕士通过外语统考年份：" prop="wytknf">
                                    <el-input v-model="stuxwzgsqs.wytknf" readonly="readonly"></el-input>
                                </el-form-item>
                            </el-col>
                        </div>

                        <el-col :span="12">
                            <el-form-item label="证书号：" prop="zsh">
                                <el-input v-model="stuxwzgsqs.zsh" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- <el-row>
                        <el-col :span='24' style="margin-top:5px;line-height:50px">
                            <div class="small"></div>
                            <span>授予的学位信息</span>
                        </el-col>
                    </el-row> -->
                    <el-row :gutter="20">
                        <div class="long">
                            <el-col :span="12">
                                <el-form-item label="授予学位：" prop="year1">
                                    <el-input v-model="ruleForm.year1"></el-input>
                                </el-form-item>
                            </el-col>
                        </div>

                        <el-col :span="12">
                            <el-form-item label="学位证书号：" prop="certificateId">
                                <el-input v-model="ruleForm.certificateId"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <div class="long">
                            <el-col :span="12">
                                <el-form-item label="结束学业年月：" prop="year1">
                                    <el-input v-model="ruleForm.year1"></el-input>
                                </el-form-item>
                            </el-col>
                        </div>

                        <el-col :span="12">
                            <el-form-item label="结束学业方式：" prop="certificateId">
                                <el-input v-model="ruleForm.certificateId"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <div class="long">
                            <el-col :span="12">
                                <el-form-item label="最后学历：" prop="year1">
                                    <el-input v-model="ruleForm.year1"></el-input>
                                </el-form-item>
                            </el-col>
                        </div>

                        <el-col :span="12">
                            <el-form-item label="获博士门类：" prop="certificateId">
                                <el-input v-model="ruleForm.certificateId"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <div class="red">
                            <el-col :span="12">
                                <el-form-item label="获博士日期：" prop="time1" color="red">
                                    <el-input v-model="ruleForm.time1"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <p style="font-size:14px">(若取消该生本次申请学位，则该字段清空！)</p>
                            </el-col>
                        </div>
                    </el-row>
                    <el-row :gutter="20">
                        <!-- <div class="long">
                            <el-col :span="12">
                                <el-form-item label="申请学位备注：" prop="sqxwbz">
                                    <el-input v-model="stujyandxw1.sqxwbz"></el-input>
                                </el-form-item>
                            </el-col>
                        </div> -->

                        <el-col :span="12">
                            <el-form-item label="就业单位性质：" prop="jyxzm">
                                <el-input v-model="jyqx.jyxzm"></el-input>
                            </el-form-item>
                        </el-col>
                        <div class="long">
                            <el-col :span="12">
                                <el-form-item label="就业单位：" prop="jydwxzm">
                                    <el-input v-model="jyqx.jydwxzm"></el-input>
                                </el-form-item>
                            </el-col>
                        </div>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="单位所在地：" prop="jydmssm">
                                <el-input v-model="jyqx.jydmssm"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item>
                                <el-input v-model="stuxwzgsqs.id" v-show="false"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="bottomBox" style="text-align:center;">

                <el-button type="primary" class="reset" @click="adopt()">通过</el-button>
                <el-button type="primary" class="reset" @click="notadopt()">不通过</el-button>
            </div>
        </div>
    </div>
</template>
</<script>
export default {
  data() {
    return {
      showTable: true, //展示列表开关
      showTable1: true,
      showTable2: true,
      showTables: true,
      ruleForm:[],
      stujyandxw: {
        xh: "",
        xsdbxcg: [{ editFlag: false }]
      },
       stujyandxw1: {
        xh: "",
        xsdbxcg: []
      },
      jyqx: {},
      page: [],
      pageHelp: {
       //列表分页辅助类
       host: 1, //后台需要，标识是否研究生综合服务平台请求
       page: 1,
       limit: 5,
       sidx: "id",
       order: "asc"
      },
      currentPage: 1,
      pageSize: 5,
      ids: "",
      id: "",
      totalItems: 0,
      fileList: [],
      stuXwzgsq: {
        xh: ""
      },
      stuxwzgsq: [],
      stuxwzgsqs:{},
      stuxwzgsq1:{},
      dsshzt: "",
      wid:"",
      username:"",
      rules: {

    }
    }
  },
  mounted() {
    //进入页面，加载申请列表
    this.loadTable();
    
  },
  methods: {
       //申请信息提交事件
    submit: function() {
      this.showTable = true;
      this.stujyandxw.xh = this.stuxwzgsq.xh;
     // console.log(this.stuXwzgsq.xh);
      //   this.submitApply();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$http
        .post("platform-framework/stuxwzgsq/save", this.stujyandxw)
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "申请信息提交成功，请等待审核！",
              type: "success"
            });
            this.showTable = true;
            this.loadTable();
            this.queryByXh();
          }
          //   this.stuxscg = { brand_right: 0 };
        //   console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //根据学号查看个人申请信息审核状态
    queryByXh() {
      this.$http
        .get("platform-framework/stuxwzgsq/queryByXh")
        .then(
          response => {
              //console.log(response.data)
              if (response.data.stuXwzgsq != null) {
                  (this.dsshzt = response.data.stuXwzgsq.dsshzt)
               
              }else {
                  this.dsshzt = null;
                 
              }
        }
        );
        
    },

    //加载个人信息
    loadTable() {
        this.$http
        .get("platform-framework/stuxwzgsq/list")
        .then(
          response => {
            (this.page = response.data.stuxwzgsq),
            (this.stuxwzgsq = response.data.stuxwzgsq[0]),
            (this.username=response.data.username);
            this.stujyandxw = response.data.jyqx;
            if(this.username=="daoshi"){
                this.showTable2=false;
            }else{
                this.showTable2=true;
                this.showTable=false;
            }
    }
        );
        this.queryByXh();
    },
    //表格方法
    //点击列表选中
    clickRow(row) {
      this.$refs.moviesTable.toggleRowSelection(row);
      
      //console.log(row);
    },
    //列表选择改变事件
    handleSelectionChange(selection) {
      if (selection.length == 0) {
        this.ids = "";
        this.wid="";    
      } else {
        this.ids = selection[0].xh;
        this.wid = selection[0].id;
      //  console.log(this.wid);
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
    
    //点击审核
    handleEdit(index, row) {
      //  console.log(this.stuxwzgsq.xh)
      if (this.ids == null || this.ids == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
        return;
      }
      this.showTables = false;
      this.showTable = false;
  
      this.$http
        .get("platform-framework/stuxwzgsq/info2",{
            params :{
                xh : this.ids
        }})
        .then(
          response => (
             (this.stuxwzgsqs=response.data.stuxwzgsq[0]),
             this.jyqx = response.data.jyqx
            //console.log(response.data)
          )
        );
    },
    //点击通过
    adopt() {
      this.$http
        .get("platform-framework/stuxwzgsq/TutorCheck", {
          params: {
            id: this.stuxwzgsqs.id,
            shenhe: "1"
          }
        })
        .then(res => {
          //  console.log(res.data);
          if (res.data.msg == 1) {
            this.$message({
              message: "抱歉，该数据已被审核，不可操作！",
              type: "error"
            });
          } else {
            this.showTables = true;
            this.loadTable();
            this.$message({
              message: "审核成功！",
              type: "success"
            });
          }
        });
    },
        //点击不通过
    notadopt() {
      this.$http
        .get("platform-framework/stuxwzgsq/TutorCheck", {
          params: {
            id: this.stuxwzgsqs.id,
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
            this.showTables = true;
            this.loadTable();
            this.$message({
              message: "审核成功！",
              type: "success"
            });
          }
        });
    },
  }
}
</script>
<style scoped>
.add {
  width: 100px;
  height: 35px;
  line-height: 28px;
}
.el-form-item {
  margin-left: 56px;
}
.img {
  float: left;
  line-height: 35px;
  width: 12px;
  height: 14px;
}
.append {
  margin-left: 8px;
}
.user-avatar img {
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.long >>> .el-form-item__label {
  line-height: 25px;
}
.divShadow {
  width: 97%;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 3%;
  padding-bottom: 3%;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
  position: relative;
}
.divShadows {
  width: 97%;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 1%;
  padding-bottom: 1%;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
  position: relative;
}
.container {
  padding: 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  margin-top: 10px;
  overflow: hidden;
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
.divShadow2 {
  width: 97%;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 20px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
  position: relative;
}
.topBlue1 {
  width: 15%;
  height: 35px;
  background-color: #237ae4;
  color: #ffffff;
  text-align: center;
  line-height: 35px;
  position: absolute;
  top: -10px;
  left: 28px;
}
.bottomBox {
  width: 97%;
  background: rgba(255, 255, 255, 1);
  margin-top: 3%;
  padding-bottom: 1%;
}
.topBlue {
  width: 10%;
  height: 35px;
  background-color: #237ae4;
  color: #ffffff;
  text-align: center;
  line-height: 35px;
  position: absolute;
  top: -10px;
  left: 28px;
}
.reset {
  width: 25%;
  text-align: center;
  margin-left: 5%;
  margin-right: 5%;
  font-size: 16px;
  background-color: #237ae4;
}
.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #237ae4;
  display: inline-block;
  margin-right: 3px;
}

.el-btn {
  margin-top: 30px;
  /* margin-left: 56px; */
  margin-bottom: 20px;
}
.append {
  margin-left: 8px;
}
.el-button--small,
.el-button--small.is-round {
  /* margin-left: 5px; */
  padding: 5px 15px 5px 15px;
}
.red {
  color: #f56c6c;
}
.red >>> .el-form-item__label {
  color: #f56c6c;
}
</style>