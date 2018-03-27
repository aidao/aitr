import login from './login'
import mywallet from './mywallet'
import mysale from './mysale'
import password from './password'

const ln = {
  common: {
    Login: 'ログイン',
    transaction: '振込',
    back: '戻る',
    ok: 'を確認する',
    submit: 'を確認する',
    Enter: '進む'
  },
  MembershipGrade: {
    Regular: '一般会員'
  },
  login: login,
  mywallet: mywallet,
  mysale: mysale,
  password: password
}
export default ln
