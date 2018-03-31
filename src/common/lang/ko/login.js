const ln = {
  tips: {
    name: '아이디를 입력해 주세요',
    pwd: '비밀 번호를 입력해 주세요'
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
