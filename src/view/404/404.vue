<template>
	<div class="not-found">
		<HeadMenu pageTitle="网站维护中"></HeadMenu>
		<img src="./404.jpg">
	</div>
</template>
<script>
import HeadMenu from 'components/HeadMenu/HeadMenu'
import { serverUpdating } from 'util/http'

export default {
	data () {
		return {}
	},
	components: {
		HeadMenu
	},
	created () {
		serverUpdating().then(res => {
          if (res.data.code === 0) {
            this.$router.replace('/login')
          }
        })
	}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	.not-found img
		display block
		height 100%
		width 100%
		background #f2f2f2
</style>
