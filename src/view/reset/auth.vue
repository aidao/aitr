<template>
  <div class="main">
    <p>确认重置</p>
    <div class="input-box">
      <input type="text" v-model="account" readonly="readonly">
      <input type="email" v-model="userEmail" readonly="readonly">
      <div class="box-auth">
        <input type="text" placeholder="请输入邮箱验证码" v-model="verifyCode">
        <button type="button" @click="getAuth" :disabled="btndisabled">{{bthTxt}}</button>
      </div>
    </div>
    <button type="button" @click="onSubmit">下一步</button>
    <prompt :tip="tip" ref="promptAlert"></prompt>
  </div>
</template>

<script>
  import Prompt from 'components/Prompt/Prompt'
  import { getEmailByAccount, sendVerifyCodeEmail } from 'util/http'

  export default {
    name: 'auth',
    data () {
      return {
        account: undefined,
        userEmail: undefined,
        verifyCode: undefined,
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
      Prompt
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
            // res.data.result.level = level[res.data.result.level - 1]
            // this.verifyCode = res.data.msg

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
        }else{
          sessionStorage.setItem('verifyCode',this.verifyCode);
          this.$router.replace('/reset/new-pwd')
        }

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
      }
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
          font-size 18px
          line-height 1
          border none
          margin 8px 0 8px 8px
    input
      flex 1
      border-radius 6px
      border 1px solid #ccc
      font-size 18px
      line-height 1
      padding 6px 12px
      margin 8px 0
    button
      width 80%
      margin 0 auto
      border-radius 6px
      background-color #FFCA00
      font-size 18px
      line-height 38px
      border none
</style>
