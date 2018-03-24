<template>
	<div class="jiangjin-detail">
		<HeadMenu :pageTitle="title"></HeadMenu>
		<form action="" @submit.prevent="getVerifySafePwd">
			<div>
				<ul class="nav-list">
					<li v-if="type === 'nickname'">
						<input
							type="text"
							placeholder="输入2-16位英文或汉字"
							v-model="userInfo.nickname"
							ref="nickName"
							@blur="checkNickname(userInfo.nickname)"/>
					</li>
					<li v-if="type !== 'nickname'">
						<input
							type="text"
							placeholder="输入邮箱地址"
							v-model="userInfo.email"
							ref="email"
							@blur="checkEmail(userInfo.email)"/>
					</li>
				</ul>
			</div>
			<div class="bottom">
				<input type="submit" class="oks" value="确认修改" />
				<span class="back" @click="callbackUrl">返回</span>
			</div>
		</form>
		<div class="mask" v-show="maskShow">
			<div class="alert-content">
				<div class="title">输入当前安全码</div>
				<input
					class="confirmpwd"
					ref="confirmPwd"
					type="password"
					v-model="safePwd"
					placeholder="输入您的当前安全码"
					@blur="checkSafePwd(safePwd)"
				>
				<div class="decision">
					<div class="cancel" @click="cancel">取消</div>
					<div class="decide" @click="changeUserInfo">确定</div>
				</div>
			</div>
		</div>
		<prompt :tip="tip" ref="promptRef"></prompt>
	</div>
</template>

<script>
import {getAccountInfo, updateNickname, updateEmail, verifySafePwd} from 'util/http'
import HeadMenu from 'components/HeadMenu/HeadMenu'
import Prompt from 'components/Prompt/Prompt'

