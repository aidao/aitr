<template>
	<div class="trad-history">
			<div class="tips">最近兑换记录</div>
			<div class="history-content">
				<ul>
					<li v-for="(v,i) in historydata" :key="i">
						<div class="order-no" :class="{buypart:types==='buy',sellpart:types==='sell'}">
							<span>订单号:{{v.orderNo}}</span>
							<span class="order-buy" v-if="v.type==1">卖出</span>
							<span class="order-sell" v-else>买入</span>
						</div>
						<div class="order-price">
							<span>单价 : {{v.unitPrice}}</span>
							<span>总价 : {{v.totalPrice}}</span>
						</div>
						<div class="order-price">
							<span>数量 : {{v.number}}</span>
							<span>交易完成</span>
						</div>
					</li>
				</ul>
			</div>
	</div>
</template>

<script>
export default {
	props: {
		types: {
			type: String,
			value: 'buy'
		},
		historydata: {
			type: Array,
			value: []
		}
	},
	created () {
		// console.log(this.types)
		// console.log(this.historydata)
	}
}
</script>

<style scoped lang="stylus">
.buypart
	background: rgba(255,202,0,0.3)
.sellpart
	background: rgba(74,144,226,0.3)
.trad-history
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
					.order-no
						padding :0 .266667rem
						box-sizing :border-box
						height :1.013333rem
						display :flex
						justify-content :space-between
						span
							line-height :1.013333rem
							height :1.013333rem
					.order-price
						padding :0 .4rem
						box-sizing :border-box
						height :.666667rem
						display :flex
						justify-content :space-between
						span
							line-height :1.013333rem
							height :1.013333rem
					.order-buy
						color:#FFAE11
					.order-sell
						color:#4A90E2
</style>
