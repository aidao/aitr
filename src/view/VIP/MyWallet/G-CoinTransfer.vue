<template>
  <div class="earning-transfer">
    <div class="content">
      <div class="center" >
        <div class="tips" v-if="types == 1">
          收益币余额:
        </div>
        <div class="values" v-if="types == 1">
          {{walletData.earningsCoin}}
        </div>
        <div class="tips" v-if="types == 0">
          注册币余额:
        </div>
        <div class="values" v-if="types == 0">
          {{walletData.registerCoin}}
        </div>
        <div class="tips">
          接收会员账号:
        </div>
        <div class="valuess">
          <input
            type="text"
            ref="userId"
            placeholder="输入收款会员编号"
            @blur="validate('userId', transformInfo.userId)"
            @focus="countFocus('userId')"
            @click.prevent="countFocus('userId')"
            v-model="transformInfo.userId">
        </div>
        <div class="tips">
          转出积分数量:
        </div>
        <div class="valuess">
          <input
            type="tel"
            ref="count"
            placeholder="输入转出积分数量"
            @blur="validate('coinNum', transformInfo.coinNum)"
            @focus="countFocus('count')"
            @click.prevent="countFocus('count')"
            v-model="transformInfo.coinNum">
        </div>
      </div>

      <div class="bottom">
        <span class="oks" @click="comfirmTransfer">确定</span>
        <span class="back" @click="callbackUrl">返回</span>
      </div>
    </div>
    <g-alert @options="safeCodeOptions" v-show="showSafeCodeAlert">
      <div class="tipss">
        输入安全码
      </div>
      <div>
        <input type="password" placeholder="输入您的安全码" :style="alertStyle" v-model="safeCode">
      </div>
    </g-alert>
    <prompt :tip="tip" ref="promptAlert"></prompt>
  </div>
</template>