export default {
	data () {
		return {
			title: '',
			type: '',
			userInfo: {},
			safePwd: '',
			maskShow: false,
			tip: ''
		}
	},
	components: {
		HeadMenu,
		Prompt
	},
	mounted () {
		this.type = this.$route.params.type
		if (this.type === 'nickname') {
			this.title = '会员姓名'
		} else {
			this.title = '邮箱'
		}

		this.getUserInfo()
	},
	methods: {
		// 获取数据
		getUserInfo () {
			// const level = ['一星会员', '二星会员', '三星会员', '四星会员', '五星会员', '六星会员']
			getAccountInfo().then(res => {
				if (res.data.code === 0) {
					// res.data.result.level = level[res.data.result.level - 1]
					this.userInfo = res.data.result
				}
			})
		},

		// 检查会员姓名
		checkNickname (nickName) {
			if (!nickName) {
				this.tip = '会员姓名不能为空'
				this.$refs.promptRef.show()
			} else if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(nickName)) {
				this.tip = '会员姓名只能输入汉字或字母'
				this.$refs.promptRef.show()
			}
			else if (this.getByteLen(nickName)<4 || this.getByteLen(nickName) > 16) {
				this.tip = '字符长度需要在4-16之间'
				this.$refs.promptRef.show()
			}
		},

		// 检查邮箱
		checkEmail (email) {
			if (!email) {
				this.tip = '邮箱不能为空'
				this.$refs.promptRef.show()
			} else if (!/^(\w-*\.*)+@(\w-?)+(\.(com|cn|net))+$/.test(email)) {
				this.tip = '邮箱格式不正确'
				this.$refs.promptRef.show()
			}
		},
    checkSafePwd (safepwd) {
      if (!safepwd) {
        this.tip = '安全码不能为空'
        this.$refs.promptRef.show()
      } else if (!/^[a-zA-Z0-9]{8,16}$/.test(safepwd)) {
        this.tip = '安全码格式不正确'
        this.$refs.promptRef.show()
      }
    },
		getByteLen(val) { //  输出汉字和字母的字符数
			return val.length
		},
		getVerifySafePwd () {
			if (!this.userInfo.nickname) {
				this.tip = '会员姓名不能为空'
				this.$refs.promptRef.show()
				return
			} else if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.userInfo.nickname)) {
				this.tip = '会员姓名只能输入汉字或字母'
				this.$refs.promptRef.show()
				return
			} else if (this.userInfo.nickname.length < 2 || this.userInfo.nickname.length > 16) {
				this.tip = '会员姓名长度只允许输入2-16位字母或数字'
				this.$refs.promptRef.show()
				return
			}
			if (!this.userInfo.email) {
				this.tip = '邮箱不能为空'
				this.$refs.promptRef.show()
				return
			} else if (!/^(\w-*\.*)+@(\w-?)+(\.(com|cn|net))+$/.test(this.userInfo.email)) {
				this.tip = '邮箱格式不正确'
				this.$refs.promptRef.show()
				return
			}
			this.maskShow = true
		},
		cancel () {
			this.maskShow = false
			this.safePwd = ''
			this.$refs.confirmPwd.value = ''
		},
		// 保存修改
		changeUserInfo () {
			if (!this.safePwd) {
				this.tip = '安全码不能为空'
				this.$refs.promptRef.show()
				return
			} else if (!/^[a-zA-Z0-9]{8,16}$/.test(this.safePwd)) {
				this.tip = '安全码格式不正确'
				this.$refs.promptRef.show()
				return
			}

      // 验证安全码
			let confirmPwd = this.$refs.confirmPwd.value
      let safePwdToken = ''
			let paramsForGetVerifySafePwd = new URLSearchParams()
      paramsForGetVerifySafePwd.append('safe_pwd', confirmPwd)

      verifySafePwd(paramsForGetVerifySafePwd).then(res => {
        if (res.data.code === 40011) {
          this.tip = '会员安全码错误'
          this.$refs.promptRef.show()
          return
        }
        safePwdToken = res.data.result.safePwdToken

        if (this.type === 'nickname') {
          let paramsForUpdateNickname = new URLSearchParams()
          let nickName = this.$refs.nickName.value
          paramsForUpdateNickname.append('safe_pwd_token', safePwdToken)
          paramsForUpdateNickname.append('nickname', nickName)
          updateNickname(paramsForUpdateNickname).then(res => {
            // this.$refs.confirmPwd.value = ''
            if (res.data.code === 0) {
              this.tip = '修改成功'
              this.$refs.promptRef.show()
              this.callbackUrl()
            }
            this.maskShow = false
          })
        } else {
          let paramsForUpdateEmail = new URLSearchParams()
          let email = this.$refs.email.value
          paramsForUpdateEmail.append('safe_pwd_token', safePwdToken)
          paramsForUpdateEmail.append('email', email)
          updateEmail(paramsForUpdateEmail).then(res => {
            // this.$refs.confirmPwd.value = ''
            if (res.data.code === 0) {
              this.tip = res.data.msg
              this.$refs.promptRef.show()
            }
            this.maskShow = false
          })
        }
      })
		},

		// 返回
		callbackUrl () {
			this.$router.go(-1)
		},
	}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	.jiangjin-detail
		height 100%
		background #f2f2f2
		.mask
			position fixed
			z-index 1
			left 0
			top 0
			right 0
			bottom 0
			background rgba(0, 0, 0, .5)
			.alert-content
				position relative
				width 7.28rem
				height 4.426667rem
				background #FFF
				left 50%
				// top 50%
				top 6.493333rem
				margin-left -3.64rem
				// margin-top -1.546667rem
				border-radius .133333rem
				.title
					height .56rem
					line-height .56rem
					margin 0 auto .39rem auto
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
				height 1.333333rem!important
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
				height :1.333333rem
				line-height :1.333333rem
				&.back
					background-color :#D2D2D2
				&.oks
					background :#FFCA00
</style>

<style>
	.nav-list input{
		width: 100%;
		border: none;
		padding-left: 0;
		padding-right: 0;
	}
</style>

