<template>
	<div class="login">
		<header class="m-header">
			<router-link class="logo" tag="h1" to="/index"></router-link>
			<div class="lanChoose">简体中文<span class="arrow"></span></div>
		</header>
		<div class="login-content">
			<div class="login-logo">欢迎登录</div>
			<form action="#" class="login-form" @submit.prevent="toLogin">
				<div class="userName">
					<input type="text" name="username" v-model="userName" @blur="checkUserName(userName)" placeholder="请输入用户名">
				</div>
				<div class="userPwd">
					<input v-if="!showPwd" type="password" @blur="checkUserPwd(userPwd)" v-model="userPwd" name="userpwd" placeholder="请输入密码">
					<input v-if="showPwd" type="text" @blur="checkUserPwd(userPwd)" v-model="userPwd" name="userpwd" placeholder="请输入密码">
				</div>
				<div class="loginBtn">
					<input type="submit" value="登录">
				</div>
			</form>
			<div class="forgetPwd">
				<router-link to="/reset">忘记密码?</router-link>
			</div>
		</div>
		<prompt :tip="tip" ref="promptRef"></prompt>
	</div>
</template>

<script>
import {Login} from 'util/http'
import Prompt from 'components/Prompt/Prompt'

export default {
	data () {
		return {
			showPwd: false,
			userName: '',
			userPwd: '',
			tip: ''
		}
	},
	methods: {
		toLogin () {
			let params = new URLSearchParams()
			params.append('account', this.userName)
			params.append('pwd', this.userPwd)

			Login(params).then(res => {
				console.log(res.data)
				this.checkUserName(this.userName)
				this.checkUserPwd(this.userPwd)
				if (res.data.code === 40008) {
					this.tip = '会员账号错误'
					this.$refs.promptRef.show()
				}
				if (res.data.code === 40009) {
					this.tip = '会员密码错误'
					this.$refs.promptRef.show()
				}
				if (res.data.code === 400010) {
					this.tip = '登陆失败'
					this.$refs.promptRef.show()
				}
				if (res.data.code === 40003) {
					this.tip = this.res.msg
					this.$refs.promptRef.show()
				}
				if (res.data.code === 0) {
					localStorage.setItem('__token__', JSON.stringify(res.data.result))
					sessionStorage.setItem('__token__', JSON.stringify(res.data.result))
					this.tip = res.data.msg
					this.$refs.promptRef.show()
					this.$router.push('/vip')
				}
			})
		},
		checkUserName (userName) {
			if (!userName) {
				this.tip = '会员账号不能为空'
				this.$refs.promptRef.show()
			} else if (!/^\w{5,18}$/.test(userName)) {
				this.tip = '用户名不合法'
				this.$refs.promptRef.show()
			}
		},
		checkUserPwd (userpwd) {
			if (!userpwd) {
				this.tip = '账号密码不能为空'
				this.$refs.promptRef.show()
			} else if (!/^[a-zA-Z0-9]{8,16}$/.test(userpwd)) {
				this.tip = '账号密码不合法'
				this.$refs.promptRef.show()
			}
		}
	},
	components: {
		Prompt
	}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	@import './Login'
</style>
