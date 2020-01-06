import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import Layout from '@/views/App'

let upperFirst = (string) => {
    return string.substring(0, 1).toUpperCase() + string.substring(1);
};

let routers = require.context('@/views', true, /\.vue$/).keys()
let indexRouterMap = {}  // 用来存储以index.vue结尾的文件，因为index.vue是列表文件，需要加入layout（我们的菜单）,需要keepAlive，需要做权限判断

routers.forEach(item => {
    const paths = item.match(/[a-zA-Z]+/g)  //paths中存储了一个目录，二级目录，文件名
    if(paths[1] == 'model'){
        return
    }
    const routerChild = {  //定义路由对象
        path: paths[1] == 'index'?'/':paths[1],
        name: `${paths[0]}${upperFirst(paths[1])}`,   //upperFirst,lodash 首字母大写方法
        component(resolve) {
            require([`@/views${item.slice(1)}`], resolve)
        }
    }
    if (/App\.vue$/.test(item)) {

    } else {
        if (/index\.vue$/.test(item)) {  //判断是否以index。vue结尾
            indexRouterMap[paths[0]] = {
                path: '/' + paths[0],
                name:paths[0],
                component(resolve) {
                    require([`@/views${item.slice(1)}`], resolve)
                }
            }
        }else{
            indexRouterMap[`${paths[0]}${upperFirst(paths[1])}`] = {
                path: '/' + paths[0]+'/'+upperFirst(paths[1]),
                name:`${paths[0]}${upperFirst(paths[1])}`,
                component(resolve) {
                    require([`@/views${item.slice(1)}`], resolve)
                }
            }
        }
    }
})
const routes = [
    {
        path: '/',
        name: '/',
        redirect:'home',
        meta: {
            name: 'layout'
        },
        component: Layout,
        children:[
            ...Object.values(indexRouterMap)
        ]
    },
    {
        path: '/404',
        name: '404',
        meta: {
            name: '404'
        },
        component: () => import('@/components/404')
    },
    {
        path: '/login',
        name: 'login',
        meta:{
            name:'login'
        },
        component: ()=>import('@/components/login')
    },
    {
        path: '*',
        redirect: '/404'
    }
]
store.dispatch('setMenuData',routes.filter(item=> item.path == '/')[0].children)

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
