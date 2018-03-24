<template>
	<div class="organization">
		<head-menu :pageTitle="title"></head-menu>
		<div class="content">
			<div class="top">
				<router-link to="/organizationchart/placementchart" tag="div" data-aa="1">
					<span  @click="changeComponent('placement')">安置结构图</span>
					<img src="../../../assets/Triangle@1.5x.png" alt="" class="triangle" v-show="isShowTriangle">
				</router-link>
				<router-link to="/organizationchart/recommendchart" tag="div" data-aa="0" >
					<span @click="changeComponent('recommed')">推荐图</span>
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
			isShowTriangle: true,
			title: '安置结构图'
		}
	},
	methods: {
		changeComponent (num) {
			console.log(num)
			if (num === 'recommed') {
				this.isShowTriangle = false
				this.title = '推荐图'
			} else {
				this.isShowTriangle = true
				this.title = '安置结构图'
			}
		}
	},
  watch: {
    $route () {
      if (this.$route.path.indexOf('placementchart') > -1) {
        this.changeComponent('placement')
      }
    }
  },
	components: {
		HeadMenu
	}
}
</script>

<style scoped lang="stylus">
.organization
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
