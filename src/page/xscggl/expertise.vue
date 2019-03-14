<template>
    <div style="width:100%">
        <div class="dialog">
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="handleClose">
                <div class="point">只能填写以浙江工业大学为第一单位的有关项目信息！</div>
                <!-- <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span> -->
            </el-dialog>
        </div>
        <div class="container" v-show="show">
            <el-row style="margin:0 auto;">
                <el-col :span="24">
                    <el-row style="float:right">
                        <el-button type="primary" @click="see">查看审核信息</el-button>
                        <!-- v-if="has('expertise:create')" -->
                        <el-button type="success" @click="addApply" v-if="has('expertise:create')">添加</el-button>
                        <!-- <el-button type="success" @click="addApply">添加</el-button> -->
                        <el-button type="danger" @click="applyChange">修改</el-button>
                        <!-- v-if="has('expertise:shenhe')" -->
                        <el-button type="warning" @click="handleEdit" v-if="has('expertise:shenhe')">审核</el-button>
                        <!-- <el-button type="warning" @click="handleEdit">审核</el-button> -->
                        <el-dialog title="审核信息" :visible.sync="dialogFormVisible" width="55%" style="margin-top:-5vh">
                            <div class="divShadow2" v-show="stuZljs.dsxm != null">
                                <div class="topBlue1">导师审核信息</div>
                                <el-form :model="stuZljs" :rules="rules" ref="stuZljs" label-width="100px" class="demo-stuZljs" label-position="left" style="padding-top:40px;">
                                    <el-row :gutter="30">
                                        <el-col :span="11">
                                            <el-form-item label="审核人:">
                                                <el-input v-model="stuZljs.dsxm" readonly="readonly"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="11">
                                            <el-form-item label="审核时间：">
                                                <el-input v-model="stuZljs.dsshsj" readonly="readonly"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="30">
                                        <el-col :span="22">
                                            <el-form-item label="审核意见：">
                                                <el-input type="textarea" v-model="stuZljs.dsshyj" :rows="3" placeholder="" readonly="readonly">
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form>
                            </div>
                            <div class="divShadow2" v-show="stuZljs.xyshr != null">
                                <div class="topBlue1">学院审核信息</div>
                                <el-form :model="stuZljs" :rules="rules" ref="stuZljs" label-width="100px" class="demo-stuZljs" label-position="left" style="padding-top:40px;">
                                    <el-row :gutter="30">
                                        <el-col :span="11">
                                            <el-form-item label="审核人:">
                                                <el-input v-model="stuZljs.xyshr" readonly="readonly"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="11">
                                            <el-form-item label="审核时间：">
                                                <el-input v-model="stuZljs.xyshsj" readonly="readonly"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="30">
                                        <el-col :span="22">
                                            <el-form-item label="审核意见：">
                                                <el-input type="textarea" v-model="stuZljs.xyshyj" :rows="3" placeholder="" readonly="readonly">
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form>
                            </div>
                            <div class="divShadow2" v-show="stuZljs.xxshr != null">
                                <div class="topBlue1">学校审核信息</div>
                                <el-form :model="stuZljs" :rules="rules" ref="stuZljs" label-width="100px" class="demo-stuZljs" label-position="left" style="padding-top:40px;">
                                    <el-row :gutter="30">
                                        <el-col :span="11">
                                            <el-form-item label="审核人:">
                                                <el-input v-model="stuZljs.xxshr" readonly="readonly"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="11">
                                            <el-form-item label="审核时间：">
                                                <el-input v-model="stuZljs.xxshsj" readonly="readonly"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="30">
                                        <el-col :span="22">
                                            <el-form-item label="审核意见：">
                                                <el-input type="textarea" v-model="stuZljs.xxshyj" :rows="3" placeholder="" readonly="readonly">
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
                    </el-row>
                </el-col>
            </el-row>
            <el-table ref="moviesTable" :data="page.slice((currentPage-1)*pageSize,currentPage*pageSize)" @row-click="clickRow" tooltip-effect="dark" style="margin:0 auto;margin-top:5px;text-align:center" @selection-change="handleSelectionChange" border>
                <el-table-column type="selection" width="55" align="center">
                </el-table-column>
                <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="80">
                </el-table-column>
                <el-table-column prop="id" label="id" type="index" align="center" v-if="show4">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column prop="xh" label="学号" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.xh }}</template>
                </el-table-column>
                <el-table-column prop="xsxm" label="姓名" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.xsxm }}</template>
                </el-table-column>
                <el-table-column prop="zlmc" label="专利名称" show-overflow-tooltip align="center">
                    <template slot-scope="scope">{{ scope.row.zlmc }}</template>
                </el-table-column>
                <!-- <el-table-column prop="sqsj" label="申请时间" show-overflow-tooltip align="center">
                    <template slot-scope="scope">{{ scope.row.sqsj }}</template>
                </el-table-column> -->
                <!-- <el-table-column prop="shzt" label="审核状态" show-overflow-tooltip align="center">
                    <template slot-scope="scope">{{ scope.row.shzt === '0' ? '导师审核中' :scope.row.shzt === '1'?'导师审核不通过':scope.row.shzt === '2'?'学院待审' :scope.row.shzt === '3'?'学院审核不通过':scope.row.shzt === '4'?'学校待审':scope.row.shzt === '5'?'不通过' : '通过'}}</template>
                </el-table-column> -->
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
            <div class="divShadow">
                <div class="topBlue">作者信息</div>
                <!-- <div class="close" @click="close"> X </div> -->
                <el-row style="padding-top:50px;padding-left:56px">
                    <el-col :span='20'>
                        <el-table border cell-style="padding:0px" row-style="height:50px;" :data="stuZljs.zzxx" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                            <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="80">
                            </el-table-column>
                            <el-table-column label="姓名" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xsxm" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.xsxm}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="xh" label="学号" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xh" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.xh}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="xymc" label="学院" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xymc" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.xymc}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="stime" label="角色" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.stime" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.stime}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="zzly" label="作者来源" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zzly" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.zzly}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="zzpx" label="作者排序" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zzpx" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.zzpx}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span='1' :offset='1' style="padding-top:60px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:60px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow"></el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="divShadow" v-show="show4">
                <div class="topBlue">个人信息</div>
                <el-form :model="stuZljs" :rules="rules" ref="stuZljs" label-width="177px" class="demo-stuZljs" label-position="left" style="padding-top:50px;">
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="姓名：">
                                <el-input v-model="stuZljs.xsxm" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="学号：" prop="xh">
                                <el-input v-model="stuZljs.xh"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="学院名称：" prop="xymc">
                                <el-input v-model="stuZljs.xymc" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="divShadow">
                <div class="topBlue">关键信息</div>
                <el-form :model="stuZljs" :rules="rules" ref="stuZljs" label-width="177px" class="demo-stuZljs" label-position="left" style="padding-top:50px;">
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="专利类型：" prop="zllx">
                                <el-select v-model="stuZljs.zllx" placeholder="请选择" style="width:100%">
                                    <el-option label="第一作者" value="1"></el-option>
                                    <el-option label="第二作者" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="专利号：" prop="zlh">
                                <el-input v-model="stuZljs.zlh"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="专利名称：" prop="zlmc">
                                <el-input v-model="stuZljs.zlmc"></el-input>
                            </el-form-item>
                        </el-col>

                        <!-- <el-col :span="11">
                            <el-form-item label="申请时间：" prop="sqsj">
                                <el-input v-model="stuZljs.sqsj"></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="11">
                            <el-form-item label="申请时间：" prop="sqsj">
                                <el-date-picker
                                    v-model="stuZljs.sqsj"
                                    type="date"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <!-- <el-col :span="11">
                            <el-form-item label="公布时间：" prop="gbsj">
                                <el-input v-model="stuZljs.gbsj"></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="11">
                            <el-form-item label="公布时间：" prop="gbsj">
                                <el-date-picker
                                    v-model="stuZljs.gbsj"
                                    type="date"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="11">
                            <el-form-item label="授权时间：" prop="sqtime">
                                <el-input v-model="stuZljs.sqtime"></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="11">
                            <el-form-item label="授权时间：" prop="sqtime">
                                <el-date-picker
                                    v-model="stuZljs.sqtime"
                                    type="date"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <!-- <el-col :span="11">
                            <el-form-item label="所有单位性质：" prop="sydwxz">
                                <el-select v-model="stuZljs.sydwxz" placeholder="请选择" style="width:100%">
                                    <el-option label="浙江工业大学" value="1"></el-option>
                                    <el-option label="第二作者" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col> -->

                        <el-col :span="11">
                            <el-form-item label="专利所有单位：" prop="zlsydw">
                                <el-input v-model="stuZljs.zlsydw"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="divShadow">
                <div class="topBlue">专利信息</div>
                <el-form :model="stuZljs" :rules="rules" ref="stuZljs" label-width="177px" class="demo-stuZljs" label-position="left" style="padding-top:50px;">
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="中文关键字：" prop="zwgjz">
                                <el-input v-model="stuZljs.zwgjz"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="英文关键字：" prop="ywgjz">
                                <el-input v-model="stuZljs.ywgjz"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="中文摘要：" prop="zwzy">
                                <el-input v-model="stuZljs.zwzy"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="英文摘要：" prop="ywzy">
                                <el-input v-model="stuZljs.ywzy"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="网络收录地址：" prop="wlsldz">
                                <el-input v-model="stuZljs.wlsldz"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-row style="padding-top:50px;padding-left:56px;padding-right:50px">
                    <div>
                        <el-from>
                            <el-upload 
                                class="upload-demo" 
                                :action="baseUrl2" 
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
                                    <span class="append">添加附件</span>
                                </el-button>
                                <div slot="tip" class="el-upload__tip">多个文件，请打压缩包上传！</div>
                            </el-upload>
                        </el-from>
                    </div>
                </el-row>
            </div>
            <div class="bottomBox" style="text-align:center;">
                <el-button type="primary" class="reset" @click="close">取消</el-button>
                <el-button type="primary" class="reset" @click="submit">提交</el-button>
            </div>
        </div>
        <!-- 审核 与修改-->
        <div v-show="show2">
            <div class="divShadow" v-if="this.check == 0">
                <div class="topBlue">作者信息</div>
                <!-- <div class="close" @click="close2"> X </div> -->
                <el-row style="padding-top:50px;padding-left:56px">
                    <el-col :span='22'>
                        <el-table border cell-style="padding:0px" row-style="height:50px;" :data="stuZljs1.zzxx1">
                            <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="80">
                            </el-table-column>
                            <el-table-column label="姓名" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xsxm" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.xsxm}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="xh" label="学号" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xh" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.xh}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="xymc" label="学院" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xymc" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.xymc}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="stime" label="角色" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.stime" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.stime}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="zzly" label="作者来源" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zzly" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.zzly}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="zzpx" label="作者排序" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zzpx" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.zzpx}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </div>
            <div class="divShadow" v-if="this.check == 1">
                <div class="topBlue">作者信息</div>
                <!-- <div class="close" @click="close"> X </div> -->
                <el-row style="padding-top:50px;padding-left:56px">
                    <el-col :span='20'>
                        <el-table border cell-style="padding:0px" row-style="height:50px;" :data="stuZljs1.zzxx1" @cell-mouse-enter="handleMouseEnter1" @cell-mouse-leave="handleMouseOut1">
                            <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="80">
                            </el-table-column>
                            <el-table-column label="姓名" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xsxm" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.xsxm}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="xh" label="学号" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xh" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.xh}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="xymc" label="学院" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xymc" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.xymc}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="stime" label="角色" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.stime" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.stime}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="zzly" label="作者来源" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zzly" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.zzly}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="zzpx" label="作者排序" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zzpx" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.zzpx}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span='1' :offset='1' style="padding-top:60px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow1"></el-button>
                    </el-col>
                    <el-col :span='1' style="padding-top:60px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow1"></el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="divShadow">
                <div class="topBlue">关键信息</div>
                <el-form :model="stuZljs1" :rules="rules" ref="stuZljs1" label-width="177px" class="demo-stuZljs1" label-position="left" style="padding-top:50px;">
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="专利类型：">
                                <el-select v-model="stuZljs1.zllx" placeholder="请选择" style="width:100%">
                                    <el-option label="第一作者" value="1"></el-option>
                                    <el-option label="第二作者" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="专利号：">
                                <el-input v-model="stuZljs1.zlh"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="专利名称：">
                                <el-input v-model="stuZljs1.zlmc"></el-input>
                            </el-form-item>
                        </el-col>

                        <!-- <el-col :span="11">
                            <el-form-item label="申请时间：">
                                <el-input v-model="stuZljs1.sqsj" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="11">
                            <el-form-item label="申请时间：">
                                <el-date-picker
                                    v-model="stuZljs1.sqsj"
                                    type="date"
                                    placeholder="选择日期" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <!-- <el-col :span="11">
                            <el-form-item label="公布时间：">
                                <el-input v-model="stuZljs1.gbsj" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="11">
                            <el-form-item label="公布时间：">
                                <el-date-picker
                                    v-model="stuZljs1.gbsj"
                                    type="date"
                                    placeholder="选择日期" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <!-- <el-form-item label="授权时间：">
                                <el-input v-model="stuZljs1.sqtime" readonly="readonly"></el-input>
                            </el-form-item> -->
                            <el-form-item label="授权时间：">
                                <el-date-picker
                                    v-model="stuZljs1.sqtime"
                                    type="date"
                                    placeholder="选择日期" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="">
                                <el-input v-model="stuZljs1.id" v-show="false"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <!-- <el-col :span="11">
                            <el-form-item label="所有单位性质：">
                                <el-select v-model="stuZljs1.sydwxz" placeholder="请选择" style="width:100%">
                                    <el-option label="浙江工业大学" value="1"></el-option>
                                    <el-option label="第二作者" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col> -->

                        <el-col :span="11">
                            <el-form-item label="专利所有单位：">
                                <el-input v-model="stuZljs1.zlsydw"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="divShadow">
                <div class="topBlue">专利信息</div>
                <el-form :model="stuZljs1" :rules="rules" ref="stuZljs1" label-width="177px" class="demo-stuZljs1" label-position="left" style="padding-top:50px;">
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="中文关键字：">
                                <el-input v-model="stuZljs1.zwgjz"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="英文关键字：">
                                <el-input v-model="stuZljs1.ywgjz"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="中文摘要：">
                                <el-input v-model="stuZljs1.zwzy"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="英文摘要：">
                                <el-input v-model="stuZljs1.ywzy"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="网络收录地址：">
                                <el-input v-model="stuZljs1.wlsldz"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-row style="padding-top:50px;padding-left:56px;padding-right:50px" v-if="this.check == 0">
                    <div>
                        <el-from>
                            <!-- <el-upload 
                                class="upload-demo" 
                                action="platform-framework/stuzljs/uploadFile" 
                                name="file" 
                                :on-preview="handlePreview" 
                                :on-remove="handleRemove" 
                                :before-remove="beforeRemove"
                                multiple :limit="1" 
                                :on-exceed="handleExceed" 
                                :file-list="fileList"> -->
                                <el-button slot="trigger" size="small" class="add">
                                    <div class="img">
                                        <img src="../../assets/image/attachment.png" alt="" style="width:100%;height:100%;">
                                    </div>
                                    <span class="append" @click="download">下载附件</span>
                                </el-button>
                            <!-- </el-upload> -->
                        </el-from>
                    </div>
                </el-row>
                <el-row style="padding-top:50px;padding-left:56px;padding-right:50px" v-if="this.check == 1">
                    <div>
                        <el-from>
                            <el-upload 
                                class="upload-demo" 
                                :action="baseUrl2" 
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
                            </el-upload>
                        </el-from>
                    </div>
                </el-row>
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
        <!-- 修改 changeSubmit-->
    </div>
