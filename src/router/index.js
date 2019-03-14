import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import Main from '@/components/main.vue'
import personal from '@/page/personal.vue'
//dszszgsq
import Apply from '@/page/dszszgsq/Apply.vue'
//xscggl
import acAchiev from '@/page/xscggl/acAchiev.vue'
// import reward from '@/page/xscggl/reward.vue'
import expertise from '@/page/xscggl/expertise.vue'
import publication from '@/page/xscggl/publication.vue'
import project from '@/page/xscggl/project.vue'
// xmgl
import overseasProject from '@/page/xmgl/overseasProject.vue'
import constructionProject from '@/page/xmgl/constructionProject.vue'
import excellentProject from '@/page/xmgl/excellentProject.vue'
import proReview from '@/page/xmgl/proReview.vue'
import projectDeclaration from '@/page/xmgl/projectDeclaration.vue'
import coreProject from '@/page/xmgl/coreProject.vue'
import eduProject from '@/page/xmgl/eduProject.vue'
import baseProject from '@/page/xmgl/baseProject.vue'
import szsq from '@/page/xmgl/szsq.vue'
import szsqjd from '@/page/xmgl/szsqjd.vue'
//gjhpygl
import GoAbroad from '@/page/gjhpygl/goAbroad.vue'
import IntAchive from '@/page/gjhpygl/intAchive.vue'
import IntApply from '@/page/gjhpygl/intApply.vue'
import ReviewProgress from '@/page/gjhpygl/reviewProgress.vue'
import TutorReview from '@/page/gjhpygl/tutorReview.vue'
import intProgress from '@/page/gjhpygl/intProgress.vue'

// manage
import degreeQualification from '@/page/xwsqgl/degreeQualification.vue'
import paperUploading from '@/page/xwsqgl/paperUploading.vue'
import paperFinal from '@/page/xwsqgl/paperFinal.vue'
import application from '@/page/xwsqgl/application.vue'
import paperReview from '@/page/xwsqgl/paperReview.vue'
// 个人信息
import me from '@/page/me/me.vue'
import changePassword from '@/page/me/changePassword.vue'
import store from '../store'
//phone
import logins from '@/page/phone/logins.vue'
import zzfw from '@/page/phone/zzfw.vue'
import cjd from '@/page/phone/cjd.vue'
import cjd_En from '@/page/phone/cjd_En.vue'
import grda from '@/page/phone/grda.vue'
import grkb from '@/page/phone/grkb.vue'
import sljbm from '@/page/phone/sljbm.vue'
import zcbd from '@/page/phone/zcbd.vue'
import zcbdMap from '@/page/phone/zcbdMap.vue'
import yjbx from '@/page/phone/yjbx.vue'
import bxcg from '@/page/phone/bxcg.vue'
//zdpage
import goAbroads from '@/page/zdpage/goAbroads.vue'
import goAbroadsEn from '@/page/zdpage/goAbroadsEn.vue'
import graduate from '@/page/zdpage/graduate.vue'
import personals from '@/page/zdpage/personals.vue'
import teacher from '@/page/zdpage/teacher.vue'
import yjszdzm from '@/page/zdpage/yjszdzm.vue'
import white from '@/page/zdpage/white.vue'
Vue.use(Router) // 注册vue-router

