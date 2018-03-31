<template>
	<div class="main app-content auth-prompt">
		<GHeader>
			<lang-seletor></lang-seletor>
		</GHeader>
		<div class="triangle"></div>
		<p class="page-title">{{ $t('password.auth') }}</p>
		<div class="input-box">
			<input type="text" v-model="account" readonly="readonly">
			<input type="email" v-model="userEmail" readonly="readonly">
			<div class="box-auth">
				<input type="text" :placeholder="$t('password.authTips.email')" v-model="verifyCode" ref="verifyCode">
				<button type="button" @click="getAuth" :disabled="btndisabled">{{bthTxt}}</button>
			</div>
			<input
				type="password"
				:placeholder="$t('password.authTips.pwd')"
				v-model="pwd"
				@blur="validate('pwd', pwd)"
				ref="pwd">
			<input
				type="password"
				:placeholder="$t('password.authTips.pwd')"
				v-model="cfmPwd"
				@blur="checkCfmPwd(cfmPwd)"
				ref="cfmPwd">
			<input
				type="password"
				:placeholder="$t('password.authTips.safePwd')"
				v-model="safepwd"
				@blur="validate('safepwd', safepwd)"
				ref="safepwd">
			<input
				type="password"
				:placeholder="$t('password.authTips.checkSafePwd')"
				v-model="cfmSafepwd"
				@blur="checkCfmSafepwd(cfmSafepwd)"
				ref="cfmSafepwd">
			<button type="button" @click="onSubmit" style="margin-bottom: 10px;width: 100%;">{{ $t('password.commit') }}</button>
		</div>
		<prompt :tip="tip" ref="promptAlert"></prompt>
	</div>
</template>

