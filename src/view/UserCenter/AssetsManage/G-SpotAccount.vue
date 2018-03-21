<template>
	<div class="sport-account">
		<g-assets-manage :spotAccountData="spotAccountData" @charge="charge"></g-assets-manage>
		<div class="history">
			<g-recharge-history :datas="rechargeHistoryData" @showOrderInfo="showOrderInfo"></g-recharge-history>
		</div>
		<g-alert @options="options" v-show="isShow">
			<div class="tipss">输入充值金额</div>
			<div>
				<input type="number" :style="alertStyle" placeholder="输入需要充值的金额数量" v-model="chargeNum">
			</div>
		</g-alert>
		<g-alert-order-info v-show="orderInfoShow" :orderData="orderData" @confirms="orderConfirm" v-if="orderData"></g-alert-order-info>
	</div>
</template>
<script>
import {spotAccount, orderDataUrl, getToken, rechargeHistory, orderDatasUrl} from '../../../api/GApi'
import GRechargeHistory from 'components/GRechargeHistory/GRechargeHistory'
import GAssetsManage from 'components/GAssetsManage/GAssetsManage'
import GAlert from 'components/GAlert/GAlert'
import GAlertOrderInfo from 'components/GAlert/GAlertOrderInfo'
import axios from 'axios'

export default {
	data () {
		return {
			spotAccountData: [],
			isShow: false,
			orderInfoShow: false,
			orderData: null,
			chargeNum: undefined,
			rechargeHistoryData: [],
			alertStyle: {
				border: '1px solid #CCCCCC',
				color: '#ccc',
				width: '6.293333rem',
				height: '.8rem',
				fontSize: '.32rem',
				boxSzing: 'border-box',
				paddingLeft: '.133333rem'
			}
		}
	},
	created () {
		spotAccount().then(res => {
			console.log(res)
			if (res.data.code === 0) {
				this.spotAccountData = res.data.result
			}
		})
		// 充值提现记录
		rechargeHistory().then(res => {
			if (res.data.code === 0) {
				this.rechargeHistoryData = res.data.result.list
			}
		})
	},
	components: {
		GRechargeHistory,
		GAssetsManage,
		GAlert,
		GAlertOrderInfo
	},
	methods: {
		// 监听充值面板是取消还是确定
		options (flag) {
			this.isShow = false
			console.log(this.chargeNum)
			if (flag === 'oks') {
				let num = parseFloat(this.chargeNum)
				this.chargeNum = undefined
				this.rechargeCoin(2, num)
			}
		},
		// 显示充值面板
		charge () {
			this.isShow = true
		},
		// 获取充值信息
		rechargeCoin (type, num) {
			let params = new URLSearchParams()
			params.append('currency_id', type)
			params.append('number', num)
			axios.post(orderDataUrl, params, {headers: getToken()}).then(res => {
				if (res.data.code === 0) {
					this.orderData = res.data.result
				}
				this.orderInfoShow = true
			})
		},
		// 订单确认
		orderConfirm () {
			this.orderInfoShow = false
			console.log('确认订单了...')
		},
		// 点击历史面板订单发送请求显示订单信息
		showOrderInfo (orderid) {
			axios.get(orderDatasUrl, {
				params: {
					'order_id': orderid
				},
				headers: getToken()
			}).then(res => {
				if (res.data.code === 0) {
					this.orderData = res.data.result
					console.log(this.orderData)
				}
				this.orderInfoShow = true
			})
		}
	}
}
</script>

<style scoped lang="stylus">
.sport-account
	color: #333333
	letter-spacing: .02rem
	font-family: PingFangSC-Regular
	margin-top :.133333rem
</style>
