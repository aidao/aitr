<template>
	<div class="bbtrad">
		<div class="header"></div>
		<g-nav></g-nav>
		<div class="select-option">
			<ul>
				<router-link tag="li" to="/trading">ETH交易</router-link>
				<router-link tag="li" to="/trading">ETH交易</router-link>
				<router-link tag="li" to="/trading">ETH交易</router-link>
				<router-link tag="li" to="/trading">ETH交易</router-link>
			</ul>
			<img src="../../assets/上拉@2x.png" alt="" class="pull">
		</div>
	</div>
</template>

<script>
import GNav from 'components/GNav/GNav'
export default {
	components: {
		GNav
	}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
.bbtrad
	.header
		height: 1.306667rem
		background-color :#000000
	.select-option
		height :3.333333rem
		background: #000000;
		box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.50)
		position :relative
		ul
			padding :.466667rem
			box-sizing border-box
			li
				float:left
				color:white
				height :.8rem
				line-height :.8rem
				width :1.92rem
				text-align:center
				font-size :.32rem
				background: #333333
				border: 1px solid #FFCA00
				border-radius: 2px;
				margin-right :.266667rem
				margin-bottom :.266667rem
		.pull
			background:black
			width :.346667rem
			position :absolute
			bottom :.266667rem
			left:50%
</style>
