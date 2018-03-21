<template>
	<div class="jiangjin-detail">
		<HeadMenu></HeadMenu>
		<div class="detail-container">
			<div class="title">众筹币</div>
			<ul>
				<li class="detail-item">
					<div class="th">
						<div class="bianhao">会员编号:1</div>
						<div class="date">2017/12/27 17:51:11</div>
					</div>
					<div class="tr">
						<div class="td">改变量:-100</div>
						<div class="td">改变后余额:500</div>
					</div>
					<div class="tr">备注:为会员生成子账户扣除众筹币</div>
				</li>
				<li class="detail-item">
					<div class="th">
						<div class="bianhao">会员编号:1</div>
						<div class="date">2017/12/27 17:51:11</div>
					</div>
					<div class="tr">
						<div class="td">改变量:-100</div>
						<div class="td">改变后余额:500</div>
					</div>
					<div class="tr">备注:为会员生成子账户扣除众筹币</div>
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
	.jiangjin-detail
		height 100%
		background #f2f2f2
		.detail-container
			background #FFF
			box-shadow 0 .026667rem .053333rem 0 #CCC
			.title
				height .96rem
				line-height .96rem
				text-align center
				color #333
				font-size .426667rem
			.detail-item
				font-size .373333rem
				color #333
				.th
					height 1.013333rem
					line-height 1.013333rem
					background rgba(255, 202, 0, .3)
					padding 0 .36rem
					.bianhao
						float left
					.date
						float right
				.tr
					height .853333rem
					line-height .853333rem
					padding 0 .346667rem 0 .466667rem
					&:last-child
						text-align right
					.td
						&:first-child
							float left
						&:last-child
							float right
</style>
