<template>
  <div class="main">
    <p>设置密码</p>
    <div class="input-box">
      <input type="text" v-model="pwd" placeholder="输入新密码" @blur="checkPwd(pwd)">
      <input type="text" v-model="sedPwd" placeholder="再次输入以确认新密码" @blur="checkSedPwd(sedPwd)">
    </div>
    <button type="button" @click="onSubmit">下一步</button>
    <prompt :tip="tip" ref="promptAlert"></prompt>
  </div>
</template>

<script>
  import Prompt from 'components/Prompt/Prompt'

    export default {
        name: "new-pwd",
        data () {
          return {
            tip: '',
            pwd: undefined,
            sedPwd: undefined
          }
        },
        components:{
          Prompt
        },
        mounted(){

        },
        methods:{
          checkPwd(pwd){
            if (!pwd) {
              this.tip = '新密码不能为空'
              this.$refs.promptAlert.show()
            } else if (this.getByteLen(pwd)<8 || this.getByteLen(pwd) > 16) {
              this.tip = '新密码必须为8-16个字符'
              this.$refs.promptAlert.show()
            }
          },
          checkSedPwd(pwd){
            if (!pwd) {
              this.tip = '确认新密码不能为空'
              this.$refs.promptAlert.show()
            } else if (this.getByteLen(pwd)<8 || this.getByteLen(pwd) > 16) {
              this.tip = '确认密码必须为8-16个字符'
              this.$refs.promptAlert.show()
            }else if(this.pwd != this.sedPwd){
              this.tip = '两次输入的密码不一致'
              this.$refs.promptAlert.show()
            }
          },
          onSubmit(){
            if (!this.pwd) {
              this.tip = '新密码不能为空'
              this.$refs.promptAlert.show()
            } else if (this.getByteLen(this.pwd)<8 || this.getByteLen(this.pwd) > 16) {
              this.tip = '新密码必须为8-16个字符'
              this.$refs.promptAlert.show()
            }else if (!this.sedPwd) {
              this.tip = '确认新密码不能为空'
              this.$refs.promptAlert.show()
            } else if (this.getByteLen(this.sedPwd)<8 || this.getByteLen(this.sedPwd) > 16) {
              this.tip = '确认密码必须为8-16个字符'
              this.$refs.promptAlert.show()
            }else if(this.pwd !== this.sedPwd){
              this.tip = '两次输入的密码不一致'
              this.$refs.promptAlert.show()
            }else{
              sessionStorage.setItem('pwd',this.pwd);
              this.$router.replace('/reset/new-safe')
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
      flex-direction column
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