<script>
  import HeadMenu from 'components/HeadMenu/HeadMenu'
  import Prompt from 'components/Prompt/Prompt'
  import {getToken, getByWallet, transferRegCoinUrl, transferEarCoinUrl, checkSafeCodeUrl} from '../../../api/GApi'
  import axios from 'axios'
  import GAlert from 'components/GAlert/GAlert'
  import { validator } from 'util/util'

  export default {
    data () {
      return {
        title: '',
        walletData: {
          'consumptionCoin': 0,
          'crowdfundingCoin': 0,
          'earningsCoin': 0,
          'reconstructionCoin': 0,
          'registerCoin': 0,
          'splitCoin': 0
        },
        showSafeCodeAlert: false,
        safeCode: null,
        alertStyle: {
          height: '.8rem',
          width: '6.293333rem',
          color: '#ABABAB',
          border: '.013333rem solid #CCCCCC',
          fontSzie: '.32rem',
          paddingLeft: '.133333rem'
        },
        transformInfo: {
          userId: null,
          coinNum: null
        },
        showTip: false,
        tip: ''
      }
    },
    created () {
      this.initPage()
    },
    watch: {
      $route () {
        this.initPage()
      }
    },
    components: {
      HeadMenu,
      GAlert,
      Prompt
    },
    methods: {
      callbackUrl () {
        this.$router.push('/mywallet')
      },
      initPage () {
        let types = parseInt(this.$route.params.typeid)
        if (types === 0) {
          this.title = '注册币'
        } else if (types === 1) {
          this.title = '收益币'
        }
        this.types = types

        // 清空数据
        this.transformInfo = {
          userId: null,
          coinNum: null
        }
        this.safeCode = null

        // 获取钱包余额
        axios.get(getByWallet, {headers: getToken()}).then(res => {
          // 没获取到数据，所以先不填
          console.log(res)
          if (res.data.code === 0) {
            this.walletData = res.data.result
          }
        })
      },
      showTips (tip) {
        this.tip = tip
        this.$refs.promptAlert.show()
      },
      // 监听安全码验证
      safeCodeOptions (flag) {
        console.log(flag)
        this.showSafeCodeAlert = false
        if (flag === 'cancal') {
          // 取消
          this.safeCode = ''
        } else {
          // 确认
          if (!this.safeCode) {
            this.tip = '安全码不能为空'
            this.$refs.promptAlert.show()
            return
          }
          console.log('你输入的安全码是' + this.safeCode)
          // 根据安全码获取口令
          let params = new URLSearchParams()
          params.append('safe_pwd', this.safeCode)
          axios.post(checkSafeCodeUrl, params, {
            headers: getToken()
          }).then(res => {
            console.log(res.data)
            if (res.data.code === 0) {
              let safePwdToken = res.data.result.safePwdToken
              let url = null
              // 安全码验证成功，判断是注册币还是收益币转账
              if (this.title === '注册币') {
                url = transferRegCoinUrl
              } else if (this.title === '收益币') {
                url = transferEarCoinUrl
              }
              this.safeCode = ''
              // 获取成功，获取转账连接需要的参数
              let params = new URLSearchParams()
              params.append('transfer_account', this.transformInfo.userId)
              params.append('amount', parseInt(this.transformInfo.coinNum))
              params.append('safe_pwd_token', safePwdToken)
              // 发送转账请求
              axios.post(url, params, {
                headers: getToken()
              }).then(res => {
                console.log(res)
                if (res.data.code === 0) {
                  this.tip = '转账成功'
                  this.$refs.promptAlert.show()
                  this.$router.push(`/coininfo/${this.$route.params.typeid}`)
                } else {
                  if (res.data.code === 40009) {
                    this.showTips('接收会员账号不存在')
                  } else if (res.data.code === 40014) {
                    this.showTips('账号没有推荐关系')
                  } else {
                    this.showTips(res.data.msg)
                  }
                }
              })
            } else {
              // 安全码验证失败
              this.safeCode = ''
              this.tip = '安全码输入错误'
              this.$refs.promptAlert.show()
            }
          })
        }
      },
      comfirmTransfer () {
        if(!this.validate('userId', this.transformInfo.userId)) return
        if(!this.validate('coinNum', this.transformInfo.coinNum)) return
        if (this.transformInfo.coinNum > this.walletData.registerCoin) {
          this.showTips('注册币余额不足')
          return
        } else if (this.transformInfo.coinNum >= 100000000) {
          this.showTips('转出积分数量不能超出1亿')
          return
        }
        this.showSafeCodeAlert = true
      },
      validate (fieldName, fieldValue) {
        const options = {
          userId: {
            rules: ['required'],
            msg: {
              required: '接收会员账号不能为空'
            }
          },
          coinNum: {
            rules: ['required', 'positiveInt'],
            msg: {
              required: '转账积分数量不能为空',
              positiveInt: '转出数量只能为正整数'
            }
          }
        }
        const fieldOptions = options[fieldName]
        const res = validator.check(fieldValue, fieldOptions.rules)
        if (!res.valid) {
          this.showTips(fieldOptions.msg[res.err])
          return false
        }
        return true
      },
      countFocus (ref) {
        setTimeout(() => {
          const _el = this.$refs[ref]
          _el.scrollIntoView(true)
        }, 200)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .earning-transfer
    /*height 100%*/
    .header
      height: 1.306667rem
      background-color :#000000
    .content
      position: absolute
      top: 1.133333rem
      left: 0
      right: 0
      bottom: 0
      margin-top: 1.306667rem
      box-sizing: border-box
      background-color: #F2F2F2
      .top
        font-family: MicrosoftYaHei
        font-size: .373333rem
        color: #333333
        line-height :1rem
        text-align center
        padding : 0 .266667rem
        box-sizing :border-box
        span
          display :block
          border-bottom : 1px solid #CCCCCC
      .center
        background-color :white
        margin-top :.133333rem
        font-size :.4rem
        box-sizing :border-box
        padding :0 .5333rem .8rem
        .tips
          line-height :1rem
          padding-left :.1333rem
          margin-top :.266667rem
          height :1rem
        .values
          background: #F3F3F3
          border: 1px solid #ABABAB
          border-radius: .133333rem
          line-height :1rem
          padding-left :.266667rem
          color :#666
          height :1rem
        .other
          color :#333
          display :flex
          justify-content :space-between
          align-items :center
          img
            width :.266667rem
            height :.4rem
            margin-right :.266667rem
        .valuess
          input
            border: 1px solid #ABABAB
            border-radius: .133333rem
            line-height :1rem
            padding-left :.266667rem
            width :100%
            font-size :.373333rem
            box-sizing :border-box
      .bottom
        height :1.333333rem
        display :block
        margin-top: 15px
        width :100%
        span
          display: block
          margin: .39999rem .6666rem
          border-radius: .133333rem
          text-align :center
          font-size :.426667rem
          color :white
          height :100%
          line-height :1.333333rem
          &.back
            background-color :#D2D2D2
          &.oks
            background :#FFCA00
</style>
