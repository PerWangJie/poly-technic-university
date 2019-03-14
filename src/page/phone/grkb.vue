<template>
  <div class="score-wrapper">
    <div class="score-title">
      浙江工业大学<br>
      <select v-model="kksj">
        <option value="18年秋季">18年秋季</option>
        <option value="19年春季">19年春季</option>
      </select>
      全日制硕士生课程选课单
    </div>
    <table class="table-center">
      <tbody>
        <tr id="title">
          <th style="width:27%">课程<br>名称</th>
          <th style="width:18%">开课<br>教师</th>
          <th style="width:30%">上课时间</th>
          <th style="width:19%">上课<br>地点</th>
        </tr>
        <tr v-for="(item,index) in cours" :key="index">
          <td>{{item.kcmc}}</td>
          <td>{{item.kkjs}}</td>
          <td>{{item.sksj}}</td>
          <td>{{item.skdd}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        kksj: '18年秋季',
        cours: []
      };
    },
    methods: {
      getInfo(){
        this.$http.get(this.$server.glourl+"stuscore/StuCourse?kksj="+this.kksj)
        .then(response =>{
          // this.xjxx=response.data.xjxxMap;
          this.cours=response.data.cours;
         // console.log(response.data);
        })
      }
    },
    mounted() {
      this.getInfo()
    }
  }

</script>

<style scoped>
/* @import "../../style/common.css"; */
  body {
    margin: 0;
    padding: 0;
  }

  .score-wrapper {
    font-size: .28rem;
    color: #333;
    width: 100%;
  }

  .score-title {
    font-size: .4rem;
    padding-top: .3rem;
    text-align: center;
    /* position: fixed; */
    height: 1.5rem;
    z-index: 999;
    width: 100%;
    /* background: #fff; */
    /* background: #409EFF; */
    /* color: aliceblue; */
  }

  table {
    /* padding-top: 2.5rem; */
    margin: 0 auto;
    width: 100%;
    border-collapse: separate;
    border-radius: .1rem;

  }

  /* tbody,th,td {
            z-index: 1;
        } */
  table th {
    padding: .1rem .1rem;
    color: darkslategray;
    /* background: lightskyblue; */
  }

  table tr {
    background-color: #fff;
    margin: .1rem;
  }

  tr:nth-child(odd) {
    background: aliceblue;
  }

  table td {
    padding: .1rem .1rem;
    color: #606266;
  }

  .table-left {
    text-align: left;
  }

  .table-center td {
    text-align: center;
  }

  select {
    font-size: .35rem;
    /* border-bottom: .1rem solid #ddd; */
    /* color: cornsilk; */
    text-decoration: underline;
  }

  .titleFixed {
    position: fixed;
    top: 0;
  }

</style>
