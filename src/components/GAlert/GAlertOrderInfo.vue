<template>
	<div class="alerts">
		<div class="dialog">
				<div class="tipss">确认充值</div>
				<div class="tips">请确认充值信息<a href="javascript:;">复制地址</a></div>
				<div class="tables">
					<div class="types">
						<div class="line">钱包地址</div>
						<div class="line">转账时备注内容</div>
						<div class="line">数量</div>
						<div class="code">二维码</div>
					</div>
					<div class="valus">
						<div class="address line">{{orderData.address}}</div>
						<div class="line address"><span style="color:#FFCA00">{{orderData.verifyCode}}</span>（请务必填写）</div>
						<div class="line address" style="color:#FFCA00">{{orderData.number}}</div>
						<div class="code-img"><img :src="orderData.qrUrl" alt=""></div>
					</div>
				</div>
				<div class="issure" @click="confirms">
					确认
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
		confirms (flag) {
			this.$emit('confirms')
		}
	},
	props: {
		orderData: {
			type: Object,
			value: {}
		}
	}
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
		width :7.973333rem
		height :7.493333rem
		background-color :white
		position :absolute
		top:50%
		left:50%
		margin-left :-3.986667rem
		margin-top :-3.746667rem
		border-radius: .133333rem
		color :#4A4A4A
		text-align :center
		font-size :.373333rem
		font-family: MicrosoftYaHei
		box-sizing:border-box
		padding .266667rem
		.tipss
			font-size :.426667rem
			line-height :1rem
		.tips
			font-size :.293333rem
			position :relative
			a
				color: #FFCA00
				text-decoration :underline
				position :absolute
				right:0
		.tables
			border-color: #FFCA00
			font-size: .293333rem
			margin-top :.266667rem
			position :relative
			>div
				float :left
			.types
				width :2.266667rem
				line-height :.72rem
				background :rgba(255,202,0,0.5)
				border :.013333rem solid #FFCA00
				border-top-left-radius :.066667rem
				border-bottom-left-radius :.066667rem
				.line
					border-bottom :.013333rem solid #FFCA00
				.code
					height :2.213333rem
					line-height :2.213333rem
			.valus
				width :5.173333rem
				font-size: .213333rem
				position :absolute
				margin-left :2.3rem
				overflow :hidden
				line-height :.72rem
				background :rgba(255,202,0,0.1)
				border:.013333rem solid #FFCA00
				border-left :0
				border-top-right-radius :.066667rem
				border-bottom-right-radius :.066667rem
				.address
					overflow: hidden
					text-overflow:ellipsis
					white-space: nowrap
					text-align :left
					box-sizing :border-box
					padding-left :.133333rem
				.code-img
					height :2.213333rem
					line-height :2.213333rem
					img
						width :1.68rem
						height :1.68rem
						margin-top :.266667rem
				.line
					border-bottom :.013333rem solid #FFCA00
		.issure
			position :absolute
			bottom :0
			border-top: .026667rem solid #ccc
			width :7.44rem
			height :1rem
			line-height :1rem
			color:#FFCA00
</style>
