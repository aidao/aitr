<template>
	<div class="buy">
		<g-trad-part :types="'buy'" @tradClick="tradClick" :price="price"></g-trad-part>
		<g-trad-history :types="'buy'"></g-trad-history>
		<g-alert v-if="isShowDialog" @options="options"></g-alert>
	</div>
</template>

<script>
import GTradHistory from 'components/GTradHistory/GTradHistory'
import GTradPart from 'components/GTradPart/GTradPart'
import GAlert from 'components/GAlert/GAlert'
import {getETHprice} from '../../api/GApi'
export default {
	data () {
		return {
			isShowDialog: false,
			price: 0
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
			this.isShowDialog = false
		},
		tradClick () {
			this.isShowDialog = true
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
.buy
	font-family :MicrosoftYaHei
	font-size: 24px
	color: #666666
	background: #F2F2F2
	height :100%
</style>
