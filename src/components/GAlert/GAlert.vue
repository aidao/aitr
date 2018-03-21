<template>
	<div class="alerts">
		<div class="dialog">
				<slot></slot>
				<div class="issure">
					<div class="cancel" @click="options('cancal')">取消</div>
					<div class="oks" @click="options('oks')">确认</div>
				</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {}
	},
	methods: {
		options (flag) {
			this.$emit('options', flag)
		}
	},
	props: {}
}
</script>

<style scoped lang="stylus">
.alerts
	width :100%
	height :100%
	position :fixed
	z-index:100
	background-color: rgba(0,0,0,0.3)
	top:0
	bottom :0
	.dialog
		width :7.2rem
		height :4.8rem
		background-color :white
		position :absolute
		top:50%
		left:50%
		margin-left :-3.6rem
		margin-top :-2.4rem
		border-radius: .133333rem
		color :#4A4A4A
		text-align :center
		font-size :.373333rem
		font-family: MicrosoftYaHei
		.tipss
			font-size :.426667rem
			line-height :2rem
		.issure
			position :absolute
			bottom :0
			border-top: 1px solid #ccc
			width:100%
			height :1rem
			.cancel
				width:50%
				height :100%
				float :left
				line-height :1rem
				box-sizing:border-box
				border-right:1px solid #ccc
			.oks
				width:50%
				height :100%
				float :left
				line-height :1rem
				color:#FFAE11
</style>