const router = new Router({
  //去掉地址中的哈希#
  // mode: "history",
  routes: [{
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      redirect: '/personal',
      meta: {
        title: '个人信息',
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        // me
        {
          path: '/me',
          component: me,
          meta: {
            title: '个人中心',
            requireAuth: true
          }
        },
        {
          path: '/changePassword',
          component: changePassword,
          meta: {
            title: '修改密码',
            requireAuth: true
          }
        },
        {
          path: '/apply',
          component: Apply,
          meta: {
            title: '在线申请',
            requireAuth: true
          },
        },
        {
          path: '/personal',
          component: personal,
          meta: {
            title: '个人信息',
            requireAuth: true
          }
        },
        {
          path: '/acAchiev',
          component: acAchiev,
          meta: {
            title: '学术成果录入',
            requireAuth: true
          }
        },
        // {
        //   path: '/reward',
        //   component: reward,
        //   meta: {
        //     title: '论文定稿',
        //     requireAuth: true
        //   }
        // },
        {
          path: '/expertise',
          component: expertise,
          meta: {
            title: '技术专利',
            requireAuth: true
          }
        },
        {
          path: '/publication',
          component: publication,
          meta: {
            title: '发表著作',
            requireAuth: true
          }
        },
        {
          path: '/project',
          component: project,
          meta: {
            title: '科研项目',
            requireAuth: true
          }
        },
        {
          path: '/projectDeclaration',
          component: projectDeclaration,
          meta: {
            title: '项目申报',
            requireAuth: true
          }
        },
        {
          path: '/coreProject',
          component: coreProject,
          meta: {
            title: '核心课程项目',
            requireAuth: true
          }
        },
        {
          path: '/eduProject',
          component: eduProject,
          meta: {
            title: '教改项目',
            requireAuth: true
          }
        },
        {
          path: '/baseProject',
          component: baseProject,
          meta: {
            title: '实践基地项目',
            requireAuth: true
          }
        },
        {
          path: '/goAbroad',
          component: GoAbroad,
          meta: {
            title: '出国报备',
            requireAuth: true
          }
        },
        {
          path: '/intApply',
          component: IntApply,
          meta: {
            title: '国际化专项项目申请',
            requireAuth: true
          }
        },
        {
          path: '/intProgress',
          component: intProgress,
          meta: {
            title: '国际化项目报备进度',
            requireAuth: true
          }
        },

        {
          path: '/intAchive',
          component: IntAchive,
          meta: {
            title: '国际化培养成果录入',
            requireAuth: true
          }
        },
        {
          path: '/reviewProgress',
          component: ReviewProgress,
          meta: {
            title: '审核进度',
            requireAuth: true
          }
        },
        {
          path: '/tutorReview',
          component: TutorReview,
          meta: {
            title: '导师审核',
            requireAuth: true
          }
        },
        {
          path: '/degreeQualification',
          component: degreeQualification,
          meta: {
            title: '学位资格申请',
            requireAuth: true
          }
        },
        {
          path: '/paperUploading',
          component: paperUploading,
          meta: {
            title: '论文上传',
            requireAuth: true
          }
        },
        {
          path: '/paperFinal',
          component: paperFinal,
          meta: {
            title: '论文定稿',
            requireAuth: true
          }
        },
        {
          path: '/application',
          component: application,
          meta: {
            title: '学位申请',
            requireAuth: true
          }
        },
        {
          path: '/paperReview',
          component: paperReview,
          meta: {
            title: '优秀论文评审',
            requireAuth: true
          }
        },
        {
          path: '/projectDeclaration',
          component: projectDeclaration,
          meta: {
            title: '项目申报',
            requireAuth: true
          }
        },
        {
          path: '/overseasProject',
          component: overseasProject,
          meta: {
            title: '海外实践基地项目',
            requireAuth: true
          }
        },
        {
          path: '/constructionProject',
          component: constructionProject,
          meta: {
            title: '教材建设项目',
            requireAuth: true
          }
        },
        {
          path: '/excellentProject',
          component: excellentProject,
          meta: {
            title: '优博培育项目',
            requireAuth: true
          }
        },
        {
          path: '/proReview',
          component: proReview,
          meta: {
            title: '导师审核',
            requireAuth: true
          }
        }, 
        {
          path: '/szsq',
          component: szsq,
          meta: {
            title: '思政申请',
            requireAuth: true
          }
        }, 
        {
          path: '/szsqjd',
          component: szsqjd,
          meta: {
            title: '思政申请进度',
            requireAuth: true
          }
        },
      ]
    },
    //phone
    {
      path: '/logins',
      name: 'logins',
      component: logins,
      meta: {
        index: 0,
        title: '登陆',
        // requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/zzfw',
      name: 'zzfw',
      component: zzfw,
      meta: {
        title: '自助服务',
        // requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/cjd',
      name: 'cjd',
      component: cjd,
      meta: {
        title: '成绩单',
        // requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/cjd_En',
      name: 'cjd_En',
      component: cjd_En,
      meta: {
        title: '成绩单',
        // requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/grda',
      name: 'grda',
      component: grda,
      meta: {
        title: '个人档案',
        // requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/grkb',
      name: 'grkb',
      component: grkb,
      meta: {
        title: '个人课表',
        // requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/sljbm',
      name: 'sljbm',
      component: sljbm,
      meta: {
        title: '英语四六级报名',
        // requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/zcbd',
      name: 'zcbd',
      component: zcbd,
      meta: {
        title: '研究生注册报到',
        // requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/zcbdMap',
      name: 'zcbdMap',
      component: zcbdMap,
      meta: {
        title: '注册报到',
        // requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/yjbx',
      name: 'yjbx',
      component: yjbx,
      meta: {
        title: '一键报修',
        // requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/bxcg',
      name: 'bxcg',
      component: bxcg,
      meta: {
        title: '报修成功',
        // requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //zdpage
    {
      path: '/goAbroads',
      name: 'goAbroads',
      component: goAbroads,
    },
    {
      path: '/goAbroadsEn',
      name: 'goAbroadsEn',
      component: goAbroadsEn,
    },
    {
      path: '/graduate',
      name: 'graduate',
      component: graduate,
    },
    {
      path: '/personals',
      name: 'personals',
      component: personals,
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: teacher,
    }, ,
    {
      path: '/yjszdzm',
      name: 'yjszdzm',
      component: yjszdzm,
    },
    {
      path: '/white',
      name: 'white',
      component: white,
    }
  ]
})

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (token) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      console.log('该页面需要登陆')
      next({
        path: '/login'
        // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
export default router
