<template>
	<div class="transactions-list">
		<div class="detail-container">
			<ul>
				<li class="detail-item" v-for="(v, i) in transferData" :key="i">
					<div class="th">
						<div class="bianhao">{{v.createdAt}}</div>
						<div class="date">{{v.amount}}</div>
					</div>
					<div class="tr">
						<div class="td">{{v.memo}}</div>
						<div class="td">&nbsp;</div>
					</div>
				</li>
				<li class="detail-item" v-if="isDataLoaded && !transferData.length">
					<div class="tr" style="text-align: center">暂无数据</div>
				</li>
			</ul>
			<div class="btn">
				<router-link :to="{name: 'mywallet'}" tag="span">返回</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import HeadMenu from 'components/HeadMenu/HeadMenu'
import {getToken, getWalletLogUrl} from '../../../api/GApi'
import axios from 'axios'
export default {
	data () {
		return {
			types: 0,
			title: '',
			showTransfer: true,
			transferData: [],
			isDataLoaded: false
		}
	},
	components: {
		HeadMenu
	},
	created () {
		this.getData()
	},
	methods: {
		callbackUrl () {
			this.$router.go(-1)
		},
		timestampToTime (timestamp) {
			var date = new Date(timestamp)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var Y = date.getFullYear() + '/'
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
			var D = date.getDate() + ' '
			var h = date.getHours() + ':'
			var m = date.getMinutes() + ':'
			var s = date.getSeconds()
			return Y + M + D + h + m + s
		},
		getData () {
			this.isDataLoaded = false
			axios.get(getWalletLogUrl, {
				headers: getToken(),
				params: {
				}
			}).then(res => {
				// 没获取到数据，所以先不填
				console.log(res)
				let list = [] || res.data.result.list
				list.forEach((item) => {
					item.createdAt = this.timestampToTime(item.createdAt)
				})
				this.transferData = list
				this.isDataLoaded = true
				console.log(this.transferData)
			})
		}
	}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	.transactions-list
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
				background #FFF
				margin 10px 0
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
					height 1.65333rem
					line-height .853333rem
					padding 0 .346667rem 0 .466667rem
					&:last-child
						text-align right
					.td
						padding .4rem
						&:first-child
							float left
						&:last-child
							float right
			.btn
				height :1.333333rem
				color :white
				background :#FFCA00
				position :absolute
				width:100%
				bottom:0
				span
					display :block
					line-height :1.333333rem
					font-size :.426667rem
					text-align :center
</style>
