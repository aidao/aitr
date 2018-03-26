<template>
  <select class="select-lang" v-model="lang" @change="changeLang">
    <option selected value="ch">简体中文</option>
    <option value="en">English</option>
    <option value="ko">韩文</option>
    <option value="ja">日文</option>
  </select>
</template>

<script>
  import { i18n, loadLanguageAsync } from '../../common/js/i18n-setup.js'
  export default {
    name: "",
    methods: {
      changeLang() {
        loadLanguageAsync(this.lang)
      }
    },
    created () {
      this.lang = i18n.locale
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .select-lang
    -webkit-appearance button
    -webkit-user-select none
    position absolute
    width auto
    height .693333rem
    padding 0 .48rem 0 .3466667rem
    line-height .666667rem
    right .666667rem
    top .293333rem
    box-sizing border-box
    border-radius .133333rem
    border 1px solid #FFCA00
    color #FFCA00
    font-size .32rem
    white-space nowrap
    background #000 url('./选择@2x.png') 93%  center / .266667rem .16rem no-repeat
</style>
