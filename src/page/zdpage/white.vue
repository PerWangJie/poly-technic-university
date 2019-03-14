<template>

</template>
<script>
let Base64 = require("js-base64").Base64;
export default {
  data() {
    return {};
  },
  mounted() {
    var url = location.href;
    var params = url.substring(url.indexOf("?") + 1, url.length);
     params = decodeURIComponent(params);
    var param = window.atob(params);
    switch (this.getQueryVariable("type", param)) {
      case "1":
        this.$router.push({
          name: "goAbroads",
          query: { card: params }
        });

        break;
         case "2":
        this.$router.push({
          name: "goAbroadsEn",
          query: { card: params }
        });

        break;
      case "4":
        this.$router.push({
          name: "yjszdzm",
          query: { card: params }
        });

        break;
      case "6":
        this.$router.push({
          name: "teacher",
          query: { card: params }
        });

        break;

      default:
        break;
    }
  },
  methods: {
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