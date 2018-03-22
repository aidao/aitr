// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './Store'
import { i18n } from './common/js/i18n-setup.js'
import URLSearchParams from 'url-search-params-polyfill'

import 'normalize.css'
import 'common/stylus/base.styl'

Vue.config.productionTip = false
Vue.use(URLSearchParams)

/* eslint-disable no-new */
new Vue({
	el: '#app',
  i18n,
	router,
	store,
	components: { App },
	template: '<App/>'
})
