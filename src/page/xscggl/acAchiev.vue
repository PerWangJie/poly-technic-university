<template>
    <div style="width:100%">
        <div class="dialog">
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="handleClose">
                <div class="point">只能填写以浙江工业大学为第一单位的有关项目信息！</div>
            </el-dialog>
        </div>
        <div class="container" v-show="show">
            <div class="header">
                <div class="right">
                    <el-button type="primary" @click="see" >查看审核信息</el-button>
                    <!--v-if="has('acAchiev:create')"-->
                    <el-button type="success" @click="addApply" v-if="has('acAchiev:create')">添加</el-button>
                    <!-- <el-button type="success" @click="addApply">添加</el-button> -->
                    <el-button type="danger" @click="applyChange">修改</el-button>
                    <!--v-if="has('acAchiev:shenhe')"-->
                    <el-button type="warning"  @click="handleEdit" v-if="has('acAchiev:shenhe')">审核</el-button>
                    <!-- <el-button type="warning"  @click="handleEdit">审核</el-button> -->
                </div>

                <el-dialog title="审核信息" :visible.sync="dialogFormVisible" width="55%" style="margin-top:-5vh">
                    <div class="divShadow2" v-show="stuxscg.dsxm != null">
                        <div class="topBlue1">导师审核信息</div>
                        <el-form :model="stuxscg" :rules="rules" ref="stuxscg" label-width="100px" class="demo-stuxscg" label-position="left" style="padding-top:40px;">
                            <el-row :gutter="30">
                                <el-col :span="11">
                                    <el-form-item label="审核人:">
                                        <el-input v-model="stuxscg.dsxm" readonly="readonly"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="审核时间：">
                                        <el-input v-model="stuxscg.dsshsj" readonly="readonly"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="30">
                                <el-col :span="22">
                                    <el-form-item label="审核意见：">
                                        <el-input type="textarea" v-model="stuxscg.dsshyj" :rows="3" placeholder="" readonly="readonly">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div class="divShadow2" v-show="stuxscg.xyshr != null">
                        <div class="topBlue1">学院审核信息</div>
                        <el-form :model="stuxscg" :rules="rules" ref="stuxscg" label-width="100px" class="demo-stuxscg" label-position="left" style="padding-top:40px;">
                            <el-row :gutter="30">
                                <el-col :span="11">
                                    <el-form-item label="审核人:">
                                        <el-input v-model="stuxscg.xyshr" readonly="readonly"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="审核时间：">
                                        <el-input v-model="stuxscg.xyshsj" readonly="readonly"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="30">
                                <el-col :span="22">
                                    <el-form-item label="审核意见：">
                                        <el-input type="textarea" v-model="stuxscg.xyshyj" :rows="3" placeholder="" readonly="readonly">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div class="divShadow2" v-show="stuxscg.xxshr != null">
                        <div class="topBlue1">学校审核信息</div>
                        <el-form :model="stuxscg" :rules="rules" ref="stuxscg" label-width="100px" class="demo-stuxscg" label-position="left" style="padding-top:40px;">
                            <el-row :gutter="30">
                                <el-col :span="11">
                                    <el-form-item label="审核人:">
                                        <el-input v-model="stuxscg.xxshr" readonly="readonly"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="审核时间：">
                                        <el-input v-model="stuxscg.xxshsj" readonly="readonly"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="30">
                                <el-col :span="22">
                                    <el-form-item label="审核意见：">
                                        <el-input type="textarea" v-model="stuxscg.xxshyj" :rows="3" placeholder="" readonly="readonly">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
            <el-table ref="moviesTable" :data="page.slice((currentPage-1)*pageSize,currentPage*pageSize)" @row-click="clickRow" tooltip-effect="dark" style="margin:0 auto;margin-top:5px;text-align:center" @selection-change="handleSelectionChange" border>
                <el-table-column type="selection" width="55" align="center">
                </el-table-column>
                <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="80">
                </el-table-column>
                <el-table-column label="id" type="index" align="center" v-if="show4" prop="id">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column label="学号" align="center" show-overflow-tooltip prop="xh">
                    <template slot-scope="scope">{{ scope.row.xh }}</template>
                </el-table-column>
                <el-table-column prop="xsxm" label="姓名" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.xsxm }}</template>
                </el-table-column>
                <el-table-column prop="lwmc" label="论文名称" show-overflow-tooltip align="center">
                    <template slot-scope="scope">{{ scope.row.lwmc }}</template>
                </el-table-column>
                <el-table-column prop="shzt" label="审核状态" show-overflow-tooltip align="center">
                    <template slot-scope="scope">{{ scope.row.shzt === '0' ? '导师审核中' :scope.row.shzt === '1'?'导师审核不通过':scope.row.shzt === '2'?'学院待审' :scope.row.shzt === '3'?'不通过':scope.row.shzt === '4'?'审核通过':scope.row.shzt === '5'?'学校退回' : scope.row.shzt === '6'? '退回':''}}</template>
                </el-table-column>
            </el-table>
            <div class="block" style="text-align:center;margin-top:30px">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.length">
                </el-pagination>
            </div>
        </div>
        <!-- 添加 -->
        <div v-show="show1">
            <div class="divShadow" v-show="show4">
                <div class="topBlue">作者信息</div>
                <!-- <div class="close" @click="close"> X </div> -->
                <el-form :model="stuxscg" :rules="rules" ref="stuxscg" label-width="177px" class="demo-stuxscg" label-position="left" style="padding-top:50px;">
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="姓名：" prop="xsxm">
                                <el-input v-model="stuxscg.xsxm" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="学号：" prop="xh">
                                <el-input v-model="stuxscg.xh"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="学院：" prop="xymc">
                                <el-input v-model="stuxscg.xymc" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

            <div class="divShadow">
                <div class="topBlue">关键信息</div>
                <el-form :model="stuxscg" :rules="rules" ref="stuxscg" label-width="177px" class="demo-stuxscg" label-position="left" style="padding-top:50px;">
                    <!-- <el-row :gutter="30">
                        <el-col>
                            <p style="color:#F56C6C;margin-left:56px">仅填写以“浙江工业大学”为第一署名单位的学术论文！</p>
                        </el-col>
                    </el-row> -->
                    <el-row :gutter="30">
                        <el-col :span="22">
                            <el-form-item label="论文题目：" prop="lwmc">
                                <el-input v-model="stuxscg.lwmc"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="是否是第一作者：" prop="yktm">
                                <el-radio-group v-model="stuxscg.sfdyzz">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="作者总数：" prop="zzzrs">
                                <el-input v-model="stuxscg.zzzrs"></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="11">
                            <el-form-item label="第一作者所在单位：" prop="zzzrs">
                                <el-input v-model="stuxscg.zzzrs"></el-input>
                            </el-form-item>
                        </el-col> -->
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11" v-if="stuxscg.sfdyzz == '2'">
                            <el-form-item label="是否是导师第一作者：" prop="yktm">
                                <el-radio-group v-model="stuxscg.dsdyzz">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <div v-if="stuxscg.dsdyzz == '2' && stuxscg.sfdyzz == '2'">
                        <el-row :gutter="30">
                            <el-col :span="11">
                                <el-form-item label="本人排名：" prop="brpm">
                                    <el-input v-model="stuxscg.brpm"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="第一作者：" prop="dyzz">
                                    <el-input v-model="stuxscg.dyzz"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-form>
            <!-- </div>
            <div class="divShadow"> -->
                <!-- <div class="topBlue">论文信息</div> -->
                <el-form :model="stuxscg" :rules="rules" ref="stuxscg" label-width="177px" class="demo-stuxscg" label-position="left">

                    <el-row :gutter="30">
                        <el-col :span="18">
                            <el-form-item label="刊号：" prop="kh">
                                <el-select v-model="khVal"
                                    placeholder="请选择"
                                    style="width:20%"
                                    @change="handleChange">
                                    <el-option
                                        v-for="item in khOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-input v-model="stuxscg.kh" @blur="handleBlur" placeholder="请以类似 0000-0000 的形式填写" style="width:50%"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="15">
                            <el-form-item label="出版期刊名称：" prop="cbqkmc">
                                <el-input v-model="stuxscg.cbqkmc"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="22">
                            <el-form-item label="发表/录用状态：" prop="ly">
                                <el-radio-group v-model="stuxscg.ly">
                                    <el-radio label="1">已录用</el-radio>
                                    <el-radio label="2">已发表</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <div v-if="stuxscg.ly == '1'">
                        <el-row :gutter="30">
                            <el-col :span="11">
                                <el-form-item label="拟刊出时间：" prop="nkcsj">
                                    <el-date-picker
                                        v-model="stuxscg.nkcsj"
                                        type="date"
                                        placeholder="选择日期"
                                        format="yyyy / MM / dd "
                                        value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="30">
                            <el-col :span="11">
                                <el-form-item label="上传录用佐证：" prop="lyzz">
                                    <el-upload
                                        class="upload-demo"
                                        :action="baseUrl1"
                                        name="file"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :before-remove="beforeRemove"
                                        :on-success="handleSuccess"
                                        multiple :limit="1"
                                        :on-exceed="handleExceed"
                                        :file-list="fileList">
                                        <el-button slot="trigger" size="small" class="add">
                                            <div class="img">
                                                <img src="../../assets/image/attachment.png" alt="" style="width:100%;height:100%;">
                                            </div>
                                            <span class="append">上传附件</span>
                                        </el-button>
                                        <div slot="tip" class="el-upload__tip">如文件过多，请打压缩包上传！</div>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>

                    <div v-if="stuxscg.ly == '2'">
                        <el-row :gutter="30">
                            <el-col :span="11">
                                <el-form-item label="发表日期：" prop="fbrq">
                                    <el-date-picker
                                        v-model="stuxscg.fbrq"
                                        type="date"
                                        placeholder="选择日期"
                                        format="yyyy / MM / dd "
                                        value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="刊出卷号：" prop="kcjh">
                                    <el-input v-model="stuxscg.kcjh"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row :gutter="30">
                            <el-col :span="11">
                                <el-form-item label="上传收录佐证：" prop="slzz">
                                    <el-upload
                                        class="upload-demo"
                                        :action="baseUrl1"
                                        name="file"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :before-remove="beforeRemove"
                                        :on-success="handleSuccess"
                                        multiple :limit="1"
                                        :on-exceed="handleExceed"
                                        :file-list="fileList">
                                        <el-button slot="trigger" size="small" class="add">
                                            <div class="img">
                                                <img src="../../assets/image/attachment.png" alt="" style="width:100%;height:100%;">
                                            </div>
                                            <span class="append">上传附件</span>
                                        </el-button>
                                        <div slot="tip" class="el-upload__tip">如文件过多，请打压缩包上传！</div>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </div>
                    <el-row :gutter="30" v-if="khVal == 'ISSN'">
                            <el-col :span="15">
                                <el-form-item label="期刊类别：" prop="qklb">
                                    <el-select
                                        v-model="qklbVal"
                                        multiple
                                        filterable
                                        allow-create
                                        default-first-option
                                        placeholder="请选择"
                                        style="width:100%">
                                       <el-option
                                            v-for="item in qklbOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            :disabled="item.disabled">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row :gutter="30" v-if="khVal == 'ISBN'">
                            <el-col :span="15">
                                <el-form-item label="期刊类别：" prop="qklb">
                                    <el-select
                                        v-model="qklbVal"
                                        multiple
                                        filterable
                                        allow-create
                                        default-first-option
                                        placeholder="请选择"
                                        style="width:100%">
                                       <el-option
                                            v-for="item in qklbOptions1"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            :disabled="item.disabled">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row :gutter="30">
                            <el-col :span="15">
                                <el-form-item label="收录级别：" prop="sljb">
                                    <el-select v-model="sljbValue"
                                        placeholder="请选择"
                                        style="width:100%"
                                        multiple
                                        filterable
                                        allow-create
                                        default-first-option
                                        @change="handleFilter">
                                        <el-option-group v-for="group in sljbOptions" :key="group.label" :label="group.label">
                                            <el-option
                                                v-for="item in group.sljbOpt"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                                :disabled="item.disabled"
                                            ></el-option>
                                        </el-option-group>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row :gutter="30">
                            <el-col :span="11">
                                <el-form-item label="影响因子：" prop="yxyz">
                                    <el-input v-model="stuxscg.yxyz"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="30">
                            <el-col :span="22">
                                <el-form-item label="备注：" prop="yxyz">
                                    <!-- <el-input v-model="stuxscg.bz"></el-input> -->
                                    <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容"
                                        v-model="stuxscg.bz">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                </el-form>
            </div>
            <div class="bottomBox" style="text-align:center;">
                <el-button type="primary" class="reset" @click="close">取消</el-button>
                <el-button type="primary" class="reset" @click="submit">提交</el-button>
            </div>
        </div>
        <!-- 审核 与修改-->
        <!-- check: 0, //区分修改还是审核，0审核，1修改 -->
        <div v-show="show2">
            <div class="divShadow" v-if="this.check == 0">
                <div class="topBlue">作者信息</div>
                <!-- <div class="close" @click="close2"> X </div> -->
                <el-form :model="stuxscg1" :rules="rules" ref="stuxscg1" label-width="177px" class="demo-stuxscg1" label-position="left" style="padding-top:50px;">

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="姓名：" prop="xsxm">
                                <el-input v-model="stuxscg1.xsxm" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="学号：" prop="xh">
                                <el-input v-model="stuxscg1.xh" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="学院：" prop="xymc">
                                <el-input v-model="stuxscg1.xymc" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

            <div class="divShadow">
                <div class="topBlue">关键信息</div>
                <el-form :model="stuxscg1" :rules="rules" ref="stuxscg1" label-width="177px" class="demo-stuxscg" label-position="left" style="padding-top:50px;">
                    <el-row :gutter="30">
                        <el-col :span="22">
                            <el-form-item label="论文题目：" prop="lwmc">
                                <el-input v-model="stuxscg1.lwmc"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="是否是第一作者：" prop="yktm">
                                <el-radio-group v-model="stuxscg1.sfdyzz">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="作者总数：" prop="zzzrs">
                                <el-input v-model="stuxscg1.zzzrs"></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="11">
                            <el-form-item label="第一作者所在单位：" prop="zzzrs">
                                <el-input v-model="stuxscg1.zzzrs"></el-input>
                            </el-form-item>
                        </el-col> -->
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="11" v-if="stuxscg1.sfdyzz == '2'">
                            <el-form-item label="是否是导师第一作者：" prop="yktm">
                                <el-radio-group v-model="stuxscg1.dsdyzz">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="2">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <div v-if="stuxscg1.dsdyzz == '2' && stuxscg1.sfdyzz == '2'">
                        <el-row :gutter="30">
                            <el-col :span="11">
                                <el-form-item label="本人排名：" prop="brpm">
                                    <el-input v-model="stuxscg1.brpm"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="第一作者：" prop="dyzz">
                                    <el-input v-model="stuxscg1.dyzz"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-form>
            <!-- </div>
            <div class="divShadow">
                <div class="topBlue">论文信息</div> -->
                <el-form :model="stuxscg1" :rules="rules" ref="stuxscg1" label-width="177px" class="demo-stuxscg" label-position="left">

                    <el-row :gutter="30" v-show="this.check == 0">
                        <el-col :span="18">
                            <el-form-item label="刊号：">
                                <el-select v-model="khVal1"
                                    placeholder="请选择"
                                    style="width:20%"
                                    @change="handleChange1">
                                    <el-option
                                        v-for="item in khOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-input v-model="stuxscg1.kh" @blur="handleBlur1" placeholder="" style="width:50%"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30" v-show="this.check == 1">
                        <el-col :span="18">
                            <el-form-item label="刊号：" prop="kh">
                                <el-select v-model="khVal1"
                                    placeholder="请选择"
                                    style="width:20%"
                                    @change="handleChange1">
                                    <el-option
                                        v-for="item in khOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-input v-model="stuxscg1.kh" @blur="handleBlur1" placeholder="请以类似 0000-0000 的形式填写" style="width:50%"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="15">
                            <el-form-item label="出版期刊名称：" prop="cbqkmc">
                                <el-input v-model="stuxscg1.cbqkmc"></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="11">
                            <el-form-item label="刊号：" prop="kh">
                                <el-input v-model="stuxscg1.kh" placeholder="前四位必须是ISSN/ISBN"></el-input>
                            </el-form-item>
                        </el-col> -->
                    </el-row>

                    <el-row :gutter="30">
                        <el-col :span="22">
                            <el-form-item label="发表/录用状态：" prop="ly">
                                <el-radio-group v-model="stuxscg1.ly">
                                    <el-radio label="1">已录用</el-radio>
                                    <el-radio label="2">已发表</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div v-if="stuxscg1.ly == '1'">
                        <el-row :gutter="30">
                            <el-col :span="11">
                                <el-form-item label="拟刊出时间：" prop="nkcsj">
                                    <el-date-picker
                                        v-model="stuxscg1.nkcsj"
                                        type="date"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row style="padding-top:50px;padding-left:56px" v-if="this.check == 0 && this.stuxscg1.lyzz !=null">
                            <el-from>
                                <el-button slot="trigger" size="small" class="add">
                                    <div class="img">
                                        <img src="../../assets/image/attachment.png" alt="" style="width:100%;height:100%;">
                                    </div>
                                    <a :href="stuxscg1.lyzz" download=""><span class="append">下载附件</span></a>
                                </el-button>
                            </el-from>
                        </el-row>
                        <el-row :gutter="30" v-if="this.check == 1">
                            <el-col :span="11">
                                <el-form-item label="上传录用佐证：" prop="lyzz">
                                    <el-upload
                                        class="upload-demo"
                                        :action="baseUrl1"
                                        name="file"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :before-remove="beforeRemove"
                                        :on-success="handleSuccess1"
                                        multiple :limit="1"
                                        :on-exceed="handleExceed"
                                        :file-list="fileList">
                                        <el-button slot="trigger" size="small" class="add">
                                            <div class="img">
                                                <img src="../../assets/image/attachment.png" alt="" style="width:100%;height:100%;">
                                            </div>
                                            <span class="append">上传附件</span>
                                        </el-button>
                                        <div slot="tip" class="el-upload__tip">如文件过多，请打压缩包上传！</div>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>

                    <div v-if="stuxscg1.ly == '2'">
                        <el-row :gutter="30">
                            <el-col :span="11">
                                <el-form-item label="发表日期：" prop="fbrq">
                                    <el-date-picker
                                        v-model="stuxscg1.fbrq"
                                        type="date"
                                        placeholder="选择日期"
                                        format="yyyy / MM / dd "
                                        value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="刊出卷号：" prop="kcjh">
                                    <el-input v-model="stuxscg1.kcjh"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row style="padding-top:50px;padding-left:56px" v-if="this.check == 0 && this.stuxscg1.lyzz !=null">
                            <el-from>
                                <el-button slot="trigger" size="small" class="add">
                                    <div class="img">
                                        <img src="../../assets/image/attachment.png" alt="" style="width:100%;height:100%;">
                                    </div>
                                    <a :href="stuxscg1.slzz" download=""><span class="append">下载附件</span></a>
                                </el-button>
                            </el-from>
                        </el-row>

                        <el-row :gutter="30" v-if="this.check == 1">
                            <el-col :span="11">
                                <el-form-item label="上传收录佐证：" prop="slzz">
                                    <el-upload
                                        class="upload-demo"
                                        :action="baseUrl1"
                                        name="file"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :before-remove="beforeRemove"
                                        :on-success="handleSuccess1"
                                        multiple :limit="1"
                                        :on-exceed="handleExceed"
                                        :file-list="fileList">
                                        <el-button slot="trigger" size="small" class="add">
                                            <div class="img">
                                                <img src="../../assets/image/attachment.png" alt="" style="width:100%;height:100%;">
                                            </div>
                                            <span class="append">上传附件</span>
                                        </el-button>
                                        <div slot="tip" class="el-upload__tip">如文件过多，请打压缩包上传！</div>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </div>
                    <el-row :gutter="30" v-if="this.check == 0">
                            <el-col :span="15">
                                <el-form-item label="期刊类别：" prop="qklb">
                                    <el-input v-model="stuxscg1.qklb" style="width:100%" readonly>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <!-- <el-row :gutter="30" v-if="this.check == 1">
                            <el-col :span="15">
                                <el-form-item label="期刊类别：" prop="qklb">
                                    <el-input v-model="stuxscg1.qklb" style="width:100%" readonly>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row> -->

                        <el-row :gutter="30" v-if="khVal1 == 'ISSN' && this.check == 1">
                            <el-col :span="15">
                                <el-form-item label="期刊类别：" prop="qklb">
                                    <el-select
                                        v-model="qklbVal1"
                                        multiple
                                        filterable
                                        allow-create
                                        default-first-option
                                        placeholder="请选择"
                                        style="width:100%">
                                       <el-option
                                            v-for="item in qklbOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            :disabled="item.disabled">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row :gutter="30" v-if="khVal1 == 'ISBN' && this.check == 1">
                            <el-col :span="15">
                                <el-form-item label="期刊类别：" prop="qklb">
                                    <el-select
                                        v-model="qklbVal1"
                                        multiple
                                        filterable
                                        allow-create
                                        default-first-option
                                        placeholder="请选择"
                                        style="width:100%">
                                       <el-option
                                            v-for="item in qklbOptions1"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            :disabled="item.disabled">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row :gutter="30" v-if="this.check == 0">
                            <el-col :span="15">
                                <el-form-item label="收录级别：" prop="sljb">
                                    <el-input v-model="stuxscg1.sljb" style="width:100%" readonly>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row :gutter="30" v-if="this.check == 1">
                            <el-col :span="15">
                                <el-form-item label="收录级别：" prop="sljb">
                                    <el-select v-model="stuxscg1.sljb"
                                        placeholder="请选择"
                                        style="width:100%"
                                        multiple
                                        filterable
                                        allow-create
                                        default-first-option
                                        @change="handleFilter1">
                                        <el-option-group v-for="group in sljbOptions" :key="group.label" :label="group.label">
                                            <el-option
                                                v-for="item in group.sljbOpt"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                                :disabled="item.disabled"
                                            ></el-option>
                                        </el-option-group>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row :gutter="30">
                            <el-col :span="11">
                                <el-form-item label="影响因子：" prop="yxyz">
                                    <el-input v-model="stuxscg1.yxyz"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row :gutter="30">
                            <el-col :span="22">
                                <el-form-item label="备注：" prop="yxyz">
                                    <!-- <el-input v-model="stuxscg1.bz"></el-input> -->
                                    <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入内容"
                                        v-model="stuxscg1.bz">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                </el-form>
            </div>

            <div class="divShadow" v-if="this.check == 0">
                <div class="topBlue">审核意见</div>
                <el-row style="margin-left:56px;padding-top:50px">
                    <el-col :span="22">
                        <el-input type="textarea" v-model="textarea" :rows="8" placeholder="请输入审核意见：">
                        </el-input>
                    </el-col>
                </el-row>
            </div>

            <div class="bottomBox" style="text-align:center;" v-if="this.check == 0">
                <el-button type="primary" class="reset" @click="close2">取消</el-button>
                <el-button type="primary" class="reset" @click="adopt()">通过</el-button>
                <el-button type="primary" class="reset" @click="nothrough()">不通过</el-button>
            </div>

            <div class="bottomBox" style="text-align:center;" v-if="this.check == 1">
                <el-button type="primary" class="reset" @click="close2">取消</el-button>
                <el-button type="primary" class="reset" @click="changeSubmit">提交</el-button>
            </div>
        </div>
        <!-- 修改 changeSubmit -->
    </div>

