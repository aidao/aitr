<template>
	<div class="bflogin">
		<header class="m-header">
			<h1 class="logo"></h1>
			<router-link class="userName" to="/login">登录</router-link>
			<div class="menu"></div>
		</header>
		<div class="bflogin-ct">
			<header class="title">USDT最新行情</header>
			<div class="ct-wrapper">
				<ul class="content">
					<li class="item-wrapper" v-for="(item, index) in list" :key="index">
						<ul class="item-ct">
							<li class="item-name">
								<div class="name-top">
									<span class="current-coin">ETH</span> / <span class="usdollar">USDT</span>
								</div>
								<div class="current-price">15576.29</div>
							</li>
							<li class="item-price">
								<div class="price-high">15962.11</div>
								<div class="price-line"></div>
								<div class="price-low">14864.35</div>
							</li>
							<li class="item-count">
								<div class="count-top">
									<div class="count-title">成交量</div>
									<div class="count">2470.1741 BTC</div>
								</div>
								<div class="count-line"></div>
								<div class="count-percent">+3.72% <span class="derection"></span></div>
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
export default {
	data () {
		return {
			list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		}
	}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	.bflogin
		.m-header
			position relative
			width 100%
			height 49px
			background #000
			box-shadow 0 1px 2px 0 rgba(0, 0, 0, .5)
			.logo
				position absolute
				width 64px
				height 29px
				left 25px
				top 10px
				margin 0
				font-size normal
				box-shadow 0 1px 1px 0 #333
				background url('./AITR1outline@1x.png') 0 0 no-repeat
				background-size 64px 29px
			.userName
				position absolute
				width 102px
				height 16px
				line-height 16px
				right 72px
				top 17px
				text-align right
				font-family 'Microsoft Yahei'
				font-size 12px
				color #fff
			.menu
				position absolute
				width 25px
				height 25px
				right 25px
				top 12px
				background url('./菜单.png') 0 0 no-repeat
				background-size 25px 25px
		.bflogin-ct
			background #EAEAE9
			.title
				position relative
				width 100%
				height 40px
				line-height 40px
				text-align center
				background-image linear-gradient(-180deg, #FFCD00 0%, #FFCA00 100%)
				box-shadow 0px 2px 4px 0px rgba(0, 0, 0, 0.5)
				font-size 14px
				color #333
			.ct-wrapper
				height 100%
				padding-top 5px
				.content
					padding 0 0 20px 25px
					.item-wrapper
						padding-top 10px
						overflow hidden
						.item-name
							float left
							position relative
							width 97px
							height 90px
							background-image linear-gradient(-180deg, #4A4A4A 0%, #000 100%)
							box-shadow 0 2px 4px 0 #999, inset 0 -1px 0 0 #CCC
							margin-right 6px
							border-radius 2px
							opacity .9
							.name-top
								height 18px
								line-height 18px
								padding-top 25px
								text-align center
								font-size 14px
								color #FFF
								letter-spacing 0
							.current-price
								padding-top 7px
								height 16px
								line-height 16px
								text-align center
								font-size 12px
								color #FFCA00
						.item-price
							float left
							position relative
							width 106px
							height 86px
							padding 2px
							background #FFF
							margin-right 3px
							border-radius 2px
							box-shadow 0 1px 2px 0 #CCC
							&::before
								position absolute
								content ''
								width 28px
								height 28px
								left 0
								top 0
								background url('./high@0.96x.png') 0 0 / 28px 28px no-repeat
							&::after
								position absolute
								content ''
								width 28px
								height 28px
								right 0
								bottom 0
								background url('./low@0.96x.png') 0 0 / 28px 28px no-repeat
							.price-high
								height 42px
								line-height 42px
								text-align center
								font-size 14px
								color #333
							.price-line
								height 0
								border-bottom 1px solid #FFCA00
							.price-low
								height 42px
								line-height 42px
								text-align center
								font-size 14px
								color #333
						.item-count
							float left
							position relative
							width 106px
							height 86px
							padding 2px
							background #FFF
							border-radius 2px
							box-shadow 0 1px 2px 0 #CCC
							.count-top
								height 42px
								.count-title
									height 13px
									padding 1px 0 1px 0
									text-align center
									font-size 10px
									color #FFCA00
								.count
									height 15px
									padding 6px 0 6px 0
									text-align center
									font-size 12px
									color #333
							.count-line
								height 0
								border-bottom 1px solid #FFCA00
							.count-percent
								height 42px
								line-height 42px
								text-align center
								font-size 14px
								color #FFCA00
								span
									display inline-block
									width 14px
									height 14px
									vertical-align middle
									background url('./上升.png') center center / 10px 12px no-repeat
		.bt-banner
			height 184px
			background url('./底部banner.png') top center / 100% 184px no-repeat
</style>
