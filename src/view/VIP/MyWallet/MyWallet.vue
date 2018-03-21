<template>
	<div class="jiangjin-detail">
		<HeadMenu pageTitle="我的钱包"></HeadMenu>
		<div>
			<ul class="nav-list">
				<router-link :to="{name: 'TransferRouter'}" tag="li">
					<div class="nav-label">转账</div>
					<div class="arrow">></div>
				</router-link>
				<!-- <router-link :to="{name: 'transactions'}" tag="li">
					<div class="nav-label">转账记录</div>
					<div class="arrow">></div>
				</router-link> -->
			</ul>
			<ul class="nav-list">
				<router-link :to="{name: 'coininfo', params: {typeid: 1} }" class="detail-item" tag="li">
					<div class="nav-label">收益币</div>
					<div class="arrow">></div>
				</router-link>
				<router-link :to="{name: 'coininfo', params: {typeid: 0} }" class="detail-item" tag="li">
					<div class="nav-label">注册币</div>
					<div class="arrow">></div>
				</router-link>
				<router-link :to="{name: 'coininfo', params: {typeid: 2} }" class="detail-item" tag="li">
					<div class="nav-label">重构币</div>
					<div class="arrow">></div>
				</router-link>
				<router-link :to="{name: 'coininfo', params: {typeid: 3} }" class="detail-item" tag="li">
					<div class="nav-label">众筹币</div>
					<div class="arrow">></div>
				</router-link>
				<router-link :to="{name: 'coininfo', params: {typeid: 4} }" class="detail-item" tag="li">
					<div class="nav-label">拆分币</div>
					<div class="arrow">></div>
				</router-link>
				<router-link :to="{name: 'coininfo', params: {typeid: 5} }" class="detail-item" tag="li">
					<div class="nav-label">消费币</div>
					<div class="arrow">></div>
				</router-link>
				
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
</style>
