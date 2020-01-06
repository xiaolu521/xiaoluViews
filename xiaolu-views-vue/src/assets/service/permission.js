import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { message} from 'ant-design-vue'
import router from '@/router'
import {getToken} from "./auth";

let white = [
  '/login'
]
router.beforeEach((to, from, next) => {
  NProgress.start()
  if(white.indexOf(to.path) === -1){
    if(getToken()){
      next()
    }else{
      message.error('请先登录！')
      router.push('/login')
    }
  }else{
    next()
  }
  NProgress.done()
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
