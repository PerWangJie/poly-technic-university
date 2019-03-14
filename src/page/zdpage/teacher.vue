<template>
  <div>
    <div class="bigDiv" v-show="showlist">
      <div class="top">
        <img src="../../assets/image/logos.png" alt="">
      </div>
      <div class="middle">
        <div class="middle-zh">
          <span>学籍证明</span>
        </div>
        <div class="middle-msg">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;兹有学生 {{info.xsxm}}，性别 {{info.xbm=='1'?'男':info.xbm==2?'女':''}}，{{info.csrq}} 出生，身份证号 {{info.sfzjh}}，学号 {{info.xh}}， 是我校 {{info.zy}} 专业非师范类的普通高校全日制研究生在校学生，该生于 {{info.rxny}} 入学，学制 {{info.xz}} 年。若该生在校期间顺利完成学业， 达到学校相关要求，将于 {{info.bysj}} 毕业，取得毕业证书。
        </div>
        <div class="middle-tczm">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;特此证明
        </div>
      </div>
      <div class="bottom">
        <p>浙江工业大学研究生院</p>
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
  height: 2rem;
  margin: 0 auto;
  text-align: right;
  font-size: 0.28rem !important;
  margin-top: 1.5rem;
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
        .get(this.$server.glourl + "twc/proof/" + card)
        .then(response => {
          console.log(response);
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