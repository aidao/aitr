import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import { i18n, loadLanguageAsync } from '../common/js/i18n-setup.js'
Vue.use(Router)

const Index = resolve => {
	import('view/Index/Index').then(module => {
		resolve(module)
	})
}
const Login = resolve => {
	import('view/Login/Login').then(module => {
		resolve(module)
	})
}
const CoinExchange = resolve => {
	import('view/CoinExchange/G-Trading').then(module => {
		resolve(module)
	})
}
const TradingBuy = resolve => {
	import('view/CoinExchange/G-TradingBuy').then(module => {
		resolve(module)
	})
}
const TradingSell = resolve => {
	import('view/CoinExchange/G-TradingSell').then(module => {
		resolve(module)
	})
}
const UserCenter = resolve => {
	import('view/UserCenter/UserCenter').then(module => {
		resolve(module)
	})
}
const UserInfo = resolve => {
	import('view/UserCenter/UserInfo/UserInfo').then(module => {
		resolve(module)
	})
}
const ChangeUserInfo = resolve => {
	import('view/UserCenter/UserInfo/ChangeUserInfo').then(module => {
		resolve(module)
	})
}
const ChangePassword = resolve => {
	import('view/UserCenter/UserInfo/ChangePassword').then(module => {
		resolve(module)
	})
}
const ChangeSafeword = resolve => {
	import('view/UserCenter/UserInfo/ChangeSafeword').then(module => {
		resolve(module)
	})
}
const AssetsManage = resolve => {
	import('view/UserCenter/AssetsManage/G-AssetsManage').then(module => {
		resolve(module)
	})
}
const SpotAccount = resolve => {
	import('view/UserCenter/AssetsManage/G-SpotAccount').then(module => {
		resolve(module)
	})
}
const LeverAccount = resolve => {
	import('view/UserCenter/AssetsManage/G-LeverAccount').then(module => {
		resolve(module)
	})
}
const VIPCenter = resolve => {
	import('view/VIP/VIPCenter/VIPCenter').then(module => {
		resolve(module)
	})
}
// 资产管理部分
const OrganizationChart = resolve => {
	import('view/VIP/OrganizationChart/OrganizationChart').then(module => {
		resolve(module)
	})
}
const RecommendChart = resolve => {
	import('view/VIP/OrganizationChart/G-RecommendChart').then(module => {
		resolve(module)
	})
}
const PlacementChart = resolve => {
	import('view/VIP/OrganizationChart/G-PlacementChart').then(module => {
		resolve(module)
	})
}

const RegisterMu = resolve => {
	import('view/VIP/MySale/RegisterMu').then(module => {
		resolve(module)
	})
}
const ChongGou = resolve => {
	import('view/VIP/MySale/ChongGou').then(module => {
		resolve(module)
	})
}

const MySale = resolve => {
	import('view/VIP/MySale/MySale').then(module => {
		resolve(module)
	})
}

const BuyMatch = resolve => {
	import('view/VIP/MySale/BuyMatch').then(module => {
		resolve(module)
	})
}
const UnbindSubAccount = resolve => {
	import('view/VIP/MySale/UnbindSubAccount').then(module => {
		resolve(module)
	})
}
const BindMuAccount = resolve => {
	import('view/VIP/MySale/BindMuAccount').then(module => {
		resolve(module)
	})
}
const USDTRegister = resolve => {
	import('view/VIP/MySale/USDTRegister').then(module => {
		resolve(module)
	})
}
const MyWallet = resolve => {
	import('view/VIP/MyWallet/MyWallet').then(module => {
		resolve(module)
	})
}

const Transactions = resolve => {
	import('view/VIP/MyWallet/Transactions').then(module => {
		resolve(module)
	})
}
const TransactionsShouYi = resolve => {
	import('view/VIP/MyWallet/TransactionsShouYi').then(module => {
		resolve(module)
	})
}
const TransactionsZhuCe = resolve => {
	import('view/VIP/MyWallet/TransactionsZhuCe').then(module => {
		resolve(module)
	})
}

const ShouYiCoin = resolve => {
	import('view/VIP/MyWallet/ShouYiCoin').then(module => {
		resolve(module)
	})
}
const USDTCoin = resolve => {
	import('view/VIP/MyWallet/USDTCoin').then(module => {
		resolve(module)
	})
}
// USDT转账
const USDTTransfer = resolve => {
	import('view/VIP/MyWallet/G-USDTTransfer').then(module => {
		resolve(module)
	})
}
// 注册币转账
const EarningTransfer = resolve => {
	import('view/VIP/MyWallet/G-EarningTransfer').then(module => {
		resolve(module)
	})
}
const ChongGouCoin = resolve => {
	import('view/VIP/MyWallet/ChongGouCoin').then(module => {
		resolve(module)
	})
}
const ZhongChouCoin = resolve => {
	import('view/VIP/MyWallet/ZhongChouCoin').then(module => {
		resolve(module)
	})
}
const ChaiFenCoin = resolve => {
	import('view/VIP/MyWallet/ChaiFenCoin').then(module => {
		resolve(module)
	})
}
const XiaoFeiCoin = resolve => {
	import('view/VIP/MyWallet/XiaoFeiCoin').then(module => {
		resolve(module)
	})
}
const JiangjinDetail = resolve => {
	import('view/VIP/JiangjinDetail/JiangjinDetail').then(module => {
		resolve(module)
	})
}
const CoinInfo = resolve => {
	import('view/VIP/MyWallet/G-CoinInfo').then(module => {
		resolve(module)
	})
}

const TransferRouter = resolve => {
	import('view/VIP/MyWallet/G-CoinTransferRouter').then(module => {
		resolve(module)
	})
}
const CoinTransfer = resolve => {
	import('view/VIP/MyWallet/G-CoinTransfer').then(module => {
		resolve(module)
	})
}

