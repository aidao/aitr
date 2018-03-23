<template>
	<div class="jiangjin-detail">
		<HeadMenu :pageTitle="title"></HeadMenu>
		<form>
      <div>
        <ul class="nav-list">
          <li v-if="type === 'nickname'">
            <input
              type="text"
              placeholder="输入2-16位英文或汉字"
              v-model="nickName"
              ref="nickName"
						  @blur="checkNickname(nickName)"/>
          </li>
          <li v-if="type !== 'nickname'">
            <input
              type="text"
              placeholder="输入邮箱地址"
              v-model="email"
              ref="email"
              @blur="checkEmail(email)"/>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <span class="oks" @click="changeUserInfo">确认修改</span>
        <span class="back" @click="callbackUrl">返回</span>
      </div>
		</form>
    <prompt :tip="tip" ref="promptRef"></prompt>
	</div>
</template>

<script>
import {getAccountInfo, updateNickname, updateEmail} from 'util/http'
import HeadMenu from 'components/HeadMenu/HeadMenu'
import Prompt from 'components/Prompt/Prompt'

export default {
	data () {
		return {
      title: '',
      type: '',
      userInfo: {},
      nickname: '',
      email: '',
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
			} else if (!/^[A-Za-z0-9]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)) {
				this.tip = '邮箱格式不正确'
				this.$refs.promptRef.show()
			}
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

    // 保存修改
    changeUserInfo () {
      if (this.type === 'nickname') {
        let nickName = this.$refs.nickName.value
        paramsForUpdateNickname.append('nickname', nickName)
        updateNickname(paramsForUpdateNickname).then(res => {
					this.$refs.confirmPwd.value = ''
					if (res.data.code === 0) {
						this.tip = '修改成功'
						this.$refs.promptRef.show()
						this.callbackUrl()
					}
					this.maskShow = false
				})
      } else {
        let email = this.$refs.email.value
        paramsForUpdateEmail.append('email', email)
				updateEmail(paramsForUpdateEmail).then(res => {
					this.$refs.confirmPwd.value = ''
					if (res.data.code === 0) {
						this.tip = res.data.msg
						this.$refs.promptRef.show()
					}
					this.maskShow = false
				})
      }
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

		.bottom
			display :block
			margin-top: 15px
			width :100%
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

