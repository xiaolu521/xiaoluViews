import {dictionaryList, login, menuList} from "../../assets/api";
import {getToken, setLocal, setToken} from "../../assets/service/auth";
import router from '../../router'
import md5 from 'md5'
const app = {
    state: {
        dictionary: {},
        menuList: [],
        menuData: [],
        token: null
    },
    mutations: {
        GET_NATIONALITY: (state, data) => {
            state.dictionary = data
        },
        SET_MENUDATA: (state, data) => {
            state.menuData = []
            for (let item in data) {
                state.menuData.push(data[item])
            }
            console.log(data, 456)
        },
        SET_MENU_LIST: (state, data) => {
            state.menuList = []
            for (let item in data) {
                state.menuList.push(data[item])
            }
            console.log(data, 789)
        },
        SET_TOKEN: (state, data) => {
            state.token = data
        },
        LAYOUT:(state)=>{
            state.token = null
            state.menuList = null
            state.menuData = null
        }


    },
    actions: {
        layout({commit}){
            commit('LAYOUT')
        },
        setToken({commit}){
            commit('SET_TOKEN', getToken())
        },
        getNationality({commit}) {
            // if (getToken()) {
            //     dictionaryList()
            //         .then(res => {
            //             commit('GET_NATIONALITY', res.result)
            //         })
            // }
        },
        setMenuData({commit}, data) {
            commit('SET_MENUDATA', data)
        },
        setMenuList({commit}) {
            // if (getToken()) {
            //     menuList()
            //         .then(res => {
            //             commit('SET_MENU_LIST', res.result)
            //         })
            // }
        },
        login({commit},values){
           return login(values)
                .then(result=>{
                    commit('SET_TOKEN',result.data.token)
                    setToken(result.data.token)
                    setLocal('userInfo',result.data)
                    router.push('/')
                })
        }
    }
}
export default app
