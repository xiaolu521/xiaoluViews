<template>
    <a-layout id="components-layout-demo-custom-trigger" class="wrap">
        <a-layout-sider :trigger="null" collapsible v-model="collapsed"
                        :style="{ overflow: 'auto', height: '100vh'}">
            <div class="logo" style="padding: 0;">
                <img src="../assets/images/logo.png" width="170px" alt="">
            </div>
            <!--<a-menu theme="dark" mode="inline" v-model="navArray">-->
            <!--<a-sub-menu v-if="item.children.length" v-for="(item,index) in $store.getters.menuList" :key="item.id">-->
            <!--<span slot="title"><a-icon :type="item.menuIcon" /><span>{{item.menuName}}</span></span>-->
            <!--<a-menu-item :key="item2.id" v-for="(item2,index2) in item.children"  @click="next(item2)">-->
            <!--<a-icon :type="item2.menuIcon"/>-->
            <!--<span>{{item2.menuName}}</span>-->
            <!--</a-menu-item>-->
            <!--</a-sub-menu>-->
            <!--<a-menu-item v-else :key="item.id" @click="next(item)">-->
            <!--<a-icon :type="item.menuIcon"/>-->
            <!--<span>{{item.menuName}}</span>-->
            <!--</a-menu-item>-->
            <!--</a-menu>-->
            <a-menu theme="dark" mode="inline" :defaultSelectedKeys="[navId]">
                <a-menu-item key="1" @click="$router.push('/')">
                    <a-icon type="user"/>
                    <span>首页</span>
                </a-menu-item>
                <a-menu-item key="2" @click="$router.push('/user')">
                    <a-icon type="user"/>
                    <span>用户</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="()=> collapsed = !collapsed">
                </a-icon>
                <div class="head-item">
                    <a-dropdown>
                        <a class="ant-dropdown-link" href="#"> admin
                            <a-icon type="down"/>
                        </a>
                        <a-menu slot="overlay">
                            <a-menu-item>首页</a-menu-item>
                            <a-menu-item @click="layout">登出</a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </div>
                <div class="head-item head-router" @click="navFlag=!navFlag">
                    <a-icon :style="{transform:'rotate('+(navFlag?'45':'0')+'deg)'}" type="appstore"/>
                </div>
                <div class="head-nav" :style="{top:navFlag?'44px':'-50px'}" @mouseleave="navIndex=null">
                    <a-tabs v-model="navId" @change="callback">
                        <a-tab-pane :key="item.id" v-for="(item,index) in navList">
                            <span slot="tab" @mouseenter="navIndex=index">
                                {{item.menuName}}
                                <a-icon type="close" v-show="navIndex==index" @click.stop="delNav(index)"/>
                            </span>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </a-layout-header>
            <a-layout-content
                    :style="{ margin: '10px', padding: '10px', background: '#fff',overflowY:'scroll',overflowX:'hidden'  }"
            >
                <router-view>
                </router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
    import {
        clearToken,
        delSession,
        getLocal,
        getSession,
        removeToken,
        setLocal,
        setSession
    } from "../assets/service/auth";

    export default {
        name: "App",
        data() {
            return {
                collapsed: false,
                navFlag: false,
                navId: Number,
                navArray: Array,
                navList: Object,
                navIndex: null
            };
        },
        created() {
            this.navId = getSession('navId') ? Number(getSession('navId')) : 1
            this.navArray = getSession('navId') ? [Number(getSession('navId'))] : []
            this.navList = getSession('navList') ? JSON.parse(getSession('navList')) : []
        },
        beforeCreate() {
            this.$store.dispatch('getNationality')
            this.$store.dispatch('setMenuList')
            this.$store.dispatch('setToken')
        },
        methods: {
            next(item) {
                console.log(item)
                if (item.menuStatus == '是') {
                    window.open(item.menuUrl, '_blank')
                    return
                }
                this.navId = item.id
                if (this.navList.filter(item2 => item2.id === item.id).length == 0) {
                    this.navList.push(item)
                    setSession('navList', JSON.stringify(this.navList))
                    console.log(this.navList, 123)
                }
                this.$router.push(item.menuUrl)
            },
            callback(key) {
                const target = this.navList.filter(item => item.id === key)[0]
                this.$router.push(target.menuUrl)
            },
            delNav(index) {
                console.log(index)
                this.navList.splice(index, 1)
                setSession('navList', JSON.stringify(this.navList))
            },
            layout() {
                removeToken()
                delSession('navId')
                delSession('navList')
                this.$store.dispatch('layout')
                this.$router.push('/login')
            }
        },
        watch: {
            $route() {
                const target = this.navList.filter(item => item.menuUrl === this.$route.path)[0]
                this.navId = target.id
                this.navArray = [target.id]
                setSession('navId', target.id)
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../assets/style/unti";

    .wrap {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .trigger {
            font-size: 18px;
            line-height: 48px;
            padding: 0 24px;
            cursor: pointer;
            transition: color 0.3s;
        }

        .ant-layout-header {
            height: 40px;
            line-height: 40px;
            position: relative;
            width: 100%;
        }

        .trigger:hover {
            color: #1890ff;
        }

        .logo {
            margin: 16px;
        }

        .head-item {
            float: right;
            text-align: center;
            margin: 0 @margin;

            .ant-dropdown-link {
                width: 100%;
                display: inline-block;
            }
        }

        .head-router {
            i {
                font-size: 18px;
                line-height: 48px;
                transition: 0.5s;
                transform: rotate(0deg)
            }
        }

        .head-nav {
            position: absolute;
            top: -44px;
            left: 10px;
            width: calc(100% - 22px);
            box-sizing: border-box;
            height: 40px;
            background-color: #fff;
            box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.25);
            z-index: 99;
            border-radius: 5px;
            transition: 0.5s;
            overflow: hidden;
            display: flex;
            align-items: center;
        }
    }
</style>
<style lang="less">
    .head-nav {
        .ant-tabs-nav .ant-tabs-tab {
            padding: 0 16px;
            height: 40px;
            line-height: 40px;
        }

        .ant-tabs-bar {
            margin: 0 !important;
        }

        .ant-tabs-tab {
            margin: 0 !important;

            .anticon {
                font-size: 12px;
                margin-right: 8px;
                position: absolute;
                top: 14px;
                right: -6px;
            }
        }

        .ant-tabs-tab {
            transition: .5s;
        }
    }
</style>
