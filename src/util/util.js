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
