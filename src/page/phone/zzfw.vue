<template>
    <div class="outdiv">
        <div class="selfhelp-wrapper">
            <div class="top_bg">
                <img src="../../assets/image/bg_top.png" alt="">
            </div>
            <div class="selfhelp-content">
                <ul>
                    <li>
                        <router-link to="grda">
                            <img src="../../assets/image/wjj.png" alt="">
                            <p>个人档案</p>
                            <img src="../../assets/image/rights.png" alt="" class="rights">
                        </router-link>
                        
                    </li>
                    <li>
                        <router-link to="cjd">
                            <img src="../../assets/image/cjd.png" alt="">
                            <p>中文成绩单</p>
                            <img src="../../assets/image/rights.png" alt="" class="rights">
                        </router-link>
                    </li>
                    <li>
                        <router-link to="cjd_En">
                            <img src="../../assets/image/cjd.png" alt="">
                            <p>英文成绩单</p>
                            <img src="../../assets/image/rights.png" alt="" class="rights">
                        </router-link>
                    </li>
                    <li>
                        <router-link to="grkb">
                            <img src="../../assets/image/kcb.png" alt="">
                            <p>个人课表</p>
                            <img src="../../assets/image/rights.png" alt="" class="rights">
                        </router-link>
                    </li>
                    <li>
                        <router-link to="sljbm">
                            <img src="../../assets/image/yyslj.png" alt="">
                            <p>英语四六级报名</p>
                            <img src="../../assets/image/rights.png" alt="" class="rights">
                        </router-link>
                    </li>
                    <!-- <li @click="main4">
                        <i><img src="../../assets/image/qkfx.png" alt=""></i>
                        <a>研究生报道注册情况</a>
                        <img src="../../assets/image/rights.png" alt="" class="rights">
                    </li>
                    <li @click="main5">
                        <i><img src="../../assets/image/djb.png" alt=""></i>
                        <a>注册报道</a>
                        <img src="../../assets/image/rights.png" alt="" class="rights">
                    </li> -->
                </ul>
            </div>
        </div>
    </div>

</template>
<style scoped>
@import "../../style/common.css";
</style>
<script>
export default {
  data() {
    return {};
  },
  // mounted() {
  //   flex(document, window)
  // },
  methods: {
    // main1() {
    //   this.$router.push({ path: "/cjd" });
    // },
    // main2() {
    //   this.$router.push({ path: "/grda" });
    // },
    // main3() {
    //   this.$router.push({ path: "/grkb" });
    // },
    // main4() {
    //   this.$router.push({ path: "/zcbd" });
    // },
    // main5() {
    //   this.$router.push({ path: "/zcbdMap" });
    // }
  }
};
</script>
