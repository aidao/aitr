<template>
  <div class="main">
    <p>设置安全码</p>
    <div class="input-box">
      <input type="text" v-model="safePwd" placeholder="输入新的安全码" @blur="checkPwd(safePwd)">
      <input type="text" v-model="sedSafePwd" placeholder="再次输入以确认新的安全码" @blur="checkSedPwd(sedSafePwd)">
    </div>
    <button type="button" @click="onSubmit">完成</button>
    <prompt :tip="tip" ref="promptAlert"></prompt>
  </div>
</template>

<script>
  import Prompt from 'components/Prompt/Prompt'
  import { resetPwdAndSafePwd } from 'util/http'

  export default {
    name: "new-safe",
    data () {
      return {
        tip: '',
        safePwd: undefined,
        sedSafePwd: undefined
      }
    },
    components:{
      Prompt
    },
    mounted(){

    },
    methods:{
      checkPwd(safePwd){
        if (!safePwd) {
          this.tip = '新安全码不能为空'
          this.$refs.promptAlert.show()
        } else if (this.getByteLen(safePwd)<8 || this.getByteLen(safePwd) > 16) {
          this.tip = '新安全码必须为8-16个字符'
          this.$refs.promptAlert.show()
        }
      },
      checkSedPwd(safePwd){
        if (!safePwd) {
          this.tip = '确认新安全码不能为空'
          this.$refs.promptAlert.show()
        } else if (this.getByteLen(safePwd)<8 || this.getByteLen(safePwd) > 16) {
          this.tip = '确认新安全码必须为8-16个字符'
          this.$refs.promptAlert.show()
        }else if(this.safePwd != this.sedSafePwd){
          this.tip = '两次输入的密码不一致'
          this.$refs.promptAlert.show()
        }
      },
      onSubmit(){
        if (!this.safePwd) {
          this.tip = '新安全码不能为空'
          this.$refs.promptAlert.show()
        } else if (this.getByteLen(this.safePwd)<8 || this.getByteLen(this.safePwd) > 16) {
          this.tip = '新安全码必须为8-16个字符'
          this.$refs.promptAlert.show()
        }else if (!this.sedSafePwd) {
          this.tip = '确认新安全码不能为空'
          this.$refs.promptAlert.show()
        } else if (this.getByteLen(this.sedSafePwd)<8 || this.getByteLen(this.sedSafePwd) > 16) {
          this.tip = '确认新安全码必须为8-16个字符'
          this.$refs.promptAlert.show()
        }else if(this.safePwd !== this.sedSafePwd){
          this.tip = '两次输入的密码不一致'
          this.$refs.promptAlert.show()
        }else{
          let params = new URLSearchParams()
          params.append('account', sessionStorage.getItem('account'))
          params.append('pwd', sessionStorage.getItem('pwd'))
          params.append('safePwd', this.safePwd)
          params.append('verifyCode', sessionStorage.getItem('verifyCode'))

          resetPwdAndSafePwd(params).then(res =>{
            if (res.data.code === 0) {
              // res.data.result.level = level[res.data.result.level - 1]
              this.tip = '重置成功'
              this.$refs.promptAlert.show()
              this.$router.replace('/login')
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

