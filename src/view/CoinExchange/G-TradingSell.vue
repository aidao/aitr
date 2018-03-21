<template>
	<div>
		<g-trad-part :types="types" @tradClick="tradClick" :price="price"></g-trad-part>
		<g-trad-history :types="types" :historydata="historyData.result.list"></g-trad-history>
		<g-alert v-if="isShowDialog" @options="options">
				<div class="tipss">
					确定订单
				</div>
				<div class="tips">
					您将{{types === 'sell' ? '卖出' : '买入'}}ETH {{numbers}}
				</div>
		</g-alert>
	</div>
</template>

<script>
import GTradHistory from 'components/GTradHistory/GTradHistory'
import GTradPart from 'components/GTradPart/GTradPart'
import GAlert from 'components/GAlert/GAlert'
import {getETHprice} from '../../api/GApi'
import {sellCoin} from 'util/http'
export default {
	data () {
		return {
			isShowDialog: false,
			historyData: {
				code: 0,
				msg: 'SUCCESS',
				result: {
					count: 2,
					list: [
						{
							currencyId: 2,
							number: 2,
							totalPrice: 2144,
							type: 1,
							unitPrice: 1072,
							orderNo: '1517066698355'
						},
						{
							currencyId: 2,
							number: 2,
							totalPrice: 2155,
							type: 0,
							unitPrice: 1077.5,
							orderNo: '1517066698355'
						}
					],
					pageNum: 1,
					pageSize: 5
				}
			},
			types: 'sell',
			price: 0,
			numbers: 0
		}
	},
	created () {
		this.getNewPrc()
		const that = this
		setInterval(() => {
			that.getNewPrc()
		}, 5000)
	},
	components: {
		GTradHistory,
		GTradPart,
		GAlert
	},
	methods: {
		options (flag) {
			console.log(flag)
			if (flag === 'oks') {
				sellCoin().then(res => {
					console.log(res)
				})
			}
			this.isShowDialog = false
		},
		tradClick (msg) {
			this.isShowDialog = true
			// console.log(msg)
			this.numbers = parseFloat(msg.number)
		},
		getNewPrc () {
			getETHprice().then(res => {
				this.price = res.data.data[0].close
			})
		}
	}
}
</script>

<style scoped lang="stylus">
</style>
