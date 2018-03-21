<template>
	<div class="earning-transfer">
		<div class="header"></div>
		<div class="content">
			<div class="top">
				<span>收益币转账</span>
			</div>
			<div class="center">
				<div class="tips">
					注册币余额:
				</div>
				<div class="values">
					600.00
				</div>
				<div class="tips">
					收益币余额:
				</div>
				<div class="values">
					0.00
				</div>
				<div class="tips">
					转出积分类型:
				</div>
				<div class="values other">
					<span>收益币 -> 注册币</span>
					<img src="../../../assets/选择2@2x.png" alt="">
				</div>
				<div class="tips">
					接收会员编号:
				</div>
				<div class="valuess">
					<input type="text" placeholder="输入收款会员编号">
				</div>
				<div class="tips">
					转让积分数量:
				</div>
				<div class="valuess">
					<input type="text" placeholder="转入转出积分数量">
				</div>
			</div>
			<div class="bottom">
				<span class="back">返回</span>
				<span class="oks">确定</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style scoped lang="stylus">
.earning-transfer
	.header
		height: 1.306667rem
		background-color :#000000
	.content
		position: absolute
		top: 0
		left: 0
		right: 0
		bottom: 0
		margin-top: 1.306667rem
		box-sizing: border-box
		background-color: #F2F2F2
		.top
			font-family: MicrosoftYaHei
			font-size: .373333rem
			color: #333333
			line-height :1rem
			text-align center
			padding : 0 .266667rem
			box-sizing :border-box
			span
				display :block
				border-bottom : 1px solid #CCCCCC
		.center
			background-color :white
			margin-top :.133333rem
			font-size :.4rem
			box-sizing :border-box
			padding :0 .266667rem .8rem
			.tips
				line-height :1rem
				padding-left :.266667rem
				margin-top :.266667rem
			.values
				background: #F3F3F3
				border: 1px solid #ABABAB
				border-radius: .133333rem
				line-height :1rem
				padding-left :.266667rem
				color :#666
			.other
				color :#333
				display :flex
				justify-content :space-between
				align-items :center
				img
					width :.266667rem
					height :.4rem
					margin-right :.266667rem
			.valuess
				input
					border: 1px solid #ABABAB
					border-radius: .133333rem
					line-height :1rem
					padding-left :.266667rem
					width :100%
					font-size :.373333rem
					box-sizing :border-box
		.bottom
			position :absolute
			bottom :0
			height :1.333333rem
			display :flex
			width :100%
			align-items :center
			span
				flex:1
				text-align :center
				font-size :.426667rem
				color :white
				height :100%
				line-height :1.333333rem
				&.back
					background-color :#D2D2D2
				&.oks
					background :#FFCA00
</style>
