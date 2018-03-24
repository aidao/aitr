<template>
  <div class="main">
    <GHeader>
      <lang-seletor></lang-seletor>
    </GHeader>
    <div class="triangle"></div>
    <p>确认重置</p>
    <div class="input-box">
      <input type="text" v-model="account" readonly="readonly">
      <input type="email" v-model="userEmail" readonly="readonly">
      <div class="box-auth">
        <input type="text" placeholder="请输入邮箱验证码" v-model="verifyCode">
        <button type="button" @click="getAuth" :disabled="btndisabled">{{bthTxt}}</button>
      </div>
      <input
        type="password"
        placeholder="输入新密码，仅限8-16位英文或者数字"
        v-model="pwd"
        @blur="validate('pwd', pwd)"
        ref="pwd">
      <input
        type="password"
        placeholder="确认新密码，与新密码相同"
        v-model="cfmPwd"
        @blur="checkCfmPwd(cfmPwd)"
        ref="cfmPwd">
      <input
        type="password"
        placeholder="输入新安全码，仅限8-16位英文或者数字"
        v-model="safepwd"
        @blur="validate('safepwd', safepwd)"
        ref="safepwd">
      <input
        type="password"
        placeholder="确认新安全码，与新安全码相同"
        v-model="cfmSafepwd"
        @blur="checkCfmSafepwd(cfmSafepwd)"
        ref="cfmSafepwd">
    </div>
    <button type="button" @click="onSubmit">完成</button>
    <prompt :tip="tip" ref="promptAlert"></prompt>
  </div>
</template>

<script>
  import GHeader from 'components/GHeader/GHeader'
  import LangSeletor from 'components/LangSeletor/LangSeletor'
  import Prompt from 'components/Prompt/Prompt'
  import { getEmailByAccount, sendVerifyCodeEmail } from 'util/http'
  import {validator} from 'util/util'
  import { resetPwdAndSafePwd } from 'util/http'

  export default {
    name: 'auth',
    data () {
      return {
        account: undefined,
        userEmail: undefined,
        verifyCode: undefined,
        pwd: '',
        cfmPwd: '',
        safepwd: '',
        cfmSafepwd: '',
        bthTxt: '发送验证',
        tip: '',
        btndisabled: false,
        params:{},
        InterVal : undefined, //  定时器
        count: 10,
        curCount: undefined
      }
    },
    components: {
      Prompt,
      GHeader,
      LangSeletor
    },
    mounted (){
      this.account = sessionStorage.getItem('account')
      this.getEmailByAccount()
    },
    methods:{
      getEmailByAccount(){
        getEmailByAccount(this.account).then(res =>{
          if (res.data.code === 0) {
            // res.data.result.level = level[res.data.result.level - 1]
            this.userEmail = res.data.result.email
          }
        })
      },
      getAuth(){  //  获取验证码
        sendVerifyCodeEmail(this.account).then(res =>{

          if (res.data.code === 0) {
            this.btndisabled=true;
            this.curCount = this.count;
            this.bthTxt = this.curCount + 's';
            this.InterVal = window.setInterval(this.SetRemainTime, 1000);
          }else{
            this.tip = res.data.msg
            this.$refs.promptAlert.show()
          }
        })
      },

      onSubmit(){
        if (!this.verifyCode) {
          this.tip = '验证码不能为空'
          this.$refs.promptAlert.show()
          return
        }

        const isPwdCorrect = this.validate('pwd', this.pwd) && this.checkCfmPwd(this.cfmPwd)
        if(!isPwdCorrect) return


        const isSafePwdCorrect = this.validate('safepwd', this.safepwd) && this.checkCfmSafepwd(this.cfmSafepwd)
        if(!isSafePwdCorrect) return

        let params = new URLSearchParams()
        params.append('account', this.account)
        params.append('pwd', this.pwd)
        params.append('safePwd', this.safePwd)
        params.append('verifyCode', this.verifyCode)

        resetPwdAndSafePwd(params).then(res =>{
          const {code, msg} = res.data
          if (code === 0) {
            this.tipShow('重置成功')
            this.$router.replace('/login')
          } else {
            this.tipShow(msg)
          }
        })
      },
      getByteLen(val) { //  输出汉字和字母的字符数
        let len = 0;
        for (let i = 0; i < val.length; i++) {
          let a = val.charAt(i);
          if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 2;
          }
          else {
            len += 1;
          }
        }
        return len;
      },
      SetRemainTime(){
        if(this.curCount==0){
          window.clearInterval(this.InterVal);//停止计时器
          this.btndisabled=false;
          this.bthTxt='发送验证';
        }else{
          this.curCount--;
          this.bthTxt = this.curCount + 's';
        }
      },

      // 密码等校验
      validate (fieldName, fieldValue) {
        const options = {
          pwd: {
            rules: ['required', 'enOrNumber', { type: 'size', min: 8, max: 16 }],
            msg: {
              required: '登录密码不能为空',
              enOrNumber: '登录密码只允许输入8-16位英文或数字',
              size: '登录密码只允许输入8-16位英文或数字'
            }
          },
          safepwd: {
            rules: ['required', 'enOrNumber', { type: 'size', min: 8, max: 16 }],
            msg: {
              required: '安全码不能为空',
              enOrNumber: '安全码只允许输入8-16位英文或数字',
              size: '安全码只允许输入8-16位英文或数字'
            }
          },
        }
        const fieldOptions = options[fieldName]
        const res = validator.check(fieldValue, fieldOptions.rules)
        if (!res.valid) {
          this.tipShow(fieldOptions.msg[res.err])
          return false
        }
        return true
      },

      // 确认密码
      checkCfmPwd (cfmPwd) {
        let password = this.$refs.pwd.value

        if (!cfmPwd) {
          this.tipShow('请确认密码')
          return false
        }

        if (password !== cfmPwd) {
          this.tipShow('两次输入的密码不同')
          return false
        }

        return true
      },

      // 确认安全码
      checkCfmSafepwd (cfmSafepwd) {
        let safeword = this.$refs.safepwd.value

        if (!cfmSafepwd) {
          this.tipShow('请确认安全码')
          return false
        }

        if (safeword !== cfmSafepwd) {
          this.tipShow('两次输入的安全码不同')
          return false
        }

        return true
      },

      tipShow (msg) {
        this.tip = msg
        this.$refs.promptAlert.show()
      },
    }
  }
</script>

<style scoped lang='stylus'>
  .main
    display flex
    flex-direction column
    height 100vh
    background-color #faf8f8
    p
      text-align center
      font-size 24px
      line-height 40px
    .input-box
      width 80%
      margin 18px auto
      display flex
      flex-direction column
      .box-auth
        display: flex
        justify-content space-between
        >button
          &:disabled
            background-color #cccccc
            color #fff
          border-radius 6px
          background-color #FFCA00
          color: #fff
          font-size .373333rem
          line-height 1
          border none
          margin 8px 0 8px 8px
          white-space nowrap
          display inline-block
          width 2.293rem
    input
      flex 1
      border-radius 6px
      border 1px solid #ccc
      font-size .373333rem
      line-height 1
      padding 6px 12px
      margin 8px 0
      min-width 20px
    button
      width 80%
      margin 0 auto
      border-radius 6px
      background-color #FFCA00
      font-size 18px
      line-height 38px
      border none
  .triangle
    height 0.186rem
    margin-top 2px
    background url('./Triangle.png') center center / 0.293rem 0.186rem no-repeat
</style>
