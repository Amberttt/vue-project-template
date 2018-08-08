<template>
    <div class="login">
        <h1 class="title">后台管理系统</h1>
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
                label-width="0px"
                class="login-form">
            <el-form-item prop="userName">
                <el-input name="userName" type="text" v-model="loginForm.userName" autoComplete="on" placeholder="用户名"/>
            </el-form-item>
            <el-form-item prop="password">
                <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                        autoComplete="on"
                        placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item class="el-form-item__noborder">
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                    登 &nbsp;&nbsp; 录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/javascript">
import * as API from '@/api';
export default {
    data (){
        return {
            loginForm: {
                userName: '',
                password: ''
            },
            loginRules: {
                userName: [{required: true, trigger: 'blur', message: '请输入用户名!'}],
                password: [{required: true, trigger: 'blur', message: '请输入密码!'}]
            },
            loading: false
        }
    },
    methods: {
        // 登录
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    // this.$store.dispatch('Login', this.loginForm).then(() => {
                    //     this.loading = false
                    //     this.$router.push({path: '/body'})
                    // }).catch(() => {
                    //     this.loading = false
                    // })
                    API.login().then((data) => {
                        console.log(data,'---data---');
                        this.loading = false;
                        this.$router.push({
                            name: 'Main'
                        })
                    }).catch((res) => {
                        console.log(res,'---res---');
                        this.loading = false;
                    });
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.login
    // width: 400px;
    max-width: 280px;
    margin: 0 auto;
    .title
        padding-top : 60px;
        padding-bottom : 100px;
        margin: 0;
        text-align: center
        color: #666
    .login-form
        left: 0
        right: 0
        width: 100%;
        margin: 120px auto
        .el-form-item
            border-radius: 5px
            background-color: #fff
            color: #454545
        .title
            text-align: center
            color: #666
        .el-input
            display: inline-block
            vertical-align: middle
            border: 0
</style>
