<template>
	<div class="account-part">
		<div class="table-th">
			<span>币种</span>
			<span>可用</span>
			<span>冻结</span>
			<span>操作</span>
		</div>
		<div class="table-tr" v-for="(v,i) in spotAccountData" :key="i">
			<span>{{v.currencyName}}</span>
			<span>{{v.balance}}</span>
			<span class="orange">0</span>
			<span>
				<a href="javascript:;">充值</a>
				<a href="javascript:;">提现</a>
			</span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		spotAccountData: {
			type: Array,
			value: []
		}
	},
	methods: {
		charge (type) {
			if (type && type === 'ETH') {
				this.$emit('charge')
			}
		}
	}
}
</script>

<style scoped lang="stylus">
.account-part
		border-bottom :1px solid #ccc
		box-shadow: 0px 2px 4px 0px #ccc;
		.table-th
			height :1.013333rem
			background-color :rgba(255,202,0,0.3)
			span
				height :1.013333rem
				line-height :1.013333rem
				display :block
				float :left
				width :25%
				box-sizing :border-box
				font-size: .32rem
				text-align :center
		.table-tr
			height :.88rem
			font-family: PingFangSC-Regular
			font-size: .346667rem
			letter-spacing: 0px
			background :white
			border-bottom :.013333rem solid #ccc
			span
				height :.88rem
				line-height :.88rem
				display :block
				float :left
				width :25%
				box-sizing :border-box
				text-align :center
				a
					text-decoration :underline
					color:#CCC
					&.orange
						color:#FFAE11
.orange
	color:#FFAE11
</style>