</template>
<script>
export default {
  inject: ['reload'],
  data() {
    // var khcheck = (rule,value,callback)=>{
    //     if(value == null){
    //         // console.log(value)
    //         callback(new Error('请填写刊号'))
    //     }
    //     var val1 = value.indexOf('ISSN')
    //     var val2 = value.indexOf('ISBN')
    //     if(val1 == -1 && val2 == -1){
    //         callback(new Error('前四位必须是ISSN/ISBN'))
    //     }else {
    //         callback()
    //     }
    // }
    var khcheck = (rule,value,callback)=>{
        if(value == null){
            // console.log(value)
            callback(new Error('请填写刊号'))
        }
        var val1 = value.substring(0,4)
        var val2 = value.substring(4,5)
        var val3 = value.substring(5,9)
        if(val1.split('').length != 4 || val3.split('').length != 4){
            callback(new Error('格式不正确！请以类似 0000-0000 形式填写'))
        } if(val2 != '-') {
            callback(new Error('格式不正确！中间请以 - 连接'))
        } else {
            callback()
        }
    }
    return {
      selectA: false,//控制单选多选
      show: true, //展示列表开关
      show1: false,
      show2: false,
      show3: false,
      show4: false, //隐藏id与添加页面的作者信息
      check: 0, //区分修改还是审核，0审核，1修改
      dialogVisible: true,
      fileList: [], //添加上传文件列表展示
      fileList1: [], //修改上传文件列表展示
      khVal: 'ISSN',//刊号
      khVal1: '',//刊号
      khOptions: [{
          value: 'ISSN',
          label: 'ISSN'
        },{
            value: 'ISBN',
            label: 'ISBN'
      }],
      qklbOptions: [
        {
            value: 'Nature 子刊',
            label: 'Nature 子刊'
            },
        {
            value: '人文社科权威期刊（浙江大学标准）',
            label: '人文社科权威期刊（浙江大学标准）'
        },
        {
            value: '国内一级期刊（浙江大学标准）',
            label: '国内一级期刊（浙江大学标准）'
        },
        {
            value: '国内核心期刊（北京大学标准）',
            label: '国内核心期刊（北京大学标准）'
        },
        {
            value: '国内核心期刊（浙江大学标准）',
            label: '国内核心期刊（浙江大学标准）'
        },
        {
            value: 'ZJUT TOP 100期刊',
            label: 'ZJUT TOP 100期刊'
        },
        {
            value: '浙江工业大学A类期刊',
            label: '浙江工业大学A类期刊'
        },
        {
            value: '浙江工业大学B类期刊',
            label: '浙江工业大学B类期刊'
        },
        {
            value: '艺术类作品公开发表（仅限艺术类人员填写）',
            label: '艺术类作品公开发表（仅限艺术类人员填写）'
        },
        {
            value: '国际会议',
            label: '国际会议',
            disabled: true
        },
        {
            value: '其他',
            label: '其他'
        }
      ],//期刊类别ISSN
      qklbOptions1: [
        {
            value: 'Nature 子刊',
            label: 'Nature 子刊',
            disabled: true
            },
        {
            value: '人文社科权威期刊（浙江大学标准）',
            label: '人文社科权威期刊（浙江大学标准）',
            disabled: true
        },
        {
            value: '国内一级期刊（浙江大学标准）',
            label: '国内一级期刊（浙江大学标准）',
            disabled: true
        },
        {
            value: '国内核心期刊（北京大学标准）',
            label: '国内核心期刊（北京大学标准）',
            disabled: true
        },
        {
            value: '国内核心期刊（浙江大学标准）',
            label: '国内核心期刊（浙江大学标准）',
            disabled: true
        },
        {
            value: 'ZJUT TOP 100期刊',
            label: 'ZJUT TOP 100期刊',
            disabled: true
        },
        {
            value: '浙江工业大学A类期刊',
            label: '浙江工业大学A类期刊',
            disabled: true
        },
        {
            value: '浙江工业大学B类期刊',
            label: '浙江工业大学B类期刊',
            disabled: true
        },
        {
            value: '艺术类作品公开发表（仅限艺术类人员填写）',
            label: '艺术类作品公开发表（仅限艺术类人员填写）',
            disabled: true
        },
        {
            value: '国际会议',
            label: '国际会议'
        },
        {
            value: '其他',
            label: '其他'
        }
      ],//期刊类别ISBN
      sljbOptions: [
          {
            label: "单选",
            sljbOpt: [
                {
                value: "SCI一区",
                label: "SCI一区"
                },
                {
                value: "SCI二区",
                label: "SCI二区"
                },
                {
                value: "SCI三区",
                label: "SCI三区"
                },
                {
                value: "SCI四区",
                label: "SCI四区"
                }
            ]
          },
          {
          label: "多选",
          sljbOpt: [
            {
                value: "SCI TOP",
                label: "SCI TOP"
            },
            {
                value: "SSCI收录",
                label: "SSCI收录"
            },
            {
              value: "A&HCI收录",
              label: "A&HCI收录"
            },
            {
              value: "MEDLINE收录",
              label: "MEDLINE收录"
            },
            {
              value: "EI收录",
              label: "EI收录"
            },
            {
              value: "CSCD收录",
              label: "CSCD收录"
            },
            {
              value: "CSSCI收录",
              label: "CSSCI收录"
            }
          ]
        },
      ],//收录级别
      control: {
          multiple: '1'
      },
      sljb: [],//收录级别
      qklbVal: [],//期刊类别
      qklbVal1: [],//期刊类别
      sljbVal: [],//收录级别
      sljbVal2: [],//收录级别
      sljbValue: [],//收录级别
      fjname: '', //附件名称
      fjname1: '', //附件名称
      input: "",
      currentPage: 1,
      pageSize: 5,
      totalItems: 0,
      textarea: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      ids: "",
      shzt: "", //审核状态
      id: "",
      page: [],
      file: [],
      alist:{},
      multipleSelection: [],
      stuxscg: {
        sfdyzz: '1',//区分是否是第一作者，1是,2否
        dsdyzz: '1',//区分是否是导师第一作者，1是,2否
        ly: '1',//区分录用状态的是否，1是,2否
        // kh: 'ISSN',//刊号默认
        qklb: '',
        sljb: '',
        lyzz: '',
        slzz: '',
        cbqkmc: ''
      },
      stuxscg1: {
        id: "",
        fbxx1: [{
            num: 1,
            editFlag: false
          }],
        lyzz: '',
        slzz: '',
        cbqkmc: ''
      },
      rules: {
        // zllx:   [{ required: true, message: "请填写专利类型", trigger: "change" }],
        // kh:    [{ validator: khcheck, trigger: 'blur' }],
        }
    };
  },
//   created(){
//       this.dialogVisible = true
//   },
//   mounted() {
//     this.loadTable();//进入页面，加载申请列表
//   },
  activated() {
    // this.dialogVisible = true
    this.loadTable();
  },
  methods: {
    //失去焦点事件
    handleBlur(){
        this.$http
        .get(this.$server.glourl+"stuxscg/queryKwm",{ params: {
            kwbh: this.stuxscg.kh
          }
        })
            .then(response => {
                if (this.khVal == 'ISSN') {
                    // this.stuxscg.cbqkmc = response.data.kwmc[0].kwm
                    this.$set(this.stuxscg,"cbqkmc", response.data.kwmc[0].kwm)
                    // console.log(this.stuxscg.cbqkmc)
                }

            })
        .catch(function(err) {
            console.log(err)
        })
    },
    handleBlur1(){
        this.$http
        .get(this.$server.glourl+"stuxscg/queryKwm",{ params: {
            kwbh: this.stuxscg1.kh
          }
        })
            .then(response => {
                if (this.khVal1 == 'ISSN') {
                    // this.stuxscg1.cbqkmc = response.data.kwmc[0].kwm
                    this.$set(this.stuxscg1,"cbqkmc", response.data.kwmc[0].kwm)
                }
                // console.log(this.stuxscg1.cbqkmc)
            })
        .catch(function(err) {
            console.log(err)
        })
    },
    //点击列表选中
    clickRow(row) {
      this.$refs.moviesTable.toggleRowSelection(row);
      //console.log(row);
    },
    //刊号变化触发事件
    handleChange() {
        this.qklbVal = []
        this.stuxscg.kh = ''
    },
    handleChange1() {
        this.qklbVal1 = []
        this.stuxscg1.kh = ''
    },
    handleFilter(value) {
        const len = this.sljbValue.length;
        if ( this.sljbOptions[0].sljbOpt.some(item => item.value == this.sljbValue[len - 1]) ) {
            this.sljbValue.splice(0, len - 1);
            // console.log(this.sljbValue)
        } else if ( this.sljbOptions[1].sljbOpt.some(item => item.value == this.sljbValue[len - 1]) ) {
            // console.log(this.sljbValue)
        }
    },
    handleFilter1(value) {
        const len = this.stuxscg1.sljb.length;
        if ( this.sljbOptions[0].sljbOpt.some(item => item.value == this.stuxscg1.sljb[len - 1]) ) {
            this.stuxscg1.sljb.splice(0, len - 1);
            // console.log(this.stuxscg1.sljb)
        } else if ( this.sljbOptions[1].sljbOpt.some(item => item.value == this.stuxscg1.sljb[len - 1]) ) {
            // console.log(this.stuxscg1.sljb)
        }
    },
    //加载列表
    loadTable() {
      this.$http
        .post(this.$server.glourl+"stuxscg/XscgMenu")
        .then(response => {
               this.page = response.data.stuxscg
               this.alist = response.data.xjxxMap
               this.qklb = response.data.qklb
               this.sljb = response.data.sljb
            //    console.log(response.data.xjxxMap)
          });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //添加按钮函数
    addApply() {
      this.stuxscg = {};
      // console.log(this.stuxscg.qklb)
      this.show = false;
      this.show1 = true;
      this.show2 = false;
      this.stuxscg.xsxm = this.alist.xm;
      this.stuxscg.xh = this.alist.xh;
      this.stuxscg.xymc = this.alist.yxsh;
      //this.stuxscg.qklb = this.qklb;
    },
    //关闭添加页面
    close() {
      this.show = true;
      this.show1 = false
      this.show2 = false
      this.loadTable();
    },
    // 关闭审核页面
    close2() {
      this.show = true;
      this.show1 = false
      this.show2 = false
      this.loadTable();
    },
    //改变列表页当前页回调函数
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.loadTable();
    },
    //改变列表页条数大小回调函数
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadTable();
    },
    indexMethod(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
    //下载附件
    download(href) {
        window.location.href=href;
    },
    // handleDownload(){
    //     if(this.stuxscg1.lyzz ==null){
    //         this.$message({
    //           message: "附件为空！",
    //           type: "error"
    //         });
    //     }
    // },
    // 文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
        // console.log(response)
        this.stuxscg.lyzz = response.url;
        this.fjname = response.name;
        this.stuxscg.slzz = response.url;
        this.fileList = fileList
        // console.log(response.url)
        // console.log(fileList)
        // this.stuxscg.fj.push({name:response.name, url:response.url})
    },
    handleSuccess1(response, file, fileList) {
        // console.log(response,file,fileList)
        this.stuxscg1.lyzz = response.url;
        this.fjname1 = response.name;
        this.stuxscg1.slzz = response.url;
        this.fileList1 = fileList
        // console.log(response.url)
        // this.stuxscg1.fj.push({name:response.name, url:response.url})
    },
    //附件处理
        handleRemove(file) {
        console.log(file);
        },
        handlePreview(file) {
        console.log(file);
        },
    //申请表信息动态添加行
        addRow() {
        this.stuxscg.fbxx.push({
            num: this.stuxscg.fbxx.length + 1,
            editFlag: false
        });
        },
        addRow1() {
        this.stuxscg1.fbxx1.push({
            num: this.stuxscg1.fbxx1.length + 1,
            editFlag: false
        });
        },
    //申请信息动态减少行
        delRow() {
        this.stuxscg.fbxx.pop();
        },
        delRow1() {
        this.stuxscg1.fbxx1.pop();
        },
    //列表选择改变事件
    handleSelectionChange(selection) {
      if (selection.length == 0) {
        this.ids = "";
        this.shzt = "";
      } else {
        this.ids = selection[0].id;
        this.shzt = selection[0].shzt;
      }
    },
    //申请信息table鼠标经过事件
        handleMouseEnter: function(row, column, cell, event) {
        let num = row.num - 1;
        this.stuxscg.fbxx[num].editFlag = true;
        },
        handleMouseEnter1: function(row, column, cell, event) {
        let num = row.num - 1;
        this.stuxscg1.fbxx1[num].editFlag = true;
        },
    //申请信息table鼠标经过移出事件
        handleMouseOut: function(row, column, cell, event) {
        let num = row.num - 1;
        this.stuxscg.fbxx[num].editFlag = false;
        },
        handleMouseOut1: function(row, column, cell, event) {
        let num = row.num - 1;
        this.stuxscg1.fbxx1[num].editFlag = false;
        },
    //申请信息提交事件
    submit() {
      this.stuxscg.xsxm = this.alist.xm;
      this.stuxscg.xh = this.alist.xh;
      this.stuxscg.xymc = this.alist.yxsh;
      this.stuxscg.kh = this.khVal + this.stuxscg.kh;
      this.stuxscg.qklb = this.qklbVal.join()
      this.stuxscg.sljb = this.sljbValue.join(';')
      //   console.log(this.stuxscg.cbqkmc)
      if(this.stuxscg.dsdyzz == 2 && this.stuxscg.dyzz != null){
          this.stuxscg.dyzz = this.stuxscg.dyzz+'（非系统所填导师一作）'
      }
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$http
        .post(this.$server.glourl+"stuxscg/save", this.stuxscg)
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "申请信息提交成功，请等待审核！",
              type: "success"
            });
            // this.reload()
            this.show = true;
            this.show1 = false
            this.show2 = false
            this.loadTable();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
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
      this.check = 0
      this.show = false
      this.show1 = false
      this.show2 = true
      this.$http
        .post(this.$server.glourl+"stuxscg/info/" + this.ids)
        .then(response => {
            this.stuxscg1 = response.data.stuXscg[0]
            this.khVal1 = this.stuxscg1.kh.substring(0,4)
            this.stuxscg1.kh = this.stuxscg1.kh.substring(4)
            // console.log(this.stuxscg1.slzz)
            // this.stuxscg1.fbxx1 = response.data.parse
            // console.log(response.data)
            // 附件展示，需要解析成对象
            // this.stuxscg1.fj = JSON.parse(response.data.stuXscg[0].fj)
            // this.fileList = this.stuxscg1.fj
          });
    },
    // 修改申请表单
      applyChange () {
        this.check = 1
        if (this.ids == null || this.ids == '') {
          this.$message({
            message: "请选择一条数据！",
            type: "error"
          });
        }
        else if (this.shzt != 6 ) {
          this.$message({
            message: "只能修改退回的信息！",
            type: "error"
          });
        }
        else {
          this.$http
            .post(this.$server.glourl+"stuxscg/info/" + this.ids)
            .then(response => {
                this.stuxscg1 = response.data.stuXscg[0]
                this.stuxscg1.qklb = this.stuxscg1.qklb.split(',')
                // console.log(this.stuxscg1.qklb)
                this.stuxscg1.sljb = this.stuxscg1.sljb.split(';')
                // console.log(this.stuxscg1.sljb)
                this.qklbVal1 = this.stuxscg1.qklb
                this.khVal1 = this.stuxscg1.kh.substring(0,4)
                this.stuxscg1.kh = this.stuxscg1.kh.substring(4)
            });
          this.show = false
          this.show1 = false
          this.show2 = true
        }
      },
    // 修改申请表单提交
      changeSubmit () {
        // console.log(this.stuxscg1.slzz)
        // console.log(this.stuxscg1.lyzz)
        this.stuxscg1.xsxm = this.alist.xm;
        this.stuxscg1.xh = this.alist.xh;
        this.stuxscg1.xymc = this.alist.yxsh;
        this.stuxscg1.kh = this.khVal1 + this.stuxscg1.kh
        this.stuxscg1.qklb = this.qklbVal1.join()
        this.stuxscg1.sljb = this.stuxscg1.sljb.join(';');
        // console.log(this.stuxscg1.qklb)
        this.stuxscg = this.stuxscg1
        this.stuxscg.fbxx = this.stuxscg1.fbxx1
        if(this.stuxscg1.dsdyzz == 2 && this.stuxscg1.dyzz != null){
          this.stuxscg1.dyzz = this.stuxscg1.dyzz+'（非系统所填导师一作）'
        }
        // console.log(this.stuxscg1.cbqkmc)
        let config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        this.$http
            .post(this.$server.glourl+"stuxscg/modify", this.stuxscg)
            .then(response => {
                if (response.data.code == 0) {
                    this.$message({
                        message: "修改成功！",
                        type: "success"
                    })
                // this.reload()
                this.dialogVisible = false
                this.show = true
                this.show1 = false
                this.show2 = false
                this.loadTable()
            }
            })
            .catch(function(err) {
                console.log(err)
            })
      },
    //点击通过
    adopt() {
      this.$http
        .get(this.$server.glourl+"stuxscg/TutorCheck", {
          params: {
            id: this.stuxscg1.id,
            suggestion: this.textarea,
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
            this.show = true
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
      this.$http
        .get(this.$server.glourl+"stuxscg/TutorCheck", {
          params: {
            id: this.stuxscg1.id,
            suggestion: this.textarea,
            shenhe: "2"
          }
        })
        .then(res => {
       //   console.log(this.stuxscg1.id);
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
    //查看审核信息
    see() {
      if (this.ids == null || this.ids == "") {
        this.$message({
          message: "请选择一条数据！",
          type: "error"
        });
      } else {
        this.$http
          .post(this.$server.glourl+"stuxscg/info/" + this.ids)
          .then(response => {
            this.stuxscg = response.data.stuXscg[0];
            //console.log(this.stuxscg.dsxm == "", this.stuxscg.dsxm == null);
            // console.log(response.data.stuXscg)
            this.dialogFormVisible = true;
            if (this.stuxscg.dsxm == null) {
              this.dialogFormVisible = false;
              this.$message({
                message: "无审核信息！",
                type: "error"
              });
            }
          });
      }
    },
    //提交申请信息校验table列是否为空
    checkTable() {
      var f = this.checkList(this.stuxscg.fbxx, 9);
      return f;
    },
    //校验数组
    checkList(obj, size) {
      var ckeck = true;
      var flag = false;
      for (let index = 0; index < obj.length; index++) {
        const element = obj[index];
        if (Object.keys(element).length < size) {
          ckeck = false;
          break;
        }
        var temp = Object.values(element);
        for (let index = 0; index < temp.length; index++) {
          const t = temp[index];
          if (!this.isEmpty(t)) {
            ckeck = false;
            flag = true;
            break;
          }
        }
        if (flag) {
          break;
        }
      }
      return ckeck;
    },
    //判断字符串是否为空
    isEmpty(obj) {
      if (
        typeof obj == "undefined" ||
        obj == null ||
        obj == "" ||
        obj.length == 0
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/xscg'; //必须加分号，不然会报错
@import '../../style/ele1';
//表格上面部分
.header {
  overflow: hidden;
}
.header-input {
  width: 70%;
}
.left {
  float: left;
}
.right {
  float: right;
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
.close {
  text-align: center;
  width: 20px;
  height: 20px;
  color: #cccccc;
  font-size: 16px;
  position: absolute;
  right: 22px;
  top: 20px;
  cursor: pointer;
  z-index: 1000;
}
.grid-content {
  font-size: 16px;
  color: #333333;
}
.bg-purple-dark {
  padding-left: 7%;
  margin-top: 30px;
  background: rgba(248, 251, 255, 1);
}
.el-btn {
  padding-left: 60px;
  overflow: hidden;
  margin-bottom: 20px;
}
// .el-button {
//   overflow: hidden;
// }
.el-button {
  margin-left: 0px;
}
p {
  display: inline-block;
}
a {
  color: #606266;
  transition: color .3s;
  &:hover {
    color: #237ae4;
  }
}
.el-button + .el-button {
  margin-left: 0px;
}
// 日期控件样式
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
}
</style>
<style>
.el-dialog__body {
  padding: 10px;
}
</style>
