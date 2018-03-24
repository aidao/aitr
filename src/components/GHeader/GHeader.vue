<template>
  <header class="m-header">
    <h1 class="logo"></h1>
    <slot></slot>
  </header>
</template>

<script>
  export default {
    name: ""
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  h1
    margin 0
    padding 0
  .m-header
    position relative
    width 100%
    height 1.28rem
    background #000
    .logo
      position absolute
      width 1.706667rem
      height .773333rem
      left .666667rem
      top .253333rem
      background url('./AITR1outline@1x.png') no-repeat 0 0 / 1.706667rem .773333rem
    .lanChoose
      position absolute
      width 2.106667rem
      height .693333rem
      padding 0 .4rem 0 .346667rem
      line-height .666667rem
      right .666667rem
      top .293333rem
      box-sizing border-box
      border-radius .133333rem
      border 1px solid #FFCA00
      color #FFCA00
      font-size .32rem
    .arrow
      position absolute
      content ''
      right .12rem
      top .24rem
      width .266667rem
      height .266667rem
      background url('../LangSeletor/选择@2x.png') left  center / .266667rem .16rem no-repeat
</style>
