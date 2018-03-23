<template>
	<div class="changepwd">
		<HeadMenu pageTitle="修改密码"></HeadMenu>
		<form action="" @submit.prevent="getVerifySafePwd">
      <div>
        <ul class="nav-list">
          <li>
            <input
              type="password"
              @blur="checkConfirmPwd(confirmPwd)"
              ref="confirmPwd"
              name="pwd"
              v-model="confirmPwd"
              placeholder="输入旧密码"
            />
          </li>
          <li>
            <input
              type="password"
              @blur="checkPwd(pwd)"
              ref="pwd"
              name="pwd"
              v-model="pwd"
              placeholder="输入新的密码"
            />
          </li>
          <li>
            <input
              type="password"
              ref="verifyPwd"
              placeholder="再次输入新密码"
              v-model="cfmPwd"
              @blur="checkCfmPwd(cfmPwd)"
            />
          </li>
        </ul>
      </div>

			<div class="bottom">
				<input type="submit" class="oks" value="确认修改">
				<span class="back" @click="callbackUrl">返回</span>
			</div>
		</form>

		<div class="mask" v-show="maskShow">
			<div class="alert-content">
				<div class="title">输入当前密码</div>
				<input
					class="confirmpwd"
					ref="confirmPwd"
					type="password"
					v-model="confirmPwd"
					@blur="checkConfirmPwd(confirmPwd)"
					placeholder="输入您的当前密码"
				>
				<div class="decision">
					<div class="cancel" @click="cancel">取消</div>
					<div class="decide" @click="changeUserPwd">确定</div>
				</div>
			</div>
		</div>
		<prompt :tip="tip" ref="promptRef"></prompt>
	</div>
</template>

<script>
import {verifyPwd, updatePwd} from 'util/http'

import HeadMenu from 'components/HeadMenu/HeadMenu'
import Prompt from 'components/Prompt/Prompt'

export default {
	data () {
		return {
			maskShow: false,
			pwd: '',
			cfmPwd: '',
			tip: '',
			confirmPwd: ''
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
				this.tip = '当前密码不能为空'
				this.$refs.promptRef.show()
				return
			} else if (!/^[a-zA-Z0-9]{8,16}$/.test(this.confirmPwd)) {
				this.tip = '只能输入8-16位的数字或字母'
				this.$refs.promptRef.show()
				return
			}
			let verifyPwdd = this.$refs.verifyPwd.value
			let confirmPwd = this.$refs.confirmPwd.value
			let verifyPwdParams = new URLSearchParams()
			let updatePwdParams = new URLSearchParams()
			verifyPwdParams.append('pwd', confirmPwd)

			verifyPwd(verifyPwdParams).then(res => {
				if (res.data.code === 40009) {
					this.tip = '会员密码错误'
					this.$refs.promptRef.show()
					return
				}
				if (res.data.code === 400010) {
					this.tip = res.data.msg
					this.$refs.promptRef.show()
					return
				}
				let pwdToken = res.data.result.pwdToken
				updatePwdParams.append('pwd', verifyPwdd)
				updatePwdParams.append('pwd_token', pwdToken)
				updatePwd(updatePwdParams).then(res => {
					if (res.data.code === 40009) {
						this.tip = '会员密码错误'
						this.$refs.promptRef.show()
					}
					if (res.data.code === 40012) {
						this.tip = '密码修改失败'
						this.$refs.promptRef.show()
					}
					if (res.data.code === 0) {
						this.tip = '修改成功'
						this.$refs.promptRef.show()
            this.callbackUrl()
					}
					this.maskShow = false
					this.$refs.confirmPwd.value = ''
				})
			})
		},
		cancel () {
			this.maskShow = false
			this.confirmPwd = ''
			this.$refs.confirmPwd.value = ''
		},
		getVerifySafePwd () {
			if (!this.pwd) {
				this.tip = '新密码不能为空'
				this.$refs.promptRef.show()
				return
			} else if (!/^[a-zA-Z0-9]{8,16}$/.test(this.pwd)) {
				this.tip = '只能输入8-16位的数字或字母'
				this.$refs.promptRef.show()
				return
			}
			if (!this.cfmPwd) {
				this.tip = '确认新密码不能为空'
				this.$refs.promptRef.show()
				return
			} else if (this.cfmPwd !== this.pwd) {
				this.tip = '两次密码输入不一致'
				this.$refs.promptRef.show()
				return
			}
			// this.maskShow = true
			this.changeUserPwd()
		},
		checkPwd (pwd) {
			if (!pwd) {
				this.tip = '新密码不能为空'
				this.$refs.promptRef.show()
			} else if (!/^[a-zA-Z0-9]{8,16}$/.test(pwd)) {
				this.tip = '只能输入8-16位的数字或字母'
				this.$refs.promptRef.show()
			}
		},
		checkCfmPwd (cfmPwd) {
			if (!cfmPwd) {
				this.tip = '确认新密码不能为空'
				this.$refs.promptRef.show()
			} else if (cfmPwd !== this.pwd) {
				this.tip = '两次密码输入不一致'
				this.$refs.promptRef.show()
			}
		},
		checkConfirmPwd (confirmPwd) {
			if (!confirmPwd) {
				this.tip = '当前密码不能为空'
				this.$refs.promptRef.show()
			} else if (!/^[a-zA-Z0-9]{8,16}$/.test(confirmPwd)) {
				this.tip = '只能输入8-16位的数字或字母'
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
			.m-input
				display block
				width 9.28rem
				height 1.946667rem
				margin-left .373333rem
				margin-bottom .48rem
				&:first-child
					margin-top .106667rem
				.title
					height .56rem
					line-height .56rem
					padding .133333rem
					font-family 'PingFangSC-Regular'
					color #333
					font-size .4rem
				input
					display block
					box-sizing border-box
					width 9.28rem
					height 1.013333rem
					padding-left .213333rem
					line-height 1.013333rem
					border-radius .133333rem
					border 1px solid #ababab
					color #333
					font-size .373333rem
					&::-webkit-input-placeholder
						color #ababab
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
				height 1.12rem
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

<style>
  .nav-list input{
    width: 100%;
    border: none;
    padding-left: 0;
    padding-right: 0;
  }
</style>
