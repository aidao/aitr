<template>
	<div class="noopn">
		<prompt :tip="tip" ref="promptRef"></prompt>
	</div>
</template>

<script>
import Prompt from 'components/Prompt/Prompt'

export default {
	data () {
		return {
			tip: '',
      obj:{
			  tip:'暂未开放',
        show:true
      }
		}
	},
	components: {
		Prompt
	},
	mounted () {
	  this.$store.commit('commonPrompt', this.obj)

    this.$router.go(-1)
	}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	.noopn
		background #F0F0F0
</style>
