<template>
	<div class="login">
		<GHeader>
			<lang-seletor></lang-seletor>
		</GHeader>
		<div class="login-content">
			<div class="login-logo">{{ $t('login.welcome') }}</div>
			<form action="#" class="login-form" @submit.prevent="toLogin">
				<div class="userName">
					<input type="text" name="username" ref="userName" v-model="userName" :placeholder="$t('login.tips.name')">
				</div>
				<div class="userPwd">
					<input v-if="!showPwd" type="password" ref="userPwd" v-model="userPwd" name="userpwd" :placeholder="$t('login.tips.pwd')">
					<input v-if="showPwd" type="text" ref="userPwd" v-model="userPwd" name="userpwd" :placeholder="$t('login.tips.pwd')">
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
import GHeader from 'components/GHeader/GHeader'
import LangSeletor from 'components/LangSeletor/LangSeletor'
import {validator} from 'util/util'

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
    const token = JSON.parse(localStorage.getItem('__token__'))
    if(token) {
      this.$router.push('/vip')
    }
  },
	methods: {
    validate (fieldName, fieldValue) {
      const options = {
        userName: {
          rules: ['required', 'enOrNumber', { type: 'size', min: 5, max: 18 }],
          msg: {
            required: '用户名不能为空',
            enOrNumber: '用户名只允许输入5-18位字母或数字',
            size: '用户名只允许输入5-18位字母或数字'
          }
        },
        userPwd: {
          rules: ['required', 'enOrNumber', { type: 'size', min: 8, max: 16 }],
          msg: {
            required: '密码不能为空',
            enOrNumber: '密码错误',
            size: '密码错误'
          }
        }
      }
      const fieldOptions = options[fieldName]
      const res = validator.check(fieldValue, fieldOptions.rules)
      if (!res.valid) {
        this.tipShow(fieldOptions.msg[res.err])
        return false
      }
      return true
    },
    tipShow (tip) {
      this.tip = tip
      this.$refs.promptRef.show()
    },
		toLogin () {

      const fields = ['userName','userPwd']
      let isFormValid = true
      for(let i = 0; i < fields.length; i++) {
        if(!this.validate(fields[i], this[fields[i]])) {
          isFormValid = false
          this.$refs[fields[i]].focus()
          break;
        }
      }
      if(!isFormValid) return

			let params = new URLSearchParams()
			params.append('account', this.userName)
			params.append('pwd', this.userPwd)
			Login(params).then(res => {
				if (res.data.code === 40008 || res.data.code === 40009 || res.data.code === 400010) {
					this.tipShow('用户名/密码错误，登录失败')
				}
				if (res.data.code === 40003) {
					this.tipShow(this.res.msg)
				}
				if (res.data.code === 0) {
					localStorage.setItem('__token__', JSON.stringify(res.data.result))
					sessionStorage.setItem('__token__', JSON.stringify(res.data.result))
					this.tipShow('登录成功')
					this.$router.push('/vip')
				}
			})
		}
	},
	components: {
		Prompt,
    LangSeletor,
    GHeader
	}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	@import './Login'
</style>
