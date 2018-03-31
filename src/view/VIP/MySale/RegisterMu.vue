<template>
	<div class="registermu">
		<HeadMenu :pageTitle="pageTitle"></HeadMenu>
		<div style="height:100%; overflow: auto">
		<form action="" @submit.prevent="registerMuAcc">
			<div class="form-content">
				<div class="m-input">
					<div class="title">{{ t.fields.MemberAccount }}:</div>
					<input type="text" @blur="validate('account', account)" v-model="account" ref="account" name="account" :placeholder="t.placeholder.MemberAccount" />
				</div>

				<div class="m-input">
					<div class="title">{{ t.fields.MemberName }}:</div>
					<input type="text" @blur="validate('nickname', nickname)" v-model="nickname" ref="nickname" :placeholder="t.placeholder.MemberName" />
				</div>

				<div class="m-input">
					<div class="title">{{ t.fields.LoginPassword }}:</div>
					<input type="password" @blur="validate('pwd', pwd)" v-model="pwd" ref="pwd" :placeholder="t.placeholder.LoginPassword" />
				</div>

				<div class="m-input">
					<div class="title">{{ t.fields.ConfirmLoginPassword }}:</div>
					<input type="password" @blur="checkCfmPwd(cfmPwd)" v-model="cfmPwd" ref="cfmPwd" :placeholder="t.placeholder.ConfirmLoginPassword" />
				</div>

				<div class="m-input">
					<div class="title">{{ t.fields.SecurityCode }}:</div>
					<input type="password" @blur="validate('safepwd', safepwd)" v-model="safepwd" ref="safepwd" :placeholder="t.placeholder.SecurityCode" />
				</div>

				<div class="m-input">
					<div class="title">{{ t.fields.ConfirmSecurityCode }}:</div>
					<input type="password" @blur="checkCfmSafepwd(cfmSafepwd)" v-model="cfmSafepwd" ref="cfmSafepwd" :placeholder="t.placeholder.ConfirmSecurityCode" />
				</div>

				<div class="m-input">
					<div class="title">{{ t.fields.MembershipGrade }}:</div>
					<input type="text" :value="$t('MembershipGrade.Regular')" disabled />
				</div>

				<div class="m-input" @click="saveInfo">
					<div class="title">{{ t.fields.Referee }}:
						<span class="entry">{{ $t('common.Enter') }} <span class="tuijiantu" @click="selectData('recommend')">{{ t.fields.RefereeDiagram }}</span></span>
					</div>
					<div @click="selectData('recommend')">
						<input type="text" ref="" v-model="refaccount" @input="hiddeSupMap" disabled />
					</div>
				</div>
				<div class="m-input" @click="saveInfo">
					<div class="title">{{ t.fields.ContactPerson }}: <span class="entry">{{ $t('common.Enter') }} <span class="jiediantu"  @click="selectData('placement')">{{ t.fields.ContactDiagram }}</span></span></div>
					<div @click="selectData('placement')">
						<input type="text" ref="supAccount" v-model="supaccount" disabled />
					</div>
				</div>

				<div class="m-input">
					<div class="title">{{ t.fields.MarketPosition }}:</div>
					<input type="text" ref="position" v-model="direction" disabled />
				</div>

				<div class="m-input">
					<div class="title">{{ t.fields.Email }}:</div>
					<input type="mail" @blur="validate('email', email)" v-model="email" ref="email" name="mail" :placeholder="t.placeholder.Email" />
				</div>

				<div class="m-input">
					<div class="title">{{ t.fields.RegisterCurrencyBalance }}:</div>
					<input type="text" v-model="balance" disabled />
				</div>
			</div>

			<div class="submit">
				<div class="tips-10">{{t.alert}}</div>
				<input type="submit" :value="$t('common.submit')">
				<input type="button" class="back" @click="callbackUrl" :value="$t('common.back')">
			</div>
		</form>
		</div>
		<div v-show="inSelectMode" class="modal-select-data">
			<RecommendChart :selectMode="true" v-on:selectRecommend="selectRecommend" v-if="selectDataType=='recommend'"></RecommendChart>
			<PlacementChart :selectMode="true" v-on:selectSupAccount="selectSupAccount" v-if="selectDataType=='placement'"></PlacementChart>
		</div>
		<prompt :tip="tip" ref="promptAlert"></prompt>
	</div>
</template>

<script>
import {registerMu, getUSDTBalance, verifyRefAccount} from 'util/http'
import {validator} from 'util/util'

import HeadMenu from '@/components/HeadMenu/HeadMenu'
import Prompt from '@/components/Prompt/Prompt'
import RecommendChart from '../OrganizationChart/G-RecommendChart'
import PlacementChart from '../OrganizationChart/G-PlacementChart'

