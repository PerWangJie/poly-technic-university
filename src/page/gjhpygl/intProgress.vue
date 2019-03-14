<template>
    <div>
        <div class="container" v-show="show">
            <div class="header">
                <!-- 查询部分 -->
                <!-- <div class="left">
                        <el-input placeholder="请输入内容" class="header-input" clearable></el-input>
                        <el-button>查询</el-button>
                    </div> -->

                <!-- 增删改查 -->
                <div class="right">
                    <el-button type="danger" @click="applyChange">修改</el-button>
                    <el-button type="warning" @click="handleReport" v-if="has('stugjhpycg:selectPYCGInit')">成果录入</el-button>
                    <el-button type="primary" @click="handleSee">查看审核信息</el-button>
                    <!-- <el-button type="success" @click="handleSee">审核</el-button> -->
                </div>

                <el-dialog title="审核信息" :visible.sync="seeVisible" width="30%" :before-close="handleClose">
                    <div style="border:1px solid #ddd;padding:20px;margin-bottom:20px" v-for="(item, index) in his" :key="index">
                        <div class="see-title" style="border-bottom: 1px solid #ddd;padding-bottom:20px;font-size:17px;">{{item.name}}</div>
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
                <el-table v-loading="loading" ref="moviesTable" @row-click="clickRow" border :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">

                    <el-table-column type="selection" width="55">
                    </el-table-column>

                    <el-table-column label="序号" type="index" :index="indexMethod" width="80" align="center">
                    </el-table-column>

                    <el-table-column label="报备类型" prop="lx" align="center">
                        <template slot-scope="scope">
                            {{ scope.row.lx === '0' ? '校级资助项目' :scope.row.lx === '1' ? '国家公派项目' : '其它项目'}}
                        </template>
                    </el-table-column>

                    <el-table-column label="项目名称" prop="xmmc" align="center">
                    </el-table-column>

                    <el-table-column label="审核状态" prop="zt" align="center">
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
        <!-- 校级资助项目 -->
        <div v-show="show1" class="container">

            <el-form :model="xjzzsave" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">

                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>外派人员基本情况（校级资助项目）</span>
                        <div class="close" @click="close1"> X </div>
                    </el-col>
                </el-row>

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
                    <el-button type="danger" @click="handleCancel1" class="submit-btn">取消</el-button>
                    <el-button :loading="this.loading" type="primary" @click="applySubmit1" class="submit-btn" v-if="has('stucgbb:stuOrderApply')" :disabled="onsuccess1">{{ submit }}</el-button>
                </div>
            </el-form>
        </div>
        <!-- 国家公派项目 -->
        <div v-show="show2" class="container">

            <el-form :model="gjgpsave" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">

                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>外派人员基本情况（国家公派项目）</span>
                        <div class="close" @click="close2"> X </div>
                    </el-col>
                </el-row>

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
                    <el-button type="danger" @click="handleCancel2" class="submit-btn">取消</el-button>
                    <el-button :loading="this.loading" type="primary" @click="applySubmit2" class="submit-btn" v-if="has('stucgbb:stuOrderApply')" :disabled="onsuccess2">{{ submit }}</el-button>
                </div>
            </el-form>
        </div>
        <!-- 其他项目 -->
        <div v-show="show3" class="container">

            <el-form :model="qtsave" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">

                <el-row>
                    <el-col :sapn='22' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>外派人员基本情况（其它项目）</span>
                        <div class="close" @click="close3"> X </div>
                    </el-col>
                </el-row>

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
                    <el-button type="danger" @click="handleCancel3" class="submit-btn">取消</el-button>
                    <el-button :loading="this.loading" type="primary" @click="applySubmit3" class="submit-btn" v-if="has('stucgbb:stuOrderApply')" :disabled="onsuccess3">{{ submit }}</el-button>
                </div>
            </el-form>
        </div>
        <!-- 成果录入 -->
        <div v-show="show4" class="container">

            <el-form :model="list" :rules="rules" ref="ruleForm" label-width="177px" class="demo-ruleForm" label-position="left">

                <el-row>
                    <el-col :sapn='24' style="margin-top:5px;line-height:50px">
                        <div class="small"></div>
                        <span>个人及项目基本情况</span>
                        <div class="close" @click="close4"> X </div>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="姓名：">
                            <el-input v-model="list.xm"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="性别：" prop="gender">
                            <el-input :v-model="list.xbm = '1' ? '男' : '女'"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="出生年月：" prop="birth">
                            <el-input v-model="list.csrq"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="政治面貌：" prop="political">
                            <el-input v-model="list.zzmm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="专业：">
                            <el-input v-model="list.zy"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="学号：">
                            <el-input v-model="list.xh"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <!-- <el-col :span="11">
                        <el-form-item label="境外时间：" prop="time">
                            <el-input v-model="cglrsave.jwts"></el-input>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="11">
                        <el-form-item label="项目名称：" prop="projectName">
                            <el-input v-model="list.xmmc"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="指导老师：" prop="advisor">
                            <el-input v-model="list.dsxm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="境外时间：（必填项）" prop="sj">
                            <div class="date">
                                <el-form-item>
                                    <el-date-picker v-model="cglrsave.sj" @blur='handleBlur4' value-format="yyyy-MM-dd" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="境外天数：" prop="outsideDays">
                            <el-input v-model="cglrsave.jwts" readonly="true"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="境外地点：" prop="location">
                            <el-input v-model="list.gwtxdz"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="11">
                        <el-form-item label="E-mail：" prop="mail">
                            <el-input v-model="list.yx"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="联系电话：" prop="phone">
                            <el-input v-model="list.dh"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="项目名称：" prop="projectName">
                            <el-input v-model="cglrsave.xmmc"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> -->

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="项目执行情况：" prop="execution">
                            <el-input v-model="cglrsave.xmzxqk"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="30">
                    <el-col :span="22">
                        <el-form-item label="项目取得的成效：" prop="effect">
                            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容" v-model="cglrsave.xmqdcx">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

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

                <el-row :gutter="30">
                    <!-- 提交重置 -->
                    <div class="submit-box">
                        <el-button type="primary" @click="saveMsg" class="submit-btn">保存</el-button>
                        <!-- <el-button type="primary" @click="reset" class="submit-btn">重置</el-button> -->
                        <el-button :loading="this.loading" type="primary" @click="applySubmit4" class="submit-btn" v-if="has('stugjhpycg:resultApply')" :disabled="onsuccess4">{{ submit }}</el-button>
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
      onsuccess1: false,
      onsuccess2: false,
      onsuccess3: false,
      onsuccess4: false,
      fileList1: [], //上传文件列表展示
      fileList2: [], //上传文件列表展示
      fileList3: [], //上传文件列表展示
      fileList4: [], //上传文件列表展示
      dataList: [],
      submit: "提交",
      loading: true,
      show: true, //列表展示开关
      show1: false, //校级资助项目开关
      show2: false, //国家公派项目开关
      show3: false, //其他项目开关
      show4: false, //成果录入开关
      seeVisible: false, //审核流程图显示开关
      id: "",
      lcid: "",
      zt: "",
      lx: "",
      list: [], //成果录入表单
      jfly1: [], //校级资助项目经费来源
      jfly3: [], //其它项目经费来源
      fj: [],
      his: [],
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
        xmmc: "",
        lx: "1",
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
        //   jfly: '',
        cgjbz: "",
        fj: []
      },
      // 3.其它项目提交
      qtsave: {
        lcid: "",
        zxxmid: "",
        xh: "",
        poxm: "",
        lx: "2",
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
      // 4.成果录入提交
      cglrsave: {
        xh: "",
        sj: [],
        jwts: "",
        // xmmc: '',
        cgbbid: "",
        jwts: "",
        xmzxqk: "",
        xmqdcx: "",
        fj: []
      },
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  activated() {
    // this.reload()
    this.loadTable();
  },
  // mounted() {
  //     // this.reload()
  //     this.loadTable()
  // },
  methods: {
    // 时间戳转换成时间
    // 使用element table组件中的formatter属性，传入一个函数
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
    //加载列表
    loadTable() {
      if (this.has("stugjhzxxm:selectCgbbListForService")) {
        this.$http
          .get(this.$server.glourl + "stugjhzxxm/selectCgbbListForService", {
            params: this.pageHelp
          })
          .then(response => {
            // console.log(response.data);
            const data = response.data;
            this.dataList = data.page.list;
            this.pageList = data.page;
            // this.reload()
            // this.$router.go(0)
          });
      } else {
        console.log();
      }
      this.loading = false;
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
    handleBlur4() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$http
        .get(this.$server.glourl + "teahwsjjdxm/count?sj=" + this.cglrsave.sj)
        .then(response => {
          if (response.data.code == 0) {
            this.cglrsave.jwts = response.data.count;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //点击列表选中
    clickRow(row) {
      this.$refs.moviesTable.toggleRowSelection(row);
    },
    //列表下载按钮
    download(lcid, zt) {
      if (zt == "1") {
        location.href = this.$server.glourl + "stucgbb/downWord?lcid=" + lcid;
      } else {
        this.$message({
          message: "审核未通过！",
          type: "error"
        });
      }
    },
    // 列表选择改变事件
    handleSelectionChange(selection) {
      if (selection.length == 0) {
        this.id = "";
        this.lcid = "";
        this.zt = "";
        this.lx = "";
      } else {
        this.id = selection[0].id;
        this.lcid = selection[0].lcid;
        this.zt = selection[0].zt;
        this.lx = selection[0].lx;
        // console.log(selection)
      }
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
    //取消修改
    handleCancel1() {
      this.show = true;
      this.show1 = false;
      this.loadTable();
    },
    handleCancel2() {
      this.show = true;
      this.show2 = false;
      this.loadTable();
    },
    handleCancel3() {
      this.show = true;
      this.show3 = false;
      this.loadTable();
    },
    // 文件上传成功时的钩子
    handleSuccess1(response, file, fileList) {
      this.xjzzsave.fj.push({ name: response.name, url: response.url });
      this.onsuccess1 = false;
    },
    handleSuccess2(response, file, fileList) {
      this.gjgpsave.fj.push({ name: response.name, url: response.url });
      this.onsuccess2 = false;
    },
    handleSuccess3(response, file, fileList) {
      this.qtsave.fj.push({ name: response.name, url: response.url });
      this.onsuccess3 = false;
    },
    handleSuccess4(response, file, fileList) {
      this.cglrsave.fj.push({ name: response.name, url: response.url });
      this.onsuccess4 = false;
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
    // 文件移除时的钩子
    handleRemove1(file, fileList) {
      this.onsuccess1 = false;
      this.fileList1 = fileList;
      this.xjzzsave.fj = this.fileList1;
    },
    handleRemove2(file, fileList) {
      this.onsuccess2 = false;
      this.fileList2 = fileList;
      this.gjgpsave.fj = this.fileList2;
    },
    handleRemove3(file, fileList) {
      this.onsuccess3 = false;
      this.fileList3 = fileList;
      this.qtsave.fj = this.fileList3;
    },
    handleRemove4(file, fileList) {
      this.onsuccess4 = false;
      this.fileList4 = fileList;
      this.cglrsave.fj = this.fileList4;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 修改查看详情
    applyChange() {
      if (this.id == null || this.id == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
      } else if (this.zt != 4 && this.zt != 5) {
        this.$message({
          message: "只能修改退回或未提交的信息！",
          type: "error"
        });
      } else {
        if (this.lx === "0") {
          this.$http
            .get(
              this.$server.glourl +
                "stucgbb/selectStuAndCheckById?id=" +
                this.id
            )
            .then(response => {
              this.xjzzsave = response.data.obj;
              if (response.data.obj == "1") {
                this.xjzzsave.xbm = "男";
              } else {
                this.xjzzsave.xbm = "女";
              }
              // 附件展示，需要解析成对象
              this.xjzzsave.fj = JSON.parse(response.data.obj.fj);
              this.fileList1 = this.xjzzsave.fj;
              //数组转字符串：join()
              //字符串转数组：split('')
              this.jfly1 = response.data.obj.jfly.split(",");
              // console.log(this.xjzzsave)
            });
          this.show = false;
          this.show1 = true;
        } else if (this.lx === "1") {
          this.$http
            .get(
              this.$server.glourl +
                "stucgbb/selectStuAndCheckById?id=" +
                this.id
            )
            .then(response => {
              this.gjgpsave = response.data.obj;
              if (response.data.obj == "1") {
                this.gjgpsave.xbm = "男";
              } else {
                this.gjgpsave.xbm = "女";
              }
              // 附件展示，需要解析成对象
              this.gjgpsave.fj = JSON.parse(response.data.obj.fj);
              this.fileList2 = this.gjgpsave.fj;
              //数组转字符串：join()
              //字符串转数组：split('')
              // this.jfly2 = response.data.obj.jfly.split(',')
              // console.log(this.jfly)
            });
          this.show = false;
          this.show2 = true;
        } else {
          this.$http
            .get(
              this.$server.glourl +
                "stucgbb/selectStuAndCheckById?id=" +
                this.id
            )
            .then(response => {
              this.qtsave = response.data.obj;
              if (response.data.obj == "1") {
                this.qtsave.xbm = "男";
              } else {
                this.qtsave.xbm = "女";
              }
              // 附件展示，需要解析成对象
              this.qtsave.fj = JSON.parse(response.data.obj.fj);
              this.fileList3 = this.qtsave.fj;
              //数组转字符串：join()
              //字符串转数组：split('')
              this.jfly3 = response.data.obj.jfly.split(",");
              // console.log(this.jfly)
            });
          this.show = false;
          this.show3 = true;
        }
      }
    },
    //校级修改保存
    saveMsg1() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.xjzzsave.jfly = this.jfly1.join();
      // console.log(this.xjzzsave.jfly)
      this.$http
        .post(this.$server.glourl + "stucgbb/saveforupdate", this.xjzzsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            // this.grcgbbsave = ''
            // this.jfly = []
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
    // 1.校级资助项目修改提交
    applySubmit1() {
      if (!this.xjzzsave.sj) {
        this.$message({
          message: "请选择起止时间！",
          type: "error"
        });
        return;
      }
      this.loading = true;
      this.submit = "加载中";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.xjzzsave.jfly = this.jfly1.join();
      // console.log(this.xjzzsave.jfly)
      this.$http
        .post(this.$server.glourl + "stucgbb/update", this.xjzzsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "修改成功！",
              type: "success"
            });
            // this.grcgbbsave = ''
            // this.jfly = []
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
    },
    //国家修改保存
    saveMsg2() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // this.gjgpsave.jfly = this.jfly1.join()
      this.$http
        .post(this.$server.glourl + "stucgbb/saveforupdate", this.gjgpsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            // this.grcgbbsave = ''
            // this.jfly = []
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
    // 2.国家公派项目修改提交
    applySubmit2() {
      if (!this.gjgpsave.sj) {
        this.$message({
          message: "请选择起止时间！",
          type: "error"
        });
        return;
      }
      this.loading = true;
      this.submit = "加载中";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      // this.gjgpsave.jfly = this.jfly1.join()
      this.$http
        .post(this.$server.glourl + "stucgbb/update", this.gjgpsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "修改成功！",
              type: "success"
            });
            // this.grcgbbsave = ''
            // this.jfly = []
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
    },
    //其他修改保存
    saveMsg3() {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.qtsave.jfly = this.jfly3.join();
      this.$http
        .post(this.$server.glourl + "stucgbb/saveforupdate", this.qtsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "修改成功！",
              type: "success"
            });
            // this.grcgbbsave = ''
            // this.jfly = []
            this.reload();
            this.show = true;
            this.show3 = false;
            // this.loadTable()
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 3.其他项目修改提交
    applySubmit3() {
      if (!this.qtsave.sj) {
        this.$message({
          message: "请选择起止时间！",
          type: "error"
        });
        return;
      }
      this.loading = true;
      this.submit = "加载中";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.qtsave.jfly = this.jfly3.join();
      this.$http
        .post(this.$server.glourl + "stucgbb/update", this.qtsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "修改成功！",
              type: "success"
            });
            // this.grcgbbsave = ''
            // this.jfly = []
            this.loading = false;
            this.submit = "提交";
            this.reload();
            this.show = true;
            this.show3 = false;
            // this.loadTable()
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 4.成果录入提交
    applySubmit4() {
      if (!this.cglrsave.sj) {
        this.$message({
          message: "请选择境外时间！",
          type: "error"
        });
        return;
      }
      this.loading = true;
      this.submit = "加载中";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.cglrsave.xh = this.list.xh;
      this.cglrsave.cgbbid = this.id;
      // this.save.jfly = this.jfly.join()
      this.$http
        .post(this.$server.glourl + "stugjhpycg/resultApply", this.cglrsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "提交成功！",
              type: "success"
            });
            this.loading = false;
            this.submit = "提交";
            this.show = true;
            this.show4 = false;
            this.loadTable();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    //保存
    saveMsg() {
      if (!this.cglrsave.sj) {
        this.$message({
          message: "请选择境外时间！",
          type: "error"
        });
        return;
      }
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.cglrsave.xh = this.list.xh;
      this.cglrsave.cgbbid = this.id;
      // this.save.jfly = this.jfly.join()
      this.$http
        .post(this.$server.glourl + "stugjhpycg/save", this.cglrsave)
        .then(response => {
          if (response.data.code == 0) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.show = true;
            this.show4 = false;
            this.loadTable();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 成果录入初始化
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
      } else {
        // else if(this.lx != '1') {
        // this.$message({
        //     message: "请选择学校出国报备！",
        //     type: "error"
        // });
        // }
        this.$http
          .get(this.$server.glourl + "stugjhpycg/selectPYCGInit?id=" + this.id)
          .then(response => {
            this.list = response.data.list;
            // console.log(this.list)
          });
        this.show = false;
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = true;
      }
    },
    // 查看审核信息
    handleSee() {
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
            // console.log(this.his[0].endTime)
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