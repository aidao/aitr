<template>
	<div class="structure">
		<div class="query-container">查询: 按
			<ul class="select">
				<li class="">会员账号</li>
			</ul>
			<div class="search">
				<input type="text">
			</div>
			<div class="btn">搜索</div>
		</div>

		<div class="structure-container">
			<div class="leavel-six">
				<div class="minus"></div>
				<three-points class="level-six-point"></three-points>
				<div class="level level6">
					<div class="title">A000000</div>
					<div class="grd">Gerald Butler</div>
				</div>
			</div>

			<div class="level5-0">
				<div class="plus"></div>
				<div class="dotting"></div>
				<div class="thress-dot"></div>
				<div class="levels"></div>
			</div>
		</div>
	</div>
</template>

<script>
import ThreePoints from 'components/ThreePoints/ThreePoints'

export default {
	components: {
		ThreePoints
	}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	.structure
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
		.query-container
			display flex
			height .666667rem
			line-height .666667rem
			margin .293333rem 0 .44rem .773333rem
			box-sizing border-box
			font-size .266667rem
			color #666
			.select
				position relative
				width 1.466667rem
				height .666667rem
				line-height .666667rem
				margin-left .173333rem
				background #F3F3F3
				box-sizing border-box
				text-align center
				border 1px solid #CCC
				border-right none
				border-radius .053333rem
				border-bottom-right-radius 0
				border-top-right-radius 0
				&::after
					position absolute
					content ''
					width .666667rem
					height .666667rem
					top -1px
					right -0.666667rem
					background url('../../assets/选择@2x.png') 0 0 / .666667rem .666667rem no-repeat
			.search
				position relative
				width 3.733333rem
				height .666667rem
				margin-left .8rem
				&::before
					position absolute
					content ''
					width .666667rem
					height .666667rem
					left 0
					top 0
					background url('../../assets/search.png') center center /  .466667rem  .466667rem no-repeat
				input
					width 3.733333rem
					height .666667rem
					border-radius .053333rem
					border 1px solid #CCC
					box-sizing border-box
					padding-left .8rem
			.btn
				width 1.2rem
				height .666667rem
				background #FFCA00
				margin-left .133333rem
				border-radius .053333rem
				text-align center
				color #FFF
				font-size .32rem
		.structure-container
			padding-top .44rem
			.leavel-six
				position relative
				height 1.2rem
				.minus
					position absolute
					width .613333rem
					height .613333rem
					top .746667rem
					left .36rem
					background url('../../assets/减号@2x.png') 0 0 / .613333rem .613333rem no-repeat
				.level-six-point
					position absolute
					width .8rem
					height .106667rem
					left 1.04rem
					top 1rem
				.level6
					top .44rem
					left 1.933333rem
			.level5-0
				display flex
				height 10.666667rem
				.plus
					position absolute
					width .613333rem
					height .613333rem
</style>
