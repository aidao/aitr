import login from './login'
import mywallet from './mywallet'
import mysale from './mysale'
import password from './password'
import VIPCenter from './vipCenter'
import userInfo from './userInfo'
import org from './org'

const ln = {
  common: {
    Login: 'ログイン',
    transaction: '振込',
    back: '戻る',
    ok: 'を確認する',
    submit: 'を確認する',
    cancel: 'Cancel',
    confirm: 'を確認する',
    Enter: '進む',
    query: 'サーチ',
    search: '検索',
    by: '',
    MemberAccount: '会員',
    ComingSoon: 'Coming soon',
    NoData: 'Temporarily no data'
  },
  errors: {
    safecode: {
      required: 'Security code cannot be empty',
      verifyFailed: 'Security code input error'
    },
    email: {
      required: 'Mailbox cannot be empty',
      email: 'Incorrect email format'
    }
  },
  securityCode: {
    title: 'セキュリティーコード',
    placeholder: 'セキュリティーコードをご入力ください'
  },
  FootNav: {
    vip: 'VIPエリア',
    org: 'メカニズム',
    mysale: '売り出し',
    tradecenter: 'すぐ取引を行う',
    mywallet: 'ウォレット'
  },
  MembershipGrade: {
    Regular: '一般会員'
  },
  login: login,
  mywallet: mywallet,
  mysale: mysale,
  password: password,
  userInfo: userInfo,
  vip: VIPCenter,
  org: org
}
export default ln
