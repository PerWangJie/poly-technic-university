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
                        <!--v-if="has('publication:create')"-->
                        <el-button type="success" @click="addApply" v-if="has('publication:create')">添加</el-button>
                        <!-- <el-button type="success" @click="addApply">添加</el-button> -->
                        <el-button type="danger" @click="applyChange">修改</el-button>
                        <!--v-if="has('publication:shenhe')"-->
                        <el-button type="warning" @click="handleEdit" v-if="has('publication:shenhe')">审核</el-button>
                        <!-- <el-button type="warning" @click="handleEdit">审核</el-button> -->
                        <el-dialog title="审核信息" :visible.sync="dialogFormVisible" width="55%" style="margin-top:-5vh">
                            <div class="divShadow2" v-show="stuFbzz.dsxm != null">
                                <div class="topBlue1">导师审核信息</div>
                                <el-form :model="stuFbzz" :rules="rules" ref="stuFbzz" label-width="100px" class="demo-stuFbzz" label-position="left" style="padding-top:40px;">
                                    <el-row :gutter="20">
                                        <el-col :span="11">
                                            <el-form-item label="审核人:">
                                                <el-input v-model="stuFbzz.dsxm" readonly="readonly"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="11">
                                            <el-form-item label="审核时间：">
                                                <el-input v-model="stuFbzz.dsshsj" readonly="readonly"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="20">
                                        <el-col :span="22">
                                            <el-form-item label="审核意见：">
                                                <el-input type="textarea" v-model="stuFbzz.dsshyj" :rows="3" placeholder="" readonly="readonly">
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form>
                            </div>
                            <div class="divShadow2" v-show="stuFbzz.xyshr != null">
                                <div class="topBlue1">学院审核信息</div>
                                <el-form :model="stuFbzz" :rules="rules" ref="stuFbzz" label-width="100px" class="demo-stuFbzz" label-position="left" style="padding-top:40px;">
                                    <el-row :gutter="20">
                                        <el-col :span="11">
                                            <el-form-item label="审核人:">
                                                <el-input v-model="stuFbzz.xyshr" readonly="readonly"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="11">
                                            <el-form-item label="审核时间：">
                                                <el-input v-model="stuFbzz.xyshsj" readonly="readonly"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="20">
                                        <el-col :span="22">
                                            <el-form-item label="审核意见：">
                                                <el-input type="textarea" v-model="stuFbzz.xyshyj" :rows="3" placeholder="" readonly="readonly">
                                                </el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form>
                            </div>
                            <div class="divShadow2" v-show="stuFbzz.xxshr != null">
                                <div class="topBlue1">学校审核信息</div>
                                <el-form :model="stuFbzz" :rules="rules" ref="stuFbzz" label-width="100px" class="demo-stuFbzz" label-position="left" style="padding-top:40px;">
                                    <el-row :gutter="20">
                                        <el-col :span="11">
                                            <el-form-item label="审核人:">
                                                <el-input v-model="stuFbzz.xxshr" readonly="readonly"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="11">
                                            <el-form-item label="审核时间：">
                                                <el-input v-model="stuFbzz.xxshsj" readonly="readonly"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="20">
                                        <el-col :span="22">
                                            <el-form-item label="审核意见：">
                                                <el-input type="textarea" v-model="stuFbzz.xxshyj" :rows="3" placeholder="" readonly="readonly">
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
                <el-table-column prop="xsxm" label="学生姓名" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.xsxm }}</template>
                </el-table-column>
                <el-table-column prop="deptName" label="著作名称" show-overflow-tooltip align="center">
                    <template slot-scope="scope">{{ scope.row.zzmc }}</template>
                </el-table-column>
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
                        <el-table border cell-style="padding:0px" row-style="height:50px;" :data="stuFbzz.zzxx" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseOut">
                            <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="80">
                            </el-table-column>
                            <el-table-column prop="stime" label="角色" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.stime" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.stime}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="xh" label="学号" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xh" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.xh}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="xsxm" label="姓名" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xsxm" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.xsxm}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="xymc" label="学院" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xymc" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.xymc}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="zzpx" label="作者排序" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zzpx" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.zzpx}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="zzly" label="作者来源" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zzly" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.zzly}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="zzgxsm" label="作者贡献说明" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zzgxsm" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.zzgxsm}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span='1' :offset='1' style="padding-top:60px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow" />
                    </el-col>
                    <el-col :span='1' style="padding-top:60px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow"></el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="divShadow" v-show="show4">
                <div class="topBlue">个人信息</div>
                <el-form :model="stuFbzz" :rules="rules" ref="stuFbzz" label-width="177px" class="demo-stuFbzz" label-position="left" style="padding-top:50px;">
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="姓名：" prop="xsxm">
                                <el-input v-model="stuFbzz.xsxm" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="学号" prop="xh">
                                <el-input v-model="stuFbzz.xh"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="学院名称" prop="xymc">
                                <el-input v-model="stuFbzz.xymc" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="divShadow">
                <div class="topBlue">关键信息</div>
                <el-form :model="stuFbzz" :rules="rules" ref="stuFbzz" label-width="177px" class="demo-stuFbzz" label-position="left" style="padding-top:50px;">
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="著作类型：" prop="zzlx">
                                <el-select v-model="stuFbzz.zzlx" placeholder="请选择" style="width:100%">
                                    <el-option label="第一作者" value="1"></el-option>
                                    <el-option label="第二作者" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="著作名称：" prop="zlmc">
                                <el-input v-model="stuFbzz.zzmc"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

            <div class="divShadow">
                <div class="topBlue">出版信息</div>
                <el-form :model="stuFbzz" :rules="rules" ref="stuFbzz" label-width="177px" class="demo-stuFbzz" label-position="left" style="padding-top:50px;">
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="出版社：" prop="cbs">
                                <el-input v-model="stuFbzz.cbs"></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="11">
                            <el-form-item label="录用时间：" prop="lysj">
                                <el-input v-model="stuFbzz.lysj"></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="11">
                            <el-form-item label="录用时间：" prop="lysj">
                                <el-date-picker
                                    v-model="stuFbzz.lysj"
                                    type="date"
                                    placeholder="选择日期" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <!-- <el-col :span="11">
                            <el-form-item label="出版时间：" prop="cbsj">
                                <el-input v-model="stuFbzz.cbsj"></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="11">
                            <el-form-item label="出版时间：" prop="cbsj">
                                <el-date-picker
                                    v-model="stuFbzz.cbsj"
                                    type="date"
                                    placeholder="选择日期" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="11">
                            <el-form-item label="印刷次数：" prop="yscs">
                                <el-input v-model="stuFbzz.yscs"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="ISBN：" prop="isbn">
                                <el-input v-model="stuFbzz.isbn"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-row style="padding-top:50px;padding-left:56px;padding-right:50px">
                    <div>
                        <el-from>
                            <el-upload 
                                class="upload-demo" 
                                :action="baseUrl4"
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
                        <el-table border cell-style="padding:0px" row-style="height:50px;" :data="stuFbzz1.zzxx1">
                            <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="80">
                            </el-table-column>
                            <el-table-column prop="stime" label="角色" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.stime" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.stime}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="xh" label="学号" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xh" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.xh}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="xsxm" label="姓名" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xsxm" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.xsxm}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="xymc" label="学院" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xymc" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.xymc}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="zzpx" label="作者排序" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zzpx" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.zzpx}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="zzly" label="作者来源" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zzly" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.zzly}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="zzpx" label="作者贡献说明" align="center">
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
                        <el-table border cell-style="padding:0px" row-style="height:50px;" :data="stuFbzz1.zzxx1" @cell-mouse-enter="handleMouseEnter1" @cell-mouse-leave="handleMouseOut1">
                            <el-table-column label="序号" type="index" :index="indexMethod" align="center" width="80">
                            </el-table-column>
                            <el-table-column prop="stime" label="角色" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.stime" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.stime}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="xh" label="学号" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xh" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.xh}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="xsxm" label="姓名" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xsxm" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.xsxm}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="xymc" label="学院" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.xymc" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.xymc}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="zzpx" label="作者排序" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zzpx" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.zzpx}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="zzly" label="作者来源" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zzly" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.zzly}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="zzgxsm" label="作者贡献说明" align="center">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-show="scope.row.editFlag" v-model="scope.row.zzgxsm" placeholder="请输入内容" />
                                    <span v-show="!scope.row.editFlag">{{scope.row.zzgxsm}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span='1' :offset='1' style="padding-top:60px;">
                        <el-button icon="el-icon-plus" size='mini' circle @click="addRow1" />
                    </el-col>
                    <el-col :span='1' style="padding-top:60px;">
                        <el-button icon="el-icon-minus" size='mini' circle @click="delRow1"></el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="divShadow" v-if="this.check == 0">
                <div class="topBlue">个人信息</div>
                <el-form :model="stuFbzz1" :rules="rules" ref="stuFbzz1" label-width="177px" class="demo-stuFbzz1" label-position="left" style="padding-top:50px;">
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="姓名：">
                                <el-input v-model="stuFbzz1.xsxm" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="学号">
                                <el-input v-model="stuFbzz1.xh" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="学院名称">
                                <el-input v-model="stuFbzz1.xymc" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="divShadow">
                <div class="topBlue">关键信息</div>
                <el-form :model="stuFbzz1" :rules="rules" ref="stuFbzz1" label-width="177px" class="demo-stuFbzz1" label-position="left" style="padding-top:50px;">
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="著作类型：">
                                <el-select v-model="stuFbzz1.zzlx" placeholder="请选择" style="width:100%">
                                    <el-option label="第一作者" value="1"></el-option>
                                    <el-option label="第二作者" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="著作名称：">
                                <el-input v-model="stuFbzz1.zzmc"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="divShadow">
                <div class="topBlue">出版信息</div>
                <el-form :model="stuFbzz1" :rules="rules" ref="stuFbzz1" label-width="177px" class="demo-stuFbzz1" label-position="left" style="padding-top:50px;">
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="出版社：">
                                <el-input v-model="stuFbzz1.cbs"></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="11">
                            <el-form-item label="录用时间：">
                                <el-input v-model="stuFbzz1.lysj" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="11">
                            <el-form-item label="录用时间：">
                                <el-date-picker
                                    v-model="stuFbzz1.lysj"
                                    type="date"
                                    placeholder="选择日期" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <!-- <el-col :span="11">
                            <el-form-item label="出版时间：">
                                <el-input v-model="stuFbzz1.cbsj" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="11">
                            <el-form-item label="出版时间：">
                                <el-date-picker
                                    v-model="stuFbzz1.cbsj"
                                    type="date"
                                    placeholder="选择日期" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="印刷次数：">
                                <el-input v-model="stuFbzz1.yscs"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="11">
                            <el-form-item label="ISBN：">
                                <el-input v-model="stuFbzz1.isbn"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-row style="padding-top:50px;padding-left:56px;padding-right:50px" v-if="this.check == 0">
                    <div>
                        <el-from>
                            <!-- <el-upload 
                                class="upload-demo" 
                                action="platform-framework/stufbzz/uploadFile" 
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
                                :action="baseUrl4" 
                                name="file" 
                                :on-preview="handlePreview" 
                                :on-remove="handleRemove" 
                                :before-remove="beforeRemove"
                                :on-success1="handleSuccess"
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
                <el-row style="margin:56px;padding-top:50px">
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
      show1: false,
      show2: false,
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
       stuFbzz: {
        fj: '',
        zzxx: [
          {
            num: 1,
            editFlag: false
          }
        ]
      },
      stuFbzz1: {
        id: "",
        fj: '',
        zzxx1: [
          {
            num: 1,
            editFlag: false
          }
        ]
      },
      rules: {
        zllx:   [{ required: true, message: "请选择专利类型", trigger: "change" }],
        zlh:    [{ required: true, message: "请填写专利号", trigger: "blur" }],
        // zlmc:   [{ required: true, message: "请填写专利名称", trigger: "blur" }],
        sqsj:   [{ required: true, message: "请填写申请时间", trigger: "blur" }],
        gbsj:   [{ required: true, message: "请填写公布时间", trigger: "blur" }],
        sqtime: [{ required: true, message: "请填写授权时间", trigger: "blur" }],
        zwgjz:  [{ required: true, message: "请填写中文关键字", trigger: "blur" }],
        ywgjz:  [{ required: true, message: "请填写英文关键字", trigger: "blur" }],
        zwzy:   [{ required: true, message: "请填写中文摘要", trigger: "blur" }],
        ywzy:   [{ required: true, message: "请填写英文摘要", trigger: "blur" }],
        wlsldz: [{ required: true, message: "请填写网络收录地址", trigger: "blur" }],
    }
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
        .post(this.$server.glourl+"stufbzz/FbzzMenu")
        .then(response => {
            this.page = response.data.stufbzz
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
        // console.log(selection);
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
        location.href=this.$server.glourl+"stufbzz/download";
    },
    // 文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
        // console.log(response)
        this.stuFbzz.fj = response.url;
        // this.stuxscg.fj.push({name:response.name, url:response.url})
    },
    handleSuccess1(response, file, fileList) {
        // console.log(response,file,fileList)
        this.stuFbzz1.fj = response.url;
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
          .post(this.$server.glourl+"stufbzz/info/" + this.ids)
          .then(response => {
            this.stuFbzz = response.data.stuFbzz;
           // console.log(this.stuFbzz.dsxm == "",this.stuFbzz.dsxm == null);
            // console.log(response.data.stuFbzz)
            this.dialogFormVisible = true;
            if (this.stuFbzz.dsxm == null) {
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
     //  console.log(this.page);
      this.stuFbzz.xsxm = this.alist.xm;
      this.stuFbzz.xh = this.alist.xh;
      this.stuFbzz.xymc = this.alist.yxsh;
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
      this.show1 = false;
      this.show2 = true;
      this.show = false;
      this.$http
        .post(this.$server.glourl+"stufbzz/info/" + this.ids)
        .then(response => {
            this.stuFbzz1 = response.data.stuFbzz
            this.stuFbzz1.zzxx1 = response.data.parse
            // console.log(response.data)
          });
    },
    //点击通过
    adopt() {
      //console.log(this.ids);
      this.$http
        .get(this.$server.glourl+"stufbzz/TutorCheck", {
          params: {
            id: this.stuFbzz1.id,
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
        .get(this.$server.glourl+"stufbzz/TutorCheck", {
          params: {
            id: this.stuFbzz1.id,
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
      this.stuFbzz.xsxm = this.alist.xm;
      this.stuFbzz.xh = this.alist.xh;
      this.stuFbzz.xymc = this.alist.yxsh;
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$http
        .post(this.$server.glourl+"stufbzz/save", this.stuFbzz)
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
            this.loadTable();
          }
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
            .post(this.$server.glourl+"stufbzz/info/" + this.ids)
            .then(response => {
                this.stuFbzz1 = response.data.stuFbzz
                this.stuFbzz1.zzxx1 = response.data.parse
            });
          this.show = false
          this.show1 = false
          this.show2 = true
        }
      },
    // 修改申请表单提交
      changeSubmit () {
            this.stuFbzz1.xsxm = this.alist.xm;
            this.stuFbzz1.xh = this.alist.xh;
            this.stuFbzz1.xymc = this.alist.yxsh;
            this.stufbzz = this.stuFbzz1
            this.stufbzz.zzxx = this.stuFbzz1.zzxx1
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        this.$http
            .post(this.$server.glourl+"stufbzz/modify", this.stufbzz)
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
      this.stuFbzz.zzxx.push({
        num: this.stuFbzz.zzxx.length + 1,
        editFlag: false
      });
    },
    addRow1() {
      this.stuFbzz1.zzxx1.push({
        num: this.stuFbzz1.zzxx1.length + 1,
        editFlag: false
      });
    },
    //申请信息动态减少行
    delRow() {
      this.stuFbzz.zzxx.pop();
    },
    delRow1() {
      this.stuFbzz1.zzxx1.pop();
    },
    handleSave: function(row) {
      //保存数据，向后台取数据
    },
    //申请信息table鼠标经过事件
    handleMouseEnter: function(row, column, cell, event) {
    //   const tableIndix = row.tableNum;
      let num = row.num - 1;
      this.stuFbzz.zzxx[num].editFlag = true;
    },
    handleMouseEnter1: function(row, column, cell, event) {
    //   const tableIndix = row.tableNum;
      let num = row.num - 1;
      this.stuFbzz1.zzxx1[num].editFlag = true;
    },
    //申请信息table鼠标经过移出事件
    handleMouseOut: function(row, column, cell, event) {
    //   const tableIndix = row.tableNum;
      let num = row.num - 1;
      this.stuFbzz.zzxx[num].editFlag = false;
    },
    handleMouseOut1: function(row, column, cell, event) {
    //   const tableIndix = row.tableNum;
      let num = row.num - 1;
      this.stuFbzz1.zzxx1[num].editFlag = false;
    },
    //提交申请信息校验table列是否为空
    checkTable() {
      var f = this.checkList(this.stuFbzz.zzxx, 9);
      return f;
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/xscg'; //必须加分号，不然会报错
@import '../../style/ele1';
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
.el-button--small,
.el-button--small.is-round {
  /* margin-left: 5px; */
  padding: 5px 15px 5px 15px;
}
.el-button {
  margin-left: 0px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
}
.el-button + .el-button {
  margin-left: 0px;
}
</style>