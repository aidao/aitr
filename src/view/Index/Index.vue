<template>
	<div class="bflogin">
		<head-menu></head-menu>
		<div class="banner"></div>
		<div class="bflogin-ct">
			<header class="title">USDT最新行情</header>
			<div class="ct-wrapper">
				<ul class="content">
					<li class="item-wrapper" v-for="(item, index) in list" :key="index">
						<ul class="item-ct">
							<li class="item-name">
								<div class="name-top">
									<span class="current-coin">{{item.name}}</span> / <span class="usdollar">USDT</span>
								</div>
								<div class="close-price add" v-if="item.market.close - item.market.open > 0">{{item.market.close.toFixed(2)}}</div>
								<div class="close-price min" v-else-if="item.market.close - item.market.open < 0">{{item.market.close.toFixed(2)}}</div>
								<div class="close-price" v-else>{{item.market.close.toFixed(2)}}</div>
								<router-link to="/noOpn" class="to-trade" v-if="item.onTrade">去交易</router-link>
							</li>
							<li class="item-price">
								<div class="price-high">{{item.market.high.toFixed(2)}}</div>
								<div class="price-line"></div>
								<div class="price-low">{{item.market.low.toFixed(2)}}</div>
							</li>
							<li class="item-count">
								<div class="count-top">
									<div class="count-title">成交量</div>
									<div class="count">{{item.market.amount.toFixed(2)}} BTC</div>
								</div>
								<div class="count-line"></div>
								<div class="count-percent add" v-if="item.market.close - item.market.open > 0">{{((item.market.close - item.market.open) / item.market.open * 100).toFixed(2) + '%'}} <span class="derection add"></span></div>
								<div class="count-percent min" v-else-if="item.market.close - item.market.open < 0">{{((item.market.close - item.market.open) / item.market.open * 100).toFixed(2) + '%'}} <span class="derection min"></span></div>
								<div class="count-percent" v-else>+3.7% <span class="derection add"></span></div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<div class="bt-banner"></div>
		
	</div>
</template>

<script>
import {getETHprice} from 'util/http'

import HeadMenu from 'components/HeadMenu/HeadMenu'

