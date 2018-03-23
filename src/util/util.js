// 获取 cookie
export const getCookie = (name) => {
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  const arr = document.cookie.match(reg)
  return arr ? arr[2] : null
}
// 设置 cookie
export const setCookie = (cName, value, expiredays) => {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cName + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}
// 删除 cookie
export const delCookie = (name) => {
  let expires = new Date()
  expires.setTime(expires.getTime() - 1)
  let cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + expires.toGMTString()
  }
}
// 计算字符长度
export const calcCharLen = char => {
  let len = 0
  char.split('').forEach(item => {
    len += item.match(/[^\x00-\xff]/ig) != null ? 2 : 1
  })
  return len
}

export const validator = {
  required: value => {
    return value
  },
  size: (value, options) => {
    let result = true
    if (options) {
      if (options.min && options.max) {
        return !(value.length < options.min || value.length > options.max)
      }
      if (options.min) {
        return !(value.length < options.min)
      }
      if (options.max) {
        return !(value.length > options.max)
      }
    }
    return result
  },
  enOrNumber: value => {
    return /^[0-9a-zA-Z]+$/.test(value)
  },
  cnOrEn: value => {
    return /^[a-zA-Z\u4E00-\u9F45\uac00-\ud7ff\u0800-\u4e00]+$/.test(value)
  },
  email: value => {
    return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)
  },
  check: (value, rules) => {
    let result = {
      valid: true,
      err: null
    }
    for (let i = 0; i < rules.length; i++) {
      if (!checkRule(value, rules[i])) {
        result.valid = false
        result.err = rules[i].type || rules[i]
        break
      }
    }
    return result
  }

}

const checkRule = (value, rule) => {
  let result = true
  switch (typeof rule) {
  case 'string':
    result = validator[rule](value)
  break
  case 'object':
    result = validator[rule.type](value, rule)
  break
}
return result
}
