<template>
	<div class="recharge-history">
		<div class="tips">最近兑换记录</div>
		<div class="history-content">
				<ul>
					<li  v-for="(v,i) in datas" :key="i">
						<div class="order-no">
							<span>订单号: <a href="javascript:;" @click="clickOrder(v.orderNo)">{{v.orderNo}}</a></span>
							<span class="order-buy" v-if="v.type===1">提现</span>
							<span class="order-sell" v-else>充值</span>
						</div>
						<div class="order-price">
							<span>币种 : {{v.currencyName}}</span>
						</div>
						<div class="order-price">
							<span>数量 : {{v.number}}</span>
							<span v-if="v.status===0">未支付</span>
							<span v-else-if="v.status===1">交易完成</span>
						</div>
					</li>
				</ul>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {}
	},
	props: {
		datas: {
			value: [],
			type: Array
		}
	},
	methods: {
		clickOrder (orderid) {
			this.$emit('showOrderInfo', orderid)
		}
	}
}
</script>

<style scoped lang="stylus">
.recharge-history
	margin-top :.266667rem
	font-family: PingFangSC-Regular
	font-size: .373333rem
	color: #333333
	letter-spacing: 0px
	background: #FFFFFF;
	box-shadow: 0px 2px 4px 0px #CCCCCC;
	padding-bottom :.266667rem
	.tips
		text-align :center
		height :1.013333rem
		line-height :1.013333rem
	.history-content
		ul
			li
				padding-bottom :.4rem
				letter-spacing: .023333rem
				.order-no
					padding :0 .266667rem
					box-sizing :border-box
					height :1.013333rem
					display :flex
					justify-content :space-between
					background-color :rgba(255,202,0,0.3)
					span
						line-height :1.013333rem
						height :1.013333rem
						a
							text-decoration :underline
							color:#FFAE11
				.order-price
					padding :0 .4rem
					box-sizing :border-box
					height :.666667rem
					display :flex
					justify-content :space-between
					span
						line-height :1.013333rem
						height :1.013333rem
</style>
