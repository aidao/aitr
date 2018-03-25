<template>
  <div class="main">
    <GHeader>
      <lang-seletor></lang-seletor>
    </GHeader>
    <div class="triangle"></div>
    <p>忘记密码</p>
    <div class="input-box">
      <input type="text"
             placeholder="请输入用户名"
             v-model="account"
             @blur="checkAccount(account)"
             ref="account" >
    </div>
    <button type="button" @click="onSubmit(account)">下一步</button>
    <prompt :tip="tip" ref="promptAlert"></prompt>
  </div>
</template>

<script>
  import Prompt from 'components/Prompt/Prompt'
  import GHeader from 'components/GHeader/GHeader'
  import LangSeletor from 'components/LangSeletor/LangSeletor'

  import { getEmailByAccount } from 'util/http'

  export default {
    name: 'pwd',
    data () {
      return {
        account: undefined,
        tip: ''
      }
    },
    components: {
      Prompt,
      GHeader,
      LangSeletor
    },
    methods:{
      checkAccount (account) {
        if (!account) {
          this.tip = '用户名不能为空'
          this.$refs.promptAlert.show()
        } else if (!/^\w{5,18}$/.test(account)) {
          this.tip = '用户名格必须为5-18个字符'
          this.$refs.promptAlert.show()
        }
      },
      onSubmit(account){
        if (!account) {
          this.tip = '用户名不能为空'
          this.$refs.account.focus()
          this.$refs.promptAlert.show()
          return
        } else if (!/^\w{5,18}$/.test(account)) {
          this.tip = '用户名格必须为5-18个字符'
          this.$refs.account.focus()
          this.$refs.promptAlert.show()
          return
        }else{
          getEmailByAccount(this.account).then(res =>{

            const {code, result, msg} = res.data

            if (code === 0) {
              sessionStorage.setItem('account',this.account);
              sessionStorage.setItem('userEmail',result.email);
              this.$router.replace('/reset/auth')
            } else {
              this.tip = msg
              this.$refs.promptAlert.show()
            }
          })
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
      position relative
      width 80%
      margin 18px auto
      display flex
      &::before
        position absolute
        content ''
        width .506667rem
        height .506667rem
        top .713333rem
        left .2rem
        margin-top -0.45rem
        background url('../Login/用户-2@0.96x.png') center center / .426667rem .458667rem no-repeat
    input
      flex 1
      border-radius 6px
      border 1px solid #ccc
      font-size .373333rem
      line-height 1
      padding 6px 12px
      padding-left .726667rem
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
