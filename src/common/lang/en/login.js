const ln = {
  tips: {
    name: 'Please enter your user name',
    pwd: 'Please enter your password'
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
  forgotPwd: 'Forgot password'
}

export default ln
