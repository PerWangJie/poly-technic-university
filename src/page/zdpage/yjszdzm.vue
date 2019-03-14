<template>
  <div>
    <div class="bigDiv" v-if="showlist">
      <div class="top">
        <img src="../../assets/image/logos.png" alt="">
      </div>
      <div class="middle">
        <div class="middle-zh">
          <span>研究生在读证明</span>
        </div>
        <div class="middle-msg">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{info.xsxm}} 同学，性别 {{info.xbm=='1'?'男':info.xbm==2?'女':''}} ，出生日期： {{info.csrq}}，于 {{info.rxny}} 录取为我校 {{info.yxqc}} {{info.zy}} 专业 {{info.xslbm=='1'?"全日制博士":info.xslbm=='2'?"全日制硕士":"非全日制硕士"}} 研究生， 学制 {{info.xz}} 年，学号为 {{info.xh}}。
        </div>
        <div class="middle-msg">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This is to certify that {{info.xmpy}},({{info.xbm=='1'?'male':info.xbm==2?'female':''}},Date of birth {{info.Ecsrq}} )is studying at the {{info.ssyx_en}} Zhejiang University of Technology with the major in {{info.zy_en}} as a full-time {{info.xslbm=='1'?"doctor":"master"}} candidate since {{info.Erxny}}.Years of Program: {{info.xz}}, Student No: {{info.xh}}.
        </div>
      </div>
      <div class="bottom">
        <p>浙江工业大学研究生院</p>
        <p>Graduate School of Zhejiang University of Technology</p>
      </div>
    </div>
    <div v-show="showerror" class="error">
      该文件不存在或已失效！
    </div>
  </div>
</template>
<style scoped>
.bigDiv {
  font-family: "微软雅黑";
  font-size: 0.24rem;
  height: 100%;
  padding-top: 0.5rem;
  box-sizing: border-box;
}
.top {
  width: 98%;
  margin: 0 auto;
  font-size: 0.24rem;
}
.top img {
  display: block;
  margin: 0 auto;
  width: 60%;
  height: 100%;
}
.middle {
  width: 98%;
  margin: 0 auto;
}
.middle-zh {
}
.middle-zh span {
  font-family: "simsun";
  width: 50%;
  text-align: center;
  font-size: 0.4rem;
  display: block;
  margin: 0 auto;
}
.middle-msg {
  width: 85%;
  margin: 0 auto;
  margin-top: 0.5rem;
  font-size: 0.28rem !important;
  line-height: 0.6rem;
}
.middle-tczm {
  width: 85%;
  margin: 0 auto;
  font-size: 0.28rem !important;
  line-height: 0.6rem;
}
.bottom {
  width: 85%;
  margin: 0 auto;
  text-align: right;
  font-size: 0.28rem !important;
  margin-top: 0.7rem;
}
.error {
  width: 85%;
  height: 2rem;
  margin: 0 auto;
  font-size: 0.3rem;
  text-align: center;
  line-height: 2rem;
  color: blue;
}
</style>
<script>
export default {
  data() {
    return {
      showlist: false,
      showerror: false,
      info: {}
    };
  },
  mounted() {
    var param = window.atob(this.$router.history.current.query.card);
    this.transcriptInfo(this.getQueryVariable("num", param));
  },
  methods: {
    transcriptInfo(card) {
      this.$http
      .get(this.$server.glourl + "twc/stuProve/" + card)
      .then(response => {
        this.info = response.data.map;
        if (this.info.result == 0) {
          this.showlist = true;
          this.info.bysj = this.getBynyDate(this.info.rxny);
          this.info.csrq = this.getDataTime(this.info.csrq);
          this.info.rxny = this.getDataTime(this.info.rxny);
        } else {
          this.showerror = true;
        }
      });
    },

    // 转换时间格式
    getDataTime(str) {
      var Arr = str.split(".");
      var temp = "";
      temp += Arr[0] + "年";
      temp += Arr[1] + "月";
      if (Arr.length > 2) {
        temp += Arr[2] + "日";
      }
      return temp;
    },
    //获取毕业年月
    getBynyDate(str) {
      var Arr = str.split(".");
      var xz = parseFloat(this.info.xz).toFixed(1);
      var temp = "";
      var year = parseInt(Arr[0]) + Math.round(xz);
      temp += year + "年";
      var index =
        parseInt(xz.substring(xz.indexOf(".") + 1, xz.indexOf(".") + 2)) + 3;
      temp += Arr[1] - (index == 3 ? 3 : index) + "月";
      return temp;
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