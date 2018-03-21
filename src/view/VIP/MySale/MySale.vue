<template>
	<div class="jiangjin-detail">
		<HeadMenu pageTitle="我的销售"></HeadMenu>
		<div>
			<ul class="nav-list">
				<router-link to="/registermu" tag="li">
					<div class="nav-label">注册母账户</div>
					<div class="arrow">></div>
				</router-link>
				<router-link to="/noOpn" tag="li">
					<div class="nav-label">注册子账户</div>
					<div class="arrow">></div>
				</router-link>
			</ul>
			<ul class="nav-list">
				<router-link to="/noOpn" tag="li">
					<div class="nav-label">解绑子账户</div>
					<div class="arrow">></div>
				</router-link>
				<router-link to="/noOpn" tag="li">
					<div class="nav-label">绑定母账户</div>
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
