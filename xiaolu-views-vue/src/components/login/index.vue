<template>
    <div class="login">
        <div class="login-item">
            <p>xiaolu-admin</p>
            <p>xiaolu管理平台</p>
        </div>
        <div class="login-item">
            <a-form :form="form" class="login-form" @submit="handleSubmit">
                <div class="login-label">
                    桐林创业管理平台
                </div>
                <a-form-item>
                    <a-input
                            v-decorator="['userName',{ rules: [{ required: true, message: '请输入用户名' }] }]"
                            placeholder="admin">
                        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input
                            v-decorator="['password',{ rules: [{ required: true, message: '请输入密码' }] }]"
                            type="password" placeholder="123456">
                        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-checkbox
                            v-decorator="['remember',{valuePropName: 'checked',initialValue: true},]">
                        记住密码
                    </a-checkbox>
                    <a class="login-form-forgot" href="">
                        忘记密码
                    </a>
                    <a-button type="primary" html-type="submit" class="login-form-button">
                        登录
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this, {name: 'coordinated'})
            }
        },
        created() {

        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.$store.dispatch('login',values)
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/style/unti.less";
    .login {
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .login-item{
            width: 100%;
            font-size: @oneFontSize;
            text-align: center;
        }
        .login-label{
            margin: @margin 0;
            text-align: center;
            font-size: @oneFontSize;
        }
        .login-form {
            width: 300px;
            margin: 0 auto;
            text-align: center;
        }

        .login-form-forgot {
            float: right;
        }

        .ant-form-item label {
            float: left;
        }

        .login-form-button {
            width: 100%;
        }
    }

    @media screen and (max-width: 575px) {
        .login-item:nth-child(1) {
            display: none;
        }
    }
</style>
