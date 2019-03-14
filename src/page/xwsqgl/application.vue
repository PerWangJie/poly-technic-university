<template>
    <div>
        <div>
            <el-row style="width:96%;margin:0 auto;">
                <el-col :span="24">
                <el-row style="float:right">
                    <el-button type="primary" @click="modify" v-show="shzt==7">修改</el-button>
                </el-row>
                </el-col>
            </el-row>
        </div>
        <!-- 列表 -->
        <div class="container" v-show="show0">
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
                    <template slot-scope="scope">{{ scope.row.shzt=='0' ? '待审核' :scope.row.shzt=='1'?'导师审核通过':scope.row.shzt=='2'?'学院审核中' :scope.row.shzt == '3'?'学院审核不通过':scope.row.shzt == '4'?'学校待审':scope.row.shzt == '5'?'不通过' : scope.row.shzt === '7'? '导师退回':scope.row.shzt === '8'? '学院退回':scope.row.shzt === '9'? '研究生院退回':'通过'}}</template>
                </el-table-column>
            </el-table>
            <div class="block" style="text-align:center;margin-top:30px">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10, 20, 50]" layout="total, sizes, prev, pager, next, jumper" :total="page.length">
                </el-pagination>
            </div>
        </div>
        <!-- 申请 -->
        <div class="container" v-show="show1">
            <el-row>
                <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                    <div class="small"></div>
                    <span>申请学位基本信息</span>
                </el-col>
            </el-row>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left" style="padding-top:50px">
                <el-row :gutter="20">
                    <!-- 学生照片 -->
                    <!-- <el-col :span="12">
                        <el-form-item label="报考时照片：" prop="bkzp">
                            <div class="user-avatar">
                                <img v-bind:src="stuxwzgsq.bkzp" alt="">
                            </div>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="毕业时照片：" prop="byzp">
                            <div class="user-avatar">
                                <img v-bind:src="stuxwzgsq.byzp" alt="">
                            </div>
                        </el-form-item>
                    </el-col> -->
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="姓名：" prop="xm">
                            <el-input v-model="stuxwzgsq.xm" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="学号：" prop="xh">
                            <el-input v-model="stuxwzgsq.xh" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="出生年月：" prop="csrq">
                            <el-input v-model="stuxwzgsq.csrq" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="身份证号码：" prop="sfzjh">
                            <el-input v-model="stuxwzgsq.sfzjh" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="户口所在地：" prop="jg">
                            <el-input v-model="stuxwzgsq.jg" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="入学时学历：" prop="rxxlm">
                            <el-input v-model="stuxwzgsq.rxxlm" placeholder="硕士研究生" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="录取类别：" prop="lqlbm">
                            <el-input v-model="stuxwzgsq.lqlbm" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="导师姓名：" prop="dsxm">
                            <el-input v-model="stuxwzgsq.dsxm" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="外语程度（CET6-425）：" prop="wycd">
                            <el-input v-model="stuxwzgsq.wycd" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所学专业代码：" prop="zym">
                            <el-input v-model="stuxwzgsq.zym" readonly> </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">

                    <el-col :span="12">
                        <el-form-item label="所学专业名称：" prop="zy">
                            <el-input v-model="stuxwzgsq.zy" placeholder="国际贸易学" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="取得总学分：" prop="qdzxf" >
                            <el-input v-model="stuxwzgsq.qdzxf" placeholder="29" readonly></el-input>
                        </el-form-item>

                        <!-- <el-dialog title="学位课成绩单" :visible.sync="showZxf">
                            <el-table
                                :data="stuxwcourse" border
                                style="width: 100%">
                                <el-table-column
                                    prop="kcmc"
                                    label="课程名称"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="kcxf"
                                    label="学分"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="khcj"
                                    label="成绩">
                                </el-table-column>
                            </el-table>
                        </el-dialog> -->
                    </el-col>
                    <!-- <el-col :span="1">
                        <i class="el-icon-question" @click="handleShowZxf" style="vertical-align:-webkit-baseline-middle"></i>
                    </el-col> -->
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="其中学位课总学分：" prop="xwkzxf">
                            <el-input v-model="stuxwzgsq.xwkzxf" placeholder="15" readonly></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="学位课总平均分：" prop="xwkzpjf">
                            <el-input v-model="stuxwzgsq.xwkzpjf" placeholder="15" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="已获学位一级学科：" prop="yjxk">
                            <el-input v-model="stuxwzgsq.yjxk" readonly></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="通过综合水平考试年份：" prop="tgzhksnf">
                            <el-input v-model="stuxwzgsq.tgzhksnf" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <div class="long">
                        <el-col :span="12">
                            <el-form-item label="同等学历人员申请硕士通过外语统考年份：" prop="wytknf">
                                <el-input v-model="stuxwzgsq.wytknf" readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </div>

                    <el-col :span="12">
                        <el-form-item label="证书号：" prop="zsh">
                            <el-input v-model="stuxwzgsq.zsh" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <div class="red">
                        <el-col :span="12">
                            <el-form-item label="获学位日期：" prop="hdxwrq" color="red">
                                <el-input v-model="stuxwzgsq.hdxwrq" readonly></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <p style="font-size:14px">(若取消该生本次申请学位，则该字段清空！)</p>
                        </el-col>

                    </div>
                </el-row>
                <el-row :gutter="20">
                        <div class="long">
                            <el-col :span="12">
                                <el-form-item label="授予学位：" prop="syxw">
                                    <el-input v-model="stuxwzgsq.syxw" readonly></el-input>
                                </el-form-item>
                            </el-col>
                        </div>

                        <el-col :span="12">
                            <el-form-item label="学位证书号：" prop="xwzsh">
                                <el-input v-model="stuxwzgsq.xwzsh" readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <div class="long">
                            <el-col :span="12">
                                <el-form-item label="结束学业年月：" prop="jsxyny">
                                    <el-input v-model="stuxwzgsq.jsxyny" readonly></el-input>
                                </el-form-item>
                            </el-col>
                        </div>

                        <el-col :span="12">
                            <el-form-item label="结束学业方式：" prop="jsxyfs">
                                <el-input v-model="stuxwzgsq.jsxyfs" readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <div class="long">
                            <el-col :span="12">
                                <el-form-item label="最后学历：" prop="zhxlm">
                                    <el-input v-model="stuxwzgsq.zhxlm" readonly></el-input>
                                </el-form-item>
                            </el-col>
                        </div>

                        <el-col :span="12">
                            <el-form-item label="获博士(硕士)门类：" prop="hbsml">
                                <el-input v-model="stuxwzgsq.hbsml" readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                <el-row :gutter="20">
                    <div class="long">
                        <el-col :span="12">
                            <el-form-item label="申请学位备注：" prop="sqxwbz">
                                <el-input v-model="stuxwzgsq.sqxwbz" readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </div>

                    <el-col :span="12">
                        <el-form-item label="就业单位性质：" prop="jyxzm">
                            <el-input v-model="stujyandxw.jyxzm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <div class="long">
                        <el-col :span="12">
                            <el-form-item label="就业单位：" prop="jydwxzm">
                                <el-input v-model="stujyandxw.jydwxzm"></el-input>
                            </el-form-item>
                        </el-col>
                    </div>

                    <el-col :span="12">
                        <el-form-item label="单位所在地：" prop="jydmssm">
                            <el-input v-model="stujyandxw.jydmssm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>取得代表性成果</span>
                    </el-col>
                </el-row>
                <el-row style="padding-top:50px;padding-left:100px">
                    <el-col :span='21'>
                        <el-table border cell-style="padding:0px" row-style="height:50px;" :data="stujyandxw.xsdbxcg" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                            <el-table-column label="取得代表性成果（可从学术成果录入中导入）" align="center">
                                <el-table-column label="序号" align="center" width="80" prop="num">
                                </el-table-column>
                                <el-table-column label="成果名称" align="center">
                                    <template slot-scope="scope">
                                        <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.stime" placeholder="请输入内容" />
                                        <span v-show="!scope.row.editFlag">{{scope.row.stime}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="成果类型" align="center">
                                    <template slot-scope="scope">
                                        <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xh" placeholder="请输入内容" />
                                        <span v-show="!scope.row.editFlag">{{scope.row.xh}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="时间" align="center">
                                    <template slot-scope="scope">
                                        <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xsxm" placeholder="请输入内容" />
                                        <span v-show="!scope.row.editFlag">{{scope.row.xsxm}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="上传附件" align="center">
                                    <template slot-scope="scope">
                                        <el-upload
                                            v-show="scope.row.editFlag"
                                            class="upload-demo"
                                            :action="baseUrl5"
                                            :on-success="handleSuccess"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemove"
                                            :before-remove="beforeRemove"
                                            multiple
                                            :on-exceed="handleExceed"
                                            :file-list="fileList"
                                            :show-file-list="false">
                                            <el-button style="margin:10px" size="mini" type="primary" @click="uploadClick(scope.row.num)">点击上传</el-button>
                                        </el-upload>
                                        <span v-show="!scope.row.editFlag">{{scope.row.fjName}}</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <!-- <el-col :span='1' :offset='1' style="padding-top:60px;">
                        <el-button size='mini' square @click="centerDialogVisible = true" v-show="piliang">批量导入</el-button>
                    </el-col> -->
                    <el-col :span='1' style="margin-top:60px;padding-left:5px">
                        <div style="width:100px">
                        <el-button size='mini' square @click="centerDialogVisible = true" v-show="piliang">批量导入</el-button>
                        <div style="margin-top:20px" v-show="piliang">
                            <el-button icon="el-icon-plus" size='mini' circle @click="addRow" />
                            <el-button icon="el-icon-minus" size='mini' circle @click="delRow" style="margin-left:20px"></el-button>
                        </div>
                        </div>
                    </el-col>
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
                                        <el-input v-show="false">{{cg.xxshsj}}</el-input>
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
                                        <el-input v-show="false">{{zl.xxshsj}}</el-input>
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
                                        <el-input v-show="false">{{ky.xxshsj}}</el-input>
                                    </el-col>

                                </el-checkbox-group>
                            </el-row>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="centerDialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                        </span>
                    </el-dialog>
                </el-row>
                <!-- 保存重置提交 -->
                <div class="bottomBox" style="text-align:center;">

                    <el-button type="primary" class="reset" v-show="shzt==0" disabled style="background-color:gray">导师审核中</el-button>
                    <el-button type="primary" class="reset" v-show="shzt==1" disabled style="background-color:red">导师审核不通过</el-button>
                    <el-button type="primary" class="reset" v-show="shzt==2" disabled style="background-color:gray">学院审核中</el-button>
                    <el-button type="primary" class="reset" v-show="shzt==3" disabled style="background-color:red">学院审核不通过</el-button>
                    <el-button type="primary" class="reset" v-show="shzt==4" disabled style="background-color:gray">学校审核中</el-button>
                    <el-button type="primary" class="reset" v-show="shzt==5" disabled style="background-color:red">学校审核不通过</el-button>
                    <el-button type="primary" class="reset" v-show="shzt==6" disabled style="background-color:green">审核通过，请上传论文</el-button>
                    <el-button type="primary" class="reset" v-show="shzt==7" disabled style="background-color:green">导师退回，请修改</el-button>
                    <el-button type="primary" class="reset" v-show="shzt==8" disabled style="background-color:green">学院退回</el-button>
                    <el-button type="primary" class="reset" v-show="shzt==9" disabled style="background-color:green">研究生院退回</el-button>
                </div>
                <div class="bottomBox" style="text-align:center;" v-show="!xiugai">
                    <el-button type="primary" class="reset" @click="submit()" v-show="shzt==null || stuxwzgsq.xwzsh ==null">提交申请</el-button>
                </div>
                <div class="bottomBox" style="text-align:center;" v-show="xiugai">
                    <el-button type="primary" class="reset" @click="update()" v-show="xiugai">提交修改申请</el-button>
                </div>
            </el-form>
        </div>

        <!-- 审核 -->
        <div class="container" v-show="show2">
            <el-row>
                <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                    <div class="small"></div>
                    <span>申请学位基本信息</span>
                    <div class="close" @click="close"> X </div>
                </el-col>
            </el-row>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left" style="padding-top:50px">
                <!-- <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="报考时照片：" prop="bkzp">
                            <div class="user-avatar">
                                <img v-bind:src="stuxwzgsq1.bkzp" alt="">
                            </div>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="毕业时照片：" prop="byzp">
                            <div class="user-avatar">
                                <img v-bind:src="stuxwzgsq1.byzp" alt="">
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row> -->

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="姓名：" prop="xm">
                            <el-input v-model="stuxwzgsq1.xm" :readonly="readonly"></el-input>
                            <el-input v-model="stuxwzgsq1.id" :readonly="readonly" v-show="false"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="学号：" prop="xh">
                            <el-input v-model="stuxwzgsq1.xh" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="出生年月：" prop="csrq">
                            <el-input v-model="stuxwzgsq1.csrq" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="身份证号码：" prop="sfzjh">
                            <el-input v-model="stuxwzgsq1.sfzjh" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="户口所在地：" prop="jg">
                            <el-input v-model="stuxwzgsq1.jg" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="入学时学历：" prop="rxxlm">
                            <el-input v-model="stuxwzgsq1.rxxlm" placeholder="硕士研究生" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="录取类别：" prop="lqlbm">
                            <el-input v-model="stuxwzgsq1.lqlbm" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="导师姓名：" prop="dsxm">
                            <el-input v-model="stuxwzgsq1.dsxm" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="外语程度（CET6-425）：" prop="wycd">
                            <el-input v-model="stuxwzgsq1.wycd" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所学专业代码：" prop="zym">
                            <el-input v-model="stuxwzgsq1.zym" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">

                    <el-col :span="12">
                        <el-form-item label="所学专业名称：" prop="zy">
                            <el-input v-model="stuxwzgsq1.zy" placeholder="国际贸易学" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="取得总学分：" prop="qdzxf">
                            <el-input v-model="stuxwzgsq1.qdzxf" placeholder="29" :readonly="readonly"></el-input>
                        </el-form-item>
                        <!-- <el-dialog title="学位课成绩单" :visible.sync="showZxf1">
                            <el-table
                                :data="stuxwcourse" border
                                style="width: 100%">
                                <el-table-column
                                    prop="kcmc"
                                    label="课程名称"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="kcxf"
                                    label="学分"
                                    >
                                </el-table-column>
                                <el-table-column
                                    prop="khcj"
                                    label="成绩">
                                </el-table-column>
                            </el-table>
                        </el-dialog> -->
                    </el-col>
                    <!-- <el-col :span="1">
                        <i class="el-icon-question" @click="handleShowZxf1" style="vertical-align:-webkit-baseline-middle"></i>
                    </el-col> -->
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="其中学位课总学分：" prop="xwkzxf">
                            <el-input v-model="stuxwzgsq1.xwkzxf" placeholder="15" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="学位课总平均分：" prop="xwkzpjf">
                            <el-input v-model="stuxwzgsq1.xwkzpjf" placeholder="15" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="已获学位一级学科：" prop="yjxk">
                            <el-input v-model="stuxwzgsq1.yjxk" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="通过综合水平考试年份：" prop="tgzhksnf">
                            <el-input v-model="stuxwzgsq1.tgzhksnf" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <div class="long">
                        <el-col :span="12">
                            <el-form-item label="同等学历人员申请硕士通过外语统考年份：" prop="wytknf">
                                <el-input v-model="stuxwzgsq1.wytknf" :readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </div>

                    <el-col :span="12">
                        <el-form-item label="证书号：" prop="zsh">
                            <el-input v-model="stuxwzgsq1.zsh" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                               <el-row :gutter="20">
                    <div class="red">
                        <el-col :span="12">
                            <el-form-item label="获学位日期：" prop="hdxwrq" color="red">
                                <el-input v-model="stuxwzgsq1.hdxwrq" :readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <p style="font-size:14px">(若取消该生本次申请学位，则该字段清空！)</p>
                        </el-col>

                    </div>
                </el-row>
                <el-row :gutter="20">
                        <div class="long">
                            <el-col :span="12">
                                <el-form-item label="授予学位：" prop="syxw">
                                    <el-input v-model="stuxwzgsq1.syxw" :readonly="readonly"></el-input>
                                </el-form-item>
                            </el-col>
                        </div>

                        <el-col :span="12">
                            <el-form-item label="学位证书号：" prop="xwzsh">
                                <el-input v-model="stuxwzgsq1.xwzsh" :readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <div class="long">
                            <el-col :span="12">
                                <el-form-item label="结束学业年月：" prop="jsxyny">
                                    <el-input v-model="stuxwzgsq1.jsxyny" :readonly="readonly"></el-input>
                                </el-form-item>
                            </el-col>
                        </div>

                        <el-col :span="12">
                            <el-form-item label="结束学业方式：" prop="jsxyfs">
                                <el-input v-model="stuxwzgsq1.jsxyfs" :readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <div class="long">
                            <el-col :span="12">
                                <el-form-item label="最后学历：" prop="zhxlm">
                                    <el-input v-model="stuxwzgsq1.zhxlm" :readonly="readonly"></el-input>
                                </el-form-item>
                            </el-col>
                        </div>

                        <el-col :span="12">
                            <el-form-item label="获博士(硕士)门类：" prop="hbsml">
                                <el-input v-model="stuxwzgsq1.hbsml" :readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                <el-row :gutter="20">
                    <div class="long">
                        <el-col :span="12">
                            <el-form-item label="申请学位备注：" prop="sqxwbz">
                                <el-input v-model="stuxwzgsq1.sqxwbz" :readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </div>

                    <el-col :span="12">
                        <el-form-item label="就业单位性质：" prop="jyxzm">
                            <el-input v-model="stujyandxw1.jyxzm" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <div class="long">
                        <el-col :span="12">
                            <el-form-item label="就业单位：" prop="jydwxzm">
                                <el-input v-model="stujyandxw1.jydwxzm" :readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </div>

                    <el-col :span="12">
                        <el-form-item label="单位所在地：" prop="jydmssm">
                            <el-input v-model="stujyandxw1.jydmssm" :readonly="readonly"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>取得代表性成果</span>
                    </el-col>
                </el-row>
                <el-row style="padding-top:20px;padding-left:50px;padding-bottom:40px">
                    <el-col :span='22'>
                        <el-table border cell-style="padding:0px" row-style="height:50px;" :data="stuxwzgsq1.xsdbxcg">
                            <el-table-column label="取得代表性成果（可从学术成果录入中导入）" align="center">
                                <el-table-column label="序号" align="center" width="80" prop="num">
                                </el-table-column>
                                <el-table-column label="成果名称" align="center">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.stime}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="成果类型" align="center">
                                    <template slot-scope="scope">
                                        <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xh" placeholder="请输入内容" />
                                        <span v-show="!scope.row.editFlag">{{scope.row.xh}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="时间" align="center">
                                    <template slot-scope="scope">
                                        <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xsxm" placeholder="请输入内容" />
                                        <span v-show="!scope.row.editFlag">{{scope.row.xsxm}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="下载附件" align="center">
                                    <template slot-scope="scope">
                                        <!-- <el-button style="margin:10px" size="mini" type="primary" @click="downloadClick(scope.row.num)">点击下载</el-button>
                                        <span v-show="!scope.row.editFlag">{{scope.row.fjName}}</span> -->
                                        <el-button style="margin:10px" size="mini" type="primary" v-show="scope.row.fjUrl" @click="downloadClick(scope.row.num)">点击下载</el-button>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <!-- 审核意见 -->
                <div class="divShadow">
                    <div class="topBlue">审核意见</div>
                    <el-row style="margin-left:56px;padding-top:50px">
                        <el-col :span="22">
                            <el-input type="textarea" v-model="stujyandxw1.yj" :rows="8" placeholder="请输入审核意见：">
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
                <!-- 保存重置提交 -->
                <div class="bottomBox" style="text-align:center;">
                    <el-button type="primary" class="reset" @click="adopt">通过</el-button>
                    <el-button type="primary" class="reset" @click="nothrough">不通过</el-button>
                    <el-button type="primary" class="reset" @click="goBack">退回</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      show0: false, //展示列表开关
      show2: false,
      show1: false,
      showZxf: false,
      showZxf1: false,
      xiugai: false,
      readonly: true,
      xjxx:{},
      stuxwcourse:[], //查看学分
      piliang: true, //批量按钮开关
      fileList: [], //添加上传文件列表展示
      num: 0, //辅助变量
      num1: 0, //辅助变量
      stuid: '', //修改提交的id
      page: [],
      ids: "",
      id: "",
      stuxh: '',  //查看学分传的学号
      stuxh1: '',  //查看学分传的学号
      checked1: [],
      checked2: [],
      checked3: [],
      checked4: [],
      stuxwzgsq: {
        id: '',
        xsdbxcg: [{
                num: 1,
                editFlag: false
            }]
      },
      stuxwzgsq1: {
        xsdbxcg: [{
                num: 1,
                editFlag: false
            }]
      },
      dsshzt: "",
      centerDialogVisible: false, //dialog 开关
      stujyandxw: {
        xh: "",
        xsdbxcg: [{
                num: 1,
                editFlag: false,
                fjName:'',
                fjUrl:''
            }]
      },
      stujyandxw1: {
        xh: "",
        yj: '',
        xsdbxcg: [{
                num: 1,
                editFlag: false,
                fjName: '',
                fjUrl: ''
            }]

      },
      shzt: "",
      shzts: "", //导师审核状态
      xwsq: {},
      sclw: {},
      sclw1: {},
      dataList: [],
      currentPage: 1,
      pageSize: 5,
      totalItems: 0,
      multipleSelection: [],
      fileList: [],
      fbzz: {},
      kyxm: {},
      zljs: {},
      xscg: {},
      stuXwsq: {},
      stuJyqx: {},
      ruleForm: {},
      fbzzsj: "",
      kyxmsj: "",
      xscgsj: "",
      zljssj: ""
    };
  },
  mounted() {
    this.loadTable();
  },
  methods: {
    // 加载各科成绩学分，总学分
    handleShowZxf(){
        this.showZxf = true
        // console.log(this.stuxh)
        this.$http
            .get(this.$server.glourl+"stuscore/StuXwCourse",{
              params:{
                xh: this.stuxh
              }
            })
                .then(response => {
                    // this.xjxx=response.data.xjxxMap;
                    this.stuxwcourse = response.data.stuxwcourse;
                    // console.log(response.data);
                });
    },
    handleShowZxf1(){
        this.showZxf1 = true
        console.log(this.stuxh1)
        this.$http
            .get(this.$server.glourl+"stuscore/StuXwCourse",{
              params:{
                xh: this.stuxh1
              }
            })
            .then(response => {
                // this.xjxx=response.data.xjxxMap;
                this.stuxwcourse=response.data.stuxwcourse;
                // console.log(response.data);
            });
    },
    //加载个人信息
    loadTable() {
        // this.stujyandxw.xsdbxcg = [];
        // console.log(this.stuxwzgsq.xwzsh)
        // console.log(this.shzt ==null)
      this.$http.get(this.$server.glourl+"stuxwsq/load").then(response => {
        // console.log(response.data);

        // console.log(response.data.stuxwsq.id);
        if (response.data.stuxwsq != null) {
            this.shzt = response.data.stuxwsq.shzt;
            // console.log(this.shzt)
            this.piliang = false;
        } else {
            this.shzt = null;
        }
        if (response.data.username == "xuesheng") {
            // 学生
            this.show0 = false
            this.show1 = true
            this.sclw = response.data.sclw
            this.fbzz = response.data.fbzz
            this.kyxm = response.data.kyxm
            this.xscg = response.data.xscg
            this.zljs = response.data.zljs
            if(response.data.stuxwsq!=null){
              this.stuid = response.data.stuxwsq.id
              this.stuxh = response.data.stuxwsq.xh
            }
            // console.log(response.data)
            this.stuxwzgsq = response.data.stuxwzgsq[0]
            // console.log(response.data.stuxwzgsq[0])
            // console.log(response.data.stuxwsq)
        } else {
            // 导师
            this.page = response.data.stuxwzgsq;
            // console.log(this.page)
            this.show0 = true;
            this.show1 = false;
            this.xiugai = false
        }
        if (response.data.jyqx != null) {
            this.stujyandxw = response.data.jyqx;
        }
        if (response.data.stuxwsq != null) {
            this.stujyandxw.xsdbxcg = response.data.stuxwsq.xsdbxcg;
            this.stujyandxw.xsdbxcg = JSON.parse(this.stujyandxw.xsdbxcg);
            // console.log(response.data.stuxwsq.xsdbxcg)
        }
        //console.log(this.stujyandxw.xsdbxcg);
        // this.fbzzsj = this.fbzz[0].dsshsj;
        // this.kyxmsj = this.kyxm[0].dsshsj;
        // this.xscgsj = this.xscg[0].dsshsj;
        // this.zljssj = this.zljs[0].dsshsj;
        // console.log(response.data);
        // console.log(this.fbzz[0].dsshsj);
      });
    },
    // 关闭页面
    close(){
        this.show0 = true
        this.show1 = false
        this.show2 = false
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
      } else {
        this.ids = selection[0].xh;
        this.shzts = selection[0].shzt;
        // console.log(this.ids);
        // console.log(this.shzts);
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
    //申请信息table鼠标经过事件
    handleMouseEnter: function(row, column, cell, event) {
        // console.log(row)
        let num = row.num - 1;
        this.stujyandxw.xsdbxcg[num].editFlag = true;
        if(this.shzt!=null || this.stuxwzgsq.xwzsh !=null || this.xiugai !=true){
          this.stujyandxw.xsdbxcg[num].editFlag = false;
        }
        // this.stuxwzgsq1.xsdbxcg[num].editFlag = true;
    },
    //申请信息table鼠标经过移出事件
    handleMouseOut: function(row, column, cell, event) {
        let num = row.num - 1;
        this.stujyandxw.xsdbxcg[num].editFlag = false;
        // this.stuxwzgsq1.xsdbxcg[num].editFlag = false;
    },
    //申请表信息动态添加行
    addRow() {
        this.stujyandxw.xsdbxcg.push({
            num: this.stujyandxw.xsdbxcg.length + 1,
            editFlag: false
        });
        //   this.stuxwzgsq1.xsdbxcg.push({
        //     num: this.stuxwzgsq1.xsdbxcg.length + 1,
        //     editFlag: false
        //   });
    },
    //申请信息动态减少行
    delRow() {
        this.stujyandxw.xsdbxcg.pop();
        // this.stuxwzgsq1.xsdbxcg.pop();
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
      this.show0 = false;
      this.show2 = true;
      // console.log(this.ids);
      this.stuxh1 = this.ids  //保存学号
      this.shzt = this.shzts   //保存审核状态
      this.$http
        .get(this.$server.glourl+"stuxwsq/CheckInfo/", {
          params: {
            xh: this.ids
          }
        })
        .then(response => {
            // console.log(response.data)
            // 获取审核详情页
            this.stuxwzgsq1 = response.data.stuxwzgsq[0];
            // console.log(this.stuxh1)
            // console.log(this.shzt)
            this.stuxwzgsq1.xsdbxcg = response.data.stuxwzgsq[0].xsdbxcg;
            this.stuxwzgsq1.xsdbxcg = JSON.parse(this.stuxwzgsq1.xsdbxcg);
            if( response.data.jyqx!=null){
                this.stujyandxw1 = response.data.jyqx;
                this.sclw1 = response.data.sclw;
          }
        });
    },
    //点击通过
    adopt() {
      //console.log(this.ids);
      if (this.stujyandxw1.yj == undefined) {
            this.stujyandxw1.yj = ''
        }
        // console.log(this.stujyandxw1.yj)
        this.$http
            .get(this.$server.glourl+"stuxwsq/TutorCheck", {
            params: {
                id: this.stuxwzgsq1.id,
                shenhe: "1",
                yj: this.stujyandxw1.yj
            }
            })
            .then(res => {
            if (res.data.msg == 1) {
                this.$message({
                  message: "抱歉，该数据已被审核，不可操作！",
                  type: "error"
                });
            } else {
                this.show2 = false;
                this.loadTable();
                this.$message({
                  message: "审核成功！",
                  type: "success"
                });
            }
            });
    },
    //点击不通过
    nothrough() {
      //console.log(this.ids);
        if (this.stujyandxw1.yj == undefined) {
            this.stujyandxw1.yj = ''
        }
        // console.log(this.stujyandxw1.yj)
        this.$http
            .get(this.$server.glourl+"stuxwsq/TutorCheck", {
            params: {
              id: this.stuxwzgsq1.id,
              shenhe: "2",
              yj: this.stujyandxw1.yj
            }
            })
            .then(res => {
                // console.log(res.data)
            if (res.data.msg == 1) {
                this.$message({
                  message: "抱歉，该数据已被审核，不可操作！",
                  type: "error"
                });
            } else {
                this.show2 = false;
                this.loadTable();
                this.$message({
                  message: "审核成功！",
                  type: "success"
                });
            }
            });
    },
    // 退回
    goBack(){
        // console.log(this.stujyandxw1.yj)
        // console.log(this.stuxh1)
        // console.log(this.shzt)
        if (this.stujyandxw1.yj == '' || this.stujyandxw1.yj == null) {
            this.$message({
              message: "请填写审核意见！",
              type: "error"
            });
            return;
        }
        if(this.shzt == '0' || this.shzt == '8'){
          this.$http
          .get(this.$server.glourl+"stuxwsq/TutorCheck", {
            params: {
              id: this.stuxwzgsq1.id,
              shenhe: "3",
              yj: this.stujyandxw1.yj
            }
          })
          .then(res => {
          //   console.log(res.data);
            if (res.data.msg == 1) {
              this.$message({
                message: "抱歉，该数据已被审核，不可操作！",
                type: "error"
              });
            } else {
              this.show2 = false;
              this.loadTable();
              this.$message({
                message: "已退回！",
                type: "success"
              });
            }
          });
        }
    },
    //点击修改
    modify() {
        // this.readonly = false;
        this.downloading = true;
        this.shzt = null;
        this.xiugai = true
        this.piliang = true
    },
    // 修改提交
    update(){
        this.stuxwzgsq.xsdbxcg = this.stujyandxw.xsdbxcg
        this.stuxwzgsq.id = this.stuid
        // console.log(this.stuxwzgsq)
        // console.log(this.stuxwzgsq.id)
        let config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
        this.$http
            .post(this.$server.glourl+"stuxwsq/modify", this.stuxwzgsq)
            .then(res => {
                if (res.data.code == 0) {
                    this.$message({
                        message: "申请信息提交成功，请等待审核！",
                        type: "success"
                    });
                }
                this.xiugai = false
                this.loadTable()
                // console.log(this.shzt)
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    //选择代表性成果（多选）
    handleCheckedCitiesChange(checked) {
      this.stujyandxw.xsdbxcg = [];
      // console.log(this.checked1, this.checked2, this.checked3, this.checked4);
      this.checked1.forEach(element => {
           var time1;
          this.xscg.forEach(ele => {
              if(ele.xmlx=element){
                  time1=ele.dsshsj;
              }
          });
        this.stujyandxw.xsdbxcg.push({
          num: this.stujyandxw.xsdbxcg.length + 1,
          stime: element,
          xh: "学术成果",
          xsxm: time1
        });
      });
      this.checked2.forEach(element => {
          var time2;
          this.zljs.forEach(ele => {
              if(ele.xmlx=element){
                  time2=ele.dsshsj;
              }
          });
        this.stujyandxw.xsdbxcg.push({
          num: this.stujyandxw.xsdbxcg.length + 1,
          stime: element,
          xh: "技术专利",
          xsxm: time2
        });
      });
      this.checked3.forEach(element => {
          var time3;
          this.fbzz.forEach(ele => {
              if(ele.xmlx=element){
                  time3=ele.dsshsj;
              }
          });
        this.stujyandxw.xsdbxcg.push({
          num: this.stujyandxw.xsdbxcg.length + 1,
          stime: element,
          xh: "发表著作",
          xsxm: time3
        });
      });
      this.checked4.forEach(element => {
          var time;
          this.kyxm.forEach(ele => {
              if(ele.xmlx=element){
                  time=ele.dsshsj;
              }
          });
        this.stujyandxw.xsdbxcg.push({
          num: this.stujyandxw.xsdbxcg.length + 1,
          stime: element,
          xh: "科研项目",
          xsxm: time
        });
      });
    },
    // 点击上传
    uploadClick(num) {
        this.num = num
    },
    // 点击下载
    downloadClick(num){
        this.num1 = num
        window.location.href = this.stuxwzgsq1.xsdbxcg[this.num - 1].fjUrl
    },
    // 文件上传成功的钩子
    handleSuccess(response, file, fileList){
        // console.log(response)
        // console.log(file)
        // console.log(fileList)
        // this.stuxscg.lyzz = response.url;
        this.upload1 = false;
        this.onsuccess = false;
        this.stujyandxw.xsdbxcg[this.num - 1].fjName = response.name;
        this.stujyandxw.xsdbxcg[this.num - 1].fjUrl = response.url;
        this.stujyandxw.xsdbxcg[this.num - 1].editFlag = true;
        this.stujyandxw.xsdbxcg[this.num - 1].editFlag = false;
        // console.log(this.stujyandxw.xsdbxcg)
    },
    //申请信息提交事件
    submit: function() {
      this.stujyandxw.xh = this.stuxwzgsq.xh;
      this.$http
        .post(this.$server.glourl+"stuxwsq/save", this.stujyandxw)
        .then(res => {
          if (res.data.msg == 1) {
            this.$message({
              message: "学位资格审核未通过！",
              type: "error"
            });
            //console.log(this.stuXwsq);
            // console.log(this.stuJyqx);
          } else {
            this.$message({
              message: "信息提交成功，请等待审核结果！",
              type: "success"
            });
            this.loadTable();
          }

          //  console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
/* 内容区域盒阴影 */
.divShadow {
    padding: 0 0% 3% 3%;
    box-sizing: border-box;
    /* width: 97%; */
    background: #fff;
    border-radius: 10px;
    /* margin: 0 auto; */
    margin: 10px 0 40px 0;
    /* padding-bottom: 3%; */
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
    position: relative;
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
/* 关闭图标 */
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
.el-form-item__label {
  text-align: left;
  width: 177px;
  padding: 0;
}
/* 表格左边距 */
.table-data {
  margin-left: 56px;
  box-sizing: border-box;
  margin-bottom: 25px;
}
/* 添加附件 */
.el-btn {
  margin-top: 15px;
  margin-left: 56px;
  margin-bottom: 20px;
}
.append {
  margin-left: 8px;
}
.el-textarea {
  margin-top: 14px;
}
.el-upload {
  margin-top: 10px;
}
.bottomBox {
  width: 97%;
  background: rgba(255, 255, 255, 1);
  margin-top: 3%;
  padding-bottom: 1%;
}
.reset {
  padding-left: 30px;
  padding-right: 30px;
  margin-left: 5%;
  /* margin-right: 5%; */
  font-size: 16px;
  background-color: #237ae4;
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
.el-form-item {
  margin-left: 56px;
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
.img {
  float: left;
  line-height: 20px;
  width: 12px;
  height: 14px;
}
.cell {
  text-align: center;
}
/* 批量导入 */
.import {
  margin-top: 15px;
  float: right;
}
.red {
  color: #f56c6c;
}
.red >>> .el-form-item__label {
  color: #f56c6c;
}
/* .user-avatar {
  margin-left: 20px;
} */
.user-avatar img {
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
/* 分页 */
.pagination {
  text-align: center;
  margin-top: 40px;
}
.long >>> .el-form-item__label {
  line-height: 25px;
}
</style>
