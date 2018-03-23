<template>
    <div class="main">
      <p>忘记密码</p>
      <div class="input-box">
        <input type="text" placeholder="请输入用户名" v-model="account" @blur="checkAccount(account)">
      </div>
      <button type="button" @click="onSubmit(account)">下一步</button>
      <prompt :tip="tip" ref="promptAlert"></prompt>
    </div>
</template>

<script>
import Prompt from 'components/Prompt/Prompt'

  export default {
      name: 'pwd',
      data () {
        return {
          account: undefined,
          tip: ''
        }
      },
      components: {
        Prompt
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
            this.$refs.promptAlert.show()
          } else if (this.getByteLen(account)<4 || this.getByteLen(account) > 16) {
            this.tip = '用户名格必须为4-16个字符'
            this.$refs.promptAlert.show()
          }else{
            sessionStorage.setItem('account',this.account);
            this.$router.replace('/reset/auth')
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
      width 80%
      margin 18px auto
      display flex
    input
      flex 1
      border-radius 6px
      border 1px solid #ccc
      font-size 18px
      line-height 1
      padding 6px 12px
    button
      width 80%
      margin 0 auto
      border-radius 6px
      background-color #FFCA00
      font-size 18px
      line-height 38px
      border none
</style>
