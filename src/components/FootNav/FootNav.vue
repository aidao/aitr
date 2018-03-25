<template>
  <div class="index-menu">
    <!-- 底部菜单 -->
      <ul>
        <router-link class="main-menu-item" v-show="hasLogined" :class="{'active': mainMenuActiveItem === index}"
          v-for="(item, index) in menu"
          :key="index"
          :to="item.path" tag="li">
          <div @click="getMainMenuActiveItem(index)">
            <i v-bind:class="item.icon"></i>
            <span v-text="item.name"></span>
          </div>
        </router-link>
      </ul>
    </div>
</template>

<script>
import {LoginOut, getMuAccount, switchAccount} from 'util/http'

export default {
  props: ['mainMenuActiveItem'],
	data () {
		return {
      // 菜单
      menu: [
        {
          name: 'VIP中心',
          icon: 'vip',
          path: '/vip'
        },
        {
          name: '组织框架',
          icon: 'org',
          path: '/organizationchart'
        },
        {
          name: '我的销售',
          icon: 'mySale',
          path: '/mysale'
        },
        {
          name: '交易中心',
          icon: 'bonusDetail',
          path: '/noOpn'
        },
        {
          name: '我的钱包',
          icon: 'myWallet',
          path: '/mywallet'
        }
      ],
      hasLogined: false,
      positionStyle: null
		}
	},
	mounted () {
    const token = JSON.parse(localStorage.getItem('__token__'))
    if (token) {
      this.hasLogined = true
    }
	},
	methods: {
		// 选中菜单
    getMainMenuActiveItem (index) {
      // this.mainMenuActiveItem = index
      this.$emit('switchFootNav', index)
    },
	},
	computed: {}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	@import './FootNav'
</style>
