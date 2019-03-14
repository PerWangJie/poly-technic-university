<template>
  <div class="bigDiv">
    <div class="top">
      <img src="../../assets/image/logos.png" alt="">
    </div>
    <div class="middle">
      <div class="middle-zh">
        <span>学籍证明</span>
      </div>
      <div class="middle-msg">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;兹有学生 ，性别 ， 出生，身份证号 ，学号 ， 是我校（院） 专业非师范类的普通高校全日制研究生在校学生， 该生于 入学，学制 年。若该生在校期间顺利完成学业， 达到学校相关要求，将于 毕业，取得毕业证书。
      </div>
      <div class="middle-tczm">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;特此证明
      </div>
    </div>
    <div class="bottom">
      <p>浙江工业大学研究生院</p>
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
</style>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    var params = 'bnVtPTIxMTE4MDUwODQmdHlwZT0xJnZlcnNpb249MQ==';
    var param = window.atob(params);
    // console.log(param);
    // this.queryData();
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
  },
  methods:{

  }
};
</script>