<template>
	<div class="changepwd">
		<HeadMenu :pageTitle="$t('userInfo.changeUserPwd')"></HeadMenu>
		<form action="" @submit.prevent="changeUserPwd">
			<ul class="nav-list">
				<li>
					<input
						type="password"
						@blur="checkConfirmPwd(confirmPwd)"
						ref="confirmPwd"
						name="pwd"
						v-model="confirmPwd"
						:placeholder="$t('userInfo.confirmPwd')"
					/>
				</li>
				<li>
					<input
						type="password"
						@blur="checkPwd(pwd)"
						ref="pwd"
						name="pwd"
						v-model="pwd"
						:placeholder="$t('userInfo.newPwd')"
					/>
				</li>
				<li>
					<input
						type="password"
						ref="cfmPwd"
						:placeholder="$t('userInfo.checkNewPwd')"
						v-model="cfmPwd"
						@blur="checkCfmPwd(cfmPwd)"
					/>
				</li>
			</ul>

			<div class="bottom">
				<input type="submit" class="oks" :value="$t('userInfo.commit')">
				<span class="back" @click="callbackUrl">{{ $t('userInfo.back') }}</span>
			</div>
		</form>

		<div class="mask" v-show="maskShow">
			<div class="alert-content">
				<div class="title">{{ $t('userInfo.dialog.safePwd') }}</div>
				<input
					class="confirmpwd"
					ref="safePwd"
					type="password"
					v-model="safePwd"
					@blur="checkSafePwd(safePwd)"
					:placeholder="$t('userInfo.dialog.tips')"
				>
				<div class="decision">
					<div class="cancel" @click="cancel">{{ $t('userInfo.dialog.cancel') }}</div>
					<div class="decide" @click="changeUserPwd">{{ $t('userInfo.dialog.save') }}</div>
				</div>
			</div>
		</div>
		<prompt :tip="tip" ref="promptRef"></prompt>
	</div>
</template>

