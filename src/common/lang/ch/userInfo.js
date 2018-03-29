const ln = {
  userCenter: '个人信息',
  account: '会员账号',
  name: '会员姓名',
  level: '当前级别',
  email: '邮箱',
  loginPwd: '登录密码',
  safePwd: '安全码',

  // 信息修改tips
  infoChangeTips: {
    name: '输入2-16位英文或汉字',
    email: '输入邮箱地址'
  },
  // 信息修改校验
  infoChangeValidation: {
    nickNameNotEmpty: '会员姓名不能为空',
    nickNameFormat: '会员姓名只允许输入2-16位字母或汉字',
    emailNotEmpty: '邮箱不能为空',
    emailFormatErr: '邮箱格式不正确',
    safePwdNotEmpty: '安全码不能为空',
    safePwdFormatErr: '安全码格式不正确',
    safePwdErr: '安全码错误',
    modSuccessed: '修改成功'
  },

  // 信息修改安全码弹窗
  dialog: {
    safePwd: '输入当前安全码',
    tips: '输入您的当前安全码',
    cancel: '取消',
    save: '确定'
  },

  // 修改密码
  changeUserPwd: '修改密码',
  confirmPwd: '输入旧密码',
  newPwd: '输入新的密码',
  checkNewPwd: '确认新密码',
  changePwdValidation: {
    pwdNotEmpty: '当前密码不能为空',
    pwdFormat: '只能输入8-16位的数字或字母',
    oldPwdErr: '旧密码码错误',
    modPwdFailed: '密码修改失败',
    modPwdSuccessed: '修改成功',
    safePwdErr: '安全码错误',
    oldPwdNotEmpty: '旧密码不能为空',
    oldPwdFormat: '旧密码应为8-16位的数字或字母',
    newPwdNotEmpty: '新密码不能为空',
    verNewPwdNotEmpty: '确认新密码不能为空',
    newPwdDiff: '两次密码输入不一致',
    safePwdNotEmpty: '安全码不能为空',
    safePwdFormat: '应为8-16位的数字或字母'
  },

  // 修改安全码
  changeSafePwd: '修改安全码',
  verifySafePwd: '输入旧的安全码',
  newSafePwd: '输入新的安全码',
  checkNewSafePwd: '确认新安全码',
  changeSafePwdValidation: {
    oldSafePwdNotEmpty: '当前安全码不能为空',
    safePwdFormat: '只能输入8-16位的数字或字母',
    oldSafePwdErr: '旧安全码错误',
    modSafePwdFailed: '安全码修改失败',
    modSafePwdSuccessed: '修改成功',
    newSafePwdNotEmpty: '新安全码不能为空',
    verNewSafePwdNotEmpty: '确认新安全码不能为空',
    newSafePwdDiff: '两次安全码输入不一致',
    safePwdNotEmpty: '安全码不能为空'
  },

  // 按钮
  back: '返回',
  commit: '确认修改',
  logout: '退出登录'
}

export default ln
