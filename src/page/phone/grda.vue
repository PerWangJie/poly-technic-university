<template>
    <div class="outdiv">
        <div class="score-wrappers">
            <table class="grda">
                <tbody>
                    <tr style="font-size:0.35rem !important">
                        <td colspan="2" align="center" valign="middle">
                            个人档案
                        </td>
                    </tr>
                    <tr class="name_bw">
                        <td>姓名</td>
                        <td class="table-left">{{grxx.xm}}</td>
                    </tr>
                    <tr class="xh_bw">
                        <td>学号</td>
                        <td class="table-left">{{grxx.xh}}</td>
                    </tr>
                    <tr class="name_bw">
                        <td>性别</td>
                        <td class="table-left">{{grxx.xbm==1 ? "男" : "女"}}</td>
                    </tr>
                    <tr class="name_bw">
                        <td>所属学院</td>
                        <td class="table-left">{{grxx.deptName}}</td>
                    </tr>
                 
                    <tr class="name_bw">
                        <td>入学年月</td>
                        <td class="table-left">{{grxx.rxny}}</td>
                    </tr>
                    <tr class="name_bw">
                        <td>出生日期</td>
                        <td class="table-left">{{grxx.csrq}}</td>
                    </tr>
                    <tr class="xh_bw">
                        <td>导师姓名</td>
                        <td class="table-left">{{grxx.dsxm}}</td>
                    </tr>
                   
                    <tr class="name_bw">
                        <td>入学时学历</td>
                        <td class="table-left">{{grxx.rxxlm}}</td>
                    </tr>
                    <tr class="name_bw">
                        <td>籍贯</td>
                        <td class="table-left">{{grxx.jg}}</td>
                    </tr>
                    <tr class="name_bw">
                        <td>身份证</td>
                        <td class="table-left">{{grxx.sfzjh}}</td>
                    </tr>
                    <tr class="name_bw">
                        <td>大学毕业年月</td>
                        <td class="table-left">{{grxx.dxbyny}}</td>
                    </tr>
                    <tr class="xh_bw">
                        <td>大学毕业学校</td>
                        <td class="table-left">{{grxx.dxbyyx}}</td>
                    </tr>
                    <tr class="name_bw">
                        <td>本人电话</td>
                        <td class="table-left">{{grxx.dh}}</td>
                    </tr>
                    <tr class="name_bw">
                        <td>本人住址</td>
                        <td class="table-left">{{grxx.brtxdz}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>
<style scoped>
@import "../../style/common.css";
</style>
<script>
export default {
  data() {
    return {

    grxx:{},

    };
  },
  mounted() {
    (function(doc, win) {
      var docEl = doc.documentElement,
        resizeEvt =
          "orientationchange" in window ? "orientationchange" : "resize",
        recalc = function() {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          if (clientWidth >= 750) {
            docEl.style.fontSize = "100px";
          } else {
            docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
          }
        };

      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener("DOMContentLoaded", recalc, false);
    })(document, window);
    this.loadTable();
  },
  methods:{

      loadTable(){
           this.$http
        .get(this.$server.glourl+"stuscore/AllScore")
        .then(response => {
           this.grxx=response.data.xjxxMap;
          // console.log(this.grxx);
           
        });
      }
  }

}
</script>