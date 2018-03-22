<template>
	<div class="login">
		<header class="m-header">
			<h1 class="logo"></h1>
			<!--<div class="lanChoose">简体中文<span class="arrow"></span></div>-->
      <select class="select-lang" v-model="lang" @change="changeLang">
        <option selected value="ch">简体中文</option>
        <option value="en">English</option>
        <option value="ko">韩文</option>
        <option value="ja">日文</option>
      </select>
		</header>
		<div class="login-content">
			<div class="login-logo">{{ $t('login.welcome') }}</div>
			<form action="#" class="login-form" @submit.prevent="toLogin">
				<div class="userName">
					<input type="text" name="username" v-model="userName" @blur="checkUserName(userName)" :placeholder="$t('login.tips.name')">
				</div>
				<div class="userPwd">
					<input v-if="!showPwd" type="password" @blur="checkUserPwd(userPwd)" v-model="userPwd" name="userpwd" :placeholder="$t('login.tips.pwd')">
					<input v-if="showPwd" type="text" @blur="checkUserPwd(userPwd)" v-model="userPwd" name="userpwd" :placeholder="$t('login.tips.pwd')">
				</div>
				<div class="loginBtn">
          <input type="submit" :value="$t('common.Login')" />
				</div>
			</form>
			<div class="forgetPwd">
				<router-link to="/reset">{{ $t('login.forgotPwd') }}</router-link>
			</div>
		</div>
		<prompt :tip="tip" ref="promptRef"></prompt>
	</div>
</template>

<script>
import {Login} from 'util/http'
import Prompt from 'components/Prompt/Prompt'
import { i18n, loadLanguageAsync } from '../../common/js/i18n-setup.js'

export default {
	data () {
		return {
			showPwd: false,
			userName: '',
			userPwd: '',
			tip: '',
      lang: 'ch'
		}
	},
  created () {
	  this.lang = i18n.locale
  },
	methods: {
	  changeLang () {
      loadLanguageAsync(this.lang)
    },
		toLogin () {
      if(!this.checkUserName(this.userName)) return
      if(!this.checkUserPwd(this.userPwd)) return

			let params = new URLSearchParams()
			params.append('account', this.userName)
			params.append('pwd', this.userPwd)
			Login(params).then(res => {
				if (res.data.code === 40008 || res.data.code === 40009 || res.data.code === 400010) {
					this.tip = '用户名/密码错误，登录失败'
					this.$refs.promptRef.show()
				}
				if (res.data.code === 40003) {
					this.tip = this.res.msg
					this.$refs.promptRef.show()
				}
				if (res.data.code === 0) {
					localStorage.setItem('__token__', JSON.stringify(res.data.result))
					sessionStorage.setItem('__token__', JSON.stringify(res.data.result))
					this.tip = '登录成功'
					this.$refs.promptRef.show()
					this.$router.push('/vip')
				}
			})
		},
		checkUserName (userName) {
			if (!userName) {
				this.tip = '用户名不能为空'
				this.$refs.promptRef.show()
        return false
			} else if (!/^\w{5,18}$/.test(userName)) {
				this.tip = '用户名只允许输入5-18位字母或数字'
				this.$refs.promptRef.show()
        return false
			}
			return true
		},
		checkUserPwd (userpwd) {
			if (!userpwd) {
				this.tip = '密码不能为空'
				this.$refs.promptRef.show()
        return false
			} else if (!/^[a-zA-Z0-9]{8,16}$/.test(userpwd)) {
				this.tip = '密码不合法'
				this.$refs.promptRef.show()
        return false
			}
			return true
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
