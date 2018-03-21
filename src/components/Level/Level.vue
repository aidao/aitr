<template>
	<div class="level level6">
		<div class="title">A000000</div>
		<div class="grd">Gerald Butler</div>
	</div>
</template>

<script>
export default {}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	.level
		position relative
		width 2.373333rem
		height 1.2rem
		background #FD7C7C
		text-align center
		box-shadow 0 .026667rem .053333rem 0 #CCC
		border-radius .053333rem
		&::after
			position absolute
			content ''
			width .48rem
			height .48rem
			top 0
			right 0
			background url('../../assets/v6.png') 0 0 / .48rem .48rem no-repeat
		.title
			height .666667rem
			line-height .666667rem
			color #FFF
			font-size .32rem
		.grd
			height .533333rem
			line-height .533333rem
			color #EEE
			font-size .293333rem
</style>