const NoOpn = resolve => {
	import('view/NoOpn/NoOpn').then(module => {
		resolve(module)
	})
}
const resetPwd = resolve => {
	import('view/reset/password').then(module => {
		resolve(module)
	})
}
const resetAuth = resolve => {
	import('view/reset/auth').then(module => {
		resolve(module)
	})
}
const resetNewPwd = resolve => {
	import('view/reset/new-pwd').then(module => {
		resolve(module)
	})
}
const resetNewSafe = resolve => {
	import('view/reset/new-safe').then(module => {
		resolve(module)
	})
}

const routes = [
	{
		path: '/',
		redirect: 'vip'
	},
	{
		path: '/index',
		component: Index
	},
	{
		name: 'login',
		path: '/login',
		component: Login
	},
	{
		path: '/coinexchange',
		redirect: '/coinexchange/tradingbuy',
		component: CoinExchange,
		children: [
			{
				path: 'tradingbuy',
				component: TradingBuy
			},
			{
				path: 'tradingsell',
				component: TradingSell
			}
		]
	},
	{
		path: '/usercenter',
		component: UserCenter
	},
	{
		path: '/userinfo',
		component: UserInfo
  },
  {
		path: '/changeuserinfo/:type',
		component: ChangeUserInfo
	},
	{
		path: '/cgpwd',
		component: ChangePassword
	},
	{
		path: '/cgsfw',
		component: ChangeSafeword
	},
	{
		path: '/assetsmanage',
		component: AssetsManage,
		redirect: '/assetsmanage/spotaccount',
		children: [
			{
				path: 'spotaccount',
				component: SpotAccount
			},
			{
				path: 'leveraccount',
				component: LeverAccount
			}
		]
	},
	{
		path: '/vip',
		component: VIPCenter,
		name: 'vip'
	},
	{
		path: '/organizationchart',
		component: OrganizationChart,
		redirect: '/organizationchart/placementchart',
		children: [
			{
				path: 'recommendchart',
				component: RecommendChart
			},
			{
				path: 'placementchart',
				component: PlacementChart
			}
		]
	},
	{
		path: '/mysale',
		component: MySale,
		name: 'mysale'
	},
	{
		path: '/registermu',
		name: 'RegisterMu',
		component: RegisterMu
	},
	{
		path: '/chonggou',
		component: ChongGou
	},
	{
		path: '/buymatch',
		component: BuyMatch
	},
	{
		path: '/unbindsubaccount',
		component: UnbindSubAccount
	},
	{
		path: '/bindmuaccount',
		component: BindMuAccount
	},
	{
		path: '/usdtregister',
		component: USDTRegister
	},
	{
		path: '/mywallet',
		component: MyWallet,
		name: 'mywallet'
	},
	{
		path: '/transactions',
		component: Transactions,
		name: 'transactions',
		redirect: '/transactions/TransactionsShouYi',
		children: [
			{
				path: 'TransactionsShouYi',
				component: TransactionsShouYi,
				name: 'TransactionsShouYi'
			},
			{
				path: 'TransactionsZhuCe',
				component: TransactionsZhuCe,
				name: 'TransactionsZhuCe'
			}
		]
	},
	{
		path: '/transferrouter',
		component: TransferRouter,
		name: 'TransferRouter',
		redirect: '/transferrouter/cointransfer/1',
		children: [
			{
				path: 'cointransfer/:typeid',
				component: CoinTransfer,
				name: 'cointransfer'
			}
		]
	},
	{
		path: '/shouyicoin',
		component: ShouYiCoin
	},
	{
		path: '/usdtcoin',
		component: USDTCoin
	},
	{
		path: '/chonggoucoin',
		component: ChongGouCoin
	},
	{
		path: '/zhongchou',
		component: ZhongChouCoin
	},
	{
		path: '/chaifencoin',
		component: ChaiFenCoin
	},
	{
		path: '/xiaofeicoin',
		component: XiaoFeiCoin
	},
	{
		path: '/jiangjindetail',
		component: JiangjinDetail
	},
	{
		path: '/usdttransfer',
		component: USDTTransfer
	},
	{
		path: '/earningtransfer',
		component: EarningTransfer
	},
	{
		path: '/coininfo/:typeid',
		component: CoinInfo,
		name: 'coininfo'
	},
	{
		path: '/noOpn',
		component: NoOpn
	},
	{
		path: '/reset',
		component: resetPwd
	},
	{
		path: '/reset/auth',
		component: resetAuth
	},
	{
		path: '/reset/new-pwd',
		component: resetNewPwd
	},
	{
		path: '/reset/new-safe',
		component: resetNewSafe
	}
]

const router = new Router({
	routes
})

router.beforeEach ((to, from, next) => {
	if(to.path === '/noOpn') {
		router.app.$store.commit('commonPrompt', {
			show: true,
			tip: '暂未开放'
		})
		next(false)
		return
	}
	// 加载多语言
	const lang = i18n.locale || 'ch'
	loadLanguageAsync(lang).then(() => next())

	if (to.path !== '/login' && to.path !== '/reset' && to.path !== '/reset/auth' && to.path !== '/reset/new-pwd' && to.path !== '/reset/new-safe') {
		localStorage.setItem('lastVisitPath', to.path)

		if (!sessionStorage.getItem('__token__')) {
			router.push({ name: 'login' })
		} else {
			next()
		}
	} else {
		next()
	}
})
axios.interceptors.response.use(function (response) {
	if (response.data.code === 10005) {
		localStorage.clear()
		router.replace({
			path: '/login'
		})
	}
	return response
}, function (error) {
	return Promise.reject(error)
})

export default router
