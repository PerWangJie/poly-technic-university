<template>
  <div class="outDiv">
    <div class="bigDiv" v-show="!showerror">
      <div class="top">
        <p>Transcript for Graduate Student of Zhejiang University of Technology</p>

        <table border="1" style="text-align: left;margin: 0 auto;border-bottom: 0rem;color: #101010;border-collapse: collapse;width:100%;">
          <tr>
            <td colspan="2">Student ID：{{roll.xh}}</td>
            <td colspan="2">Name：{{roll.xmpy}}</td>
            <td colspan="2">Sex：{{roll.xbm==1?"Male":roll.xbm==2?"Female":""}}</td>
          </tr>
          <tr>
            <td colspan="2">Degree Type：{{roll.xslbm==1?"Doctor":"Master"}}</td>
            <td colspan="2">Time of Enrollment：{{roll.rxny}}</td>
            <td colspan="2">Years of Program：{{roll.xz}}&nbsp; Years</td>
          </tr>
          <tr>
            <td style="text-align:left;" colspan="3">College：{{roll.ssyx_en}}</td>
            <td style="text-align:left;" colspan="3">Specialty：{{roll.zy}}</td>
          </tr>
          <tr>
            <td colspan="6" style="border-bottom: 0 !important">Degree Credits / Total Credits：&nbsp;&nbsp;{{roll.xwkzxf}} &nbsp;&nbsp;/&nbsp;&nbsp;{{roll.qdzxf}}</td>
          </tr>
        </table>

      </div>
      <div class="cjd-table">
        <div class="table-div">
          <table style="line-height:0.3rem">
            <tr style="border-bottom:0">
              <th style="width:0.6rem;">Type</th>
              <th style="width:3.5rem;">Name of Course</th>
              <th style="width:1rem;">Class Hours</th>
              <th style="width:1rem;">Credits</th>
              <th style="width:1rem;">Semester</th>
              <th style="width:0.6rem;">Score</th>
            </tr>
            <tr v-for="(item, index) in degreeList" :key="index">
              <td style="width:0.6rem;text-align:center;" v-if="index==0" :rowspan="dSize">Degree Course</td>
              <td style="width:3.5rem;text-align:left">{{item.kcmc}}</td>
              <td style="width:1rem;text-align:left">{{item.jkxs}}</td>
              <td style="width:1rem;text-align:left">{{item.kcxf}}</td>
              <td style="width:1rem;text-align:left">{{item.kksj}}</td>
              <td style="width:0.6rem;text-align:left">{{item.khcj}}</td>
            </tr>
            <tr v-for="(item, index) in d" :key="index">
              <td style="width:0.6rem;text-align:center;" v-if="index==0 && degreeList.length==0" :rowspan="dSize">Degree Course</td>
              <td style="width:3.5rem;text-align:center">/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/</td>
              <td style="width:1rem;text-align:left"></td>
              <td style="width:1rem;text-align:left"></td>
              <td style="width:1rem;text-align:left"></td>
              <td style="width:0.6rem;text-align:left"></td>
            </tr>
            <tr v-for="(item, index) in electiveList" :key="index+20">
              <td v-if="index==0" :rowspan="eSize" style="width:0.6rem;text-align:center;">Non-Degree Course</td>
              <td style="width:3.5rem;text-align:left">{{item.kcmc}}</td>
              <td style="width:1rem;text-align:left">{{item.jkxs}}</td>
              <td style="width:1rem;text-align:left">{{item.kcxf}}</td>
              <td style="width:1rem;text-align:left">{{item.kksj}}</td>
              <td style="width:0.6rem;text-align:left">{{item.khcj}}</td>
            </tr>
            <tr v-for="(item, index) in e" :key="index">
              <td v-if="index==0 && electiveList.length==0" :rowspan="eSize" style="width:0.6rem;text-align:center;">Non-Degree Course</td>
              <td style="width:3.5rem;text-align:center">/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/</td>
              <td style="width:1rem;text-align:left"></td>
              <td style="width:1rem;text-align:left"></td>
              <td style="width:1rem;text-align:left"></td>
              <td style="width:0.6rem;text-align:left"></td>
            </tr>
            <tr v-show="blank || margin">
              <td colspan="6" style="text-align:center">Blank below</td>
            </tr>
            <tr v-for="(item, index) in size" :key="index" style="text-align:center;">
              <td style="width:0.6rem;text-align:left;"></td>
              <td style="width:1rem;text-align:center">/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/</td>
              <td style="width:3.5rem;text-align:left"></td>
              <td style="width:1rem;text-align:left"></td>
              <td style="width:1rem;text-align:left"></td>
              <td style="width:0.6rem;text-align:left"></td>
              <!-- <td style="width:1rem;text-align:center"></td> -->
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div v-show="showerror" class="error">
      The file does not exist or is invalid！
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
        .get(this.$server.glourl + "twc/goAbroad/" + card)
        .then(response => {
          console.log(response.data);
          // this.roll = response.data.result.roll;
          var data = response.data.result;
          if (data.result == 1) {
            this.showerror = true;
          } else if (data.result == 2) {
            this.showerror = true;
          } else {
            this.showerror = false;
            this.showInfo = true;
            this.roll = data.roll;
            this.disposeInfo(data.tran);
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
  width: 98%;
  margin: 0 auto;
  /* margin-top: 0.5rem; */
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
  border-top: none !important;
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
