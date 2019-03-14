<template>
    <div>
        <div class="container">
            <div v-if="check2 == '0'">
                <el-row :gutter="30">
                    <el-col :span="22">
                        <div class="small"></div>
                        <span>请选择出国报备类型：</span>
                        <el-radio-group v-model="check" @change="checkboxs">
                            <el-radio-button label="0">校级资助项目</el-radio-button>
                            <el-radio-button label="1">国家公派项目</el-radio-button>
                            <el-radio-button label="2">其他项目</el-radio-button>
                        </el-radio-group>
                    </el-col>
                </el-row>
            </div>
            <div v-if="first">
                <div class="header">
                    <div class="right">
                        <!-- <el-button type="danger" @click="applyChange">修改</el-button> -->
                        <el-button type="warning" @click="handleReport" v-if="has('stucgbb:selectCHBBInit')">项目报备</el-button>
                        <!-- <el-button type="primary" @click="handleSee">查看审核信息</el-button> -->
                        <!-- <el-button type="success" @click="handleSee">审核</el-button> -->
                    </div>
                </div>
                <div v-show="xjtable">
                    <el-table ref="moviesTable" @row-click="clickRow" border :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" key="tableDataInstall">

                        <el-table-column type="selection" width="55">
                        </el-table-column>

                        <el-table-column label="序号" type="index" :index="indexMethod" width="80" align="center">
                        </el-table-column>

                        <el-table-column label="项目名称" prop="xmmc" align="center">

                        </el-table-column>

                        <!-- 0失败，1成功，2审核中，3待审核 -->
                        <el-table-column label="审核状态" prop="zt" align="center">
                            <template slot-scope="scope">
                                {{ scope.row.zt == 0 ? '审核不通过' :scope.row.zt == 1 ? '审核通过':scope.row.zt == 2 ? '审核中' :scope.row.zt == 3 ? '待审核':scope.row.zt == 4 ? '退回':scope.row.zt == 5 ? '未提交':''}}
                            </template>
                        </el-table-column>

                        <el-table-column prop="cjsj" label="创建时间" align="center">
                            <template slot-scope="scope">{{scope.row.cjsjString}}</template>
                        </el-table-column>

                    </el-table>
                </div>
                <!-- 分页 -->
                <div class="pagination">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageList.currPage" :page-sizes="[5,10,15]" :page-size="pageList.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageList.totalCount">
                    </el-pagination>
                </div>
            </div>
            <!-- 国家公派table -->
            <div v-if="!second">
                <div class="header">
                    <div class="right">
                        <!-- <el-button type="danger" @click="applyChange">修改</el-button> -->
                        <el-button type="warning" @click="handleReport" v-if="has('stucgbb:selectCHBBInit')">项目报备</el-button>
                        <!-- <el-button type="primary" @click="handleSee">查看审核信息</el-button> -->
                        <!-- <el-button type="success" @click="handleSee">审核</el-button> -->
                    </div>
                </div>
                <div v-show="gjtable">
                    <el-table ref="moviesTable" @row-click="clickRow" border :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange1">

                        <el-table-column type="selection" width="55">
                        </el-table-column>

                        <el-table-column label="序号" type="index" :index="indexMethod" width="80" align="center">
                        </el-table-column>

                        <el-table-column label="项目名称" prop="jhsbxmmc" align="center">
                            <template slot-scope="scope">
                                {{ scope.row.jhsbxmmc == 0 ? '国家建设高水平大学项目' :scope.row.jhsbxmmc == 1 ? '国家公派硕士研究生项目' :scope.row.jhsbxmmc == 2 ? '国外合作项目' :scope.row.jhsbxmmc == 3 ?'其他':''}}
                            </template>
                        </el-table-column>

                        <!-- 0失败，1成功，2审核中，3待审核 -->
                        <el-table-column label="审核状态" prop="zt" align="center">
                            <template slot-scope="scope">
                                {{ scope.row.zt == 0 ? '审核不通过' :scope.row.zt == 1 ? '审核通过':scope.row.zt == 2 ? '审核中' :scope.row.zt == 3 ? '待审核':scope.row.zt == 4 ? '退回':scope.row.zt == 5 ? '未提交':''}}
                            </template>
                        </el-table-column>

                        <el-table-column prop="cjsj" label="创建时间" align="center">
                            <template slot-scope="scope">{{scope.row.cjsjString}}</template>
                        </el-table-column>

                    </el-table>
                </div>
                <!-- 分页 -->
                <div class="pagination">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageList.currPage" :page-sizes="[5,10,15]" :page-size="pageList.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageList.totalCount">
                    </el-pagination>
                </div>
            </div>
            <!-- 校级资助项目 -->
            <div v-show="show1">
                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>外派人员基本情况（校级资助项目）</span>
                        <div class="close" @click="close1"> X </div>
                    </el-col>
                </el-row>

                <el-form :model="list1" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="姓名：" prop="">
                                <el-input v-model="list1.xm"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="性别：" prop="">
                                <el-input v-model="list1.xbm"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="籍贯：" prop="">
                                <el-input v-model="list1.jg"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="拼音：" prop="">
                                <el-input v-model="list1.xmpy"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="出生年月：" prop="">
                                <el-input v-model="list1.csrq"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="出生地：" prop="">
                                <el-input v-model="list1.ssdqmc"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="学院：" prop="">
                                <el-input v-model="list1.yxqc"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="指导老师：" prop="">
                                <el-input v-model="list1.dsxm"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="学科：" prop="">
                                <el-input v-model="list1.xk"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="学号：" prop="">
                                <el-input v-model="list1.xh"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="身份证号：" prop="r">
                                <el-input v-model="list1.sfzjh"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="手机：" prop="">
                                <el-input v-model="list1.dh"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="E-mail：" prop="">
                                <el-input v-model="list1.yx"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="婚姻状况：" prop="">
                                <el-input v-model="list1.hyzkm"></el-input>
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
                                <el-input v-model="list1.xmmc"></el-input>
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
                        <el-col :span="11">
                            <el-form-item label="起止时间：（必填项）" prop="sj">
                                <div class="date">
                                    <el-form-item>
                                        <el-date-picker v-model="xjzzsave.sj" @blur='handleBlur1' value-format="yyyy-MM-dd" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                            </el-form-item>
                        </el-col>
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

                    <!-- 提交重置 -->
                    <div class="submit-box">
                        <el-button type="primary" @click="saveMsg1" class="submit-btn">保存</el-button>
                        <!-- <el-button type="primary" @click="applySave" class="submit-btn">保存</el-button>
                    <el-button type="primary" @click="reset" class="submit-btn">重置</el-button> -->
                        <!-- <el-button type="danger" @click="applyChange" class="submit-btn" v-if="has('stucgbb:stuOrderApply')">修改</el-button> -->
                        <el-button :loading="this.loading" type="primary" @click="applySubmit1" class="submit-btn" v-if="has('stucgbb:stuOrderApply')" :disabled="onsuccess1">{{ submit }}</el-button>
                    </div>
                </el-form>
            </div>
            <!-- 国家公派项目 -->
            <div v-show="show2">
                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>外派人员基本情况（国家公派项目）</span>
                        <div class="close" @click="close2"> X </div>
                    </el-col>
                </el-row>

                <el-form :model="list2" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="姓名：" prop="">
                                <el-input v-model="list2.xm"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="性别：" prop="">
                                <el-input v-model="list2.xbm"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="籍贯：" prop="">
                                <el-input v-model="list2.jg"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="拼音：" prop="">
                                <el-input v-model="list2.xmpy"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="出生年月：" prop="">
                                <el-input v-model="list2.csrq"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="出生地：" prop="">
                                <el-input v-model="list2.ssdqmc"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="学院：" prop="">
                                <el-input v-model="list2.yxqc"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="指导老师：" prop="">
                                <el-input v-model="list2.dsxm"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="学科：" prop="">
                                <el-input v-model="list2.xk"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="学号：" prop="">
                                <el-input v-model="list2.xh"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="身份证号：" prop="r">
                                <el-input v-model="list2.sfzjh"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="手机：" prop="">
                                <el-input v-model="list2.dh"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="E-mail：" prop="">
                                <el-input v-model="list2.yx"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="婚姻状况：" prop="">
                                <el-input v-model="list2.hyzkm"></el-input>
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
                                <el-input v-model="list2.xmmc"></el-input>
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
                        <el-col :span="11">
                            <el-form-item label="起止时间：（必填项）" prop="sj">
                                <div class="date">
                                    <el-form-item>
                                        <el-date-picker v-model="gjgpsave.sj" @blur='handleBlur2' value-format="yyyy-MM-dd" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                            </el-form-item>
                        </el-col>
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
                        <el-button type="primary" @click="saveMsg2" class="submit-btn">保存</el-button>
                        <!-- <el-button type="primary" @click="applySave" class="submit-btn">保存</el-button>
                    <el-button type="primary" @click="reset" class="submit-btn">重置</el-button> -->
                        <!-- <el-button type="danger" @click="applyChange" class="submit-btn" v-if="has('stucgbb:stuOrderApply')">修改</el-button> -->
                        <el-button :loading="this.loading" type="primary" @click="applySubmit2" class="submit-btn" v-if="has('stucgbb:stuOrderApply')" :disabled="onsuccess2">{{ submit }}</el-button>
                    </div>
                </el-form>
            </div>
            <!-- 其它项目 -->
            <div v-if="check === '2'">
                <el-row>
                    <el-col :sapn='22' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>外派人员基本情况（其它项目）</span>
                        <!-- <div class="close" @click="close"> X </div> -->
                    </el-col>
                </el-row>

                <el-form :model="list3" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="姓名：" prop="">
                                <el-input v-model="list3.xm"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="性别：" prop="">
                                <el-input v-model="list3.xbm"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="籍贯：" prop="">
                                <el-input v-model="list3.jg"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="拼音：" prop="">
                                <el-input v-model="list3.xmpy"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="出生年月：" prop="">
                                <el-input v-model="list3.csrq"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="出生地：" prop="">
                                <el-input v-model="list3.ssdqmc"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="学院：" prop="">
                                <el-input v-model="list3.yxqc"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="指导老师：" prop="">
                                <el-input v-model="list3.dsxm"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="学科：" prop="">
                                <el-input v-model="list3.xk"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="学号：" prop="">
                                <el-input v-model="list3.xh"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="身份证号：" prop="r">
                                <el-input v-model="list3.sfzjh"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="手机：" prop="">
                                <el-input v-model="list3.dh"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="E-mail：" prop="">
                                <el-input v-model="list3.yx"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="婚姻状况：" prop="">
                                <el-input v-model="list3.hyzkm"></el-input>
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
                        <el-col :span="11">
                            <el-form-item label="起止时间：" prop="sj">
                                <div class="date">
                                    <el-form-item>
                                        <el-date-picker v-model="qtsave.sj" @blur='handleBlur3' value-format="yyyy-MM-dd" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                            </el-form-item>
                        </el-col>
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
                                <el-checkbox-group v-model="jfly">
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
                        <el-button type="primary" @click="saveMsg3" class="submit-btn">保存</el-button>
                        <!-- <el-button type="primary" @click="applySave" class="submit-btn">保存</el-button>
                        <el-button type="primary" @click="reset" class="submit-btn">重置</el-button> -->
                        <!-- <el-button type="danger" @click="applyChange" class="submit-btn" v-if="has('stucgbb:stuOrderApply')">修改</el-button> -->
                        <el-button :loading="this.loading" type="primary" @click="applySubmit3" class="submit-btn" v-if="has('stucgbb:stuOrderApply')" :disabled="onsuccess3">{{ submit }}</el-button>
                        <!-- <el-button type="primary" :loading="true">加载中</el-button> -->
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      xjtable: true,
      gjtable: true,
      first: true, //控制校级资助table显示
      second: true, //控制国家公派table显示
      onsuccess1: false,
      onsuccess2: false,
      onsuccess3: false,
      submit: "提交",
      loading: true,
      check: "0",
      check2: "0",
      type: 0, //其它项目
      dataList: [],
      list1: {}, //初始化数据
      list2: {},
      list3: {},
      fileList1: [], //文件上传列表展示
      fileList2: [], //文件上传列表展示
      fileList3: [], //文件上传列表展示
      show: true, //控制申请表显示与隐藏
      show1: false, //校级资助项目申请表开关
      show2: false, //国家公派项目申请表开关
      id: "",
      jfly: [],
      jfly1: [],
      jfly2: [], //国家公派项目经费来源
      // 1.校级资助项目提交
      xjzzsave: {
        xmmc: "",
        lx: "0",
        poxm: "",
        zxxmid: "",
        xh: "",
        yshz: "",
        gwtxdz: "",
        gwdw: "",
        yqr: "",
        sj: [],
        zwts: "",
        pcrw: "",
        //   gplb: '',
        jfly: "",
        cgjbz: "",
        fj: []
      },
      // 2.国家公派项目提交
      gjgpsave: {
        zwts: ""
      },
      // 3.其它项目提交
      qtsave: {
        zxxmid: "",
        xh: "",
        lx: "2",
        poxm: "",
        yshz: "",
        xmmc: "",
        gwtxdz: "",
        gwdw: "",
        yqr: "",
        sj: [],
        zwts: "",
        pcrw: "",
        gplb: "",
        jfly: "",
        cgjbz: "",
        fj: []
      },
      //列表前端分页
      pageList: {
        totalCount: "",
        pageSize: "",
        totalPage: "",
        currPage: ""
      },
      //列表分页辅助类(传参)
      pageHelp: {
        page: 1,
        limit: 5,
        sidx: "cjsj",
        order: "desc"
      }
    };
  },
  mounted() {
    this.getData();
    this.loadTable();
    this.loadTable1();
  },
  methods: {
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
      // console.log(row)
    },
    // 列表选择改变事件
    handleSelectionChange(selection) {
      if (selection.length == 0) {
        this.id = "";
        this.lcid = "";
        this.zt = "";
      } else {
        this.id = selection[0].id;
        this.lcid = selection[0].lcid;
        this.zt = selection[0].zt;
      }
    },
    handleSelectionChange1(selection) {
      // console.log(selection);
      if (selection.length == 0) {
        this.id = "";
        this.lcid = "";
        this.zt = "";
      } else {
        this.id = selection[0].id;
        this.lcid = selection[0].lcid;
        this.zt = selection[0].zt;
      }
    },
    //加载列表
    loadTable() {
      if (this.has("stugjhzxxm:selectGjhzxxmListForService")) {
        this.$http
          .get(this.$server.glourl + "stugjhzxxm/selectGjhzxxmListForService", {
            params: this.pageHelp
          })
          .then(response => {
            const data = response.data;
            this.dataList = data.page.list;
            this.pageList = data.page;
          });
      } else {
        console.log();
      }
      this.loading = false;
    },
    loadTable1() {
      //   if (this.has("stugjhzxxm:selectGjhzxxmListForService")) {
      this.$http
        .get(this.$server.glourl + "stugjjzxxm/selectListForUser", {
          params: this.pageHelp
        })
        .then(response => {
          // console.log(response.data);
          const data = response.data;
          this.dataList = data.page.list;
          this.pageList = data.page;
        });
      //   } else {
      //     console.log(1);
      //   }
      this.loading = false;
    },
    //项目报备按钮函数
    handleReport() {
      if (this.id == null || this.id == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
      } else if (this.zt != "1") {
        this.$message({
          message: "请等待审核完成！",
          type: "error"
        });
      } else if (this.check == "0") {
        this.check2 = "1";
        this.$http
          .get(this.$server.glourl + "stucgbb/selectCHBBInit?id=" + this.id)
          .then(response => {
            // console.log(response.data);
            this.list1 = response.data.list;
            if (response.data.list.xbm == "1") {
              this.list1.xbm = "男";
            } else {
              this.list1.xbm = "女";
            }
          });
        this.show = false;
        this.show1 = true;
        this.first = false;
      } else {
        this.check2 = "1";
        this.$http
          .get(this.$server.glourl + "stucgbb/selectCHBBInit3?id=" + this.id)
          .then(response => {
            // console.log(response.data);

            this.list2 = response.data.list;
            if (response.data.list.xbm == "1") {
              this.list2.xbm = "男";
            } else {
              this.list2.xbm = "女";
            }
            response.data.list.xmmc == "0"
              ? (this.list2.xmmc = "国家建设高水平大学项目")
              : response.data.list.xslbm == "1"
                ? (this.list2.xmmc = "国家公派硕士研究生项目")
                : response.data.list.xslbm == "2"
                  ? (this.list2.xmmc = "国外合作项目")
                  : response.data.list.xslbm == "3"
                    ? (this.list2.xmmc = "其他")
                    : "";
          });
        this.second = true;
        this.show = false;
        this.show2 = true;
      }
    },
    // 初始化（个人出国报备：其它项目）
    getData() {
      this.$http
        .get(this.$server.glourl + "stucgbb/selectCHBBInit2")
        .then(response => {
          // console.log(response.data);
          this.list3 = response.data.list;
          if (response.data.list.xbm == "1") {
            this.list3.xbm = "男";
          } else {
            this.list3.xbm = "女";
          }
        });
    },
    saveMsg1() {
      if (!this.xjzzsave.sj) {
        this.$message({
          message: "请选择起止时间！",
          type: "error"
        });
        return;
      }
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // this.xjzzsave.fj = this.fj
      this.xjzzsave.jfly = this.jfly1.join();
      this.xjzzsave.zxxmid = this.id;
      this.xjzzsave.xmmc = this.list1.xmmc;
      this.xjzzsave.lx = "0";
      this.$http
        .post(this.$server.glourl + "stucgbb/save", this.xjzzsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.reload();
            this.show = true;
            this.show1 = false;
            // this.loadTable()
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //校级资助项目提交
    applySubmit1() {
      if (!this.xjzzsave.sj) {
        this.$message({
          message: "请选择起止时间！",
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
        // this.xjzzsave.fj = this.fj
        this.xjzzsave.jfly = this.jfly1.join();
        this.xjzzsave.zxxmid = this.id;
        this.xjzzsave.xmmc = this.list1.xmmc;
        this.xjzzsave.lx = "0";
        this.$http
          .post(this.$server.glourl + "stucgbb/stuOrderApply", this.xjzzsave)
          .then(response => {
            if (response.data.code == 0) {
              this.$message({
                message: "提交成功！",
                type: "success"
              });
              this.loading = false;
              this.submit = "提交";
              this.reload();
              this.show = true;
              this.show1 = false;
              // this.loadTable()
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    //保存
    saveMsg2() {
      if (!this.gjgpsave.sj) {
        this.$message({
          message: "请选择起止时间！",
          type: "error"
        });
        return;
      }
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // this.save.fj = this.fj
      // this.gjgpsave.jfly = this.jfly2.join()
      this.gjgpsave.zxxmid = this.id;
      this.gjgpsave.xmmc = this.list2.xmmc;
      this.gjgpsave.lx = "1";
      this.$http
        .post(this.$server.glourl + "stucgbb/save", this.gjgpsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.reload();
            this.show = true;
            this.show2 = false;
            // this.loadTable()
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //国家公派项目
    applySubmit2() {
      if (!this.gjgpsave.sj) {
        this.$message({
          message: "请选择起止时间！",
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
        // this.save.fj = this.fj
        // this.gjgpsave.jfly = this.jfly2.join()
        this.gjgpsave.zxxmid = this.id;
        this.gjgpsave.xmmc = this.list2.xmmc;
        this.gjgpsave.lx = "1";
        this.$http
          .post(this.$server.glourl + "stucgbb/stuOrderApply", this.gjgpsave)
          .then(response => {
            if (response.data.code == 0) {
              this.$message({
                message: "提交成功！",
                type: "success"
              });
              this.loading = false;
              this.submit = "提交";
              this.reload();
              this.show = true;
              this.show2 = false;
              // this.loadTable()
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    checkboxs(val) {
      //console.log(val);
      if (val == 1) {
        this.first = false;
        this.second = false;
        this.loadTable1();
      } else if (val == 0) {
        this.first = true;
        this.second = true;
        this.loadTable();
      } else {
        this.first = false;
        this.second = true;
      }
    },
    //保存
    saveMsg3() {
      if (!this.qtsave.sj) {
        this.$message({
          message: "请选择起止时间！",
          type: "error"
        });
        return;
      }

      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.qtsave.jfly = this.jfly.join();
      this.qtsave.lx = "2";
      // console.log(this.qtsave.jfly)
      this.$http
        .post(this.$server.glourl + "stucgbb/save", this.qtsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.reload();
            // this.save = ''
            // this.save.fj = null
            // this.jfly = []
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 其它项目提交
    applySubmit3() {
      if (this.qtsave.sj.length == 0) {
        this.$message({
          message: "请选择起止时间！",
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
        this.qtsave.jfly = this.jfly.join();
        this.qtsave.lx = "2";
        // console.log(this.qtsave.jfly)
        this.$http
          .post(this.$server.glourl + "stucgbb/stuOrderApply", this.qtsave)
          .then(response => {
            if (response.data.code == 0) {
              this.$message({
                message: "提交成功！",
                type: "success"
              });
              this.loading = false;
              this.submit = "提交";
              this.reload();
              // this.save = ''
              // this.save.fj = null
              // this.jfly = []
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    //关闭申请页面
    close() {
      this.show = false;
    },
    close1() {
      this.show = true;
      this.show1 = false;
      this.first = true;
      this.check2 = "0";
      this.loadTable();
    },
    close2() {
      this.show = true;
      this.second = false;
      this.show2 = false;
      this.check2 = "0";
      this.loadTable1();
    },
    //申请期限
    handleBlur1() {
      this.$http
        .get(this.$server.glourl + "teahwsjjdxm/count?sj=" + this.xjzzsave.sj)
        .then(response => {
          if (response.data.code == 0) {
            this.xjzzsave.zwts = response.data.count;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    handleBlur2() {
      this.$http
        .get(this.$server.glourl + "teahwsjjdxm/count?sj=" + this.gjgpsave.sj)
        .then(response => {
         // console.log(response.data);
          if (response.data.code == 0) {
            this.gjgpsave.zwts = response.data.count;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    handleBlur3() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$http
        .get(this.$server.glourl + "teahwsjjdxm/count?sj=" + this.qtsave.sj)
        .then(response => {
          if (response.data.code == 0) {
            this.qtsave.zwts = response.data.count;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 文件上传成功时的钩子
    handleSuccess1(response, file, fileList) {
      this.onsuccess1 = false;
      this.xjzzsave.fj.push({ name: response.name, url: response.url });
    },
    handleSuccess2(response, file, fileList) {
      this.onsuccess2 = false;
      this.gjgpsave.fj.push({ name: response.name, url: response.url });
    },
    handleSuccess3(response, file, fileList) {
      this.onsuccess3 = false;
      this.qtsave.fj.push({ name: response.name, url: response.url });
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
    handleRemove1(file, fileList) {
      this.onsuccess1 = false;
      // console.log(file, fileList);
    },
    handleRemove2(file, fileList) {
      this.onsuccess2 = false;
      // console.log(file, fileList);
    },
    handleRemove3(file, fileList) {
      this.onsuccess3 = false;
      // console.log(file, fileList);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
    //列表下载按钮
    // download(lcid, zt) {
    //   if (zt == "1") {
    //     location.href =
    //       this.$server.glourl + "stugjhpycg/downWord?lcid=" + lcid;
    //   } else {
    //     this.$message({
    //       message: "审核未通过！",
    //       type: "error"
    //     });
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/common"; //必须加分号，不然会报错
@import "../../style/ele";
</style>

