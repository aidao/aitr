<template>
	<div id="app">
		<router-view :class="{'with-footnav app-content': hasLogined && !isIndexPage, 'hide-foot-nav': hideFootNav }" />
		<FootNav v-if="hasLogined && !hideFootNav" :mainMenuActiveItem="mainMenuActiveItem" v-on:switchFootNav="switchFootNav"></FootNav>
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
			hideFootNav: false,
      mainMenuActiveItem: 0
		}
	},
	mounted() {
		this.show=this.prompt.show
		this.checkLogin()
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
			this.hideFootNav = ['/index', '/registermu', '/usercenter', '/cgpwd', '/cgsfw' ].indexOf(state.path) > -1 || state.path.indexOf('coininfo') > -1 || state.path.indexOf('cointransfer') > -1 || state.path.indexOf('changeuserinfo') > -1
			this.checkLogin()

      if(state.path.indexOf('organizationchart') > -1) {
			  this.mainMenuActiveItem = 1
      } else {
        this.mainMenuActiveItem = ['/vip', '/organizationchart', '/mysale', '/tradecenter', '/mywallet'].indexOf(state.path)
      }
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
		},
    switchFootNav (index) {
		  this.mainMenuActiveItem = index
    }
	}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	#app
		height 100%
		overflow hidden
</style>
