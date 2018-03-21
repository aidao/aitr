<template>
	<div class="jiangjin-detail">
		<HeadMenu pageTitle="奖金明细"></HeadMenu>
		<div class="detail-container">
			<ul>
				<li class="detail-item">
					<div class="tr">
						<div class="td">推荐奖</div>
						<div class="td">
							<div class="count">{{ bonus.refReward || 0 }}</div>
						</div>
					</div>
				</li>
				<li class="detail-item">
					<div class="tr">
						<div class="td">见点奖</div>
						<div class="td">
							<div class="count">{{ bonus.pointReward || 0 }}</div>
						</div>
					</div>
				</li>
				<li class="detail-item">
					<div class="tr">
						<div class="td">碰对奖</div>
						<div class="td">
							<div class="count">{{ bonus.pairReward || 0 }}</div>
						</div>
					</div>
				</li>
				<li class="detail-item">
					<div class="tr">
						<div class="td">领导奖</div>
						<div class="td">
							<div class="count">{{ bonus.leaderReward || 0 }}</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import HeadMenu from 'components/HeadMenu/HeadMenu'
import {getToken, getBonusUrl} from '../../../api/GApi'
import axios from 'axios'
export default {
	data () {
		return {
			bonus: {}
		}
	},
	components: {
		HeadMenu
	},
	created () {
		this.getData();
	},
	methods: {
		getData () {
			const _this = this
			this.isDataLoaded = false
			axios.get(getBonusUrl, {
				headers: getToken(),
				params: {
				}
			}).then(res => {
				// 没获取到数据，所以先不填
				console.log(res)
				this.bonus = res.data.result
			})
		}
	}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	.jiangjin-detail
		height 100%
		background #f2f2f2
		.detail-container
			
			.title
				height .96rem
				line-height .96rem
				text-align center
				color #333
				font-size .426667rem
			.detail-item
				margin .2665rem 0
				background #FFF
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
					padding 0 .3997rem
					&:last-child
						text-align right
					.td
						&:first-child
							float left
						&:last-child
							float right
</style>
