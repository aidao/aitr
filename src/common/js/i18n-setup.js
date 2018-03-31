import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ch from '../lang/ch/index'
import axios from 'axios'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'ch', // set locale
  fallbackLocale: 'ch',
  messages: { // set locale messages
    ch: ch
  }
})

const loadedLanguages = ['ch'] // our default language that is prelaoded

function setI18nLanguage (lang) {
  i18n.locale = lang
  const langCodes = {
    'ch': 'zh_CN',
    'en': 'en_US',
    'ja': 'ja_JP',
    'ko': 'ko_KR',
    'es': 'es_ES',
    'pt': 'pt_PT',
    'ru': 'ru_RU'
  }
  axios.defaults.headers.common['lang'] = langCodes[lang]
  // document.querySelector('html').setAttribute('lang', lang)
  localStorage.setItem('__locale__', lang)
  return lang
}

export function loadLanguageAsync (lang) {
  if (lang && i18n.locale !== lang) {
    if (loadedLanguages.indexOf(lang) === -1) {
      return import(/* webpackChunkName: "lang-[request]" */ `../lang/${lang}/index`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}
