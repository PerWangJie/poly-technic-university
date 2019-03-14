<template>
    <div class="outdiv">
        <div class="score-wrappers">
            <table class="sljbm">
                <tbody>
                    <!-- <tr style="font-size:0.35rem !important">
                        <td colspan="2" align="center" valign="middle">
                            个人档案
                        </td>
                    </tr> -->
                    <tr class="name_bw">
                        <td>姓名</td>
                        <td class="table-left">{{grxx.xm}}</td>
                    </tr>
                    <tr class="name_bw">
                        <td>学号</td>
                        <td class="table-left">{{grxx.xh}}</td>
                    </tr>
                    <tr class="name_bw">
                        <td>身份证号</td>
                        <td class="table-left">{{grxx.sfzjh}}</td>
                    </tr>
                    <tr class="xh_bw">
                        <td>所属学院</td>
                        <td class="table-left">{{grxx.deptName}}</td>
                    </tr>
                    <tr class="xh_bw">
                        <td>校区选择</td>
                        <td class="table-left">
                            <select style="width:100%;border:none !important">
                                <option value="朝晖校区">朝晖校区</option>
                                <option value="屏峰校区">屏峰校区</option>
                            </select>
                        </td>
                    </tr>
                    <!-- <tr class="name_bw">
                        <td></td>
                        <td></td>
                    </tr> -->
                </tbody>
            </table>
            <div style="width:94%;height:2rem;background:#ffffff;margin:0 auto;padding-left:0.3rem;padding-top:0.1rem;box-sizing:border-box" class="xh_bw">
                <p>英语四六级报名选择</p>
                <el-radio-group v-model="radio" style="width:100%;text-align:center;" class="selectfx">
                    <el-radio-button label="1">四级</el-radio-button>
                    <el-radio-button label="2" style="margin-left:1rem;">六级</el-radio-button>
                </el-radio-group>
            </div>
            <div style="width:94%;height:3rem;margin:0 auto;text-align:center;margin-top:1rem;" class="bottombtn">
                <button>提交</button>
            </div>
        </div>
    </div>

</template>
<style scoped>
@import "../../style/common.css";
.sljbm {
  padding-left: 0.5rem;
  border-collapse: collapse;
}
.sljbm tr {
  height: 1rem;
  font-size: 0.26rem;
}
.bottombtn button {
  width: 70%;
  height: 0.8rem;
  background-color: #409eff;
  border-radius: 0.1rem;
  border:none;
  color: #fff;
}
</style>
<style>
.selectfx .el-radio-button__inner {
  border-radius: 0.1rem !important;
  border: 0.01rem solid #dcdfe6;
  /* height: 0.8rem; */
  padding: 0.12rem 0.5rem !important;
}
</style>

<script>
export default {
  data() {
    return {
      grxx: {},
      radio: "1"
    };
  },
  mounted() {},
  methods: {}
};
</script>