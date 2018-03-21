<template>
	<div class="head-menu">
		<header class="header">
			<!-- <router-link to="/index"><div class="logo"></div></router-link> -->
      <div class="logo"></div>
      <div class="page-title">{{pageTitle}}</div>
			<div class="account" v-show="hasLogined" @click="switchaccount">
				{{userAccount}}
			</div>
			<router-link class="login-btn" v-show="!hasLogined" to="/login">登录</router-link>
		</header>

		<div class="account-wrapper" v-show="showAccount">
			<div class="switch" @click="logOut"></div>
			<div class="maccount-wrapper">
				<div
					class="account"
					v-for="(item, index) in account"
					:key="index"
					@click="getSubAccountActiveItem(index)"
				>
					{{item.account}}
				</div>
			</div>
			<div class="line"></div>
			<div class="subaccount">
				<ul>
					<li
						class="subaccount-item"
						:class="{'active': subAccountActiveItem === index}"
						v-for="(item, index) in subAccount"
						:key="index"
					>{{item}}</li>
				</ul>
			</div>
			<div class="close-account" @click="showAccount = false"></div>
		</div>
	</div>
</template>

<script>
import {LoginOut, getMuAccount, switchAccount} from 'util/http'

export default {
  props: ['pageTitle'],
	data () {
		return {
      menu: [
        {
          name: '首页',
          subMenu: [
            {
              name: 'ETH交易',
              // path: '/coinexchange'
              path: '/noOpn'
            }
          ]
        },
        {
          name: '币币交易',
          path: '/noOpn'
        },
        {
          name: '杠杆交易',
          path: '/noOpn'
        },
        {
          name: '个人中心',
          subMenu: [
            {
              name: '个人信息',
              pageRoute: [
                {
                  name: '个人信息',
                  path: '/userinfo'
                },
                {
                  name: '登录密码',
                  path: '/cgpwd'
                },
                {
                  name: '安全码',
                  path: '/cgsfw'
                }
              ]
            },
            {
              name: '资产管理',
              pageRoute: [
                {
                  name: '现货账户',
                  // path: '/assetsmanage/spotaccount'
                  path: '/noOpn'
                },
                {
                  name: '杠杆账户',
                  // path: '/assetsmanage/leveraccount'
                  path: '/noOpn'
                }
              ]
            }
          ]
        },
        {
          name: 'VIP专区',
          subMenu: [
            {
              name: 'VIP中心',
              path: '/vip'
            },
            {
              name: '组织架构',
              pageRoute: [
                {
                  name: '推荐图',
                  path: '/organizationchart/recommendchart'
                },
                {
                  name: '安置结构图',
                  path: '/organizationchart/placementchart'
                }
              ]
            },
            {
              name: '我的销售',
              pageRoute: [
                {
                  name: '注册母账户',
                  path: '/registermu'
                },
                {
                  name: '注册子账户',
                  // path: '/chonggou'
                  path: '/noOpn'
                },
                {
                  name: '购买配置',
                  // path: '/buymatch'
                  path: '/noOpn'
                },
                {
                  name: '解绑子账户',
                  // path: '/unbindsubaccount'
                  path: '/noOpn'
                },
                {
                  name: '解绑母账户',
                  // path: '/bindmuaccount'
                  path: '/noOpn'
                }
              ]
            },
            {
              name: '奖金明细',
              path: '/jiangjindetail'
            },
            {
              name: '我的钱包',
              pageRoute: [
                {
                  name: '注册币',
                  path: '/coininfo'
                },
                {
                  name: '收益币',
                  // path: '/coininfo'
                  path: '/noOpn'
                },
                {
                  name: '重构币',
                  // path: '/coininfo'
                  path: '/noOpn'
                },
                {
                  name: '众筹币',
                  // path: '/coininfo'
                  path: '/noOpn'
                },
                {
                  name: '拆分币',
                  // path: '/coininfo'
                  path: '/noOpn'
                },
                {
                  name: '消费币',
                  // path: '/coininfo'
                  path: '/noOpn'
                }
              ]
            },
            {
              name: '产品管理',
              pageRoute: [
                {
                  name: '产品管理',
                  path: '/noOpn'
                },
                {
                  name: '我的订单',
                  path: '/noOpn'
                }
              ]
            },
            {
              name: '公告消息',
              pageRoute: [
                {
                  name: '公告新闻',
                  path: '/noOpn'
                },
                {
                  name: '发件箱',
                  path: '/noOpn'
                },
                {
                  name: '收件箱',
                  path: '/noOpn'
                }
              ]
            }
          ]
        }
      ],
			account: [],
			subAccount: [],
			showMenu: false,
			showAccount: false,
			hasLogined: false,
			mainMenuActiveItem: 0,
			submenuActiveItem: 0,
			routeActiveItem: 0,
			subAccountActiveItem: 0,
			userAccount: ''
		}
	},
	mounted () {
		const token = JSON.parse(localStorage.getItem('__token__'))
		if (token) {
			this.hasLogined = true
      this.getSubAccount()
		}
	},
	methods: {
		getMainMenuActiveItem (index) {
			this.submenuActiveItem = 0
			this.routeActiveItem = 0
			this.mainMenuActiveItem = index
		},
		getSubmenuActiveItem (index) {
			this.routeActiveItem = 0
			this.submenuActiveItem = index
		},
		getRouteActiveItem (index) {
			this.routeActiveItem = index
			this.showMenu = false
		},
		switchMenu () {
			this.showAccount = false
			this.showMenu = !this.showMenu
		},
		switchaccount () {
			// this.showMenu = false
			// this.showAccount = !this.showAccount
      this.$router.push('/usercenter')
		},
		getSubAccountActiveItem (index) {
			this.subAccountActiveItem = index

			let params = new URLSearchParams()
			params.append('uid', 1)
			console.log(params)

			switchAccount(params).then(res => {
				console.log(res.data)
			})
		},
		logOut () {
			LoginOut().then(res => {
				if (res.data.code === 10005) {
					this.$router.push('/login')
				}
				if (res.data.code === 0) {
					localStorage.removeItem('__token__')
					// sessionStorage.removeItem('__token__')
					sessionStorage.clear()
					this.$router.push('/login')
					this.hasLogined = false
					this.showAccount = false
				}
			})
		},
		getSubAccount () {
      const that = this;
			getMuAccount().then(res => {
				// console.log(res.data.result[0].account)
				that.userAccount = res.data.result.bindingAccount.account
        sessionStorage.setItem('account', that.userAccount)
				that.account = res.data.result.attachedAccounts
			})
		}
	},
	computed: {}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	@import './HeadMenu'
</style>
