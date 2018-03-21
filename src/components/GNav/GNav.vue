<template>
	<div class="nav">
		<span>首页</span>
		<span class="active">币币交易 <i class="line"></i></span>
		<span>杠杆交易</span>
		<span>个人中心</span>
		<span>VIP专区</span>
	</div>

</template>
<script>
export default {

}
</script>
<style scoped lang="stylus">
.nav
	width:100%
	font-size :.373333rem
	height :1.466667rem
	background-color :#333333
	span
		width:20%
		display :block
		box-sizing:border-box
		float :left
		color:white
		line-height :1.466667rem
		text-align :center
		position :relative
		font-size :.373333rem
		&.active
			color :#FFCA00
		.line
			position :absolute
			background-color :#FFCA00
			height :.053333rem
			width :1.013333rem
			bottom :0
			left :50%
			margin-left: -.506667rem
</style>
