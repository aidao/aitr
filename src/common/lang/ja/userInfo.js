const ln = {
  userCenter: 'My profile',
  account: '会員アカウント',
  name: '会員名',
  level: '現在のレベル',
  email: 'メールアドレス',
  loginPwd: 'ログインパスワード',
  safePwd: 'セキュリティーコード',

  // 信息修改tips
  infoChangeTips: {
    name: '输入2-16位英文或汉字',
    email: 'メールアドレスをご入力ください'
  },

  // 信息修改安全码弹窗
  dialog: {
    safePwd: 'Enter current security code',
    tips: 'Enter current security code',
    cancel: 'Cancel',
    save: 'Confirm'
  },

  // 修改密码
  changeUserPwd: 'Modify password',
  confirmPwd: 'Enter old password',
  newPwd: 'Enter new password',
  checkNewPwd: 'Confirm new password',
  changePwdValidation: {
    pwdNotEmpty: 'Old password cannot be empty',
    pwdFormat: 'Only 8-16 characters are allowed',
    oldPwdErr: 'Old password error',
    modPwdFailed: 'Password modification failed',
    modPwdSuccessed: 'Success',
    safePwdErr: 'Security code error',
    oldPwdNotEmpty: 'Old password cannot be empty',
    oldPwdFormat: 'Only 8-16 characters are allowed',
    newPwdNotEmpty: 'New password cannot be empty',
    verNewPwdNotEmpty: 'Verify that the new password cannot be empty',
    newPwdDiff: 'The two passwords are inconsistent',
    safePwdNotEmpty: 'Security code cannot be empty',
    safePwdFormat: 'Only 8-16 characters are allowed'
  },

  // 修改安全码
  changeSafePwd: 'Modify security code',
  verifySafePwd: 'Enter old security code',
  newSafePwd: 'Enter a new security code',
  checkNewSafePwd: 'Confirm new security code',
  changeSafePwdValidation: {
    oldSafePwdNotEmpty: 'Old security code cannot be empty',
    safePwdFormat: 'Only 8-16 characters are allowed',
    oldSafePwdErr: 'Old security code error',
    modSafePwdFailed: 'Security code modification failed',
    modSafePwdSuccessed: 'Success',
    newSafePwdNotEmpty: 'The new security code cannot be empty',
    verNewSafePwdNotEmpty: 'Verify that the new security code cannot be empty',
    newSafePwdDiff: 'The two security code inputs are inconsistent',
    safePwdNotEmpty: 'Security code cannot be empty'
  },

  // 按钮
  back: '戻る',
  commit: 'Confirm',
  logout: 'Sign out'
}

export default ln
