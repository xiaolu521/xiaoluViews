import axios from 'axios'
import {getLocal, getToken} from "./auth";
import router from '../../router'
import {  message } from 'ant-design-vue';
const service = axios.create({
    baseURL: '/api/', // api的base_url
    withCredentials: true,
    timeout: 100000 // 请求超时时间
})
service.interceptors.request.use(config => {
    config.headers['token'] = getToken()
    config.data = config.data || {}
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
    result => {
        const res = result.data
        if(res.code != 0){
            // if(res.resultCode == 301){
            //     message.error('请先登录')
            //     router.push('/login')
            //     return Promise.reject(res.resultCode)
            // }
            message.error(res.msg || res.message)
            return Promise.reject(res.code)
        }
        return res
    },
    error => {
        message.error('接口错误请联系管理员')
        return Promise.reject(error)
    }
)
export default service
