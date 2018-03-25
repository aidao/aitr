import axios from 'axios'
// import {getCookie} from './util'

//  测试服IP
// axios.defaults.baseURL = 'http://47.75.6.39:8092/api/v1'

// 正式服IP
axios.defaults.baseURL = 'http://47.75.39.184:8092/api/v1'

// var token = JSON.parse(localStorage.getItem('__token__'))

// axios.interceptors.request.use(config => {
//     if (token) {
//         config.headers.Authorization = token
//     }
//     return config
// }, err => {
//     return Promise.reject(err)
// })

export const Login = params => {
  return new Promise((resolve, reject) => {
    axios.post('/login', params).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export const LoginOut = () => {
  const token = JSON.parse(localStorage.getItem('__token__'))
  return new Promise((resolve, reject) => {
    axios.get('/logout', {
      headers: {
        'access_account': token.accessAccount,
        'access_token': token.accessToken
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export const getMuAccount = () => {
  var token = JSON.parse(localStorage.getItem('__token__'))
  return new Promise((resolve, reject) => {
    axios.get('/account/attachedList', {
      headers: {
        'access_account': token.accessAccount,
        'access_token': token.accessToken
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export const switchAccount = (params) => {
  var token = JSON.parse(localStorage.getItem('__token__'))
  return new Promise((resolve, reject) => {
    axios.post('/switchAccount', params, {
      headers: {
        'access_account': token.accessAccount,
        'access_token': token.accessToken
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export const getETHprice = () => {
  return new Promise((resolve, reject) => {
    axios.all([
      axios.get('https://api.huobi.pro/market/history/kline?symbol=ethusdt&period=1day&size=1'),
      axios.get('https://api.huobi.pro/market/history/kline?symbol=btcusdt&period=1day&size=1'),
      axios.get('https://api.huobi.pro/market/history/kline?symbol=ltcusdt&period=1day&size=1'),
      axios.get('https://api.huobi.pro/market/history/kline?symbol=bchusdt&period=1day&size=1'),
      axios.get('https://api.huobi.pro/market/history/kline?symbol=xrpusdt&period=1day&size=1'),
      axios.get('https://api.huobi.pro/market/history/kline?symbol=dashusdt&period=1day&size=1'),
      axios.get('https://api.huobi.pro/market/history/kline?symbol=eosusdt&period=1day&size=1'),
      axios.get('https://api.huobi.pro/market/history/kline?symbol=etcusdt&period=1day&size=1')
    ]).then(res => {
      resolve(res)
    })
    // axios.get('https://api.huobi.pro/market/history/kline?symbol=ethusdt&period=1day&size=1').then(res => {
    // resolve(res)
    // })
  })
}

export const getAccountInfo = () => {
  var token = JSON.parse(localStorage.getItem('__token__'))
  return new Promise((resolve, reject) => {
    axios.get('/account/info', {
      headers: {
        'access_account': token.accessAccount,
        'access_token': token.accessToken
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export const verifySafePwd = (params) => {
  var token = JSON.parse(localStorage.getItem('__token__'))
  return new Promise((resolve, reject) => {
    axios.post('/verifySafePwd', params, {
      headers: {
        'access_account': token.accessAccount,
        'access_token': token.accessToken
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export const updateNickname = (params) => {
  var token = JSON.parse(localStorage.getItem('__token__'))
  return new Promise((resolve, reject) => {
    axios.post('/account/updateNickname', params, {
      headers: {
        'access_account': token.accessAccount,
        'access_token': token.accessToken
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export const updateEmail = (params) => {
  var token = JSON.parse(localStorage.getItem('__token__'))
  return new Promise((resolve, reject) => {
    axios.post('/account/updateEmail', params, {
      headers: {
        'access_account': token.accessAccount,
        'access_token': token.accessToken
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export const verifyPwd = (params) => {
  var token = JSON.parse(localStorage.getItem('__token__'))
  return new Promise((resolve, reject) => {
    axios.post('/verifyPwd', params, {
      headers: {
        'access_account': token.accessAccount,
        'access_token': token.accessToken
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export const updatePwd = (params) => {
  var token = JSON.parse(localStorage.getItem('__token__'))
  return new Promise((resolve, reject) => {
    axios.post('/account/updatePwd', params, {
      headers: {
        'access_account': token.accessAccount,
        'access_token': token.accessToken
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export const updateSafePwd = (params) => {
  var token = JSON.parse(localStorage.getItem('__token__'))
  return new Promise((resolve, reject) => {
    axios.post('/account/updateSafePwd', params, {
      headers: {
        'access_account': token.accessAccount,
        'access_token': token.accessToken
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export const registerMu = (params) => {
  var token = JSON.parse(localStorage.getItem('__token__'))
  return new Promise((resolve, reject) => {
    axios.post('/register', params, {
      headers: {
        'access_account': token.accessAccount,
        'access_token': token.accessToken
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export const getUSDTBalance = (params) => {
  var token = JSON.parse(localStorage.getItem('__token__'))
  return new Promise((resolve, reject) => {
    axios.get('/wallet/getByAccount', {
      headers: {
        'access_account': token.accessAccount,
        'access_token': token.accessToken
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export const getBalance = (params) => {
  var token = JSON.parse(localStorage.getItem('__token__'))
  return new Promise((resolve, reject) => {
    axios.get('cashWallet/getInfo', {
      headers: {
        'access_account': token.accessAccount,
        'access_token': token.accessToken
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export const sellCoin = (params) => {
  var token = JSON.parse(localStorage.getItem('__token__'))
  return new Promise((resolve, reject) => {
    axios.get('cashWallet/sellCoin', {
      headers: {
        'access_account': token.accessAccount,
        'access_token': token.accessToken
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export const getEmailByAccount = account => {
  return new Promise((resolve, reject) => {
    axios.get('account/getEmailByAccount', {
      params: {
        'account': account
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export const sendVerifyCodeEmail = account => {
  return new Promise((resolve, reject) => {
    axios.get('account/sendVerifyCodeEmail', {
      params: {
        'account': account
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export const resetPwdAndSafePwd = (params) => {
  return new Promise((resolve, reject) => {
    axios.post('account/resetPwdAndSafePwd', params).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
export const verifyRefAccount = (params) => {
  let token = JSON.parse(localStorage.getItem('__token__'))
  return new Promise((resolve, reject) => {
    axios.post('verifyRefAccount', params, {
      headers: {
        'access_account': token.accessAccount,
        'access_token': token.accessToken
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export const getPosPerson = (params) => {
  let token = JSON.parse(localStorage.getItem('__token__'))
  return new Promise((resolve, reject) => {
    axios.get('/vip/statistics', {
      headers: {
        'access_account': token.accessAccount,
        'access_token': token.accessToken
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 获取可购买的配套列表
 * @returns {AxiosPromise<any>}
 */
export function getPKGList () {
  let token = JSON.parse(localStorage.getItem('__token__'))
  return axios.get('/pkg/list', {
    headers: {
      'access_account': token.accessAccount,
      'access_token': token.accessToken
    }
  })
}

/**
 * 购买配套
 * @param level
 * @returns {AxiosPromise<any>}
 */
export function buyPKG (params) {
  let token = JSON.parse(localStorage.getItem('__token__'))
  return axios.post('/pkg/buy', params, {
    headers: {
      'access_account': token.accessAccount,
      'access_token': token.accessToken
    }
  })
}

export function getSplitProcess () {
  let token = JSON.parse(localStorage.getItem('__token__'))
  return axios.get('/vip/process', {
    headers: {
      'access_account': token.accessAccount,
      'access_token': token.accessToken
    }
  })
}

export function serverUpdating () {
  let token = JSON.parse(localStorage.getItem('__token__'))
  return axios.get('/updating', {
    headers: {
      'access_account': token ? token.accessAccount : null,
      'access_token': token ? token.accessToken : null
    }
  })
}
