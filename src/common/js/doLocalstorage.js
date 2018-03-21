export const getLocalItem = (key) => {
	const localItem = JSON.parse(localStorage.getItem(key)) || {}

	return localItem
}

export const setLocalItem = (key, val) => {
	const item = getLocalItem(key)
	if (!item[key]) {
		localStorage.setItem(key, JSON.stringify(val))
	}
}

export const addLocalItem = (key, val) => {}
