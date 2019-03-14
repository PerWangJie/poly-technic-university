<template>
  <div class="outDiv">
    <div class="bigDiv">
      <div class="top">
        <p>硕 士 研 究 生 学 习 成 绩 单</p>
        <div class="top-bottom">
          <span class="top-left">&nbsp;学科（专业）或领域：{{roll.zy}}</span>
          <span class="top-right">学号、姓名：{{roll.xh}}&nbsp;&nbsp;{{roll.xsxm}}</span>
          <div class="clear"></div>
          <span>&nbsp;指导教师：{{roll.dsxm}}</span>
        </div>
      </div>
      <div class="cjd-table">
        <div class="table-div">
          <table class="top-table">
            <tr>
              <th style="width:0.6rem;">课程<br>类别</th>
              <th style="width:1rem;">课程<br>编号</th>
              <th style="width:3rem;">课程名称</th>
              <th style="width:1rem;">学时</th>
              <th style="width:1rem;">学分</th>
              <th style="width:1.5rem;">开课时间</th>
              <th style="width:1.5rem;">任课教师</th>
              <th style="width:1rem;">考核<br>方式</th>
              <th style="width:1rem;">考核<br>成绩</th>
              <th style="width:1rem;">备注</th>
            </tr>
          </table>
          <table style="line-height:0.3rem">

            <tr v-for="(item, index) in degreeList" :key="index">
              <td style="width:0.6rem;text-align:center;" v-if="index==0" :rowspan="dSize">学<br>位<br>课</td>
              <td style="width:1rem;text-align:center">{{item.kcbh}}</td>
              <td style="width:3rem;text-align:left">{{item.kcmc}}</td>
              <td style="width:1rem;text-align:center">{{item.jkxs}}</td>
              <td style="width:1rem;text-align:center">{{item.kcxf}}</td>
              <td style="width:1.5rem;text-align:center">{{item.kksj}}</td>
              <td style="width:1.5rem;text-align:center">{{item.kkjs}}</td>
              <td style="width:1rem;text-align:center">{{item.khfs}}</td>
              <td style="width:1rem;text-align:center">{{item.khcj}}</td>
              <td style="width:1rem;text-align:center">{{item.remark}}</td>
            </tr>
            <tr v-for="(item, index) in d" :key="index">
              <td style="width:0.6rem;text-align:center;" v-if="index==0 && degreeList.length==0" :rowspan="dSize">学<br>位<br>课</td>
              <td style="width:1rem;text-align:center"></td>
              <td style="width:3rem;text-align:left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/</td>
              <td style="width:1rem;text-align:center"></td>
              <td style="width:1rem;text-align:center"></td>
              <td style="width:1.5rem;text-align:center"></td>
              <td style="width:1.5rem;text-align:center"></td>
              <td style="width:1rem;text-align:center"></td>
              <td style="width:1rem;text-align:center"></td>
              <td style="width:1rem;text-align:center"></td>
            </tr>
            <tr v-for="(item, index) in electiveList" :key="index+20">
              <td v-if="index==0" :rowspan="eSize" style="width:0.6rem;text-align:center;">非<br>学<br>位<br>课</td>
              <td style="width:1rem;text-align:center">{{item.kcbh}}</td>
              <td style="width:3rem;text-align:left">{{item.kcmc}}</td>
              <td style="width:1rem;text-align:center">{{item.jkxs}}</td>
              <td style="width:1rem;text-align:center">{{item.kcxf}}</td>
              <td style="width:1.5rem;text-align:center">{{item.kksj}}</td>
              <td style="width:1.5rem;text-align:center">{{item.kkjs}}</td>
              <td style="width:1rem;text-align:center">{{item.khfs}}</td>
              <td style="width:1rem;text-align:center">{{item.khcj}}</td>
              <td style="width:1rem;text-align:center">{{item.remark}}</td>
            </tr>
            <tr v-for="(item, index) in e" :key="index">
              <td v-if="index==0 && electiveList.length==0" :rowspan="eSize" style="width:0.6rem;text-align:center;">非<br>学<br>位<br>课</td>
              <td style="width:1rem;text-align:center"></td>
              <td style="width:3rem;text-align:left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/</td>
              <td style="width:1rem;text-align:center"></td>
              <td style="width:1rem;text-align:center"></td>
              <td style="width:1.5rem;text-align:center"></td>
              <td style="width:1.5rem;text-align:center"></td>
              <td style="width:1rem;text-align:center"></td>
              <td style="width:1rem;text-align:center"></td>
              <td style="width:1rem;text-align:center"></td>
            </tr>
            <tr v-for="(item, index) in requiredList" :key="index">
              <td v-if="index==0" :rowspan="rSize" style="width:0.6rem;text-align:center;">必<br>修<br>环<br>节</td>
              <td style="width:1rem;text-align:center">{{item.kcbh}}</td>
              <td style="width:3rem;text-align:left">{{item.kcmc}}</td>
              <td style="width:1rem;text-align:center">{{item.jkxs}}</td>
              <td style="width:1rem;text-align:center">{{item.kcxf}}</td>
              <td style="width:1.5rem;text-align:center">{{item.kksj}}</td>
              <td style="width:1.5rem;text-align:center">{{item.kkjs}}</td>
              <td style="width:1rem;text-align:center">{{item.khfs}}</td>
              <td style="width:1rem;text-align:center">{{item.khcj}}</td>
              <td style="width:1rem;text-align:center">{{item.remark}}</td>
            </tr>
            <tr v-for="(item, index) in r" :key="index">
              <td v-if="requiredList.length==0 && index==0" :rowspan="rSize" style="width:0.6rem;text-align:center;">必<br>修<br>环<br>节</td>
              <td style="width:1rem;text-align:center">{{item.kcbh}}</td>
              <td style="width:1rem;text-align:center">/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/</td>
              <td style="width:1rem;text-align:center">{{item.jkxs}}</td>
              <td style="width:1rem;text-align:center">{{item.kcxf}}</td>
              <td style="width:1.5rem;text-align:center">{{item.kksj}}</td>
              <td style="width:1.5rem;text-align:center">{{item.kkjs}}</td>
              <td style="width:1rem;text-align:center">{{item.khfs}}</td>
              <td style="width:1rem;text-align:center">{{item.khcj}}</td>
              <td style="width:1rem;text-align:center">{{item.remark}}</td>
            </tr>
            <tr v-show="blank || margin">
              <td colspan="10" style="text-align:center">以下空白</td>
            </tr>
            <tr v-for="(item, index) in size" :key="index" style="text-align:center;">
              <td style="width:0.6rem;text-align:center;"></td>
              <td style="width:1rem;text-align:center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/</td>
              <td style="width:3rem;text-align:left"></td>
              <td style="width:1rem;text-align:center"></td>
              <td style="width:1rem;text-align:center"></td>
              <td style="width:1.5rem;text-align:center"></td>
              <td style="width:1.5rem;text-align:center"></td>
              <td style="width:1rem;text-align:center"></td>
              <td style="width:1rem;text-align:center"></td>
              <td style="width:1rem;text-align:center"></td>
            </tr>
          </table>
        </div>
        <div class="table-bottom">
          取得总学分：{{roll.qdzxf}}，其中：学位课学分：{{roll.xwkzxf}}，学位课加权平均成绩：{{roll.xwkzpjf}}
        </div>
        <div class="table-bottoms">
          <div class="table-botleft">
            注：学位课加权平均成绩 = Σ(每门学位课成绩 x 该课学分)
          </div>
          <div class="table-botright">

          </div>
        </div>
      </div>
    </div>
    <div v-show="showerror" class="error">
      该文件不存在或已失效！
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showerror: false,
      roll: {},
      roll: {},
      degreeList: [],
      electiveList: [],
      requiredList: [],
      dSize: 0,
      eSize: 0,
      rSize: 0,
      d: 0,
      e: 0,
      r: 0,
      size: 0
    };
  },
  mounted() {
    var param = window.atob(this.$router.history.current.query.card);
    this.transcriptInfo(this.getQueryVariable("num", param));
  },
  methods: {
    // 获取成绩单基本信息
    transcriptInfo(card) {
      this.$http
        .get(this.$server.glourl + "twc/transcript/" + card)
        .then(response => {
          //console.log(response.data);
          if (
            response.data.tran.roll == null ||
            response.data.tran.roll.jsxyny == null ||
            response.data.tran.roll.jsxyny.length < 4
          ) {
            this.showInfo = true;
            this.roll = response.data.tran.roll;
            this.disposeInfo(response.data.tran.recoure);
          } else {
            this.showerror = true;
          }
        });
    },
    disposeInfo(list) {
      for (let index = 0; index < list.length; index++) {
        var temp = list[index];
        if (temp.xklxm == "1") {
          this.degreeList.push(temp);
        } else if (temp.xklxm == "2") {
          this.electiveList.push(temp);
        } else if (temp.xklxm == "3") {
          this.requiredList.push(temp);
        }
      }
      this.dSize = this.degreeList.length <= 4 ? 4 : this.degreeList.length;
      this.eSize = this.electiveList.length <= 4 ? 4 : this.electiveList.length;
      this.rSize = this.requiredList.length <= 4 ? 4 : this.requiredList.length;
      this.addBlankData();
      var total = this.dSize + this.eSize + this.rSize;
      if (total > 27) {
        this.blank = true;
        this.size = 62 - total;
      } else {
        if (total == 27) {
          this.size = 27 - total;
        } else {
          this.margin = true;
          this.size = 27 - total - 1;
        }
      }
    },
    addBlankData() {
      if (this.degreeList.length < 4) {
        this.d = this.dSize - this.degreeList.length;
      }
      if (this.electiveList.length < 4) {
        this.e = this.eSize - this.electiveList.length;
      }
      if (this.requiredList.length < 4) {
        this.r = this.rSize - this.requiredList.length;
      }
    },
    //获取路径参数
    getQueryVariable(variable, query) {
      //胜利ar query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
          //   console.log(pair);
        }
      }
      return false;
    }
  }
};
</script>

