<template>
  <div class="vipcenter">
    <HeadMenu pageTitle="VIP中心"></HeadMenu>
    <div class="vip-content">
      <div class="huobijiaoyi">
        <div class="vip-title">货币交易</div>
        <div class="process-container">
          <div class="process-item">
            <div class="process-item-title">注册币</div>
            <div class="process-item-price">{{balance.registerCoin}}</div>
          </div>

          <div class="process-item">
            <div class="process-item-title">众筹币</div>
            <div class="process-item-price">{{balance.crowdfundingCoin}}</div>
          </div>

          <div class="process-item">
            <div class="process-item-title">拆分币</div>
            <div class="process-item-price">{{balance.splitCoin}}</div>
          </div>
        </div>

        <div class="flow-process-container">
          <div class="btn" @click="recharge">充值</div>
          <ul class="dots complate">
            <li class="dot golden"></li>
            <li class="dot golden"></li>
            <li class="dot golden"></li>
            <li class="dot golden"></li>
            <li class="dot golden"></li>
            <li class="dot golden"></li>
          </ul>
          <div class="btn" @click="buyShow = true">买配套</div>
          <ul class="dots">
            <li class="dot golden"></li>
            <li class="dot golden"></li>
            <li class="dot golden"></li>
            <li class="dot gray"></li>
            <li class="dot gray"></li>
            <li class="dot gray"></li>
          </ul>
          <div class="btn ">卖出</div>
          <ul class="dots">
            <li class="dot gray"></li>
            <li class="dot gray"></li>
            <li class="dot gray"></li>
            <li class="dot gray"></li>
          </ul>
        </div>

        <div class="coin-container">
          <div class="coin-item">
            <div class="coin-item-title">收益币</div>
            <div class="coin-item-price">{{balance.earningsCoin}}</div>
          </div>

          <div class="coin-item">
            <div class="coin-item-title">重构币</div>
            <div class="coin-item-price">{{balance.reconstructionCoin}}</div>
          </div>

          <div class="coin-item">
            <div class="coin-item-title">消费币</div>
            <div class="coin-item-price">{{balance.consumptionCoin}}</div>
          </div>
        </div>
      </div>
      <div class="todayR">
        <div class="vip-title">今日奖金<span class="jine">{{ person.todayReward || 0}}</span>
          <div class="totalR">奖金总额<span class="jine">{{ person.totalReward || 0}}</span></div>
        </div>
      </div>
      <div class="chaifenzoushi">
        <div class="vip-title">拆分走势</div>
        <div class="zoushi-container">
          <div class="current-price">当前价格:2.0</div>
          <div class="chart-content">
            <ul class="line-white">
              <li class="white-li" v-for="(item, idx) in 4" :key="idx"></li>
            </ul>
            <ul class="columnar">
              <li :class="[idx<1?'active':'white']" v-for="(item, idx) in columnarList" :key="idx" :style="item"></li>
            </ul>
            <ul class="columnar-num">
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul>
          </div>
          <div class="price-block"></div>
        </div>
      </div>
      <div class="chaifenjincheng">
        <div class="vip-title">拆分进程</div>
        <div class="vip-map">
          <div class="map-txt"><span v-for="(item, idx) in mapTXT" :key="idx">{{item.txt}}</span></div>
          <div class="map-round">
            <ul v-for="(item, index) in 5" :key="index">
              <li v-for="(tem, idx) in 4" :key="idx" :class="{'active': index < mapStatus || (index == mapStatus && idx ==0)}"></li>
            </ul>
            <ul>
              <li></li>
            </ul>
          </div>
          <div class="map-time" v-if="splitProcessLoaded">
            <span v-for="(item, index) in mapTIME" :key="index">{{item.time}}</span>
          </div>
        </div>
      </div>
      <div class="shujufenxi">
        <div class="vip-title">数据对比 <p>左区 | 右区</p></div>
        <div class="vip-data">
          <div class="data-top">
            <p>今日业绩</p>
            <div class="top-box">
              <div class="box-txt">
                <p>{{person.leftToday}}</p>
                <p>{{person.rightToday}}</p>
              </div>
              <ul class="box-color">
                <li :style="leftToday"></li>
                <li></li>
                <li :style="rightToday"></li>
              </ul>
            </div>
          </div>
          <div class="data-bottom data-top">
            <p>累计业绩</p>
            <div class="top-box">
              <div class="box-txt">
                <p>{{person.leftTotal}}</p>
                <p>{{person.rightTotal}}</p>
              </div>
              <ul class="box-color">
                <li :style="leftTotal"></li>
                <li></li>
                <li :style="rightTotal"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-show="maskShow">
      <div class="alert-content">
        <div class="title">注册币兑换</div>
        <select name="" id="">
          <option value="">注册币</option>
        </select>
        <input
          class="confirmpwd"
          type="tel"
          v-model="sum"
          placeholder="输入需要充值的金额数量"
          @blur="checkSafePwd(sum)"
          style="margin-top: 6px"
        >
        <div class="decision">
          <div class="cancel" @click="cancel">取消</div>
          <div class="decide" @click="changeUserInfo">确定</div>
        </div>
      </div>
    </div>
    <div class="mask" v-show="buyShow">
      <div class="alert-content">
        <div class="title">买配套</div>
        <div class="tips">注册币余额：<span class="f-golden">{{balance.registerCoin}}</span></div>
        <select name="buyLvl" id="buyPT" v-model="buyLvl">
          <option v-for="lvl in pkgLvl" :value="lvl.level">{{pkgLvlMap[lvl.memo]}} ( {{lvl.price}} )</option>
        </select>
        <div class="decision">
          <div class="cancel" @click="buyShow = false">取消</div>
          <div class="decide" @click="confirmBuyPKG">确定</div>
        </div>
      </div>
    </div>
    <prompt ref="promptRef" :tip="tip"></prompt>
  </div>
