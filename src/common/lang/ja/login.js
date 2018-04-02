const ln = {
  tips: {
    name: 'ユーザー名をご入力ください',
    pwd: 'パスワードをご入力ください'
  },
  errors: {
		userName: {
			required: 'User name cannot be empty'
		},
		userPwd: {
			required: 'Password cannot be empty',
			enOrNumber: 'Password format is incorrect',
			size: 'Password format is incorrect'
		}
	},
	loginMsg: {
		success: 'Success',
		fail: 'User name/password error, login failed'
	},
  welcome: 'Welcome to login',
  forgotPwd: 'Forgot password？'
}

export default ln
