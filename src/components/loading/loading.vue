<template>
  <div class="loading">
    <img src="../../assets/loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
    .loading
        position fixed
        left 0
        top 24%
        z-index 0
        width 100%
        height 60%
        text-align center
        display flex
        justify-content center
        align-items center
        img
            width 0.8rem
            height 0.8rem
        .desc
            line-height 0.3rem
            font-size 0.3rem
            color #999
            margin 0
            padding 0
</style>
