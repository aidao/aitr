<template>
	<div class="registermu">
		<HeadMenu></HeadMenu>
		<form action="">
			<div class="form-content">
				<div class="m-input">
					<div class="title">USDT余额:</div>
					<input type="text" value="3000" disabled />
				</div>

				<div class="m-input">
					<div class="title">选择配套:</div>
					<input type="text" value="一星会员（100USDT）" disabled />
				</div>

				<div class="submit">
					<input type="submit" value="确定">
				</div>
			</div>
		</form>

		<div class="record-container">
			<div class="record-cpital">购买配套记录</div>
			<div class="record-title">
				<div>购买日期</div>
				<div>会员编号</div>
				<div>消耗USDT</div>
			</div>
			<ul class="record-content">
				<li class="record-item">
					<div class="date">2017/12/18 20:30:53</div>
					<div class="bianhao">1</div>
					<div class="cost">500</div>
				</li>
				<li class="record-item">
					<div class="date">2017/12/18 20:30:53</div>
					<div class="bianhao">1</div>
					<div class="cost">500</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import HeadMenu from 'components/HeadMenu/HeadMenu'

export default {
	data () {
		return {}
	},
	components: {
		HeadMenu
	}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	.registermu
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
					.entry
						float right
						.jiediantu
							color #FFCA00
							text-decoration underline
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
					&[disabled]
						background #F1F1F1
						color #666
					&::-webkit-input-placeholder
						color #ababab
			.submit
				width 8.72rem
				height 1.12rem
				font-size 0
				margin .853333rem auto .386667rem
				text-align center
				.tip
					color #FFCA00
					font-size .32rem
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
		.record-container
			margin-top .16rem
			background-color #FFF
			box-shadow 0 .026667rem .053333rem 0 #CCC
			.record-cpital
				height 1.066667rem
				line-height 1.066667rem
				text-align center
				font-size .426667rem
				color #333
				letter-spacing 0
			.record-title
				display flex
				height 1.066667rem
				background rgba(255, 202, 0, .3)
				line-height 1.066667rem
				font-size .373333rem
				color #333
				letter-spacing .023333rem
				div
					width 33.33%
					text-align center
			.record-content
				.record-item
					display flex
					height .933333rem
					line-height .933333rem
					color #333
					font-size .346667rem
					box-shadow inset 0 -1px 0 0 #CCC
					.date
						width 40%
						padding-left .44rem
						word-break break-all
						text-align left
					.bianhao
						width 20%
						text-align center
					.cost
						width 40%
						padding-right .626667rem
						text-align right
</style>
