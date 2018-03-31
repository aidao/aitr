const ln = {
  userCenter: 'My profile',
  account: '화원번호',
  name: '회원성명',
  level: '현재등급',
  email: '우편함',
  loginPwd: '등록비밀번호',
  safePwd: '안전 코드',

  // 信息修改tips
  infoChangeTips: {
    name: 'Enter 2-16 characters',
    email: '우평함주소를 입력한다'
  },
  // 信息修改校验
  infoChangeValidation: {
    nickNameNotEmpty: 'Name cannot be empty',
    nickNameFormat: 'Only 2-16 characters are allowed',
    emailNotEmpty: 'E-mail can not be empty',
    emailFormatErr: 'E-mail format is incorrect',
    safePwdNotEmpty: 'Security code cannot be empty',
    safePwdFormatErr: 'Incorrect security code format',
    safePwdErr: 'Security code error',
    modSuccessed: 'Success'
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
  back: '되돌아간다',
  commit: 'Confirm',
  logout: 'Sign out'
}

export default ln
