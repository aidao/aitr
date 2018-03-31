const ln = {
  mysale: '我的销售',
  RegisterParentAccount: '注册母账户',
  RegisterSubsidiaryAccount: '注册子账户',
  UnbindSubaccount: '解绑子账户',
  BindParentAccount: '绑定母账户',
  LeftRegion: '左区',
  RightRegion: '右区',
  RegisterParentAccountPage: {
    fields: {
      MemberAccount: '会员帐号',
      MemberName: '会员姓名',
      LoginPassword: '登录密码',
      ConfirmLoginPassword: '确认登录密码',
      SecurityCode: '安全码',
      ConfirmSecurityCode: '确认安全码',
      MembershipGrade: '会员级别',
      Referee: '推荐人',
      RefereeDiagram: '推荐图',
      ContactPerson: '接点人',
      ContactDiagram: '接点图',
      MarketPosition: '市场位置',
      Email: '邮箱',
      RegisterCurrencyBalance: '注册币余额'
    },
    placeholder: {
      MemberAccount: '请输入5-18位数字或字母......',
      MemberName: '输入2-16位汉字或字母......',
      LoginPassword: '请输入8-16位字母或数字......',
      ConfirmLoginPassword: '与登录密码相同......',
      SecurityCode: '输入8-16位英文或数字......',
      ConfirmSecurityCode: '与登录安全码相同......',
      MembershipGrade: '会员级别',
      Referee: '推荐人',
      RefereeDiagram: '推荐图',
      ContactPerson: '接点人',
      ContactDiagram: '接点图',
      MarketPosition: '市场位置',
      Email: '输入您的邮箱地址',
      RegisterCurrencyBalance: '注册币余额'
    },
    errors: {
      account: {
        required: '会员账号不能为空',
        enOrNumber: '会员账号只允许输入英文或者数字',
        size: '会员账号只允许输入5-18位英文或者数字'
      },
      nickname: {
        cnOrEn: '会员姓名只允许输入汉字或者字母',
        size: '会员姓名只允许输入2-16位字母或汉字'
      },
      pwd: {
        required: '登录密码不能为空',
        enOrNumber: '登录密码只允许输入8-16位英文或数字',
        size: '登录密码只允许输入8-16位英文或数字',
        sameWithSafepwd: '登录密码和安全码不能相同'
      },
      safepwd: {
        required: '安全码不能为空',
        enOrNumber: '安全码只允许输入8-16位英文或数字',
        size: '安全码只允许输入8-16位英文或数字',
        repeat: '两次安全码输入不一致'
      }
    },
    alert: '提示: 每次注册需要消耗10个注册币'
  }
}

export default ln
