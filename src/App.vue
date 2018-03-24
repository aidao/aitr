<template>
	<div id="app">
		<router-view :class="{'with-footnav app-content': hasLogined && !isIndexPage, 'hide-foot-nav': hideFootNav }" />
		<FootNav v-if="hasLogined && !hideFootNav"></FootNav>
		<prompt :tip="prompt.tip" v-show="prompt.show"></prompt>
	</div>
</template>

<script>
	import Prompt from 'components/Prompt/Prompt'
	import FootNav from 'components/FootNav/FootNav'

	export default {
	name: 'App',
	data(){
		return {
			show:undefined,
			hasLogined: false,
			isIndexPage: false,
			hideFootNav: false
		}
	},
	mounted() {
		this.show=this.prompt.show
		this.checkLogin()
    /*window.addEventListener('click', function() {
		  if(document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
        setTimeout(() => {
          document.activeElement.scrollIntoViewIfNeeded(false)
        }, 100)
      }
    })*/
	},
	watch:{
		'prompt.show': function (val, oldVal) {
			if(val==true){
				setTimeout(() => {
					this.prompt.show = false
				}, 1000)
			}
		},
		$route (state) {
			this.isIndexPage = state.path === '/index'
			this.hideFootNav = ['/index', '/registermu', '/usercenter', '/cgpwd' ].indexOf(state.path) > -1 || state.path.indexOf('cointransfer') > -1 || state.path.indexOf('changeuserinfo') > -1
			this.checkLogin()
		}
	} ,
	components:{
		Prompt,
		FootNav
	},
	computed:{
		prompt(){
			return this.$store.state.prompt
		}
	},
	methods: {
		checkLogin () {
			const token = JSON.parse(localStorage.getItem('__token__'))
			this.hasLogined = token ? true : false
		}
	}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	#app
		height 100%
		overflow hidden
</style>
