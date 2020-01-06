import service from '../service/require.js'
export function login(params) {
    return service({
        url:'/user/login',
        method:'POST',
        data:params
    })
}