</template>

<script>
  import Prompt from 'components/Prompt/Prompt'
  import {getUSDTBalance,getPosPerson, getPKGList, buyPKG, getSplitProcess} from 'util/http'
  import HeadMenu from 'components/HeadMenu/HeadMenu'
  import FootNav from 'components/FootNav/FootNav'

  export default {
    data () {
      return {
        balance: {},
        test: {width: '50%'},
        maskShow: false,
        buyShow:false,
        sum: undefined,
        splitProcessLoaded: false,
        columnarList: [
          { height: '16%' },
          { height: '20%' },
          { height: '24%' },
          { height: '28%' },
          { height: '32%' },
          { height: '36%' },
          { height: '40%' },
          { height: '44%' },
          { height: '48%' },
          { height: '52%' },
          { height: '56%' },
          { height: '60%' },
          { height: '64%' },
          { height: '68%' },
          { height: '72%' },
          { height: '76%' },
          { height: '80%' },
          { height: '84%' },
          { height: '88%' },
          { height: '92%' },
          { height: '96%' },
          { height: '100%' },
        ],
        mapTXT: [
          { txt: '开始排队'},
          { txt: '买入' },
          { txt: '一拆' },
          { txt: '二拆' },
          { txt: '三拆' },
          { txt: '卖出' },
        ],
        mapTIME: [
          { time: ''},
          { time: '' },
          { time: '' },
          { time: '' },
          { time: '' },
          { time: '' },
        ],
        mapStatus: 0,
        roundList:[
          [
            '1','2','3','4'
          ],[
            '1','2','3','4'
          ],[
            '1','2','3','4'
          ],[
            '1','2','3','4'
          ],
        ],
        person: {
          topSum:undefined,
          buttonSum: undefined,
        },
        leftToday:{width: ''},
        leftTotal:{width: ''},
        rightToday:{width: ''},
        rightTotal:{width: ''},
        tip: '',
        pkgLvl: [],
        pkgLvlMap: {
          'LV1': '一星会员',
          'LV2': '二星会员',
          'LV3': '三星会员',
          'LV4': '四星会员',
          'LV5': '五星会员'
        },
        buyLvl: '1'
      }
    },
    components: {
      Prompt,
      HeadMenu,
      FootNav
    },
    mounted () {
      this.getBalance()

      this.getPosInfo()

      // 获取配套列表
      getPKGList().then(res=>{
        const {code, result} = res.data

        if (code === 0) {
          this.pkgLvl = result
        }
      })

      // 获取拆分进程
      getSplitProcess().then(res => {
        const {code, result} = res.data
        if (code === 0) {
          this.mapTIME[0] = {time: result.lineupTime ? this.fDate(result.lineupTime) : ''}
          this.mapTIME[1] = {time: result.price || ''}
          this.mapStatus = result.status
          this.splitProcessLoaded = true
        }
      })
    },
    methods: {
      recharge(){
        // 暂不开放
        this.tip = '暂未开放'
        this.$refs.promptRef.show()
        return

        this.maskShow=true
      },
      checkSafePwd(){

      },
      cancel(){
        this.maskShow=false
      },
      changeUserInfo(){
        this.maskShow=false
      },
      confirmBuyPKG () {
        let params = new URLSearchParams()
        params.append('level', parseInt(this.buyLvl))
        buyPKG(params).then(res => {
          const {code, msg} = res.data

          this.tip = msg
          this.$refs.promptRef.show()

          if (code === 0) {
            this.buyShow = false
            this.getBalance()
            this.getPosInfo()
          }
        })
      },
      /**
       * 格式化时间
       * @param {String} strDate
       * @returns {*}
       */
      fDate (strDate) {
        const d = new Date(strDate)
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      },
      getBalance() {
        getUSDTBalance().then(res => {
          if (res.data.code === 0) {
            // console.log(res.data)
            this.balance = res.data.result
          }
        })
      },
      getPosInfo() {
        getPosPerson().then(res => {
          if (res.data.code === 0) {
            this.person = res.data.result;
            this.person.topSum = this.person.leftToday + this.person.rightToday
            this.person.buttonSum = this.person.leftTotal + this.person.rightTotal

            this.leftToday.width = (this.person.leftTodayPercent * 50)+ '%'
            this.leftTotal.width = (this.person.leftTotalPercent * 50) +'%';
            this.rightToday.width =  (this.person.rightTodayPercent * 50) +'%';
            this.rightTotal.width = (this.person.rightTotalPercent * 50) +'%';
          }
        })
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .f-golden
    color #FFAE11
  .vip-data
    display flex
    flex-direction column
    color #eee
    font-size .319rem
    .data-bottom

    .data-top
      display flex
      margin-top 4px
      >p
        margin 0 16px
        padding-top 20px
      .top-box
        display flex
        flex-direction column
        width 65%
        .box-txt
          display flex
          justify-content space-between
          >p
            margin 4px 0
            font-size .266rem
        .box-color
          display flex
          /*justify-content center*/
          border: 1px solid #999
          border-radius 100px
          position relative
          height 10px
          >li{
            position absolute
            height:10px
            &:nth-of-type(2){
              width 2px
              background-color #fff
              top 0
              left 50%
            }&:nth-of-type(1){
               /*width 30%*/
               top 0
               right 50%
               background-color #FFCA00
               border-top-left-radius 100px
               border-bottom-left-radius 100px
               /*flex 1*/
             }&:nth-of-type(3){
                /*width 10%*/
                top 0
                left 50%
                background-color #F77220
                border-top-right-radius 100px
                border-bottom-right-radius 100px
                /*flex 1*/
              }
          }
  .vip-title
    position relative
    >p
      position absolute
      top -12px
      left 45%
      font-size .3478783rem
      color #eee
  .vip-map
    display flex
    flex-direction column
    padding 20px 0
    .map-txt, .map-time
      display flex
      padding 0 0 0 .3230299rem
      justify-content space-evenly
      span
        width 2.333333rem
        font-size 0.266rem
        color #ccc
        text-align center
        &:first-child
          text-align left
    .map-round
      width 8.426667rem
      margin 0 auto
      display flex
      justify-content space-between
      ul
        margin 8px 0
        display flex
        justify-content space-between
        >li
          width 6px
          height:6px
          border-radius 3px
          background-color  #999999
          margin 0 4px
          margin-top 2px
          &:nth-of-type(1)
            margin-top 0
            width 10px
            height:10px
            border-radius 5px
          &.active
            background-color #FFCA00
  .columnar-num
    margin-top 4px
    position absolute
    display flex
    justify-content space-between
    width 100%
    >li
      padding 0 4px
      font-size 0.273333rem
      color #FFCA00

  .columnar
    position absolute
    top 0
    left 0
    display flex
    justify-content space-around
    align-items flex-end
    width 100%
    height 100%
    &>li
      width 3.8%
      background-color transform
      margin 0 2px
      border-top-left-radius 4px
      border-top-right-radius 4px
      &.active
        background-color #EDDE2F
      &.white
        background-color #fff
  .line-white
    display flex
    flex-direction column
    border-bottom 1px solid #ccc
    border-left 1px solid #ccc
    height 100%
    &>li
      height 25%
      border-top 1px dashed #ccc
  .mask
    position fixed
    z-index 1
    left 0
    top 0
    right 0
    bottom 0
    background rgba(0, 0, 0, .5)
    .alert-content
      position relative
      width 7.28rem
      height 5.426667rem
      background #FFF
      left 50%
      display flex
      flex-direction column
      justify-content space-around
      // top 50%
      top 6.493333rem
      margin-left -3.64rem
      // margin-top -1.546667rem
      border-radius .133333rem
      .title
        height .56rem
        line-height .56rem
        margin 0 auto .64rem auto
        padding-top .906667rem
        text-align center
        font-size .426667rem
        color #333
      .tips
        width 6.293333rem
        margin 0 auto
        font-size 0.293rem
        text-align right
      .confirmpwd, select
        display block
        width 6.293333rem
        height .8rem
        padding-left .213333rem
        margin 0 auto
        box-sizing border-box
        border 1px solid #CCC
        font-size .32rem
      .decision
        display flex
        height 1.12rem
        box-sizing border-box
        margin-top .373333rem
        border-top 1px solid #CCC
        font-size .373333rem
        .cancel, .decide
          width 50%
          height 1.106667rem
          text-align center
          line-height 1.106667rem
          color #666
          box-sizing border-box
        .decide
          color #FFAE11
          border-left 1px solid #CCC
  .vipcenter
    background url('./BG.png')
    .vip-content
      .huobijiaoyi
        width 100%
        height 7.066667rem
        margin-top .16rem
        opacity 0.8
        background-image linear-gradient(-180deg, #212121 0%, #040404 100%)
        border-radius .133333rem
        .process-container
          display flex
          justify-content space-around
          padding-top .373333rem
          .process-item
            width 2.786667rem
            height 1.613333rem
            padding .293333rem .293333rem 0
            box-sizing border-box
            background url('../../../assets/币@2x.png') 0 0 / 2.786667rem 1.613333rem no-repeat
            .process-item-title
              height .4rem
              line-height .4rem
              padding-bottom .08rem
              border-bottom 1px solid #FFCA00
              color #EEE
              text-align center
              font-size .293333rem
            .process-item-price
              height .426667rem
              line-height .426667rem
              padding-top .106667rem
              color #FFCA00
              text-align center
              font-size .373333rem
        .flow-process-container
          height 2.093333rem
          padding-top .266667rem
          box-sizing border-box
          .btn
            float left
            width 1.733333rem
            height .773333rem
            line-height .773333rem
            background #FFAE11
            text-align center
            border-radius .106667rem
            font-size .373333rem
            color #FFF
            &:first-child
              margin-left .866667rem
          .dots
            float left
            position relative
            display flex
            justify-content space-around
            width 1.52rem
            height .773333rem
            padding .32rem .106667rem
            box-sizing border-box
            &::after
              position absolute
              left 0
              bottom -0.333333rem
              height .333333rem
              line-height .333333rem
              content '排队等待中...'
              font-size .24rem
              color #FFF
            &.complate
              &::after
                display none
            .dot
              width .133333rem
              height .133333rem
              &.golden
                background url('../../../assets/goldenDot.png') 0 0 / .133333rem .133333rem no-repeat
              &.gray
                background url('../../../assets/grayDot.png') 0 0 / .133333rem .133333rem no-repeat
            &:last-child
              float right
              width 1.8rem
              height 1.053333rem
              padding 0
              flex-direction column
              &::after
                top .453333rem
                left -1.44rem
                display none
        .coin-container
          display flex
          justify-content space-around
          .coin-item
            width 2.413333rem
            height 1.226667rem
            box-sizing border-box
            padding-top .08rem
            border 1px solid #FFCA00
            border-radius 5px
            .coin-item-title
              height .4rem
              line-height .4rem
              padding-bottom .08rem
              border-bottom 1px solid #FFCA00
              color #EEE
              text-align center
              font-size .293333rem
            .coin-item-price
              height .426667rem
              line-height .426667rem
              padding-top .106667rem
              color #FFCA00
              text-align center
              font-size .373333rem
      .todayR
        margin-top .16rem
        .jine
          margin-left .44rem
          font-size .533333rem
        .totalR
          float right
          position relative
          width 50%
          font-size .373333rem
          color #CCC
          .jine
            color #FFCA00
          &::before
            position absolute
            content ''
            left -0.586667rem
            top .373333rem
            width .026667rem
            height .586667rem
            background #FFCA00
      .chaifenzoushi
        width 100%
        height 5.12rem
        margin-top .16rem
        opacity 0.8
        background-image linear-gradient(-180deg, #212121 0%, #040404 100%)
        border-radius .133333rem
        .zoushi-container
          .chart-content
            position relative
            margin 0 auto
            width 8.426667rem
            height 2.24rem
        .current-price
          height .84rem
          padding .253333rem .84rem .173333rem
          box-sizing border-box
          text-align right
          font-size .32rem
          color #FFF

      .chaifenjincheng
        width 100%
        height 3.386667rem
        margin-top .16rem
        opacity 0.8
        background-image linear-gradient(-180deg, #212121 0%, #040404 100%)
        border-radius .133333rem
      .shujufenxi
        width 100%
        height 3.493333rem
        margin-top .16rem
        opacity 0.8
        background-image linear-gradient(-180deg, #212121 0%, #040404 100%)
        border-radius .133333rem
      .vip-title
        position relative
        height 50px
        line-height 50px
        padding-left .586667rem
        opacity 0.8
        background-image linear-gradient(-180deg, #212121 0%, #040404 100%)
        box-shadow 0 .026667rem .053333rem 0 rgba(0, 0, 0, .5)
        border-radius .133333rem
        font-size .48rem
        color #FFCA00
        &::before
          position absolute
          content ''
          width .066667rem
          height 18px
          left 13px
          top 16px
          background #FFCA00
          border-radius 1.333333rem
</style>
