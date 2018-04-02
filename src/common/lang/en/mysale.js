const ln = {
  mysale: 'My sales',
  RegisterParentAccount: 'Register parent account',
  RegisterSubsidiaryAccount: 'Register subsidiary account',
  UnbindSubaccount: 'Unbind the subaccount',
  BindParentAccount: 'Bind the parent account',
  LeftRegion: 'Left area',
  RightRegion: 'Right area',
  RegisterParentAccountPage: {
    fields: {
      MemberAccount: 'Member account',
      MemberName: 'Member name',
      LoginPassword: 'Login password',
      ConfirmLoginPassword: 'Confirm login password',
      SecurityCode: 'Security code',
      ConfirmSecurityCode: 'Confirm security code',
      MembershipGrade: 'Membership grade',
      Referee: 'Referee',
      RefereeDiagram: 'Referee diagram',
      ContactPerson: 'Contact person',
      ContactDiagram: 'Contact diagram',
      MarketPosition: 'Market position',
      Email: 'Email',
      RegisterCurrencyBalance: 'Register currency balance'
    },
    placeholder: {
      MemberAccount: 'Input only 5-18 in English or numbers',
      MemberName: 'Input only 2-16 in English or Chinese',
      LoginPassword: 'Input only 8-16 in English or numbers',
      ConfirmLoginPassword: 'Same as the login password......',
      SecurityCode: 'Input only 8-16 in English or numbers',
      ConfirmSecurityCode: 'Same as the login security code......',
      MembershipGrade: 'Membership grade',
      Referee: 'Referee',
      RefereeDiagram: 'Referee diagram',
      ContactPerson: 'Contact person',
      ContactDiagram: 'Contact diagram',
      MarketPosition: 'Market position',
      Email: 'Enter email address',
      RegisterCurrencyBalance: '注册币余额'
    },
    errors: {
      account: {
        required: 'Member account cannot be empty',
        enOrNumber: 'Only English or numbers are allowed',
        size: 'Only 5-18 bits of English or Numbers are allowed'
      },
      nickname: {
        cnOrEn: 'Only 2-16 bits of English or Chinese characters are allowed',
        size: 'Only 2-16 bits of English or Chinese characters are allowed'
      },
      pwd: {
        required: 'Password cannot be empty',
        enOrNumber: 'Only 8-16 bits of English or NUmbers are allowed',
        size: 'Only 8-16 bits of English or NUmbers are allowed',
        sameWithSafepwd: 'The login password an security code cannot be the same',
        repeat: 'The two passwords are different'
      },
      safepwd: {
        required: 'Security code cannot be empty',
        enOrNumber: 'Only 8-16 bits of English or NUmbers are allowed',
        size: 'Only 8-16 bits of English or NUmbers are allowed',
        repeat: 'The two input security codes are different'
      }
    },
    alert: 'Alert: each registration requires 10 USDT'
  }
}

export default ln
