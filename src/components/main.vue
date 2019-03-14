<template>
  <el-container style="height: 100%">
    <el-header style="text-align: center;width:100%;z-index:1000;height:60px">
      <el-row :gutter="10" style="text-align:center;color:#ffffff">
        <el-col :span="4">
          <div class="top-left">
            <img src="../assets/image/gdlogo.png" alt="" style="width:100%;height:100%;">
          </div>
          <span style="float:left;margin-left:40px">研究生综合服务平台</span>
        </el-col>
        <el-col :span="14" style="height:60px;overflow:hidden">
          <span style="float:left"><img src="../assets/image/laba.png" alt="" style="width:25px;height:25px;margin-top:18px"></span>
          <div class="grid-content bg-purple" id="newest-bill" style="font-size:14px;">
            <!-- <ul id="roll-ul" style="list-style:none">
              <li v-for="item in list" ref="rollul" :key="item.id" :class="{anim:animate==true}" style="text-align:left">
                <span class="name">{{item.name}}</span>
                <span class="site">{{item.site}}</span>
                <span class="gsmc">{{item.gsmc}}</span>
              </li>
            </ul> -->
          </div>
        </el-col>
        <div class="header-right">
          <!-- 通知 -->
          <!-- <div class="badge">
            <el-badge :value="0">
              <el-dropdown style="text-align:center;font-size:30px;color:#ffffff">
                <i class="el-icon-bell"></i>
                <el-dropdown-menu slot="dropdown" class="dropdown-top">
                  <div style="width:300px;height:300px;">
                    <el-tabs v-model="activeName" stretch>
                      <el-tab-pane label="消息" name="first">
                        <div style="width:100%;height:270px;overflow-y:scroll">
                          <ul style="margin:0;padding:0;">
                            <li class="liClass" v-on:mouseover="addActive($event)" v-on:mouseout="removeActive($event)">
                              <div style="width:80px;height:100%;text-align:center;float:left">
                                <img src="../assets/image/email-blue.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="imageshow">
                                <img src="../assets/image/email-red.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="!imageshow">
                              </div>
                              <div style="width:200px;height:100%;float:left;line-height:5px;color:#666666;font-family:SimSun;padding-top:15px;box-sizing:border-box">
                                <p style="font-size:15px">你的审核未通过</p>
                                <p style="font-size:13px">1天前</p>
                              </div>
                            </li>
                            <li class="liClass" v-on:mouseover="addActive($event)" v-on:mouseout="removeActive($event)">
                              <div style="width:80px;height:100%;text-align:center;float:left">
                                <img src="../assets/image/email-blue.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="imageshow">
                                <img src="../assets/image/email-red.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="!imageshow">
                              </div>
                              <div style="width:200px;height:100%;float:left;line-height:5px;color:#666666;font-family:SimSun;padding-top:15px;box-sizing:border-box">
                                <p style="font-size:15px">你的审核未通过</p>
                                <p style="font-size:13px">1天前</p>
                              </div>
                            </li>
                            <li class="liClass" v-on:mouseover="addActive($event)" v-on:mouseout="removeActive($event)">
                              <div style="width:80px;height:100%;text-align:center;float:left">
                                <img src="../assets/image/email-blue.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="imageshow">
                                <img src="../assets/image/email-red.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="!imageshow">
                              </div>
                              <div style="width:200px;height:100%;float:left;line-height:5px;color:#666666;font-family:SimSun;padding-top:15px;box-sizing:border-box">
                                <p style="font-size:15px">你的审核未通过</p>
                                <p style="font-size:13px">1天前</p>
                              </div>
                            </li>
                            <li class="liClass" v-on:mouseover="addActive($event)" v-on:mouseout="removeActive($event)">
                              <div style="width:80px;height:100%;text-align:center;float:left">
                                <img src="../assets/image/email-blue.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="imageshow">
                                <img src="../assets/image/email-red.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="!imageshow">
                              </div>
                              <div style="width:200px;height:100%;float:left;line-height:5px;color:#666666;font-family:SimSun;padding-top:15px;box-sizing:border-box">
                                <p style="font-size:15px">你的审核未通过</p>
                                <p style="font-size:13px">1天前</p>
                              </div>
                            </li>
                            <li class="liClass" v-on:mouseover="addActive($event)" v-on:mouseout="removeActive($event)">
                              <div style="width:80px;height:100%;text-align:center;float:left">
                                <img src="../assets/image/email-blue.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="imageshow">
                                <img src="../assets/image/email-red.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="!imageshow">
                              </div>
                              <div style="width:200px;height:100%;float:left;line-height:5px;color:#666666;font-family:SimSun;padding-top:15px;box-sizing:border-box">
                                <p style="font-size:15px">你的审核未通过</p>
                                <p style="font-size:13px">1天前</p>
                              </div>
                            </li>
                            <li class="liClass" v-on:mouseover="addActive($event)" v-on:mouseout="removeActive($event)">
                              <div style="width:80px;height:100%;text-align:center;float:left">
                                <img src="../assets/image/email-blue.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="imageshow">
                                <img src="../assets/image/email-red.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="!imageshow">
                              </div>
                              <div style="width:200px;height:100%;float:left;line-height:5px;color:#666666;font-family:SimSun;padding-top:15px;box-sizing:border-box">
                                <p style="font-size:15px">你的审核未通过</p>
                                <p style="font-size:13px">1天前</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </el-tab-pane>
                      <el-tab-pane label="通知" name="second">
                        <div style="width:100%;height:270px;overflow-y:scroll">
                          <ul style="margin:0;padding:0;">
                            <li class="liClass" v-on:mouseover="addActive($event)" v-on:mouseout="removeActive($event)" @dblclick="getInfo">
                              <div style="width:80px;height:100%;text-align:center;float:left">
                                <img src="../assets/image/message-blue.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="imageshow">
                                <img src="../assets/image/message-red.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="!imageshow">
                              </div>
                              <div style="width:200px;height:100%;float:left;line-height:5px;color:#666666;font-family:SimSun;padding-top:15px;box-sizing:border-box">
                                <p style="font-size:15px">你的审核未通过</p>
                                <p style="font-size:13px">1天前</p>
                              </div>
                            </li>
                            <li class="liClass" v-on:mouseover="addActive($event)" v-on:mouseout="removeActive($event)">
                              <div style="width:80px;height:100%;text-align:center;float:left">
                                <img src="../assets/image/message-blue.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="imageshow">
                                <img src="../assets/image/message-red.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="!imageshow">
                              </div>
                              <div style="width:200px;height:100%;float:left;line-height:5px;color:#666666;font-family:SimSun;padding-top:15px;box-sizing:border-box">
                                <p style="font-size:15px">你的审核未通过</p>
                                <p style="font-size:13px">1天前</p>
                              </div>
                            </li>
                            <li class="liClass" v-on:mouseover="addActive($event)" v-on:mouseout="removeActive($event)">
                              <div style="width:80px;height:100%;text-align:center;float:left">
                                <img src="../assets/image/message-blue.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="imageshow">
                                <img src="../assets/image/message-red.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="!imageshow">
                              </div>
                              <div style="width:200px;height:100%;float:left;line-height:5px;color:#666666;font-family:SimSun;padding-top:15px;box-sizing:border-box">
                                <p style="font-size:15px">你的审核未通过</p>
                                <p style="font-size:13px">1天前</p>
                              </div>
                            </li>
                            <li class="liClass" v-on:mouseover="addActive($event)" v-on:mouseout="removeActive($event)">
                              <div style="width:80px;height:100%;text-align:center;float:left">
                                <img src="../assets/image/message-blue.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="imageshow">
                                <img src="../assets/image/message-red.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="!imageshow">
                              </div>
                              <div style="width:200px;height:100%;float:left;line-height:5px;color:#666666;font-family:SimSun;padding-top:15px;box-sizing:border-box">
                                <p style="font-size:15px">你的审核未通过</p>
                                <p style="font-size:13px">1天前</p>
                              </div>
                            </li>
                            <li class="liClass" v-on:mouseover="addActive($event)" v-on:mouseout="removeActive($event)">
                              <div style="width:80px;height:100%;text-align:center;float:left">
                                <img src="../assets/image/message-blue.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="imageshow">
                                <img src="../assets/image/message-red.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="!imageshow">
                              </div>
                              <div style="width:200px;height:100%;float:left;line-height:5px;color:#666666;font-family:SimSun;padding-top:15px;box-sizing:border-box">
                                <p style="font-size:15px">你的审核未通过</p>
                                <p style="font-size:13px">1天前</p>
                              </div>
                            </li>
                            <li class="liClass" v-on:mouseover="addActive($event)" v-on:mouseout="removeActive($event)">
                              <div style="width:80px;height:100%;text-align:center;float:left">
                                <img src="../assets/image/message-blue.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="imageshow">
                                <img src="../assets/image/message-red.png" alt="" style="width:35px;height:35px;margin:0 auto;margin-top:25px" v-show="!imageshow">
                              </div>
                              <div style="width:200px;height:100%;float:left;line-height:5px;color:#666666;font-family:SimSun;padding-top:15px;box-sizing:border-box">
                                <p style="font-size:15px">你的审核未通过</p>
                                <p style="font-size:13px">1天前</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </el-badge>
          </div> -->
          <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :append-to-body='true'>
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
          <div class="me">
            <el-dropdown style="color:#ffffff;font-size:16px" @command="handleCommand">
              <div class="user-avator">
                <img src="../assets/image/avatar.jpg">
                <span style="float:right;line-height:40px;margin-left:10px">{{userName}}</span>
              </div>
              <el-dropdown-menu slot="dropdown" style="margin-top:5px">
                <el-dropdown-item>
                  <router-link to="/me">
                    个人中心
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link to="/changePassword">
                    修改密码
                  </router-link>
                </el-dropdown-item>
                <!-- <el-dropdown-item command="loginout">退出</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="loginOut" @click="loginout">
            退出
          </div>
        </div>
      </el-row>
    </el-header>
    <el-container style="height: 100%">
      <div class="scroll">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" style="min-height: 100%;" background-color="#284261" text-color="#ABB1BB" active-text-color="#ffd04b" router :collapse="collapse" unique-opened>
          <!-- 折叠按钮 -->
          <div class="collapse-btn" @click="collapseChage" style="text-align:center;border-bottom:1px solid #536881">
            <div style="width:100%;height:100%" @click="sort">
              <img src="../assets/image/left.png" alt="" style="width:20px;height:20px;margin:8px" v-show="leftRight">
              <img src="../assets/image/right.png" alt="" style="width:20px;height:20px;margin:8px" v-show="!leftRight">
            </div>
          </div>
          <el-submenu v-for="(item, index) in menuList" v-bind:key="index" :index="index+''" style="min-height: 100%;" background-color="#172F4C">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title" style="font-size:16px;">{{item.name}}</span>
            </template>
            <el-menu-item-group v-for="(subitem,sub) in menuList[index].list" :key="sub">
              <el-menu-item :index="subitem.url" :class="subitem.icon" style="width:100%;">{{subitem.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <el-main style="position:relative">
        <!-- <el-header style="height:45px;background-color:#cccccc;overflow:hidden;line-height:45px">
          <span @click="$router.back(-1)"><img src="../assets/image/back.png" alt="" style="width:40px;height:45px;margin-left:-20px;border-right:1px solid #ffffff;"></span>
        </el-header> -->
        <!-- <el-header style="width:calc(100% - 237px);position:fixed;top:60px;left:235px;z-index:10000;height:45px;background-color:#ffffff;overflow:hidden;line-height:30px;padding:0px;border-bottom:1px solid #dddddd;"> -->
        <tags></tags>
        <!-- </el-header> -->
        <el-main>

          <transition :duration="300" mode="out-in" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" appear-active-class="animated zoomInDown">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>

        </el-main>

      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import Vue from "vue";
import store from "../store";
const bus = new Vue();
import tags from "./tags";

export default {
  components: {
    tags
  },
  computed: {
    defaultActive: function() {
      return this.$route.path.replace("/", "");
    }
  },
  data() {
    return {
      userName: "",
      dialogVisible: false,
      imageshow: true,
      menuList: {},
      collapse: false,
      activeName: "first",
      animate: true,
      leftRight: true,
      editableTabsValue2: "2",
      editableTabs2: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content"
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content"
        }
      ],
      tabIndex: 2
      //   list: [
      //   { name: "", site: "", gsmc: "" },
      // ]
    };
  },
  mounted() {
    this.getuserName();
  },
  methods: {
    getuserName() {
      this.$http
        .get(this.$server.glourl + "supervisor/queryAccInfo")
        .then(response => {
          //console.log(response.data);
          if (response.data.info.identity == 1) {
            this.userName = response.data.info.xsxm;
          } else {
            this.userName = response.data.info.xm;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    removeTab(targetName) {
      let tabs = this.editableTabs2;
      let activeName = this.editableTabsValue2;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
    },
    getMenuList() {
      this.$fetch(this.$server.glourl + "sys/menu/graduate").then(response => {
        //console.log(response);
        this.menuList = response.menuList;
      });
    },
    // 用户名下拉菜单选择事件
    // handleCommand(command) {
    //   //console.log(command);
    //   if (command == "loginout") {
    //     this.$store.commit("LOGOUT");
    //     this.$router.push("/login");
    //   }
    // },
    loginout() {
      // this.$store.commit("LOGOUT");
      // this.$router.push("/login");

      this.$confirm("是否退出本次登陆?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.commit("LOGOUT");
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          console.log(error);
        });
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      // 在中转站中设置触发事件
      bus.$emit("collapse", this.collapse);
    },
    // scroll() {
    //   let con1 = this.$refs.rollul;
    //   con1[0].style.marginTop = "60px";
    //   this.animate = !this.animate;
    //   var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
    //   setTimeout(function() {
    //     that.list.push(that.list[0]);
    //     that.list.shift();
    //     con1[0].style.marginTop = "0px";
    //     that.animate = !that.animate; // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
    //   }, 0);
    // },
    sort() {
      //根据你的leftRight判断此时的排序是升序还是降序
      //...排序方式
      this.leftRight = !this.leftRight;
    },
    //点击通知li标签
    addActive($event) {
      $event.currentTarget.className = "liClass active";
    },
    removeActive($event) {
      $event.currentTarget.className = "liClass";
    },
    //双击事件
    getInfo() {
      this.dialogVisible = true;
    },
    handleClose() {}
  },
  created() {
    // this.userName = store.state.token;
    // console.log(this.userName)
    this.getMenuList();

    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    // 监听上一步设置的事件，在回调函数中实现想要触发的操作
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
    setInterval(this.scroll, 7000);
    bus.$on("tags", msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagList = arr;
    });
  }
};
</script>

<style>
.el-menu-item-group__title {
  padding: 0px !important;
}
.el-scrollbar__bar.is-horizontal {
  height: 0;
}
.el-submenu__icon-arrow {
  right: 26px;
}
.move-enter-active,
.move-leave-active {
  transition: opacity 2s;
}
.move-enter,
.move-leave {
  opacity: 0;
}
</style>

<style scoped>
.el-header {
  background-color: #237ae4;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #284261;
}
.top-left {
  width: 30px;
  height: 30px;
  line-height: 80px;
  position: absolute;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 233px;
  min-height: 400px;
}
#newest-bill ul li {
  height: 60px;
  line-height: 30px;
}
.anim {
  transition: all 3s;
}
/* 个人头像 */
.user-avator {
  height: 45px;
  margin-top: 10px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  float: left;
}
.middle {
  max-width: 233px !important;
  /* -webkit-height: calc(100% - 60px);
  -moz-height: calc(100% - 60px);
  -ms-height: calc(100% - 60px);
  height: calc(100% - 60px); */
}
/* 侧边栏滚动 */
.scroll {
  display: block;
  overflow-y: scroll;
  overflow-x: hidden;
  transition: transform 0.25s ease-out;
  height: 100%;
  /* width:233px; */
  box-sizing: border-box;
}
/* .sidebar::-webkit-scrollbar {
  width: 0;
} */
/* 个人信息 */
.header-right {
  float: right;
  height: 60px;
}
.router-link-active {
  text-decoration: none;
  color: #606266;
}
a {
  text-decoration: none;
  color: #606266;
}
.me {
  height: 60px;
  float: left;
}
/* 小铃铛 */
.badge {
  float: left;
  margin-right: 20px;
  text-align: center;
  height: 60px;
}
.badge >>> .is-fixed {
  top: 18px;
  right: 15px;
  border: none;
  /* background-color: #EF1818; */
}
/* 下拉框上边距 */
.dropdown-top {
  margin-top: 0px !important;
}
.scroll >>> .el-scrollbar__wrap {
  overflow-x: hidden;
  overflow-y: auto;
  /* box-sizing: border-box; */
}

.el-tabs >>> .el-tabs__header {
  margin: 0 0 0;
}
.liClass {
  width: 100%;
  height: 80px;
  /* background: yellow; */
  list-style: none;
  border-bottom: 1px solid #dddddd;
}
.active {
  background: #e6f7ff;
}
.loginOut {
  width: 80px;
  float: left;
  margin-left: 20px;
}
.loginOut:hover {
  background: #418ae3;
}
</style>