<script>
	import {verifySafePwd, updatePwd, verifyPwd} from 'util/http'

	import HeadMenu from 'components/HeadMenu/HeadMenu'
	import Prompt from 'components/Prompt/Prompt'

	export default {
		data () {
			return {
				maskShow: false,
				pwd: '',
				cfmPwd: '',
				tip: '',
				confirmPwd: '',
        safePwd: '',
        lang: 'ch'
			}
		},
		components: {
			HeadMenu,
			Prompt
		},
		methods: {
			callbackUrl () {
				this.$router.go(-1)
			},
			changeUserPwd () {
				if (!this.confirmPwd) {
					this.tip = this.$t('userInfo.changePwdValidation.pwdNotEmpty')
					this.$refs.promptRef.show()
					return
				} else if (!/^[a-zA-Z0-9]{8,16}$/.test(this.confirmPwd)) {
					this.tip = this.$t('userInfo.changePwdValidation.pwdFormat')
					this.$refs.promptRef.show()
					return
				}

				if(!this.getVerifySafePwd()) {
					return
				}

				let verifyPwdParams = new URLSearchParams()
				let confirmPwd = this.$refs.confirmPwd.value

				/*if (safePwd === this.pwd) {
					this.tip = '密码和安全码不能相同'
					this.$refs.promptRef.show()
					return
				}*/

				verifyPwdParams.append('pwd', confirmPwd)
				verifyPwd(verifyPwdParams).then(_res => {
					if(0 !== _res.data.code) {
						this.tip = this.$t('userInfo.changePwdValidation.oldPwdErr')
						this.$refs.promptRef.show()
						this.cancel()
						return
					}

					let pwdToken = _res.data.result.pwdToken
					let verifyPwdd = this.$refs.cfmPwd.value
					let updatePwdParams = new URLSearchParams()
					updatePwdParams.append('pwd', verifyPwdd)
					updatePwdParams.append('pwd_token', pwdToken)

					updatePwd(updatePwdParams).then(res => {
						if (res.data.code === 40012) {
							this.tip = this.$t('userInfo.changePwdValidation.modPwdFailed')
							this.$refs.promptRef.show()
						}
						if (res.data.code === 0) {
							this.tip = this.$t('userInfo.changePwdValidation.modPwdSuccessed')
							this.$refs.promptRef.show()
							this.callbackUrl()
						}
						this.maskShow = false
						this.$refs.confirmPwd.value = ''
					})
				});
			},
			checkSafePwd (callback) {
				let safePwdParams = new URLSearchParams()
				let safePwd = this.$refs.safePwd.value
				safePwdParams.append('safe_pwd', safePwd)

				// 检验安全码
				verifySafePwd(safePwdParams).then(res => {
					if (res.data.code !== 0) {
						this.tip = this.$t('userInfo.changePwdValidation.safePwdErr')
						this.$refs.promptRef.show()
						return
					}
					if(callback) callback()

				})
			},
			cancel () {
				this.maskShow = false
				this.safePwd = ''
				this.$refs.confirmPwd.value = ''
			},
			getVerifySafePwd () {
				if (!this.confirmPwd) {
					this.tip = this.$t('userInfo.changePwdValidation.oldPwdNotEmpty')
					this.$refs.promptRef.show()
					this.$refs.confirmPwd.focus()
					return false
				} else if (!/^[a-zA-Z0-9]{8,16}$/.test(this.confirmPwd)) {
					this.tip = this.$t('userInfo.changePwdValidation.oldPwdFormat')
					this.$refs.promptRef.show()
					this.$refs.confirmPwd.focus()
					return false
				}
				if (!this.pwd) {
					this.tip = this.$t('userInfo.changePwdValidation.newPwdNotEmpty')
					this.$refs.promptRef.show()
					this.$refs.pwd.focus()
					return false
				} else if (!/^[a-zA-Z0-9]{8,16}$/.test(this.pwd)) {
					this.tip = this.$t('userInfo.changePwdValidation.pwdFormat')
					this.$refs.promptRef.show()
					this.$refs.pwd.focus()
					return false
				}
				if (!this.cfmPwd) {
					this.tip = this.$t('userInfo.changePwdValidation.verNewPwdNotEmpty')
					this.$refs.cfmPwd.focus()
					this.$refs.promptRef.show()
					return false
				} else if (this.cfmPwd !== this.pwd) {
					this.tip = this.$t('userInfo.changePwdValidation.newPwdDiff')
					this.$refs.promptRef.show()
					this.$refs.cfmPwd.focus()
					return false
				}
				// this.maskShow = true
				return true
			},
			checkPwd (pwd) {
				if (!/^[a-zA-Z0-9]{8,16}$/.test(pwd)) {
					this.tip = this.$t('userInfo.changePwdValidation.pwdFormat')
					this.$refs.promptRef.show()
				}
			},
			checkCfmPwd (cfmPwd) {
				if (cfmPwd !== this.pwd) {
					this.tip = this.$t('userInfo.changePwdValidation.newPwdDiff')
					this.$refs.promptRef.show()
				}
			},
			checkConfirmPwd (confirmPwd) {
				if (!/^[a-zA-Z0-9]{8,16}$/.test(confirmPwd)) {
					this.tip = this.$t('userInfo.changePwdValidation.oldPwdFormat')
					this.$refs.promptRef.show()
				}
			},
			checkSafePwd (safePwd) {
				if (!safePwd) {
					this.tip = this.$t('userInfo.changePwdValidation.safePwdNotEmpty')
					this.$refs.promptRef.show()
				} else if (!/^[a-zA-Z0-9]{8,16}$/.test(safePwd)) {
					this.tip = this.$t('userInfo.changePwdValidation.safePwdFormat')
					this.$refs.promptRef.show()
				}
			}
		}
	}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	.changepwd
		height 100%
		background #f2f2f2
		.form-content
			overflow hidden
			background #FFF
		.submit
			width 8.72rem
			height 1.12rem
			margin .853333rem auto 0
			input
				width 8.72rem
				height 1.12rem
				box-sizing border-box
				margin 0 auto
				background #ffca00
				border-radius .133333rem
				color #fff
				border none
				font-size .426667rem
		.mask
			position fixed
			z-index 1
			left 0
			top 0
			right 0
			bottom 0
			background rgba(0, 0, 0, .5)
			.alert-content
				position absolute
				width 7.28rem
				background #FFF
				left 50%
				top 50%
				margin-left -3.64rem
				margin-top -2.21333rem
				border-radius .133333rem
				.title
					height .56rem
					line-height .56rem
					margin 0 auto .64rem auto
					padding-top .906667rem
					text-align center
					font-size .426667rem
					color #333
				.confirmpwd
					display block
					width 6.293333rem
					height .8rem
					padding-left .213333rem
					margin 0 auto
					box-sizing border-box
					border 1px solid #CCC
					font-size .32rem
				.decision
					display flex
					height 1.12rem
					box-sizing border-box
					margin-top .373333rem
					border-top 1px solid #CCC
					font-size .373333rem
					.cancel, .decide
						width 50%
						height 1.106667rem
						text-align center
						line-height 1.106667rem
						color #666
						box-sizing border-box
					.decide
						color #FFAE11
						border-left 1px solid #CCC

		.bottom
			display :block
			margin-top: 15px
			width :100%
			input
				display block
				width 8.72rem
				height 1.12rem!important
				box-sizing border-box
				margin 0 auto
				background #ffca00
				border-radius .133333rem
				color #fff
				border none
				font-size .426667rem
			span
				display: block
				margin: .39999rem .6666rem
				border-radius: .133333rem
				text-align :center
				font-size :.426667rem
				color :white
				width 8.72rem
				height 1.12rem
				line-height 1.12rem
				&.back
					background-color :#D2D2D2
				&.oks
					background :#FFCA00
</style>
