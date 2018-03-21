<template>
	<div class="sport-account">
		<g-assets-manage :spotAccountData="spotAccountData"></g-assets-manage>
		<div class="history">
			<g-recharge-history></g-recharge-history>
		</div>
	</div>
</template>
<script>
import {spotAccount} from '../../../api/GApi'
import GRechargeHistory from 'components/GRechargeHistory/GRechargeHistory'
import GAssetsManage from 'components/GAssetsManage/GAssetsManage'
export default {
	data () {
		return {
			spotAccountData: []
		}
	},
	created () {
		spotAccount().then(res => {
			if (res.data.code === 0) {
				this.spotAccountData = res.data.result
			}
		})
	},
	components: {
		GRechargeHistory,
		GAssetsManage
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
