<template>
	<div class="m-input">
		<div class="title">{{inputCfg.title}}</div>
		<input ref="ipt" type="text" :name="inputCfg.name" :value="inputCfg.value" :placeholder="inputCfg.placeholder" :disabled="inputCfg.disable" />
	</div>
</template>

<script>
export default {
	props: {
		inputCfg: {
			type: Object,
			default: () => {
				return {
					title: '',
					name: '',
					placeholder: '',
					disable: false
				}
			}
		}
	},
	created () {
		this.$nextTick(() => {
			this.initInput()
		})
	},
	methods: {
		initInput () {
			this.$refs.ipt.style.background = this.inputCfg.bgc
		}
	}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	.m-input
		display block
		width 348px
		height 73px
		margin-left 14px
		margin-top 4px
		margin-bottom 9px
		.title
			height 21px
			line-height 21px
			padding 5px
			font-family 'PingFangSC-Regular'
			color #333
			font-size 15px
		input
			display block
			box-sizing border-box
			width 348px
			height 38px
			padding-left 8px
			line-height 38px
			border-radius 5px
			border 1px solid #ababab
			color #333
			&::-webkit-input-placeholder
				color #ababab
</style>
