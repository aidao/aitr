<template>
	<div class="jiangjin-detail">
		<HeadMenu pageTitle="个人信息"></HeadMenu>
		<div>
			<ul class="nav-list">
				<li>
					<div class="nav-label">会员账号</div>
          <span class="nav-value">{{userInfo.account}}</span>
				</li>
				<router-link to="/changeuserinfo/nickname" tag="li">
					<div class="nav-label">会员名称</div>
          <span class="nav-value">{{userInfo.nickname}}</span><div class="arrow">></div>
				</router-link>
				<li>
					<div class="nav-label">当前级别</div>
          <span class="nav-value">{{userInfo.level}}</span>
				</li>
				<router-link to="/changeuserinfo/email" tag="li">
					<div class="nav-label">邮箱</div>
          <span class="nav-value">{{userInfo.email}}</span><div class="arrow">></div>
				</router-link>
			</ul>
			<ul class="nav-list">
				<router-link to="/cgpwd" tag="li">
					<div class="nav-label">登录密码</div>
					<div class="arrow">></div>
				</router-link>
				<router-link to="/cgsfw" tag="li">
					<div class="nav-label">安全码</div>
					<div class="arrow">></div>
				</router-link>
			</ul>

		</div>
		<div class="bottom">
			<span class="oks" @click="callbackUrl">返回</span>
			<span class="back" @click="logOut">退出登录</span>
		</div>
	</div>
</template>

<script>
import HeadMenu from 'components/HeadMenu/HeadMenu'
import {LoginOut, getAccountInfo} from 'util/http'

export default {
  data () {
    return {
      userInfo: {}
    }
  },
  components: {
    HeadMenu
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      // const level = ['一星会员', '二星会员', '三星会员', '四星会员', '五星会员', '六星会员']
      var _this = this
      getAccountInfo().then(res => {
        if (res.data.code === 0) {
          // res.data.result.level = level[res.data.result.level - 1]
          _this.userInfo = res.data.result
        }
      })
    },
    callbackUrl () {
      this.$router.go(-1)
    },
    logOut () {
      LoginOut().then(res => {
        if (res.data.code === 10005) {
          this.$router.push('/index')
        }
        if (res.data.code === 0) {
          localStorage.removeItem('__token__')
          // sessionStorage.removeItem('__token__')
          sessionStorage.clear()
          this.$router.push('/index')
        }
      })
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	.jiangjin-detail
		height 100%
		background #f2f2f2
		.detail-container
			background #FFF
			box-shadow 0 .026667rem .053333rem 0 #CCC
			.title
				height .96rem
				line-height .96rem
				text-align center
				color #333
				font-size .426667rem
			.detail-item
				height 1.1723rem
				font-size .373333rem
				color #333
				line-height 1.1723rem
				.th
					height 1.013333rem
					line-height 1.013333rem
					background rgba(255, 202, 0, .3)
					padding 0 .36rem
					.bianhao
						float left
					.date
						float right
				.tr
					height .853333rem
					padding 0 .346667rem 0 .466667rem
					&:last-child
						text-align right
					.td
						&:first-child
							float left
						&:last-child
							float right
				& + .detail-item
					border-top 1px solid #eee
		.remove
			width 100%
			height 1.333333rem
			line-height 1.333333rem
			background #FFCA00
			position fixed
			left 0
			bottom 0
			font-size .426667rem
			text-align center
			.path
				color #FFF

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
