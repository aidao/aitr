<template>
	<div class="jiangjin-detail">
		<HeadMenu :pageTitle="title"></HeadMenu>
		<div class="detail-container">
      <scroller style="top: 44px"
                :on-refresh="refresh"
                :on-infinite="infinite">
        <div v-for="(v, i) in transferData" :key="i" class="detail-item">
          <div class="th">
            <div class="bianhao">{{v.createdAt}}</div>
            <div class="date">{{v.amount}}</div>
          </div>
          <div class="tr">
            <div class="td">{{v.memo}}</div>
            <div class="td">&nbsp;</div>
          </div>
        </div>
        <div class="detail-container">
          <div class="detail-item" v-if="isDataLoaded && !transferData.length">
            <div class="tr" style="text-align: center">暂无数据</div>
          </div>
        </div>
      </scroller>

			<div class="btn">
				<router-link :to="{name: 'mywallet'}" tag="span">返回</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import HeadMenu from 'components/HeadMenu/HeadMenu'
import {getToken, getWalletLogUrl} from '../../../api/GApi'
import axios from 'axios'
import Vue from 'vue'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

export default {
	data () {
		return {
			types: 0,
			title: '',
			showTransfer: true,
			transferData: [],
			isDataLoaded: false,
      pagenum: 1,
      totalPageCount: 1
		}
	},
	components: {
		HeadMenu
	},
	created () {
		console.log('created')
		let typesid = parseInt(this.$route.params.typeid)
		this.types = typesid
		console.log(`typeid 是 ${typesid}`)
		switch (typesid) {
		case 0:
			this.title = '注册币'
			this.showTransfer = true
			break
		case 1:
			this.title = '收益币'
			this.showTransfer = true
			break
		case 2:
			this.title = '重构币'
			this.showTransfer = false
			break
		case 3:
			this.title = '众筹币'
			this.showTransfer = false
			break
		case 4:
			this.title = '拆分币'
			this.showTransfer = false
			break
		case 5:
			this.title = '消费币'
			this.showTransfer = false
			break
		}
		this.getData(typesid, this.pagenum)
	},
	watch: {
		$route () {
			console.log('watch')
			let typesid = parseInt(this.$route.params.typeid)
			this.types = parseInt(typesid)
			this.getData(typesid)
			switch (typesid) {
			case 0:
				this.title = '注册币'
				this.showTransfer = true
				break
			case 1:
				this.title = '收益币'
				this.showTransfer = true
				break
			case 2:
				this.title = '重构币'
				this.showTransfer = false
				break
			case 3:
				this.title = '众筹币'
				this.showTransfer = false
				break
			case 4:
				this.title = '拆分币'
				this.showTransfer = false
				break
			case 5:
				this.title = '消费币'
				this.showTransfer = false
				break
			}
		}
	},
	methods: {
		callbackUrl () {
			this.$router.go(-1)
		},
		timestampToTime (timestamp) {
			var date = new Date(timestamp)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var Y = date.getFullYear() + '/'
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
			var D = date.getDate() + ' '
			var h = date.getHours() + ':'
			var m = date.getMinutes() + ':'
			var s = date.getSeconds()
			return Y + M + D + h + m + s
		},
    refresh (done) {
      this.transferData = []
      this.getData(this.types, 1, () => {
        done()
      })
    },
    infinite (done) {
		  if(this.pagenum === this.totalPageCount) {
		    done()
        return
      } else {
        this.getData(this.types, this.pagenum + 1, () => {
          done()
        })
      }

    },
		getData (typesid, pagenum, cb) {
			this.isDataLoaded = false
			axios.get(getWalletLogUrl, {
				headers: getToken(),
				params: {
					currency: typesid,
          page_size: 5,
          page_num: pagenum
				}
			}).then(res => {
				// 没获取到数据，所以先不填
				let list = res.data.result.list
				list.forEach((item) => {
					item.createdAt = this.timestampToTime(item.createdAt)
				})
				this.transferData = this.transferData.concat(list)
				this.isDataLoaded = true
				this.pagenum = res.data.result.pageNum
        this.totalPageCount = res.data.result.count

        if(cb) cb()
			})
		}
	}
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
	.jiangjin-detail
		background #f2f2f2
		.detail-container

			.title
				height .96rem
				line-height .96rem
				text-align center
				color #333
				font-size .426667rem
			.detail-item
				background #FFF
				margin 10px 0
				font-size .373333rem
				color #333
				.th
					height 1.013333rem
					line-height 1.013333rem
					background rgba(255, 202, 0, .3)
					padding 0 .36rem
					.bianhao
						float left
					.date
						float right
				.tr
					height 1.65333rem
					line-height .853333rem
					padding 0 .36rem
					&:last-child
						text-align right
					.td
						padding .4rem 0
						&:first-child
							float left
						&:last-child
							float right
			.btn
				height :1.333333rem
				color :white
				background :#FFCA00
				position fixed
				width 100%
				bottom 0
				z-index 91
				span
					display :block
					line-height :1.333333rem
					font-size :.426667rem
					text-align :center
</style>
