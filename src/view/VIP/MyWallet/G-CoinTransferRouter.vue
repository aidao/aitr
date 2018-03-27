<template>
	<div class="transactions">
		<head-menu :pageTitle="$t('common.transaction')"></head-menu>
		<div class="content">
			<div class="top">
        <router-link to="/transferrouter/cointransfer/0" tag="div" data-aa="0" >
          <span  @click="changeComponent('zhuce')">{{ $t('mywallet.coinZhuCe') }}</span>
          <img src="../../../assets/Triangle@1.5x.png" alt="" class="triangle" v-show="isShowTriangle">
        </router-link>
				<router-link to="/transferrouter/cointransfer/1" tag="div" data-aa="0" >
					<span @click="changeComponent('shouyi')">{{ $t('mywallet.coinShouYi') }}</span>
					<img src="../../../assets/Triangle@1.5x.png" alt="" class="triangle" v-show="!isShowTriangle">
				</router-link>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import HeadMenu from 'components/HeadMenu/HeadMenu'

export default {
	data () {
		return {
			isShowTriangle: false
		}
	},
	methods: {
		changeComponent (num) {
			console.log(num)
			if (num === 'zhuce') {
				this.isShowTriangle = false
			} else {
				this.isShowTriangle = true
			}
		}
	},
	components: {
		HeadMenu
	}
}
</script>

<style scoped lang="stylus">
.transactions
	.content
		position: absolute
		height: 100%
		top: 0
		left: 0
		right: 0
		bottom: 0
		padding-top: 1.306667rem
		box-sizing: border-box
		background-color: #F2F2F2
		.top
			display :flex
			font-family: MicrosoftYaHei
			justify-content :space-around
			font-size: .32rem
			color: #999999
			line-height :1rem
			margin:0 .266667rem
			border-bottom : 1px solid #CCCCCC
			div
				width:50%
				text-align :center
				position :relative
				span
					display :block
					height :100%
					width :100%
					font-size 0.373333rem
			.triangle
				height :.133333rem
				position :absolute
				top:0
				left:50%
				margin-left: -.133333rem
			.router-link-active
				color:#333333
</style>
