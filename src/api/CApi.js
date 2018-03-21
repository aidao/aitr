import axios from 'axios'

export const getLogin = (url, options) => {
	return new Promise((resolve, reject) => {
		axios.post(url, options)
	})
}
