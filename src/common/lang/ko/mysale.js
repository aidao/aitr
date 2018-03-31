const ln = {
  mysale: '나의 판매',
  RegisterParentAccount: '모 계정를 시쳥한다',
  RegisterSubsidiaryAccount: '서브 계정 신청',
  UnbindSubaccount: '서브 계정을 해소한다',
  BindParentAccount: '모 계정을 연돈한다',
  LeftRegion: '좌구',
  RightRegion: '우구',
  RegisterParentAccountPage: {
    fields: {
      MemberAccount: '화원번호',
      MemberName: '화원성명',
      LoginPassword: '등록비밀번호',
      ConfirmLoginPassword: '등록비밀번호 확인',
      SecurityCode: '안전 코드',
      ConfirmSecurityCode: '안전 코드 확인',
      MembershipGrade: '회원 등급',
      Referee: '추천인',
      RefereeDiagram: '추천도',
      ContactPerson: '접점인',
      ContactDiagram: '접점도',
      MarketPosition: '시장위치',
      Email: '우편함',
      RegisterCurrencyBalance: 'USDT잔액'
    },
    placeholder: {
      MemberAccount: '5-18개영어나 숫자만 입력......',
      MemberName: 'Only 2-16 characters are allowed......',
      LoginPassword: '8-16개영어나 숫자만 입력......',
      ConfirmLoginPassword: 'Same as the login password......',
      SecurityCode: '8-16개영어나 숫자만 입력......',
      ConfirmSecurityCode: 'Same as the login security code......',
      MembershipGrade: '회원 등급',
      Referee: '추천인',
      RefereeDiagram: '추천도',
      ContactPerson: '접점인',
      ContactDiagram: '접점도',
      MarketPosition: '시장위치',
      Email: '우평함주소를 입력한다',
      RegisterCurrencyBalance: 'USDT잔액'
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
    alert: '제시:해소할때마다 10개USDT를 소모한다'
  }
}

export default ln