</template>
</<script>
export default {
  inject: ['reload'],
  data() {
    return {
      show: true, //展示列表开关
      show1: false, //添加页面
      show2: false, //审核页面
      show3: false,
      show4: false, //隐藏id与添加页面的作者信息
      check: 0, //区分修改还是审核，0审核，1修改
      fileList: [], //上传文件列表展示
      alist:{},
    //   dialogVisible: true,
      page: [],
      currentPage: 1,
      pageSize: 5,
      ids: "",
      id: "",
      totalItems: 0,
      textarea: "",
      dialogFormVisible: false,
       stuZljs: {
        zzxx: [
          {
            num: 1,
            editFlag: false
          }
        ],
        fj: ''
      },
      stuZljs1: {
        id: "",
        fj: '',
        zzxx1: [
          {
            num: 1,
            editFlag: false
          }
        ]
      },
    //   rules: {
    //     zllx:   [{ required: true, message: "请填写专利类型", trigger: "change" }],
    //     zlh:    [{ required: true, message: "请填写专利号", trigger: "blur" }],
    //     zlmc:   [{ required: true, message: "请填写专利名称", trigger: "blur" }],
    //     sqsj:   [{ required: true, message: "请填写申请时间", trigger: "blur" }],
    //     gbsj:   [{ required: true, message: "请填写公布时间", trigger: "blur" }],
    //     sqtime: [{ required: true, message: "请填写授权时间", trigger: "blur" }],
    //     zlsydw: [{ required: true, message: "请填写专利所有单位", trigger: "blur" }],
    //     sydwxz: [{ required: true, message: "请填写所有单位性质", trigger: "change" }],
    //     zwgjz:  [{ required: true, message: "请填写中文关键字", trigger: "blur" }],
    //     ywgjz:  [{ required: true, message: "请填写英文关键字", trigger: "blur" }],
    //     zwzy:   [{ required: true, message: "请填写中文摘要", trigger: "blur" }],
    //     ywzy:   [{ required: true, message: "请填写英文摘要", trigger: "blur" }],
    //     wlsldz: [{ required: true, message: "请填写网络收录地址", trigger: "blur" }],
    // }
    }
  },
//   created(){
//       this.dialogVisible = true
//   },
  mounted() {
    //进入页面，加载申请列表
    this.loadTable();
  },
  methods: {
    //加载列表
    loadTable() {
       this.$http
        .post(this.$server.glourl+"stuzljs/ZljsMenu")
        .then(response => {
            this.page = response.data.zljs
            this.alist = response.data.xjxxMap
            // console.log(response.data)
        });
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
        this.ids = selection[0].id;
        // console.log(this.ids);
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
    //下载附件
    download() {
        location.href=this.$server.glourl+"stuzljs/download";
    },
    // 文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
        // console.log(response)
        this.stuZljs.fj = response.url;
        // this.stuxscg.fj.push({name:response.name, url:response.url})
    },
    handleSuccess1(response, file, fileList) {
        // console.log(response,file,fileList)
        this.stuZljs1.fj = response.url;
        // this.stuxscg1.fj.push({name:response.name, url:response.url})
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
          .post(this.$server.glourl+"stuzljs/info/" + this.ids)
          .then(response => {
            this.stuZljs = response.data.stuZljs;
            //console.log(this.stuZljs.dsxm == "",this.stuZljs.dsxm == null);
            // console.log(response.data.stuZljs)
            this.dialogFormVisible = true;
            if (this.stuZljs.dsxm == null) {
                this.dialogFormVisible = false;
              this.$message({
                message: "无审核信息！",
                type: "error"
              });
            }
          });
      }
    },
    //添加按钮函数
    addApply() {
      this.show = false;
      this.show1 = true;
      this.show2 = false;
      this.show3 = false;
      this.stuZljs.xsxm = this.alist.xm;
      this.stuZljs.xh = this.alist.xh;
      this.stuZljs.xymc = this.alist.yxsh;
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
      this.show2 = true;
      this.show = false;
      this.show1 = false;
      this.$http
        .post(this.$server.glourl+"stuzljs/info/" + this.ids)
        .then(response => {
                this.stuZljs1 = response.data.stuZljs
                this.stuZljs1.zzxx1 = response.data.parse
                // console.log(response.data.stuZljs)
          });
    },
    //点击通过
    adopt() {
      //console.log(this.ids);
      this.$http
        .get(this.$server.glourl+"stuzljs/TutorCheck", {
          params: {
            id: this.stuZljs1.id,
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
            this.show2 = false;
            this.show1 = false;
            this.show = true;
            this.show3 = false;
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
      this.$http
        .get(this.$server.glourl+"stuzljs/TutorCheck", {
          params: {
            id: this.stuZljs1.id,
            suggestion: this.textarea,
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
            this.show2 = false;
            this.show1 = false;
            this.show = true;
            this.show3 = false;
            this.loadTable();
            this.$message({
              message: "审核成功！",
              type: "success"
            });
          }
        });
    },
     //申请信息提交事件
    submit: function() {
      this.stuZljs.xsxm = this.alist.xm;
      this.stuZljs.xh = this.alist.xh;
      this.stuZljs.xymc = this.alist.yxsh;
    //   console.log(typeof(this.stuZljs.sqsj));
      //   this.submitApply();
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$http
        .post(this.$server.glourl+"stuzljs/save", this.stuZljs)
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "申请信息提交成功，请等待审核！",
              type: "success"
            });
            // this.reload()
            this.show = true;
            this.show1 = false;
            this.show2 = false;
            this.show3 = false;
            this.loadTable();
          }
          //   this.stuZljs = { brand_right: 0 };
        })
        .catch(function(err) {
          console.log(err);
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
            .post(this.$server.glourl+"stuzljs/info/" + this.ids)
            .then(response => {
                    this.stuZljs1 = response.data.stuZljs
                    this.stuZljs1.zzxx1 = response.data.parse
            });
          this.show = false
          this.show1 = false
          this.show2 = true
        }
      },
    // 修改申请表单提交
      changeSubmit () {
            this.stuZljs1.xsxm = this.alist.xm;
            this.stuZljs1.xh = this.alist.xh;
            this.stuZljs1.xymc = this.alist.yxsh;
            this.stuzljs = this.stuZljs1
            this.stuzljs.zzxx = this.stuZljs1.zzxx1
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        this.$http
            .post(this.$server.glourl+"stuzljs/modify", this.stuzljs)
            .then(response => {
                if (response.data.code == 0) {
                    this.$message({
                        message: "修改成功！",
                        type: "success"
                    })
                // this.reload()
                this.show = true
                this.show1 = false
                this.show2 = false
                this.show3 = false
                this.loadTable()
            }
            })
            .catch(function(err) {
                console.log(err)
            })
      },
    //申请表信息动态添加行
    addRow() {
      this.stuZljs.zzxx.push({
        num: this.stuZljs.zzxx.length + 1,
        editFlag: false
      });
    },
    addRow1() {
      this.stuZljs1.zzxx1.push({
        num: this.stuZljs1.zzxx1.length + 1,
        editFlag: false
      });
    },
    //申请信息动态减少行
    delRow() {
      this.stuZljs.zzxx.pop();
    },
    delRow1() {
      this.stuZljs1.zzxx1.pop();
    },
    handleSave: function(row) {
      //保存数据，向后台取数据
    },
    //申请信息table鼠标经过事件
    handleMouseEnter: function(row, column, cell, event) {
      let num = row.num - 1;
      this.stuZljs.zzxx[num].editFlag = true;
    },
    handleMouseEnter1: function(row, column, cell, event) {
      let num = row.num - 1;
      this.stuZljs1.zzxx1[num].editFlag = true;
    },
    //申请信息table鼠标经过移出事件
    handleMouseOut: function(row, column, cell, event) {
      let num = row.num - 1;
      this.stuZljs.zzxx[num].editFlag = false;
    },
    handleMouseOut1: function(row, column, cell, event) {
      let num = row.num - 1;
      this.stuZljs1.zzxx1[num].editFlag = false;
    },
    //提交申请信息校验table列是否为空
    checkTable() {
      var f = this.checkList(this.stuZljs.zzxx, 9);
      return f;
    },
    //关闭添加页面
    close(){
        this.show = true;
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.loadTable();
    },
    //关闭审核页面
    close2(){
        this.show = true;
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.loadTable();
    },
    // 关闭修改页面
    close3() {
      this.show = true;
      this.show1 = false
      this.show2 = false
      this.show3 = false
      this.loadTable();
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/xscg'; //必须加分号，不然会报错
.el-form-item {
  margin-left: 56px;
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
.el-btn {
  margin-top: 30px;
  /* margin-left: 56px; */
  margin-bottom: 20px;
}
.el-button + .el-button {
  margin-left: 0px;
}
// .el-button--small,
// .el-button--small.is-round {
//   padding: 5px 15px 5px 15px;
// }
//加减号
.plus {
  background:#666;
  color:#fff;
}
.el-button {
  margin-left: 0px;
}
// 日期控件样式
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
}
</style>