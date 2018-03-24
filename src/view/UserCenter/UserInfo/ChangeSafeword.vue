<template>
  <div class="changepwd">
    <HeadMenu pageTitle="修改安全码"></HeadMenu>
    <form action="" @submit.prevent="getVerifySafePwd">

      <ul class="nav-list">
        <li>
          <input
            type="password"
            @blur="checkVerifySafePwd(safecode)"
            ref="verifySafePwd"
            name="account"
            v-model="verifySafePwd"
            placeholder="输入旧的安全码"
          />
        </li>
        <li>
          <input
            type="password"
            @blur="checkSafecode(safecode)"
            ref="safecode"
            name="account"
            v-model="safecode"
            placeholder="输入新的安全码"
          />
        </li>
        <li>
          <input
            type="password"
            ref="verifySafecode"
            placeholder="确认新安全码"
            v-model="cfmSafecode"
            @blur="checkCfmSafecode(cfmSafecode)"
          />
        </li>
      </ul>

      <div class="bottom">
        <input type="submit" class="oks" value="确认修改">
        <span class="back" @click="callbackUrl">返回</span>
      </div>
    </form>

    <div class="mask" v-show="maskShow">
      <div class="alert-content">
        <div class="title">输入当前安全码</div>
        <input
          class="confirmpwd"
          ref="verifySafePwd"
          type="password"
          v-model="verifySafePwd"
          @blur="checkVerifySafePwd(verifySafePwd)"
          placeholder="输入您的当前安全码"
        >
        <div class="decision">
          <div class="cancel" @click="cancel">取消</div>
          <div class="decide" @click="changeUserSafePwd">确定</div>
        </div>
      </div>
    </div>
    <prompt :tip="tip" ref="promptRef"></prompt>
  </div>
</template>

<script>
  import {verifySafePwd, updateSafePwd} from 'util/http'

  import HeadMenu from 'components/HeadMenu/HeadMenu'
  import Prompt from 'components/Prompt/Prompt'

  export default {
    data () {
      return {
        maskShow: false,
        tip: '',
        safecode: '',
        cfmSafecode: '',
        verifySafePwd: ''
      }
    },
    components: {
      HeadMenu,
      Prompt
    },
    methods: {
      callbackUrl () {
        this.$router.go(-1)
      },
      changeUserSafePwd () {
        if (!this.verifySafePwd) {
          this.tip = '当前安全码不能为空'
          this.$refs.promptRef.show()
          return
        } else if (!/^[a-zA-Z0-9]{8,16}$/.test(this.verifySafePwd)) {
          this.tip = '只能输入8-16位的数字或字母'
          this.$refs.promptRef.show()
          return
        }
        let safecode = this.$refs.safecode.value
        let verifySafecode = this.$refs.verifySafecode.value
        let verifySafePwdd = this.$refs.verifySafePwd.value
        let verifySafePwdParams = new URLSearchParams()
        let updateSafePwdParams = new URLSearchParams()
        verifySafePwdParams.append('safe_pwd', verifySafePwdd)

        verifySafePwd(verifySafePwdParams).then(res => {
          if (res.data.code === 40011) {
            this.tip = '会员安全码错误'
            this.$refs.promptRef.show()
            return
          }
          let safePwdToken = res.data.result.safePwdToken
          updateSafePwdParams.append('safe_pwd', verifySafecode)
          updateSafePwdParams.append('safe_pwd_token', safePwdToken)
          console.log(updateSafePwdParams)
          if (safecode === verifySafecode) {
            updateSafePwd(updateSafePwdParams).then(res => {
              if (res.data.code === 40011) {
                this.tip = '会员安全码错误'
                this.$refs.promptRef.show()
              }
              if (res.data.code === 40013) {
                this.tip = '安全码修改失败'
                this.$refs.promptRef.show()
              }
              if (res.data.code === 0) {
                this.tip = '修改成功'
                this.$refs.promptRef.show()
                this.callbackUrl()
              }
              this.maskShow = false
              this.$refs.verifySafePwd.value = ''
            })
          }
        })
      },
      cancel () {
        this.maskShow = false
        this.$refs.verifySafePwd.value = ''
      },
      getVerifySafePwd () {

        if (!this.safecode) {
          this.tip = '新安全码不能为空'
          this.$refs.promptRef.show()
          return
        } else if (!/^[a-zA-Z0-9]{8,16}$/.test(this.safecode)) {
          this.tip = '只能输入8-16位的数字或字母'
          this.$refs.promptRef.show()
          return
        }
        if (!this.cfmSafecode) {
          this.tip = '确认新安全码不能为空'
          this.$refs.promptRef.show()
          return
        } else if (this.cfmSafecode !== this.safecode) {
          this.tip = '两次安全码输入不一致'
          this.$refs.promptRef.show()
          return
        }
        // this.maskShow = true
        this.changeUserSafePwd()
      },
      checkSafecode (safecode) {
        if (!safecode) {
          this.tip = '安全码不能为空'
          this.$refs.promptRef.show()
        } else if (!/^[a-zA-Z0-9]{8,16}$/.test(safecode)) {
          this.tip = '安全码只能输入8-16位的数字或者字母'
          this.$refs.promptRef.show()
        }
      },
      checkCfmSafecode (cfmSafecode) {
        if (!cfmSafecode) {
          this.tip = '新的安全码不能为空'
          this.$refs.promptRef.show()
        } else if (cfmSafecode !== this.safecode) {
          this.tip = '两次安全码输入不一致'
          this.$refs.promptRef.show()
        }
      },
      checkVerifySafePwd (verifySafePwd) {
        if (!verifySafePwd) {
          this.tip = '当前安全码不能为空'
          this.$refs.promptRef.show()
        } else if (!/^[a-zA-Z0-9]{8,16}$/.test(verifySafePwd)) {
          this.tip = '只能输入8-16位的数字或字母'
          this.$refs.promptRef.show()
        }
      }
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  .changepwd
    height 100%
    background #f2f2f2
    .form-content
      overflow hidden
      background #FFF
    .submit
      width 8.72rem
      height 1.12rem
      margin .853333rem auto 0
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
        height 4.426667rem
        background #FFF
        left 50%
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
        .confirmpwd
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
    .bottom
      display :block
      margin-top: 15px
      width :100%
      input
        display block
        width 8.72rem
        height 1.12rem
        box-sizing border-box
        margin 0 auto
        background #ffca00
        border-radius .133333rem
        color #fff
        border none
        font-size .426667rem
      span
        display: block
        margin: .39999rem .6666rem
        border-radius: .133333rem
        text-align :center
        font-size :.426667rem
        color :white
        width 8.72rem
        height 1.12rem
        line-height 1.12rem
        &.back
          background-color :#D2D2D2
        &.oks
          background :#FFCA00
</style>

<style>
  .nav-list input{
    width: 100%;
    outline: none;
    border: none;
    padding-left: 0;
    padding-right: 0;
  }
</style>
