<template>
  <div v-show="showInfo">
    <return-exit></return-exit>
    <!-- <img src="../../../assets/img/bewell-logo.png" style="width:200px" id="img-buffer"> -->
    <!-- 中文 -->
    <div v-show="this.$i18n.locale === 'zh' || 'en'" style="text-align:center;padding-top:160px;" id="printDiv">
      <div id="posit" style="font-family:'Andale Mono';position:relative;text-align: center;background: #fff;width: 750px;height: 650px;margin: 0 auto;padding-top: 20px;">
        <!-- 中文证明 -->
        <header>
          <img src="../../assets/image/logos.png" style="width:350px;display:none" id="header">
          <p style="font-size: 35px;color: #000;margin: 20px;">研究生在读证明</p>

        </header>
        <section id="section">
          <div style="width: 600px;margin: 0 auto;text-align: left;color: #000;text-indent: 34px;font-size: 17px;letter-spacing: 1px;line-height: 30px;">
            {{info.xsxm}}同学，性别{{info.xbm=='1'?'男':info.xbm==2?'女':''}}，出生日期：{{info.csrq}}，于{{info.rxny}} 录取为我校{{info.ssyx}}{{info.zy}}专业{{info.xslbm=='1'?"全日制博士":info.xslbm=='2'?"全日制硕士":"非全日制硕士"}}研究生， 学制{{info.xz}}年，学号为{{info.xh}}。
            <br>
          </div>
        </section>
        <!-- 英文证明 -->
        <header style="margin-top:50px;">
          <p style="font-size: 35px;color: #000;margin: 20px;">CERTIFICATE</p>
        </header>
        <section id="section">
          <div style="width: 600px;margin: 0 auto;text-align: left;color: #000;text-indent: 34px;font-size: 17px;letter-spacing: 1px;line-height: 30px;">
            This is to certify that {{info.xmpy}},({{info.xbm=='1'?'male':info.xbm==2?'female':''}},Date of birth {{info.Ecsrq}} is studying at the College of {{info.ssyx}} Zhejiang University of Technology with the major in {{info.zy}} as a full-time {{info.xslbm=='1'?"master":"doctor"}} candidate since {{info.Erxny}}.Years of Program: {{info.xz}}, Student No: {{info.xh}}.
            <br>
          </div>
        </section>
        <footer style="font-family:'Andale Mono';">
          <div style="position: absolute;bottom: 75px;right: 100px;color: #000;">浙江工业大学研究生院</div>
          <div style="position: absolute;bottom: 50px;right: 100px;color: #000;">Graduate School of Zhejiang University of Technology</div>
          <div style="position: absolute;bottom: 25px;right: 100px;color: #000;">Date: {{currDate}}</div>
        </footer>
      </div>
    </div>
    <div style="margin-top:30px;text-align: center;">
      <button class="btn-print" @click="printContent">{{ $t('certificate.btnPrint') }}</button>
    </div>

    <confirm-print @hidden="hiddenShow" v-show="popup" v-bind:printId="printId" v-on:childMethod="hide" v-on:refreshbizlines="printProve"></confirm-print>
    <succ-pay v-show="lodding"></succ-pay>
    <scan-pay v-show="pay" v-bind:printId="printId" v-on:refreshbizlines="payProve" ref="scanPay"></scan-pay>
  </div>

</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.pdf {
  text-align: center;
  background: #fff;
  width: 720px;
  height: 720px;
  margin: 0 auto;
  padding-top: 20px;
  overflow: scroll;
  font-family: "simsun";
}
#header {
  display: inline !important;
}
.logo {
  width: 350px;
}
#posit {
  height: 750px !important;
  font-family: "simsun" !important;
}
.title {
  font-size: 40px;
  letter-spacing: 15px;
  color: #000;
  margin: 20px;
}
.prove {
  width: 600px;
  margin: 0 auto;
  text-align: left;
  color: #000;
  text-indent: 34px;
  font-size: 17px;
  letter-spacing: 1px;
  line-height: 30px;
}
.code {
  width: 80px;
  position: absolute;
  bottom: 40px;
  left: 100px;
}
.time {
  position: absolute;
  bottom: 40px;
  right: 100px;
  color: #000;
}
.btn-print {
  width: 200px;
  height: 60px;
  border-radius: 15px;
  background: #376bf5;
  color: #fff;
  cursor: pointer;
  font-size: 22px;
}
</style>