export default {
	data () {
		return {
			list: [
				{
					name: 'ETH',
					onTrade: true,
					market: {
						amount: 18757,
						close: 15576.29,
						count: 22411,
						high: 986,
						id: 1517673600,
						low: 938,
						open: 15576.29,
						vol: 18064705
					}
				},
				{
					name: 'BTC',
					onTrade: false,
					market: {
						amount: 18757,
						close: 15576.29,
						count: 22411,
						high: 986,
						id: 1517673600,
						low: 938,
						open: 15576.29,
						vol: 18064705
					}
				},
				{
					name: 'LTC',
					onTrade: false,
					market: {
						amount: 18757,
						close: 15576.29,
						count: 22411,
						high: 986,
						id: 1517673600,
						low: 938,
						open: 15576.29,
						vol: 18064705
					}
				},
				{
					name: 'BCH',
					onTrade: false,
					market: {
						amount: 18757,
						close: 15576.29,
						count: 22411,
						high: 986,
						id: 1517673600,
						low: 938,
						open: 15576.29,
						vol: 18064705
					}
				},
				{
					name: 'XRP',
					onTrade: false,
					market: {
						amount: 18757,
						close: 15576.29,
						count: 22411,
						high: 986,
						id: 1517673600,
						low: 938,
						open: 15576.29,
						vol: 18064705
					}
				},
				{
					name: 'DASH',
					onTrade: false,
					market: {
						amount: 18757,
						close: 15576.29,
						count: 22411,
						high: 986,
						id: 1517673600,
						low: 938,
						open: 15576.29,
						vol: 18064705
					}
				},
				{
					name: 'EOS',
					onTrade: false,
					market: {
						amount: 18757,
						close: 15576.29,
						count: 22411,
						high: 986,
						id: 1517673600,
						low: 938,
						open: 15576.29,
						vol: 18064705
					}
				},
				{
					name: 'ETC',
					onTrade: false,
					market: {
						amount: 18757,
						close: 15576.29,
						count: 22411,
						high: 986,
						id: 1517673600,
						low: 938,
						open: 15576.29,
						vol: 18064705
					}
				}
			],
			// list:[]
		}
	},
	mounted () {
		this.getETHCurrentPrc()
		let that = this
/*		setInterval(() => {
			that.getETHCurrentPrc()
		}, 30000)*/
	},
	components: {
		HeadMenu
	},
	methods: {
		getETHCurrentPrc () {
		  let _self= this
			getETHprice().then(res => {
				// console.log(res)
        res.map(function(item, key, ary) {
          _self.list[key].market=item.data.data[0]
          // console.log(key)
          // item.data.data[0]
        });
				// console.log(this.list)
				// this.list[0].market = res.data.data[0]
			})
		},
		
	}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	.bflogin
		.banner
			height 10.453333rem
			background url('./banner@2x.png') 0 0 / 100% 10.453333rem no-repeat
			&::before
				position absolute
				content ''
				width 8.666667rem
				height 5.306667rem
				left .666667rem
				top 1.946667rem
				background url('./文字@2x.png') 0 0 / 8.666667rem 5.306667rem no-repeat
			&::after
				position absolute
				content ''
				width .453333rem
				height .453333rem
				background url('./下拉.png') 0 0 / .453333rem .453333rem no-repeat
				left 4.773333rem
				top 9.333333rem
		.bflogin-ct
			background #EAEAE9
			.title
				position relative
				width 100%
				height 1.066667rem
				line-height 1.066667rem
				text-align center
				background-image linear-gradient(-180deg, #FFCD00 0%, #FFCA00 100%)
				box-shadow 0 .026667rem .053333rem 0 rgba(0, 0, 0, 0.5)
				font-size .373333rem
				color #333
			.ct-wrapper
				height 100%
				padding-top .133333rem
				.content
					padding 0 0 .533333rem .666667rem
					.item-wrapper
						padding-top .266667rem
						overflow hidden
						.item-name
							float left
							position relative
							width 2.586667rem
							height 2.4rem
							background-image linear-gradient(-180deg, #4A4A4A 0%, #000 100%)
							box-shadow 0 .026667rem .053333rem 0 #999, inset 0 -1px 0 0 #CCC
							margin-right .173333rem
							border-radius .053333rem
							opacity .9
							.name-top
								height .24rem
								line-height .24rem
								padding-top .666667rem
								text-align center
								font-size .373333rem
								color #FFF
								letter-spacing 0
							.close-price
								padding-top .186667rem
								height .413333rem
								line-height .413333rem
								text-align center
								font-size .32rem
								color #FFCA00
								&.add
									color #FFCA00
								&.min
									color #4A90E2
							.to-trade
								position absolute
								left 0
								bottom 0
								width 100%
								height .506667rem
								line-height .506667rem
								background #FFCA00
								text-align center
								color #FFF
								font-size .213333rem
								&::after
									position absolute
									content ''
									top .12rem
									right .64rem
									width .266667rem
									height .266667rem
									background url('../../assets/返回@2x.png') center center / .266667rem .266667rem no-repeat
						.item-price
							float left
							position relative
							width 2.933333rem
							height 2.4rem
							padding .053333rem
							box-sizing border-box
							background #FFF
							margin-right .066667rem
							border-radius .053333rem
							box-shadow 0 .026667rem .053333rem 0 #CCC
							&::before
								position absolute
								content ''
								width .746667rem
								height .746667rem
								left 0
								top 0
								background url('./high@0.96x.png') 0 0 / .746667rem .746667rem no-repeat
							&::after
								position absolute
								content ''
								width .746667rem
								height .746667rem
								right 0
								bottom 0
								background url('./low@0.96x.png') 0 0 / .746667rem .746667rem no-repeat
							.price-high
								height 1.12rem
								line-height 1.12rem
								text-align center
								font-size .373333rem
								color #333
							.price-line
								height 0
								border-bottom 1px solid #FFCA00
							.price-low
								height 1.12rem
								line-height 1.12rem
								text-align center
								font-size .373333rem
								color #333
						.item-count
							float left
							position relative
							width 2.933333rem
							height 2.4rem
							padding .053333rem
							box-sizing border-box
							background #FFF
							border-radius .053333rem
							box-shadow 0 .026667rem .053333rem 0 #CCC
							.count-top
								height 1.12rem
								.count-title
									height .346667rem
									padding 1px 0 1px 0
									text-align center
									font-size .266667rem
									color #FFCA00
								.count
									height .413333rem
									line-height .413333rem
									padding .08rem 0 .08rem 0
									text-align center
									font-size .32rem
									color #333
							.count-line
								height 0
								border-bottom 1px solid #FFCA00
							.count-percent
								height 1.12rem
								line-height 1.12rem
								text-align center
								font-size .373333rem
								color #FFCA00
								&.add
									color #FFCA00
								&.min
									color #4A90E2
								span
									display inline-block
									width .373333rem
									height .373333rem
									vertical-align middle
									&.add
										background url('./上升.png') left top / .266667rem .32rem no-repeat
									&.min
										background url('./下降.png') left top / .266667rem .32rem no-repeat
		.bt-banner
			height 2.453333rem
			background url('./底部banner.png') top center / 100%  2.453333rem no-repeat
</style>