<script>
	import GHeader from 'components/GHeader/GHeader'
	import LangSeletor from 'components/LangSeletor/LangSeletor'
	import Prompt from 'components/Prompt/Prompt'
	import {sendVerifyCodeEmail } from 'util/http'
	import {validator} from 'util/util'
	import { resetPwdAndSafePwd } from 'util/http'

	export default {
		name: 'auth',
		data () {
			return {
				account: undefined,
				userEmail: undefined,
				verifyCode: undefined,
				pwd: '',
				cfmPwd: '',
				safepwd: '',
				cfmSafepwd: '',
				tip: '',
				btndisabled: false,
				params:{},
				InterVal : undefined, //  定时器
				count: 60,
				curCount: undefined,
				lang: 'ch'
			}
		},
		components: {
			Prompt,
			GHeader,
			LangSeletor
		},
		mounted (){
			this.account = sessionStorage.getItem('account')
			this.userEmail = sessionStorage.getItem('userEmail')
		},
		computed: {
	    bthTxt () {
	    	return this.btndisabled ? this.curCount + 's' : this.$t('password.send')
	    }
	  },
		methods:{
			getAuth(){  //  获取验证码
				sendVerifyCodeEmail(this.account).then(res =>{

					if (res.data.code === 0) {
						this.btndisabled=true;
						this.curCount = this.count;
						this.InterVal = window.setInterval(this.SetRemainTime, 1000);
					}else{
						this.tip = res.data.msg
						this.$refs.promptAlert.show()
					}
				})
			},

			onSubmit(){
				if (!this.verifyCode) {
					this.tip = this.$t('password.authValidation.verNotEmpty')
					this.$refs.promptAlert.show()
					this.$refs.verifyCode.focus()
					return
				}
				const isPwdCorrect = this.validate('pwd', this.pwd) && this.checkCfmPwd(this.cfmPwd)
				this.$refs.pwd.focus()
				if(!isPwdCorrect) return

				const isSafePwdCorrect = this.validate('safepwd', this.safepwd) && this.checkCfmSafepwd(this.cfmSafepwd)
				this.$refs.safepwd.focus()
				if(!isSafePwdCorrect) return
				let params = new URLSearchParams()
				params.append('account', this.account)
				params.append('pwd', this.pwd)
				params.append('safePwd', this.safepwd)
				params.append('verifyCode', this.verifyCode)

				resetPwdAndSafePwd(params).then(res =>{
					const {code, msg} = res.data
					if (code === 0) {
						this.tipShow(this.$t('password.resetSuccess'))
						this.$router.replace('/login')
					} else {
						this.tipShow(msg)
					}
				})
			},
			getByteLen(val) { //  输出汉字和字母的字符数
				let len = 0;
				for (let i = 0; i < val.length; i++) {
					let a = val.charAt(i);
					if (a.match(/[^\x00-\xff]/ig) != null) {
						len += 2;
					}
					else {
						len += 1;
					}
				}
				return len;
			},
			SetRemainTime(){
				if(this.curCount==0){
					window.clearInterval(this.InterVal);//停止计时器
					this.btndisabled=false;
				}else{
					this.curCount--;
				}
			},

			// 密码等校验
			validate (fieldName, fieldValue) {
				const options = {
					pwd: {
						rules: ['required', 'enOrNumber', { type: 'size', min: 8, max: 16 }],
						msg: {
							required: this.$t('password.authValidation.pwdNotEmpty'),
							enOrNumber: this.$t('password.authValidation.pwtFormat'),
							size: this.$t('password.authValidation.pwtFormat')
						}
					},
					safepwd: {
						rules: ['required', 'enOrNumber', { type: 'size', min: 8, max: 16 }],
						msg: {
							required: this.$t('password.authValidation.safePwdNotEmpty'),
							enOrNumber: this.$t('password.authValidation.safePwdFormat'),
							size: this.$t('password.authValidation.safePwdFormat')
						}
					},
				}
				const fieldOptions = options[fieldName]
				const res = validator.check(fieldValue, fieldOptions.rules)
				if (!res.valid) {
					this.tipShow(fieldOptions.msg[res.err])
					return false
				}
				return true
			},

			// 确认密码
			checkCfmPwd (cfmPwd) {
				let password = this.$refs.pwd.value

				if (!cfmPwd) {
					this.tipShow(this.$t('password.authValidation.checkPwd'))
					return false
				}

				if (password !== cfmPwd) {
					this.tipShow(this.$t('password.authValidation.pwdDiff'))
					return false
				}

				return true
			},

			// 确认安全码
			checkCfmSafepwd (cfmSafepwd) {
				let safeword = this.$refs.safepwd.value

				if (!cfmSafepwd) {
					this.tipShow(this.$t('password.authValidation.checkSafePwd'))
					return false
				}

				if (safeword !== cfmSafepwd) {
					this.tipShow(this.$t('password.authValidation.safePwdDiff'))
					return false
				}

				return true
			},

			tipShow (msg) {
				this.tip = msg
				this.$refs.promptAlert.show()
			},
		}
	}
</script>

<style scoped lang='stylus'>
	.main
		height 100%
		background-color #faf8f8
		overflow auto
		.m-header
			position absolute
			top 0
		p.page-title
			text-align center
			font-size 24px
			line-height 40px
			margin 5px 0 0
			min-height 40px
		.input-box
			width 80%
			margin 0 auto 18px auto
			.box-auth
				display: flex
				justify-content space-between
				min-height 52px
				>button
					&:disabled
						background-color #cccccc
						color #fff
					border-radius 6px
					background-color #FFCA00
					color: #fff
					font-size .373333rem
					line-height 1
					border none
					margin 5px 0 5px 5px
					display inline-block
					width 3rem
		input
			border-radius 6px
			border 1px solid #ccc
			font-size .373333rem
			line-height 1
			padding 6px 12px
			margin 5px 0
			width 100%
			box-sizing border-box
		button
			width 80%
			margin 0 auto
			border-radius 6px
			background-color #FFCA00
			font-size 18px
			line-height 38px
			min-height 38px
			border none
	.triangle
		height 0.186rem
		margin-top 2px
		background url('./Triangle.png') center center / 0.293rem 0.186rem no-repeat
</style>