<style scoped>
/* .outDiv {
  width: 100%;
} */
.bigDiv {
  width: 180%;
  font-family: "微软雅黑";
  padding-top: 0.5rem;
  font-size: 0.26rem;
}
.top {
  width: 98%;
  margin: 0 auto;
  font-size: 0.26rem;
}
.top p {
  font-size: 0.34rem;
  width: 100%;
  text-align: center;
}
.top-left {
  float: left;
}
.top-right {
  float: right;
}
.clear {
  clear: both;
}
.cjd-table {
  width: 97%;
  margin: 0 auto;
}
.cjd-table .table-div {
  width: 100%;
}
.table-div table {
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
  font-size: 0.24rem;
}
.table-div table,
th,
td {
  border: 1px solid #000000;
}
.top-table {
  table-layout: fixed;
  border-bottom: none !important;
}
.top-table th {
  border-bottom: none !important;
}
.table-bottom {
  font-size: 0.14rem;
  line-height: 0.5rem;
  border: 1px solid #000000;
  border-top: none;
  width: 100%;
  height: 0.5rem;
  text-align: center;
}
.table-bottoms {
  height: 0.7rem;
  font-size: 0.14rem;
  line-height: 0.3rem;
  border: 1px solid #000000;
  border-top: none;
  width: 100%;
  text-align: center;
}
.table-botleft {
  width: 49.7%;
  height: 100%;
  float: left;
  border-right: 1px solid #000000;
}
.table-botright {
  width: 50%;
  float: left;
}
.error {
  width: 100%;
  font-size: 0.4rem;
  text-align: center;
  margin: 0 auto;
  margin-top: 70%;
}
</style>