export default {
	name: 'RegisterMu',
	data () {
		return {
			tip: '',
			account: '',
			nickname: '',
			pwd: '',
			cfmPwd: '',
			safepwd: '',
			cfmSafepwd: '',
			email: '',
			direction: '',
			supaccount: 'A000000002',
			refaccount: '',
			balance: 0,
			showJieDian: false,
			inSelectMode: false,
			selectDataType: null,
      pageTitle: this.$t('mysale.RegisterParentAccount'),
      t: null
		}
	},
	components: {
		HeadMenu,
		Prompt,
		RecommendChart,
		PlacementChart
	},
	created () {
		let obj = this.$store.state.registerTempInfo
		this.account = obj.account
		this.nickname = obj.nickname
		this.pwd = obj.pwd
		this.cfmPwd = obj.cfmPwd
		this.safepwd = obj.safepwd
		this.cfmSafepwd = obj.cfmSafepwd
		this.email = obj.email
		this.refaccount = sessionStorage.getItem('ref_account')? sessionStorage.getItem('ref_account'):sessionStorage.getItem('account')
    this.t = this.$t('mysale.RegisterParentAccountPage')
	},
	computed:{
		uid(){
			return this.$store.state.uid
		}
	},
	mounted () {

		if (this.$route.query) {
			if (this.$route.query.direction) {
				this.direction = this.$route.query.direction === 'l' ? this.$t('mysale.LeftRegion') : this.$t('mysale.RightRegion')
			}
			this.supaccount = this.$route.query.parentId
      if (this.$route.query.refaccount) {
        this.refaccount = this.$route.query.refaccount
      }
		}
		getUSDTBalance().then(res => {
			if (res.data.code === 0) {
				this.balance = res.data.result.registerCoin
			}
		})
	},
	methods: {
		callbackUrl () {
			this.$router.go(-1)
		},
		hiddeSupMap(){
			if(this.showJieDian){
				this.showJieDian=false
			}
			this.supaccount=undefined
			this.direction=undefined
		},
		selectData (dataType) {
			this.inSelectMode = true
			this.selectDataType = dataType
      this.pageTitle = dataType === 'recommend' ? this.$t('org.RecommendedFigure') : this.$t('org.ArrangementPlan')
		},
		selectRecommend (selected) {
			this.inSelectMode = false
			this.refaccount = selected
      this.detection()
      this.pageTitle = this.$t('org.RecommendedFigure')
		},
		selectSupAccount (selected) {
			this.inSelectMode = false
			if (selected.direction) {
				this.direction = selected.direction === 'l' ? this.$t('mysale.LeftRegion') : this.$t('mysale.RightRegion')
			}
			this.supaccount = selected.parentId
      this.pageTitle = this.$t('org.ArrangementPlan')
		},
		detection(){  //  检测推荐人获取接点图
			let params = new URLSearchParams()
			params.append('ref_account', this.refaccount)

			verifyRefAccount(params).then(res =>{
				if (res.data.code === 0) {
					// res.data.result.level = level[res.data.result.level - 1]
					this.$store.state.uid= res.data.result.uid
					this.showJieDian = true
					this.tipShow('推荐人可用')
					sessionStorage.setItem('ref_account', this.refaccount)
				}
			})
		},
		getSupAccount(){  //  跳转对应的接点图
			if(this.showJieDian){
				this.$router.replace('/organizationchart/placementchart')
			}else{
				this.tipShow('推荐人不可用')
			}

		},
    validate (fieldName, fieldValue) {
		  const options = {
		    account: {
		      rules: ['enOrNumber', { type: 'size', min: 5, max: 18 }],
          msg: {
            enOrNumber: '会员账号只允许输入英文或者数字',
            size: '会员账号只允许输入5-18位英文或者数字'
          }
        },
        nickname: {
          rules: ['cnOrEn', { type: 'size', min: 2, max: 16 }],
          msg: {
            cnOrEn: '会员姓名只允许输入汉字或者字母',
            size: '会员姓名只允许输入2-16位字母或汉字'
          }
        },
        pwd: {
          rules: ['required', 'enOrNumber', { type: 'size', min: 8, max: 16 }],
          msg: {
            required: '登录密码不能为空',
            enOrNumber: '登录密码只允许输入8-16位英文或数字',
            size: '登录密码只允许输入8-16位英文或数字'
          }
        },
        safepwd: {
          rules: ['enOrNumber', { type: 'size', min: 8, max: 16 }],
          msg: {
            enOrNumber: '安全码只允许输入8-16位英文或数字',
            size: '安全码只允许输入8-16位英文或数字'
          }
        },
        email: {
          rules: ['email'],
          msg: {
            email: '邮箱格式应为 英文/数字+“@”符号+英文/数字+“.”符号+com/cn/net'
          }
        }
      }
      const fieldOptions = options[fieldName]
      const res = validator.check(fieldValue, fieldOptions.rules)
      if (!res.valid) {
		    this.tipShow(fieldOptions.msg[res.err])
        return false
      }
      return true
    },
		checkCfmPwd (cfmPwd) {
			let password = this.$refs.pwd.value
			if (password !== cfmPwd) {
				this.tipShow('两次输入的密码不同')
				return false
			}
		},
		checkCfmSafepwd (cfmSafepwd) {
			let safeword = this.$refs.safepwd.value
			if (safeword !== cfmSafepwd) {
				this.tipShow('两次输入的安全码不同')
				return false
			}
		},
		registerMuAcc () {
			// 检测账户为空问题
			if (!this.account) {
				this.tipShow('会员账号不能为空')
				return false
			}
			// 检测密码为空问题
			if (!this.pwd) {
				this.tipShow('密码不能为空')
				return false
			}
			// 检测安全码为空问题
			if (!this.safepwd) {
				this.tipShow('安全码不能为空')
				return false
			}
			// 检测安全码和密码相同问题
			if (this.pwd === this.safepwd) {
				this.tipShow('登录密码和安全码不能相同')
				return false
			}
			// 2次安全码不一样问题
			if (!this.safepwd === this.cfmSafepwd) {
				this.tipShow('两次安全码输入不一致')
				return false
			}
			// 邮箱不能为空问题
			if (!this.email) {
				this.tipShow('邮箱不能为空')
				return false
			}

			const fields = ['account', 'nickname', 'pwd', 'safepwd', 'email']
      let isFormValid = true
			for(let i = 0; i < fields.length; i++) {
			  if(!this.validate(fields[i], this[fields[i]])) {
          isFormValid = false
          this.$refs[fields[i]].focus()
			    break;
        }
      }
      if(!isFormValid) return

			let params = new URLSearchParams()
			params.append('account', this.$refs.account.value)
			params.append('nickname', this.$refs.nickname.value)
			params.append('pwd', this.$refs.pwd.value)
			params.append('safe_pwd', this.$refs.safepwd.value)
			params.append('email', this.$refs.email.value)
			params.append('sup_account', this.$refs.supAccount.value)
			params.append('position', this.$refs.position.value === this.$t('mysale.LeftRegion') ? 0 : 1)
			params.append('ref_account', this.refaccount)
			registerMu(params).then(res => {
				if (res.data.code === 0) {
					this.tipShow(res.data.msg)
					this.$store.commit('emptyTempInf')
          setTimeout(() => {
            this.callbackUrl()
          }, 1000)
				} else {

					this.tipShow(res.data.msg)
				}
			})
		},
		tipShow (msg) {
			this.tip = msg
			this.$refs.promptAlert.show()
		},
		saveInfo () {
		  // 不保存模板信息
			/*let obj = {
				account: this.account,
				nickname: this.nickname,
				pwd: this.pwd,
				cfmPwd: this.cfmPwd,
				safepwd: this.safepwd,
				cfmSafepwd: this.cfmSafepwd,
				email: this.email
			}
			this.$store.commit('saveRegisterTempInfo', obj)*/
		}
	}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	.registermu
		background #f2f2f2
		.modal-select-data
			position absolute
			top 1.04533rem
			bottom 0
			width 100%
			overflow auto
			background #fff
		.form-content
			overflow hidden
			background #FFF
			.m-input
				display block
				width 9.28rem
				height 1.946667rem
				margin-left .373333rem
				margin-bottom .48rem
				&:first-child
					margin-top .106667rem
				.title
					height .56rem
					line-height .56rem
					padding .133333rem
					font-family 'PingFangSC-Regular'
					color #333
					font-size .4rem
					.entry
						float right
						.tuijiantu
							color #ffca00
							text-decoration underline
						.jiediantu
							color #999
							text-decoration underline
				input
					display block
					box-sizing border-box
					width 9.28rem
					border-radius .133333rem
					border 1px solid #ababab
					color #333
					font-size .373333rem
					&[disabled]
						background #F1F1F1
						color #666
					&::-webkit-input-placeholder
						color #ababab
		.lastIpt
			margin-bottom 17px
		.submit
			width 8.72rem
			height 3.52rem
			margin .253333rem auto 0rem
			.tips-10
				text-align center
				color #FFCA00
				font-size .32rem
			input
				width 8.72rem
				height 1.12rem
				box-sizing border-box
				margin 0 auto
				background #ffca00
				border-radius .133333rem
				color #fff
				border none
				font-size .426667rem
				&.back
					background #ababab
</style>
